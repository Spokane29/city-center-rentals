# Stage 7: Local Testing + GitHub + Vercel Deployment - Complete ✅

## What Was Set Up

### 1. Documentation Created ✅
- **TESTING-CHECKLIST.md** - Comprehensive testing guide
- **DEPLOYMENT-GUIDE.md** - Step-by-step deployment instructions
- **QUICK-START.md** - Quick reference guide
- **README.md** - Project overview and documentation

### 2. Git Repository Initialized ✅
- Git repository initialized
- Branch set to `main`
- Ready for GitHub push

## Next Steps

### 1. Test Locally

```bash
npm run dev
```

Open http://localhost:3000 and test:
- ✅ Homepage loads
- ✅ Form submission works
- ✅ Admin login works
- ✅ All pages accessible

**Important:** Test the form with your real phone number to verify SMS notifications work!

### 2. Set Up Environment Variables

Create `.env.local` with your Supabase keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ikdcngemtzjfurjduljs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key
NEXT_PUBLIC_FB_PIXEL_ID=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Get your keys from:**
https://supabase.com/dashboard/project/ikdcngemtzjfurjduljs/settings/api

### 3. Create Admin User

1. Go to: https://supabase.com/dashboard/project/ikdcngemtzjfurjduljs/auth/users
2. Click "Add User"
3. Enter your email and password
4. Click "Create User"

### 4. Push to GitHub

#### Option A: Using Cursor's Git UI (Easiest)

1. Click Source Control icon (Cmd+Shift+G)
2. Stage all files (click "+" next to "Changes")
3. Enter commit message: "Initial commit: City Center Rentals landing page"
4. Click "Commit"
5. Click "Publish Branch"
6. Follow prompts to create GitHub repository

#### Option B: Using Terminal

```bash
git add .
git commit -m "Initial commit: City Center Rentals landing page"

# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/city-center-rentals.git
git push -u origin main
```

### 5. Deploy to Vercel

#### Option A: Vercel Git Integration (Recommended)

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure environment variables (see below)
6. Click "Deploy"

#### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

Follow prompts and add environment variables when asked.

### 6. Environment Variables for Vercel

Add these in Vercel dashboard → Project → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service role key |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | Your Google Maps API key |
| `NEXT_PUBLIC_FB_PIXEL_ID` | (Leave empty for now) |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel URL (update after deploy) |

### 7. Post-Deployment

After deployment:

1. **Update `NEXT_PUBLIC_SITE_URL`** in Vercel to your production URL
2. **Test the live site:**
   - Form submission
   - SMS notifications
   - Admin login
   - All pages

3. **Get Google Maps API Key** (if maps aren't loading):
   - Go to https://console.cloud.google.com
   - Enable "Maps JavaScript API"
   - Create API key
   - Restrict to your domains
   - Add to Vercel env vars

4. **Add Facebook Pixel** (when ready):
   - Get Pixel ID from Facebook Events Manager
   - Add to Vercel: `NEXT_PUBLIC_FB_PIXEL_ID`
   - Redeploy

## Testing Checklist

See [TESTING-CHECKLIST.md](./TESTING-CHECKLIST.md) for complete testing guide.

**Key tests:**
- [ ] Homepage loads correctly
- [ ] Form submission works
- [ ] SMS notification received
- [ ] Lead saved to Supabase
- [ ] Admin login works
- [ ] All pages accessible
- [ ] Mobile responsive

## Troubleshooting

### Build Fails
- Check all environment variables are set
- Run `npm run build` locally to check for errors

### Form Not Submitting
- Check browser console for errors
- Verify Supabase keys are correct
- Check LeasingVoice API is accessible

### Admin Login Not Working
- Verify admin user exists in Supabase
- Check environment variables are set correctly

## Success Indicators

✅ Site is live on Vercel
✅ Form submissions work
✅ SMS notifications sent
✅ Leads saved to Supabase
✅ Admin dashboard accessible
✅ Analytics tracking working

## Next Steps After Deployment

1. **Create Facebook Ad Campaign**
   - Use UTM parameters: `?utm_source=facebook&utm_medium=cpc&utm_campaign=your_campaign`
   - Point to your Vercel URL

2. **Monitor Performance**
   - Check LeasingVoice dashboard for leads
   - Check admin dashboard for analytics
   - Monitor conversion rates

3. **Optimize**
   - A/B test different headlines
   - Test different CTA buttons
   - Monitor which sources convert best

## Files Created

- ✅ `.gitignore` - Git ignore rules
- ✅ `TESTING-CHECKLIST.md` - Testing guide
- ✅ `DEPLOYMENT-GUIDE.md` - Deployment instructions
- ✅ `QUICK-START.md` - Quick reference
- ✅ `README.md` - Project documentation
- ✅ Git repository initialized

Your project is ready for deployment! 🚀

