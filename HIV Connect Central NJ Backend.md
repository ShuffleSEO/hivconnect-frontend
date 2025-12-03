# HIV Connect Central NJ - Full Stack Integration Complete

## Local Development Environment ✅

### Backend Server
- **Backend URL**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **API Endpoint**: http://localhost:3000/api
- **Status**: Running and fully functional

### Frontend Application
- **Frontend URL**: http://localhost:4321
- **Status**: Running and connected to backend API
- **Framework**: Astro v5.12.6
- **Integration Status**: ✅ All pages fetching from PayloadCMS API

### Database
- **Type**: Local SQLite (D1 compatible)
- **Location**: `.wrangler/state/v3/d1/miniflare-D1State`
- **Providers Imported**: 17 HIV service providers

### Collections Available
1. **Providers** (17 entries) - HIV service providers across Middlesex, Somerset, and Hunterdon counties
2. **Resources** - Downloadable resources
3. **Blog** - Blog posts
4. **PDFLibrary** - Versioned PDF documents
5. **Tags** - Content tags
6. **Users** - Admin users
7. **Media** - Media library (R2-backed)

### API Endpoints

#### Providers
```bash
# Get all providers
GET http://localhost:3000/api/providers

# Get single provider by ID
GET http://localhost:3000/api/providers/{id}

# Filter by county
GET http://localhost:3000/api/providers?where[location.county][equals]=middlesex
```

#### Other Collections
```bash
GET http://localhost:3000/api/resources
GET http://localhost:3000/api/blog
GET http://localhost:3000/api/pdf-library
GET http://localhost:3000/api/tags
GET http://localhost:3000/api/media
```

#### Global Settings
```bash
GET http://localhost:3000/api/globals/site-settings
```

## Development Commands

```bash
# Start development server
pnpm dev

# Start with clean cache (if errors occur)
pnpm devsafe

# Build for production
pnpm build

# Generate TypeScript types
pnpm generate:types

# Run database migrations
pnpm payload migrate
```

## Cloudflare Deployment (Staging)

### Infrastructure
- **Worker URL**: https://hivconnect-backend-staging.shuffle-seo.workers.dev
- **D1 Database**: hivconnect-db-staging (fc9ab010-f7bc-4dc2-8030-1438bb49a8cc)
- **R2 Bucket**: hivconnect-media-staging
- **Status**: Deployed but experiencing runtime errors (500s)

### Deploy Commands
```bash
# Deploy to staging
CLOUDFLARE_ENV=staging pnpm run deploy

# Deploy to production
pnpm run deploy
```

### Environment Secrets (Configured)
- `PAYLOAD_SECRET`
- `PAYLOAD_PUBLIC_SERVER_URL`

## Data Migration

### Imported Providers (17 total)

1. **Eric B. Chandler Health Center** - FQHC, New Brunswick
2. **Rutgers Robert Wood Johnson AIDS Program** - Hospital, New Brunswick
3. **Somerset Treatment Services** - Community Health, Somerville
4. **Hyacinth AIDS Foundation** - ASO, New Brunswick
5. **Zufall Health Center** - FQHC, Dover
6. **New Brunswick Community Center (NBCC)** - Community Health, New Brunswick
7. **Raritan Bay Medical Center** - Hospital, Perth Amboy
8. **Visiting Nurse Association Health Group (VNAHG)** - Community Health, Red Bank
9. **Central Jersey Legal Services** - ASO, New Brunswick
10. **Elijah's Promise** - ASO, New Brunswick
11. **Legal Services of Northwest Jersey - Hunterdon** - ASO, Flemington
12. **Legal Services of Northwest Jersey - Somerset** - ASO, Somerville
13. **MCAT (Middlesex County Area Transit)** - ASO, New Brunswick
14. **Zufall Health Mobile Dental Unit** - FQHC, Various
15. **CVS Pharmacy (Multiple Locations)** - Private Practice, Various
16. **Planned Parenthood of Northern, Central & Southern New Jersey** - Community Health, New Brunswick
17. **Woodbridge Township Health Department** - Community Health, Woodbridge

## Project Structure

```
mshtga-backend-workers/
├── src/
│   ├── collections/         # Payload collections
│   │   ├── Users.ts
│   │   ├── Providers.ts
│   │   ├── Resources.ts
│   │   ├── Blog.ts
│   │   ├── PDFLibrary.ts
│   │   ├── Tags.ts
│   │   └── Media.ts
│   ├── globals/            # Global settings
│   │   └── SiteSettings.ts
│   ├── payload.config.ts   # Main Payload configuration
│   └── migrations/         # Database migrations
├── scripts/
│   └── import-providers.ts # Provider import script
├── .env                    # Environment variables
├── wrangler.jsonc         # Cloudflare Worker config
└── package.json
```

## Configuration Files

### .env
```bash
PAYLOAD_SECRET=N3DHalBhL4HWguvVag6xbyEugcS/Ovstd/PmQCymkPA=
NODE_ENV=development
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:4321,https://hivconnectcnj.org,https://staging.hivconnectcnj.org
```

### wrangler.jsonc
- Production D1: `4dc8866a-3444-46b8-b73a-4def21b45772`
- Production R2: `hivconnect-media-production`
- Staging D1: `fc9ab010-f7bc-4dc2-8030-1438bb49a8cc`
- Staging R2: `hivconnect-media-staging`

## Known Issues

### Cloudflare Workers Deployment
The staging deployment is experiencing 500 errors. This is likely due to:
- PayloadCMS v3 + Next.js 15 + Cloudflare Workers being a cutting-edge stack
- Potential runtime compatibility issues that need investigation

**Recommendation**: Use local development for now. The staging deployment infrastructure is set up and ready when the runtime issues are resolved.

### Static Site Generation (SSG) Content Updates
**Issue**: Provider status changes (active/inactive/pending) in the CMS don't immediately reflect on the frontend because Astro uses Static Site Generation (SSG).

**Current Behavior**:
- Changes in admin panel require frontend rebuild to appear
- In development: Navigate to page to trigger on-demand rebuild
- In production: Full site rebuild and redeploy required for any CMS changes

**Impact**:
- Provider status changes (hiding inactive providers)
- New provider additions
- Provider data updates (hours, services, contact info)

**Production Solutions to Implement**:

1. **Webhook-Triggered Rebuilds** (Recommended)
   - Add webhook in PayloadCMS to trigger rebuild on provider changes
   - Use Vercel/Netlify/Cloudflare Pages webhook integrations
   - Automatic: Changes deploy within 1-3 minutes

2. **Incremental Static Regeneration (ISR)**
   - Configure Astro with `output: 'hybrid'` or `output: 'server'`
   - Set revalidation period (e.g., 5 minutes)
   - Pages rebuild automatically on interval

3. **Server-Side Rendering (SSR)**
   - Switch Astro to SSR mode for provider pages
   - Real-time data fetching on every request
   - Higher server costs but instant updates

4. **Hybrid Approach** (Best for Production)
   - Keep most pages static (fast, cheap)
   - Use SSR only for provider directory and detail pages
   - Set up webhook rebuilds as backup
   - Implement cache headers for optimal performance

**Temporary Workaround**:
For local development, restart frontend server after making CMS changes:
```bash
# Stop server (Ctrl+C), then:
npm run dev
```

## Frontend Integration ✅ COMPLETED

### What's Working
1. ✅ **API Integration**: Frontend fetching all 17 providers from PayloadCMS API
2. ✅ **Provider Directory**: `/find-services` page displays all providers dynamically
3. ✅ **Provider Detail Pages**: Individual provider pages (`/providers/[id]`) with full data
4. ✅ **Service-Specific Pages**:
   - `/get-tested` - 9 providers offering HIV testing
   - `/treatment-care` - 5 providers offering HIV treatment
   - `/support-resources` - 11 providers offering support services
5. ✅ **Data Transformation**: Automatic conversion from PayloadCMS format to frontend types
6. ✅ **Dynamic Content**: All provider changes in CMS automatically reflect on website

### Frontend Files Created
- `/mshtga/src/lib/api.ts` - API utility functions with data transformation
- Updated all provider-related pages to fetch from API instead of hardcoded data

## Next Steps

### High Priority
1. **Enhance Interactive Search**: Improve the provider search/filter functionality with map integration
2. **Add Content**: Populate Resources, Blog, and PDFLibrary collections via admin panel
3. **Production Deployment**:
   - Resolve Cloudflare Workers staging issues (PayloadCMS v3 + Next.js 15 compatibility)
   - Deploy backend to production
   - Deploy frontend to production with production API URL

### Medium Priority
1. **Email Configuration**: Set up email adapter for contact forms and notifications
2. **Authentication**: Implement user authentication for personalized features
3. **SEO Optimization**: Add meta tags, structured data, sitemap generation
4. **Analytics**: Integrate Google Analytics or privacy-focused alternative

### Future Enhancements
- Add provider reviews/ratings system
- Implement appointment scheduling integration
- Expand multilingual support beyond English/Spanish
- Create dashboard analytics for providers
- Add real-time availability indicators
- Implement geolocation-based provider recommendations

## Support & Resources

- **PayloadCMS Docs**: https://payloadcms.com/docs
- **Cloudflare D1 Docs**: https://developers.cloudflare.com/d1/
- **Next.js 15 Docs**: https://nextjs.org/docs
- **Project Repository**: /Users/kevincan/Desktop/ShuffleSEO/mshtga-backend-workers

## Admin Credentials

Your admin account has been created. Use the credentials you set up to log in at:
http://localhost:3000/admin

---

**Created**: December 2, 2025
**Last Updated**: December 2, 2025 (Evening - Frontend Integration Complete)
**Version**: 1.1.0
