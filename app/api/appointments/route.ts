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

// Function to verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not configured');
    return false;
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
    return data.success === true;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the data using Zod schema
    const validatedData = appointmentSchema.parse(body);
    
    // Verify reCAPTCHA token
    const isValidCaptcha = await verifyRecaptcha(validatedData.captchaToken);
    
    if (!isValidCaptcha) {
      return NextResponse.json({
        success: false,
        message: 'Invalid CAPTCHA verification. Please try again.',
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