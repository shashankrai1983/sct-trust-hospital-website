import { HealthStatus } from '@/shared/types/common.types';
import { checkDatabaseHealth } from '@/shared/database/mongodb';

/**
 * Health check service for monitoring system components
 */
export class HealthService {
  private static instance: HealthService;
  private healthChecks: Map<string, () => Promise<HealthStatus>> = new Map();

  private constructor() {
    this.registerDefaultHealthChecks();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): HealthService {
    if (!HealthService.instance) {
      HealthService.instance = new HealthService();
    }
    return HealthService.instance;
  }

  /**
   * Register default health checks
   */
  private registerDefaultHealthChecks(): void {
    // Database health check
    this.registerHealthCheck('database', async () => {
      const startTime = Date.now();
      try {
        const isHealthy = await checkDatabaseHealth();
        const responseTime = Date.now() - startTime;
        
        return {
          service: 'database',
          status: isHealthy ? 'healthy' : 'unhealthy',
          lastCheck: new Date(),
          responseTime,
          error: isHealthy ? undefined : 'Database connection failed',
        };
      } catch (error) {
        const responseTime = Date.now() - startTime;
        return {
          service: 'database',
          status: 'unhealthy',
          lastCheck: new Date(),
          responseTime,
          error: error instanceof Error ? error.message : 'Unknown database error',
        };
      }
    });

    // Memory usage health check
    this.registerHealthCheck('memory', async () => {
      try {
        const memoryUsage = process.memoryUsage();
        const heapUsedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
        const heapTotalMB = Math.round(memoryUsage.heapTotal / 1024 / 1024);
        const heapUsagePercent = (heapUsedMB / heapTotalMB) * 100;
        
        let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
        let error: string | undefined;
        
        if (heapUsagePercent > 90) {
          status = 'unhealthy';
          error = `High memory usage: ${heapUsagePercent.toFixed(1)}%`;
        } else if (heapUsagePercent > 75) {
          status = 'degraded';
          error = `Elevated memory usage: ${heapUsagePercent.toFixed(1)}%`;
        }
        
        return {
          service: 'memory',
          status,
          lastCheck: new Date(),
          responseTime: 0,
          error,
        };
      } catch (error) {
        return {
          service: 'memory',
          status: 'unhealthy',
          lastCheck: new Date(),
          responseTime: 0,
          error: error instanceof Error ? error.message : 'Memory check failed',
        };
      }
    });

    // Disk space health check (if applicable)
    this.registerHealthCheck('disk', async () => {
      try {
        // In a serverless environment, disk checks might not be applicable
        // This is a placeholder for traditional server deployments
        return {
          service: 'disk',
          status: 'healthy' as const,
          lastCheck: new Date(),
          responseTime: 0,
        };
      } catch (error) {
        return {
          service: 'disk',
          status: 'unhealthy' as const,
          lastCheck: new Date(),
          responseTime: 0,
          error: error instanceof Error ? error.message : 'Disk check failed',
        };
      }
    });

    // External dependencies health check
    this.registerHealthCheck('external', async () => {
      const startTime = Date.now();
      try {
        // Check external services (email, SMS, etc.)
        // For now, we'll just return healthy
        const responseTime = Date.now() - startTime;
        
        return {
          service: 'external',
          status: 'healthy' as const,
          lastCheck: new Date(),
          responseTime,
        };
      } catch (error) {
        const responseTime = Date.now() - startTime;
        return {
          service: 'external',
          status: 'unhealthy' as const,
          lastCheck: new Date(),
          responseTime,
          error: error instanceof Error ? error.message : 'External services check failed',
        };
      }
    });
  }

  /**
   * Register a custom health check
   * @param name - Health check name
   * @param checkFunction - Function that performs the health check
   */
  public registerHealthCheck(
    name: string,
    checkFunction: () => Promise<HealthStatus>
  ): void {
    this.healthChecks.set(name, checkFunction);
  }

  /**
   * Remove a health check
   * @param name - Health check name to remove
   */
  public unregisterHealthCheck(name: string): void {
    this.healthChecks.delete(name);
  }

  /**
   * Run a specific health check
   * @param name - Health check name
   * @returns Health status or null if check doesn't exist
   */
  public async runHealthCheck(name: string): Promise<HealthStatus | null> {
    const healthCheck = this.healthChecks.get(name);
    if (!healthCheck) {
      return null;
    }

    try {
      return await healthCheck();
    } catch (error) {
      return {
        service: name,
        status: 'unhealthy',
        lastCheck: new Date(),
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Health check failed',
      };
    }
  }

  /**
   * Run all health checks
   * @returns Array of health statuses
   */
  public async runAllHealthChecks(): Promise<HealthStatus[]> {
    const results: HealthStatus[] = [];
    
    for (const [name, healthCheck] of this.healthChecks) {
      try {
        const result = await healthCheck();
        results.push(result);
      } catch (error) {
        results.push({
          service: name,
          status: 'unhealthy',
          lastCheck: new Date(),
          responseTime: 0,
          error: error instanceof Error ? error.message : 'Health check failed',
        });
      }
    }
    
    return results;
  }

  /**
   * Get overall system health status
   * @returns Overall health summary
   */
  public async getOverallHealth(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    checks: HealthStatus[];
    timestamp: Date;
    uptime: number;
  }> {
    const checks = await this.runAllHealthChecks();
    const unhealthyCount = checks.filter(check => check.status === 'unhealthy').length;
    const degradedCount = checks.filter(check => check.status === 'degraded').length;
    
    let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    
    if (unhealthyCount > 0) {
      overallStatus = 'unhealthy';
    } else if (degradedCount > 0) {
      overallStatus = 'degraded';
    }
    
    return {
      status: overallStatus,
      checks,
      timestamp: new Date(),
      uptime: process.uptime(),
    };
  }

  /**
   * Get system information
   * @returns System information object
   */
  public getSystemInfo(): {
    version: string;
    nodeVersion: string;
    platform: string;
    architecture: string;
    uptime: number;
    environment: string;
    memory: {
      used: number;
      total: number;
      percentage: number;
    };
  } {
    const memoryUsage = process.memoryUsage();
    const heapUsedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
    const heapTotalMB = Math.round(memoryUsage.heapTotal / 1024 / 1024);
    
    return {
      version: process.env.npm_package_version || '1.0.0',
      nodeVersion: process.version,
      platform: process.platform,
      architecture: process.arch,
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'unknown',
      memory: {
        used: heapUsedMB,
        total: heapTotalMB,
        percentage: Math.round((heapUsedMB / heapTotalMB) * 100),
      },
    };
  }

  /**
   * Check if system is ready to accept requests
   * @returns Boolean indicating readiness
   */
  public async isReady(): Promise<boolean> {
    try {
      const databaseHealth = await this.runHealthCheck('database');
      return databaseHealth?.status === 'healthy';
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if system is alive (basic liveness check)
   * @returns Boolean indicating liveness
   */
  public isAlive(): boolean {
    return true; // If this method is called, the process is alive
  }
}

/**
 * Get health service instance
 * @returns HealthService singleton instance
 */
export function getHealthService(): HealthService {
  return HealthService.getInstance();
}