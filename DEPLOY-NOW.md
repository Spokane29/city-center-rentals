# Quick Deploy Instructions

## ✅ Completed Steps

1. ✅ Git repository initialized
2. ✅ All files committed
3. ✅ Build verified (works correctly)
4. ✅ Vercel CLI detected

## Next Steps

### Option 1: Deploy via Vercel CLI (Recommended)

Run these commands:

```bash
# Login to Vercel (if not already)
vercel login

# Deploy (will prompt for project settings)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your team)
# - Link to existing project? No
# - Project name? city-center-rentals (or your choice)
# - Directory? ./
# - Override settings? No
```

After deployment, add environment variables in Vercel dashboard.

### Option 2: Deploy via GitHub + Vercel Dashboard

1. **Push to GitHub:**
   ```bash
   # Create repo on GitHub first, then:
   git remote add origin https://github.com/YOUR_USERNAME/city-center-rentals.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repo
   - Add environment variables
   - Deploy

## Required Environment Variables

Add these in Vercel → Project → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://ikdcngemtzjfurjduljs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=(get from Supabase dashboard)
SUPABASE_SERVICE_ROLE_KEY=(get from Supabase dashboard)
NEXT_PUBLIC_GOOGLE_MAPS_KEY=(optional, get from Google Cloud)
NEXT_PUBLIC_FB_PIXEL_ID=(optional, add later)
NEXT_PUBLIC_SITE_URL=(update after deploy to your Vercel URL)
```

## After Deployment

1. Update `NEXT_PUBLIC_SITE_URL` to your Vercel URL
2. Test the live site
3. Create admin user in Supabase
4. Test form submission

