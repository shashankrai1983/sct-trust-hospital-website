import { useState, useCallback, useEffect, useRef } from 'react'

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

interface NotificationState {
  permission: NotificationPermission
  lastChecked: Date
  hasNewLeads: boolean
}

export const useNotificationSystem = (appointments: Appointment[]) => {
  const [state, setState] = useState<NotificationState>({
    permission: 'default',
    lastChecked: new Date(),
    hasNewLeads: false
  })
  
  const appointmentsRef = useRef<Appointment[]>([])
  const pollingInterval = useRef<NodeJS.Timeout | null>(null)

  // Update ref when appointments change
  useEffect(() => {
    appointmentsRef.current = appointments
  }, [appointments])

  // Initialize notification permission and last checked time
  useEffect(() => {
    if ("Notification" in window) {
      setState(prev => ({ ...prev, permission: Notification.permission }))
    }

    const savedLastChecked = localStorage.getItem('dashboardLastChecked')
    if (savedLastChecked) {
      setState(prev => ({ ...prev, lastChecked: new Date(savedLastChecked) }))
    }
  }, [])

  const requestPermission = useCallback(async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      setState(prev => ({ ...prev, permission }))
      return permission === "granted"
    }
    return false
  }, [])

  const showNotification = useCallback((appointment: Appointment) => {
    if (state.permission !== "granted") return

    try {
      // Play notification sound
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvGEUCjyE0OvZgCkDAx4Gk9Tnv1kEEX+84OaLKgwPbKvz655IBhJam9vx0mclBgx4xfXGDjsdBCCR1vPUdScDJXTE8NKGOAQS')
      audio.volume = 0.5
      audio.play().catch(() => console.log('Audio notification failed'))

      const notification = new Notification("🏥 New Patient Lead!", {
        body: `${appointment.name} - ${appointment.service}\nDate: ${appointment.date} at ${appointment.time}\nPhone: ${appointment.phone}`,
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        tag: `lead-${appointment._id}`,
        requireInteraction: true,
        silent: false
      })

      setTimeout(() => notification.close(), 10000)

      notification.onclick = () => {
        window.focus()
        setTimeout(() => {
          const element = document.querySelector(`[data-testid="appointment-${appointment._id}"]`)
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 100)
        notification.close()
      }

      // Update tab title
      document.title = "🔴 New Lead - SCT Hospital Dashboard"
      setTimeout(() => {
        document.title = "SCT Hospital Dashboard"
      }, 10000)

    } catch (error) {
      console.warn('Failed to show notification:', error)
    }
  }, [state.permission])

  const checkForNewLeads = useCallback((appointments: Appointment[]) => {
    const newLeads = appointments.filter(apt => 
      new Date(apt.createdAt) > state.lastChecked
    )
    
    if (newLeads.length > 0) {
      const now = new Date()
      setState(prev => ({ ...prev, lastChecked: now, hasNewLeads: true }))
      localStorage.setItem('dashboardLastChecked', now.toISOString())
      
      // Show notification for most recent lead
      const mostRecent = newLeads.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0]
      
      showNotification(mostRecent)
      
      // Clear indicator after 5 seconds
      setTimeout(() => {
        setState(prev => ({ ...prev, hasNewLeads: false }))
      }, 5000)
      
      return true
    }
    return false
  }, [state.lastChecked, showNotification])

  const getPollingInterval = useCallback(() => {
    const hour = new Date().getHours()
    const isBusinessHours = hour >= 8 && hour <= 18
    return isBusinessHours ? 30000 : 60000
  }, [])

  const startPolling = useCallback((fetchFunction: (isPolling: boolean) => Promise<void>) => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current)
    }
    
    pollingInterval.current = setInterval(() => {
      fetchFunction(true)
    }, getPollingInterval())
  }, [getPollingInterval])

  const stopPolling = useCallback(() => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current)
      pollingInterval.current = null
    }
  }, [])

  // Test notification for development
  const testNotification = useCallback(() => {
    if (process.env.NODE_ENV === 'development' && state.permission === 'granted') {
      showNotification({
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
    }
  }, [state.permission, showNotification])

  return {
    permission: state.permission,
    hasNewLeads: state.hasNewLeads,
    requestPermission,
    checkForNewLeads,
    startPolling,
    stopPolling,
    testNotification
  }
}