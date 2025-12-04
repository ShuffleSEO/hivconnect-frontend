# HIV Connect Central NJ - Architecture Decisions

**Last Updated**: December 4, 2025
**Author**: Kevin / Shuffle SEO CTO
**Purpose**: Explain key architectural decisions for this project

---

## Table of Contents

1. [Why We Need to Rebuild the Frontend](#1-why-we-need-to-rebuild-the-frontend)
2. [Why We Use GitHub Actions for Backend Deployment](#2-why-we-use-github-actions-for-backend-deployment)
3. [SSG vs SSR Trade-offs](#3-ssg-vs-ssr-trade-offs)
4. [Cloudflare Platform Choice](#4-cloudflare-platform-choice)

---

## 1. Why We Need to Rebuild the Frontend

### The Short Answer

**Because we use Static Site Generation (SSG), not Server-Side Rendering (SSR).**

When content changes in PayloadCMS, the frontend doesn't automatically know about it. We need to rebuild the site to fetch the latest data and generate new static HTML files.

### The Technical Explanation

#### How Static Site Generation Works

```
┌─────────────────────────────────────────────────────────────┐
│                      BUILD TIME                              │
│                     (Developer runs npm run build)           │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1. Astro reads source code                                  │
│     ↓                                                         │
│  2. Fetches data from PayloadCMS API                         │
│     ↓                                                         │
│  3. Generates static HTML files                              │
│     ↓                                                         │
│  4. Outputs to /dist folder                                  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                      RUNTIME                                 │
│                     (User visits website)                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  User requests page → Cloudflare serves pre-built HTML      │
│                                                               │
│  NO API CALLS                                                │
│  NO DATABASE QUERIES                                         │
│  NO SERVER COMPUTATION                                       │
│                                                               │
│  Just: Read file from disk → Send to user                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

#### What Happens During Build

**File**: `/src/pages/find-services/index.astro`

```astro
---
// This code runs ONCE during build, not on every page visit
import { fetchProviders } from '../../lib/api';

// API call happens at BUILD TIME
const providers = await fetchProviders();

// providers is now baked into the HTML
---

<div class="provider-list">
  {providers.map(provider => (
    <div class="provider-card">
      <h3>{provider.name}</h3>
      <p>{provider.description}</p>
    </div>
  ))}
</div>
```

**Generated HTML** (in `/dist/find-services/index.html`):

```html
<div class="provider-list">
  <div class="provider-card">
    <h3>Raritan Bay Medical Center</h3>
    <p>Hospital-based HIV care with medical case management...</p>
  </div>
  <!-- All 17 providers are in the HTML -->
</div>
```

This HTML is **static** - it doesn't change until we rebuild.

### Why Rebuild on Content Changes?

When you update a provider in PayloadCMS:

1. **Backend database** updates immediately ✅
2. **Backend API** returns new data immediately ✅
3. **Frontend HTML** still contains old data ❌

The frontend HTML was generated with old data from the last build. To update it:

1. **Trigger webhook** → Cloudflare Pages starts new build
2. **Re-run `npm run build`** → Fetches latest data from API
3. **Generate new HTML** → Now contains updated provider info
4. **Deploy to CDN** → Users see new data

### Alternative: Server-Side Rendering (SSR)

**What if we used SSR instead?**

```astro
---
// With SSR, this runs on EVERY page visit
export const prerender = false; // Enable SSR

const providers = await fetchProviders(); // API call on every request
---
```

**Pros**:
- ✅ Always up-to-date (no rebuild needed)
- ✅ Real-time data changes

**Cons**:
- ❌ Slower page loads (API call + HTML generation on every visit)
- ❌ Higher costs (serverless function runs on every request)
- ❌ More complex infrastructure (need server/edge functions)
- ❌ Worse SEO (slower time-to-first-byte)

### Why SSG is Better for This Project

| Factor | SSG (Current) | SSR (Alternative) |
|--------|---------------|-------------------|
| **Page Load Speed** | ⚡ Instant (<50ms) | 🐢 Slower (200-500ms) |
| **Cost** | 💰 Free | 💰💰 $10-50/month |
| **Reliability** | 🎯 Very high | 🎯 Lower (API dependency) |
| **Content Update Frequency** | 📅 Weekly/monthly | 📅 Real-time |
| **SEO** | 🚀 Perfect | 🚀 Good |
| **Complexity** | 😊 Simple | 😰 Complex |

**For this use case**:
- Providers change infrequently (weekly/monthly)
- Speed and cost matter more than real-time updates
- 2-3 minute rebuild delay is acceptable

### The Rebuild Workflow

```
┌──────────────────────────────────────────────────────────┐
│ 1. Editor updates provider in PayloadCMS                 │
│    https://hivconnect-backend.shuffle-seo.workers.dev   │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────┐
│ 2. PayloadCMS hook detects change                        │
│    src/hooks/triggerFrontendRebuild.ts                   │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────┐
│ 3. Backend calls Cloudflare Pages deploy hook            │
│    POST https://api.cloudflare.com/.../deploy_hooks/...  │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────┐
│ 4. Cloudflare Pages receives webhook                     │
│    - Pulls latest code from Git                          │
│    - Installs dependencies (npm install)                 │
│    - Runs build (npm run build)                          │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────┐
│ 5. Astro fetches data from API during build              │
│    - fetchProviders() calls PayloadCMS API               │
│    - Gets all 17 providers with latest data              │
│    - Generates HTML for all pages                        │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ↓
┌──────────────────────────────────────────────────────────┐
│ 6. Cloudflare deploys new HTML to global CDN             │
│    - New files replace old files                         │
│    - Changes live in 2-3 minutes                         │
└──────────────────────────────────────────────────────────┘
```

---

## 2. Why We Use GitHub Actions for Backend Deployment

### The Short Answer

**Because PayloadCMS with Next.js 15 requires a complex build process (OpenNext) that Cloudflare Pages doesn't support.**

Cloudflare Pages is designed for static sites. Our backend is a Next.js application with server components, which needs special transformation to run on Cloudflare Workers.

### The Technical Explanation

#### What is PayloadCMS Built With?

PayloadCMS uses **Next.js 15** with:
- React Server Components
- Server-side API routes
- Middleware
- Dynamic imports
- Image optimization

This is NOT a static site - it's a full server application.

#### The Build Process Challenge

**What Cloudflare Pages Expects** (for static sites):
```bash
npm install
npm run build
# → Outputs static HTML/CSS/JS to /dist
```

**What PayloadCMS Actually Needs**:
```bash
npm install
next build                    # Build Next.js app
opennextjs-cloudflare build   # Transform Next.js → Cloudflare Worker format
opennextjs-cloudflare deploy  # Deploy to Cloudflare Workers (not Pages)
```

#### What is OpenNext?

**OpenNext** is a build tool that transforms Next.js applications to run on edge platforms like Cloudflare Workers.

**Why it's needed**:

1. **Next.js** expects a Node.js server environment
2. **Cloudflare Workers** use V8 isolates (not Node.js)
3. **OpenNext** bridges the gap by:
   - Converting Next.js server routes to Worker fetch handlers
   - Transforming React Server Components to Worker-compatible format
   - Handling static assets differently
   - Mapping Node.js APIs to Worker APIs

**Build Output**:
```
.open-next/
├── worker.js          # Main Worker entry point
├── functions/         # API routes and server components
├── middleware/        # Next.js middleware
└── assets/            # Static files
```

#### Why Cloudflare Pages Can't Handle This

**Cloudflare Pages** is designed for:
- Static HTML/CSS/JS
- Simple build commands
- No complex transformations

When you connect Git to Pages:
```bash
# What Pages runs:
npm install
npm run build  # Expected to output to /dist
```

**What happens with PayloadCMS**:
```bash
npm run build
# → Tries to run: next build
# → Fails: No Next.js server to run on
# → Even if it worked, no OpenNext transformation
# → Result: Broken deployment
```

#### GitHub Actions Solution

**File**: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Cloudflare Workers

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Install dependencies
        run: pnpm install

      - name: Deploy to Cloudflare Workers
        run: NODE_ENV=production pnpm run deploy:app
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          PAYLOAD_SECRET: ${{ secrets.PAYLOAD_SECRET }}
```

**What this does**:
1. ✅ Full control over build environment
2. ✅ Runs OpenNext transformation correctly
3. ✅ Deploys to Workers (not Pages)
4. ✅ Manages secrets securely
5. ✅ Automatic on Git push

### Comparison: GitHub Actions vs Pages Git Integration

| Feature | GitHub Actions | Cloudflare Pages Git |
|---------|----------------|----------------------|
| **Static Sites** | ✅ Works | ✅ Works (designed for this) |
| **Next.js Apps** | ✅ Works | ❌ Limited support |
| **OpenNext Build** | ✅ Full support | ❌ Not supported |
| **Deploy to Workers** | ✅ Yes | ❌ Only deploys to Pages |
| **Custom Build Steps** | ✅ Unlimited | ❌ Limited to build command |
| **Secrets Management** | ✅ GitHub Secrets | ✅ Pages Environment Variables |
| **Build Time** | ⏱️ 2-3 minutes | ⏱️ 1-2 minutes |
| **Complexity** | 😰 More setup | 😊 Easier setup |

### Why Not Deploy Backend to Pages?

**Cloudflare Pages** is a hosting service for:
- Static sites (HTML/CSS/JS)
- Simple server functions (single file handlers)

**Our Backend** is:
- Full Next.js application
- Multiple API routes
- Database connections
- Admin UI
- File uploads

**Result**: Pages can't handle the complexity. Workers is the right platform.

### Alternative Architectures (Why We Didn't Choose Them)

#### Option 1: Deploy Backend to Vercel/Netlify
```
Frontend: Cloudflare Pages
Backend: Vercel Functions
```
**Cons**:
- ❌ Split infrastructure (two platforms)
- ❌ Extra cost (Vercel charges for functions)
- ❌ Worse latency (backend not on edge)

#### Option 2: Use Cloudflare Pages Functions
```
Frontend: Cloudflare Pages
Backend: Pages Functions (single-file API routes)
```
**Cons**:
- ❌ Pages Functions are limited (no Next.js support)
- ❌ Would need to rewrite entire PayloadCMS
- ❌ No OpenNext transformation

#### Option 3: Deploy Everything to Workers
```
Frontend: Cloudflare Workers
Backend: Cloudflare Workers
```
**Cons**:
- ❌ Astro SSG generates static files (don't need Workers)
- ❌ Higher cost (Workers billed per request)
- ❌ Unnecessary complexity

**Our Choice** (Pages + Workers):
```
Frontend: Cloudflare Pages (perfect for SSG)
Backend: Cloudflare Workers (perfect for Next.js)
```
- ✅ Each platform used for its strength
- ✅ All on Cloudflare (single vendor)
- ✅ Free tier covers everything

---

## 3. SSG vs SSR Trade-offs

### When to Use SSG (Our Choice)

**Use SSG when**:
- ✅ Content changes infrequently (daily/weekly/monthly)
- ✅ Speed is critical (e-commerce, landing pages, blogs)
- ✅ Cost matters (free hosting)
- ✅ Content is public (no personalization)
- ✅ SEO is important (search engines love fast sites)

**Examples**:
- Blog posts
- Marketing pages
- Documentation
- **Provider directories** (this project)

### When to Use SSR

**Use SSR when**:
- ✅ Content changes frequently (real-time)
- ✅ Personalized content (user-specific)
- ✅ Dynamic pricing/inventory
- ✅ Real-time data dashboards

**Examples**:
- Social media feeds
- Stock tickers
- User dashboards
- Real-time chat

### Hybrid Approach (Not Used Here)

Astro supports mixing SSG and SSR:
```astro
---
// Page 1: Static (SSG)
export const prerender = true;
---

---
// Page 2: Dynamic (SSR)
export const prerender = false;
---
```

**Could use for**:
- Most pages: SSG (fast, cheap)
- Search page: SSR (real-time filters)
- Admin dashboard: SSR (user-specific)

**Why we don't need it**:
- All pages are public
- No real-time requirements
- Cost savings from 100% SSG outweigh benefits

---

## 4. Cloudflare Platform Choice

### Why Cloudflare (vs Alternatives)

#### Option 1: Netlify (Current Frontend Host)
```
Frontend: Netlify
Backend: Netlify Functions
Database: PostgreSQL (Neon/Supabase)
Storage: Netlify Large Media
```
**Pros**:
- ✅ Easy setup
- ✅ Built-in forms
**Cons**:
- ❌ Functions are expensive at scale
- ❌ Large Media has file size limits
- ❌ Not truly global edge

#### Option 2: Vercel
```
Frontend: Vercel
Backend: Vercel Functions
Database: Vercel Postgres
Storage: Vercel Blob
```
**Pros**:
- ✅ Excellent Next.js support
- ✅ Fast deployments
**Cons**:
- ❌ Expensive ($20-100/month for small projects)
- ❌ Function execution limits
- ❌ Vendor lock-in

#### Option 3: AWS (Traditional)
```
Frontend: S3 + CloudFront
Backend: Lambda + API Gateway
Database: RDS or DynamoDB
Storage: S3
```
**Pros**:
- ✅ Unlimited scalability
- ✅ Every feature imaginable
**Cons**:
- ❌ Extremely complex setup
- ❌ High learning curve
- ❌ Expensive ($50-500/month)

#### Our Choice: Cloudflare
```
Frontend: Cloudflare Pages
Backend: Cloudflare Workers
Database: Cloudflare D1
Storage: Cloudflare R2
```
**Pros**:
- ✅ **Free tier covers everything** (100k requests/day)
- ✅ **True global edge** (300+ cities)
- ✅ **Single platform** (easier management)
- ✅ **Fast** (<50ms TTFB globally)
- ✅ **Simple pricing** (no surprises)

**Cons**:
- ❌ D1 is newer (less mature than PostgreSQL)
- ❌ Worker limitations (no Node.js built-ins)
- ❌ Learning curve for Workers API

**Cost Comparison** (for this project):
- Cloudflare: **$0-5/month**
- Netlify: **$10-30/month**
- Vercel: **$20-100/month**
- AWS: **$50-500/month**

---

## Summary

### Key Decisions Recap

1. **SSG for Frontend**
   - Pre-generate HTML at build time
   - Rebuild on content changes (2-3 minutes acceptable)
   - Benefits: Speed, cost, simplicity

2. **GitHub Actions for Backend**
   - PayloadCMS needs OpenNext transformation
   - Cloudflare Pages can't handle complex Next.js builds
   - GitHub Actions gives full control over deployment

3. **Cloudflare Platform**
   - Free tier covers entire project
   - Global edge network for speed
   - Single vendor simplifies management

### Trade-offs We Made

| Decision | We Chose | Alternative | Why |
|----------|----------|-------------|-----|
| **Data Fetching** | SSG | SSR | Speed > Real-time |
| **Backend Deployment** | GitHub Actions | Pages Git | OpenNext required |
| **Platform** | Cloudflare | AWS/Vercel | Cost + Simplicity |
| **Database** | D1 (SQLite) | PostgreSQL | Serverless + Free |

---

**End of Document**
