# City Center Apartments - Rental Landing Page

A modern, conversion-optimized landing page for City Center Apartments in Spokane, WA.

## Features

- 🏠 Beautiful property showcase with photo gallery
- 📱 Mobile-first responsive design
- 📋 Lead capture form with LeasingVoice integration
- 📊 Admin dashboard for analytics and management
- 🔒 Secure admin authentication
- 📈 Analytics tracking (UTM parameters, page visits)
- 🗺️ Google Maps integration
- 📸 Image lightbox with swipe support
- ❓ FAQ accordion section
- 📄 Privacy Policy & Terms pages

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (Database, Auth, Storage)
- **LeasingVoice API** (Lead management & SMS)
- **Vercel** (Hosting)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key
NEXT_PUBLIC_FB_PIXEL_ID=your_pixel_id
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Create Admin User

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add User"
3. Enter email and password

### 5. Deploy to Vercel

See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for detailed instructions.

## Project Structure

```
/app
  /admin          # Admin dashboard
  /api            # API routes
  /privacy        # Privacy policy page
  /terms          # Terms page
  page.tsx        # Homepage
/components       # React components
/public           # Static assets
```

## Testing

See [TESTING-CHECKLIST.md](./TESTING-CHECKLIST.md) for comprehensive testing guide.

## Admin Dashboard

Access at `/admin/login` after creating an admin user.

Features:
- Dashboard with stats and analytics
- Leads management with filtering and export
- Property editor with image upload
- Sync status monitoring

## Lead Flow

1. Visitor fills out form on landing page
2. Form submits to `/api/leads`
3. Lead sent to LeasingVoice API (primary)
4. Lead saved to Supabase (backup + analytics)
5. SMS notification sent via LeasingVoice
6. Lead appears in admin dashboard

## Analytics

Tracks:
- Page visits with UTM parameters
- Lead sources and campaigns
- Conversion rates
- Device types
- Referrers

## License

© 2026 Mccoy Real Estate LLC. All rights reserved.
