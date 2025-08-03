import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { RequestContext, AuditLog } from '@/shared/types/common.types';
import { getLogsCollection } from '@/shared/database/mongodb';

/**
 * Custom error classes
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly code?: string;
  public readonly details?: any;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    code?: string,
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.code = code;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, true, 'VALIDATION_ERROR', details);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, true, 'AUTHENTICATION_ERROR');
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, true, 'AUTHORIZATION_ERROR');
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, true, 'NOT_FOUND_ERROR');
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource conflict') {
    super(message, 409, true, 'CONFLICT_ERROR');
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 429, true, 'RATE_LIMIT_ERROR');
  }
}

/**
 * Error logging configuration
 */
export interface ErrorLogConfig {
  logToDatabase: boolean;
  logToConsole: boolean;
  logToFile?: boolean;
  includeStackTrace: boolean;
  excludeSensitiveData: boolean;
}

/**
 * Default error log configuration
 */
const defaultErrorLogConfig: ErrorLogConfig = {
  logToDatabase: true,
  logToConsole: true,
  includeStackTrace: process.env.NODE_ENV === 'development',
  excludeSensitiveData: true,
};

/**
 * Log error to database
 * @param error - Error to log
 * @param context - Request context
 * @param request - Next.js request object
 */
async function logErrorToDatabase(
  error: Error,
  context: RequestContext,
  request: NextRequest
): Promise<void> {
  try {
    const logsCollection = await getLogsCollection();
    
    const logEntry: Omit<AuditLog, '_id'> = {
      userId: context.user ? context.user.id : undefined,
      action: 'ERROR',
      resource: 'API',
      resourceId: request.url,
      changes: {
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
          statusCode: error instanceof AppError ? error.statusCode : 500,
          code: error instanceof AppError ? error.code : undefined,
        },
        request: {
          method: request.method,
          url: request.url,
          headers: Object.fromEntries(request.headers.entries()),
          userAgent: request.headers.get('user-agent'),
        },
      },
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await logsCollection.insertOne(logEntry);
  } catch (logError) {
    console.error('Failed to log error to database:', logError);
  }
}

/**
 * Log error to console
 * @param error - Error to log
 * @param context - Request context
 * @param request - Next.js request object
 */
function logErrorToConsole(
  error: Error,
  context: RequestContext,
  request: NextRequest
): void {
  const timestamp = new Date().toISOString();
  const userId = context.user?.id || 'anonymous';
  const method = request.method;
  const url = request.url;
  
  console.error(`[${timestamp}] ERROR: ${error.message}`);
  console.error(`User: ${userId}, Method: ${method}, URL: ${url}`);
  
  if (error instanceof AppError) {
    console.error(`Status: ${error.statusCode}, Code: ${error.code}`);
    if (error.details) {
      console.error('Details:', JSON.stringify(error.details, null, 2));
    }
  }
  
  if (process.env.NODE_ENV === 'development' && error.stack) {
    console.error('Stack trace:', error.stack);
  }
}

/**
 * Sanitize error for client response
 * @param error - Error to sanitize
 * @returns Sanitized error data
 */
function sanitizeErrorForClient(error: Error): any {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      details: isDevelopment ? error.details : undefined,
      stack: isDevelopment ? error.stack : undefined,
    };
  }
  
  if (error instanceof ZodError) {
    return {
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      statusCode: 400,
      details: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code,
      })),
    };
  }
  
  // For unknown errors, don't expose details in production
  return {
    message: isDevelopment ? error.message : 'An unexpected error occurred',
    code: 'INTERNAL_ERROR',
    statusCode: 500,
    stack: isDevelopment ? error.stack : undefined,
  };
}

/**
 * Global error handler middleware
 * @param config - Error logging configuration
 * @returns Error handler function
 */
export function createErrorHandler(config: ErrorLogConfig = defaultErrorLogConfig) {
  return async function errorHandler(
    error: Error,
    request: NextRequest,
    context: RequestContext = {}
  ): Promise<NextResponse> {
    try {
      // Log error based on configuration
      if (config.logToConsole) {
        logErrorToConsole(error, context, request);
      }
      
      if (config.logToDatabase) {
        await logErrorToDatabase(error, context, request);
      }
      
      // Sanitize error for client response
      const sanitizedError = sanitizeErrorForClient(error);
      
      // Create error response
      const response = {
        success: false,
        error: sanitizedError,
        timestamp: new Date().toISOString(),
        requestId: context.requestId,
      };
      
      return NextResponse.json(response, {
        status: sanitizedError.statusCode || 500,
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': context.requestId || '',
        },
      });
    } catch (handlerError) {
      console.error('Error in error handler:', handlerError);
      
      // Fallback error response
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'An unexpected error occurred',
            code: 'INTERNAL_ERROR',
            statusCode: 500,
          },
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }
  };
}

/**
 * Wrap API handler with error handling
 * @param handler - API route handler
 * @param config - Error logging configuration
 * @returns Wrapped handler with error handling
 */
export function withErrorHandling(
  handler: (request: NextRequest, ...args: any[]) => Promise<NextResponse>,
  config: ErrorLogConfig = defaultErrorLogConfig
) {
  const errorHandler = createErrorHandler(config);
  
  return async function (request: NextRequest, ...args: any[]): Promise<NextResponse> {
    try {
      return await handler(request, ...args);
    } catch (error) {
      const context: RequestContext = {
        ipAddress: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
        requestId: request.headers.get('x-request-id') || `req_${Date.now()}`,
      };
      
      // Extract user context if available
      const userId = request.headers.get('x-user-id');
      if (userId) {
        context.user = {
          id: userId,
          email: request.headers.get('x-user-email') || '',
          role: request.headers.get('x-user-role') as any || 'patient',
        };
      }
      
      return errorHandler(error as Error, request, context);
    }
  };
}

/**
 * Helper function to throw validation error
 * @param message - Error message
 * @param details - Error details
 */
export function throwValidationError(message: string, details?: any): never {
  throw new ValidationError(message, details);
}

/**
 * Helper function to throw authentication error
 * @param message - Error message
 */
export function throwAuthenticationError(message?: string): never {
  throw new AuthenticationError(message);
}

/**
 * Helper function to throw authorization error
 * @param message - Error message
 */
export function throwAuthorizationError(message?: string): never {
  throw new AuthorizationError(message);
}

/**
 * Helper function to throw not found error
 * @param message - Error message
 */
export function throwNotFoundError(message?: string): never {
  throw new NotFoundError(message);
}

/**
 * Helper function to throw conflict error
 * @param message - Error message
 */
export function throwConflictError(message?: string): never {
  throw new ConflictError(message);
}

/**
 * Async wrapper that catches and handles errors
 * @param fn - Async function to wrap
 * @returns Wrapped function with error handling
 */
export function asyncHandler<T extends any[], R>(
  fn: (...args: T) => Promise<R>
): (...args: T) => Promise<R> {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      // Re-throw AppErrors as-is
      if (error instanceof AppError) {
        throw error;
      }
      
      // Wrap unknown errors
      throw new AppError(
        error instanceof Error ? error.message : 'An unexpected error occurred',
        500,
        false
      );
    }
  };
}