'use client'

import { useEffect } from 'react'
import { 
  CalendarIcon, 
  UsersIcon, 
  ClockIcon,
  ChartBarIcon,
  ViewColumnsIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  BellIcon
} from '@heroicons/react/24/outline'
import CalendarView from './components/calendar-view'
import IndexNowPanel from '@/components/dashboard/indexnow-panel'
import AppointmentFilters from './components/AppointmentFilters'
import AppointmentTable from './components/AppointmentTable'
import { useDashboardData } from './hooks/useDashboardData'
import { useNotificationSystem } from './hooks/useNotificationSystem'

export default function DashboardPage() {
  const {
    stats,
    appointments,
    filteredAppointments,
    loading,
    error,
    filters,
    updatingStatus,
    setFilters,
    fetchDashboardData,
    updateAppointmentStatus
  } = useDashboardData()

  const {
    permission: notificationPermission,
    hasNewLeads,
    requestPermission: requestNotificationPermission,
    checkForNewLeads,
    startPolling,
    stopPolling,
    testNotification
  } = useNotificationSystem(appointments)

  // Initialize polling and notification system
  useEffect(() => {
    // Start polling with notification check
    const pollingFetch = async (isPolling: boolean) => {
      const result = await fetchDashboardData(isPolling)
      if (isPolling && result.isNewData) {
        checkForNewLeads(result.appointments)
      }
    }

    startPolling(pollingFetch)
    return () => stopPolling()
  }, [startPolling, stopPolling, fetchDashboardData, checkForNewLeads])

  // Stats cards configuration - clean data structure
  const statCards = [
    {
      name: 'Total Appointments',
      value: stats.totalAppointments,
      icon: CalendarIcon,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      name: 'Today\'s Appointments',
      value: stats.todayAppointments,
      icon: ClockIcon,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      name: 'This Week',
      value: stats.thisWeekAppointments,
      icon: UsersIcon,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      name: 'This Month',
      value: stats.thisMonthAppointments,
      icon: ChartBarIcon,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => fetchDashboardData()} 
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <DashboardHeader 
        hasNewLeads={hasNewLeads}
        notificationPermission={notificationPermission}
        onRequestPermission={requestNotificationPermission}
        onTestNotification={testNotification}
      />

      <DashboardViewSelector />

      <StatsCards cards={statCards} />

      <AppointmentFilters
        appointments={appointments}
        filters={filters}
        onFiltersChange={setFilters}
        filteredCount={filteredAppointments.length}
      />

      <AppointmentTable
        appointments={filteredAppointments}
        onStatusUpdate={updateAppointmentStatus}
        updatingStatus={updatingStatus}
      />
    </div>
  )
}

// Extracted header component - single responsibility
function DashboardHeader({ 
  hasNewLeads, 
  notificationPermission, 
  onRequestPermission, 
  onTestNotification 
}: {
  hasNewLeads: boolean
  notificationPermission: NotificationPermission
  onRequestPermission: () => Promise<boolean>
  onTestNotification: () => void
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          {hasNewLeads && (
            <div className="flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-red-700">New Lead!</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 mt-1">
          <p className="text-sm sm:text-base text-gray-600">Welcome to SCT Trust Hospital Admin Dashboard</p>
          
          <NotificationStatus
            permission={notificationPermission}
            onRequestPermission={onRequestPermission}
            onTestNotification={onTestNotification}
          />
        </div>
      </div>
    </div>
  )
}

// Notification status component - pure UI
function NotificationStatus({ 
  permission, 
  onRequestPermission, 
  onTestNotification 
}: {
  permission: NotificationPermission
  onRequestPermission: () => Promise<boolean>
  onTestNotification: () => void
}) {
  return (
    <>
      {permission === 'default' && (
        <button
          onClick={onRequestPermission}
          className="flex items-center gap-2 px-3 py-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
        >
          <BellIcon className="w-4 h-4" />
          Enable Notifications
        </button>
      )}
      
      {permission === 'granted' && (
        <div className="flex items-center gap-2 px-3 py-1 text-xs bg-green-50 text-green-700 border border-green-200 rounded-md">
          <BellIcon className="w-4 h-4" />
          Notifications Active
        </div>
      )}
      
      {permission === 'denied' && (
        <div className="flex items-center gap-2 px-3 py-1 text-xs bg-orange-50 text-orange-700 border border-orange-200 rounded-md">
          <BellIcon className="w-4 h-4" />
          Notifications Disabled
        </div>
      )}

      {process.env.NODE_ENV === 'development' && permission === 'granted' && (
        <button
          onClick={onTestNotification}
          className="flex items-center gap-2 px-3 py-1 text-xs bg-purple-50 text-purple-700 border border-purple-200 rounded-md hover:bg-purple-100 transition-colors"
        >
          🧪 Test Notification
        </button>
      )}
    </>
  )
}

// View selector component - TODO: implement view switching
function DashboardViewSelector() {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
      <button className="flex items-center justify-center px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors bg-white text-gray-900 shadow-sm flex-1 sm:flex-none">
        <ViewColumnsIcon className="w-4 h-4 mr-1 sm:mr-2" />
        <span className="hidden xs:inline">Dashboard</span>
      </button>
      <a
        href="/dashboard/blocked-dates"
        className="flex items-center justify-center px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-500 hover:text-gray-700 flex-1 sm:flex-none"
      >
        <CalendarIcon className="w-4 h-4 mr-1 sm:mr-2" />
        <span className="hidden xs:inline">Block Dates</span>
      </a>
    </div>
  )
}

// Stats cards component - pure display
function StatsCards({ cards }: { cards: Array<{ name: string; value: number; icon: any; bgColor: string; textColor: string }> }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" data-testid="stats">
      {cards.map((stat, index) => (
        <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg stat-card" data-testid={`stat-card-${index}`}>
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 ${stat.bgColor} rounded-md flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate" data-testid={`${stat.name.toLowerCase().replace(/\s+/g, '-')}-label`}>
                    {stat.name}
                  </dt>
                  <dd className="text-lg font-medium text-gray-900" data-testid={`${stat.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    {stat.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
