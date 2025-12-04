# Careers Apply Page - Frontend Implementation Guide

Complete guide for implementing and maintaining the `/careers/apply` page with backend integration.

---

## Table of Contents

1. [Overview](#overview)
2. [API Endpoints](#api-endpoints)
3. [Page Structure](#page-structure)
4. [Implementation Details](#implementation-details)
5. [Content Management](#content-management)
6. [Code Examples](#code-examples)
7. [Troubleshooting](#troubleshooting)

---

## Overview

The Careers Apply page (`/careers/apply`) displays a "No Vacancies" message with dynamic content from the backend. It integrates with the backend API to fetch hero slides and page content sections.

### Key Features

- ✅ **Backend Integration**: Fetches hero slides and page content from API
- ✅ **Fallback Support**: Uses hardcoded content if backend unavailable
- ✅ **Dynamic Content**: Hero image, title, description, and message from backend
- ✅ **Error Handling**: Graceful error handling with fallbacks
- ✅ **Loading States**: Shows loading indicator during data fetch

---

## API Endpoints

### 1. Hero Slides API

**Endpoint**: `GET /api/public/hero-slides?page=/careers/apply`

**Purpose**: Fetches hero background image for the careers apply page

**Request**:
```http
GET http://localhost:4000/api/public/hero-slides?page=/careers/apply
```

**Response Format**:
```json
[
  {
    "id": 1,
    "page": "/careers/apply",
    "title": "Join the QCell Family",
    "description": "Explore exciting career opportunities...",
    "image": "/uploads/careers-hero.jpg",
    "isActive": true,
    "order": 0
  }
]
```

**Usage**:
```typescript
const slides = await api.getHeroSlides('/careers/apply')
// Returns: Array of hero slides or empty array
```

---

### 2. Page Content API

**Endpoint**: `GET /api/public/page-content/{pagePath}`

**Purpose**: Fetches content sections (hero text, no-vacancies message, etc.)

**Request**:
```http
GET http://localhost:4000/api/public/page-content/%2Fcareers%2Fapply
```

**Important**: Uses **path parameter** format (not query parameter)
- Correct: `/api/public/page-content/%2Fcareers%2Fapply`
- Wrong: `/api/public/page-content?page=/careers/apply`

**Response Format**:
```json
[
  {
    "id": 1,
    "section": "hero",
    "title": "Join the QCell Family",
    "content": "Explore exciting career opportunities...",
    "order": 1,
    "isActive": true
  },
  {
    "id": 2,
    "section": "no-vacancies",
    "title": "NO VACANCIES FOR NOW",
    "content": "We appreciate your interest...",
    "order": 2,
    "isActive": true
  }
]
```

**Usage**:
```typescript
const content = await api.getPageContent('/careers/apply')
// Returns: Array of page sections or empty array
```

---

## Page Structure

### Hero Section

- **Background Image**: From hero slide API or fallback (`/images/bbb.png`)
- **Title**: From page content section "hero" > hero slide > fallback
- **Description**: From page content section "hero" > hero slide > fallback
- **Overlay**: Gradient overlay for text readability

### No Vacancies Section

- **Icon**: Clock icon (animated)
- **Title**: From page content section "no-vacancies" > fallback
- **Text**: From page content section "no-vacancies" > fallback
- **Background**: Gradient background with decorative elements

---

## Implementation Details

### File Location

- **Page Component**: `app/careers/apply/page.tsx`
- **API Client**: `lib/api.ts`

### Data Flow

```
Page Loads
    ↓
useEffect triggers loadPageData()
    ↓
Fetch hero slides and page content in parallel
    ↓
Process and set state
    ↓
Render with backend data or fallback
```

### Content Priority

1. **Hero Image**: Backend hero slide image > Fallback (`/images/bbb.png`)
2. **Hero Title**: Page content "hero" section > Hero slide title > Fallback
3. **Hero Description**: Page content "hero" section > Hero slide description > Fallback
4. **No Vacancies Title**: Page content "no-vacancies" section > Fallback
5. **No Vacancies Text**: Page content "no-vacancies" section > Fallback

---

## Content Management

### Adding Content via Admin Dashboard

1. **Login to Admin**:
   ```
   http://localhost:3001/login
   ```

2. **Add Hero Slide**:
   - Go to: Dashboard → Hero Slides
   - Add new slide with:
     - Page: `/careers/apply`
     - Image: Upload careers hero image
     - Title: "Join the QCell Family" (optional)
     - Description: Hero description (optional)
     - Is Active: `true`
     - Order: `0`

3. **Add Page Content Sections**:
   - Go to: Dashboard → Page Content
   - Add section with:
     - Page Path: `/careers/apply`
     - Section: `hero`
     - Title: "Join the QCell Family"
     - Content: Hero description text
     - Is Active: `true`
     - Order: `1`
   
   - Add another section:
     - Page Path: `/careers/apply`
     - Section: `no-vacancies`
     - Title: "NO VACANCIES FOR NOW"
     - Content: No vacancies message text
     - Is Active: `true`
     - Order: `2`

---

## Code Examples

### Fetching Hero Slide

```typescript
const heroSlides = await api.getHeroSlides('/careers/apply')

if (Array.isArray(heroSlides) && heroSlides.length > 0) {
  const activeSlide = heroSlides.find(slide => slide.isActive !== false) || heroSlides[0]
  // Use activeSlide.image, activeSlide.title, etc.
}
```

### Fetching Page Content

```typescript
const content = await api.getPageContent('/careers/apply')

if (Array.isArray(content) && content.length > 0) {
  const heroSection = content.find(item => item.section === 'hero')
  const noVacanciesSection = content.find(item => item.section === 'no-vacancies')
  // Use heroSection.title, noVacanciesSection.content, etc.
}
```

### Complete Implementation

```typescript
const [heroSlide, setHeroSlide] = useState<HeroSlide | null>(null)
const [pageContent, setPageContent] = useState<PageSection[]>([])

const loadPageData = useCallback(async () => {
  const [heroSlides, content] = await Promise.all([
    api.getHeroSlides('/careers/apply'),
    api.getPageContent('/careers/apply')
  ])

  if (Array.isArray(heroSlides) && heroSlides.length > 0) {
    const activeSlide = heroSlides.find(s => s.isActive !== false) || heroSlides[0]
    setHeroSlide(activeSlide)
  }

  if (Array.isArray(content) && content.length > 0) {
    setPageContent(content.filter(item => item.isActive !== false))
  }
}, [])
```

---

## Troubleshooting

### Issue: Backend content not showing

**Solution**:
1. Check backend API is running: `http://localhost:4000`
2. Verify API endpoints return data:
   - `GET /api/public/hero-slides?page=/careers/apply`
   - `GET /api/public/page-content/%2Fcareers%2Fapply`
3. Check browser console for errors
4. Verify content is active (`isActive: true`)

### Issue: Wrong API endpoint format

**Error**: 404 Not Found

**Solution**: Ensure using path parameter format:
- ✅ Correct: `/api/public/page-content/%2Fcareers%2Fapply`
- ❌ Wrong: `/api/public/page-content?page=/careers/apply`

The `getPageContent` function automatically handles encoding.

### Issue: Image not loading

**Solution**:
1. Check image path in backend response
2. Verify image exists at path
3. Check `getImageUrl()` helper function
4. Verify image URL format (local vs external)
5. Check browser console for image errors

### Issue: Fallback content always showing

**Possible Causes**:
1. Backend API not running
2. No content in backend for `/careers/apply`
3. Content marked as inactive (`isActive: false`)
4. Network errors

**Solution**:
- Check backend logs
- Verify content in admin dashboard
- Check browser network tab for API calls
- Review console warnings

---

## API Function Details

### `api.getHeroSlides(page?: string | null)`

- **Returns**: `Promise<HeroSlide[]>`
- **Error Handling**: Returns empty array `[]` on error
- **Fallback**: Frontend uses fallback images

### `api.getPageContent(pagePath: string)`

- **Returns**: `Promise<PageSection[]>`
- **Error Handling**: Returns empty array `[]` on error
- **Endpoint Format**: Uses path parameter (correct)
- **Fallback**: Frontend uses fallback text

---

## Best Practices

1. **Always Use Fallbacks**: Ensure page works without backend
2. **Handle Loading States**: Show loading indicator during fetch
3. **Error Handling**: Log errors but don't break page
4. **Content Priority**: Use clear priority order (content > slide > fallback)
5. **Image Error Handling**: Use `onError` handler for images

---

## Summary

The Careers Apply page is fully integrated with the backend:

- ✅ Fetches hero slides from `/api/public/hero-slides?page=/careers/apply`
- ✅ Fetches page content from `/api/public/page-content/%2Fcareers%2Fapply` (path parameter)
- ✅ Uses fallback content if backend unavailable
- ✅ Handles errors gracefully
- ✅ Supports dynamic content management via admin dashboard

**Status**: Complete and Production Ready 🚀

---

**Last Updated**: Current implementation
**Maintained By**: Development Team

