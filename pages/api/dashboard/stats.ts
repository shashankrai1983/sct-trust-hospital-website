import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { getDatabase } from '@/lib/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check authentication
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const db = await getDatabase()
    const collection = db.collection('appointments')

    // Test connection first
    console.log('🔗 Testing MongoDB connection for stats...')
    await db.admin().ping()
    console.log('✅ MongoDB connection successful for stats')

    // Get current date ranges
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay())
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    console.log(`📅 Date ranges - Today: ${today}, Week: ${startOfWeek}, Month: ${startOfMonth}`)

    // Get statistics
    const [
      totalAppointments,
      todayAppointments,
      thisWeekAppointments,
      thisMonthAppointments,
      recentAppointments
    ] = await Promise.all([
      // Total appointments
      collection.countDocuments(),
      
      // Today's appointments
      collection.countDocuments({
        createdAt: { $gte: today }
      }),
      
      // This week's appointments
      collection.countDocuments({
        createdAt: { $gte: startOfWeek }
      }),
      
      // This month's appointments
      collection.countDocuments({
        createdAt: { $gte: startOfMonth }
      }),
      
      // Recent appointments (last 10)
      collection.find({})
        .sort({ createdAt: -1 })
        .limit(10)
        .toArray()
    ])

    const stats = {
      totalAppointments,
      todayAppointments,
      thisWeekAppointments,
      thisMonthAppointments
    }

    console.log(`📊 Stats calculated:`, stats)
    console.log(`📋 Recent appointments: ${recentAppointments.length}`)

    res.status(200).json({
      stats,
      recentAppointments
    })

  } catch (error) {
    console.error('❌ Dashboard stats error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : 'Database connection failed'
    })
  }
}
