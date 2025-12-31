'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import AnnouncementBar from '@/components/AnnouncementBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { FiCheckCircle } from 'react-icons/fi'
import { ordersAPI } from '@/lib/api'

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('id')
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      loadOrder()
    }
  }, [orderId])

  const loadOrder = async () => {
    try {
      setLoading(true)
      const orderData = await ordersAPI.getOrder(orderId!)
      setOrder(orderData)
    } catch (error) {
      console.error('Failed to load order:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !order) {
    return (
      <div className="min-h-screen flex flex-col">
        <AnnouncementBar />
        <Header />
        <main className="flex-grow flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">Loading order details...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <FiCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
              <p className="text-gray-600">Thank you for your order</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h2 className="font-bold mb-4">Order Details</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-semibold">#{order.id.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-semibold">PKR {order.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-semibold capitalize">{order.customer.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold text-green-600 capitalize">{order.status}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h2 className="font-bold mb-4">Shipping Address</h2>
              <p className="text-sm text-gray-600">
                {order.customer.firstName} {order.customer.lastName}<br />
                {order.customer.address}<br />
                {order.customer.city}, {order.customer.postalCode}<br />
                {order.customer.country}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition font-semibold rounded"
              >
                Continue Shopping
              </Link>
              <Link
                href="/pages/contact"
                className="px-6 py-3 bg-gray-200 text-black hover:bg-gray-300 transition font-semibold rounded"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col">
        <AnnouncementBar />
        <Header />
        <main className="flex-grow flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  )
}

