export interface DeviceContent {
  id: string | number
  title: string
  subtitle?: string
  description?: string
  image?: string
  features?: string[]
  benefits?: string[]
  price?: string | number
  ctaText?: string
  ctaAction?: string
  badge?: string
  tags?: string[]
  category?: string
  data?: Record<string, unknown>
}

export interface DeviceHeroSlide {
  id: string | number
  title: string
  description?: string
  image?: string
  ctaText?: string
  ctaLink?: string
  alignment?: string
  order?: number
}

export interface DevicePageSection {
  id: string | number
  section?: string
  title?: string
  content?: string
  image?: string
  layout?: string
  alignment?: string
  badge?: string
  chips?: string[]
  ctaText?: string
  ctaLink?: string
  data?: Record<string, unknown>
}

export interface DevicesPagePayload {
  heroSlides?: DeviceHeroSlide[]
  sections?: DevicePageSection[]
  devices?: DeviceContent[]
  featuredDevices?: DeviceContent[]
}


