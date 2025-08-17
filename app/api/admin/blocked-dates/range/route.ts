/**
 * Blocked dates range API - Linux kernel style
 * Single source of truth for date ranges
 * Good taste: eliminate multiple API calls with one efficient query
 */

import { NextRequest, NextResponse } from 'next/server';
import { getBlockedDatesCollection } from '@/lib/mongodb';
import { z } from 'zod';

// Validation schema for range query
const rangeQuerySchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid start date format. Use YYYY-MM-DD'),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid end date format. Use YYYY-MM-DD'),
});

// Get blocked dates in specified range
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Validate parameters
    const validation = rangeQuerySchema.safeParse({ startDate, endDate });
    if (!validation.success) {
      return NextResponse.json({
        success: false,
        message: 'Invalid date range parameters',
        errors: validation.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      }, { status: 400 });
    }

    const { startDate: validatedStartDate, endDate: validatedEndDate } = validation.data;

    // Validate date range logic
    if (validatedStartDate > validatedEndDate) {
      return NextResponse.json({
        success: false,
        message: 'Start date must be before or equal to end date',
      }, { status: 400 });
    }

    const blockedDatesCollection = await getBlockedDatesCollection();
    
    // Single efficient query for date range
    const blockedDates = await blockedDatesCollection
      .find({
        date: { 
          $gte: validatedStartDate, 
          $lte: validatedEndDate 
        },
        isActive: true
      })
      .project({
        date: 1,
        reason: 1,
        timeSlots: 1,
        _id: 0 // Exclude _id for cleaner response
      })
      .sort({ date: 1 })
      .toArray();

    // Transform to Map-friendly format for frontend with enhanced partial block support
    const blockedDatesMap: Record<string, { reason: string; timeSlots?: string[]; isFullDayBlocked: boolean }> = {};
    
    blockedDates.forEach(blocked => {
      // Determine if it's a full day block
      const isFullDayBlocked = !blocked.timeSlots || blocked.timeSlots.length === 0;
      
      blockedDatesMap[blocked.date] = {
        reason: blocked.reason,
        timeSlots: blocked.timeSlots || [],
        isFullDayBlocked
      };
    });

    return NextResponse.json({
      success: true,
      data: blockedDatesMap,
      count: blockedDates.length,
      range: {
        startDate: validatedStartDate,
        endDate: validatedEndDate
      }
    });

  } catch (error) {
    console.error('Error fetching blocked dates range:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}