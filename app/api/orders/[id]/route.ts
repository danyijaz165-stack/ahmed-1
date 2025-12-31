import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Order from '@/models/Order'

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

// Get single order by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const order = await Order.findById(params.id)

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      order: {
        id: order._id.toString(),
        items: order.items,
        customer: order.customer,
        total: order.total,
        status: order.status,
        date: order.createdAt,
      },
    })
  } catch (error: any) {
    console.error('Get order error:', error)
    return NextResponse.json(
      { error: 'Server error. Please try again later.' },
      { status: 500 }
    )
  }
}

// Update order status (for admin accept/reject)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const isAdmin = request.headers.get('x-is-admin') === 'true'
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      )
    }

    const { status } = await request.json()

    // Validate status
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: ' + validStatuses.join(', ') },
        { status: 400 }
      )
    }

    const order = await Order.findByIdAndUpdate(
      params.id,
      { status },
      { new: true, runValidators: true }
    )

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Send email notification to customer about status change
    try {
      const statusMessages: Record<string, string> = {
        'pending': 'Your order is pending and awaiting confirmation.',
        'processing': 'Your order is being processed and will be shipped soon.',
        'shipped': 'Great news! Your order has been shipped and is on its way.',
        'delivered': 'Your order has been delivered successfully!',
        'cancelled': 'Your order has been cancelled.',
      }

      const statusMessage = statusMessages[status] || 'Your order status has been updated.'

      const orderItemsList = order.items.map((item: any) => 
        `<li>${item.name} - Qty: ${item.quantity} - PKR ${item.price.toLocaleString()}</li>`
      ).join('')

      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Order Status Update</h2>
          <p>Dear ${order.customer.firstName} ${order.customer.lastName},</p>
          <p>${statusMessage}</p>
          
          <h3 style="color: #333; margin-top: 20px;">Order Details:</h3>
          <p><strong>Order ID:</strong> ${order._id.toString()}</p>
          <p><strong>Status:</strong> ${status.charAt(0).toUpperCase() + status.slice(1)}</p>
          
          <h3 style="color: #333; margin-top: 20px;">Items:</h3>
          <ul>
            ${orderItemsList}
          </ul>
          
          <p style="margin-top: 20px;"><strong>Total Amount:</strong> PKR ${order.total.toLocaleString()}</p>
          
          <p style="margin-top: 30px;">Best regards,<br>Your Store Team</p>
        </div>
      `

      // Send email (non-blocking)
      sendOrderEmail(
        order.customer.email,
        `Order Status Update - Order #${order._id.toString()} - ${status.charAt(0).toUpperCase() + status.slice(1)}`,
        emailHtml
      )
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail the status update if email fails
    }

    return NextResponse.json({
      message: 'Order status updated successfully',
      order: {
        id: order._id.toString(),
        status: order.status,
        items: order.items,
        customer: order.customer,
        total: order.total,
        date: order.createdAt,
      },
    })
  } catch (error: any) {
    console.error('Update order error:', error)
    return NextResponse.json(
      { error: error.message || 'Server error. Please try again later.' },
      { status: 500 }
    )
  }
}

