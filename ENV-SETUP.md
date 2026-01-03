# Environment Variables Setup

Create a `.env.local` file in the root of your project with the following variables:

```env
# Supabase Configuration
# Get these from your Supabase project dashboard: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://ikdcngemtzjfurjduljs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Facebook Pixel (optional)
# Get from Facebook Events Manager: https://business.facebook.com/events_manager
NEXT_PUBLIC_FB_PIXEL_ID=

# Google Maps API Key (optional, for enhanced map features)
NEXT_PUBLIC_GOOGLE_MAPS_KEY=
```

## Getting Your Supabase Keys

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Select your project (currently: `ikdcngemtzjfurjduljs`)
3. Go to Settings → API
4. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** (⚠️ Keep this secret!) → `SUPABASE_SERVICE_ROLE_KEY`

## Getting Your Facebook Pixel ID

1. Go to Facebook Events Manager: https://business.facebook.com/events_manager
2. Select your Pixel
3. Copy the Pixel ID (usually a 15-16 digit number)
4. Add it to `NEXT_PUBLIC_FB_PIXEL_ID`

## Important Notes

- Never commit `.env.local` to git (it's already in `.gitignore`)
- The `SUPABASE_SERVICE_ROLE_KEY` has admin access - keep it secret!
- Restart your dev server after adding/changing environment variables

