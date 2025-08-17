import { NextRequest, NextResponse } from 'next/server';
import { getTickerNotificationsCollection } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const tickerNotificationsCollection = await getTickerNotificationsCollection();
    
    // Get current date
    const now = new Date();
    
    // Find active notifications that should be displayed now
    const activeNotifications = await tickerNotificationsCollection
      .find({
        isActive: true,
        startDate: { $lte: now },
        endDate: { $gte: now },
      })
      .sort({ priority: -1, createdAt: -1 }) // Sort by priority (highest first), then newest first
      .toArray();

    return NextResponse.json({
      success: true,
      data: activeNotifications.map(notification => ({
        id: notification._id.toString(),
        message: notification.message,
        type: notification.type,
        startDate: notification.startDate,
        endDate: notification.endDate,
        isActive: notification.isActive,
        priority: notification.priority,
      })),
      count: activeNotifications.length,
    });

  } catch (error) {
    console.error('Error fetching ticker notifications:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}

// Cleanup expired notifications
export async function DELETE(request: NextRequest) {
  try {
    const tickerNotificationsCollection = await getTickerNotificationsCollection();
    
    const now = new Date();
    
    // Delete notifications that have expired
    const result = await tickerNotificationsCollection.deleteMany({
      endDate: { $lt: now },
    });

    return NextResponse.json({
      success: true,
      message: `Cleaned up ${result.deletedCount} expired notifications`,
      deletedCount: result.deletedCount,
    });

  } catch (error) {
    console.error('Error cleaning up ticker notifications:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}