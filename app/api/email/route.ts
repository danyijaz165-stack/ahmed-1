import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Email sending function
async function sendEmail(to: string, subject: string, html: string) {
  // Check if email is configured
  const emailUser = process.env.EMAIL_USER
  const emailPass = process.env.EMAIL_PASSWORD
  const emailFrom = process.env.EMAIL_FROM || emailUser

  // If email credentials are not configured, log and return
  if (!emailUser || !emailPass) {
    console.log('📧 Email not configured. Email would be sent:')
    console.log('To:', to)
    console.log('Subject:', subject)
    console.log('Body:', html)
    console.log('⚠️ Please set EMAIL_USER and EMAIL_PASSWORD in .env.local to send emails')
    return { success: false, message: 'Email not configured' }
  }

  try {
    // Create transporter using Gmail SMTP (or your SMTP server)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })

    // Send email
    const info = await transporter.sendMail({
      from: emailFrom,
      to: to,
      subject: subject,
      html: html,
    })

    console.log('📧 Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error: any) {
    console.error('📧 Email sending failed:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html } = await request.json()

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: 'To, subject, and html are required' },
        { status: 400 }
      )
    }

    await sendEmail(to, subject, html)

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Send email error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send email' },
      { status: 500 }
    )
  }
}

