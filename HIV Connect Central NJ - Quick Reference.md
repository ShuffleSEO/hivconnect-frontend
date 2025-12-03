# HIV Connect Central NJ - Quick Reference Guide

## Development Server Commands

### Start Both Servers (Recommended)

**Terminal 1 - Backend:**
```bash
cd /Users/kevincan/Desktop/ShuffleSEO/mshtga-backend-workers
pnpm dev
```

**Terminal 2 - Frontend:**
```bash
cd /Users/kevincan/Desktop/ShuffleSEO/mshtga
npm run dev
```

### Access Points
- **Frontend**: http://localhost:4321
- **Backend API**: http://localhost:3000/api
- **Admin Panel**: http://localhost:3000/admin

---

## Common Tasks

### Adding a New Provider

1. Open admin panel: http://localhost:3000/admin
2. Click "Providers" in left sidebar
3. Click "Create New" button
4. Fill in required fields:
   - Name
   - Slug (auto-generated from name)
   - Type (FQHC, Hospital, Community, Other)
   - Location (address, city, county, zip)
   - Contact (phone, website)
   - Services (select applicable services)
5. Click "Save" or "Publish"
6. Frontend will show new provider on next page load

### Editing a Provider

1. Open admin panel: http://localhost:3000/admin
2. Click "Providers" → Find provider in list
3. Click provider name to edit
4. Make changes
5. Click "Save" or "Publish"
6. Changes appear immediately in API and on next frontend build

### Testing API Endpoints

**Get all providers:**
```bash
curl http://localhost:3000/api/providers
```

**Get single provider by slug:**
```bash
curl http://localhost:3000/api/providers?where[slug][equals]=hyacinth-aids-foundation
```

**Filter by county:**
```bash
curl http://localhost:3000/api/providers?where[location.county][equals]=middlesex
```

**Get provider count:**
```bash
curl http://localhost:3000/api/providers | jq '.totalDocs'
```

---

## Troubleshooting

### Backend won't start

**Problem**: Port 3000 already in use

**Solution**:
```bash
# Kill processes on port 3000
lsof -ti:3000 | xargs kill -9

# Restart
cd /Users/kevincan/Desktop/ShuffleSEO/mshtga-backend-workers
pnpm dev
```

### Frontend won't start

**Problem**: Port 4321 already in use

**Solution**:
```bash
# Kill processes on port 4321
lsof -ti:4321 | xargs kill -9

# Restart
cd /Users/kevincan/Desktop/ShuffleSEO/mshtga
npm run dev
```

### Build cache issues

**Problem**: Next.js cache corruption or stale data

**Solution**:
```bash
cd /Users/kevincan/Desktop/ShuffleSEO/mshtga-backend-workers
pnpm devsafe  # Cleans .next and .open-next directories
```

### Frontend not showing new providers

**Problem**: Astro cached data

**Solution**:
```bash
cd /Users/kevincan/Desktop/ShuffleSEO/mshtga
# Stop server (Ctrl+C)
rm -rf .astro/  # Clear Astro cache
npm run dev
```

### CORS errors

**Problem**: Frontend can't access backend API

**Solution**: Check that CORS_ORIGINS in `/mshtga-backend-workers/.env` includes `http://localhost:4321`

---

## File Locations

### Backend (PayloadCMS)
```
/Users/kevincan/Desktop/ShuffleSEO/mshtga-backend-workers/
├── src/
│   ├── collections/
│   │   └── Providers.ts          ← Provider collection schema
│   ├── payload.config.ts         ← Main configuration
│   └── migrations/               ← Database migrations
├── scripts/
│   └── import-providers.ts       ← Provider import script
├── .env                          ← Environment variables
└── wrangler.jsonc               ← Cloudflare config
```

### Frontend (Astro)
```
/Users/kevincan/Desktop/ShuffleSEO/mshtga/
├── src/
│   ├── pages/
│   │   ├── find-services/        ← Provider directory
│   │   ├── providers/[id].astro  ← Provider detail pages
│   │   ├── get-tested/           ← Testing locations
│   │   ├── treatment-care/       ← Treatment providers
│   │   └── support-resources/    ← Support services
│   ├── lib/
│   │   └── api.ts               ← API utility functions
│   ├── data/
│   │   └── providers.ts         ← OLD hardcoded data (not used)
│   └── types/
│       └── provider.ts          ← TypeScript types
```

### Documentation
```
/Users/kevincan/Desktop/ShuffleSEO/
├── HIV Connect Central NJ Backend.md     ← Technical documentation
├── HIV Connect Central NJ - Project Plan.md  ← Roadmap and status
└── HIV Connect Central NJ - Quick Reference.md  ← This file
```

---

## Data Model Quick Reference

### Provider Fields

**Required:**
- `name` - Provider name
- `slug` - URL-friendly identifier
- `type` - FQHC | Hospital | Community | Other
- `location.address` - Street address
- `location.city` - City name
- `location.county` - middlesex | somerset | hunterdon
- `location.zipCode` - ZIP code
- `contact.phone` - Primary phone number

**Optional:**
- `description` - Brief description
- `contact.phone24hr` - 24-hour hotline
- `contact.email` - Email address
- `contact.website` - Website URL
- `hours.monday` through `hours.sunday` - "08:00 - 17:00" or "Closed"
- `coordinates.lat` / `coordinates.lng` - GPS coordinates
- `services.medical` - Array of medical services
- `services.support` - Array of support services
- `services.prevention` - Array of prevention services
- `eligibility` - Array of eligibility requirements
- `ryanWhite` - Boolean
- `ryanWhiteParts` - Array of ["A", "B", "C", "D"]
- `languages` - Array of languages
- `accessibility` - Array of accessibility features
- `insurance` - Array of accepted insurance

---

## API Response Format

### Provider List Response
```json
{
  "docs": [
    {
      "id": 1,
      "name": "Provider Name",
      "slug": "provider-slug",
      "type": "FQHC",
      "location": {
        "address": "123 Main St",
        "city": "New Brunswick",
        "county": "middlesex",
        "zipCode": "08901"
      },
      "contact": {
        "phone": "(732) 555-1234",
        "website": "https://example.org"
      },
      "services": {
        "medical": [{"id": "...", "service": "Hiv Treatment"}],
        "support": [{"id": "...", "service": "Case Management"}],
        "prevention": [{"id": "...", "service": "Hiv Testing"}]
      },
      "ryanWhite": true,
      "ryanWhiteParts": ["A", "B"]
    }
  ],
  "totalDocs": 17,
  "limit": 10,
  "page": 1,
  "totalPages": 2,
  "hasNextPage": true
}
```

---

## Deployment

### Deploy to Staging

```bash
cd /Users/kevincan/Desktop/ShuffleSEO/mshtga-backend-workers
CLOUDFLARE_ENV=staging pnpm run deploy
```

**Note**: Currently experiencing 500 errors. Use local development.

### Deploy to Production (Future)

```bash
cd /Users/kevincan/Desktop/ShuffleSEO/mshtga-backend-workers
pnpm run deploy
```

---

## Useful Commands

### Database

**Run migrations:**
```bash
cd /Users/kevincan/Desktop/ShuffleSEO/mshtga-backend-workers
pnpm payload migrate
```

**Generate types:**
```bash
pnpm generate:types
```

### Cloudflare

**Check Wrangler login:**
```bash
npx wrangler whoami
```

**List secrets:**
```bash
npx wrangler secret list --env staging
```

**View deployment logs:**
```bash
timeout 10 npx wrangler tail hivconnect-backend-staging
```

### Frontend

**Build for production:**
```bash
cd /Users/kevincan/Desktop/ShuffleSEO/mshtga
npm run build
```

**Preview production build:**
```bash
npm run preview
```

---

## Environment Variables

### Backend (.env)
```bash
PAYLOAD_SECRET=<your-secret>
NODE_ENV=development
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:4321,https://hivconnectcnj.org
```

### Frontend (Future)
```bash
PUBLIC_API_URL=http://localhost:3000/api  # Development
# PUBLIC_API_URL=https://api.hivconnectcnj.org/api  # Production
```

---

## Keyboard Shortcuts

**Stop dev server**: `Ctrl+C`
**Clear terminal**: `Cmd+K` (Mac) or `Ctrl+L` (Linux)

---

## Support Resources

- **PayloadCMS Docs**: https://payloadcms.com/docs
- **Astro Docs**: https://docs.astro.build
- **Cloudflare Workers**: https://developers.cloudflare.com/workers/
- **Cloudflare D1**: https://developers.cloudflare.com/d1/

---

**Last Updated**: December 2, 2025
**For**: HIV Connect Central NJ Development Team
