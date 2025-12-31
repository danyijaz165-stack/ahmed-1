'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { cartAPI } from '@/lib/api'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  cartCount: number
  addToCart: (item: Omit<CartItem, 'quantity'>) => Promise<void>
  updateCart: (cart: CartItem[]) => Promise<void>
  clearCart: () => Promise<void>
  loading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  // Load cart from API on mount
  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      setLoading(true)
      const cartData = await cartAPI.getCart()
      setCart(cartData)
    } catch (error: any) {
      console.error('Failed to load cart:', error)
      // If it's a database connection error, show empty cart but log the error
      if (error.message?.includes('Database connection')) {
        console.error('MongoDB not configured. Please set MONGODB_URI in .env.local')
      }
      setCart([])
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    try {
      const updatedCart = await cartAPI.addToCart(item)
      setCart(updatedCart)
    } catch (error) {
      console.error('Failed to add to cart:', error)
      throw error
    }
  }

  const updateCart = async (newCart: CartItem[]) => {
    try {
      const updatedCart = await cartAPI.updateCart(newCart)
      setCart(updatedCart)
    } catch (error) {
      console.error('Failed to update cart:', error)
      throw error
    }
  }

  const clearCart = async () => {
    try {
      await cartAPI.clearCart()
      setCart([])
    } catch (error) {
      console.error('Failed to clear cart:', error)
      throw error
    }
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, updateCart, clearCart, loading }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

