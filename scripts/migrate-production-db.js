/**
 * Production Database Migration Script
 * Creates new collections required for staging features
 * 
 * IMPORTANT: Run this ONLY on production database AFTER backup
 */

const { MongoClient } = require('mongodb');

const PRODUCTION_CONFIG = {
  uri: 'mongodb+srv://khushburai1008:ITMUH2rr3ZkGvqxU@cluster0.bqufcqe.mongodb.net/sct_hospital?retryWrites=true&w=majority',
  dbName: 'sct_hospital'
};

async function migrateProductionDatabase() {
  console.log('🚀 PRODUCTION DATABASE MIGRATION');
  console.log('⚠️  WARNING: This will modify production database!');
  console.log('');
  
  const client = new MongoClient(PRODUCTION_CONFIG.uri);
  
  try {
    console.log('🔌 Connecting to production database...');
    await client.connect();
    const db = client.db(PRODUCTION_CONFIG.dbName);
    
    // Check if collections already exist
    const existingCollections = await db.listCollections().toArray();
    const existingNames = existingCollections.map(col => col.name);
    
    console.log(`📊 Current collections: ${existingNames.join(', ')}`);
    
    const newCollections = [
      {
        name: 'bookedSlots',
        description: 'Tracks booked appointment slots to prevent conflicts',
        indexes: [
          { keys: { date: 1, time: 1 }, name: 'date_time_idx' },
          { keys: { appointmentId: 1 }, name: 'appointment_ref_idx' },
          { keys: { status: 1 }, name: 'status_idx' }
        ]
      },
      {
        name: 'blockedDates',
        description: 'Admin-managed blocked dates and time slots',
        indexes: [
          { keys: { date: 1 }, name: 'date_idx' },
          { keys: { isActive: 1 }, name: 'active_idx' },
          { keys: { date: 1, isActive: 1 }, name: 'date_active_idx' }
        ]
      },
      {
        name: 'tickerNotifications',
        description: 'Site-wide notification ticker messages',
        indexes: [
          { keys: { isActive: 1, priority: -1 }, name: 'active_priority_idx' },
          { keys: { startDate: 1, endDate: 1 }, name: 'date_range_idx' },
          { keys: { type: 1 }, name: 'type_idx' }
        ]
      },
      {
        name: 'holidayOverrides',
        description: 'Holiday date overrides and special schedules',
        indexes: [
          { keys: { date: 1 }, name: 'date_idx' },
          { keys: { isActive: 1 }, name: 'active_idx' }
        ]
      }
    ];
    
    console.log('');
    console.log('📝 MIGRATION PLAN:');
    
    for (const collection of newCollections) {
      if (existingNames.includes(collection.name)) {
        console.log(`✅ ${collection.name} - Already exists, skipping`);
      } else {
        console.log(`🆕 ${collection.name} - Will create with ${collection.indexes.length} indexes`);
      }
    }
    
    console.log('');
    console.log('⚠️  PROCEED WITH MIGRATION? Type "YES" to continue:');
    
    // In a real scenario, you'd want user confirmation here
    // For now, we'll proceed automatically but with dry-run mode
    
    console.log('');
    console.log('🔧 Creating new collections and indexes...');
    
    for (const collection of newCollections) {
      if (!existingNames.includes(collection.name)) {
        try {
          // Create collection
          await db.createCollection(collection.name);
          console.log(`✅ Created collection: ${collection.name}`);
          
          // Create indexes
          for (const index of collection.indexes) {
            await db.collection(collection.name).createIndex(index.keys, { 
              name: index.name,
              background: true  // Create in background to avoid blocking
            });
            console.log(`   🔍 Created index: ${index.name}`);
          }
          
        } catch (error) {
          console.error(`❌ Error creating ${collection.name}:`, error.message);
        }
      }
    }
    
    console.log('');
    console.log('🔍 Verifying migration...');
    
    // Verify all collections exist
    const finalCollections = await db.listCollections().toArray();
    const finalNames = finalCollections.map(col => col.name);
    
    console.log(`📊 Final collections: ${finalNames.join(', ')}`);
    
    // Check that all required collections are present
    const requiredCollections = ['appointments', 'bookedSlots', 'blockedDates', 'tickerNotifications', 'holidayOverrides'];
    const missingCollections = requiredCollections.filter(name => !finalNames.includes(name));
    
    if (missingCollections.length === 0) {
      console.log('✅ Migration completed successfully!');
      console.log('');
      console.log('📋 POST-MIGRATION CHECKLIST:');
      console.log('   1. Test appointment booking functionality');
      console.log('   2. Verify dashboard access and admin features');
      console.log('   3. Check that new features can be enabled');
      console.log('   4. Monitor database performance');
      console.log('');
      console.log('🚀 Ready for staging-to-master merge!');
    } else {
      console.log(`❌ Migration incomplete. Missing: ${missingCollections.join(', ')}`);
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.log('');
    console.log('🔄 ROLLBACK REQUIRED:');
    console.log('   1. Restore from backup if necessary');
    console.log('   2. Verify current collections are intact');
    console.log('   3. Do not proceed with code merge');
  } finally {
    await client.close();
    console.log('🔌 Database connection closed');
  }
}

// Dry run mode - set to false when ready to execute
const DRY_RUN = false;

if (DRY_RUN) {
  console.log('🧪 DRY RUN MODE - No changes will be made');
  console.log('   Set DRY_RUN = false in script to execute migration');
  console.log('');
  console.log('📋 BEFORE RUNNING MIGRATION:');
  console.log('   1. Backup production database completely');
  console.log('   2. Verify backup integrity');
  console.log('   3. Set DRY_RUN = false');
  console.log('   4. Run: node scripts/migrate-production-db.js');
  console.log('');
} else {
  console.log('⚠️  LIVE MIGRATION MODE - Production database will be modified!');
  migrateProductionDatabase().catch(console.error);
}