import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getAppointmentsCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { z } from 'zod';

// Validation schema for status update
const statusUpdateSchema = z.object({
  status: z.enum(['pending', 'visited'], {
    errorMap: () => ({ message: 'Status must be either "pending" or "visited"' })
  })
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate appointment ID
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, message: 'Invalid appointment ID' },
        { status: 400 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = statusUpdateSchema.parse(body);

    // Get appointments collection
    const collection = await getAppointmentsCollection();

    // Update the appointment status
    const result = await collection.updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          status: validatedData.status,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Appointment not found' },
        { status: 404 }
      );
    }

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'No changes made to appointment' },
        { status: 400 }
      );
    }

    // Fetch the updated appointment
    const updatedAppointment = await collection.findOne(
      { _id: new ObjectId(params.id) }
    );

    return NextResponse.json({
      success: true,
      message: 'Appointment status updated successfully',
      appointment: updatedAppointment
    });

  } catch (error) {
    console.error('Error updating appointment status:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      }, { status: 400 });
    }

    // Handle other errors
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? 
        (error instanceof Error ? error.message : 'Unknown error') : 
        'Failed to update appointment'
    }, { status: 500 });
  }
}