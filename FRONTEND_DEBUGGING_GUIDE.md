# Frontend Promotions Page - Debugging Guide

## ✅ Current Implementation Status

All frontend components are already implemented:

1. ✅ **API Function** - `lib/api.ts` → `getPromotionsOfferings()`
2. ✅ **API Route Handler** - `app/api/public/promotions-offerings/route.ts`
3. ✅ **Promotions Page** - `app/promotions/page.tsx`
4. ✅ **Carousel Component** - `components/promotions/PromotionsCarousel.tsx`
5. ✅ **Mobile App Section** - `components/promotions/MobileAppSection.tsx`
6. ✅ **Image URL Helper** - `lib/api.ts` → `getImageUrl()`

## 🔍 Image Display Debugging Steps

### Step 1: Check What the Backend Returns

Open your browser console and check what data is being fetched:

```javascript
// In browser console on /promotions page
fetch('/api/public/promotions-offerings')
  .then(r => r.json())
  .then(data => console.log('Promotions data:', data))
```

**Expected format:**
```json
[
  {
    "id": 1,
    "title": "Promo 1",
    "image": "/uploads/promotions/image.jpg",
    "isActive": true,
    "order": 0
  }
]
```

### Step 2: Verify Image Path Handling

The `getImageUrl()` function handles three cases:

1. **Backend uploads** (`/uploads/...`) → Prepends `API_URL`
   - Example: `/uploads/promotions/image.jpg` → `http://localhost:4000/uploads/promotions/image.jpg`

2. **Public images** (`/images/...`) → Uses as-is
   - Example: `/images/Promo1.jpg` → `/images/Promo1.jpg`

3. **Full URLs** (`http://...`) → Uses as-is
   - Example: `https://example.com/image.jpg` → `https://example.com/image.jpg`

### Step 3: Test Image URLs Directly

**For backend images:**
```
http://localhost:4000/uploads/promotions/your-image.jpg
```

**For public images:**
```
http://localhost:3000/images/Promo1.jpg
```

### Step 4: Check Browser Console

Look for:
- ❌ `Failed to load image: ...` warnings
- ❌ 404 errors in Network tab
- ❌ CORS errors

### Step 5: Verify Image Files Exist

**Backend images:**
- Check: `backend/public/uploads/promotions/` folder
- File name must match database exactly (case-sensitive)

**Public images:**
- Check: `frontend/public/images/` folder
- Files: `Promo1.jpg`, `promo2.jpg`, `tiktok bundle.jpg`, etc.

## 🐛 Common Issues & Solutions

### Issue 1: Images Not Showing

**Symptoms:**
- Cards show gradient background instead of image
- Console shows image load errors

**Solutions:**

1. **Check image path in database:**
   ```sql
   SELECT id, title, image FROM promotions WHERE isActive = 1;
   ```

2. **Verify file exists:**
   - Backend: Check `backend/public/uploads/promotions/`
   - Frontend: Check `frontend/public/images/`

3. **Check CORS settings** (if backend images):
   - Backend must allow requests from `http://localhost:3000`
   - Check `backend/app.js` or CORS middleware

4. **Check image URL in browser:**
   - Right-click broken image → Inspect
   - Check `src` attribute value
   - Try opening URL directly in new tab

### Issue 2: Hydration Errors

**Symptoms:**
- React error #418 in console
- Page doesn't render properly

**Solutions:**

✅ Already fixed with:
- Dynamic import for `PromotionsCarousel` (SSR disabled)
- `isMounted` checks in `BackgroundVideo` and `SliderContent`

If still occurring:
- Clear browser cache
- Restart dev server
- Check for other components using `window` or browser APIs during SSR

### Issue 3: Backend Images Not Loading

**Symptoms:**
- Images from `/uploads/` don't display
- 404 errors for backend image URLs

**Solutions:**

1. **Verify backend is running:**
   ```bash
   # Check backend is accessible
   curl http://localhost:4000/api/public/promotions-offerings
   ```

2. **Check backend static file serving:**
   - Backend must serve `/uploads/` folder as static
   - Example (Express):
     ```javascript
     app.use('/uploads', express.static('public/uploads'));
     ```

3. **Check CORS:**
   - Backend must allow image requests from frontend origin
   - Add CORS headers for image requests

4. **Use Next.js Image Optimization:**
   - For external images, add to `next.config.js`:
     ```javascript
     images: {
       remotePatterns: [
         {
           protocol: 'http',
           hostname: 'localhost',
           port: '4000',
           pathname: '/uploads/**',
         },
       ],
     }
     ```

### Issue 4: Hardcoded Images Not Showing

**Symptoms:**
- `Promo1.jpg`, `promo2.jpg`, `tiktok bundle.jpg` not displaying

**Solutions:**

1. **Check file names match exactly:**
   - Case-sensitive: `Promo1.jpg` ≠ `promo1.jpg`
   - Spaces matter: `tiktok bundle.jpg` ≠ `tiktok-bundle.jpg`

2. **Verify files in `public/images/`:**
   ```bash
   ls -la public/images/ | grep -i promo
   ls -la public/images/ | grep -i tiktok
   ```

3. **Check image paths in code:**
   - `types/promotions-offerings.ts` → Check `image` field values
   - Must match file names exactly

## 📋 Verification Checklist

- [ ] Backend API returns promotions with `image` field
- [ ] Image paths are correct format (`/uploads/...` or `/images/...`)
- [ ] Image files exist in correct locations
- [ ] Backend serves static files correctly
- [ ] CORS is configured for image requests
- [ ] Browser console shows no image errors
- [ ] Network tab shows successful image requests
- [ ] Images display in carousel
- [ ] Fallback gradient shows when image missing

## 🔧 Quick Fixes

### Add Image Error Fallback

Already implemented in `PromotionsCarousel.tsx`:
- Shows gradient background if image fails to load
- Logs warning to console for debugging

### Enable Image Debugging

Add this to `components/promotions/PromotionsCarousel.tsx` temporarily:

```typescript
{slides.map((promotion) => {
  const imageUrl = getImageUrl(promotion.image || "")
  console.log('Promotion:', promotion.title, 'Image URL:', imageUrl)
  // ... rest of code
})}
```

### Test Image URLs

Add this to browser console:

```javascript
// Test getImageUrl function
const testPaths = [
  '/uploads/promotions/image.jpg',
  '/images/Promo1.jpg',
  'https://example.com/image.jpg'
]

testPaths.forEach(path => {
  const url = getImageUrl(path)
  console.log(`${path} → ${url}`)
  
  // Try to load image
  const img = new Image()
  img.onload = () => console.log(`✅ ${url} loads successfully`)
  img.onerror = () => console.error(`❌ ${url} failed to load`)
  img.src = url
})
```

## 📝 Next Steps

1. **If backend images don't work:**
   - Check backend static file serving
   - Verify CORS configuration
   - Consider using Next.js Image Optimization

2. **If public images don't work:**
   - Verify file names match exactly
   - Check files are in `public/images/`
   - Restart dev server after adding files

3. **If hydration errors persist:**
   - Check all components for browser API usage
   - Ensure all client components use `"use client"`
   - Use dynamic imports for problematic components

## 🎯 Expected Behavior

✅ **Working correctly:**
- Carousel displays all promotions
- Images load and display properly
- Fallback gradient shows for missing images
- No console errors
- Smooth scrolling and navigation

❌ **Not working:**
- Images don't display (check paths and files)
- Hydration errors (check SSR/client rendering)
- 404 errors (check backend serving and CORS)
- Console errors (check image URLs and network)


