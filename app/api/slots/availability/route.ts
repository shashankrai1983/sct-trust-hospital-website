import { NextRequest, NextResponse } from 'next/server';
import { getBookedSlotsCollection, getBlockedDatesCollection } from '@/lib/mongodb';
// Simple availability check - no complex types needed
interface SlotCheck {
  date: string;
  time: string;
  isAvailable: boolean;
  isBlocked?: boolean;
  blockReason?: string;
  bookedBy?: string;
}

// Standard time slots (matching appointment form)
const TIME_SLOTS = [
  '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', 
  '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM',
  '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', 
  '08:00 PM', '08:30 PM', '09:00 PM'
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const time = searchParams.get('time');

    if (!date) {
      return NextResponse.json({
        success: false,
        message: 'Date parameter is required',
      }, { status: 400 });
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid date format. Use YYYY-MM-DD',
      }, { status: 400 });
    }

    // Check if date is in the past
    const today = new Date();
    const checkDate = new Date(date);
    today.setHours(0, 0, 0, 0);
    checkDate.setHours(0, 0, 0, 0);
    
    if (checkDate < today) {
      return NextResponse.json({
        success: false,
        message: 'Cannot check availability for past dates',
      }, { status: 400 });
    }

    // If specific time is requested, check that slot only
    if (time) {
      const availability = await checkSlotAvailability(date, time);
      return NextResponse.json({
        success: true,
        data: availability,
      });
    }

    // Check all slots for the date
    const allSlots = await Promise.all(
      TIME_SLOTS.map(timeSlot => checkSlotAvailability(date, timeSlot))
    );

    const availableSlots = allSlots.filter(slot => slot.isAvailable);
    const unavailableSlots = allSlots.filter(slot => !slot.isAvailable);

    return NextResponse.json({
      success: true,
      data: {
        date,
        totalSlots: TIME_SLOTS.length,
        availableCount: availableSlots.length,
        unavailableCount: unavailableSlots.length,
        slots: allSlots,
      },
    });

  } catch (error) {
    console.error('Error checking slot availability:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}

async function checkSlotAvailability(date: string, time: string): Promise<SlotCheck> {
  const slot: SlotCheck = {
    date,
    time,
    isAvailable: true,
    isBlocked: false,
  };

  try {
    // 1. Check if date/time is admin blocked
    const blockedDatesCollection = await getBlockedDatesCollection();
    const blockedDate = await blockedDatesCollection.findOne({
      date,
      isActive: true,
      $or: [
        { timeSlots: { $exists: false } }, // Entire day blocked
        { timeSlots: { $size: 0 } }, // Entire day blocked (empty array)
        { timeSlots: time }, // Specific time slot blocked
      ],
    });

    if (blockedDate) {
      slot.isAvailable = false;
      slot.isBlocked = true;
      slot.blockReason = blockedDate.reason;
      return slot;
    }

    // 3. Check if slot is already booked
    const bookedSlotsCollection = await getBookedSlotsCollection();
    const existingBooking = await bookedSlotsCollection.findOne({
      date,
      time,
      status: 'active',
    });

    if (existingBooking) {
      slot.isAvailable = false;
      slot.bookedBy = existingBooking.patientName;
      return slot;
    }

    // 4. Check if it's Sunday (hospitals typically closed on Sundays)
    const dateObj = new Date(date);
    if (dateObj.getDay() === 0) {
      slot.isAvailable = false;
      slot.blockReason = 'Hospital closed on Sundays';
      return slot;
    }

    // Slot is available
    return slot;

  } catch (error) {
    console.error('Error checking individual slot:', error);
    slot.isAvailable = false;
    slot.blockReason = 'Error checking availability';
    return slot;
  }
}

// Book a slot temporarily (5-minute hold)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, time, patientName, patientEmail, appointmentId } = body;

    if (!date || !time || !patientName || !patientEmail) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields: date, time, patientName, patientEmail',
      }, { status: 400 });
    }

    // Check availability first
    const availability = await checkSlotAvailability(date, time);
    if (!availability.isAvailable) {
      return NextResponse.json({
        success: false,
        message: `Slot not available: ${availability.blockReason || 'Already booked'}`,
        availability,
      }, { status: 409 });
    }

    // Create temporary booking (5-minute hold)
    const bookedSlotsCollection = await getBookedSlotsCollection();
    const tempBooking = {
      date,
      time,
      appointmentId,
      patientName,
      patientEmail,
      service: 'Temporary Hold',
      status: 'active' as const,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await bookedSlotsCollection.insertOne(tempBooking);

    return NextResponse.json({
      success: true,
      message: 'Slot temporarily reserved for 5 minutes',
      data: {
        bookingId: result.insertedId,
        expiresAt: tempBooking.expiresAt,
        ...tempBooking,
      },
    });

  } catch (error) {
    console.error('Error booking slot:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}

// Release expired temporary bookings
export async function DELETE(request: NextRequest) {
  try {
    const bookedSlotsCollection = await getBookedSlotsCollection();
    
    // Remove expired temporary bookings
    const result = await bookedSlotsCollection.deleteMany({
      expiresAt: { $lt: new Date() },
      service: 'Temporary Hold',
    });

    return NextResponse.json({
      success: true,
      message: `Cleaned up ${result.deletedCount} expired temporary bookings`,
      deletedCount: result.deletedCount,
    });

  } catch (error) {
    console.error('Error cleaning up expired bookings:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}