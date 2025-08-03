'use client'

import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import Sidebar from './components/sidebar'
import Header from './components/header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()
  const pathname = usePathname()

  // Allow login page to render without session
  const isLoginPage = pathname === '/dashboard/login'

  // If no session and not on login page, show access gate
  if (!session?.user && !isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900">Access restricted</h2>
          <p className="mt-2 text-sm text-gray-600">Please sign in to access the dashboard.</p>
          <a
            href="/dashboard/login"
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  // If we're on the login page, render children without the dashboard chrome
  if (isLoginPage) {
    return <>{children}</>
  }

  // Check if we're on the main dashboard page
  const isMainDashboard = pathname === '/dashboard'

  return (
    <div className="flex h-screen bg-gray-50 dashboard-layout">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {!isMainDashboard && session && <Header session={session} />}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className={`container mx-auto px-6 ${isMainDashboard ? 'py-4' : 'py-8'}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
