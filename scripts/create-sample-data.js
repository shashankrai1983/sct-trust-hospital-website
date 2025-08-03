#!/usr/bin/env node

const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri || !dbName) {
  console.error('❌ MongoDB configuration missing in .env file');
  console.log('Required variables: MONGODB_URI, MONGODB_DB');
  process.exit(1);
}

const sampleAppointments = [
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91-9876543210',
    service: 'General Consultation',
    date: '2024-07-31',
    time: '10:00 AM',
    message: 'Regular checkup appointment',
    status: 'pending',
    createdAt: new Date('2024-07-30T08:30:00Z'),
    updatedAt: new Date('2024-07-30T08:30:00Z')
  },
  {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com', 
    phone: '+91-9876543211',
    service: 'Cardiology',
    date: '2024-07-31',
    time: '2:00 PM',
    message: 'Follow-up for heart condition',
    status: 'confirmed',
    createdAt: new Date('2024-07-29T14:15:00Z'),
    updatedAt: new Date('2024-07-29T16:20:00Z')
  },
  {
    name: 'Anita Patel',
    email: 'anita.patel@email.com',
    phone: '+91-9876543212',
    service: 'Gynecology',
    date: '2024-08-01',
    time: '11:30 AM',
    message: 'Annual checkup',
    status: 'pending',
    createdAt: new Date('2024-07-28T10:45:00Z'),
    updatedAt: new Date('2024-07-28T10:45:00Z')
  },
  {
    name: 'Mohit Singh',
    email: 'mohit.singh@email.com',
    phone: '+91-9876543213',
    service: 'Orthopedics',
    date: '2024-08-02',
    time: '9:00 AM',
    message: 'Knee pain consultation',
    status: 'completed',
    createdAt: new Date('2024-07-25T12:00:00Z'),
    updatedAt: new Date('2024-07-26T09:30:00Z')
  },
  {
    name: 'Deepika Agarwal',
    email: 'deepika.agarwal@email.com',
    phone: '+91-9876543214',
    service: 'Dermatology',
    date: '2024-08-03',
    time: '3:30 PM',
    message: 'Skin allergy consultation',
    status: 'pending',
    createdAt: new Date('2024-07-30T11:20:00Z'),
    updatedAt: new Date('2024-07-30T11:20:00Z')
  },
  {
    name: 'Amit Gupta',
    email: 'amit.gupta@email.com',
    phone: '+91-9876543215',
    service: 'Neurology',
    date: '2024-08-05',
    time: '1:00 PM',
    message: 'Headache and migraine treatment',
    status: 'confirmed',
    createdAt: new Date('2024-07-27T09:15:00Z'),
    updatedAt: new Date('2024-07-28T15:45:00Z')
  }
];

async function createSampleData() {
  const client = new MongoClient(uri);
  
  try {
    console.log('🔗 Connecting to MongoDB...');
    await client.connect();
    
    const db = client.db(dbName);
    const collection = db.collection('appointments');
    
    // Clear existing appointments (optional)
    console.log('🗑️ Clearing existing appointments...');
    await collection.deleteMany({});
    
    // Insert sample appointments
    console.log('📝 Creating sample appointments...');
    const result = await collection.insertMany(sampleAppointments);
    
    console.log(`✅ Successfully created ${result.insertedCount} sample appointments`);
    
    // Verify the data
    const count = await collection.countDocuments();
    console.log(`📊 Total appointments in database: ${count}`);
    
    // Show sample data
    console.log('\n📋 Sample appointments created:');
    const recent = await collection.find({}).sort({ createdAt: -1 }).limit(3).toArray();
    recent.forEach((apt, index) => {
      console.log(`${index + 1}. ${apt.name} - ${apt.service} (${apt.status})`);
    });
    
  } catch (error) {
    console.error('❌ Error creating sample data:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('🔐 Database connection closed');
  }
}

// Run the script
createSampleData().catch(console.error);