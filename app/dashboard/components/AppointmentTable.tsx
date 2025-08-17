'use client'

import { CalendarIcon } from '@heroicons/react/24/outline'

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

interface AppointmentTableProps {
  appointments: Appointment[]
  onStatusUpdate: (appointmentId: string, newStatus: 'pending' | 'visited') => Promise<void>
  updatingStatus: string | null
}

export default function AppointmentTable({ 
  appointments, 
  onStatusUpdate, 
  updatingStatus 
}: AppointmentTableProps) {
  
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

  const isNewAppointment = (createdAt: string) => {
    return new Date(createdAt) > new Date(Date.now() - 5 * 60 * 1000) // Last 5 minutes
  }

  if (appointments.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="text-center py-12 px-4">
          <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
          <p className="mt-1 text-sm text-gray-500">No appointments have been scheduled yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
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
            {appointments.map((appointment) => {
              const isNew = isNewAppointment(appointment.createdAt)
              return (
                <tr 
                  key={appointment._id} 
                  className={`hover:bg-gray-50 appointment-item ${
                    isNew ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
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
                          {isNew && (
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
                      onChange={(e) => onStatusUpdate(appointment._id, e.target.value as 'pending' | 'visited')}
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
    </div>
  )
}