'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Appointments Dashboard', href: '/dashboard', icon: CalendarIcon },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-white shadow-lg">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-gray-200 px-6">
        <h1 className="text-xl font-bold text-gray-900">SCT Admin</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                }`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        <div className="text-xs text-gray-500 text-center">
          SCT Trust Hospital
          <br />
          Admin Dashboard
        </div>
      </div>
    </div>
  )
}