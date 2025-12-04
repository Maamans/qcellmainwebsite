/**
 * Security Utilities
 * Input validation, sanitization, and security helpers
 */

/**
 * Sanitize string input to prevent XSS (Enhanced)
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    return ''
  }

  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .replace(/file:/gi, '') // Remove file: protocol
    .replace(/expression\(/gi, '') // Remove CSS expressions
    .replace(/import\s+/gi, '') // Remove import statements
    .replace(/@import/gi, '') // Remove CSS imports
    .trim()
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') return false
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  if (typeof url !== 'string') return false
  
  try {
    const urlObj = new URL(url)
    return ['http:', 'https:'].includes(urlObj.protocol)
  } catch {
    return false
  }
}

/**
 * Validate and sanitize file name
 */
export function sanitizeFileName(fileName: string): string {
  if (typeof fileName !== 'string') {
    return 'file'
  }

  // Remove path traversal attempts
  let sanitized = fileName
    .replace(/\.\./g, '') // Remove ..
    .replace(/\//g, '') // Remove /
    .replace(/\\/g, '') // Remove \
    .replace(/[^a-zA-Z0-9._-]/g, '_') // Replace invalid chars with _
    .trim()

  // Ensure it's not empty
  if (!sanitized) {
    sanitized = 'file'
  }

  // Limit length
  if (sanitized.length > 255) {
    const ext = sanitized.split('.').pop()
    const name = sanitized.substring(0, 255 - (ext?.length || 0) - 1)
    sanitized = `${name}.${ext}`
  }

  return sanitized
}

/**
 * Validate file type
 */
export function isValidFileType(
  fileName: string,
  allowedTypes: string[]
): boolean {
  if (typeof fileName !== 'string') return false

  const extension = fileName.split('.').pop()?.toLowerCase()
  if (!extension) return false

  return allowedTypes.includes(extension)
}

/**
 * Validate file size
 */
export function isValidFileSize(fileSize: number, maxSize: number): boolean {
  return fileSize > 0 && fileSize <= maxSize
}

/**
 * Generate CSRF token (simple implementation)
 * In production, use a proper CSRF library
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Validate CSRF token
 */
export function validateCSRFToken(token: string, sessionToken: string): boolean {
  if (!token || !sessionToken) return false
  return token === sessionToken && token.length === 64
}

/**
 * Escape HTML to prevent XSS
 */
export function escapeHtml(text: string): string {
  if (typeof text !== 'string') return ''
  
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  
  return text.replace(/[&<>"']/g, (m) => map[m])
}

/**
 * Validate page path to prevent path traversal
 */
export function isValidPagePath(path: string): boolean {
  if (typeof path !== 'string') return false
  
  // Must start with /
  if (!path.startsWith('/')) return false
  
  // No path traversal
  if (path.includes('..')) return false
  
  // No null bytes
  if (path.includes('\0')) return false
  
  // Reasonable length
  if (path.length > 200) return false
  
  return true
}

/**
 * Rate limit helper
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map()
  private windowMs: number
  private maxRequests: number

  constructor(windowMs: number, maxRequests: number) {
    this.windowMs = windowMs
    this.maxRequests = maxRequests
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const userRequests = this.requests.get(identifier) || []

    // Remove old requests outside the window
    const validRequests = userRequests.filter(
      (time) => now - time < this.windowMs
    )

    if (validRequests.length >= this.maxRequests) {
      return false
    }

    // Add current request
    validRequests.push(now)
    this.requests.set(identifier, validRequests)

    return true
  }

  getRemainingRequests(identifier: string): number {
    const now = Date.now()
    const userRequests = this.requests.get(identifier) || []
    const validRequests = userRequests.filter(
      (time) => now - time < this.windowMs
    )
    return Math.max(0, this.maxRequests - validRequests.length)
  }

  reset(identifier: string): void {
    this.requests.delete(identifier)
  }

  // Clean up old entries periodically
  cleanup(): void {
    const now = Date.now()
    for (const [identifier, requests] of this.requests.entries()) {
      const validRequests = requests.filter(
        (time) => now - time < this.windowMs
      )
      if (validRequests.length === 0) {
        this.requests.delete(identifier)
      } else {
        this.requests.set(identifier, validRequests)
      }
    }
  }
}

/**
 * Validate API request origin
 */
export function isValidOrigin(origin: string | null): boolean {
  if (!origin) return false

  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.NEXT_PUBLIC_FRONTEND_URL,
    process.env.NEXT_PUBLIC_ADMIN_URL,
  ].filter(Boolean) as string[]

  return allowedOrigins.includes(origin)
}

/**
 * Validate and sanitize search query
 */
export function sanitizeSearchQuery(query: string): string {
  if (typeof query !== 'string') return ''
  
  return query
    .trim()
    .slice(0, 100) // Limit length
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript:
}

/**
 * Validate category name
 */
export function sanitizeCategory(category: string): string {
  if (typeof category !== 'string') return ''
  
  return category
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '') // Only alphanumeric and hyphens
    .slice(0, 50) // Limit length
}

/**
 * Prevent SQL injection by escaping special characters
 */
export function escapeSQL(input: string): string {
  if (typeof input !== 'string') return ''
  
  return input
    .replace(/'/g, "''") // Escape single quotes
    .replace(/;/g, '') // Remove semicolons
    .replace(/--/g, '') // Remove SQL comments
    .replace(/\/\*/g, '') // Remove /* SQL comments
    .replace(/\*\//g, '') // Remove */ SQL comments
    .replace(/xp_/gi, '') // Remove SQL extended procedures
    .replace(/sp_/gi, '') // Remove SQL stored procedures
}

/**
 * Validate and sanitize JSON input
 */
export function sanitizeJSON(input: string): string {
  if (typeof input !== 'string') return ''
  
  try {
    // Parse and stringify to ensure valid JSON
    const parsed = JSON.parse(input)
    return JSON.stringify(parsed)
  } catch {
    return ''
  }
}

/**
 * Check for common injection patterns
 */
export function containsInjectionPattern(input: string): boolean {
  if (typeof input !== 'string') return false
  
  const injectionPatterns = [
    /union.*select/i,
    /insert.*into/i,
    /delete.*from/i,
    /drop.*table/i,
    /exec\(/i,
    /execute\(/i,
    /script/i,
    /javascript:/i,
    /onerror=/i,
    /onload=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
  ]
  
  return injectionPatterns.some(pattern => pattern.test(input))
}

/**
 * Validate API key format
 */
export function isValidAPIKey(key: string): boolean {
  if (typeof key !== 'string') return false
  
  // API keys should be alphanumeric and between 32-128 characters
  return /^[a-zA-Z0-9]{32,128}$/.test(key)
}

/**
 * Generate secure random token
 */
export function generateSecureToken(length: number = 32): string {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * Validate request origin against whitelist
 */
export function isAllowedOrigin(origin: string | null, whitelist: string[]): boolean {
  if (!origin) return false
  
  return whitelist.some(allowed => {
    if (allowed.includes('*')) {
      const pattern = allowed.replace(/\*/g, '.*')
      return new RegExp(`^${pattern}$`).test(origin)
    }
    return origin === allowed
  })
}

/**
 * Sanitize file path to prevent directory traversal
 */
export function sanitizeFilePath(filePath: string): string {
  if (typeof filePath !== 'string') return ''
  
  return filePath
    .replace(/\.\./g, '') // Remove ..
    .replace(/\/\//g, '/') // Remove double slashes
    .replace(/^\/+/, '') // Remove leading slashes
    .replace(/[^a-zA-Z0-9._/-]/g, '') // Only allow safe characters
    .slice(0, 255) // Limit length
}

/**
 * Validate HTTP method
 */
export function isValidHTTPMethod(method: string): boolean {
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
  return allowedMethods.includes(method.toUpperCase())
}

/**
 * Rate limit check with exponential backoff
 */
export function calculateBackoffDelay(attempts: number, baseDelay: number = 1000): number {
  return Math.min(baseDelay * Math.pow(2, attempts), 60000) // Max 60 seconds
}

