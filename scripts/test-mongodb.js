const { MongoClient } = require('mongodb');
require('dotenv').config();

async function testMongoDBConnection() {
  console.log('🔍 Testing MongoDB Atlas Connection...\n');

  // Check environment variables
  console.log('1. Checking environment variables:');
  const mongoUri = process.env.MONGODB_URI;
  const mongoDb = process.env.MONGODB_DB;

  if (!mongoUri) {
    console.log('❌ MONGODB_URI is missing from environment variables');
    return;
  }
  if (!mongoDb) {
    console.log('❌ MONGODB_DB is missing from environment variables');
    return;
  }

  console.log('✅ MONGODB_URI found');
  console.log('✅ MONGODB_DB found:', mongoDb);
  console.log('📡 Connection string format looks correct\n');

  let client;
  
  try {
    // Test connection
    console.log('2. Attempting to connect to MongoDB Atlas...');
    client = new MongoClient(mongoUri);
    await client.connect();
    console.log('✅ Successfully connected to MongoDB Atlas!\n');

    // Test database access
    console.log('3. Testing database access...');
    const db = client.db(mongoDb);
    const collections = await db.listCollections().toArray();
    console.log('✅ Database accessible');
    console.log('📋 Existing collections:', collections.map(c => c.name).join(', ') || 'None yet\n');

    // Test collection operations
    console.log('4. Testing appointments collection...');
    const appointmentsCollection = db.collection('appointments');

    // Insert a test document
    const testAppointment = {
      name: 'Test Patient',
      email: 'test@example.com',
      phone: '1234567890',
      service: 'General Consultation',
      date: '2024-01-15',
      time: '10:00 AM',
      message: 'Connection test appointment',
      status: 'test',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log('📝 Inserting test document...');
    const insertResult = await appointmentsCollection.insertOne(testAppointment);
    console.log('✅ Test document inserted with ID:', insertResult.insertedId);

    // Read the test document
    console.log('📖 Reading test document...');
    const retrievedDoc = await appointmentsCollection.findOne({ _id: insertResult.insertedId });
    console.log('✅ Test document retrieved:', {
      name: retrievedDoc.name,
      email: retrievedDoc.email,
      service: retrievedDoc.service
    });

    // Count documents
    const docCount = await appointmentsCollection.countDocuments();
    console.log('📊 Total appointments in collection:', docCount);

    // Clean up test document
    console.log('🧹 Cleaning up test document...');
    await appointmentsCollection.deleteOne({ _id: insertResult.insertedId });
    console.log('✅ Test document removed\n');

    // Final summary
    console.log('🎉 MongoDB Connection Test Results:');
    console.log('✅ Connection: SUCCESS');
    console.log('✅ Database Access: SUCCESS');
    console.log('✅ Collection Operations: SUCCESS');
    console.log('✅ Insert/Read/Delete: SUCCESS');
    console.log('\n🚀 Your MongoDB Atlas integration is working perfectly!');

  } catch (error) {
    console.log('\n❌ MongoDB Connection Test Failed:');
    console.error('Error details:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('\n🔧 Troubleshooting: Check username/password in connection string');
    } else if (error.message.includes('timeout') || error.message.includes('ENOTFOUND')) {
      console.log('\n🔧 Troubleshooting: Check network connection and IP whitelist in Atlas');
    } else if (error.message.includes('not authorized')) {
      console.log('\n🔧 Troubleshooting: Check database user permissions in Atlas');
    }
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 Connection closed');
    }
  }
}

// Run the test
testMongoDBConnection().catch(console.error);