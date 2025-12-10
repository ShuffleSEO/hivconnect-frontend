# Troubleshooting Guide - HIV Connect Central NJ

**Last Updated**: December 10, 2025

This document contains solutions to common deployment and infrastructure issues encountered during development.

---

## Table of Contents

1. [Auto-Deployment Issues](#auto-deployment-issues)
2. [Build Failures](#build-failures)
3. [Backend API Errors](#backend-api-errors)
4. [Database Migration Issues](#database-migration-issues)
5. [Cloudflare Pages vs Workers Confusion](#cloudflare-pages-vs-workers-confusion)

---

## Auto-Deployment Issues

### Problem: Cloudflare Pages Not Auto-Deploying After Git Push

**Symptoms**:
- Pushing to `main` branch doesn't trigger deployment
- Manual deployments work fine
- No deployment shown in Cloudflare dashboard

**Common Causes**:
1. GitHub integration disconnected (after repo transfer)
2. GitHub Actions workflow missing or broken
3. GitHub secrets not configured

**Solutions**:

#### Option A: Reconnect GitHub Integration (UI-based)
```bash
# 1. Go to Cloudflare Dashboard → Workers & Pages
# 2. Click your Pages project
# 3. Settings → Builds & deployments
# 4. Click "Connect to Git" and reauthorize GitHub
# 5. Select correct repository
```

#### Option B: Use GitHub Actions (Recommended)
```yaml
# .github/workflows/deploy.yml already configured
# Just ensure these secrets are set in GitHub:
# - CLOUDFLARE_API_TOKEN
# - CLOUDFLARE_ACCOUNT_ID

# Test by pushing a commit:
git commit --allow-empty -m "Test deployment"
git push origin main

# Watch deployment:
gh run watch
```

**Verification**:
```bash
# Check recent runs
gh run list --limit 5

# View specific run logs
gh run view <run-id> --log
```

---

## Build Failures

### Problem: Frontend Build Fails with "fetch failed" or "ECONNREFUSED"

**Symptoms**:
```
Error fetching FAQs: TypeError: fetch failed
  [cause]: AggregateError [ECONNREFUSED]
```

**Root Cause**: API URL not set or backend unreachable during build

**Solution**:

1. **Check environment variable is set**:
```yaml
# .github/workflows/deploy.yml
- name: Build static site
  run: npm run build
  env:
    PUBLIC_API_URL: https://hivconnect-backend.shuffle-seo.workers.dev/api
```

2. **Verify backend is reachable**:
```bash
curl https://hivconnect-backend.shuffle-seo.workers.dev/api/providers
# Should return HTTP 200 with JSON data
```

3. **Add error handling to pages** (already done):
```typescript
// src/pages/faq/index.astro
let faqs = [];
try {
  faqs = await fetchFAQs();
} catch (error) {
  console.warn('Failed to fetch FAQs:', error);
  // Show empty state instead of crashing
}
```

**Prevention**: Always wrap build-time API fetches in try/catch blocks.

---

## Backend API Errors

### Problem: Backend Returns HTTP 500 "Something went wrong"

**Symptoms**:
```bash
$ curl https://hivconnect-backend.shuffle-seo.workers.dev/api/faqs
{"errors":[{"message":"Something went wrong."}]}
```

**Common Causes**:
1. Database table doesn't exist (migration not run)
2. Database migration failed
3. Invalid query or missing field

**Solutions**:

#### 1. Check if migrations ran:
```bash
cd mshtga-backend-workers

# View recent GitHub Actions deployments
gh run list --limit 5

# Check migration logs
gh run view <run-id> --log | grep -i "migrate"
```

#### 2. Run migrations manually:
```bash
cd mshtga-backend-workers

# Local (for testing)
NODE_ENV=production PAYLOAD_SECRET=ignore pnpm payload migrate

# Production (via wrangler)
CLOUDFLARE_ENV='' pnpm run deploy:database
```

#### 3. Check database schema:
```bash
# List tables in D1 database
pnpm wrangler d1 execute hivconnect-db-production --command "SELECT name FROM sqlite_master WHERE type='table';"
```

**Verification**:
```bash
# Test API endpoint
curl https://hivconnect-backend.shuffle-seo.workers.dev/api/faqs
# Should return: {"docs":[], ...} with HTTP 200
```

---

## Database Migration Issues

### Problem: Migration Fails in GitHub Actions

**Symptoms**:
```
UserError: No environment found in configuration with name "production"
```

**Root Cause**: `wrangler.jsonc` uses root config as production, but script tries to use named "production" environment.

**Solution**:

Update `.github/workflows/deploy.yml`:
```yaml
# WRONG:
- name: Run database migrations
  run: CLOUDFLARE_ENV=production pnpm run deploy:database

# CORRECT:
- name: Run database migrations
  run: pnpm run deploy:database
  env:
    CLOUDFLARE_ENV: ''  # Empty string = use root config
```

**Explanation**:
- Root config in `wrangler.jsonc` = production
- Named environments are for staging, dev, etc.
- Use empty `CLOUDFLARE_ENV` to target production

**Verification**:
```bash
# Check workflow file
cat .github/workflows/deploy.yml | grep -A 5 "database migrations"

# Ensure CLOUDFLARE_ENV is empty or not set for production
```

---

## Cloudflare Pages vs Workers Confusion

### Problem: Frontend Deploying as Worker (Shows "Hello world")

**Symptoms**:
- Frontend URL is `.workers.dev` instead of `.pages.dev`
- Site shows generic "Hello world" message
- Build succeeds but wrong deployment type

**Root Cause**: Project created as Worker, not Pages

**Solution**:

#### 1. Delete existing Worker (if exists):
```bash
# List all workers
pnpm wrangler list

# Delete worker if needed
pnpm wrangler delete hivconnect-frontend
```

#### 2. Create proper Pages project:
```bash
cd mshtga  # Frontend repo

# Create Pages project (not Worker!)
CLOUDFLARE_ACCOUNT_ID=77936f7f1fecd5df8504adaf96fad1fb \
  npx wrangler pages project create hivconnect-frontend \
  --production-branch=main
```

#### 3. Deploy to Pages:
```bash
# Build first
npm run build

# Deploy to Pages (note: 'pages' subcommand!)
CLOUDFLARE_ACCOUNT_ID=77936f7f1fecd5df8504adaf96fad1fb \
  npx wrangler pages deploy dist \
  --project-name=hivconnect-frontend
```

#### 4. Set up GitHub Actions:
```yaml
# .github/workflows/deploy.yml (already configured)
- name: Deploy to Cloudflare Pages
  uses: cloudflare/wrangler-action@v3
  with:
    apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
    command: pages deploy dist --project-name=hivconnect-frontend
    # Note: "pages deploy" not just "deploy"!
```

**Key Differences**:

| Aspect | Pages | Workers |
|--------|-------|---------|
| **Purpose** | Static site hosting | Serverless functions |
| **Deploy Command** | `wrangler pages deploy dist` | `wrangler deploy` |
| **URL Pattern** | `.pages.dev` | `.workers.dev` |
| **Input** | Directory of static files | JavaScript/TypeScript code |
| **Best For** | Astro, React, Vue, HTML | APIs, edge logic |

**Verification**:
```bash
# Check project type in dashboard
# URL should be: https://[project-name].pages.dev (not .workers.dev)

# Test homepage
curl -I https://hivconnect-frontend.pages.dev/
# Should return HTTP 200 with HTML content
```

---

## Quick Reference: Common Commands

### Frontend (mshtga)
```bash
# Build locally
npm run build

# Preview build
npm run preview

# Deploy to Pages manually
CLOUDFLARE_ACCOUNT_ID=77936f7f1fecd5df8504adaf96fad1fb \
  npx wrangler pages deploy dist --project-name=hivconnect-frontend

# Watch GitHub Actions
gh run watch
```

### Backend (mshtga-backend-workers)
```bash
# Run migrations
pnpm run deploy:database

# Deploy backend
pnpm run deploy:app

# Full deploy (migrations + app)
pnpm run deploy

# Check D1 database
pnpm wrangler d1 execute hivconnect-db-production \
  --command "SELECT * FROM providers LIMIT 5;"

# View logs
pnpm wrangler tail
```

### GitHub Actions
```bash
# List recent runs
gh run list --limit 10

# Watch current run
gh run watch

# View specific run
gh run view <run-id>

# View logs with error context
gh run view <run-id> --log | grep -C 10 "ERROR"

# Re-run failed workflow
gh run rerun <run-id>
```

---

## Emergency Rollback Procedures

### If Frontend Breaks
```bash
cd mshtga

# Option 1: Revert last commit
git revert HEAD
git push origin main
# Wait for auto-deploy (~45 seconds)

# Option 2: Deploy previous working build
git checkout <previous-commit>
npm run build
CLOUDFLARE_ACCOUNT_ID=77936f7f1fecd5df8504adaf96fad1fb \
  npx wrangler pages deploy dist --project-name=hivconnect-frontend
```

### If Backend Breaks
```bash
cd mshtga-backend-workers

# Option 1: Revert last commit
git revert HEAD
git push origin main
# Wait for auto-deploy (~2 minutes)

# Option 2: Rollback via Cloudflare Dashboard
# Dashboard → Workers & Pages → hivconnect-backend → Deployments
# Click "Rollback" on previous working deployment
```

---

## Getting Help

### Check Logs First
```bash
# Frontend build logs
gh run view --repo ShuffleSEO/hivconnect-frontend

# Backend deployment logs
gh run view --repo ShuffleSEO/hivconnect-backend

# Backend runtime logs (last 50 lines)
cd mshtga-backend-workers
pnpm wrangler tail --format pretty
```

### Useful Resources
- **Cloudflare Dashboard**: https://dash.cloudflare.com/
- **Linear Issue Tracker**: https://linear.app/shuffle-studio/issue/SHU-9
- **Frontend Repo**: https://github.com/ShuffleSEO/hivconnect-frontend
- **Backend Repo**: https://github.com/ShuffleSEO/hivconnect-backend

### Documentation Files
- `PROJECT_STATUS.md` - Current deployment status and architecture
- `CLAUDE.md` - Comprehensive project context
- `DEPLOYMENT.md` - Deployment procedures (backend)
- This file - Common issues and solutions

---

**End of Document**
