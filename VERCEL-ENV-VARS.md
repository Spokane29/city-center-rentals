# Vercel Environment Variables Setup

## ✅ Deployment Complete!

Your site is live at: **https://city-center-rentals.vercel.app**

## 🔧 Add Environment Variables

Go to: https://vercel.com/mccoybill-8240s-projects/city-center-rentals/settings/environment-variables

### Required Variables

Add these one by one:

#### 1. NEXT_PUBLIC_SUPABASE_URL
```
https://ikdcngemtzjfurjduljs.supabase.co
```

#### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrZGNuZ2VtdHpqZnVyamR1bGpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NjM0ODQsImV4cCI6MjA4MzAzOTQ4NH0.3Y9t1fHtV36gR4D-2uyxTbitTQ-wBuZY4pXorkInl6g
```

#### 3. SUPABASE_SERVICE_ROLE_KEY
⚠️ **Get this from Supabase Dashboard:**
1. Go to: https://supabase.com/dashboard/project/ikdcngemtzjfurjduljs/settings/api
2. Scroll to "service_role" key (⚠️ Keep this secret!)
3. Copy and paste here

#### 4. NEXT_PUBLIC_SITE_URL
```
https://city-center-rentals.vercel.app
```

### Optional Variables

#### 5. NEXT_PUBLIC_GOOGLE_MAPS_KEY
(Add when you get Google Maps API key)

#### 6. NEXT_PUBLIC_FB_PIXEL_ID
(Add later when you have Facebook Pixel)

## 📝 Steps to Add:

1. Click "Add New" for each variable
2. Enter the name (exactly as shown above)
3. Enter the value
4. Select "Production", "Preview", and "Development" environments
5. Click "Save"
6. After adding all variables, go to Deployments tab
7. Click "..." on latest deployment → "Redeploy"

## ✅ After Adding Variables:

1. **Redeploy** the project (see steps above)
2. **Test the site:**
   - Form submission
   - Admin login
   - All pages

3. **Create admin user:**
   - Go to: https://supabase.com/dashboard/project/ikdcngemtzjfurjduljs/auth/users
   - Click "Add User"
   - Enter email and password

## 🎯 Quick Links

- **Vercel Dashboard:** https://vercel.com/mccoybill-8240s-projects/city-center-rentals
- **Live Site:** https://city-center-rentals.vercel.app
- **Supabase Settings:** https://supabase.com/dashboard/project/ikdcngemtzjfurjduljs/settings/api
- **Supabase Auth:** https://supabase.com/dashboard/project/ikdcngemtzjfurjduljs/auth/users

