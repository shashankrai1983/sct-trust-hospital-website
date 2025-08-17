'use client'

import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'

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

interface AppointmentFiltersProps {
  appointments: Appointment[]
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  filteredCount: number
}

export default function AppointmentFilters({ 
  appointments, 
  filters, 
  onFiltersChange, 
  filteredCount 
}: AppointmentFiltersProps) {
  
  // Derived data - no state, pure computation
  const uniqueServices = Array.from(new Set(appointments.map(apt => apt.service))).sort()
  const uniqueDates = Array.from(new Set(appointments.map(apt => apt.date))).sort().reverse().slice(0, 30)
  
  const statusCounts = {
    all: appointments.length,
    pending: appointments.filter(a => a.status.toLowerCase() === 'pending').length,
    visited: appointments.filter(a => a.status.toLowerCase() === 'visited').length
  }

  const updateFilter = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      status: 'all',
      searchTerm: '',
      dateFilter: '',
      serviceFilter: ''
    })
  }

  const hasActiveFilters = filters.searchTerm || filters.dateFilter || filters.serviceFilter || filters.status !== 'all'

  return (
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
            value={filters.searchTerm}
            onChange={(e) => updateFilter('searchTerm', e.target.value)}
          />
        </div>
        <button
          onClick={clearAllFilters}
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
            value={filters.dateFilter}
            onChange={(e) => updateFilter('dateFilter', e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 flex-1 sm:flex-none"
          >
            <option value="">All Dates</option>
            {uniqueDates.map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>

          {/* Service Filter */}
          <select
            value={filters.serviceFilter}
            onChange={(e) => updateFilter('serviceFilter', e.target.value)}
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
            onClick={() => updateFilter('status', 'all')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filters.status === 'all'
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({statusCounts.all})
          </button>
          <button
            onClick={() => updateFilter('status', 'pending')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filters.status === 'pending'
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending ({statusCounts.pending})
          </button>
          <button
            onClick={() => updateFilter('status', 'visited')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filters.status === 'visited'
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Visited ({statusCounts.visited})
          </button>
        </div>
        
        {/* Filtered Results Count */}
        {hasActiveFilters && (
          <div className="flex items-center px-3 py-2 text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg self-start">
            Showing {filteredCount} of {appointments.length} appointments
          </div>
        )}
      </div>
    </div>
  )
}