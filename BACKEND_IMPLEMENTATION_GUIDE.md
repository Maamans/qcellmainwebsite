# QCell Website Backend & CMS Implementation Guide

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)
5. [Admin Dashboard Pages](#admin-dashboard-pages)
6. [Step-by-Step Implementation](#step-by-step-implementation)
7. [Content Management Forms](#content-management-forms)

---

## Overview

This guide explains how to build a complete backend and Content Management System (CMS) for the QCell website. The system will allow administrators to manage all website content through forms instead of hardcoding.

### Key Features
- **Content Management**: Manage devices, tariffs, promotions, hero sliders, and more
- **Image Upload**: Handle image uploads for products and promotions
- **Authentication**: Secure admin access with login system
- **API-First**: RESTful API that the frontend can consume
- **Real-time Updates**: Changes reflect immediately on the website

---

## Architecture

### Technology Stack Recommendation

```
Backend Framework: Node.js with Express.js OR Next.js API Routes
Database: PostgreSQL (production) or SQLite (development)
ORM: Prisma
Authentication: NextAuth.js or JWT
File Storage: Local filesystem or AWS S3 / Cloudinary
```

### Project Structure

```
backend/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── routes/                 # API routes
│   │   ├── devices.ts
│   │   ├── tariffs.ts
│   │   ├── promotions.ts
│   │   ├── hero-slider.ts
│   │   ├── auth.ts
│   │   └── upload.ts
│   ├── controllers/            # Business logic
│   ├── middleware/             # Auth, validation
│   ├── utils/                  # Helper functions
│   └── app.ts                  # Express app setup
├── public/
│   └── uploads/                # Uploaded images
└── admin/                      # Admin dashboard (React/Next.js)
    ├── pages/
    │   ├── login.tsx
    │   ├── dashboard.tsx
    │   ├── devices/
    │   ├── tariffs/
    │   ├── promotions/
    │   └── hero-slider/
    └── components/
```

---

## Database Schema

### Prisma Schema Design

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // or "sqlite" for development
  url      = env("DATABASE_URL")
}

// User/Admin Authentication
model User {
  id            String   @id @default(uuid())
  email         String   @unique
  password      String
  name          String?
  role          String   @default("admin") // admin, editor
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

// Hero Slider Content
model HeroSlide {
  id          String   @id @default(uuid())
  title       String
  description String?
  image       String   // Image path/URL
  ctaText     String?  // Call-to-action button text
  ctaLink     String?  // Call-to-action link
  order       Int      @default(0) // Display order
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// Devices
model Device {
  id          String   @id @default(uuid())
  title       String
  description String?
  image       String
  category    String   // "smartphone", "feature-phone", "mifi", "router"
  features    String[] // Array of features
  price       Float?
  isActive    Boolean  @default(true)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Details for modal
  detailsTitle       String?
  detailsDescription String?
  detailsBenefits   String[]
  ctaText           String?
  ctaAction         String?
}

// Tariffs/Plans
model Tariff {
  id          String   @id @default(uuid())
  title       String
  description String?
  type        String   // "voice", "data", "combo", "voice-tariff"
  price       Float?
  validity    Int?     // Days
  dataAmount  String?  // e.g., "5GB", "Unlimited"
  voiceMinutes String? // e.g., "100 minutes"
  features    String[]
  image       String?
  isActive    Boolean  @default(true)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// Promotions
model Promotion {
  id          String   @id @default(uuid())
  title       String
  description String?
  image       String
  features    String[]
  isActive    Boolean  @default(true)
  order       Int      @default(0)
  startDate   DateTime?
  endDate     DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Details
  detailsTitle       String?
  detailsDescription String?
  detailsBenefits   String[]
  ctaText           String?
  ctaAction         String?
}

// Internet Plans
model InternetPlan {
  id          String   @id @default(uuid())
  title       String
  description String?
  type        String   // "4G", "QFiber", "LTE"
  price       Float?
  speed       String?  // e.g., "50Mbps"
  dataLimit   String?  // e.g., "Unlimited", "500GB"
  features    String[]
  image       String?
  isActive    Boolean  @default(true)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// Services
model Service {
  id          String   @id @default(uuid())
  title       String
  description String?
  image       String
  category    String   // "qpower", "music", "roaming", etc.
  features    String[]
  isActive    Boolean  @default(true)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  detailsTitle       String?
  detailsDescription String?
  detailsBenefits   String[]
  ctaText           String?
  ctaAction         String?
}

// About Us Content
model AboutContent {
  id          String   @id @default(uuid())
  section     String   @unique // "mission", "vision", "values", "history"
  title       String?
  content     String   @db.Text
  image       String?
  order       Int      @default(0)
  updatedAt   DateTime @updatedAt
}

// Our Impact Content
model ImpactContent {
  id          String   @id @default(uuid())
  title       String
  description String?
  image       String
  category    String   // "community", "education", "healthcare", etc.
  stats       Json?    // Flexible stats data
  isActive    Boolean  @default(true)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// Support/FAQ
model SupportItem {
  id          String   @id @default(uuid())
  title       String
  description String   @db.Text
  category    String   // "customer-care", "check-balance", "buy-bundle"
  isActive    Boolean  @default(true)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## API Endpoints

### Authentication Endpoints

```
POST   /api/auth/login          # Admin login
POST   /api/auth/logout         # Logout
GET    /api/auth/me             # Get current user
POST   /api/auth/change-password # Change password
```

### Hero Slider Endpoints

```
GET    /api/hero-slides         # Get all slides (public)
GET    /api/hero-slides/:id     # Get single slide
POST   /api/hero-slides         # Create slide (admin)
PUT    /api/hero-slides/:id     # Update slide (admin)
DELETE /api/hero-slides/:id     # Delete slide (admin)
PUT    /api/hero-slides/reorder # Reorder slides (admin)
```

### Devices Endpoints

```
GET    /api/devices             # Get all devices (public)
GET    /api/devices/:id         # Get single device
POST   /api/devices             # Create device (admin)
PUT    /api/devices/:id         # Update device (admin)
DELETE /api/devices/:id         # Delete device (admin)
```

### Tariffs Endpoints

```
GET    /api/tariffs             # Get all tariffs (public)
GET    /api/tariffs/:id         # Get single tariff
GET    /api/tariffs/type/:type  # Get by type (voice, data, combo)
POST   /api/tariffs             # Create tariff (admin)
PUT    /api/tariffs/:id         # Update tariff (admin)
DELETE /api/tariffs/:id         # Delete tariff (admin)
```

### Promotions Endpoints

```
GET    /api/promotions          # Get all active promotions (public)
GET    /api/promotions/:id      # Get single promotion
POST   /api/promotions          # Create promotion (admin)
PUT    /api/promotions/:id       # Update promotion (admin)
DELETE /api/promotions/:id       # Delete promotion (admin)
```

### Internet Plans Endpoints

```
GET    /api/internet-plans      # Get all plans (public)
GET    /api/internet-plans/:id  # Get single plan
POST   /api/internet-plans      # Create plan (admin)
PUT    /api/internet-plans/:id  # Update plan (admin)
DELETE /api/internet-plans/:id  # Delete plan (admin)
```

### Services Endpoints

```
GET    /api/services            # Get all services (public)
GET    /api/services/:id       # Get single service
POST   /api/services            # Create service (admin)
PUT    /api/services/:id       # Update service (admin)
DELETE /api/services/:id       # Delete service (admin)
```

### About/Impact Endpoints

```
GET    /api/about/:section      # Get about section content
PUT    /api/about/:section      # Update about section (admin)

GET    /api/impact               # Get all impact items (public)
POST   /api/impact               # Create impact item (admin)
PUT    /api/impact/:id           # Update impact item (admin)
DELETE /api/impact/:id           # Delete impact item (admin)
```

### Support Endpoints

```
GET    /api/support             # Get all support items (public)
GET    /api/support/category/:category # Get by category
POST   /api/support             # Create support item (admin)
PUT    /api/support/:id         # Update support item (admin)
DELETE /api/support/:id         # Delete support item (admin)
```

### File Upload Endpoint

```
POST   /api/upload              # Upload image/file (admin)
DELETE /api/upload/:filename    # Delete uploaded file (admin)
```

---

## Admin Dashboard Pages

### 1. Login Page (`/admin/login`)
- Email/password login form
- Session management
- Redirect to dashboard on success

### 2. Dashboard (`/admin/dashboard`)
- Overview statistics
- Quick actions
- Recent updates
- Navigation to all management pages

### 3. Hero Slider Management (`/admin/hero-slider`)
- List all slides with preview
- Add new slide form
- Edit slide form
- Delete slide
- Drag-and-drop reordering
- Toggle active/inactive

**Form Fields:**
- Title (text)
- Description (textarea)
- Image (file upload)
- CTA Text (text)
- CTA Link (text)
- Order (number)
- Active toggle (checkbox)

### 4. Devices Management (`/admin/devices`)
- List all devices
- Add/Edit device form
- Delete device
- Filter by category
- Toggle active/inactive

**Form Fields:**
- Title (text)
- Description (textarea)
- Image (file upload)
- Category (select: smartphone, feature-phone, mifi, router)
- Features (multi-input array)
- Price (number, optional)
- Details Title (text)
- Details Description (textarea)
- Details Benefits (multi-input array)
- CTA Text (text)
- CTA Action (text)
- Order (number)
- Active toggle (checkbox)

### 5. Tariffs Management (`/admin/tariffs`)
- List all tariffs
- Add/Edit tariff form
- Delete tariff
- Filter by type (voice, data, combo)
- Toggle active/inactive

**Form Fields:**
- Title (text)
- Description (textarea)
- Type (select: voice, data, combo, voice-tariff)
- Price (number, optional)
- Validity (number in days, optional)
- Data Amount (text, e.g., "5GB")
- Voice Minutes (text, optional)
- Features (multi-input array)
- Image (file upload, optional)
- Order (number)
- Active toggle (checkbox)

### 6. Promotions Management (`/admin/promotions`)
- List all promotions
- Add/Edit promotion form
- Delete promotion
- Set start/end dates
- Toggle active/inactive

**Form Fields:**
- Title (text)
- Description (textarea)
- Image (file upload)
- Features (multi-input array)
- Details Title (text)
- Details Description (textarea)
- Details Benefits (multi-input array)
- CTA Text (text)
- CTA Action (text)
- Start Date (date, optional)
- End Date (date, optional)
- Order (number)
- Active toggle (checkbox)

### 7. Internet Plans Management (`/admin/internet-plans`)
- List all plans
- Add/Edit plan form
- Delete plan
- Filter by type (4G, QFiber, LTE)

**Form Fields:**
- Title (text)
- Description (textarea)
- Type (select: 4G, QFiber, LTE)
- Price (number, optional)
- Speed (text, e.g., "50Mbps")
- Data Limit (text)
- Features (multi-input array)
- Image (file upload, optional)
- Order (number)
- Active toggle (checkbox)

### 8. Services Management (`/admin/services`)
- List all services
- Add/Edit service form
- Delete service
- Filter by category

**Form Fields:**
- Title (text)
- Description (textarea)
- Image (file upload)
- Category (select: qpower, music, roaming, etc.)
- Features (multi-input array)
- Details Title (text)
- Details Description (textarea)
- Details Benefits (multi-input array)
- CTA Text (text)
- CTA Action (text)
- Order (number)
- Active toggle (checkbox)

### 9. About Us Management (`/admin/about`)
- Edit mission, vision, values, history sections
- Each section has title, content, optional image

**Form Fields (per section):**
- Title (text, optional)
- Content (rich text editor)
- Image (file upload, optional)

### 10. Our Impact Management (`/admin/impact`)
- List all impact items
- Add/Edit impact item form
- Delete impact item

**Form Fields:**
- Title (text)
- Description (textarea)
- Image (file upload)
- Category (select)
- Stats (JSON editor for flexible data)
- Order (number)
- Active toggle (checkbox)

### 11. Support/FAQ Management (`/admin/support`)
- List all support items
- Add/Edit support item form
- Delete support item
- Filter by category

**Form Fields:**
- Title (text)
- Description (rich text editor)
- Category (select: customer-care, check-balance, buy-bundle, etc.)
- Order (number)
- Active toggle (checkbox)

---

## Step-by-Step Implementation

### Phase 1: Project Setup

1. **Initialize Backend Project**
   ```bash
   mkdir qcell-backend
   cd qcell-backend
   npm init -y
   npm install express cors dotenv
   npm install -D typescript @types/node @types/express @types/cors ts-node nodemon
   ```

2. **Install Prisma**
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

3. **Setup Database**
   - For development: Use SQLite (already configured in Prisma)
   - For production: Update `DATABASE_URL` in `.env` to PostgreSQL connection string

4. **Create Prisma Schema**
   - Copy the schema from [Database Schema](#database-schema) section
   - Run: `npx prisma migrate dev --name init`
   - Generate client: `npx prisma generate`

### Phase 2: Authentication System

1. **Install Auth Dependencies**
   ```bash
   npm install bcryptjs jsonwebtoken
   npm install -D @types/bcryptjs @types/jsonwebtoken
   ```

2. **Create Auth Middleware**
   - Create `src/middleware/auth.ts` for JWT verification
   - Create `src/utils/jwt.ts` for token generation/verification

3. **Create Auth Routes**
   - `POST /api/auth/login` - Verify credentials, return JWT
   - `GET /api/auth/me` - Verify token, return user info
   - `POST /api/auth/logout` - Invalidate token (if using refresh tokens)

4. **Create Seed Script**
   - Create initial admin user in `prisma/seed.ts`
   - Run: `npx prisma db seed`

### Phase 3: File Upload System

1. **Install Multer**
   ```bash
   npm install multer
   npm install -D @types/multer
   ```

2. **Create Upload Route**
   - `POST /api/upload` - Handle image uploads
   - Save to `public/uploads/` directory
   - Return file path/URL

3. **Image Validation**
   - Check file type (jpg, png, webp)
   - Check file size (max 5MB)
   - Generate unique filename

### Phase 4: API Routes Implementation

For each content type (Devices, Tariffs, Promotions, etc.):

1. **Create Route File**
   - `src/routes/devices.ts`
   - `src/routes/tariffs.ts`
   - etc.

2. **Implement CRUD Operations**
   - GET (list all, get by ID)
   - POST (create)
   - PUT (update)
   - DELETE (delete)

3. **Add Validation**
   - Use middleware like `express-validator` or `zod`
   - Validate required fields, data types

4. **Add Authentication**
   - Protect POST, PUT, DELETE with auth middleware
   - GET endpoints can be public

### Phase 5: Admin Dashboard Frontend

1. **Setup Next.js Admin App** (or React app)
   ```bash
   npx create-next-app@latest admin --typescript --tailwind --app
   cd admin
   ```

2. **Install UI Library**
   ```bash
   npm install @radix-ui/react-dialog @radix-ui/react-select
   npm install react-hook-form zod @hookform/resolvers
   npm install axios # For API calls
   ```

3. **Create Layout**
   - Sidebar navigation
   - Header with user info and logout
   - Main content area

4. **Implement Each Management Page**
   - List view with table/cards
   - Add/Edit modal/form
   - Delete confirmation
   - Image preview/upload

5. **Add Form Validation**
   - Client-side validation with react-hook-form + zod
   - Show error messages
   - Disable submit on invalid

6. **Add Image Upload Component**
   - Drag-and-drop or file input
   - Preview before upload
   - Progress indicator
   - Error handling

### Phase 6: Connect Frontend to Backend

1. **Update Frontend Components**
   - Replace hardcoded data with API calls
   - Use `fetch` or `axios` to call backend APIs
   - Handle loading and error states

2. **Example: Update Device Slider**
   ```typescript
   // Before (hardcoded)
   const devices = [...]
   
   // After (API call)
   const [devices, setDevices] = useState([])
   useEffect(() => {
     fetch('/api/devices')
       .then(res => res.json())
       .then(data => setDevices(data))
   }, [])
   ```

### Phase 7: Testing & Deployment

1. **Test All Endpoints**
   - Use Postman or similar tool
   - Test authentication
   - Test CRUD operations
   - Test file uploads

2. **Environment Setup**
   - Create `.env.example` with required variables
   - Setup production database
   - Configure CORS for frontend domain

3. **Deploy Backend**
   - Deploy to Vercel, Railway, or AWS
   - Update frontend API URLs

---

## Content Management Forms - Detailed Examples

### Hero Slider Form Example

```tsx
// admin/pages/hero-slider/form.tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface HeroSlideForm {
  title: string
  description: string
  image: File | string
  ctaText: string
  ctaLink: string
  order: number
  isActive: boolean
}

export default function HeroSlideForm({ slide, onSave }) {
  const { register, handleSubmit, formState: { errors } } = useForm<HeroSlideForm>()
  const [imagePreview, setImagePreview] = useState(slide?.image || '')
  
  const onSubmit = async (data) => {
    // Handle image upload if new file
    if (data.image instanceof File) {
      const formData = new FormData()
      formData.append('image', data.image)
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      data.image = await uploadRes.json().then(r => r.url)
    }
    
    // Save slide
    await fetch(`/api/hero-slides${slide?.id ? `/${slide.id}` : ''}`, {
      method: slide?.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    onSave()
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title', { required: true })} />
      <textarea {...register('description')} />
      <input 
        type="file" 
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            setImagePreview(URL.createObjectURL(file))
            register('image').onChange({ target: { value: file } })
          }
        }}
      />
      {imagePreview && <img src={imagePreview} alt="Preview" />}
      <input {...register('ctaText')} />
      <input {...register('ctaLink')} />
      <input type="number" {...register('order')} />
      <input type="checkbox" {...register('isActive')} />
      <button type="submit">Save</button>
    </form>
  )
}
```

### Device Form Example

```tsx
// admin/pages/devices/form.tsx
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

interface DeviceForm {
  title: string
  description: string
  image: File | string
  category: 'smartphone' | 'feature-phone' | 'mifi' | 'router'
  features: { value: string }[]
  price?: number
  detailsTitle: string
  detailsDescription: string
  detailsBenefits: { value: string }[]
  ctaText: string
  ctaAction: string
  order: number
  isActive: boolean
}

export default function DeviceForm({ device, onSave }) {
  const { register, control, handleSubmit } = useForm<DeviceForm>({
    defaultValues: {
      features: device?.features?.map(f => ({ value: f })) || [{ value: '' }],
      detailsBenefits: device?.detailsBenefits?.map(b => ({ value: b })) || [{ value: '' }]
    }
  })
  
  const { fields: featureFields, append: appendFeature, remove: removeFeature } = 
    useFieldArray({ control, name: 'features' })
  const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = 
    useFieldArray({ control, name: 'detailsBenefits' })
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title', { required: true })} placeholder="Device Title" />
      <textarea {...register('description')} placeholder="Description" />
      
      <select {...register('category', { required: true })}>
        <option value="smartphone">Smartphone</option>
        <option value="feature-phone">Feature Phone</option>
        <option value="mifi">MiFi</option>
        <option value="router">Router</option>
      </select>
      
      <div>
        <label>Features</label>
        {featureFields.map((field, index) => (
          <div key={field.id}>
            <input {...register(`features.${index}.value`)} />
            <button type="button" onClick={() => removeFeature(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => appendFeature({ value: '' })}>Add Feature</button>
      </div>
      
      <input type="number" {...register('price')} placeholder="Price" />
      <input type="file" accept="image/*" {...register('image')} />
      
      <h3>Details Section</h3>
      <input {...register('detailsTitle')} placeholder="Details Title" />
      <textarea {...register('detailsDescription')} placeholder="Details Description" />
      
      <div>
        <label>Benefits</label>
        {benefitFields.map((field, index) => (
          <div key={field.id}>
            <input {...register(`detailsBenefits.${index}.value`)} />
            <button type="button" onClick={() => removeBenefit(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => appendBenefit({ value: '' })}>Add Benefit</button>
      </div>
      
      <input {...register('ctaText')} placeholder="CTA Text" />
      <input {...register('ctaAction')} placeholder="CTA Action/Link" />
      <input type="number" {...register('order')} />
      <input type="checkbox" {...register('isActive')} />
      
      <button type="submit">Save Device</button>
    </form>
  )
}
```

---

## Environment Variables

Create `.env` file:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/qcell_db"
# or for SQLite: DATABASE_URL="file:./dev.db"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# Server
PORT=3001
NODE_ENV=development

# CORS
FRONTEND_URL="http://localhost:3000"
ADMIN_URL="http://localhost:3001"

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR="./public/uploads"
```

---

## Security Considerations

1. **Authentication**
   - Use JWT with expiration
   - Implement refresh tokens
   - Hash passwords with bcrypt (salt rounds: 10+)

2. **Authorization**
   - Role-based access control (admin, editor)
   - Protect all write operations

3. **Input Validation**
   - Validate all inputs server-side
   - Sanitize user inputs
   - Use parameterized queries (Prisma handles this)

4. **File Upload Security**
   - Validate file types
   - Limit file sizes
   - Scan for malware (optional)
   - Store outside web root or use CDN

5. **CORS**
   - Configure allowed origins
   - Don't allow all origins in production

6. **Rate Limiting**
   - Implement rate limiting on API endpoints
   - Prevent brute force attacks

---

## Next Steps

1. **Start with Phase 1**: Set up the project structure
2. **Implement Authentication**: Get login working first
3. **Build One Content Type**: Start with Devices as a complete example
4. **Replicate Pattern**: Use Devices as template for other content types
5. **Build Admin UI**: Create forms for each content type
6. **Connect Frontend**: Update website to use APIs

---

## Additional Resources

- **Prisma Docs**: https://www.prisma.io/docs
- **Express.js Guide**: https://expressjs.com/en/guide/routing.html
- **Next.js API Routes**: https://nextjs.org/docs/api-routes/introduction
- **React Hook Form**: https://react-hook-form.com
- **JWT Best Practices**: https://datatracker.ietf.org/doc/html/rfc8725

---

This guide provides a complete roadmap for building your backend and CMS. Start with Phase 1 and work through each phase systematically.

