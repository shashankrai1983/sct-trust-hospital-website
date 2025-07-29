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
});

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the data using Zod schema
    const validatedData = appointmentSchema.parse(body);
    
    // Get the appointments collection
    const collection = await getAppointmentsCollection();
    
    // Prepare the appointment document
    const appointmentDoc = {
      ...validatedData,
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
  });
}