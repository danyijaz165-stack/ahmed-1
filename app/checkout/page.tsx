'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import AnnouncementBar from '@/components/AnnouncementBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { ordersAPI } from '@/lib/api'
import Image from 'next/image'
import { FiCheckCircle } from 'react-icons/fi'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, updateCart } = useCart()
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)
  const placeOrderButtonRef = useRef<HTMLButtonElement>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Pakistan',
    paymentMethod: 'cash',
  })

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = total >= 5000 ? 0 : 500
  const finalTotal = total + shipping

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Save order to API
      const orderData = {
        items: cart,
        customer: formData,
        total: finalTotal,
      }
      
      const order = await ordersAPI.createOrder(orderData)
      
      // Clear cart
      await updateCart([])
      
      setLoading(false)
      
      // Show success toast
      showToast('Order placed successfully!', 'success')
      
      // Redirect immediately to order details page
      router.push(`/order-success?id=${order.id}`)
    } catch (error: any) {
      setLoading(false)
      showToast(error.message || 'Failed to place order', 'error')
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <AnnouncementBar />
        <Header />
        <main className="flex-grow flex items-center justify-center py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Your cart is empty</h1>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition"
            >
              Continue Shopping
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Checkout</h1>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Country *</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    >
                      <option value="Pakistan">Pakistan</option>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-gray-300 dark:border-gray-700 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <span className="font-medium">Cash on Delivery</span>
                  </label>
                  <label className="flex items-center p-4 border border-gray-300 dark:border-gray-700 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === 'bank'}
                      onChange={handleChange}
                      className="mr-3"
                    />
                    <span className="font-medium">Bank Transfer</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow sticky top-24">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Order Summary</h2>
                
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-800">
                      <div className="relative w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                          sizes="64px"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{item.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">PKR {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex justify-between text-gray-900 dark:text-gray-100">
                    <span>Subtotal</span>
                    <span>PKR {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-900 dark:text-gray-100">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `PKR ${shipping.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100">
                    <span>Total</span>
                    <span>PKR {finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  ref={placeOrderButtonRef}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-6 hover:bg-gray-800 dark:hover:bg-gray-200 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed relative"
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
