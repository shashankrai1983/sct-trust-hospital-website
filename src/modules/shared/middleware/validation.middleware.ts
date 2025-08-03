import { NextRequest, NextResponse } from 'next/server';
import { z, ZodSchema } from 'zod';
import { RequestContext } from '@/shared/types/common.types';
import { errorUtils } from '@/shared/utils/validation.utils';

/**
 * Validation middleware configuration
 */
export interface ValidationConfig {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
  headers?: ZodSchema;
}

/**
 * Validated request data
 */
export interface ValidatedData {
  body?: any;
  query?: any;
  params?: any;
  headers?: any;
}

/**
 * Request with validated data
 */
export interface ValidatedRequest extends NextRequest {
  validated?: ValidatedData;
}

/**
 * Create validation middleware
 * @param schemas - Schema configuration for different parts of request
 * @returns Middleware function
 */
export function createValidationMiddleware(schemas: ValidationConfig) {
  return async function validationMiddleware(
    request: NextRequest
  ): Promise<NextResponse | void> {
    try {
      const validated: ValidatedData = {};
      const errors: any[] = [];

      // Validate request body
      if (schemas.body) {
        try {
          const body = await request.json();
          validated.body = schemas.body.parse(body);
        } catch (error) {
          if (error instanceof z.ZodError) {
            errors.push(...errorUtils.formatZodError(error));
          } else {
            errors.push({ field: 'body', message: 'Invalid JSON format' });
          }
        }
      }

      // Validate query parameters
      if (schemas.query) {
        try {
          const url = new URL(request.url);
          const queryParams = Object.fromEntries(url.searchParams.entries());
          validated.query = schemas.query.parse(queryParams);
        } catch (error) {
          if (error instanceof z.ZodError) {
            errors.push(...errorUtils.formatZodError(error));
          }
        }
      }

      // Validate URL parameters (need to be extracted from route context)
      if (schemas.params) {
        // This would need to be implemented based on your routing setup
        // For now, we'll skip params validation in middleware
      }

      // Validate headers
      if (schemas.headers) {
        try {
          const headers = Object.fromEntries(request.headers.entries());
          validated.headers = schemas.headers.parse(headers);
        } catch (error) {
          if (error instanceof z.ZodError) {
            errors.push(...errorUtils.formatZodError(error));
          }
        }
      }

      // Return validation errors if any
      if (errors.length > 0) {
        return NextResponse.json(
          errorUtils.createValidationError('Validation failed', errors),
          { status: 400 }
        );
      }

      // Add validated data to request headers for API routes
      const headers = new Headers(request.headers);
      headers.set('x-validated-data', JSON.stringify(validated));

      return NextResponse.next({
        request: {
          headers,
        },
      });
    } catch (error) {
      console.error('Validation middleware error:', error);
      return NextResponse.json(
        errorUtils.createValidationError('Validation middleware failed'),
        { status: 500 }
      );
    }
  };
}

/**
 * Extract validated data from request headers
 * @param request - Next.js request object
 * @returns Validated data or null
 */
export function extractValidatedData(request: NextRequest): ValidatedData | null {
  try {
    const validatedDataHeader = request.headers.get('x-validated-data');
    if (!validatedDataHeader) return null;
    
    return JSON.parse(validatedDataHeader);
  } catch (error) {
    console.error('Error extracting validated data:', error);
    return null;
  }
}

/**
 * API route wrapper with validation
 * @param handler - API route handler
 * @param schemas - Validation schemas
 * @returns Wrapped handler function
 */
export function withValidation(
  handler: (request: NextRequest, validated: ValidatedData, context?: RequestContext) => Promise<NextResponse>,
  schemas: ValidationConfig
) {
  return async function (request: NextRequest, context?: RequestContext): Promise<NextResponse> {
    try {
      const validated: ValidatedData = {};
      const errors: any[] = [];

      // Validate request body
      if (schemas.body) {
        try {
          const body = await request.json();
          validated.body = schemas.body.parse(body);
        } catch (error) {
          if (error instanceof z.ZodError) {
            errors.push(...errorUtils.formatZodError(error));
          } else {
            errors.push({ field: 'body', message: 'Invalid JSON format' });
          }
        }
      }

      // Validate query parameters
      if (schemas.query) {
        try {
          const url = new URL(request.url);
          const queryParams = Object.fromEntries(url.searchParams.entries());
          validated.query = schemas.query.parse(queryParams);
        } catch (error) {
          if (error instanceof z.ZodError) {
            errors.push(...errorUtils.formatZodError(error));
          }
        }
      }

      // Return validation errors if any
      if (errors.length > 0) {
        return NextResponse.json(
          errorUtils.createValidationError('Validation failed', errors),
          { status: 400 }
        );
      }

      // Call the original handler with validated data
      return handler(request, validated, context);
    } catch (error) {
      console.error('Validation wrapper error:', error);
      return NextResponse.json(
        errorUtils.createValidationError('Validation failed'),
        { status: 500 }
      );
    }
  };
}

/**
 * Combine authentication and validation middleware
 * @param handler - API route handler
 * @param authConfig - Authentication configuration
 * @param validationSchemas - Validation schemas
 * @returns Combined middleware wrapper
 */
export function withAuthAndValidation(
  handler: (request: NextRequest, validated: ValidatedData, context: RequestContext) => Promise<NextResponse>,
  authConfig: { requireAuth?: boolean; allowedRoles?: string[] } = {},
  validationSchemas: ValidationConfig = {}
) {
  return withValidation(
    async (request: NextRequest, validated: ValidatedData, context?: RequestContext) => {
      // Authentication check
      if (authConfig.requireAuth && !context?.user) {
        return NextResponse.json(
          { success: false, message: 'Authentication required' },
          { status: 401 }
        );
      }

      // Role-based access check
      if (authConfig.allowedRoles && context?.user) {
        if (!authConfig.allowedRoles.includes(context.user.role)) {
          return NextResponse.json(
            { 
              success: false, 
              message: 'Insufficient permissions',
              requiredRoles: authConfig.allowedRoles,
              userRole: context.user.role 
            },
            { status: 403 }
          );
        }
      }

      return handler(request, validated, context || {});
    },
    validationSchemas
  );
}

/**
 * Sanitize and validate file upload
 * @param file - File to validate
 * @param options - Validation options
 * @returns Validation result
 */
export function validateFileUpload(
  file: File,
  options: {
    maxSize?: number; // in bytes
    allowedTypes?: string[];
    allowedExtensions?: string[];
  } = {}
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check file size
  if (options.maxSize && file.size > options.maxSize) {
    errors.push(`File size exceeds maximum allowed size of ${options.maxSize} bytes`);
  }

  // Check file type
  if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
    errors.push(`File type ${file.type} is not allowed`);
  }

  // Check file extension
  if (options.allowedExtensions) {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !options.allowedExtensions.includes(extension)) {
      errors.push(`File extension .${extension} is not allowed`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Rate limiting configuration
 */
export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  keyGenerator?: (request: NextRequest) => string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

/**
 * Simple in-memory rate limiter (for development)
 * In production, use Redis or similar
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Rate limiting middleware
 * @param config - Rate limiting configuration
 * @returns Middleware function
 */
export function createRateLimitMiddleware(config: RateLimitConfig) {
  return async function rateLimitMiddleware(
    request: NextRequest
  ): Promise<NextResponse | void> {
    try {
      const key = config.keyGenerator ? 
        config.keyGenerator(request) : 
        request.ip || 'unknown';

      const now = Date.now();
      const windowStart = now - config.windowMs;

      // Clean up old entries
      for (const [k, v] of rateLimitStore.entries()) {
        if (v.resetTime < now) {
          rateLimitStore.delete(k);
        }
      }

      // Get or create rate limit data for this key
      let rateLimitData = rateLimitStore.get(key);
      if (!rateLimitData || rateLimitData.resetTime < now) {
        rateLimitData = {
          count: 0,
          resetTime: now + config.windowMs,
        };
      }

      // Check if rate limit exceeded
      if (rateLimitData.count >= config.maxRequests) {
        return NextResponse.json(
          {
            success: false,
            message: 'Too many requests',
            retryAfter: Math.ceil((rateLimitData.resetTime - now) / 1000),
          },
          { 
            status: 429,
            headers: {
              'X-RateLimit-Limit': config.maxRequests.toString(),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': rateLimitData.resetTime.toString(),
              'Retry-After': Math.ceil((rateLimitData.resetTime - now) / 1000).toString(),
            }
          }
        );
      }

      // Increment count
      rateLimitData.count++;
      rateLimitStore.set(key, rateLimitData);

      // Add rate limit headers
      const response = NextResponse.next();
      response.headers.set('X-RateLimit-Limit', config.maxRequests.toString());
      response.headers.set('X-RateLimit-Remaining', (config.maxRequests - rateLimitData.count).toString());
      response.headers.set('X-RateLimit-Reset', rateLimitData.resetTime.toString());

      return response;
    } catch (error) {
      console.error('Rate limit middleware error:', error);
      return NextResponse.next();
    }
  };
}