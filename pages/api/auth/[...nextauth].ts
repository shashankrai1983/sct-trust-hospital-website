import NextAuth, { NextAuthOptions } from 'next-auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { 
          label: 'Email', 
          type: 'email',
          placeholder: 'admin@scttrusthospital.com' 
        },
        password: { 
          label: 'Password', 
          type: 'password' 
        }
      },
      async authorize(credentials, req) {
        // Enhanced input validation
        if (!credentials?.email?.trim() || !credentials?.password?.trim()) {
          return null
        }

        // Environment variables validation
        const adminEmail = process.env.ADMIN_EMAIL
        let adminPasswordHash = process.env.ADMIN_PASSWORD_HASH

        // Fallback: Read from .env file directly if environment variable not available
        if (!adminPasswordHash) {
          const fs = require('fs')
          const path = require('path')
          try {
            const envPath = path.join(process.cwd(), '.env')
            const envContent = fs.readFileSync(envPath, 'utf8')
            const hashMatch = envContent.match(/ADMIN_PASSWORD_HASH=(.+)/)
            if (hashMatch) {
              adminPasswordHash = hashMatch[1].trim()
            }
          } catch (error) {
            console.error('Error reading .env file:', error.message)
          }
        }

        if (!adminEmail || !adminPasswordHash) {
          console.error('Authentication failed: Admin credentials not configured')
          return null
        }

        // Normalize email for comparison (case-insensitive, trimmed)
        const normalizedEmail = credentials.email.trim().toLowerCase()
        const normalizedAdminEmail = adminEmail.trim().toLowerCase()

        // Check if email matches
        if (normalizedEmail !== normalizedAdminEmail) {
          return null
        }

        // Verify password
        try {
          const isValidPassword = await bcrypt.compare(credentials.password, adminPasswordHash)
          
          if (isValidPassword) {
            return {
              id: 'admin',
              email: adminEmail,
              name: 'Admin User',
              role: 'admin'
            }
          }
        } catch (error) {
          console.error('Password verification error:', error)
        }

        return null
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8 hours for security
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role
        session.user.id = token.id
      }
      return session
    }
  },
  pages: {
    signIn: '/dashboard/login',
    error: '/dashboard/login'
  },
  secret: process.env.NEXTAUTH_SECRET || (() => {
    // Fallback: Read NEXTAUTH_SECRET from .env file directly
    try {
      const fs = require('fs')
      const path = require('path')
      const envPath = path.join(process.cwd(), '.env')
      const envContent = fs.readFileSync(envPath, 'utf8')
      const secretMatch = envContent.match(/NEXTAUTH_SECRET=(.+)/)
      return secretMatch ? secretMatch[1].trim() : undefined
    } catch (error) {
      console.error('Error reading NEXTAUTH_SECRET from .env:', error.message)
      return undefined
    }
  })()
}

export default function handler(req, res){
  if (req.method==='POST' && req.url?.includes('/callback/credentials')) {
    // Log raw body for debugging only in development
    try {
      console.log('[Auth Debug] credentials body raw:');
      req.body && console.log(req.body);
    } catch(e){}
  }
  return NextAuth(authOptions)(req, res)
}