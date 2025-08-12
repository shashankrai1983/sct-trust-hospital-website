import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]'
import { getDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { z } from 'zod'

// Validation schema for status update
const statusUpdateSchema = z.object({
  status: z.enum(['pending', 'visited'], {
    errorMap: () => ({ message: 'Status must be either "pending" or "visited"' })
  })
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check authentication
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { id } = req.query

  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Validate appointment ID
    if (!id || typeof id !== 'string' || !ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid appointment ID' 
      })
    }

    // Parse and validate request body
    const validatedData = statusUpdateSchema.parse(req.body)

    // Get database and collection
    const db = await getDatabase()
    const collection = db.collection('appointments')

    console.log(`📝 Updating appointment ${id} status to: ${validatedData.status}`)

    // Update the appointment status
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          status: validatedData.status,
          updatedAt: new Date()
        }
      }
    )

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      })
    }

    if (result.modifiedCount === 0) {
      return res.status(400).json({
        success: false,
        message: 'No changes made to appointment'
      })
    }

    // Fetch the updated appointment
    const updatedAppointment = await collection.findOne(
      { _id: new ObjectId(id) }
    )

    console.log(`✅ Successfully updated appointment ${id}`)

    res.status(200).json({
      success: true,
      message: 'Appointment status updated successfully',
      appointment: updatedAppointment
    })

  } catch (error) {
    console.error('❌ Error updating appointment status:', error)

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      })
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? 
        (error instanceof Error ? error.message : 'Unknown error') : 
        'Failed to update appointment'
    })
  }
}