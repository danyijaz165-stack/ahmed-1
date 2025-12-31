import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    console.log('Signup API called')
    
    // Parse request body
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return NextResponse.json(
        { error: 'Invalid request format. Please send valid JSON.' },
        { status: 400 }
      )
    }

    const { name, email, password } = body
    console.log('Received signup data:', { 
      name: name?.substring(0, 10), 
      email: email?.substring(0, 20), 
      passwordLength: password?.length 
    })
    
    try {
      await connectDB()
      console.log('Database connected')
    } catch (dbError: any) {
      console.error('Database connection failed:', dbError)
      if (dbError.message?.includes('ETIMEOUT') || dbError.message?.includes('timeout')) {
        return NextResponse.json(
          { error: 'Database connection timeout. Please check your internet connection and try again.' },
          { status: 503 }
        )
      }
      throw dbError
    }

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name is required and must be a valid string' },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string' || email.trim().length === 0) {
      return NextResponse.json(
        { error: 'Email is required and must be a valid string' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.trim().toLowerCase() })
    if (existingUser) {
      console.log('Email already registered:', email.trim().toLowerCase())
      return NextResponse.json(
        { error: 'Email already registered. Please use a different email or try logging in.' },
        { status: 400 }
      )
    }

    // Hash password
    console.log('Hashing password...')
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('Password hashed successfully')

    // Create user
    console.log('Creating user in database...')
    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    })
    console.log('User created successfully:', user._id.toString())

    // Return user without password
    const userResponse = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    }

    return NextResponse.json(
      { message: 'Account created successfully', user: userResponse },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Signup error:', error)
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      name: error.name,
      stack: error.stack?.substring(0, 200)
    })
    
    // More specific error messages
    if (error.message?.includes('connection') || error.message?.includes('MONGODB_URI')) {
      return NextResponse.json(
        { error: 'Database connection failed. Please check your MongoDB configuration.' },
        { status: 500 }
      )
    }
    
    if (error.code === 11000 || error.codeName === 'DuplicateKey') {
      console.log('Duplicate key error (email already exists)')
      return NextResponse.json(
        { error: 'Email already registered. Please use a different email or try logging in.' },
        { status: 400 }
      )
    }

    // Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors || {}).map((err: any) => err.message)
      return NextResponse.json(
        { error: errors.join(', ') || 'Validation failed' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        error: error.message || 'Server error. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

