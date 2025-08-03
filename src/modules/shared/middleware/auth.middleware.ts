import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { UserRole, RequestContext } from '@/shared/types/common.types';

/**
 * Authentication middleware configuration
 */
export interface AuthConfig {
  secret: string;
  requireAuth: boolean;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

/**
 * Enhanced request with user context
 */
export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    role: UserRole;
    name: string;
  };
  context?: RequestContext;
}

/**
 * Create authentication middleware
 * @param config - Authentication configuration
 * @returns Middleware function
 */
export function createAuthMiddleware(config: AuthConfig) {
  return async function authMiddleware(
    request: NextRequest
  ): Promise<NextResponse | void> {
    try {
      // Get the token from the request
      const token = await getToken({
        req: request,
        secret: config.secret,
      });

      // Check if authentication is required
      if (config.requireAuth && !token) {
        return NextResponse.redirect(
          new URL(config.redirectTo || '/login', request.url)
        );
      }

      // Check role-based access
      if (config.allowedRoles && token) {
        const userRole = token.role as UserRole;
        if (!config.allowedRoles.includes(userRole)) {
          return NextResponse.json(
            { 
              success: false, 
              message: 'Insufficient permissions',
              requiredRoles: config.allowedRoles,
              userRole 
            },
            { status: 403 }
          );
        }
      }

      // Add user context to request headers for API routes
      if (token) {
        const headers = new Headers(request.headers);
        headers.set('x-user-id', token.sub || '');
        headers.set('x-user-email', token.email || '');
        headers.set('x-user-role', (token.role as string) || '');
        headers.set('x-user-name', (token.name as string) || '');
        
        return NextResponse.next({
          request: {
            headers,
          },
        });
      }

      return NextResponse.next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      
      if (config.requireAuth) {
        return NextResponse.redirect(
          new URL(config.redirectTo || '/login', request.url)
        );
      }
      
      return NextResponse.next();
    }
  };
}

/**
 * Extract user context from request headers
 * @param request - Next.js request object
 * @returns RequestContext or null
 */
export function extractUserContext(request: NextRequest): RequestContext | null {
  const userId = request.headers.get('x-user-id');
  const userEmail = request.headers.get('x-user-email');
  const userRole = request.headers.get('x-user-role') as UserRole;
  const userName = request.headers.get('x-user-name');

  if (!userId || !userEmail || !userRole) {
    return null;
  }

  return {
    user: {
      id: userId,
      email: userEmail,
      role: userRole,
    },
    ipAddress: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
    requestId: request.headers.get('x-request-id') || generateRequestId(),
  };
}

/**
 * Generate unique request ID
 * @returns Unique request identifier
 */
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Role-based access control decorator
 * @param allowedRoles - Roles allowed to access the resource
 * @returns Function decorator
 */
export function requireRoles(allowedRoles: UserRole[]) {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value;

    descriptor.value = async function (request: NextRequest, ...args: any[]) {
      const context = extractUserContext(request);
      
      if (!context?.user) {
        return NextResponse.json(
          { success: false, message: 'Authentication required' },
          { status: 401 }
        );
      }

      if (!allowedRoles.includes(context.user.role)) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Insufficient permissions',
            requiredRoles: allowedRoles,
            userRole: context.user.role 
          },
          { status: 403 }
        );
      }

      return method.apply(this, [request, ...args]);
    };

    return descriptor;
  };
}

/**
 * API route wrapper with authentication
 * @param handler - API route handler
 * @param config - Authentication configuration
 * @returns Wrapped handler function
 */
export function withAuth(
  handler: (request: NextRequest, context: RequestContext) => Promise<NextResponse>,
  config: Partial<AuthConfig> = {}
) {
  return async function (request: NextRequest): Promise<NextResponse> {
    try {
      const context = extractUserContext(request);

      // Check if authentication is required
      if (config.requireAuth && !context?.user) {
        return NextResponse.json(
          { success: false, message: 'Authentication required' },
          { status: 401 }
        );
      }

      // Check role-based access
      if (config.allowedRoles && context?.user) {
        if (!config.allowedRoles.includes(context.user.role)) {
          return NextResponse.json(
            { 
              success: false, 
              message: 'Insufficient permissions',
              requiredRoles: config.allowedRoles,
              userRole: context.user.role 
            },
            { status: 403 }
          );
        }
      }

      // Call the original handler with context
      return handler(request, context || {});
    } catch (error) {
      console.error('Authentication error:', error);
      return NextResponse.json(
        { success: false, message: 'Authentication failed' },
        { status: 500 }
      );
    }
  };
}

/**
 * Check if user has required role
 * @param userRole - User's current role
 * @param requiredRoles - Required roles for access
 * @returns Boolean indicating access permission
 */
export function hasRole(userRole: UserRole, requiredRoles: UserRole[]): boolean {
  return requiredRoles.includes(userRole);
}

/**
 * Check if user has admin privileges
 * @param userRole - User's current role
 * @returns Boolean indicating admin access
 */
export function isAdmin(userRole: UserRole): boolean {
  return userRole === 'admin';
}

/**
 * Check if user can access patient data
 * @param userRole - User's current role
 * @returns Boolean indicating patient data access
 */
export function canAccessPatientData(userRole: UserRole): boolean {
  return ['admin', 'doctor', 'nurse'].includes(userRole);
}