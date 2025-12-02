# Frontend Promotions Page - Quick Check

## ✅ What's Already Implemented

All frontend code is complete and working:

1. **API Integration** ✅
   - `lib/api.ts` → `getPromotionsOfferings()` function
   - `app/api/public/promotions-offerings/route.ts` → API route handler
   - Handles backend API with fallback to hardcoded data

2. **Components** ✅
   - `app/promotions/page.tsx` → Main page
   - `components/promotions/PromotionsCarousel.tsx` → Carousel component
   - `components/promotions/MobileAppSection.tsx` → Mobile app section
   - `components/background-video.tsx` → Hero video (fixed hydration)
   - `components/promotions/slider-content.tsx` → Hero content (fixed hydration)

3. **Image Handling** ✅
   - `getImageUrl()` helper handles:
     - Backend images: `/uploads/...` → `http://localhost:4000/uploads/...`
     - Public images: `/images/...` → `/images/...`
     - Full URLs: `http://...` → `http://...`
   - Error handling with fallback display

4. **Hardcoded Data** ✅
   - `types/promotions-offerings.ts` → 8 promotions including:
     - Promo1.jpg
     - promo2.jpg
     - tiktok bundle.jpg
     - And 5 others

## 🔍 Quick Debugging Steps

### 1. Check Backend API Response

Open browser console on `/promotions` page:

```javascript
fetch('/api/public/promotions-offerings')
  .then(r => r.json())
  .then(data => {
    console.log('Promotions:', data)
    data.forEach(p => console.log(`${p.title}: ${p.image}`))
  })
```

**Expected:** Array of promotions with `image` field

### 2. Check Image URLs

In browser console:

```javascript
// Test image URL helper
import { getImageUrl } from '@/lib/api'

const testImages = [
  '/uploads/promotions/image.jpg',  // Backend image
  '/images/Promo1.jpg',             // Public image
]

testImages.forEach(img => {
  const url = getImageUrl(img)
  console.log(`${img} → ${url}`)
  
  // Try loading
  const testImg = new Image()
  testImg.onload = () => console.log(`✅ ${url} loads`)
  testImg.onerror = () => console.error(`❌ ${url} fails`)
  testImg.src = url
})
```

### 3. Verify Image Files

**Public images** (should exist):
- `public/images/Promo1.jpg`
- `public/images/promo2.jpg`
- `public/images/tiktok bundle.jpg`
- `public/images/tokenbrowse.jpg`
- `public/images/databunya.jpg`
- etc.

**Backend images** (if using backend):
- Check `backend/public/uploads/promotions/` folder
- File names must match database exactly

### 4. Check Browser Network Tab

1. Open DevTools → Network tab
2. Filter by "Img"
3. Reload `/promotions` page
4. Check for:
   - ✅ 200 status → Image loads successfully
   - ❌ 404 → Image file missing or wrong path
   - ❌ CORS error → Backend CORS not configured

### 5. Check Console Errors

Look for:
- `Failed to load image: ...` → Image path issue
- `404 Not Found` → File missing
- `CORS policy` → Backend CORS issue
- `React error #418` → Hydration issue (should be fixed)

## 🐛 Common Issues

### Images Not Showing

**Check:**
1. Image path in database/API response
2. File exists in correct location
3. File name matches exactly (case-sensitive)
4. Backend serves static files (if using `/uploads/`)
5. CORS allows image requests (if using backend images)

### Hydration Errors

**Should be fixed**, but if still occurring:
1. Clear browser cache
2. Restart dev server: `npm run dev`
3. Check all components use `"use client"` directive
4. Verify dynamic imports are used for carousel

### Backend Images Not Loading

**If using backend images** (`/uploads/...`):

1. **Verify backend is running:**
   ```bash
   curl http://localhost:4000/api/public/promotions-offerings
   ```

2. **Check backend serves static files:**
   ```javascript
   // In backend (Express example)
   app.use('/uploads', express.static('public/uploads'))
   ```

3. **Check CORS:**
   ```javascript
   // Backend must allow requests from frontend
   app.use(cors({
     origin: 'http://localhost:3000'
   }))
   ```

4. **Add to Next.js config** (if needed):
   ```javascript
   // next.config.js
   images: {
     remotePatterns: [{
       protocol: 'http',
       hostname: 'localhost',
       port: '4000',
       pathname: '/uploads/**',
     }],
   }
   ```

## ✅ What to Do Now

### If Images Are Not Showing:

1. **Check API response:**
   - Open `/promotions` page
   - Open browser console
   - Run: `fetch('/api/public/promotions-offerings').then(r => r.json()).then(console.log)`
   - Verify `image` field has correct path

2. **Check image files:**
   - Public images: `public/images/` folder
   - Backend images: `backend/public/uploads/promotions/` folder
   - File names must match exactly

3. **Test image URLs:**
   - Right-click broken image → Inspect
   - Check `src` attribute
   - Try opening URL directly in new tab

4. **Check console/network:**
   - Look for 404 errors
   - Look for CORS errors
   - Check image requests in Network tab

### If Everything Works:

✅ You're done! The frontend is fully implemented and working.

## 📝 File Structure

```
frontend/
├── app/
│   ├── api/
│   │   └── public/
│   │       └── promotions-offerings/
│   │           └── route.ts          ✅ API route handler
│   └── promotions/
│       └── page.tsx                   ✅ Main page
├── components/
│   └── promotions/
│       ├── PromotionsCarousel.tsx     ✅ Carousel component
│       ├── MobileAppSection.tsx       ✅ Mobile app section
│       └── slider-content.tsx        ✅ Hero content
├── lib/
│   └── api.ts                         ✅ API functions + getImageUrl()
└── types/
    └── promotions-offerings.ts        ✅ Hardcoded data
```

## 🎯 Summary

**Everything is implemented!** Just need to:

1. ✅ Verify backend API returns correct data (if using backend)
2. ✅ Ensure image files exist in correct locations
3. ✅ Check image paths match file names exactly
4. ✅ Verify backend serves static files (if using backend images)
5. ✅ Check CORS configuration (if using backend images)

The frontend code is complete and ready to use! 🚀





