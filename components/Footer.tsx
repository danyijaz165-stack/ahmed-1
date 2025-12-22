'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Subscribe:', email)
    setEmail('')
  }

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gray-800 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">UP TO 30% OFF</h3>
            <p className="text-xs sm:text-sm text-gray-300 mb-4 px-2">
              Sign up for Ecolight deals, new arrivals and energy saving tips.
            </p>
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 sm:gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="flex-1 px-3 sm:px-4 py-2 text-black rounded sm:rounded-l sm:rounded-r-none focus:outline-none text-sm sm:text-base"
              />
              <button
                type="submit"
                className="bg-black px-4 sm:px-6 py-2 rounded sm:rounded-r hover:bg-gray-800 transition text-sm sm:text-base whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="text-xl sm:text-2xl font-bold block mb-3 sm:mb-4">
              Ecolight
            </Link>
            <p className="text-gray-400 text-xs sm:text-sm">
              Energy-efficient lighting for homes, shops and offices.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/collections/catalog" className="hover:text-white">
                  Catalog
                </Link>
              </li>
              <li>
                <Link href="/pages/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Policies</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/pages/privacy-policy" className="hover:text-white">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/pages/refund-policy" className="hover:text-white">
                  Refund policy
                </Link>
              </li>
              <li>
                <Link href="/pages/terms-of-service" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/pages/shipping-policy" className="hover:text-white">
                  Shipping policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="/pages/contact-information"
                  className="hover:text-white"
                >
                  Contact information
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800 text-center text-xs sm:text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Ecolight. All rights reserved.</p>
          <p className="mt-1 sm:mt-2">Powered by Next.js</p>
        </div>
      </div>
    </footer>
  )
}


