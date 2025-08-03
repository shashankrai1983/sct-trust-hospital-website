import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { pathname, origin } = req.nextUrl

    // Always allow access to login page
    if (pathname === '/dashboard/login') {
      return NextResponse.next()
    }

    // Explicitly redirect unauthenticated users to login for all dashboard routes
    // withAuth will set req.nextauth.token when authenticated
    // @ts-expect-error next-auth augments request with nextauth
    const token = req.nextauth?.token
    if (pathname.startsWith('/dashboard') && !token) {
      const url = new URL('/dashboard/login', origin)
      url.searchParams.set('callbackUrl', req.nextUrl.href)
      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Always allow access to login page
        if (pathname === '/dashboard/login') {
          return true
        }
        
        // Require valid token for other dashboard routes
        return !!token
      },
    },
    pages: {
      signIn: '/dashboard/login',
    },
  }
)

// Only protect authenticated dashboard routes
export const config = {
  matcher: [
    '/dashboard/((?!login).*)', // Protect all dashboard routes except login
  ]
}
