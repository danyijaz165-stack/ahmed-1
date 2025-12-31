'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import AnnouncementBar from '@/components/AnnouncementBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useToast } from '@/contexts/ToastContext'
import { FiPackage, FiClock, FiTruck, FiCheckCircle, FiXCircle, FiRefreshCw, FiLogOut } from 'react-icons/fi'

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
  userId?: string
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

export default function DashboardPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [admin, setAdmin] = useState<{ email: string; role: string } | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
    totalRevenue: 0,
  })

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      try {
        // Remove admin session
        sessionStorage.removeItem('admin')
        // Let Header know auth state changed
        window.dispatchEvent(new Event('storage'))
        showToast('✅ Logged out successfully! 👋', 'success')
        // Wait a bit for toast to show before redirecting
        setTimeout(() => {
          router.push('/account/login')
        }, 1500)
      } catch (e) {
        // Even if something fails, still try to navigate away
        console.error('Error during admin logout:', e)
        showToast('❌ Error logging out. Please try again.', 'error')
        setTimeout(() => {
          router.push('/account/login')
        }, 1500)
      }
    } else {
      router.push('/account/login')
    }
  }

  useEffect(() => {
    // Check if admin is logged in
    const checkAdmin = () => {
      if (typeof window !== 'undefined') {
        try {
          const adminData = sessionStorage.getItem('admin')
          console.log('Dashboard: Checking admin session:', adminData)
          if (adminData) {
            try {
              const parsedAdmin = JSON.parse(adminData)
              console.log('Dashboard: Admin found:', parsedAdmin)
              if (parsedAdmin && parsedAdmin.email) {
                setAdmin(parsedAdmin)
                setCheckingAuth(false)
                return
              }
            } catch (e) {
              console.error('Dashboard: Error parsing admin data:', e)
            }
          }
          // If we get here, no valid admin session
          console.log('Dashboard: No admin session found, redirecting to login')
          setCheckingAuth(false)
          router.push('/admin/login')
        } catch (error) {
          console.error('Dashboard: Error checking admin:', error)
          setCheckingAuth(false)
          router.push('/admin/login')
        }
      } else {
        setCheckingAuth(false)
      }
    }
    
    // Check immediately and also after a small delay to ensure sessionStorage is available
    checkAdmin()
    const timer = setTimeout(() => {
      checkAdmin()
      setCheckingAuth(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [router])

  useEffect(() => {
    if (admin) {
      fetchOrders()
    }
  }, [admin])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      console.log('Fetching orders as admin...')
      
      // Manually set admin header for admin dashboard
      const response = await fetch('/api/orders', {
        headers: {
          'x-is-admin': 'true',
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders')
      }
      
      const data = await response.json()
      const ordersData = data.orders || []
      console.log('Orders fetched:', ordersData.length)
      setOrders(ordersData)
      
      // Calculate stats
      const statsData = {
        total: ordersData.length,
        pending: ordersData.filter((o: Order) => o.status === 'pending').length,
        processing: ordersData.filter((o: Order) => o.status === 'processing').length,
        shipped: ordersData.filter((o: Order) => o.status === 'shipped').length,
        delivered: ordersData.filter((o: Order) => o.status === 'delivered').length,
        cancelled: ordersData.filter((o: Order) => o.status === 'cancelled').length,
        totalRevenue: ordersData
          .filter((o: Order) => o.status !== 'cancelled')
          .reduce((sum: number, o: Order) => sum + o.total, 0),
      }
      setStats(statsData)
    } catch (error: any) {
      console.error('Error fetching orders:', error)
      showToast(error.message || 'Failed to load orders', 'error')
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: 'processing' | 'cancelled') => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-is-admin': 'true',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update order status')
      }

      const data = await response.json()
      showToast(
        newStatus === 'processing' 
          ? 'Order accepted successfully! ✅' 
          : 'Order rejected successfully! ❌',
        'success'
      )

      // Refresh orders list
      await fetchOrders()
    } catch (error: any) {
      console.error('Error updating order status:', error)
      showToast(error.message || 'Failed to update order status', 'error')
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

  // Show loading state while checking admin or if admin is not set
  if (checkingAuth || !admin) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <AnnouncementBar />
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Checking authentication...</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Please wait...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Owner Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {admin.email}
                </p>
              </div>
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <button
                  onClick={fetchOrders}
                  disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-50"
                >
                  <FiRefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                  <span>Refresh</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800 transition"
                >
                  <FiLogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                    {stats.total}
                  </p>
                </div>
                <FiPackage className="text-gray-400" size={32} />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
                    {stats.pending}
                  </p>
                </div>
                <FiClock className="text-yellow-400" size={32} />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Delivered</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                    {stats.delivered}
                  </p>
                </div>
                <FiCheckCircle className="text-green-400" size={32} />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                    PKR {stats.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <FiPackage className="text-gray-400" size={32} />
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                All Orders
              </h2>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="p-12 text-center">
                <FiPackage className="mx-auto text-gray-400 dark:text-gray-600 mb-4" size={64} />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  No Orders Yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No orders have been placed yet.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {orders.map((order) => {
                  const orderId = order.id || order._id
                  return (
                    <div key={orderId} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
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
                            {order.customer.firstName} {order.customer.lastName} • {order.customer.email}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Placed on {formatDate(order.createdAt)}
                          </p>
                          {order.userId && order.userId !== 'guest' && (
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              User ID: {order.userId}
                            </p>
                          )}
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

                      {/* Order Items */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex gap-3">
                            <div className="relative w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="64px"
                                unoptimized
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">
                                {item.name}
                              </h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Qty: {item.quantity} × PKR {item.price.toLocaleString()}
                              </p>
                              <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                                PKR {(item.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Shipping Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-2">
                            Shipping Address
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {order.customer.address}, {order.customer.city}
                            <br />
                            {order.customer.postalCode}, {order.customer.country}
                            <br />
                            Phone: {order.customer.phone}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-2">
                            Payment Method
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                            {order.customer.paymentMethod === 'cash'
                              ? 'Cash on Delivery'
                              : 'Bank Transfer'}
                          </p>
                        </div>
                      </div>

                      {/* Accept/Reject Buttons - Only show for pending orders */}
                      {order.status === 'pending' && (
                        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <button
                            onClick={() => updateOrderStatus(orderId, 'processing')}
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                          >
                            <FiCheckCircle size={18} />
                            Accept Order
                          </button>
                          <button
                            onClick={() => updateOrderStatus(orderId, 'cancelled')}
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                          >
                            <FiXCircle size={18} />
                            Reject Order
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

