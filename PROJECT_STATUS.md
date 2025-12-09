# HIV Connect Central NJ - Project Status

**Last Updated**: December 5, 2025
**Frontend Repository**: https://github.com/kevinshuffle/hivconnect-frontend
**Backend Repository**: https://github.com/kevinshuffle/hivconnect-backend
**CTO**: Kevin / Shuffle SEO

---

## Current Deployment Status

### ✅ Production Systems (All Live)

| Component | Status | URL | Deployment Method |
|-----------|--------|-----|-------------------|
| **Frontend** | ✅ Live | https://hivconnect-frontend.pages.dev | Cloudflare Pages (Git auto-deploy) |
| **Backend** | ✅ Live | https://hivconnect-backend.shuffle-seo.workers.dev | Cloudflare Workers (GitHub Actions) |
| **Admin UI** | ✅ Live | https://hivconnect-backend.shuffle-seo.workers.dev/admin | PayloadCMS Admin Panel |
| **Database** | ✅ Live | Cloudflare D1 (production) | Managed via PayloadCMS migrations |

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Cloudflare Network                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐      ┌───────────┐ │
│  │ Pages        │──────│ Workers      │──────│ D1 DB     │ │
│  │ (Frontend)   │ API  │ (PayloadCMS) │      │ (SQLite)  │ │
│  │              │      │              │      │           │ │
│  │ Astro SSG    │      │ Next.js 15   │      │ Providers │ │
│  │ 17 pages     │      │ PayloadCMS   │      │ Resources │ │
│  └──────────────┘      └──────┬───────┘      │ Blog      │ │
│                                │              │ PDFLibrary│ │
│                         ┌──────▼───────┐      └───────────┘ │
│                         │ Deploy Hook  │                    │
│                         │ (Webhook)    │                    │
│                         └──────────────┘                    │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Project Management & Tracking

### Linear Integration ✅ (Added Dec 9, 2025)

**Status**: Active and integrated with development workflow

The project now uses Linear for issue tracking, task management, and client communication via the Linear MCP server.

**Key Information**:
- **Team**: Shuffle Studio (ID: `9fe49653-ca9a-4541-8eee-3b2ecbcaff5f`)
- **Project**: HIV Connect Central NJ (2021-Present)
- **Current Issue**: SHU-9 - Client Testing Follow-up & Support (Due: Dec 13, 2025)
- **Linear URL**: https://linear.app/shuffle-studio

**Workflow**:
- Daily progress updates in issue comments
- Git commits reference Linear issue IDs (e.g., `[SHU-9]`)
- Weekly sync between PROJECT_TODO.md and Linear issues
- Client communication tracked in Linear for transparency

**Documentation**:
- Full integration guide: `/LINEAR_INTEGRATION.md`
- Quick reference: `/LINEAR_QUICK_REF.md`
- Comprehensive plan: `.claude/plans/staged-foraging-scott.md`

**MCP Tools Available**: 21 tools for managing issues, comments, projects, teams, labels, and more directly from Claude Code.

---

## What's Working

### ✅ Frontend (Astro + Cloudflare Pages)

- **17 static pages** built and deployed
- **Provider directory** with 17 active providers
- **API integration** fetches data from PayloadCMS at build time
- **Automatic rebuilds** when content changes (2-3 minutes)
- **Bilingual support** (English/Spanish)
- **Accessibility** WCAG-compliant
- **Security headers** CSP, HSTS, X-Frame-Options
- **Auto-deployment** on Git push to main branch

**Key Files**:
- `/src/lib/api.ts` - API utility for fetching PayloadCMS data
- `/src/pages/find-services/index.astro` - Provider directory page
- `/src/pages/providers/[slug].astro` - Dynamic provider detail pages

**Environment Variables** (Cloudflare Pages):
```
PUBLIC_API_URL=https://hivconnect-backend.shuffle-seo.workers.dev/api
```

### ✅ Backend (PayloadCMS + Cloudflare Workers)

- **PayloadCMS 3.65.0** with Next.js 15
- **17 providers imported** from original TypeScript data
- **4 active collections**: Providers, Resources, Blog, PDFLibrary, SiteSettings
- **Automatic webhook system** triggers frontend rebuilds on content changes
- **GitHub Actions deployment** on push to main branch
- **Cloudflare D1 database** for persistent storage
- **Branded landing page** with gradient hero section matching frontend design

**Key Files**:
- `/src/hooks/triggerFrontendRebuild.ts` - Webhook system for auto-rebuilds
- `/src/collections/Providers.ts` - Provider collection with hooks
- `/.github/workflows/deploy.yml` - GitHub Actions deployment workflow
- `/wrangler.jsonc` - Cloudflare Workers configuration

**Environment Variables** (Backend):
```
PAYLOAD_SECRET=N3DHalBhL4HWguvVag6xbyEugcS/Ovstd/PmQCymkPA=
PAYLOAD_PUBLIC_SERVER_URL=https://hivconnect-backend.shuffle-seo.workers.dev
DEPLOY_HOOK_URL=https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/3e240bd9-fb8e-4972-b69a-32436151cfba
```

---

## Automatic Content Updates Workflow

### How It Works (End-to-End)

1. **Content Editor Updates Provider** in PayloadCMS admin:
   - Navigate to https://hivconnect-backend.shuffle-seo.workers.dev/admin
   - Edit provider information (name, services, hours, etc.)
   - Click "Save"

2. **Backend Hook Detects Change**:
   ```
   📢 CONTENT CHANGE DETECTED
      Collection: providers
      Operation: updated
      Document ID: 7
   ```

3. **Webhook Triggers Frontend Rebuild**:
   ```
   🚀 Triggering frontend rebuild...
   ✅ Frontend rebuild triggered successfully!
      Deployment ID: 48ef8adb-eeef-46d1-be6b-151669cf4346
   ```

4. **Cloudflare Pages Rebuilds Site**:
   - Pulls latest code from Git
   - Runs `npm run build`
   - Fetches fresh data from PayloadCMS API
   - Generates new static HTML
   - Deploys to CDN

5. **Changes Go Live**:
   - **Timeline**: 2-3 minutes after save
   - **URL**: https://hivconnect-frontend.pages.dev/find-services
   - **User Experience**: No page refresh needed, changes visible on next visit

---

## Phase 1: Completed Features

### ✅ Backend Setup (Completed Dec 4, 2025)
- [x] PayloadCMS initialized with Next.js 15
- [x] Cloudflare D1 database connected
- [x] Providers collection created
- [x] 17 providers migrated from TypeScript
- [x] Resources collection scaffolded
- [x] Blog collection scaffolded
- [x] PDFLibrary collection scaffolded
- [x] SiteSettings global created
- [x] Admin UI deployed and accessible

### ✅ Automatic Deployment (Completed Dec 4, 2025)
- [x] GitHub Actions workflow for backend
- [x] Cloudflare Pages connection for frontend
- [x] Deploy hooks configured
- [x] Webhook system implemented with await fix
- [x] Backend auto-deploys on Git push
- [x] Frontend auto-rebuilds on content changes

### ✅ Backend UI Branding (Completed Dec 5, 2025)
- [x] Custom landing page with gradient hero section
- [x] Icon-based card design for action items
- [x] Smooth animations and hover effects
- [x] Matches frontend red-to-blue gradient theme
- [x] Professional appearance for client demos
- [x] Responsive design for all devices

### ✅ Data Migration (Completed Dec 2, 2025)
- [x] Exported original 15 providers from TypeScript
- [x] Imported into PayloadCMS
- [x] Added 2 additional providers (17 total)
- [x] API endpoints tested and working
- [x] Frontend integrated with API

---

## Phase 2: In Progress / Upcoming

### ⏳ Content Population (Next 1-2 Weeks)
- [ ] Add resources to Resources collection
- [ ] Create blog posts in Blog collection
- [ ] Upload PDFs to PDFLibrary
- [ ] Configure SiteSettings (hotline, logo, footer)
- [ ] Add more providers (target: 25-30)

### ⏳ Frontend Enhancement (Next 2-3 Weeks)
- [ ] Build blog listing page (`/blog`)
- [ ] Build blog detail page (`/blog/[slug]`)
- [ ] Build resources library page (`/resources`)
- [ ] Add PDF download functionality
- [ ] Implement search for blog/resources
- [ ] Add pagination for long lists

### 📋 Future Features (2026)
- [ ] Events collection (v2)
- [ ] Calendar functionality (v2)
- [ ] Volunteer/Donor Centers (v2)
- [ ] Impact Dashboard (v2)
- [ ] Analytics integration (v2)
- [ ] Custom domain setup
- [ ] Production monitoring/alerts

---

## Technical Debt / Known Issues

### 🐛 Minor Issues
- None currently - all systems operational

### 🔧 Improvements Needed
- [ ] Add staging environment for testing
- [ ] Implement automatic database backups
- [ ] Add monitoring/alerting for downtime
- [ ] Optimize build time (currently ~2-3 minutes)
- [ ] Add caching strategy for API responses

---

## Key Architecture Decisions

### 1. Why Static Site Generation (SSG)?

**Decision**: Use Astro SSG instead of Server-Side Rendering (SSR)

**Rationale**:
- **Performance**: Static HTML is pre-generated at build time, no server computation needed
- **Cost**: Free hosting on Cloudflare Pages (no serverless function costs)
- **Reliability**: No backend required to serve pages (only for data fetching during build)
- **SEO**: Pre-rendered HTML is perfect for search engines
- **CDN**: Static files can be cached globally on Cloudflare's edge network

**Trade-off**:
- Content changes require rebuild (2-3 minutes)
- Not suitable for real-time data (fine for this use case)

**Why rebuild on content changes?**
1. Data is fetched during `npm run build` and baked into static HTML
2. User visits → Cloudflare serves pre-generated HTML (instant)
3. Content changes in PayloadCMS → Webhook triggers rebuild → New HTML generated → Deployed to CDN
4. This means users always get fast page loads (no API calls at runtime)

### 2. Why GitHub Actions for Backend Deployment?

**Decision**: Use GitHub Actions instead of Cloudflare Pages Git integration

**Rationale**:
- **Build Complexity**: PayloadCMS uses Next.js 15 which requires OpenNext build process
- **OpenNext**: Custom build tool that transforms Next.js into Cloudflare Workers format
- **Control**: GitHub Actions gives full control over build steps, environment, and deployment
- **Pages Limitation**: Cloudflare Pages is designed for static sites, not Next.js server apps

**Build Process**:
```bash
# What GitHub Actions does:
1. npm install
2. opennextjs-cloudflare build  # Complex Next.js → Worker transformation
3. opennextjs-cloudflare deploy # Deploy to Cloudflare Workers
```

If we connected Git directly to Pages, it would:
- Try to build as static site (fail)
- Not run OpenNext transformation
- Not support Next.js server components

**Trade-off**:
- Slightly more complex setup (GitHub secrets, workflow file)
- Benefits: Full control, proper Next.js build, works reliably

---

## Deployment Workflows

### Frontend Deployment
```bash
# Automatic (on Git push to main):
git add .
git commit -m "Update content"
git push origin main
# → Cloudflare Pages auto-builds and deploys

# Manual (via deploy hook):
curl -X POST "https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/3e240bd9-fb8e-4972-b69a-32436151cfba"
```

### Backend Deployment
```bash
# Automatic (on Git push to main):
cd mshtga-backend-workers
git add .
git commit -m "Update backend code"
git push origin main
# → GitHub Actions builds and deploys

# Manual (local):
cd mshtga-backend-workers
NODE_ENV=production pnpm run deploy:app
```

---

## Environment Variables Reference

### Frontend (Cloudflare Pages)
| Variable | Value | Purpose |
|----------|-------|---------|
| `PUBLIC_API_URL` | `https://hivconnect-backend.shuffle-seo.workers.dev/api` | PayloadCMS API endpoint |

### Backend (GitHub Secrets + wrangler.jsonc)
| Variable | Location | Purpose |
|----------|----------|---------|
| `CLOUDFLARE_API_TOKEN` | GitHub Secrets | Deploy to Cloudflare Workers |
| `CLOUDFLARE_ACCOUNT_ID` | GitHub Secrets | Cloudflare account |
| `PAYLOAD_SECRET` | GitHub Secrets + wrangler.jsonc | JWT authentication |
| `DEPLOY_HOOK_URL` | wrangler.jsonc | Trigger frontend rebuilds |
| `PAYLOAD_PUBLIC_SERVER_URL` | wrangler.jsonc | Backend public URL |

---

## Admin Access

### PayloadCMS Admin Panel
- **URL**: https://hivconnect-backend.shuffle-seo.workers.dev/admin
- **Username**: (Created during setup)
- **Password**: (Set during initial login)

### Cloudflare Dashboard
- **URL**: https://dash.cloudflare.com
- **Account**: kevin@shuffleseo.com
- **Workers**: hivconnect-backend
- **Pages**: hivconnect-frontend

### GitHub Repositories
- **Frontend**: https://github.com/kevinshuffle/hivconnect-frontend
- **Backend**: https://github.com/kevinshuffle/hivconnect-backend

---

## Monitoring & Logs

### Backend Logs (Real-time)
```bash
cd mshtga-backend-workers
npx wrangler tail hivconnect-backend --format pretty
```

### Frontend Logs
- View in Cloudflare Pages dashboard: Functions logs tab
- Build logs visible during deployment

### GitHub Actions Logs
```bash
cd mshtga-backend-workers
gh run list
gh run view <run-id> --log
```

---

## Quick Commands

### Start Local Development
```bash
# Frontend
cd mshtga
npm run dev
# → http://localhost:4321

# Backend
cd mshtga-backend-workers
pnpm dev
# → http://localhost:3000
```

### Deploy to Production
```bash
# Frontend (automatic via Git)
cd mshtga
git push origin main

# Backend (automatic via Git)
cd mshtga-backend-workers
git push origin main

# Or manually trigger frontend rebuild:
curl -X POST "https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/3e240bd9-fb8e-4972-b69a-32436151cfba"
```

### Check Deployment Status
```bash
# Frontend
# Visit: https://dash.cloudflare.com → Pages → hivconnect-frontend → Deployments

# Backend
cd mshtga-backend-workers
gh run list
```

---

## Support & Troubleshooting

### Common Issues

**Issue**: Frontend not updating after content change
- **Check**: Wait 2-3 minutes for rebuild to complete
- **Check**: Verify `PUBLIC_API_URL` is set in Cloudflare Pages environment variables
- **Check**: View build logs in Cloudflare Pages dashboard
- **Solution**: Manually trigger rebuild with deploy hook

**Issue**: Backend API returns errors
- **Check**: View Worker logs with `npx wrangler tail`
- **Check**: Verify `PAYLOAD_SECRET` is set correctly
- **Check**: Test API endpoint: `curl https://hivconnect-backend.shuffle-seo.workers.dev/api/providers`

**Issue**: GitHub Actions deployment fails
- **Check**: View logs: `gh run view <run-id> --log`
- **Check**: Verify GitHub secrets are set correctly
- **Solution**: Re-run failed workflow

---

## Next Session Checklist

When continuing this project:

1. **Read this document first** to understand current state
2. **Check deployment status** (all systems should be live)
3. **Review recent commits** on both repos
4. **Test automatic rebuilds** by updating a provider
5. **Check logs** for any errors or warnings

---

**End of Document**
