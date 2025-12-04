/**
 * Input Validation Utilities
 * Server-side validation for API requests
 */

import { sanitizeInput, isValidPagePath } from './security'

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  sanitized?: Record<string, unknown>
}

interface HeroSlideData {
  title?: string
  description?: string
  image?: string
  page?: string
  order?: number
  isActive?: boolean
}

interface PageContentData {
  section?: string
  title?: string
  content?: string
  pagePath?: string
}

interface SupportItemData {
  title: string
  description: string
  category?: string
}

/**
 * Validate hero slide data
 */
export function validateHeroSlide(data: unknown): ValidationResult {
  const errors: string[] = []

  if (!data || typeof data !== 'object') {
    return { isValid: false, errors: ['Hero slide data is required'] }
  }

  const slideData = data as HeroSlideData

  // Title validation
  if (slideData.title !== undefined) {
    if (typeof slideData.title !== 'string') {
      errors.push('Title must be a string')
    } else if (slideData.title.length > 200) {
      errors.push('Title must be less than 200 characters')
    }
  }

  // Description validation
  if (slideData.description !== undefined) {
    if (typeof slideData.description !== 'string') {
      errors.push('Description must be a string')
    } else if (slideData.description.length > 1000) {
      errors.push('Description must be less than 1000 characters')
    }
  }

  // Image validation
  if (slideData.image !== undefined) {
    if (typeof slideData.image !== 'string') {
      errors.push('Image must be a string')
    } else if (slideData.image.length > 500) {
      errors.push('Image path must be less than 500 characters')
    }
  }

  // Page validation
  if (slideData.page !== undefined) {
    if (typeof slideData.page !== 'string') {
      errors.push('Page must be a string')
    } else if (!isValidPagePath(slideData.page)) {
      errors.push('Invalid page path')
    }
  }

  // Order validation
  if (slideData.order !== undefined) {
    if (typeof slideData.order !== 'number' || slideData.order < 0) {
      errors.push('Order must be a non-negative number')
    }
  }

  // isActive validation
  if (slideData.isActive !== undefined) {
    if (typeof slideData.isActive !== 'boolean') {
      errors.push('isActive must be a boolean')
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors }
  }

  // Sanitize data
  const sanitized: HeroSlideData = {
    ...slideData,
    title: slideData.title ? sanitizeInput(slideData.title) : undefined,
    description: slideData.description ? sanitizeInput(slideData.description) : undefined,
    image: slideData.image ? sanitizeInput(slideData.image) : undefined,
    page: slideData.page ? sanitizeInput(slideData.page) : undefined,
  }

  return { isValid: true, errors: [], sanitized: sanitized as unknown as Record<string, unknown> }
}

/**
 * Validate page content data
 */
export function validatePageContent(data: unknown): ValidationResult {
  const errors: string[] = []

  if (!data || typeof data !== 'object') {
    return { isValid: false, errors: ['Page content data is required'] }
  }

  const contentData = data as PageContentData

  // Section validation
  if (contentData.section !== undefined) {
    if (typeof contentData.section !== 'string') {
      errors.push('Section must be a string')
    } else if (contentData.section.length > 100) {
      errors.push('Section must be less than 100 characters')
    }
  }

  // Title validation
  if (contentData.title !== undefined) {
    if (typeof contentData.title !== 'string') {
      errors.push('Title must be a string')
    } else if (contentData.title.length > 500) {
      errors.push('Title must be less than 500 characters')
    }
  }

  // Content validation
  if (contentData.content !== undefined) {
    if (typeof contentData.content !== 'string') {
      errors.push('Content must be a string')
    } else if (contentData.content.length > 5000) {
      errors.push('Content must be less than 5000 characters')
    }
  }

  // Page path validation
  if (contentData.pagePath !== undefined) {
    if (typeof contentData.pagePath !== 'string') {
      errors.push('Page path must be a string')
    } else if (!isValidPagePath(contentData.pagePath)) {
      errors.push('Invalid page path')
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors }
  }

  // Sanitize data
  const sanitized: PageContentData = {
    ...contentData,
    section: contentData.section ? sanitizeInput(contentData.section) : undefined,
    title: contentData.title ? sanitizeInput(contentData.title) : undefined,
    content: contentData.content ? sanitizeInput(contentData.content) : undefined,
    pagePath: contentData.pagePath ? sanitizeInput(contentData.pagePath) : undefined,
  }

  return { isValid: true, errors: [], sanitized: sanitized as unknown as Record<string, unknown> }
}

/**
 * Validate support item data
 */
export function validateSupportItem(data: unknown): ValidationResult {
  const errors: string[] = []

  if (!data || typeof data !== 'object') {
    return { isValid: false, errors: ['Support item data is required'] }
  }

  const supportData = data as SupportItemData

  // Title validation
  if (!supportData.title || typeof supportData.title !== 'string') {
    errors.push('Title is required and must be a string')
  } else if (supportData.title.length > 200) {
    errors.push('Title must be less than 200 characters')
  }

  // Description validation
  if (!supportData.description || typeof supportData.description !== 'string') {
    errors.push('Description is required and must be a string')
  } else if (supportData.description.length > 2000) {
    errors.push('Description must be less than 2000 characters')
  }

  // Category validation
  if (supportData.category !== undefined) {
    if (typeof supportData.category !== 'string') {
      errors.push('Category must be a string')
    } else if (supportData.category.length > 50) {
      errors.push('Category must be less than 50 characters')
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors }
  }

  // Sanitize data
  const sanitized: SupportItemData = {
    ...supportData,
    title: sanitizeInput(supportData.title),
    description: sanitizeInput(supportData.description),
    category: supportData.category ? sanitizeInput(supportData.category) : undefined,
  }

  return { isValid: true, errors: [], sanitized: sanitized as unknown as Record<string, unknown> }
}

/**
 * Validate query parameters
 */
export function validateQueryParams(params: URLSearchParams): ValidationResult {
  const errors: string[] = []
  const sanitized: Record<string, string> = {}

  for (const [key, value] of params.entries()) {
    // Validate key
    if (key.length > 50) {
      errors.push(`Query parameter key "${key}" is too long`)
      continue
    }

    // Validate value
    if (value.length > 500) {
      errors.push(`Query parameter "${key}" value is too long`)
      continue
    }

    // Sanitize value
    sanitized[key] = sanitizeInput(value)
  }

  if (errors.length > 0) {
    return { isValid: false, errors }
  }

  return { isValid: true, errors: [], sanitized: sanitized as unknown as Record<string, unknown> }
}

