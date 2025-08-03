import { MongoClient, Db, Collection } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

if (!process.env.MONGODB_DB) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_DB"');
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the connection
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new connection
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

/**
 * Get database connection
 * @returns Promise<Db> - MongoDB database instance
 */
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

/**
 * Get a specific collection
 * @param collectionName - Name of the collection
 * @returns Promise<Collection> - MongoDB collection instance
 */
export async function getCollection(collectionName: string): Promise<Collection> {
  const db = await getDatabase();
  return db.collection(collectionName);
}

/**
 * Database connection interface for dependency injection
 */
export interface DatabaseConnection {
  appointments: Collection;
  users: Collection;
  sessions: Collection;
  logs: Collection;
}

/**
 * Create database connection object with all collections
 * @returns Promise<DatabaseConnection> - Database connection with collections
 */
export async function createDatabaseConnection(): Promise<DatabaseConnection> {
  const db = await getDatabase();
  
  return {
    appointments: db.collection('appointments'),
    users: db.collection('users'),
    sessions: db.collection('sessions'),
    logs: db.collection('logs'),
  };
}

// Collection-specific helpers
export async function getAppointmentsCollection() {
  return getCollection('appointments');
}

export async function getUsersCollection() {
  return getCollection('users');
}

export async function getSessionsCollection() {
  return getCollection('sessions');
}

export async function getLogsCollection() {
  return getCollection('logs');
}

/**
 * Health check for database connection
 * @returns Promise<boolean> - True if connection is healthy
 */
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    const db = await getDatabase();
    await db.admin().ping();
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}

export default clientPromise;