'use client'

import { useState, useEffect } from 'react'
import { 
  CalendarIcon, 
  PlusIcon,
  TrashIcon,
  PencilIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline'
import { useToast } from '@/hooks/use-toast'

interface BlockedDate {
  _id: string
  date: string
  timeSlots?: string[]
  reason: string
  blockedBy: string
  blockedByName: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const TIME_SLOTS = [
  '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', 
  '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM',
  '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', 
  '08:00 PM', '08:30 PM', '09:00 PM'
];

export default function BlockedDatesPage() {
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingDate, setEditingDate] = useState<BlockedDate | null>(null)
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    date: '',
    timeSlots: [] as string[],
    reason: '',
    blockFullDay: false,
  })

  useEffect(() => {
    fetchBlockedDates()
  }, [])

  const fetchBlockedDates = async () => {
    try {
      const response = await fetch('/api/admin/blocked-dates')
      const result = await response.json()

      if (result.success) {
        setBlockedDates(result.data)
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch blocked dates",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.date || !formData.reason.trim()) {
      toast({
        title: "Validation Error",
        description: "Date and reason are required",
        variant: "destructive",
      })
      return
    }

    if (formData.reason.split(' ').length > 10) {
      toast({
        title: "Validation Error",
        description: "Reason must be 10 words or less",
        variant: "destructive",
      })
      return
    }

    try {
      const payload = {
        date: formData.date,
        reason: formData.reason.trim(),
        timeSlots: formData.blockFullDay ? [] : formData.timeSlots,
      }

      const response = await fetch('/api/admin/blocked-dates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "Date blocked successfully",
        })
        await fetchBlockedDates()
        resetForm()
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to block date",
        variant: "destructive",
      })
    }
  }

  const handleToggleStatus = async (id: string, newStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/blocked-dates?id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: newStatus }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: `Date ${newStatus ? 'enabled' : 'disabled'} successfully`,
        })
        await fetchBlockedDates()
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update blocked date status",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blocked date?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/blocked-dates?id=${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Success",
          description: "Blocked date deleted successfully",
        })
        await fetchBlockedDates()
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete blocked date",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      date: '',
      timeSlots: [],
      reason: '',
      blockFullDay: false,
    })
    setShowCreateForm(false)
    setEditingDate(null)
  }

  const handleTimeSlotToggle = (slot: string) => {
    if (formData.blockFullDay) return

    setFormData(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.includes(slot)
        ? prev.timeSlots.filter(s => s !== slot)
        : [...prev.timeSlots, slot]
    }))
  }

  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blocked Dates Management</h1>
          <p className="text-gray-600">Manage dates and time slots that are not available for appointments</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Block Date/Time
        </button>
      </div>

      {/* Create/Edit Form */}
      {(showCreateForm || editingDate) && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              {editingDate ? 'Edit Blocked Date' : 'Block New Date/Time'}
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  min={getMinDate()}
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason (max 10 words)
                </label>
                <input
                  type="text"
                  value={formData.reason}
                  onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder="e.g., Doctor unavailable"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.reason.split(' ').filter(w => w.length > 0).length}/10 words
                </p>
              </div>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.blockFullDay}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    blockFullDay: e.target.checked,
                    timeSlots: e.target.checked ? [] : prev.timeSlots
                  }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Block entire day</span>
              </label>
            </div>

            {!formData.blockFullDay && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Time Slots to Block
                </label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => handleTimeSlotToggle(slot)}
                      className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                        formData.timeSlots.includes(slot)
                          ? 'bg-red-100 border-red-300 text-red-700'
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                {formData.timeSlots.length === 0 && (
                  <p className="text-sm text-orange-600 mt-2">
                    No time slots selected. This will block the entire day.
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <CheckIcon className="w-4 h-4 mr-2 inline" />
                {editingDate ? 'Update' : 'Block Date'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blocked Dates List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Blocked Dates ({blockedDates.length})</h3>
        </div>

        {blockedDates.length === 0 ? (
          <div className="text-center py-12">
            <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No blocked dates</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by blocking your first date.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time Slots
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Blocked By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blockedDates.map((blockedDate) => (
                  <tr key={blockedDate._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {new Date(blockedDate.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {!blockedDate.timeSlots || blockedDate.timeSlots.length === 0 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Full Day
                        </span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {blockedDate.timeSlots.map((slot, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800"
                            >
                              {slot}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {blockedDate.reason}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {blockedDate.blockedByName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        blockedDate.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {blockedDate.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleToggleStatus(blockedDate._id, !blockedDate.isActive)}
                          className={`${
                            blockedDate.isActive 
                              ? 'text-yellow-600 hover:text-yellow-900' 
                              : 'text-green-600 hover:text-green-900'
                          }`}
                          title={blockedDate.isActive ? 'Disable blocking' : 'Enable blocking'}
                        >
                          {blockedDate.isActive ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h1m4 0h1m-6 8h1m4 0h1" />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setEditingDate(blockedDate)
                            setFormData({
                              date: blockedDate.date,
                              timeSlots: blockedDate.timeSlots || [],
                              reason: blockedDate.reason,
                              blockFullDay: !blockedDate.timeSlots || blockedDate.timeSlots.length === 0,
                            })
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit blocked date"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(blockedDate._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete blocked date"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}