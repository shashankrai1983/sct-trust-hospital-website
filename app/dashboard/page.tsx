'use client'

import { useEffect, useState } from 'react'
import { 
  CalendarIcon, 
  UsersIcon, 
  ClockIcon,
  ChartBarIcon,
  ViewColumnsIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'
import CalendarView from './components/calendar-view'

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
  const [viewMode, setViewMode] = useState<'dashboard' | 'calendar'>('dashboard')
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [serviceFilter, setServiceFilter] = useState('')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
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
        setAppointments(appointmentsData.appointments || [])
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
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
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm sm:text-base text-gray-600">Welcome to SCT Trust Hospital Admin Dashboard</p>
        </div>
        
        {/* View Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
          <button
            onClick={() => setViewMode('dashboard')}
            className={`flex items-center justify-center px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none ${
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
            className={`flex items-center justify-center px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-none ${
              viewMode === 'calendar'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <CalendarDaysIcon className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="hidden xs:inline">Calendar</span>
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
                  onClick={() => setFilter('confirmed')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === 'confirmed'
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Confirmed ({appointments.filter(a => a.status.toLowerCase() === 'confirmed').length})
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
                    {filteredAppointments.map((appointment) => (
                      <tr key={appointment._id} className="hover:bg-gray-50 appointment-item" data-testid={`appointment-${appointment._id}`}>
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
                              <div className="text-sm font-medium text-gray-900 truncate" data-testid={`appointment-name`}>
                                {appointment.name}
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
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
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
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      ) : (
        <CalendarView appointments={appointments} />
      )}
    </div>
  )
}
