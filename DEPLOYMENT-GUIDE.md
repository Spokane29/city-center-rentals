# Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Variables

Make sure `.env.local` has all required values:

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://ikdcngemtzjfurjduljs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Google Maps (Optional but recommended)
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key

# Facebook Pixel (Optional - add later)
NEXT_PUBLIC_FB_PIXEL_ID=

# Site URL (Update after deployment)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**To get Supabase keys:**
1. Go to https://supabase.com/dashboard/project/ikdcngemtzjfurjduljs/settings/api
2. Copy "Project URL" → `NEXT_PUBLIC_SUPABASE_URL`
3. Copy "anon public" key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Copy "service_role" key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep secret!)

## 2. Local Testing

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

Open http://localhost:3000 and test:
- Homepage loads
- Form submission works
- Admin login works
- All pages accessible

## 3. Git Setup

### Option A: Using Cursor's Git UI

1. Click Source Control icon (Cmd+Shift+G)
2. Click "Initialize Repository" if needed
3. Stage all files
4. Commit message: "Initial commit: City Center Rentals landing page"
5. Click "Commit"
6. Click "Publish Branch" → Create GitHub repo

### Option B: Using Terminal

```bash
# Initialize git (if not already)
git init

# Stage all files
git add .

# Commit
git commit -m "Initial commit: City Center Rentals landing page"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/city-center-rentals.git
git branch -M main
git push -u origin main
```

## 4. Deploy to Vercel

### Using Vercel MCP (Recommended)

I can deploy this for you using the Vercel MCP. Just confirm and I'll:
1. Deploy the project
2. Set up environment variables
3. Get you the live URL

### Manual Deployment

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure:

**Framework Preset:** Next.js (auto-detected)
**Root Directory:** ./
**Build Command:** `npm run build`
**Output Directory:** .next

6. Add Environment Variables:

| Name | Value |
|------|-------|
| NEXT_PUBLIC_SUPABASE_URL | (from Supabase dashboard) |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | (from Supabase dashboard) |
| SUPABASE_SERVICE_ROLE_KEY | (from Supabase dashboard) |
| NEXT_PUBLIC_GOOGLE_MAPS_KEY | (from Google Cloud Console) |
| NEXT_PUBLIC_FB_PIXEL_ID | (leave empty for now) |
| NEXT_PUBLIC_SITE_URL | (update after deploy: https://your-project.vercel.app) |

7. Click "Deploy"

## 5. Post-Deployment

### Update Environment Variables

After deployment, update `NEXT_PUBLIC_SITE_URL` in Vercel:
1. Go to Project → Settings → Environment Variables
2. Update `NEXT_PUBLIC_SITE_URL` to your Vercel URL
3. Redeploy

### Test Live Site

- [ ] Homepage loads
- [ ] Images load correctly
- [ ] Form submission works
- [ ] SMS notification received
- [ ] Lead saved to Supabase
- [ ] Admin login works
- [ ] Privacy/Terms pages accessible

## 6. Google Maps API Key

If maps aren't loading:

1. Go to https://console.cloud.google.com
2. Create new project or select existing
3. Enable "Maps JavaScript API"
4. Go to Credentials → Create Credentials → API Key
5. Restrict key:
   - Application restrictions: HTTP referrers
   - Add: `localhost:3000/*` and `your-vercel-url.vercel.app/*`
6. Copy API key
7. Add to Vercel environment variables
8. Redeploy

## 7. Facebook Pixel Setup

When ready to add Facebook Pixel:

1. Go to Facebook Business Manager → Events Manager
2. Create new Pixel or use existing
3. Copy Pixel ID (15-16 digit number)
4. Add to Vercel: `NEXT_PUBLIC_FB_PIXEL_ID=your_pixel_id`
5. Redeploy

The pixel will automatically track:
- PageView (on every page load)
- Lead (when form is submitted successfully)

## 8. Custom Domain (Optional)

1. In Vercel dashboard → Project → Settings → Domains
2. Add your domain (e.g., citycenterspokane.com)
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` to your custom domain
5. Wait for DNS propagation (can take up to 48 hours)

## Troubleshooting

### Build Fails
- Check environment variables are set
- Check for TypeScript errors: `npm run build`
- Check console for specific errors

### Form Not Submitting
- Check browser console for errors
- Verify Supabase keys are correct
- Check LeasingVoice API is accessible
- Verify phone number format

### Images Not Loading
- Check image paths are correct
- Verify images are in `/public/images/property/`
- Check file names match exactly

### Admin Login Not Working
- Verify admin user exists in Supabase
- Check Supabase Auth is enabled
- Verify environment variables are set

