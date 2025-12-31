import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Cart from '@/models/Cart'

// Get cart for user
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const userId = request.headers.get('x-user-id') || 'guest'

    let cart = await Cart.findOne({ userId })

    if (!cart) {
      cart = await Cart.create({ userId, items: [] })
    }

    return NextResponse.json({ cart: cart.items }, { status: 200 })
  } catch (error: any) {
    console.error('Get cart error:', error)
    
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

// Add item to cart
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const userId = request.headers.get('x-user-id') || 'guest'
    const { item } = await request.json()

    if (!item || !item.id || !item.name || !item.price || !item.image) {
      return NextResponse.json(
        { error: 'Invalid item data' },
        { status: 400 }
      )
    }

    let cart = await Cart.findOne({ userId })

    if (!cart) {
      cart = await Cart.create({ userId, items: [] })
    }

    // Check if item already exists
    const existingItemIndex = cart.items.findIndex((i: any) => i.id === item.id)

    if (existingItemIndex >= 0) {
      // Update quantity
      cart.items[existingItemIndex].quantity += 1
    } else {
      // Add new item
      cart.items.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      })
    }

    await cart.save()

    return NextResponse.json(
      { message: 'Item added to cart', cart: cart.items },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Add to cart error:', error)
    return NextResponse.json(
      { error: 'Server error. Please try again later.' },
      { status: 500 }
    )
  }
}

// Update cart
export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const userId = request.headers.get('x-user-id') || 'guest'
    const { items } = await request.json()

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid cart data' },
        { status: 400 }
      )
    }

    let cart = await Cart.findOne({ userId })

    if (!cart) {
      cart = await Cart.create({ userId, items: [] })
    }

    cart.items = items
    await cart.save()

    return NextResponse.json(
      { message: 'Cart updated', cart: cart.items },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Update cart error:', error)
    return NextResponse.json(
      { error: 'Server error. Please try again later.' },
      { status: 500 }
    )
  }
}

// Clear cart
export async function DELETE(request: NextRequest) {
  try {
    await connectDB()

    const userId = request.headers.get('x-user-id') || 'guest'

    let cart = await Cart.findOne({ userId })

    if (!cart) {
      cart = await Cart.create({ userId, items: [] })
    }

    cart.items = []
    await cart.save()

    return NextResponse.json(
      { message: 'Cart cleared', cart: [] },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Clear cart error:', error)
    return NextResponse.json(
      { error: 'Server error. Please try again later.' },
      { status: 500 }
    )
  }
}

