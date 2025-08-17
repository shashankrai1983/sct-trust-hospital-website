/**
 * Safe MongoDB Schema Comparison Script
 * READ-ONLY operations only - NO data modification
 */

const { MongoClient } = require('mongodb');

// Database configurations
const PRODUCTION_CONFIG = {
  uri: 'mongodb+srv://khushburai1008:ITMUH2rr3ZkGvqxU@cluster0.bqufcqe.mongodb.net/sct_hospital?retryWrites=true&w=majority',
  dbName: 'sct_hospital'
};

const STAGING_CONFIG = {
  uri: 'mongodb+srv://khushburai1008:ITMUH2rr3ZkGvqxU@cluster0.bqufcqe.mongodb.net/sct_hospital_staging?retryWrites=true&w=majority',
  dbName: 'sct_hospital_staging'
};

async function examineDatabase(config, label) {
  console.log(`\n🔍 Examining ${label} Database: ${config.dbName}`);
  console.log('=' + '='.repeat(50));
  
  const client = new MongoClient(config.uri, { 
    // Read-only configuration
    readPreference: 'primary',
    maxPoolSize: 1
  });

  try {
    await client.connect();
    const db = client.db(config.dbName);
    
    // Get all collections (READ-ONLY)
    const collections = await db.listCollections().toArray();
    console.log(`\n📊 Collections (${collections.length}):`);
    
    const schemaInfo = {};
    
    for (const collection of collections) {
      const collName = collection.name;
      console.log(`\n📁 Collection: ${collName}`);
      
      try {
        // Get collection stats (READ-ONLY)
        const stats = await db.collection(collName).countDocuments();
        console.log(`   📈 Document count: ${stats}`);
        
        // Get sample document structure (READ-ONLY)
        const sampleDoc = await db.collection(collName).findOne();
        
        // Get indexes (READ-ONLY)
        const indexes = await db.collection(collName).indexes();
        
        schemaInfo[collName] = {
          documentCount: stats,
          sampleSchema: sampleDoc ? Object.keys(sampleDoc) : [],
          indexes: indexes.map(idx => ({ 
            name: idx.name, 
            keys: idx.key, 
            unique: idx.unique || false 
          })),
          sampleDocument: sampleDoc
        };
        
        console.log(`   🗝️  Fields: ${sampleDoc ? Object.keys(sampleDoc).join(', ') : 'No documents'}`);
        console.log(`   🔍 Indexes: ${indexes.length}`);
        
      } catch (error) {
        console.log(`   ❌ Error examining collection: ${error.message}`);
      }
    }
    
    return schemaInfo;
    
  } catch (error) {
    console.error(`❌ Error connecting to ${label}:`, error.message);
    return null;
  } finally {
    await client.close();
  }
}

async function compareSchemas() {
  console.log('🔒 SAFE DATABASE SCHEMA COMPARISON');
  console.log('   READ-only operations only - no data will be modified');
  console.log('');
  
  try {
    // Examine both databases
    const productionSchema = await examineDatabase(PRODUCTION_CONFIG, 'PRODUCTION');
    const stagingSchema = await examineDatabase(STAGING_CONFIG, 'STAGING');
    
    if (!productionSchema || !stagingSchema) {
      console.error('❌ Failed to connect to one or both databases');
      return;
    }
    
    console.log('\n🔍 SCHEMA COMPARISON ANALYSIS');
    console.log('=' + '='.repeat(50));
    
    // Collections in staging but not in production
    const stagingCollections = Object.keys(stagingSchema);
    const productionCollections = Object.keys(productionSchema);
    
    const newCollections = stagingCollections.filter(col => !productionCollections.includes(col));
    const missingCollections = productionCollections.filter(col => !stagingCollections.includes(col));
    const commonCollections = stagingCollections.filter(col => productionCollections.includes(col));
    
    console.log('\n📊 COLLECTION DIFFERENCES:');
    console.log(`✅ Common collections: ${commonCollections.length}`);
    console.log(`➕ New in staging: ${newCollections.length} - ${newCollections.join(', ') || 'none'}`);
    console.log(`➖ Missing from staging: ${missingCollections.length} - ${missingCollections.join(', ') || 'none'}`);
    
    if (newCollections.length > 0) {
      console.log('\n🆕 NEW COLLECTIONS NEEDED IN PRODUCTION:');
      newCollections.forEach(colName => {
        const colInfo = stagingSchema[colName];
        console.log(`\n📁 ${colName}:`);
        console.log(`   📈 Documents: ${colInfo.documentCount}`);
        console.log(`   🗝️  Fields: ${colInfo.sampleSchema.join(', ')}`);
        console.log(`   🔍 Indexes: ${colInfo.indexes.map(idx => idx.name).join(', ')}`);
      });
    }
    
    // Field differences in common collections
    console.log('\n🔍 FIELD DIFFERENCES IN COMMON COLLECTIONS:');
    commonCollections.forEach(colName => {
      const prodFields = productionSchema[colName].sampleSchema;
      const stagingFields = stagingSchema[colName].sampleSchema;
      
      const newFields = stagingFields.filter(field => !prodFields.includes(field));
      const removedFields = prodFields.filter(field => !stagingFields.includes(field));
      
      if (newFields.length > 0 || removedFields.length > 0) {
        console.log(`\n📁 ${colName}:`);
        if (newFields.length > 0) {
          console.log(`   ➕ New fields: ${newFields.join(', ')}`);
        }
        if (removedFields.length > 0) {
          console.log(`   ➖ Removed fields: ${removedFields.join(', ')}`);
        }
      }
    });
    
    console.log('\n✅ Schema comparison completed safely - no data was modified');
    
  } catch (error) {
    console.error('❌ Comparison failed:', error.message);
  }
}

// Run the comparison
compareSchemas().catch(console.error);