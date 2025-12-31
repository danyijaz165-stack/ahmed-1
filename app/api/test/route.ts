import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    return NextResponse.json(
      { 
        success: true, 
        message: 'MongoDB connected successfully!',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Test connection error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to connect to MongoDB',
        hint: 'Please check your MONGODB_URI in .env.local file'
      },
      { status: 500 }
    )
  }
}

