# HIV Connect Central NJ - Production Deployment Checklist

## Pre-Deployment Requirements

### 1. Resolve Critical Issues

#### Backend Deployment
- [ ] **Fix Cloudflare Workers 500 errors**
  - Option A: Wait for PayloadCMS v3 + Next.js 15 compatibility improvements
  - Option B: Deploy to alternative platform (Vercel, Railway, traditional VPS)
  - Option C: Downgrade Next.js version if compatible with PayloadCMS
  - **Decision needed**: Choose hosting platform

#### Content Update Strategy
- [ ] **Implement solution for CMS-to-Frontend updates**
  - **Current issue**: Static site requires rebuild for CMS changes to appear
  - **Impact**: Provider status changes, new providers, data updates

  **Choose ONE approach:**

  - [ ] **Option A: Webhook-Triggered Rebuilds** (Recommended)
    - Set up PayloadCMS webhook on provider save/update/delete
    - Configure deployment platform webhook (Vercel/Netlify/Cloudflare Pages)
    - Test: Change provider → Wait 2-3 min → Verify frontend updated
    - **Pros**: Simple, automatic, works with static hosting
    - **Cons**: 1-3 minute delay for changes to appear

  - [ ] **Option B: Incremental Static Regeneration (ISR)**
    - Switch Astro config to `output: 'hybrid'`
    - Set revalidation period (e.g., 300 seconds = 5 minutes)
    - Configure getStaticPaths with revalidation
    - **Pros**: Automatic, no webhooks needed
    - **Cons**: Requires server runtime, higher costs

  - [ ] **Option C: Server-Side Rendering (SSR)**
    - Switch Astro config to `output: 'server'` for provider pages
    - Deploy to platform supporting SSR (Vercel, Netlify, Node.js server)
    - **Pros**: Real-time updates, no rebuild needed
    - **Cons**: Higher costs, slower initial page loads

  - [ ] **Option D: Hybrid Approach** (Best for performance + updates)
    - Keep homepage, about, static pages as SSG
    - Use SSR for `/find-services`, `/providers/*`
    - Implement aggressive caching (5-minute CDN cache)
    - **Pros**: Best of both worlds
    - **Cons**: More complex configuration

### 2. Infrastructure Setup

#### Backend Production
- [ ] Deploy PayloadCMS backend to chosen platform
- [ ] Verify D1 database connection (production DB: `4dc8866a-3444-46b8-b73a-4def21b45772`)
- [ ] Verify R2 storage connection (`hivconnect-media-production`)
- [ ] Configure production environment variables:
  - [ ] `PAYLOAD_SECRET` (regenerate for production)
  - [ ] `PAYLOAD_PUBLIC_SERVER_URL` (production API URL)
  - [ ] `CORS_ORIGINS` (production frontend URLs)
- [ ] Test API endpoints:
  - [ ] GET /api/providers (verify all 17 providers)
  - [ ] GET /api/providers?where[status][equals]=active
  - [ ] GET /api/providers/{slug}
- [ ] Set up monitoring and error tracking
- [ ] Configure automated backups

#### Frontend Production
- [x] Choose hosting platform: **Cloudflare Pages** ✅
- [x] Configure build command: `npm run build` ✅
- [x] Configure output directory: `dist/` ✅
- [x] Optimize images for deployment (compressed 5 images from 11-50MB to 460KB-766KB) ✅
- [x] Deploy to Cloudflare Pages: https://0da7b960.hivconnect-frontend.pages.dev ✅
- [x] Verify all 33 pages deployed successfully ✅
- [x] Set up SSL certificate (automatic with Cloudflare Pages) ✅
- [ ] Set environment variable:
  - [ ] `PUBLIC_API_URL` (production backend API URL) - Waiting for backend deployment
- [ ] Configure custom domain: `hivconnectcnj.org`
- [ ] Configure redirects (www → non-www, etc.)

#### Content Update Automation (if using webhooks)
- [ ] Add PayloadCMS webhook configuration
- [ ] Test webhook triggers on provider save/delete
- [ ] Monitor first few production updates
- [ ] Document rebuild process for team

### 3. Performance Optimization

#### Frontend
- [ ] Run Lighthouse audit (target: 90+ on all metrics)
- [ ] Optimize images (provider logos → WebP format)
- [ ] Implement lazy loading for provider cards
- [ ] Add service worker for offline functionality (optional)
- [ ] Configure CDN caching headers
- [ ] Minify CSS and JavaScript

#### Backend
- [ ] Enable API response caching (if applicable)
- [ ] Configure rate limiting
- [ ] Set up API monitoring
- [ ] Test API performance under load

### 4. SEO & Analytics

#### SEO
- [ ] Generate sitemap.xml (dynamic from API)
- [ ] Add robots.txt
- [ ] Implement structured data (Schema.org JSON-LD for providers)
- [ ] Verify meta tags on all pages
- [ ] Add Open Graph tags
- [ ] Add Twitter Cards
- [ ] Submit sitemap to Google Search Console
- [ ] Submit to Bing Webmaster Tools

#### Analytics
- [ ] Install Google Analytics 4 or Plausible
- [ ] Set up goal tracking (provider page views, contact clicks)
- [ ] Configure event tracking
- [ ] Set up admin dashboard for metrics

### 5. Security & Compliance

#### Security
- [ ] Enable HTTPS (should be automatic)
- [ ] Configure CORS correctly (production domains only)
- [ ] Set security headers (CSP, X-Frame-Options, etc.)
- [ ] Review PayloadCMS admin access (change default passwords)
- [ ] Enable two-factor authentication for admin users
- [ ] Set up regular security audits

#### Compliance
- [ ] Add privacy policy page
- [ ] Add terms of service page
- [ ] Ensure HIPAA compliance (if applicable)
- [ ] Add cookie consent banner (if needed)
- [ ] Review accessibility (WCAG 2.1 AA compliance)

### 6. Testing

#### Pre-Launch Testing
- [ ] Test all provider pages load correctly
- [ ] Test provider search/filter functionality
- [ ] Test contact forms (if implemented)
- [ ] Test on mobile devices (iOS Safari, Android Chrome)
- [ ] Test on desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test accessibility with screen reader
- [ ] Test navigation and all internal links
- [ ] Verify external links work (provider websites, phone numbers)

#### CMS Testing
- [ ] Log in to production admin panel
- [ ] Create test provider
- [ ] Verify it appears on frontend (wait for rebuild/cache)
- [ ] Edit test provider
- [ ] Change status to inactive
- [ ] Verify it disappears from frontend
- [ ] Delete test provider

### 7. Monitoring & Maintenance

#### Monitoring Setup
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom, etc.)
- [ ] Configure error alerts (email/Slack notifications)
- [ ] Set up performance monitoring
- [ ] Create dashboard for key metrics
- [ ] Document incident response procedure

#### Backup Strategy
- [ ] Automated D1 database backups (daily)
- [ ] R2 media backups (weekly)
- [ ] Provider data export (weekly CSV backup)
- [ ] Test restore procedure

### 8. Documentation

#### For Administrators
- [ ] Create admin user guide (how to add/edit providers)
- [ ] Document content update workflow
- [ ] Create troubleshooting guide
- [ ] Document backup/restore procedures

#### For Developers
- [ ] Update README with production setup
- [ ] Document deployment process
- [ ] Create runbook for common issues
- [ ] Document environment variables

### 9. Launch Preparation

#### Content Review
- [ ] Verify all 17 providers have correct data
- [ ] Check provider contact information is current
- [ ] Verify hours of operation are accurate
- [ ] Ensure provider logos are uploaded
- [ ] Proofread all content for typos

#### Soft Launch
- [ ] Deploy to production
- [ ] Test with small group of users
- [ ] Monitor error logs
- [ ] Collect feedback
- [ ] Make necessary adjustments

#### Public Launch
- [ ] Announce to stakeholders
- [ ] Submit to relevant directories
- [ ] Share on social media (if applicable)
- [ ] Monitor traffic and errors closely
- [ ] Be ready for quick fixes

### 10. Post-Launch

#### Week 1
- [ ] Monitor daily for errors
- [ ] Check analytics for traffic patterns
- [ ] Review user feedback
- [ ] Fix any critical bugs
- [ ] Document any issues encountered

#### Month 1
- [ ] Review SEO performance
- [ ] Analyze user behavior (popular pages, bounce rate)
- [ ] Optimize based on analytics
- [ ] Plan content additions (blog, resources)
- [ ] Schedule regular provider data audits

---

## Current Status: FRONTEND DEPLOYED ✅ | BACKEND PENDING

**Frontend**: ✅ DEPLOYED to Cloudflare Pages
- URL: https://0da7b960.hivconnect-frontend.pages.dev
- Status: All 33 pages live and operational
- Images: Optimized (5 images compressed 98%+)
- Security: Headers configured correctly
- SSL: Enabled automatically

**Backend**: 🚧 BLOCKED - Cloudflare Workers 500 errors
- Local development: ✅ Working (http://localhost:3000)
- Cloudflare Workers: ❌ Runtime errors
- Suspected cause: PayloadCMS v3 + Next.js 15 compatibility

**Tomorrow's Priority (Dec 3, 2025)**:
1. **Debug Cloudflare Workers deployment**
   - Review Wrangler deployment logs in detail
   - Test with simpler Next.js configuration
   - Research PayloadCMS + Workers compatibility
   - Consider alternative deployment platforms if needed

2. **Backend Deployment Options**:
   - Option A: Fix Cloudflare Workers (preferred)
   - Option B: Deploy to Vercel (Next.js native)
   - Option C: Deploy to Railway (simple alternative)

3. **Post-Backend Deployment**:
   - Update frontend `PUBLIC_API_URL` environment variable
   - Rebuild and redeploy frontend with production API
   - Test full end-to-end integration
   - Configure webhook-triggered rebuilds

---

## Quick Deploy Commands (Once Unblocked)

### Backend Deploy
```bash
# If using Cloudflare Workers
cd mshtga-backend-workers
pnpm run deploy

# If using Vercel
vercel deploy --prod

# If using Railway
railway up
```

### Frontend Deploy
```bash
# Build locally
cd mshtga
npm run build

# Deploy to chosen platform
# Vercel: vercel deploy --prod
# Netlify: netlify deploy --prod
# Cloudflare Pages: wrangler pages deploy dist
```

---

**Last Updated**: December 3, 2025
**Status**: Frontend deployed ✅ | Backend deployment in progress 🚧
**Version**: 1.1.0
