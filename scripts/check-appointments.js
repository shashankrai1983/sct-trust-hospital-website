const { MongoClient } = require('mongodb');
require('dotenv').config();

async function checkAppointments() {
  console.log('📋 Checking appointments in MongoDB Atlas...\n');

  const mongoUri = process.env.MONGODB_URI;
  const mongoDb = process.env.MONGODB_DB;

  let client;
  
  try {
    client = new MongoClient(mongoUri);
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');

    const db = client.db(mongoDb);
    const appointmentsCollection = db.collection('appointments');

    // Count total appointments
    const totalCount = await appointmentsCollection.countDocuments();
    console.log(`📊 Total appointments: ${totalCount}\n`);

    if (totalCount > 0) {
      // Get all appointments
      const appointments = await appointmentsCollection.find({}).sort({ createdAt: -1 }).toArray();
      
      console.log('📅 Recent Appointments:');
      console.log('=' .repeat(80));
      
      appointments.forEach((apt, index) => {
        console.log(`\n${index + 1}. ${apt.name} (${apt.email})`);
        console.log(`   Service: ${apt.service}`);
        console.log(`   Date: ${apt.date} at ${apt.time}`);
        console.log(`   Phone: ${apt.phone}`);
        console.log(`   Status: ${apt.status}`);
        console.log(`   Created: ${apt.createdAt.toLocaleString()}`);
        if (apt.message) {
          console.log(`   Message: ${apt.message}`);
        }
        console.log(`   ID: ${apt._id}`);
      });
    } else {
      console.log('🗂️ No appointments found in the database');
    }

  } catch (error) {
    console.log('❌ Error checking appointments:', error.message);
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 Connection closed');
    }
  }
}

checkAppointments().catch(console.error);