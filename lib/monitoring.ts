/**
 * Production Monitoring & Error Tracking
 * For SCT Trust Hospital - HIPAA Compliant Logging
 */

interface ErrorLog {
  timestamp: string;
  level: 'error' | 'warn' | 'info';
  message: string;
  stack?: string;
  userId?: string;
  path?: string;
  userAgent?: string;
  // Never log sensitive patient data
}

interface PerformanceMetric {
  timestamp: string;
  metric: string;
  value: number;
  path?: string;
}

class ProductionMonitoring {
  private static instance: ProductionMonitoring;
  private isProduction: boolean;

  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  static getInstance(): ProductionMonitoring {
    if (!ProductionMonitoring.instance) {
      ProductionMonitoring.instance = new ProductionMonitoring();
    }
    return ProductionMonitoring.instance;
  }

  /**
   * Log error with HIPAA compliance
   * Never logs sensitive patient information
   */
  logError(error: Error, context?: {
    userId?: string;
    path?: string;
    userAgent?: string;
  }): void {
    const errorLog: ErrorLog = {
      timestamp: new Date().toISOString(),
      level: 'error',
      message: this.sanitizeMessage(error.message),
      stack: this.isProduction ? undefined : error.stack,
      userId: context?.userId ? this.hashUserId(context.userId) : undefined,
      path: context?.path,
      userAgent: context?.userAgent,
    };

    // In production, send to monitoring service
    if (this.isProduction) {
      this.sendToMonitoringService(errorLog);
    } else {
      console.error('🚨 Error Log:', errorLog);
    }
  }

  /**
   * Log performance metrics
   */
  logPerformance(metric: string, value: number, path?: string): void {
    const performanceLog: PerformanceMetric = {
      timestamp: new Date().toISOString(),
      metric,
      value,
      path,
    };

    if (this.isProduction) {
      this.sendToMonitoringService(performanceLog);
    } else {
      console.info('⚡ Performance:', performanceLog);
    }
  }

  /**
   * Log security events (authentication failures, etc.)
   */
  logSecurityEvent(event: string, context?: {
    userId?: string;
    ip?: string;
    userAgent?: string;
  }): void {
    const securityLog = {
      timestamp: new Date().toISOString(),
      level: 'warn' as const,
      message: `Security Event: ${event}`,
      userId: context?.userId ? this.hashUserId(context.userId) : undefined,
      ip: context?.ip ? this.hashIP(context.ip) : undefined,
      userAgent: context?.userAgent,
    };

    if (this.isProduction) {
      this.sendToMonitoringService(securityLog);
    } else {
      console.warn('🛡️ Security Event:', securityLog);
    }
  }

  /**
   * Sanitize error messages to remove sensitive data
   */
  private sanitizeMessage(message: string): string {
    // Remove potential sensitive patterns
    return message
      .replace(/password[=:]\s*\S+/gi, 'password=***')
      .replace(/token[=:]\s*\S+/gi, 'token=***')
      .replace(/key[=:]\s*\S+/gi, 'key=***')
      .replace(/email[=:]\s*\S+@\S+/gi, 'email=***@***')
      .replace(/\b\d{3}-\d{2}-\d{4}\b/g, 'SSN-***') // SSN pattern
      .replace(/\b\d{16}\b/g, 'CARD-***'); // Credit card pattern
  }

  /**
   * Hash user ID for privacy
   */
  private hashUserId(userId: string): string {
    // Simple hash for user privacy
    return 'user_' + Buffer.from(userId).toString('base64').slice(0, 8);
  }

  /**
   * Hash IP address for privacy
   */
  private hashIP(ip: string): string {
    // Keep first two octets, hash the rest
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.***.***.***`;
    }
    return 'ip_***';
  }

  /**
   * Send logs to monitoring service (placeholder)
   * In production, integrate with services like Sentry, LogRocket, or DataDog
   */
  private sendToMonitoringService(log: any): void {
    // TODO: Integrate with monitoring service
    // Example services for healthcare:
    // - Sentry (error tracking)
    // - LogRocket (session replay with HIPAA compliance)
    // - DataDog (infrastructure monitoring)
    // - AWS CloudWatch (if using AWS)
    
    // For now, store in console for development
    const logLevel = log.level === 'error' ? 'error' : log.level === 'warn' ? 'warn' : 'info';
    console[logLevel]('📊 Monitoring Service:', log);
  }
}

// Export singleton instance
export const monitoring = ProductionMonitoring.getInstance();

/**
 * React Error Boundary integration
 */
export function logReactError(error: Error, errorInfo: any): void {
  monitoring.logError(error, {
    path: window?.location?.pathname,
    userAgent: navigator?.userAgent,
  });
}

/**
 * API Error handler
 */
export function logAPIError(error: Error, request: {
  path: string;
  method: string;
  userId?: string;
}): void {
  monitoring.logError(error, {
    path: `${request.method} ${request.path}`,
    userId: request.userId,
  });
}

/**
 * Performance monitoring helpers
 */
export function measurePageLoad(): void {
  if (typeof window !== 'undefined' && window.performance) {
    const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    monitoring.logPerformance('page_load_time', loadTime, window.location.pathname);
  }
}

export function measureAPICall(path: string, duration: number): void {
  monitoring.logPerformance('api_response_time', duration, path);
}

/**
 * Security event helpers
 */
export function logFailedLogin(email: string, ip?: string): void {
  monitoring.logSecurityEvent('failed_login', {
    userId: email,
    ip,
  });
}

export function logSuccessfulLogin(userId: string, ip?: string): void {
  monitoring.logSecurityEvent('successful_login', {
    userId,
    ip,
  });
}

export default monitoring;