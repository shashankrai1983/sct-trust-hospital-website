import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getAppointmentsCollection } from '@/lib/mongodb';

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
  captchaToken: z.string().min(1, {
    message: 'Please complete the CAPTCHA verification.',
  }),
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
    
    // Verify reCAPTCHA V3 token
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
    
    // Remove captchaToken from the data to be stored
    const { captchaToken, ...appointmentData } = validatedData;
    
    // Get the appointments collection
    const collection = await getAppointmentsCollection();
    
    // Prepare the appointment document
    const appointmentDoc = {
      ...appointmentData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    // Insert the appointment into MongoDB
    const result = await collection.insertOne(appointmentDoc);
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Appointment booked successfully',
      appointmentId: result.insertedId,
      appointment: {
        ...appointmentDoc,
        _id: result.insertedId,
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