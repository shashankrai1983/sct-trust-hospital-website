'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { 
  CalendarIcon, 
  UsersIcon, 
  ClockIcon,
  ChartBarIcon,
  ViewColumnsIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  BellIcon
} from '@heroicons/react/24/outline'
import CalendarView from './components/calendar-view'
import IndexNowPanel from '@/components/dashboard/indexnow-panel'

interface DashboardStats {
  totalAppointments: number
  todayAppointments: number
  thisWeekAppointments: number
  thisMonthAppointments: number
}

interface RecentAppointment {
  _id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  service: string
  status: string
  message?: string
  createdAt: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalAppointments: 0,
    todayAppointments: 0,
    thisWeekAppointments: 0,
    thisMonthAppointments: 0
  })
  const [appointments, setAppointments] = useState<RecentAppointment[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'dashboard' | 'calendar' | 'indexnow'>('dashboard')
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [serviceFilter, setServiceFilter] = useState('')
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)
  
  // Notification and auto-refresh state
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default')
  const [lastChecked, setLastChecked] = useState<Date>(new Date())
  const [hasNewLeads, setHasNewLeads] = useState(false)
  const pollingInterval = useRef<NodeJS.Timeout | null>(null)
  const appointmentsRef = useRef<RecentAppointment[]>([])
  
  // Update ref when appointments change
  useEffect(() => {
    appointmentsRef.current = appointments
  }, [appointments])

  // Notification functions
  const requestNotificationPermission = useCallback(async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      setNotificationPermission(permission)
      return permission === "granted"
    }
    return false
  }, [])

  const showNewLeadNotification = useCallback((appointment: RecentAppointment) => {
    if (notificationPermission === "granted") {
      try {
        // Play notification sound
        const playNotificationSound = () => {
          try {
            // Create audio element with notification sound
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvGEUCjyE0OvZgCkDAx4Gk9Tnv1kEEX+84OaLKgwPbKvz655IBhJam9vx0mclBgx4xfXGDjsdBCCR1vPUdScDJXTE8NKGOAQS');
            audio.volume = 0.5;
            audio.play().catch(() => {
              // Fallback: use system default notification sound
              console.log('Playing fallback notification sound');
            });
          } catch (error) {
            console.warn('Audio notification failed:', error);
          }
        };

        playNotificationSound();

        const notification = new Notification("🏥 New Patient Lead!", {
          body: `${appointment.name} - ${appointment.service}\nDate: ${appointment.date} at ${appointment.time}\nPhone: ${appointment.phone}`,
          icon: "/favicon.ico",
          badge: "/favicon.ico",
          tag: `lead-${appointment._id}`,
          requireInteraction: true,
          silent: false
        })

        // Auto-close after 10 seconds
        setTimeout(() => notification.close(), 10000)

        // Handle click - bring dashboard to front
        notification.onclick = () => {
          window.focus()
          // Try to scroll to the new appointment
          setTimeout(() => {
            const element = document.querySelector(`[data-testid="appointment-${appointment._id}"]`)
            element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }, 100)
          notification.close()
        }

        // Update tab title to show new lead indicator
        document.title = "🔴 New Lead - SCT Hospital Dashboard"
        setTimeout(() => {
          document.title = "SCT Hospital Dashboard"
        }, 10000)

      } catch (error) {
        console.warn('Failed to show notification:', error)
      }
    }
  }, [notificationPermission])

  const getPollingInterval = useCallback(() => {
    const hour = new Date().getHours()
    const isBusinessHours = hour >= 8 && hour <= 18
    return isBusinessHours ? 30000 : 60000 // 30s during business hours, 60s otherwise
  }, [])

  const checkForNewLeads = useCallback((appointments: RecentAppointment[]) => {
    const newLeads = appointments.filter(apt => 
      new Date(apt.createdAt) > lastChecked
    )
    
    if (newLeads.length > 0) {
      // Update last checked time
      const now = new Date()
      setLastChecked(now)
      localStorage.setItem('dashboardLastChecked', now.toISOString())
      
      // Show notification for the most recent lead
      const mostRecent = newLeads.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0]
      
      showNewLeadNotification(mostRecent)
      setHasNewLeads(true)
      
      // Clear new leads indicator after 5 seconds
      setTimeout(() => setHasNewLeads(false), 5000)
      
      return true
    }
    return false
  }, [lastChecked, showNewLeadNotification])

  const fetchDashboardDataWithNotification = useCallback(async (isPolling = false) => {
    try {
      const [statsResponse, appointmentsResponse] = await Promise.all([
        fetch('/api/dashboard/stats'),
        fetch('/api/dashboard/appointments')
      ])

      // If unauthorized, redirect to login
      if (statsResponse.status === 401 || appointmentsResponse.status === 401) {
        window.location.href = '/dashboard/login'
        return
      }
      
      if (statsResponse.ok) {
        const data = await statsResponse.json()
        setStats(data.stats)
      }
      
      if (appointmentsResponse.ok) {
        const appointmentsData = await appointmentsResponse.json()
        const newAppointments = appointmentsData.appointments || []
        
        // Check for new leads only if this is a polling request and we have existing data
        if (isPolling && appointmentsRef.current.length > 0) {
          checkForNewLeads(newAppointments)
        }
        
        setAppointments(newAppointments)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    }
  }, [checkForNewLeads]) // Remove appointments.length dependency

  const startPolling = useCallback(() => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current)
    }
    
    pollingInterval.current = setInterval(() => {
      fetchDashboardDataWithNotification(true)
    }, getPollingInterval())
  }, []) // Remove dependencies that cause re-creation

  useEffect(() => {
    // Initialize notification permission
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission)
    }

    // Load last checked time from localStorage
    const savedLastChecked = localStorage.getItem('dashboardLastChecked')
    if (savedLastChecked) {
      setLastChecked(new Date(savedLastChecked))
    }

    // Initial data fetch - using the simpler fetchDashboardData
    fetchDashboardData()

    // Start polling for real-time updates
    startPolling()

    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current)
      }
    }
  }, []) // Remove all dependencies to run only once

  const fetchDashboardData = async () => {
    setLoading(true)
    await fetchDashboardDataWithNotification(false)
    setLoading(false)
  }

  const updateAppointmentStatus = async (appointmentId: string, newStatus: 'pending' | 'visited') => {
    setUpdatingStatus(appointmentId)
    try {
      const response = await fetch(`/api/dashboard/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        // Update the local state immediately
        setAppointments(prevAppointments => 
          prevAppointments.map(apt => 
            apt._id === appointmentId 
              ? { ...apt, status: newStatus }
              : apt
          )
        )
      } else {
        console.error('Failed to update appointment status')
        // TODO: Add proper error notification
      }
    } catch (error) {
      console.error('Error updating appointment status:', error)
      // TODO: Add proper error notification
    } finally {
      setUpdatingStatus(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'visited':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredAppointments = appointments.filter(appointment => {
    // Status filter
    const statusMatch = filter === 'all' || appointment.status.toLowerCase() === filter
    
    // Search filter (searches in name, email, phone, service)
    const searchMatch = searchTerm === '' || 
      appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Date filter
    const dateMatch = dateFilter === '' || appointment.date === dateFilter
    
    // Service filter
    const serviceMatch = serviceFilter === '' || appointment.service === serviceFilter
    
    return statusMatch && searchMatch && dateMatch && serviceMatch
  })

  // Get unique services for filter dropdown
  const uniqueServices = Array.from(new Set(appointments.map(apt => apt.service))).sort()
  
  // Get unique dates for filter dropdown (last 30 days)
  const uniqueDates = Array.from(new Set(appointments.map(apt => apt.date))).sort().reverse().slice(0, 30)

  const statCards = [
    {
      name: 'Total Appointments',
      value: stats.totalAppointments,
      icon: CalendarIcon,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      name: 'Today\'s Appointments',
      value: stats.todayAppointments,
      icon: ClockIcon,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      name: 'This Week',
      value: stats.thisWeekAppointments,
      icon: UsersIcon,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      name: 'This Month',
      value: stats.thisMonthAppointments,
      icon: ChartBarIcon,
      color: 'bg-purple-500',
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

  return (
    <div className="space-y-6">
      {/* Header */}
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
            
            {/* Notification Permission Status */}
            {notificationPermission === 'default' && (
              <button
                onClick={requestNotificationPermission}
                className="flex items-center gap-2 px-3 py-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
              >
                <BellIcon className="w-4 h-4" />
                Enable Notifications
              </button>
            )}
            
            {notificationPermission === 'granted' && (
              <div className="flex items-center gap-2 px-3 py-1 text-xs bg-green-50 text-green-700 border border-green-200 rounded-md">
                <BellIcon className="w-4 h-4" />
                Notifications Active
              </div>
            )}
            
            {notificationPermission === 'denied' && (
              <div className="flex items-center gap-2 px-3 py-1 text-xs bg-orange-50 text-orange-700 border border-orange-200 rounded-md">
                <BellIcon className="w-4 h-4" />
                Notifications Disabled
              </div>
            )}

            {/* Test Notification Button (Development Only) */}
            {process.env.NODE_ENV === 'development' && notificationPermission === 'granted' && (
              <button
                onClick={() => {
                  showNewLeadNotification({
                    _id: 'test-id',
                    name: 'Test Patient',
                    service: 'Antenatal Care',
                    date: '2025-01-15',
                    time: '10:30 AM',
                    phone: '+91 9876543210',
                    email: 'test@example.com',
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                    message: 'Test appointment'
                  })
                }}
                className="flex items-center gap-2 px-3 py-1 text-xs bg-purple-50 text-purple-700 border border-purple-200 rounded-md hover:bg-purple-100 transition-colors"
              >
                🧪 Test Notification
              </button>
            )}
          </div>
        </div>
        
        {/* View Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
          <button
            onClick={() => setViewMode('dashboard')}
            className={`flex items-center justify-center px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none ${
              viewMode === 'dashboard'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <ViewColumnsIcon className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Dashboard</span>
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center justify-center px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none ${
              viewMode === 'calendar'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <CalendarDaysIcon className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Calendar</span>
          </button>
          <button
            onClick={() => setViewMode('indexnow')}
            className={`flex items-center justify-center px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none ${
              viewMode === 'indexnow'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <MagnifyingGlassIcon className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">SEO</span>
          </button>
        </div>
      </div>

      {viewMode === 'dashboard' ? (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" data-testid="stats">
            {statCards.map((stat, index) => (
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

          {/* Search and Filters */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or service..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setDateFilter('')
                  setServiceFilter('')
                  setFilter('all')
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 whitespace-nowrap"
              >
                Clear All
              </button>
            </div>

            {/* Column Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center space-x-2">
                <FunnelIcon className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 flex-1">
                {/* Date Filter */}
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 flex-1 sm:flex-none"
                >
                  <option value="">All Dates</option>
                  {uniqueDates.map(date => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </select>

                {/* Service Filter */}
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 flex-1 sm:flex-none"
                >
                  <option value="">All Services</option>
                  {uniqueServices.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Status Filters */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'all'
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All ({appointments.length})
                </button>
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'pending'
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Pending ({appointments.filter(a => a.status.toLowerCase() === 'pending').length})
                </button>
                <button
                  onClick={() => setFilter('visited')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'visited'
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Visited ({appointments.filter(a => a.status.toLowerCase() === 'visited').length})
                </button>
              </div>
              
              {/* Show filtered results count */}
              {(searchTerm || dateFilter || serviceFilter || filter !== 'all') && (
                <div className="flex items-center px-3 py-2 text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg self-start">
                  Showing {filteredAppointments.length} of {appointments.length} appointments
                </div>
              )}
            </div>
          </div>

          {/* All Appointments Table */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12 px-4">
                <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {filter === 'all' 
                    ? 'No appointments have been scheduled yet.'
                    : `No ${filter} appointments found.`
                  }
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Patient Details
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Contact
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Appointment
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Service
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        Status
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden sm:table-cell">
                        Message
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">
                        Booked On
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAppointments.map((appointment) => {
                      const isNewAppointment = new Date(appointment.createdAt) > new Date(Date.now() - 5 * 60 * 1000) // Last 5 minutes
                      return (
                      <tr 
                        key={appointment._id} 
                        className={`hover:bg-gray-50 appointment-item ${
                          isNewAppointment ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                        }`} 
                        data-testid={`appointment-${appointment._id}`}
                      >
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-xs sm:text-sm font-medium text-gray-700">
                                  {appointment.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="ml-3 sm:ml-4 min-w-0">
                              <div className="flex items-center gap-2">
                                <div className="text-sm font-medium text-gray-900 truncate" data-testid={`appointment-name`}>
                                  {appointment.name}
                                </div>
                                {isNewAppointment && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    New
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 truncate max-w-32 sm:max-w-none">{appointment.email}</div>
                          <div className="text-sm text-gray-500">{appointment.phone}</div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{appointment.date}</div>
                          <div className="text-sm text-gray-500">{appointment.time}</div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 max-w-24 sm:max-w-none truncate">
                            {appointment.service}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <select
                            value={appointment.status}
                            onChange={(e) => updateAppointmentStatus(appointment._id, e.target.value as 'pending' | 'visited')}
                            disabled={updatingStatus === appointment._id}
                            className={`px-2 py-1 text-xs font-semibold rounded-full border-0 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                              getStatusColor(appointment.status)
                            } ${updatingStatus === appointment._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="visited">Visited</option>
                          </select>
                          {updatingStatus === appointment._id && (
                            <div className="inline-flex ml-2">
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                            </div>
                          )}
                        </td>
                        <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                          <div className="text-sm text-gray-900 max-w-xs truncate" title={appointment.message || 'No message'}>
                            {appointment.message || 'No message'}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                          {new Date(appointment.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      ) : viewMode === 'calendar' ? (
        <CalendarView appointments={appointments} />
      ) : (
        <IndexNowPanel />
      )}
    </div>
  )
}
