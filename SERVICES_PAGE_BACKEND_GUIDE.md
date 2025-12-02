# Services Page - Backend Implementation Guide

## Overview

The Services Page (`/app/services/page.tsx`) is a dynamic page that displays QCell services with scroll-based animations on desktop and a carousel interface. This document provides a comprehensive guide for backend implementation.

---

## Page Structure

The page consists of **3 main sections**:

1. **Hero Section** - Scroll-based image transitions (desktop) / Static image (mobile)
2. **Services Carousel Section** - Interactive carousel displaying all services
3. **Service Detail Modal** - Popup dialog showing detailed service information

---

## 1. Hero Section

### Purpose
- **Desktop**: Displays multiple service images that transition as the user scrolls down
- **Mobile**: Shows a single static image (first service image)

### How It Works

#### Desktop Behavior
- Hero section height: `200vh` (1024px+) to `250vh` (1280px+)
- Uses **Framer Motion** scroll progress tracking
- Each service image appears at specific scroll percentages:
  - Service 1: 0% - 12% scroll
  - Service 2: 8% - 22% scroll
  - Service 3: 18% - 32% scroll
  - Service 4: 28% - 42% scroll
  - Service 5: 38% - 52% scroll
  - Service 6: 48% - 62% scroll
  - Service 7: 58% - 72% scroll
  - Service 8: 68% - 82% scroll
  - Service 9: 78% - 100% scroll

#### Mobile Behavior
- Hero section height: `33vh` (mobile) to `53vh` (tablet)
- Shows only the **first service image** statically
- No scroll animations

### Current Implementation (Hardcoded)

```typescript
const services = [
  { 
    name: "CUG", 
    description: "Closed User Group", 
    image: "/images/expand your world (1).jpg", 
    longDescription: "..." 
  },
  // ... 8 more services
]
```

### Backend Data Structure Needed

```typescript
interface Service {
  id: number;                    // Unique identifier
  name: string;                  // Service name (e.g., "CUG", "eSIM")
  description: string;           // Short description/tagline
  longDescription: string;       // Detailed description for modal
  image: string;                 // Image URL/path
  imageUrl?: string;             // Full URL if different from image
  order: number;                 // Display order (1-9 for hero scroll)
  isActive: boolean;             // Whether to show this service
  category?: string;             // Optional category filter
  createdAt?: string;            // Timestamp
  updatedAt?: string;            // Timestamp
}
```

### API Endpoint Required

**GET** `/api/public/services`

**Response Format:**
```json
[
  {
    "id": 1,
    "name": "CUG",
    "description": "Closed User Group",
    "longDescription": "Enjoy unlimited calls within your organization...",
    "image": "/images/cug-service.jpg",
    "imageUrl": "https://cdn.example.com/images/cug-service.jpg",
    "order": 1,
    "isActive": true,
    "category": "business"
  },
  {
    "id": 2,
    "name": "eSIM",
    "description": "Digital SIM Cards",
    "longDescription": "Go digital with eSIM technology...",
    "image": "/images/esim-service.jpg",
    "imageUrl": "https://cdn.example.com/images/esim-service.jpg",
    "order": 2,
    "isActive": true,
    "category": "mobile"
  }
  // ... more services
]
```

**Query Parameters:**
- `category` (optional): Filter by category (e.g., `?category=business`)

**Important Notes:**
- Services should be ordered by `order` field (1-9 for hero scroll)
- Only services with `isActive: true` should be returned
- Maximum 9 services recommended for hero scroll animation
- Image paths should be relative to `/public` folder or full URLs

---

## 2. Services Carousel Section

### Purpose
Displays all services in an interactive carousel with:
- Horizontal scrolling
- Navigation buttons (prev/next)
- Dot indicators
- Responsive card layout

### Layout Details

**Card Dimensions:**
- Mobile: `70%` width, `min-height: 480px`
- Tablet: `50%` width, `min-height: 700px`
- Desktop: `30.333%` width (3 cards visible), `min-height: 700px`

**Card Content:**
- Background image (service image)
- Dark overlay (40% opacity)
- Service name (large, bold, white)
- Service description (white, slightly transparent)
- Plus button (bottom right) - opens detail modal

### Current Implementation

Uses **Embla Carousel** library:
- Loop: `true`
- Align: `center`
- Touch/swipe enabled

### Backend Requirements

Same as Hero Section - uses the same `services` array.

**Additional Considerations:**
- All services are displayed in carousel (not just 9)
- Services should be ordered by `order` field
- Image quality should be high (used as card background)

---

## 3. Service Detail Modal

### Purpose
Shows detailed information about a selected service in a popup dialog.

### Modal Content

**Header:**
- Service name (large, bold)
- Service description (subtitle)

**Body:**
- Long description (full text)

**Footer:**
- "Close" button
- "Get Started" button (currently placeholder)

### Backend Requirements

Uses the same service data structure. The modal displays:
- `service.name`
- `service.description`
- `service.longDescription`

**Future Enhancement:**
- Could add `ctaLink` field for "Get Started" button
- Could add `features` array for additional details
- Could add `pricing` information

---

## 4. Data Flow & Integration

### Current State (Hardcoded)

```typescript
// Currently hardcoded in component
const services = [
  { name: "CUG", description: "...", image: "...", longDescription: "..." },
  // ...
]
```

### Recommended Integration

**Step 1: Create API endpoint** (already exists at `/app/api/public/services/route.ts`)

**Step 2: Update component to fetch data:**

```typescript
// Add state for services
const [services, setServices] = useState<Service[]>([])

// Fetch services on mount
useEffect(() => {
  const fetchServices = async () => {
    try {
      const data = await api.getServices()
      // Sort by order, filter active
      const sortedServices = data
        .filter((s: Service) => s.isActive)
        .sort((a: Service, b: Service) => a.order - b.order)
      setServices(sortedServices)
    } catch (error) {
      console.error('Failed to fetch services:', error)
      // Fallback to hardcoded services
    }
  }
  fetchServices()
}, [])
```

**Step 3: Update API helper** (already exists in `lib/api.ts`)

```typescript
getServices: async (category?: string) => {
  // Implementation already exists
}
```

---

## 5. Database Schema Recommendations

### Services Table

```sql
CREATE TABLE services (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(500),
  long_description TEXT,
  image VARCHAR(500),
  image_url VARCHAR(500),
  order_index INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_order (order_index),
  INDEX idx_active (is_active),
  INDEX idx_category (category)
);
```

### Sample Data

```sql
INSERT INTO services (name, description, long_description, image, order_index, is_active, category) VALUES
('CUG', 'Closed User Group', 'Enjoy unlimited calls within your organization...', '/images/cug-service.jpg', 1, true, 'business'),
('eSIM', 'Digital SIM Cards', 'Go digital with eSIM technology...', '/images/esim-service.jpg', 2, true, 'mobile'),
('Tros-Mi-Topup', 'No Credit. No Wahala!', 'Never run out of credit again...', '/images/tros-mi-topup.jpg', 3, true, 'mobile'),
-- ... more services
```

---

## 6. Image Handling

### Image Storage Options

**Option 1: Public Folder (Current)**
- Store images in `/public/images/`
- Use relative paths: `/images/service-name.jpg`
- Simple, but requires deployment for updates

**Option 2: CDN/Cloud Storage (Recommended)**
- Store images in S3, Cloudinary, or similar
- Use full URLs: `https://cdn.example.com/images/service-name.jpg`
- More flexible, can update without deployment

### Image Requirements

**Hero Section:**
- Recommended size: `1920x1080px` (16:9 aspect ratio)
- Format: JPG or WebP
- Quality: High (used as full-screen background)

**Carousel Cards:**
- Recommended size: `1200x800px` (3:2 aspect ratio)
- Format: JPG or WebP
- Quality: High (used as card background)

**Optimization:**
- Use Next.js Image component (already implemented)
- Supports automatic optimization
- Lazy loading for better performance

---

## 7. API Implementation Example

### Backend Route (`/app/api/public/services/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    // TODO: Replace with actual database query
    // Example:
    // const services = await db.query(`
    //   SELECT * FROM services 
    //   WHERE is_active = true
    //   ${category ? 'AND category = ?' : ''}
    //   ORDER BY order_index ASC
    // `, category ? [category] : []);

    // For now, return empty array (frontend uses hardcoded fallback)
    const services: Service[] = [];

    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
```

---

## 8. Frontend Integration Steps

### Step 1: Update Component State

```typescript
const [services, setServices] = useState<Service[]>([])
const [loading, setLoading] = useState(true)
```

### Step 2: Fetch Data on Mount

```typescript
useEffect(() => {
  const fetchServices = async () => {
    try {
      setLoading(true)
      const data = await api.getServices()
      const sortedServices = data
        .filter((s: Service) => s.isActive)
        .sort((a: Service, b: Service) => a.order - b.order)
        .slice(0, 9) // Limit to 9 for hero scroll
      setServices(sortedServices)
    } catch (error) {
      console.error('Failed to fetch services:', error)
      // Keep hardcoded fallback
    } finally {
      setLoading(false)
    }
  }
  fetchServices()
}, [])
```

### Step 3: Handle Loading State

```typescript
{loading ? (
  <div>Loading services...</div>
) : (
  // Existing carousel code
)}
```

### Step 4: Use Fetched Data

Replace hardcoded `services` array with `services` state.

---

## 9. Key Features & Behaviors

### Scroll Animation (Desktop Only)
- **Trigger**: User scrolls down the hero section
- **Effect**: Images fade in/out based on scroll position
- **Technology**: Framer Motion `useScroll` and `useTransform`
- **Timing**: Each image visible for ~10% of scroll progress

### Responsive Design
- **Mobile (< 640px)**: Static image, 33vh height
- **Tablet (640px - 1024px)**: Static image, 43-53vh height
- **Desktop (≥ 1024px)**: Scroll animations, 200-250vh height

### Carousel Features
- **Touch/Swipe**: Enabled on mobile
- **Navigation**: Prev/Next buttons (hidden on mobile)
- **Indicators**: Dot navigation showing current position
- **Loop**: Infinite loop enabled

### Modal Features
- **Trigger**: Click plus button on service card
- **Content**: Service name, description, long description
- **Actions**: Close button, Get Started button (placeholder)

---

## 10. Testing Checklist

### Backend Testing
- [ ] API returns services array
- [ ] Services filtered by `isActive`
- [ ] Services sorted by `order`
- [ ] Category filter works
- [ ] Image URLs are valid
- [ ] Error handling works

### Frontend Testing
- [ ] Services load from API
- [ ] Fallback to hardcoded if API fails
- [ ] Hero scroll animations work (desktop)
- [ ] Static image shows (mobile)
- [ ] Carousel scrolls correctly
- [ ] Modal opens/closes properly
- [ ] Images load correctly
- [ ] Responsive design works

---

## 11. Future Enhancements

### Potential Additions
1. **Service Categories**: Filter carousel by category
2. **Service Search**: Search functionality
3. **Service Details Page**: Dedicated page per service
4. **CTA Links**: "Get Started" button links
5. **Service Features**: Additional details in modal
6. **Pricing Information**: Show pricing if applicable
7. **Service Icons**: Add icons alongside images
8. **Video Support**: Support video backgrounds
9. **Analytics**: Track service views/clicks
10. **A/B Testing**: Test different service orders

---

## 12. Summary

### What Backend Needs to Provide

1. **API Endpoint**: `GET /api/public/services`
2. **Data Structure**: Array of service objects
3. **Required Fields**: `name`, `description`, `longDescription`, `image`, `order`, `isActive`
4. **Optional Fields**: `category`, `imageUrl`, `id`
5. **Image Storage**: CDN or public folder
6. **Ordering**: Sort by `order` field
7. **Filtering**: Filter by `isActive` and optionally `category`

### Current Status

- ✅ API endpoint structure exists (`/app/api/public/services/route.ts`)
- ✅ API helper function exists (`lib/api.ts`)
- ⚠️ Backend returns empty array (needs database implementation)
- ⚠️ Frontend uses hardcoded fallback data
- ✅ Frontend ready for API integration

### Next Steps

1. Implement database queries in API route
2. Add service data to database
3. Update frontend to use API data (with fallback)
4. Test end-to-end
5. Deploy and monitor

---

## Contact & Support

For questions or issues with backend implementation, refer to:
- API route: `/app/api/public/services/route.ts`
- Frontend component: `/app/services/page.tsx`
- API helper: `/lib/api.ts`

