# Stage 5: Supabase Database + Analytics Tracking - Complete ✅

## What Was Set Up

### 1. Database Tables Created ✅

Three tables were created in Supabase:

- **`properties`** - Stores property information (seeded with City Center Apartments)
- **`leads`** - Stores lead submissions with UTM tracking and LeasingVoice sync status
- **`page_visits`** - Tracks page visits for analytics

### 2. API Routes Created ✅

- **`/app/api/leads/route.ts`** - Handles form submissions
  - Submits to LeasingVoice API (primary)
  - Saves to Supabase (backup + analytics)
  - Captures UTM parameters and referrer

- **`/app/api/visits/route.ts`** - Tracks page visits
  - Records session ID, page path, referrer
  - Captures UTM parameters
  - Tracks device type

### 3. Components Updated ✅

- **`LeadForm.tsx`** - Updated to:
  - Submit to `/api/leads` instead of directly to LeasingVoice
  - Capture UTM parameters from URL
  - Track referrer
  - Fire Facebook Pixel "Lead" event on success

- **`Analytics.tsx`** - New component:
  - Generates/retrieves session ID
  - Tracks page visits automatically
  - Captures UTM parameters
  - Detects device type

### 4. Layout Updated ✅

- **`app/layout.tsx`** - Added:
  - Facebook Pixel script (conditional on env var)
  - Analytics component

## Next Steps

### 1. Set Up Environment Variables

Create `.env.local` file (see `ENV-SETUP.md` for details):

```env
NEXT_PUBLIC_SUPABASE_URL=https://ikdcngemtzjfurjduljs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_FB_PIXEL_ID=your_pixel_id_here
```

**To get your keys:**
1. Go to https://supabase.com/dashboard/project/ikdcngemtzjfurjduljs/settings/api
2. Copy the **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Copy the **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep secret!)

### 2. Test the Integration

1. Start dev server: `npm run dev`
2. Fill out the lead form
3. Check Supabase dashboard → `leads` table to see the submission
4. Check `page_visits` table to see analytics data

### 3. Verify Database

Tables are created and seeded. You can verify in Supabase:
- **properties** table has 1 row (City Center Apartments)
- **leads** table is empty (ready for submissions)
- **page_visits** table is empty (ready for tracking)

## Features

✅ **Dual Storage**: Leads saved to both LeasingVoice (primary) and Supabase (backup)
✅ **UTM Tracking**: All UTM parameters captured for marketing attribution
✅ **Analytics**: Page visits tracked automatically
✅ **Facebook Pixel**: Lead events fired on form submission
✅ **Session Tracking**: Unique session IDs for visitor tracking
✅ **Device Detection**: Mobile vs desktop tracking

## Database Schema

### Properties Table
- Property details (name, address, rent, features)
- Supports future multi-property expansion

### Leads Table
- Form submission data
- UTM parameters (source, medium, campaign, content)
- Referrer tracking
- LeasingVoice sync status
- Lead status tracking

### Page Visits Table
- Session tracking
- Page path tracking
- UTM parameter capture
- Device type detection
- User agent tracking

## API Endpoints

- `POST /api/leads` - Submit lead form
- `POST /api/visits` - Track page visit

Both endpoints require environment variables to be set.

