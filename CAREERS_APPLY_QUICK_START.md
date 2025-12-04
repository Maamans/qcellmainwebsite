# Careers Apply Page - Quick Start Guide

5-minute setup guide for the `/careers/apply` page.

---

## 🚀 Quick Setup

### Step 1: Add Hero Slide via Admin

1. Login: `http://localhost:3001/login`
2. Go to: Dashboard → Hero Slides
3. Add new slide:
   - **Page**: `/careers/apply`
   - **Image**: Upload image
   - **Title**: (Optional)
   - **Is Active**: `true`

### Step 2: Add Page Content via Admin

1. Go to: Dashboard → Page Content
2. Add "hero" section:
   - **Page Path**: `/careers/apply`
   - **Section**: `hero`
   - **Title**: "Join the QCell Family"
   - **Content**: Hero description
   - **Is Active**: `true`

3. Add "no-vacancies" section:
   - **Page Path**: `/careers/apply`
   - **Section**: `no-vacancies`
   - **Title**: "NO VACANCIES FOR NOW"
   - **Content**: No vacancies message
   - **Is Active**: `true`

### Step 3: View Page

Visit: `http://localhost:3000/careers/apply`

Content appears automatically!

---

## 📋 API Endpoints

### Hero Slides
```
GET /api/public/hero-slides?page=/careers/apply
```

### Page Content (Path Parameter)
```
GET /api/public/page-content/%2Fcareers%2Fapply
```

**Important**: Uses path parameter, not query parameter!

---

## 🔧 Code Snippets

### Fetch Hero Slide
```typescript
const slides = await api.getHeroSlides('/careers/apply')
const activeSlide = slides.find(s => s.isActive !== false) || slides[0]
```

### Fetch Page Content
```typescript
const content = await api.getPageContent('/careers/apply')
const heroSection = content.find(item => item.section === 'hero')
const noVacanciesSection = content.find(item => item.section === 'no-vacancies')
```

---

## ✅ Content Priority

1. **Hero Image**: Backend slide > Fallback (`/images/bbb.png`)
2. **Hero Title**: Page content "hero" > Hero slide > Fallback
3. **Hero Description**: Page content "hero" > Hero slide > Fallback
4. **No Vacancies**: Page content "no-vacancies" > Fallback

---

## 🐛 Quick Troubleshooting

**Backend content not showing?**
- Check backend is running: `http://localhost:4000`
- Verify content is active (`isActive: true`)
- Check browser console for errors

**Wrong API format?**
- Use path parameter: `/api/public/page-content/%2Fcareers%2Fapply`
- Not query parameter: `/api/public/page-content?page=/careers/apply`

---

## 📚 Full Documentation

See `CAREERS_APPLY_FRONTEND_GUIDE.md` for complete details.

---

**Status**: Ready to Use ✅

