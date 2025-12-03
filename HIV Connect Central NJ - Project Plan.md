# HIV Connect Central NJ - Project Plan & Roadmap

## Project Overview

**Mission**: Create a comprehensive, accessible HIV care resource directory for Middlesex, Somerset, and Hunterdon counties in Central New Jersey.

**Tech Stack**:
- **Frontend**: Astro v5.12.6 (Static Site Generator)
- **Backend**: PayloadCMS v3.63.0 + Next.js 15.4.7
- **Database**: Cloudflare D1 (SQLite-compatible)
- **Storage**: Cloudflare R2 (S3-compatible)
- **Deployment**: Cloudflare Workers (backend) + Static hosting (frontend)

---

## Project Status: Phase 3 (Frontend) Complete ✅

### Phase 1: Backend Setup ✅ COMPLETED (Dec 2, 2025 - Morning/Afternoon)

**Objective**: Build and deploy a PayloadCMS backend with provider data

#### Completed Tasks:
- ✅ Migrated from Express to PayloadCMS official Cloudflare template
- ✅ Set up local development environment with Next.js + Payload
- ✅ Created 7 collections (Providers, Resources, Blog, PDFLibrary, Tags, Users, Media)
- ✅ Created SiteSettings global configuration
- ✅ Configured Cloudflare D1 database adapter
- ✅ Configured Cloudflare R2 storage adapter
- ✅ Imported all 17 HIV service providers via migration script
- ✅ Set up admin panel with user authentication
- ✅ Configured CORS for frontend domains
- ✅ Created staging infrastructure on Cloudflare

#### Technical Achievements:
- PayloadCMS v3 + Next.js 15 + Cloudflare Workers integration
- Full provider data model with comprehensive fields
- Automatic TypeScript type generation
- API endpoints for all collections
- Local SQLite database (D1-compatible) for development

#### Files Created:
- `/mshtga-backend-workers/src/payload.config.ts` - Main configuration
- `/mshtga-backend-workers/src/collections/Providers.ts` - Provider collection
- 6 additional collection files (Resources, Blog, PDFLibrary, Tags, Users, Media)
- `/mshtga-backend-workers/scripts/import-providers.ts` - Data migration script
- `/mshtga-backend-workers/wrangler.jsonc` - Cloudflare configuration

---

### Phase 2: Frontend Integration ✅ COMPLETED (Dec 2, 2025 - Evening)

**Objective**: Connect Astro frontend to PayloadCMS backend API

#### Completed Tasks:
- ✅ Created API utility module (`/mshtga/src/lib/api.ts`)
- ✅ Implemented `fetchProviders()` function with pagination
- ✅ Implemented `fetchProviderBySlug()` function
- ✅ Built data transformation layer (PayloadCMS → Frontend types)
- ✅ Updated `/find-services` page to fetch from API
- ✅ Updated `/providers/[id]` detail pages to fetch from API
- ✅ Updated `/get-tested` page to fetch from API
- ✅ Updated `/treatment-care` page to fetch from API
- ✅ Updated `/support-resources` page to fetch from API
- ✅ Verified all 17 providers display correctly
- ✅ Tested service-specific filtering (9 testing, 5 treatment, 11 support)

#### Technical Achievements:
- Dynamic data fetching at build time (Static Site Generation)
- Automatic type-safe transformation from API to frontend types
- No hardcoded provider data - all CMS-driven
- Service filtering working correctly
- Individual provider pages with full data display

#### Files Modified:
- Created: `/mshtga/src/lib/api.ts` (250+ lines)
- Updated: `/mshtga/src/pages/find-services/index.astro`
- Updated: `/mshtga/src/pages/providers/[id].astro`
- Updated: `/mshtga/src/pages/get-tested/index.astro`
- Updated: `/mshtga/src/pages/treatment-care/index.astro`
- Updated: `/mshtga/src/pages/support-resources/index.astro`

#### Current Status:
- **Backend**: http://localhost:3000 (PayloadCMS + API)
- **Frontend**: http://localhost:4321 (Astro + React)
- **Integration**: ✅ Fully connected and operational
- **Providers**: 17/17 displaying correctly

---

## Phase 3: Frontend Production Deployment ✅ COMPLETED (Dec 2, 2025 - Night)

**Status**: ✅ Frontend deployed to Cloudflare Pages | 🚧 Backend deployment blocked

### Completed Tasks:
- ✅ Optimized oversized images (5 images compressed from 11-50MB to 460KB-766KB)
- ✅ Created Cloudflare Pages project (`hivconnect-frontend`)
- ✅ Successfully deployed 142 files (33 static pages + assets)
- ✅ All provider pages generated and deployed (17 providers)
- ✅ Verified HTTP 200 responses on all critical pages
- ✅ Configured security headers (CSP, X-Frame-Options, etc.)
- ✅ Implemented provider status filtering (active/inactive/pending)

### Production URLs:
- **Frontend**: https://0da7b960.hivconnect-frontend.pages.dev ✅ LIVE
- **Backend**: Local only (http://localhost:3000) - Cloudflare Workers deployment blocked

### Image Optimization:
- `Two Men Talking to Each Other.jpeg`: 50MB → 766KB (98.5% reduction)
- `shutterstock_1923904889.jpg`: 50MB → 766KB (98.5% reduction)
- `shutterstock_1923902606.jpg`: 46MB → 460KB (99% reduction)
- `shutterstock_612697628.jpg`: 23MB → 623KB (97.3% reduction)
- `shutterstock_144206617.jpg`: 11MB → compressed
- All images resized to max 2000px width, 80% quality

### Deployment Metrics:
- Total files: 142
- Upload time: ~25 seconds
- Build time: 3.24 seconds
- Static pages: 33
- Provider pages: 17
- Security headers: ✅ Configured
- SSL/HTTPS: ✅ Automatic

### Current Blockers (Backend Only):
- ❌ Cloudflare Workers returns 500 errors on all routes
- Suspected cause: PayloadCMS v3 + Next.js 15 + Cloudflare Workers compatibility
- Infrastructure is configured and ready
- Database migrations run successfully
- Build completes without errors

### Backend Deployment Options:
1. **Debug Cloudflare Workers** (Tomorrow's priority)
   - Investigate PayloadCMS v3 + Next.js 15 compatibility
   - Review Cloudflare Workers runtime logs
   - Test with different Next.js/Payload versions

2. **Alternative Platforms**:
   - Vercel (Next.js native platform)
   - Railway (simple deployment)
   - Traditional VPS (maximum control)

### Production Infrastructure:
- ✅ Frontend: Cloudflare Pages (DEPLOYED)
- ✅ Production D1 database: `4dc8866a-3444-46b8-b73a-4def21b45772`
- ✅ Production R2 bucket: `hivconnect-media-production`
- ✅ Staging D1 database: `fc9ab010-f7bc-4dc2-8030-1438bb49a8cc`
- ✅ Staging R2 bucket: `hivconnect-media-staging`
- ✅ Wrangler configuration complete
- ✅ Environment secrets configured

---

## Phase 4: Content & Feature Enhancement (PENDING)

**Dependencies**: Phase 3 (Production Deployment)

### Content Population
- [ ] Add Resources (downloadable PDFs, guides)
- [ ] Create Blog posts (HIV education, news, updates)
- [ ] Upload documents to PDFLibrary
- [ ] Configure Tags for content organization
- [ ] Upload provider logos to Media library

### Frontend Enhancements
- [ ] Enhance interactive search with live filtering
- [ ] Integrate Google Maps or Mapbox for provider locations
- [ ] Add distance-based sorting (geolocation)
- [ ] Implement advanced filtering UI (checkboxes, dropdowns)
- [ ] Add "Find Nearest Provider" feature
- [ ] Create printable provider directory page

### Backend Enhancements
- [ ] Configure email adapter (contact forms, notifications)
- [ ] Set up automated backups
- [ ] Implement rate limiting on API
- [ ] Add API caching strategy
- [ ] Create webhook endpoints for integrations

---

## Phase 5: SEO & Analytics (PENDING)

**Dependencies**: Phase 3 (Production Deployment)

### SEO Optimization
- [ ] Generate sitemap.xml dynamically
- [ ] Add structured data (Schema.org JSON-LD)
- [ ] Optimize meta tags for all pages
- [ ] Create robots.txt
- [ ] Implement Open Graph tags
- [ ] Add Twitter Cards
- [ ] Set up canonical URLs
- [ ] Create 404 and error pages

### Analytics & Monitoring
- [ ] Integrate Google Analytics or Plausible
- [ ] Set up Cloudflare Analytics
- [ ] Create admin dashboard for usage metrics
- [ ] Track provider page views
- [ ] Monitor API performance
- [ ] Set up error tracking (Sentry)
- [ ] Configure uptime monitoring

---

## Phase 6: Advanced Features (FUTURE)

### User Features
- [ ] User accounts for personalized provider lists
- [ ] Save favorite providers
- [ ] Provider reviews and ratings (with moderation)
- [ ] Appointment request system
- [ ] SMS appointment reminders
- [ ] Multilingual support (Spanish, Portuguese, etc.)
- [ ] Accessibility audit and improvements

### Provider Features
- [ ] Provider dashboard for self-service updates
- [ ] Analytics for provider pages
- [ ] Real-time availability status
- [ ] Virtual appointment scheduling
- [ ] Direct messaging to providers
- [ ] Provider verification system

### Administrative Features
- [ ] Bulk provider import/export
- [ ] Provider approval workflow
- [ ] Content moderation queue
- [ ] Admin notification system
- [ ] Data export for reporting
- [ ] API key management for partners

---

## Data Status

### Providers Collection: 17 Entries

**By Type:**
- FQHC: 3 (Eric Chandler, Zufall Health, Zufall Mobile)
- Hospital: 2 (RWJ AIDS Program, Raritan Bay)
- Community: 9 (Somerset Treatment, NBCC, VNAHG, Legal Services, Elijah's Promise, MCAT, Planned Parenthood, Woodbridge Health)
- Other: 3 (CVS Pharmacy, Hyacinth AIDS Foundation, etc.)

**By County:**
- Middlesex: 13 providers
- Somerset: 3 providers
- Hunterdon: 1 provider

**By Services:**
- HIV Testing: 9 providers
- HIV Treatment: 5 providers
- PrEP Services: 5 providers
- Case Management: 11 providers
- Mental Health: 8 providers
- Housing Assistance: 7 providers
- Legal Services: 3 providers
- Transportation: 4 providers
- Food/Nutrition: 1 provider

**Ryan White Funding:**
- Part A: 2 providers
- Part B: 10 providers
- Part C: 2 providers

---

## Technical Debt & Known Issues

### High Priority
1. **Cloudflare Workers 500 Errors**: Blocking production deployment
2. **Static Site Content Updates**: SSG means CMS changes require rebuild/redeploy
   - **Impact**: Provider status changes, new providers, data updates not immediate
   - **Solution**: Implement webhook-triggered rebuilds or switch to hybrid SSR/SSG
   - **Files affected**: All provider-related pages
   - **Workaround**: Manual rebuild/redeploy after CMS changes
3. **Frontend Search Performance**: Consider implementing client-side search for better UX
4. **API Error Handling**: Add retry logic and better error messages

### Medium Priority
1. **Content Update Strategy**: Choose production approach (webhooks vs ISR vs SSR)
   - Evaluate Vercel/Netlify webhook integrations
   - Test ISR performance with 5-minute revalidation
   - Consider hybrid: static homepage, SSR provider pages
2. **Type Safety**: Ensure PayloadCMS types match frontend types exactly
3. **Image Optimization**: Implement responsive images for provider logos
4. **Caching Strategy**: Implement ISR or on-demand revalidation in frontend
5. **Provider Logos**: Currently using local assets, should migrate to R2/Media library

### Low Priority
1. **Build Performance**: Consider caching API responses during build
2. **Documentation**: Add JSDoc comments to API utility functions
3. **Testing**: Implement E2E tests for critical user flows
4. **Code Splitting**: Optimize bundle size for faster page loads

---

## Development Workflow

### Starting Development Servers

**Backend:**
```bash
cd /Users/kevincan/Desktop/ShuffleSEO/mshtga-backend-workers
pnpm dev              # Normal start
pnpm devsafe          # Clean cache and start
```

**Frontend:**
```bash
cd /Users/kevincan/Desktop/ShuffleSEO/mshtga
npm run dev
```

### Adding a New Provider

1. Log in to admin: http://localhost:3000/admin
2. Navigate to Providers collection
3. Click "Create New"
4. Fill in all required fields
5. Publish
6. Frontend will automatically fetch on next build/refresh

### Deploying Changes

**To Staging:**
```bash
cd /Users/kevincan/Desktop/ShuffleSEO/mshtga-backend-workers
CLOUDFLARE_ENV=staging pnpm run deploy
```

**To Production (when ready):**
```bash
cd /Users/kevincan/Desktop/ShuffleSEO/mshtga-backend-workers
pnpm run deploy
```

---

## Success Metrics

### Phase 2 Completion (Current):
- ✅ 17/17 providers imported and accessible
- ✅ All frontend pages fetching from API
- ✅ 100% data transformation accuracy
- ✅ 0 hardcoded provider data
- ✅ Admin panel operational

### Phase 3 Goals (Production):
- [ ] 99.9% uptime
- [ ] <500ms API response time
- [ ] <2s page load time
- [ ] 100% SSL/HTTPS
- [ ] Zero critical errors

### Phase 4+ Goals:
- [ ] 50+ providers in database
- [ ] 10+ blog posts published
- [ ] 20+ resources available
- [ ] 1000+ monthly unique visitors
- [ ] <2% bounce rate on provider pages

---

## Team & Contact

**Project Lead**: Kevin Can (Shuffle SEO)

**Backend**: PayloadCMS v3.63.0
- Repository: `/Users/kevincan/Desktop/ShuffleSEO/mshtga-backend-workers`
- Admin: http://localhost:3000/admin

**Frontend**: Astro v5.12.6
- Repository: `/Users/kevincan/Desktop/ShuffleSEO/mshtga`
- Development: http://localhost:4321

**Documentation**: This file and `HIV Connect Central NJ Backend.md`

---

## Timeline

- **Dec 2, 2025 (Morning)**: Phase 1 started - Backend setup
- **Dec 2, 2025 (Afternoon)**: Phase 1 completed - 17 providers imported
- **Dec 2, 2025 (Evening)**: Phase 2 completed - Frontend integration
- **Dec 2, 2025 (Night)**: Phase 3 completed - Frontend deployed to Cloudflare Pages
- **Dec 3, 2025 (Planned)**: Backend deployment to Cloudflare Workers (debugging)
- **TBD**: Phase 4 - Content & features
- **TBD**: Phase 5 - SEO & analytics
- **TBD**: Phase 6 - Advanced features

---

**Last Updated**: December 3, 2025
**Version**: 1.1.0
**Status**: ✅ Phase 3 (Frontend) Complete - Frontend LIVE on Cloudflare Pages | Backend deployment tomorrow
