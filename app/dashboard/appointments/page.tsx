'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AppointmentsPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main dashboard since all appointment functionality is now centralized there
    router.replace('/dashboard')
  }, [router])

  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  )
}