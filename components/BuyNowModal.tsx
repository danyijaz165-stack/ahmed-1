'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Product } from '@/data/products'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { FiX } from 'react-icons/fi'
import { ordersAPI } from '@/lib/api'

// Truck Animation Component
function TruckAnimation() {
  useEffect(() => {
    // Inject CSS animations
    const style = document.createElement('style')
    style.textContent = `
      @keyframes truckEnter {
        0% {
          transform: translateX(-250px);
          opacity: 0;
        }
        15% {
          opacity: 1;
        }
        50% {
          transform: translateX(0px);
        }
        100% {
          transform: translateX(0px);
        }
      }
      
      @keyframes cargoDoorOpen {
        0%, 40% {
          transform: translateX(0);
          opacity: 1;
        }
        50% {
          transform: translateX(15px);
          opacity: 0.8;
        }
        60% {
          transform: translateX(15px);
          opacity: 0.8;
        }
        100% {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes boxEnterTruck {
        0%, 45% {
          transform: translateY(0) translateX(0) scale(1);
          opacity: 1;
        }
        50% {
          transform: translateY(15px) translateX(8px) scale(0.85);
          opacity: 0.9;
        }
        60% {
          transform: translateY(20px) translateX(12px) scale(0.7);
          opacity: 0.7;
        }
        70% {
          transform: translateY(22px) translateX(14px) scale(0.6);
          opacity: 0.5;
        }
        100% {
          transform: translateY(22px) translateX(14px) scale(0.6);
          opacity: 0;
        }
      }
      
      @keyframes truckLeave {
        0%, 70% {
          transform: translateX(0px);
          opacity: 1;
        }
        100% {
          transform: translateX(250px);
          opacity: 0;
        }
      }
      
      @keyframes wheelRotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      
      @keyframes exhaustSmoke {
        0% {
          opacity: 0;
          transform: translateY(0) scale(0.5);
        }
        50% {
          opacity: 0.6;
          transform: translateY(-5px) scale(1);
        }
        100% {
          opacity: 0;
          transform: translateY(-10px) scale(1.2);
        }
      }
      
      .truck-animation-container .truck-container {
        animation: truckEnter 2s ease-out, truckLeave 1.5s ease-in 3s;
      }
      
      .truck-animation-container .cargo-door {
        animation: cargoDoorOpen 3s ease-in-out;
        transform-origin: left center;
      }
      
      .truck-animation-container .package-box {
        animation: boxEnterTruck 3s ease-in-out;
      }
      
      .truck-animation-container .wheel {
        animation: wheelRotate 0.25s linear infinite;
        transform-origin: center;
      }
      
      .truck-animation-container .exhaust-smoke {
        animation: exhaustSmoke 1s ease-out infinite;
      }
    `
    document.head.appendChild(style)
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  return (
    <div className="truck-animation-container relative w-full h-full flex items-center justify-center min-h-[48px] overflow-hidden">
      {/* Truck - HD Quality Real Delivery Truck */}
      <div className="truck-container relative z-10">
        <svg
          width="120"
          height="70"
          viewBox="0 0 120 70"
          className="relative"
          style={{ 
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
            shapeRendering: 'geometricPrecision'
          }}
        >
          {/* Truck Body - Cargo Area (Main Container) */}
          <defs>
            <linearGradient id="truckBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#1e3a8a', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="cabinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#1e3a8a', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="wheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#111827', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#374151', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#1f2937', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          {/* Main Cargo Body */}
          <rect x="10" y="20" width="55" height="32" fill="url(#truckBodyGradient)" rx="3" />
          <rect x="10" y="20" width="55" height="10" fill="#3b82f6" rx="3" />
          
          {/* Cargo Area Interior (where box goes) */}
          <rect x="15" y="30" width="45" height="20" fill="#1e3a8a" rx="2" opacity="0.6" />
          
          {/* Cargo Door - Opens to let box in */}
          <g className="cargo-door">
            <rect x="15" y="30" width="8" height="20" fill="#1e3a8a" rx="1" />
            <line x1="17" y1="32" x2="17" y2="48" stroke="#3b82f6" strokeWidth="0.5" />
            <line x1="19" y1="32" x2="19" y2="48" stroke="#3b82f6" strokeWidth="0.5" />
            <circle cx="21" cy="40" r="1" fill="#60a5fa" />
          </g>
          
          {/* Cargo Body Details - Horizontal Lines */}
          <line x1="20" y1="35" x2="60" y2="35" stroke="#1e3a8a" strokeWidth="1.5" opacity="0.5" />
          <line x1="20" y1="40" x2="60" y2="40" stroke="#1e3a8a" strokeWidth="1.5" opacity="0.5" />
          <line x1="20" y1="45" x2="60" y2="45" stroke="#1e3a8a" strokeWidth="1.5" opacity="0.5" />
          
          {/* Vertical Divider Lines */}
          <line x1="30" y1="30" x2="30" y2="50" stroke="#1e3a8a" strokeWidth="1" opacity="0.4" />
          <line x1="45" y1="30" x2="45" y2="50" stroke="#1e3a8a" strokeWidth="1" opacity="0.4" />
          
          {/* Truck Cabin */}
          <rect x="65" y="25" width="25" height="22" fill="url(#cabinGradient)" rx="2" />
          <rect x="67" y="27" width="21" height="18" fill="#2563eb" rx="1" />
          
          {/* Windshield */}
          <rect x="69" y="29" width="17" height="14" fill="#60a5fa" rx="1" opacity="0.8" />
          <line x1="77.5" y1="29" x2="77.5" y2="43" stroke="#1e3a8a" strokeWidth="0.8" />
          
          {/* Side Window */}
          <rect x="67" y="27" width="2" height="18" fill="#3b82f6" />
          
          {/* Front Grille */}
          <rect x="90" y="30" width="6" height="18" fill="#1e3a8a" rx="1" />
          <line x1="92" y1="32" x2="92" y2="46" stroke="#3b82f6" strokeWidth="0.5" />
          <line x1="94" y1="32" x2="94" y2="46" stroke="#3b82f6" strokeWidth="0.5" />
          
          {/* Headlights */}
          <circle cx="96" cy="35" r="2" fill="#fbbf24" />
          <circle cx="96" cy="43" r="2" fill="#fbbf24" />
          
          {/* Wheels - Back (Larger) */}
          <g className="wheel" style={{ transformOrigin: '25px 58px' }}>
            <circle cx="25" cy="58" r="8" fill="url(#wheelGradient)" />
            <circle cx="25" cy="58" r="6" fill="#4b5563" />
            <circle cx="25" cy="58" r="4" fill="#6b7280" />
            <circle cx="25" cy="58" r="2" fill="#9ca3af" />
            <line x1="25" y1="50" x2="25" y2="66" stroke="#374151" strokeWidth="1" />
            <line x1="17" y1="58" x2="33" y2="58" stroke="#374151" strokeWidth="1" />
            <line x1="20.5" y1="54.5" x2="29.5" y2="61.5" stroke="#374151" strokeWidth="0.8" />
            <line x1="29.5" y1="54.5" x2="20.5" y2="61.5" stroke="#374151" strokeWidth="0.8" />
          </g>
          
          {/* Wheels - Front */}
          <g className="wheel" style={{ transformOrigin: '55px 58px' }}>
            <circle cx="55" cy="58" r="8" fill="url(#wheelGradient)" />
            <circle cx="55" cy="58" r="6" fill="#4b5563" />
            <circle cx="55" cy="58" r="4" fill="#6b7280" />
            <circle cx="55" cy="58" r="2" fill="#9ca3af" />
            <line x1="55" y1="50" x2="55" y2="66" stroke="#374151" strokeWidth="1" />
            <line x1="47" y1="58" x2="63" y2="58" stroke="#374151" strokeWidth="1" />
            <line x1="50.5" y1="54.5" x2="59.5" y2="61.5" stroke="#374151" strokeWidth="0.8" />
            <line x1="59.5" y1="54.5" x2="50.5" y2="61.5" stroke="#374151" strokeWidth="0.8" />
          </g>
          
          {/* Package/Box - Goes inside truck */}
          <g className="package-box">
            <rect x="20" y="5" width="18" height="14" fill="#dc2626" rx="2" />
            <rect x="20" y="5" width="18" height="5" fill="#ef4444" rx="2" />
            <line x1="22" y1="8" x2="36" y2="8" stroke="#991b1b" strokeWidth="1.5" />
            <line x1="22" y1="12" x2="36" y2="12" stroke="#991b1b" strokeWidth="1.5" />
            <line x1="22" y1="16" x2="36" y2="16" stroke="#991b1b" strokeWidth="1.5" />
            <circle cx="29" cy="11" r="2" fill="#991b1b" />
            <rect x="20" y="5" width="18" height="14" fill="none" stroke="#991b1b" strokeWidth="1" rx="2" />
          </g>
          
          {/* Exhaust Pipe */}
          <rect x="8" y="22" width="3" height="6" fill="#374151" rx="1" />
          
          {/* Exhaust Smoke */}
          <g className="exhaust-smoke">
            <circle cx="9.5" cy="20" r="2" fill="#9ca3af" opacity="0.4" />
            <circle cx="10" cy="18" r="1.5" fill="#d1d5db" opacity="0.3" />
            <circle cx="8.5" cy="17" r="1" fill="#e5e7eb" opacity="0.2" />
          </g>
          
          {/* Side Mirrors */}
          <rect x="65" y="28" width="2" height="4" fill="#1e3a8a" rx="0.5" />
          <rect x="88" y="28" width="2" height="4" fill="#1e3a8a" rx="0.5" />
          
          {/* Door Handle */}
          <rect x="67" y="35" width="3" height="1" fill="#60a5fa" rx="0.5" />
        </svg>
      </div>
    </div>
  )
}

interface BuyNowModalProps {
  product: Product
  quantity: number
  isOpen: boolean
  onClose: () => void
}

export default function BuyNowModal({ product, quantity, isOpen, onClose }: BuyNowModalProps) {
  const router = useRouter()
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

  const total = product.price * quantity
  const shipping = total >= 5000 ? 0 : 500
  const finalTotal = total + shipping

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

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
      // Directly place order without adding to cart
      const orderData = {
        items: [{
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity,
        }],
        customer: formData,
        total: finalTotal,
      }
      
      const order = await ordersAPI.createOrder(orderData)
      
      setLoading(false)
      
      // Show success message
      showToast('Order placed successfully!', 'success')
      
      // Close modal and redirect immediately to order details page
      onClose()
      router.push(`/order-success?id=${order.id}`)
    } catch (error: any) {
      setLoading(false)
      showToast(error.message || 'Failed to place order', 'error')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Buy Now</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
          >
            <FiX size={24} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Product Details */}
            <div className="lg:col-span-1 mb-6 lg:mb-0">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg sticky top-24">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Product Details</h3>
                
                <div className="relative aspect-square w-full mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                </div>

                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{product.name}</h4>
                
                {product.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
                )}

                <div className="space-y-2 mb-4">
                  {product.originalPrice && (
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        PKR {product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        PKR {product.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {!product.originalPrice && (
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      PKR {product.price.toLocaleString()}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400">Unit price / per</p>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-900 dark:text-gray-100">
                      <span>Quantity:</span>
                      <span className="font-semibold">{quantity}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-900 dark:text-gray-100">
                      <span>Subtotal:</span>
                      <span className="font-semibold">PKR {total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-900 dark:text-gray-100">
                      <span>Shipping:</span>
                      <span className="font-semibold">{shipping === 0 ? 'Free' : `PKR ${shipping.toLocaleString()}`}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
                      <span>Total:</span>
                      <span>PKR {finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Shipping Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
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
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Country *</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    >
                      <option value="Pakistan">Pakistan</option>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Payment Method</h3>
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

              <button
                ref={placeOrderButtonRef}
                type="submit"
                disabled={loading}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-6 hover:bg-gray-800 dark:hover:bg-gray-200 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? 'Processing...' : 'Place Order'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

