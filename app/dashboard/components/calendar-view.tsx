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
        <div key={`empty-${i}`} className="min-h-[80px] sm:min-h-[120px] bg-gray-50"></div>
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
          className={`min-h-[80px] sm:min-h-[120px] p-1 sm:p-2 border border-gray-200 bg-white hover:bg-gray-50 transition-colors ${
            isToday ? 'bg-blue-50 border-blue-200' : ''
          }`}
        >
          <div className={`font-medium text-xs sm:text-sm mb-1 sm:mb-2 ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
            {day}
          </div>
          
          <div className="space-y-1">
            {/* Show first 1-3 events based on screen size */}
            {dayEvents.slice(0, 3).map((event, index) => (
              <div
                key={event._id}
                className={`text-xs p-1 rounded bg-blue-100 text-blue-800 truncate cursor-pointer hover:bg-blue-200 transition-colors ${
                  index >= 1 ? 'hidden sm:block' : ''
                }`}
                title={`${event.name} - ${event.service} at ${event.time}`}
              >
                <div className="font-medium hidden sm:block">{event.time}</div>
                <div className="truncate text-xs">
                  <span className="sm:hidden">{event.time} - </span>
                  {event.name}
                </div>
              </div>
            ))}
            
            {dayEvents.length > 1 && (
              <div className="text-xs text-gray-500 font-medium">
                <span className="sm:hidden">+{dayEvents.length - 1} more</span>
                <span className="hidden sm:inline">
                  {dayEvents.length > 3 ? `+${dayEvents.length - 3} more` : ''}
                </span>
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 border-b border-gray-200 gap-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2" />
          <span className="hidden sm:inline">Appointments Calendar</span>
          <span className="sm:hidden">Calendar</span>
        </h2>
        
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          
          <h3 className="text-base sm:text-lg font-medium text-gray-900 min-w-[120px] sm:min-w-[140px] text-center">
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
      <div className="p-2 sm:p-6">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-0 mb-2">
          {dayNames.map(day => (
            <div key={day} className="p-2 sm:p-3 text-center text-xs sm:text-sm font-medium text-gray-500 bg-gray-50 border border-gray-200">
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.slice(0, 1)}</span>
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