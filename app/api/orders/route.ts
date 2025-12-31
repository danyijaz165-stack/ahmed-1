import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Order from '@/models/Order'
import Cart from '@/models/Cart'

// Helper function to send email
async function sendOrderEmail(to: string, subject: string, html: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, html }),
    })
    if (!response.ok) {
      console.error('Email API error:', await response.text())
    }
  } catch (error) {
    console.error('Failed to send email:', error)
  }
}

// Get orders for user or all orders for admin
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const userId = request.headers.get('x-user-id') || 'guest'
    const isAdmin = request.headers.get('x-is-admin') === 'true'

    // If admin, return all orders; otherwise return user-specific orders
    if (isAdmin) {
      const orders = await Order.find({}).sort({ createdAt: -1 })
      return NextResponse.json({ orders }, { status: 200 })
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 })
    return NextResponse.json({ orders }, { status: 200 })
  } catch (error: any) {
    console.error('Get orders error:', error)
    
    if (error.message?.includes('connection') || error.message?.includes('MONGODB_URI')) {
      return NextResponse.json(
        { error: 'Database connection failed. Please check your MongoDB configuration.' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: error.message || 'Server error. Please try again later.' },
      { status: 500 }
    )
  }
}

// Create new order
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const userId = request.headers.get('x-user-id') || 'guest'
    const { items, customer, total } = await request.json()

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Order must have at least one item' },
        { status: 400 }
      )
    }

    if (!customer || !total) {
      return NextResponse.json(
        { error: 'Customer information and total are required' },
        { status: 400 }
      )
    }

    // Create order
    const order = await Order.create({
      userId,
      items,
      customer,
      total,
      status: 'pending',
    })

    // Clear cart after order
    const cart = await Cart.findOne({ userId })
    if (cart) {
      cart.items = []
      await cart.save()
    }

    // Send email notification to customer
    try {
      const orderItemsList = items.map((item: any) => 
        `<li>${item.name} - Qty: ${item.quantity} - PKR ${item.price.toLocaleString()}</li>`
      ).join('')

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Order Confirmation</h2>
          <p>Dear ${customer.firstName} ${customer.lastName},</p>
          <p>Thank you for your order! Your order has been received and is being processed.</p>
          
          <h3 style="color: #333; margin-top: 20px;">Order Details:</h3>
          <p><strong>Order ID:</strong> ${order._id.toString()}</p>
          <p><strong>Status:</strong> Pending</p>
          
          <h3 style="color: #333; margin-top: 20px;">Items:</h3>
          <ul>
            ${orderItemsList}
          </ul>
          
          <p style="margin-top: 20px;"><strong>Total Amount:</strong> PKR ${total.toLocaleString()}</p>
          
          <p style="margin-top: 20px;">We will notify you once your order status changes.</p>
          
          <p style="margin-top: 30px;">Best regards,<br>Your Store Team</p>
        </div>
      `

      // Send email (non-blocking)
      sendOrderEmail(
        customer.email,
        `Order Confirmation - Order #${order._id.toString()}`,
        emailHtml
      )
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail the order if email fails
    }

    return NextResponse.json(
      {
        message: 'Order placed successfully',
        order: {
          id: order._id.toString(),
          items: order.items,
          customer: order.customer,
          total: order.total,
          status: order.status,
          date: order.createdAt,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Create order error:', error)
    
    if (error.message?.includes('connection') || error.message?.includes('MONGODB_URI')) {
      return NextResponse.json(
        { error: 'Database connection failed. Please check your MongoDB configuration.' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: error.message || 'Server error. Please try again later.' },
      { status: 500 }
    )
  }
}

