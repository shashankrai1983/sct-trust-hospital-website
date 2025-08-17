/**
 * Simple slots API - Linux kernel style
 * Single responsibility: return booked slots
 * No complex logic, no special cases
 */

import { NextRequest, NextResponse } from 'next/server'
import { getBookedSlotsCollection, getBlockedDatesCollection } from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json({
        success: false,
        message: 'Date required'
      }, { status: 400 })
    }

    // Get booked slots
    const bookedCollection = await getBookedSlotsCollection()
    const bookedSlots = await bookedCollection
      .find({ date, status: 'active' })
      .project({ time: 1 })
      .toArray()

    // Get blocked slots
    const blockedCollection = await getBlockedDatesCollection()
    const blockedDates = await blockedCollection
      .find({ date, isActive: true })
      .toArray()

    // Combine blocked times
    const blockedTimes = new Set<string>()
    
    for (const blocked of blockedDates) {
      if (!blocked.timeSlots || blocked.timeSlots.length === 0) {
        // Entire day blocked - return all times as blocked
        return NextResponse.json({
          success: true,
          bookedSlots: [], // All blocked, so none just "booked"
          allBlocked: true,
          blockReason: blocked.reason
        })
      }
      
      // Add specific blocked times
      blocked.timeSlots.forEach((time: string) => blockedTimes.add(time))
    }

    // Combine all unavailable times
    const unavailableTimes = [
      ...bookedSlots.map(slot => slot.time),
      ...Array.from(blockedTimes)
    ]

    return NextResponse.json({
      success: true,
      bookedSlots: unavailableTimes
    })

  } catch (error) {
    console.error('Slots API error:', error)
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 })
  }
}