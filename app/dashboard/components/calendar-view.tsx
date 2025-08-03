'use client'

import { useState, useEffect } from 'react'
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'

interface CalendarEvent {
  _id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  service: string
  message?: string
  createdAt: string
}

interface CalendarViewProps {
  appointments: CalendarEvent[]
}

export default function CalendarView({ appointments }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [calendarEvents, setCalendarEvents] = useState<{ [key: string]: CalendarEvent[] }>({})

  useEffect(() => {
    // Group appointments by date
    const eventsByDate: { [key: string]: CalendarEvent[] } = {}
    
    appointments.forEach(appointment => {
      // Parse the date string to get the correct date
      const appointmentDate = new Date(appointment.date)
      const dateKey = appointmentDate.toISOString().split('T')[0]
      
      if (!eventsByDate[dateKey]) {
        eventsByDate[dateKey] = []
      }
      eventsByDate[dateKey].push(appointment)
    })
    
    setCalendarEvents(eventsByDate)
  }, [appointments])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDayOfMonth = getFirstDayOfMonth(currentDate)
    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="min-h-[120px] bg-gray-50"></div>
      )
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const dayEvents = calendarEvents[dateKey] || []
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()

      days.push(
        <div
          key={day}
          className={`min-h-[120px] p-2 border border-gray-200 bg-white hover:bg-gray-50 transition-colors ${
            isToday ? 'bg-blue-50 border-blue-200' : ''
          }`}
        >
          <div className={`font-medium text-sm mb-2 ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
            {day}
          </div>
          
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map((event, index) => (
              <div
                key={event._id}
                className="text-xs p-1 rounded bg-blue-100 text-blue-800 truncate cursor-pointer hover:bg-blue-200 transition-colors"
                title={`${event.name} - ${event.service} at ${event.time}`}
              >
                <div className="font-medium">{event.time}</div>
                <div className="truncate">{event.name}</div>
              </div>
            ))}
            
            {dayEvents.length > 3 && (
              <div className="text-xs text-gray-500 font-medium">
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      )
    }

    return days
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2" />
          Appointments Calendar
        </h2>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          
          <h3 className="text-lg font-medium text-gray-900 min-w-[140px] text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-0 mb-2">
          {dayNames.map(day => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 bg-gray-50 border border-gray-200">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-0 border-l border-t border-gray-200">
          {renderCalendarDays()}
        </div>
      </div>
    </div>
  )
}