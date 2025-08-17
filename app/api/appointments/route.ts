import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAppointmentsCollection, getBookedSlotsCollection, getBlockedDatesCollection } from '@/lib/mongodb';
import { checkDateAvailability } from '@/lib/availability';

// Zod schema for appointment validation
const appointmentSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().min(10, {
    message: 'Please enter a valid phone number.',
  }),
  service: z.string().min(1, {
    message: 'Please select a service.',
  }),
  date: z.string().min(1, {
    message: "Please select a date.",
  }),
  time: z.string().min(1, {
    message: "Please select a time slot.",
  }),
  message: z.string().optional(),
  captchaToken: z.string().optional(), // Optional for localhost development
});

// Function to verify reCAPTCHA V3 token
async function verifyRecaptcha(token: string, expectedAction: string = 'appointment_booking'): Promise<{ success: boolean; score?: number; action?: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not configured');
    return { success: false };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    
    // For reCAPTCHA V3, check success, score, and action
    if (data.success && data.score !== undefined) {
      // V3 score threshold - typically 0.5 is good, but you can adjust
      const scoreThreshold = 0.5;
      const isScoreValid = data.score >= scoreThreshold;
      const isActionValid = data.action === expectedAction;
      
      console.log(`reCAPTCHA V3 verification: score=${data.score}, action=${data.action}, expected=${expectedAction}`);
      
      return {
        success: isScoreValid && isActionValid,
        score: data.score,
        action: data.action
      };
    }
    
    return { success: false };
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return { success: false };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the data using Zod schema
    const validatedData = appointmentSchema.parse(body);
    
    // Skip reCAPTCHA verification in localhost development
    const isLocalhost = process.env.NODE_ENV === 'development' || 
                       request.headers.get('host')?.includes('localhost');
    
    if (!isLocalhost) {
      // Verify reCAPTCHA V3 token for staging/production only
      if (!validatedData.captchaToken) {
        return NextResponse.json({
          success: false,
          message: 'CAPTCHA verification is required.',
        }, { status: 400 });
      }
      
      const captchaResult = await verifyRecaptcha(validatedData.captchaToken);
      
      if (!captchaResult.success) {
        const errorMessage = captchaResult.score !== undefined 
          ? `reCAPTCHA verification failed. Score: ${captchaResult.score}. Please try again.`
          : 'Invalid CAPTCHA verification. Please try again.';
        
        return NextResponse.json({
          success: false,
          message: errorMessage,
        }, { status: 400 });
      }
    }
    
    // Remove captchaToken from the data to be stored
    const { captchaToken, ...appointmentData } = validatedData;
    
    // Check slot availability before booking
    const dateAvailable = checkDateAvailability(appointmentData.date);
    if (!dateAvailable.available) {
      return NextResponse.json({
        success: false,
        message: 'Selected date is not available for booking.',
        reason: dateAvailable.reason,
      }, { status: 409 });
    }

    // Check if specific time slot is available
    const bookedSlotsCollection = await getBookedSlotsCollection();
    const existingBooking = await bookedSlotsCollection.findOne({
      date: appointmentData.date,
      time: appointmentData.time,
      status: 'active',
    });

    if (existingBooking) {
      return NextResponse.json({
        success: false,
        message: 'Selected time slot is no longer available. Please choose another slot.',
        reason: 'Slot already booked',
      }, { status: 409 });
    }

    // Check if time slot is admin blocked
    const blockedDatesCollection = await getBlockedDatesCollection();
    const blockedSlot = await blockedDatesCollection.findOne({
      date: appointmentData.date,
      isActive: true,
      $or: [
        { timeSlots: { $exists: false } }, // Entire day blocked
        { timeSlots: { $size: 0 } }, // Entire day blocked 
        { timeSlots: appointmentData.time }, // Specific time blocked
      ],
    });

    if (blockedSlot) {
      return NextResponse.json({
        success: false,
        message: 'Selected time slot is blocked by administration.',
        reason: blockedSlot.reason,
      }, { status: 409 });
    }
    
    // Get collections
    const appointmentsCollection = await getAppointmentsCollection();
    
    // Prepare the appointment document
    const appointmentDoc = {
      ...appointmentData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    // Insert the appointment into MongoDB
    const appointmentResult = await appointmentsCollection.insertOne(appointmentDoc);
    
    // Create permanent slot booking
    const slotBooking = {
      date: appointmentData.date,
      time: appointmentData.time,
      appointmentId: appointmentResult.insertedId,
      patientName: appointmentData.name,
      patientEmail: appointmentData.email,
      service: appointmentData.service,
      status: 'active' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    await bookedSlotsCollection.insertOne(slotBooking);
    
    // Clean up any temporary bookings for this slot
    await bookedSlotsCollection.deleteMany({
      date: appointmentData.date,
      time: appointmentData.time,
      service: 'Temporary Hold',
    });
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Appointment booked successfully',
      appointmentId: appointmentResult.insertedId,
      appointment: {
        ...appointmentDoc,
        _id: appointmentResult.insertedId,
      },
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating appointment:', error);
    
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      }, { status: 400 });
    }
    
    // Handle MongoDB errors
    if (error instanceof Error) {
      return NextResponse.json({
        success: false,
        message: 'Database error occurred',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      }, { status: 500 });
    }
    
    // Handle unknown errors
    return NextResponse.json({
      success: false,
      message: 'An unexpected error occurred',
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Appointments API is working',
    endpoint: '/api/appointments',
    methods: ['POST'],
    captchaRequired: true,
  });
}