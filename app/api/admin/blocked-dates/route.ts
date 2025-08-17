import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { z } from 'zod';
import { getBlockedDatesCollection, getTickerNotificationsCollection } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Validation schema
const blockedDateSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD'),
  timeSlots: z.array(z.string()).optional(),
  reason: z.string().min(1).max(50, 'Reason must be 10 words or less'),
});

const updateBlockedDateSchema = z.object({
  reason: z.string().min(1).max(50, 'Reason must be 10 words or less').optional(),
  isActive: z.boolean().optional(),
  timeSlots: z.array(z.string()).optional(),
});

// Get all blocked dates
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized. Admin access required.',
      }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const isActive = searchParams.get('isActive');

    const blockedDatesCollection = await getBlockedDatesCollection();
    
    // Build query
    const query: any = {};
    
    if (startDate && endDate) {
      query.date = { $gte: startDate, $lte: endDate };
    } else if (startDate) {
      query.date = { $gte: startDate };
    } else if (endDate) {
      query.date = { $lte: endDate };
    }
    
    if (isActive !== null && isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const blockedDates = await blockedDatesCollection
      .find(query)
      .sort({ date: 1 })
      .toArray();

    return NextResponse.json({
      success: true,
      data: blockedDates,
      count: blockedDates.length,
    });

  } catch (error) {
    console.error('Error fetching blocked dates:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}

// Create new blocked date
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized. Admin access required.',
      }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = blockedDateSchema.parse(body);

    // Check if date is not in the past
    const today = new Date();
    const blockDate = new Date(validatedData.date);
    today.setHours(0, 0, 0, 0);
    blockDate.setHours(0, 0, 0, 0);

    if (blockDate < today) {
      return NextResponse.json({
        success: false,
        message: 'Cannot block dates in the past',
      }, { status: 400 });
    }

    const blockedDatesCollection = await getBlockedDatesCollection();
    
    // Check if date is already blocked
    const existingBlock = await blockedDatesCollection.findOne({
      date: validatedData.date,
      isActive: true,
    });

    if (existingBlock) {
      return NextResponse.json({
        success: false,
        message: 'Date is already blocked',
      }, { status: 409 });
    }

    // Calculate notification dates (2 days before)
    const notificationStartDate = new Date(blockDate);
    notificationStartDate.setDate(notificationStartDate.getDate() - 2);
    
    const notificationEndDate = new Date(blockDate);
    notificationEndDate.setDate(notificationEndDate.getDate() + 1); // Day after blocked date

    // Create blocked date document - good taste: eliminate special cases
    const blockedDateDoc = {
      ...validatedData,
      blockedBy: session.user?.id || 'admin',
      blockedByName: session.user?.name || 'Admin',
      isActive: true,
      notificationStartDate,
      notificationEndDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await blockedDatesCollection.insertOne(blockedDateDoc);

    // Create ticker notification
    const tickerNotificationsCollection = await getTickerNotificationsCollection();
    const tickerMessage = validatedData.timeSlots && validatedData.timeSlots.length > 0
      ? `Notice: ${validatedData.reason} on ${validatedData.date} (${validatedData.timeSlots.join(', ')})`
      : `Notice: ${validatedData.reason} on ${validatedData.date}`;

    const tickerNotification = {
      id: result.insertedId.toString(),
      message: tickerMessage,
      type: 'blocked_date' as const,
      startDate: notificationStartDate,
      endDate: notificationEndDate,
      isActive: true,
      priority: 1,
      relatedBlockedDateId: result.insertedId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await tickerNotificationsCollection.insertOne(tickerNotification);

    return NextResponse.json({
      success: true,
      message: 'Date blocked successfully',
      data: {
        ...blockedDateDoc,
        _id: result.insertedId,
      },
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating blocked date:', error);
    
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

    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}

// Update blocked date
export async function PATCH(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized. Admin access required.',
      }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Blocked date ID is required',
      }, { status: 400 });
    }

    const body = await request.json();
    const validatedData = updateBlockedDateSchema.parse(body);

    const blockedDatesCollection = await getBlockedDatesCollection();
    
    const updateDoc = {
      ...validatedData,
      updatedAt: new Date(),
    };

    const result = await blockedDatesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateDoc }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({
        success: false,
        message: 'Blocked date not found',
      }, { status: 404 });
    }

    // Update related ticker notification if reason changed
    if (validatedData.reason) {
      const tickerNotificationsCollection = await getTickerNotificationsCollection();
      const blockedDate = await blockedDatesCollection.findOne({ _id: new ObjectId(id) });
      
      if (blockedDate) {
        const newMessage = blockedDate.timeSlots && blockedDate.timeSlots.length > 0
          ? `Notice: ${validatedData.reason} on ${blockedDate.date} (${blockedDate.timeSlots.join(', ')})`
          : `Notice: ${validatedData.reason} on ${blockedDate.date}`;

        await tickerNotificationsCollection.updateOne(
          { relatedBlockedDateId: new ObjectId(id) },
          { 
            $set: { 
              message: newMessage, 
              updatedAt: new Date(),
              isActive: validatedData.isActive !== false // Keep active unless explicitly deactivated
            }
          }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Blocked date updated successfully',
    });

  } catch (error) {
    console.error('Error updating blocked date:', error);
    
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

    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}

// Delete blocked date
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({
        success: false,
        message: 'Unauthorized. Admin access required.',
      }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Blocked date ID is required',
      }, { status: 400 });
    }

    const blockedDatesCollection = await getBlockedDatesCollection();
    const tickerNotificationsCollection = await getTickerNotificationsCollection();
    
    // Delete blocked date
    const result = await blockedDatesCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({
        success: false,
        message: 'Blocked date not found',
      }, { status: 404 });
    }

    // Delete related ticker notification
    await tickerNotificationsCollection.deleteOne({ relatedBlockedDateId: new ObjectId(id) });

    return NextResponse.json({
      success: true,
      message: 'Blocked date deleted successfully',
    });

  } catch (error) {
    console.error('Error deleting blocked date:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}