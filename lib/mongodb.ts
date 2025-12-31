import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || ''

// Don't throw error if URI is missing - will handle in connectDB

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache | undefined
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

async function connectDB() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined. Please add it to .env.local')
    throw new Error('Database connection string is missing. Please configure MONGODB_URI in .env.local')
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
      connectTimeoutMS: 10000, // 10 seconds connection timeout
      maxPoolSize: 10,
      minPoolSize: 1,
      retryWrites: true,
      retryReads: true,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully')
      return mongoose
    }).catch((error: any) => {
      console.error('❌ MongoDB connection error:', error.message)
      
      // Better error messages
      if (error.message?.includes('authentication')) {
        console.error('💡 Tip: Check your username and password in .env.local')
      } else if (error.message?.includes('network') || error.message?.includes('timeout')) {
        console.error('💡 Tip: Check Network Access in MongoDB Atlas - allow your IP address')
      } else if (error.message?.includes('ENOTFOUND') || error.message?.includes('DNS')) {
        console.error('💡 Tip: Check your cluster URL in the connection string')
      }
      
      cached.promise = null
      cached.conn = null
      throw error
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectDB

