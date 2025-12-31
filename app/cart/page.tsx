'use client'

import { useEffect, useState } from 'react'
import AnnouncementBar from '@/components/AnnouncementBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export default function CartPage() {
  const { cart, updateCart } = useCart()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(id)
      return
    }
    const updatedCart = cart.map((item: CartItem) =>
      item.id === id ? { ...item, quantity } : item
    )
    try {
      await updateCart(updatedCart)
    } catch (error: any) {
      console.error('Failed to update cart:', error)
    }
  }

  const removeItem = async (id: string) => {
    const updatedCart = cart.filter((item: CartItem) => item.id !== id)
    try {
      await updateCart(updatedCart)
    } catch (error: any) {
      console.error('Failed to remove item:', error)
    }
  }

  const total = cart.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Cart</h1>
          
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl mb-4 text-gray-900 dark:text-gray-100">Your cart is empty</p>
              <Link
                href="/"
                className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-3 hover:bg-gray-800 dark:hover:bg-gray-200 transition"
              >
                Continue shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 border-b border-gray-200 dark:border-gray-800 pb-4"
                  >
                    <div className="relative w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{item.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">PKR {item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
                      >
                        -
                      </button>
                      <span className="w-12 text-center text-gray-900 dark:text-gray-100">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        PKR {(item.price * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 dark:text-red-400 text-sm hover:underline mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg sticky top-24">
                  <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Order Summary</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-gray-900 dark:text-gray-100">
                      <span>Subtotal</span>
                      <span>PKR {total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-900 dark:text-gray-100">
                      <span>Shipping</span>
                      <span>{total >= 5000 ? 'Free' : 'Calculated at checkout'}</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mb-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-gray-100">
                      <span>Total</span>
                      <span>PKR {total.toLocaleString()}</span>
                    </div>
                  </div>
                  <Link
                    href="/checkout"
                    className="block w-full bg-black dark:bg-white text-white dark:text-black text-center py-3 hover:bg-gray-800 dark:hover:bg-gray-200 transition font-semibold rounded"
                  >
                    Check out
                  </Link>
                  <Link
                    href="/"
                    className="block w-full text-center py-3 mt-2 hover:underline text-gray-900 dark:text-gray-100"
                  >
                    Continue shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}


