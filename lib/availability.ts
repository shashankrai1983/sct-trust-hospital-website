/**
 * Unified availability service - Linux kernel style
 * Single source of truth, no special cases
 * Good taste: eliminate the if-else branches through better data structure
 */


// Standard slots - single definition
export const TIME_SLOTS = [
  '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', 
  '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM',
  '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', 
  '08:00 PM', '08:30 PM', '09:00 PM'
]

// Simple slot state - no complex interfaces
export interface SlotState {
  time: string
  available: boolean
  reason?: string // Only when unavailable
}


// Availability check function - pure, no side effects (basic checks only)
export function checkDateAvailability(date: string): { available: boolean; reason?: string } {
  // Past date
  const today = new Date()
  const checkDate = new Date(date)
  today.setHours(0, 0, 0, 0)
  checkDate.setHours(0, 0, 0, 0)
  
  if (checkDate < today) {
    return { available: false, reason: 'Past date' }
  }
  
  // Sunday
  if (checkDate.getDay() === 0) {
    return { available: false, reason: 'Hospital closed on Sundays' }
  }
  
  return { available: true }
}



// Client-side availability
export async function getAvailableSlots(date: string): Promise<SlotState[]> {
  const dateCheck = checkDateAvailability(date)
  
  // If date unavailable (past/Sunday), all slots unavailable
  if (!dateCheck.available) {
    return TIME_SLOTS.map(time => ({
      time,
      available: false,
      reason: dateCheck.reason
    }))
  }
  
  // Check server for booked/blocked slots
  try {
    const response = await fetch(`/api/slots/simple?date=${date}`)
    const data = await response.json()
    
    if (!data.success) {
      // Fail safe - show all unavailable
      return TIME_SLOTS.map(time => ({
        time,
        available: false,
        reason: 'Error checking availability'
      }))
    }
    
    const bookedTimes = new Set(data.bookedSlots || [])
    
    return TIME_SLOTS.map(time => ({
      time,
      available: !bookedTimes.has(time)
    }))
    
  } catch {
    // Network error - fail safe
    return TIME_SLOTS.map(time => ({
      time,
      available: false,
      reason: 'Network error'
    }))
  }
}

// Date validation - good taste: simple sync function, no special cases
export function isValidBookingDate(date: Date): boolean {
  const dateString = date.toISOString().split('T')[0]
  const basicCheck = checkDateAvailability(dateString)
  
  // Only past dates and Sundays block booking
  return basicCheck.available
}

// Async disabled function - good taste: single source of truth for date blocking
// Checks basic rules (past dates, Sundays) AND admin blocked dates
export async function isDateDisabledAsync(date: Date): Promise<{ disabled: boolean; reason?: string }> {
  // DON'T mutate the date object - create new instances
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const checkDate = new Date(date)
  checkDate.setHours(0, 0, 0, 0)
  
  // Past date check
  if (checkDate < today) {
    return { disabled: true, reason: 'Past date not available' }
  }
  
  // Sunday check (0 = Sunday)
  if (checkDate.getDay() === 0) {
    return { disabled: true, reason: 'Hospital closed on Sundays' }
  }
  
  // Check admin blocked dates - FIXED: Use timezone-safe date formatting
  const dateStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`
  try {
    const response = await fetch(`/api/slots/simple?date=${dateStr}`)
    const data = await response.json()
    
    if (data.success && data.allBlocked) {
      return { disabled: true, reason: data.blockReason || 'Date blocked by admin' }
    }
  } catch (error) {
    // Network error - fail safe by allowing date (slots will catch blocking later)
    console.warn('Failed to check blocked dates:', error)
  }
  
  return { disabled: false }
}

// Legacy sync function - kept for backward compatibility
// Only blocks basic unavailable dates (past dates, Sundays)
export function isDateDisabled(date: Date): boolean {
  // DON'T mutate the date object - create new instances
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const checkDate = new Date(date)
  checkDate.setHours(0, 0, 0, 0)
  
  // Past date check
  if (checkDate < today) {
    return true
  }
  
  // Sunday check (0 = Sunday)
  if (checkDate.getDay() === 0) {
    return true
  }
  
  return false
}

// Cache for blocked dates to improve performance
const blockedDateCache = new Map<string, { disabled: boolean; reason?: string; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Optimized version with caching
export async function isDateDisabledCached(date: Date): Promise<{ disabled: boolean; reason?: string }> {
  // FIXED: Use timezone-safe date formatting
  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  const now = Date.now()
  
  // Check cache first
  const cached = blockedDateCache.get(dateStr)
  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return { disabled: cached.disabled, reason: cached.reason }
  }
  
  // Get fresh data
  const result = await isDateDisabledAsync(date)
  
  // Cache the result
  blockedDateCache.set(dateStr, {
    ...result,
    timestamp: now
  })
  
  return result
}