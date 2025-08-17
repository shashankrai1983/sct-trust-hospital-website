import { useState, useEffect, useCallback } from 'react'

interface DashboardStats {
  totalAppointments: number
  todayAppointments: number
  thisWeekAppointments: number
  thisMonthAppointments: number
}

interface Appointment {
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

interface FilterState {
  status: string
  searchTerm: string
  dateFilter: string
  serviceFilter: string
}

interface DashboardData {
  stats: DashboardStats
  appointments: Appointment[]
  loading: boolean
  error: string | null
}

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData>({
    stats: {
      totalAppointments: 0,
      todayAppointments: 0,
      thisWeekAppointments: 0,
      thisMonthAppointments: 0
    },
    appointments: [],
    loading: true,
    error: null
  })

  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    searchTerm: '',
    dateFilter: '',
    serviceFilter: ''
  })

  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)

  // Filter appointments based on current filters
  const filteredAppointments = data.appointments.filter(appointment => {
    // Status filter
    const statusMatch = filters.status === 'all' || appointment.status.toLowerCase() === filters.status
    
    // Search filter
    const searchMatch = filters.searchTerm === '' || 
      appointment.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      appointment.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      appointment.phone.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      appointment.service.toLowerCase().includes(filters.searchTerm.toLowerCase())
    
    // Date filter
    const dateMatch = filters.dateFilter === '' || appointment.date === filters.dateFilter
    
    // Service filter
    const serviceMatch = filters.serviceFilter === '' || appointment.service === filters.serviceFilter
    
    return statusMatch && searchMatch && dateMatch && serviceMatch
  })

  const fetchDashboardData = useCallback(async (isPolling = false) => {
    // Don't show loading spinner for polling requests
    if (!isPolling) {
      setData(prev => ({ ...prev, loading: true, error: null }))
    }

    try {
      const [statsResponse, appointmentsResponse] = await Promise.all([
        fetch('/api/dashboard/stats'),
        fetch('/api/dashboard/appointments')
      ])

      // Handle authentication redirects
      if (statsResponse.status === 401 || appointmentsResponse.status === 401) {
        window.location.href = '/dashboard/login'
        return { appointments: data.appointments, isNewData: false }
      }
      
      let newStats = data.stats
      let newAppointments = data.appointments
      
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        newStats = statsData.stats
      }
      
      if (appointmentsResponse.ok) {
        const appointmentsData = await appointmentsResponse.json()
        newAppointments = appointmentsData.appointments || []
      }

      setData(prev => ({
        ...prev,
        stats: newStats,
        appointments: newAppointments,
        loading: false,
        error: null
      }))

      return { 
        appointments: newAppointments, 
        isNewData: JSON.stringify(newAppointments) !== JSON.stringify(data.appointments)
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setData(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Failed to fetch dashboard data' 
      }))
      return { appointments: data.appointments, isNewData: false }
    }
  }, [data.appointments, data.stats])

  const updateAppointmentStatus = useCallback(async (appointmentId: string, newStatus: 'pending' | 'visited') => {
    setUpdatingStatus(appointmentId)
    
    try {
      const response = await fetch(`/api/dashboard/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        // Update local state immediately
        setData(prev => ({
          ...prev,
          appointments: prev.appointments.map(apt => 
            apt._id === appointmentId 
              ? { ...apt, status: newStatus }
              : apt
          )
        }))
      } else {
        console.error('Failed to update appointment status')
      }
    } catch (error) {
      console.error('Error updating appointment status:', error)
    } finally {
      setUpdatingStatus(null)
    }
  }, [])

  // Initial data fetch
  useEffect(() => {
    fetchDashboardData()
  }, []) // Empty dependency array - only run once

  return {
    stats: data.stats,
    appointments: data.appointments,
    filteredAppointments,
    loading: data.loading,
    error: data.error,
    filters,
    updatingStatus,
    setFilters,
    fetchDashboardData,
    updateAppointmentStatus
  }
}