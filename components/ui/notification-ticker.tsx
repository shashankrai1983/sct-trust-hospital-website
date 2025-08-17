'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface TickerNotification {
  id: string
  message: string
  type: 'blocked_date' | 'emergency'
  startDate: Date
  endDate: Date
  isActive: boolean
  priority: number
}

interface NotificationTickerProps {
  className?: string
}

export function NotificationTicker({ className = '' }: NotificationTickerProps) {
  const [notifications, setNotifications] = useState<TickerNotification[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    fetchActiveNotifications()
    
    // Refresh notifications every 30 minutes
    const interval = setInterval(fetchActiveNotifications, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (notifications.length === 0) {
      setIsVisible(false)
      return
    }

    setIsVisible(true)

    // Auto-advance ticker every 8 seconds
    if (notifications.length > 1 && !isPaused) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % notifications.length)
      }, 8000)
      return () => clearInterval(timer)
    }
  }, [notifications, isPaused])

  const fetchActiveNotifications = async () => {
    try {
      const response = await fetch('/api/ticker/notifications')
      const result = await response.json()

      if (result.success) {
        const activeNotifications = result.data
          .filter((notification: any) => {
            const now = new Date()
            const startDate = new Date(notification.startDate)
            const endDate = new Date(notification.endDate)
            return notification.isActive && now >= startDate && now <= endDate
          })
          .sort((a: any, b: any) => b.priority - a.priority) // Sort by priority (highest first)

        setNotifications(activeNotifications)
        
        // Reset index if notifications changed
        if (activeNotifications.length !== notifications.length || 
            activeNotifications.length > 0 && currentIndex >= activeNotifications.length) {
          setCurrentIndex(0)
        }
      }
    } catch (error) {
      console.error('Error fetching ticker notifications:', error)
    }
  }

  const dismissNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId))
  }

  if (!isVisible || notifications.length === 0) {
    return null
  }

  const currentNotification = notifications[currentIndex]

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 ${className}`}>
      <div 
        className="relative overflow-hidden"
        style={{ backgroundColor: '#327d2a' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="animate-pulse bg-gradient-to-r from-transparent via-white to-transparent h-full"></div>
        </div>

        <div className="relative px-4 py-3 md:px-6">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Notification content */}
            <div className="flex-1 flex items-center min-w-0">
              {/* Icon based on notification type */}
              <div className="flex-shrink-0 mr-3">
                {currentNotification.type === 'blocked_date' && (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                )}
                {currentNotification.type === 'emergency' && (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </div>

              {/* Scrolling text container */}
              <div className="flex-1 overflow-hidden">
                <div className="whitespace-nowrap">
                  <span 
                    className="inline-block text-white font-medium text-sm md:text-base animate-marquee"
                    style={{
                      animation: currentNotification.message.length > 80 
                        ? 'marquee 15s linear infinite' 
                        : 'none'
                    }}
                  >
                    {currentNotification.message}
                  </span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2 ml-4">
              {/* Navigation dots for multiple notifications */}
              {notifications.length > 1 && (
                <div className="flex space-x-1">
                  {notifications.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex 
                          ? 'bg-white' 
                          : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                      }`}
                      aria-label={`Show notification ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Pause/Play button */}
              {notifications.length > 1 && (
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="text-white hover:text-gray-200 transition-colors"
                  aria-label={isPaused ? 'Resume notifications' : 'Pause notifications'}
                >
                  {isPaused ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              )}

              {/* Close button */}
              <button
                onClick={() => dismissNotification(currentNotification.id)}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom border with subtle animation */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white bg-opacity-30">
          <div 
            className="h-full bg-white transition-all duration-300"
            style={{ 
              width: notifications.length > 1 && !isPaused 
                ? '100%' 
                : '0%',
              animation: notifications.length > 1 && !isPaused 
                ? 'progress 8s linear infinite' 
                : 'none'
            }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .animate-marquee {
          animation-play-state: ${isPaused ? 'paused' : 'running'};
        }
      `}</style>
    </div>
  )
}