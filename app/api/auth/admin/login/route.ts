import { NextRequest, NextResponse } from 'next/server'

// Admin credentials (in production, store in environment variables)
const ADMIN_EMAIL = 'admin@admin.com'
const ADMIN_PASSWORD = 'admin123'

export async function POST(request: NextRequest) {
  try {
    console.log('Admin login API called')
    const body = await request.json()
    const { email, password } = body
    
    console.log('Received credentials:', { 
      email, 
      passwordLength: password?.length,
      emailRaw: email,
      passwordRaw: password
    })

    // Validation
    if (!email || !password) {
      console.log('Validation failed: missing email or password')
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Normalize email for comparison
    const normalizedEmail = email.toLowerCase().trim()
    const normalizedAdminEmail = ADMIN_EMAIL.toLowerCase().trim()
    
    // Normalize password (trim whitespace)
    const normalizedPassword = password.trim()
    
    // Check admin credentials
    const emailMatch = normalizedEmail === normalizedAdminEmail
    const passwordMatch = normalizedPassword === ADMIN_PASSWORD
    
    console.log('Credential check:', { 
      emailMatch, 
      passwordMatch, 
      receivedEmail: normalizedEmail,
      expectedEmail: normalizedAdminEmail,
      receivedPassword: normalizedPassword,
      expectedPassword: ADMIN_PASSWORD,
      receivedPasswordLength: normalizedPassword.length,
      expectedPasswordLength: ADMIN_PASSWORD.length
    })

    if (emailMatch && passwordMatch) {
      console.log('Admin login successful')
      return NextResponse.json(
        {
          message: 'Admin login successful',
          admin: {
            email: ADMIN_EMAIL,
            role: 'admin',
          },
        },
        { status: 200 }
      )
    }

    console.log('Invalid credentials - Email match:', emailMatch, 'Password match:', passwordMatch)
    return NextResponse.json(
      { error: 'Invalid admin credentials. Please check your email and password.' },
      { status: 401 }
    )
  } catch (error: any) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { error: error.message || 'Server error. Please try again later.' },
      { status: 500 }
    )
  }
}

