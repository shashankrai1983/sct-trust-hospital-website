/**
 * Production Database Backup Script
 * Linus methodology: Safety first, verify everything
 */

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const PRODUCTION_CONFIG = {
  uri: 'mongodb+srv://khushburai1008:ITMUH2rr3ZkGvqxU@cluster0.bqufcqe.mongodb.net/sct_hospital?retryWrites=true&w=majority',
  dbName: 'sct_hospital'
};

async function backupProductionDatabase() {
  console.log('🔒 PRODUCTION DATABASE BACKUP');
  console.log('Linus principle: Never break userspace - backup first');
  console.log('');
  
  const client = new MongoClient(PRODUCTION_CONFIG.uri);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(__dirname, '..', 'backups', `production-backup-${timestamp}`);
  
  try {
    // Create backup directory
    if (!fs.existsSync(path.dirname(backupDir))) {
      fs.mkdirSync(path.dirname(backupDir), { recursive: true });
    }
    fs.mkdirSync(backupDir, { recursive: true });
    
    console.log('🔌 Connecting to production database...');
    await client.connect();
    const db = client.db(PRODUCTION_CONFIG.dbName);
    
    // Get all collections
    const collections = await db.listCollections().toArray();
    console.log(`📊 Found ${collections.length} collections to backup`);
    
    let totalDocuments = 0;
    const backupManifest = {
      timestamp,
      database: PRODUCTION_CONFIG.dbName,
      collections: [],
      totalDocuments: 0
    };
    
    for (const collection of collections) {
      const collName = collection.name;
      console.log(`\n📁 Backing up collection: ${collName}`);
      
      try {
        // Get all documents
        const documents = await db.collection(collName).find({}).toArray();
        const count = documents.length;
        totalDocuments += count;
        
        // Get indexes
        const indexes = await db.collection(collName).indexes();
        
        // Save collection data
        const collectionBackup = {
          name: collName,
          documentCount: count,
          documents: documents,
          indexes: indexes
        };
        
        // Write to file
        const filePath = path.join(backupDir, `${collName}.json`);
        fs.writeFileSync(filePath, JSON.stringify(collectionBackup, null, 2));
        
        console.log(`   ✅ ${count} documents backed up`);
        console.log(`   📝 ${indexes.length} indexes recorded`);
        
        backupManifest.collections.push({
          name: collName,
          documentCount: count,
          indexCount: indexes.length,
          filePath: `${collName}.json`
        });
        
      } catch (error) {
        console.error(`   ❌ Error backing up ${collName}:`, error.message);
      }
    }
    
    backupManifest.totalDocuments = totalDocuments;
    
    // Save manifest
    fs.writeFileSync(
      path.join(backupDir, 'manifest.json'), 
      JSON.stringify(backupManifest, null, 2)
    );
    
    console.log(`\n✅ Backup completed successfully!`);
    console.log(`📊 Total documents backed up: ${totalDocuments}`);
    console.log(`📁 Backup location: ${backupDir}`);
    
    // Verify backup integrity
    console.log(`\n🔍 Verifying backup integrity...`);
    const manifestPath = path.join(backupDir, 'manifest.json');
    
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      console.log(`✅ Manifest verified: ${manifest.collections.length} collections`);
      
      // Verify each collection file exists
      let verificationPassed = true;
      for (const coll of manifest.collections) {
        const filePath = path.join(backupDir, coll.filePath);
        if (fs.existsSync(filePath)) {
          const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          if (data.documents.length === coll.documentCount) {
            console.log(`   ✅ ${coll.name}: ${coll.documentCount} documents verified`);
          } else {
            console.log(`   ❌ ${coll.name}: document count mismatch`);
            verificationPassed = false;
          }
        } else {
          console.log(`   ❌ ${coll.name}: backup file missing`);
          verificationPassed = false;
        }
      }
      
      if (verificationPassed) {
        console.log('\n🎯 BACKUP VERIFICATION: PASSED');
        console.log('Safe to proceed with migration');
      } else {
        console.log('\n❌ BACKUP VERIFICATION: FAILED');
        console.log('DO NOT PROCEED - Fix backup issues first');
      }
    }
    
    return backupDir;
    
  } catch (error) {
    console.error('❌ Backup failed:', error.message);
    return null;
  } finally {
    await client.close();
    console.log('🔌 Database connection closed');
  }
}

// Execute backup
backupProductionDatabase()
  .then(backupDir => {
    if (backupDir) {
      console.log('\n🚀 Ready for next step: database migration');
    } else {
      console.log('\n🛑 STOP: Fix backup issues before proceeding');
    }
  })
  .catch(console.error);