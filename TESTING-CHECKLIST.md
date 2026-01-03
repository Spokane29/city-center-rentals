# Testing Checklist

## Local Testing

### Homepage
- [ ] Homepage loads at http://localhost:3000
- [ ] Hero image (Living.jpeg) displays correctly
- [ ] Navigation is visible and sticky on scroll
- [ ] Phone number in nav is clickable (tel: link)
- [ ] "Schedule Tour" button scrolls to form

### Navigation
- [ ] Click "Schedule Tour" scrolls to contact form
- [ ] Mobile menu works (if applicable)
- [ ] Navigation stays visible on scroll

### Hero Section
- [ ] Background image loads
- [ ] Dark overlay is visible
- [ ] Headline and subheadline display correctly
- [ ] Price badge shows "$1,000/mo"
- [ ] Both CTA buttons work

### Photo Gallery
- [ ] Gallery section displays
- [ ] All 6 images load correctly
- [ ] Click image opens lightbox
- [ ] Lightbox shows full image
- [ ] Navigation arrows work (desktop)
- [ ] Swipe works on mobile
- [ ] Close button works
- [ ] Escape key closes lightbox
- [ ] Image counter displays

### Location Section
- [ ] Google Maps embed loads (may need API key)
- [ ] Three location cards display
- [ ] Icons show correctly
- [ ] Description text is readable

### Lead Form
- [ ] Form displays correctly
- [ ] All fields are visible
- [ ] Phone formatting works as you type
- [ ] Character counter for message field works
- [ ] Validation works (try submitting empty form)
- [ ] Error messages display
- [ ] Submit button works
- [ ] Success message shows with your first name
- [ ] Success message has call link

### FAQ Section
- [ ] FAQ section displays
- [ ] All 6 questions are visible
- [ ] Click question expands answer
- [ ] Click again collapses
- [ ] Only one open at a time

### Footer
- [ ] Footer displays
- [ ] All links work (Privacy, Terms, Schedule Tour, View Photos)
- [ ] Contact info is correct
- [ ] Copyright notice shows

### Legal Pages
- [ ] Privacy Policy loads at /privacy
- [ ] Terms page loads at /terms
- [ ] "Back to Home" links work
- [ ] Content is readable

### Mobile Responsive
- [ ] Resize browser - layout adapts
- [ ] Mobile menu works
- [ ] Images scale correctly
- [ ] Text is readable
- [ ] Forms are usable
- [ ] Buttons are tappable

### Admin Dashboard
- [ ] Admin login page loads at /admin/login
- [ ] Can log in with credentials
- [ ] Dashboard shows stats
- [ ] Leads page loads
- [ ] Property page loads
- [ ] Logout works

## Form Submission Test

### Test with Real Phone Number
1. Fill out form with your real phone number
2. Submit form
3. Check:
   - [ ] Success message appears
   - [ ] SMS notification received (within minutes)
   - [ ] Lead appears in Supabase (check dashboard)
   - [ ] Lead appears in LeasingVoice dashboard

### Test Validation
- [ ] Submit empty form → shows errors
- [ ] Submit with invalid phone → shows error
- [ ] Submit with invalid email → shows error
- [ ] Submit with valid data → succeeds

## Production Testing (After Deploy)

- [ ] Site loads at production URL
- [ ] All images load
- [ ] Form submission works
- [ ] SMS notifications work
- [ ] Admin login works
- [ ] Analytics tracking works
- [ ] No console errors

