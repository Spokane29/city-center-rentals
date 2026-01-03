# Quick Start Guide

## 1. Test Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

**Test the form with your real phone number** - you should receive an SMS!

## 2. Get Your Supabase Keys

1. Go to: https://supabase.com/dashboard/project/ikdcngemtzjfurjduljs/settings/api
2. Copy these values to `.env.local`:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

## 3. Create Admin User

1. Go to: https://supabase.com/dashboard/project/ikdcngemtzjfurjduljs/auth/users
2. Click "Add User"
3. Enter your email and password
4. Click "Create User"

## 4. Deploy to Vercel

### Option A: I can deploy for you
Just say "deploy to Vercel" and I'll use the Vercel MCP to deploy it automatically.

### Option B: Manual deployment
1. Push to GitHub (use Cursor's Git UI or terminal)
2. Go to https://vercel.com
3. Import your GitHub repo
4. Add environment variables (see DEPLOYMENT-GUIDE.md)
5. Deploy!

## 5. Test Production

After deployment:
- Test form submission
- Check SMS notification
- Verify lead in Supabase
- Test admin login

## Next Steps

1. Add Facebook Pixel ID when ready
2. Create Facebook ad campaign
3. Use UTM parameters: `?utm_source=facebook&utm_medium=cpc&utm_campaign=your_campaign`
4. Monitor leads in LeasingVoice
5. Check analytics in admin dashboard
