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
    console.log('🔗 Testing MongoDB connection...')
    await db.admin().ping()
    console.log('✅ MongoDB connection successful')

    // Get all appointments, sorted by creation date (newest first)
    const appointments = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    console.log(`📊 Found ${appointments.length} appointments`)

    res.status(200).json({
      appointments
    })

  } catch (error) {
    console.error('❌ Appointments fetch error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : 'Database connection failed'
    })
  }
}
