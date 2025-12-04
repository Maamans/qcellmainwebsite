import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { logBlockedIP, logRateLimit, logSuspiciousActivity, logInvalidRequest } from '@/lib/security-monitoring'

// Rate limiting store (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number; blocked: boolean; blockUntil?: number }>()

// Blocked IPs (in production, use Redis or database)
const blockedIPs = new Set<string>()

// Rate limit configuration
const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // Max requests per window
  apiMaxRequests: 50, // Max API requests per window
  blockDurationMs: 60 * 60 * 1000, // Block for 1 hour if limit exceeded
  strictWindowMs: 60 * 1000, // 1 minute window for strict checking
  strictMaxRequests: 20, // Max requests per minute for strict checking
}

// Request size limits
const MAX_REQUEST_SIZE = 1024 * 1024 // 1MB
const MAX_API_REQUEST_SIZE = 5 * 1024 * 1024 // 5MB for API routes

// Clean up old rate limit entries
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.resetTime < now) {
      rateLimitMap.delete(key)
    }
  }
}, 60 * 1000) // Clean every minute

function getClientIdentifier(request: NextRequest): string {
  // Use IP address and user agent for identification
  const ip = getClientIP(request)
  const userAgent = request.headers.get('user-agent') || 'unknown'
  return `${ip}-${userAgent.slice(0, 50)}`
}

function getClientIP(request: NextRequest): string {
  // Get IP from headers (NextRequest doesn't have .ip property)
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
    request.headers.get('x-real-ip') || 
    request.headers.get('cf-connecting-ip') || // Cloudflare
    request.headers.get('x-client-ip') ||
    'unknown'
}

function isIPBlocked(ip: string): boolean {
  if (blockedIPs.has(ip)) {
    return true
  }
  
  const record = rateLimitMap.get(ip)
  if (record?.blocked && record.blockUntil) {
    if (Date.now() < record.blockUntil) {
      return true
    } else {
      // Unblock after duration
      record.blocked = false
      delete record.blockUntil
    }
  }
  
  return false
}

function blockIP(ip: string): void {
  blockedIPs.add(ip)
  const record = rateLimitMap.get(ip)
  if (record) {
    record.blocked = true
    record.blockUntil = Date.now() + RATE_LIMIT.blockDurationMs
  }
  
  // Auto-unblock after duration
  setTimeout(() => {
    blockedIPs.delete(ip)
  }, RATE_LIMIT.blockDurationMs)
}

function isValidRequestSize(request: NextRequest, maxSize: number): boolean {
  const contentLength = request.headers.get('content-length')
  if (contentLength) {
    const size = parseInt(contentLength, 10)
    return !isNaN(size) && size <= maxSize
  }
  return true // If no content-length, assume valid (GET requests)
}

function detectSuspiciousActivity(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent') || ''
  const pathname = request.nextUrl.pathname
  
  // Check for common attack patterns
  const suspiciousPatterns = [
    /\.\./, // Path traversal
    /<script/i, // XSS attempts
    /javascript:/i, // JavaScript injection
    /union.*select/i, // SQL injection
    /exec\(/i, // Command injection
    /eval\(/i, // Code injection
    /\.env/, // Environment file access
    /\.git/, // Git directory access
    /wp-admin/, // WordPress admin (common target)
    /phpmyadmin/, // phpMyAdmin (common target)
  ]
  
  // Check pathname
  if (suspiciousPatterns.some(pattern => pattern.test(pathname))) {
    return true
  }
  
  // Check query parameters
  const searchParams = request.nextUrl.searchParams.toString()
  if (suspiciousPatterns.some(pattern => pattern.test(searchParams))) {
    return true
  }
  
  // Check for suspicious user agents
  const suspiciousUserAgents = [
    /sqlmap/i,
    /nikto/i,
    /nmap/i,
    /masscan/i,
    /zap/i,
  ]
  
  if (suspiciousUserAgents.some(pattern => pattern.test(userAgent))) {
    return true
  }
  
  return false
}

function checkRateLimit(request: NextRequest, maxRequests: number, strict: boolean = false): boolean {
  const identifier = getClientIdentifier(request)
  const ip = getClientIP(request)
  const now = Date.now()
  
  // Check if IP is blocked
  if (isIPBlocked(ip)) {
    return false
  }
  
  // Check strict rate limit (per minute)
  if (strict) {
    const strictRecord = rateLimitMap.get(`${identifier}-strict`)
    if (!strictRecord || (strictRecord.resetTime && strictRecord.resetTime < now)) {
      rateLimitMap.set(`${identifier}-strict`, {
        count: 1,
        resetTime: now + RATE_LIMIT.strictWindowMs,
        blocked: false,
      })
    } else {
      if (strictRecord.count >= RATE_LIMIT.strictMaxRequests) {
        blockIP(ip)
        return false
      }
      strictRecord.count++
    }
  }
  
  const record = rateLimitMap.get(identifier)
  
  if (!record || record.resetTime < now) {
    // Create new record
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
      blocked: false,
    })
    return true
  }
  
  if (record.count >= maxRequests) {
    // Block IP if rate limit exceeded multiple times
    if (record.count >= maxRequests * 2) {
      blockIP(ip)
    }
    return false // Rate limit exceeded
  }
  
  // Increment count
  record.count++
  return true
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = getClientIP(request)
  
  // Check if IP is blocked
  if (isIPBlocked(ip)) {
    logBlockedIP(ip, 'IP is blocked', pathname, request.headers.get('user-agent') || undefined)
    return new NextResponse(
      JSON.stringify({ 
        error: 'Access denied. Your IP has been temporarily blocked.',
        retryAfter: Math.ceil(RATE_LIMIT.blockDurationMs / 1000)
      }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil(RATE_LIMIT.blockDurationMs / 1000).toString(),
        },
      }
    )
  }
  
  // Detect suspicious activity
  if (detectSuspiciousActivity(request)) {
    blockIP(ip)
    logSuspiciousActivity(ip, pathname, 'Attack pattern detected', request.headers.get('user-agent') || undefined)
    return new NextResponse(
      JSON.stringify({ error: 'Suspicious activity detected. Access denied.' }),
      {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
  
  // Check request size
  const maxSize = pathname.startsWith('/api/') ? MAX_API_REQUEST_SIZE : MAX_REQUEST_SIZE
  if (!isValidRequestSize(request, maxSize)) {
    logInvalidRequest(ip, pathname, 'Request too large', request.headers.get('user-agent') || undefined)
    return new NextResponse(
      JSON.stringify({ error: 'Request too large.' }),
      {
        status: 413,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
  
  // Check rate limiting for API routes (with strict checking)
  if (pathname.startsWith('/api/')) {
    const isAllowed = checkRateLimit(request, RATE_LIMIT.apiMaxRequests, true)
    if (!isAllowed) {
      logRateLimit(ip, pathname, request.headers.get('user-agent') || undefined)
      return new NextResponse(
        JSON.stringify({ 
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil(RATE_LIMIT.windowMs / 1000)
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil(RATE_LIMIT.windowMs / 1000).toString(),
          },
        }
      )
    }
  }
  
  // Check rate limiting for other routes
  if (!pathname.startsWith('/_next') && !pathname.startsWith('/static')) {
    const isAllowed = checkRateLimit(request, RATE_LIMIT.maxRequests)
    if (!isAllowed) {
      return new NextResponse(
        'Too many requests. Please try again later.',
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(RATE_LIMIT.windowMs / 1000).toString(),
          },
        }
      )
    }
  }
  
  // Create response
  const response = NextResponse.next()
  
  // Security Headers
  const securityHeaders = {
      // Prevent clickjacking
      'X-Frame-Options': 'DENY',
      
      // Prevent MIME type sniffing
      'X-Content-Type-Options': 'nosniff',
      
      // XSS Protection
      'X-XSS-Protection': '1; mode=block',
      
      // Referrer Policy
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      
      // Permissions Policy (formerly Feature-Policy)
      'Permissions-Policy': 
      'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    
    // Content Security Policy (Stricter)
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' http://localhost:4000 https://api.mapbox.com https://*.tiles.mapbox.com",
      "frame-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
      "require-trusted-types-for 'script'",
      "trusted-types default",
    ].join('; '),
    
    // Strict Transport Security (HTTPS only - enable in production)
    // 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    
    // Cross-Origin Embedder Policy
    'Cross-Origin-Embedder-Policy': 'require-corp',
    
    // Cross-Origin Opener Policy
    'Cross-Origin-Opener-Policy': 'same-origin',
    
    // Cross-Origin Resource Policy
    'Cross-Origin-Resource-Policy': 'same-origin',
    
    // Expect-CT (Certificate Transparency)
    'Expect-CT': 'max-age=86400, enforce',
    
    // X-Permitted-Cross-Domain-Policies
    'X-Permitted-Cross-Domain-Policies': 'none',
    
    // Clear-Site-Data (for logout/clear sessions)
    // 'Clear-Site-Data': '"cache", "cookies", "storage"',
  }
  
  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  // Remove sensitive headers
  response.headers.delete('X-Powered-By')
  response.headers.delete('Server')
  
  // CORS headers for API routes
  if (pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin')
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      process.env.NEXT_PUBLIC_FRONTEND_URL,
      process.env.NEXT_PUBLIC_ADMIN_URL,
    ].filter(Boolean)
  
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    }
    
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.set('Access-Control-Max-Age', '86400')
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 204,
        headers: response.headers,
      })
    }
  }
  
  return response
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
}
