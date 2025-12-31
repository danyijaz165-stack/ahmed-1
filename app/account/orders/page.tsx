'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import AnnouncementBar from '@/components/AnnouncementBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useToast } from '@/contexts/ToastContext'
import { ordersAPI } from '@/lib/api'
import { FiPackage, FiClock, FiTruck, FiCheckCircle, FiXCircle } from 'react-icons/fi'

interface OrderItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface Order {
  _id: string
  id?: string
  items: OrderItem[]
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
    country: string
    paymentMethod: string
  }
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  updatedAt?: string
}

export default function OrdersPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ id: string; email: string } | null>(null)

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      const userData = sessionStorage.getItem('user')
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
        } catch (e) {
          console.error('Error parsing user data:', e)
          router.push('/account/login')
        }
      } else {
        router.push('/account/login')
      }
    }
  }, [router])

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const ordersData = await ordersAPI.getOrders()
      setOrders(ordersData)
    } catch (error: any) {
      console.error('Error fetching orders:', error)
      showToast(error.message || 'Failed to load orders', 'error')
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <FiClock className="text-yellow-500" size={20} />
      case 'processing':
        return <FiPackage className="text-blue-500" size={20} />
      case 'shipped':
        return <FiTruck className="text-purple-500" size={20} />
      case 'delivered':
        return <FiCheckCircle className="text-green-500" size={20} />
      case 'cancelled':
        return <FiXCircle className="text-red-500" size={20} />
      default:
        return <FiPackage className="text-gray-500" size={20} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              My Orders
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              View all your past and current orders
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 sm:p-12 text-center">
              <FiPackage className="mx-auto text-gray-400 dark:text-gray-600 mb-4" size={64} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                No Orders Yet
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here!
              </p>
              <Link
                href="/collections/catalog"
                className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition font-semibold"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const orderId = order.id || order._id
                return (
                  <div
                    key={orderId}
                    className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
                  >
                    {/* Order Header */}
                    <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                              Order #{orderId.slice(-8).toUpperCase()}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {getStatusIcon(order.status)}
                              <span className="capitalize">{order.status}</span>
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Placed on {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            PKR {order.total.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {order.items.length} item{order.items.length > 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex flex-col sm:flex-row gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                          >
                            <div className="relative w-full sm:w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="96px"
                                unoptimized
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                {item.name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                Quantity: {item.quantity}
                              </p>
                              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                PKR {(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Details */}
                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                              Shipping Address
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {order.customer.firstName} {order.customer.lastName}
                              <br />
                              {order.customer.address}
                              <br />
                              {order.customer.city}, {order.customer.postalCode}
                              <br />
                              {order.customer.country}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                              Payment Method
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                              {order.customer.paymentMethod === 'cash'
                                ? 'Cash on Delivery'
                                : 'Bank Transfer'}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                              {order.customer.email}
                              <br />
                              {order.customer.phone}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* View Order Button */}
                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <Link
                          href={`/order-success?id=${orderId}`}
                          className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition font-semibold text-sm"
                        >
                          View Order Details
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

