/**
 * Security Monitoring and Logging
 * Logs security events for monitoring and analysis
 */

interface SecurityEvent {
  type: 'blocked_ip' | 'rate_limit' | 'suspicious_activity' | 'invalid_request' | 'api_abuse'
  ip: string
  path: string
  userAgent?: string
  timestamp: number
  details?: Record<string, unknown>
}

class SecurityLogger {
  private events: SecurityEvent[] = []
  private maxEvents = 1000 // Keep last 1000 events in memory

  log(event: Omit<SecurityEvent, 'timestamp'>): void {
    const securityEvent: SecurityEvent = {
      ...event,
      timestamp: Date.now(),
    }

    this.events.push(securityEvent)

    // Keep only last maxEvents
    if (this.events.length > this.maxEvents) {
      this.events.shift()
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('[SECURITY EVENT]', securityEvent)
    }

    // In production, send to monitoring service
    // Example: sendToMonitoringService(securityEvent)
  }

  getRecentEvents(limit: number = 100): SecurityEvent[] {
    return this.events.slice(-limit)
  }

  getEventsByIP(ip: string): SecurityEvent[] {
    return this.events.filter(event => event.ip === ip)
  }

  getEventsByType(type: SecurityEvent['type']): SecurityEvent[] {
    return this.events.filter(event => event.type === type)
  }

  clear(): void {
    this.events = []
  }
}

export const securityLogger = new SecurityLogger()

/**
 * Log blocked IP event
 */
export function logBlockedIP(ip: string, reason: string, path: string, userAgent?: string): void {
  securityLogger.log({
    type: 'blocked_ip',
    ip,
    path,
    userAgent,
    details: { reason },
  })
}

/**
 * Log rate limit event
 */
export function logRateLimit(ip: string, path: string, userAgent?: string): void {
  securityLogger.log({
    type: 'rate_limit',
    ip,
    path,
    userAgent,
  })
}

/**
 * Log suspicious activity
 */
export function logSuspiciousActivity(
  ip: string,
  path: string,
  activity: string,
  userAgent?: string
): void {
  securityLogger.log({
    type: 'suspicious_activity',
    ip,
    path,
    userAgent,
    details: { activity },
  })
}

/**
 * Log invalid request
 */
export function logInvalidRequest(
  ip: string,
  path: string,
  reason: string,
  userAgent?: string
): void {
  securityLogger.log({
    type: 'invalid_request',
    ip,
    path,
    userAgent,
    details: { reason },
  })
}

/**
 * Log API abuse
 */
export function logAPIAbuse(
  ip: string,
  path: string,
  details: Record<string, unknown>,
  userAgent?: string
): void {
  securityLogger.log({
    type: 'api_abuse',
    ip,
    path,
    userAgent,
    details,
  })
}

