'use client'

import { signOut } from 'next-auth/react'
import { Session } from 'next-auth'
import { 
  BellIcon, 
  UserCircleIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline'

interface HeaderProps {
  session: Session
}

export default function Header({ session }: HeaderProps) {
  const handleSignOut = async () => {
    await signOut({ 
      callbackUrl: '/dashboard/login',
      redirect: true 
    })
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>

        {/* Right side - User menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* User info */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <UserCircleIcon className="h-8 w-8 text-gray-400" />
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-gray-900">
                  {session.user?.name}
                </div>
                <div className="text-xs text-gray-500">
                  {session.user?.email}
                </div>
              </div>
            </div>

            {/* Sign out button */}
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors duration-200"
              title="Sign out"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}