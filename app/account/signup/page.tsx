'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AnnouncementBar from '@/components/AnnouncementBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useToast } from '@/contexts/ToastContext'
import { authAPI } from '@/lib/api'

export default function SignupPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name.trim()) {
      showToast('Please enter your name', 'error')
      return
    }
    
    if (!formData.email.trim()) {
      showToast('Please enter your email', 'error')
      return
    }
    
    if (formData.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error')
      return
    }
    
    setLoading(true)
    
    try {
      const response = await authAPI.signup(
        formData.name.trim(), 
        formData.email.trim().toLowerCase(), 
        formData.password
      )
      
      // Don't store user in sessionStorage after signup
      // User should login first to see their name in header
      
      // Show toast notification first
      console.log('✅ Signup successful, showing toast...')
      showToast('Account created successfully! 🎉', 'success')
      console.log('✅ Toast function called')
      
      // Small delay to show toast before redirect
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to login page
      console.log('🔄 Redirecting to login page...')
      router.push('/account/login')
    } catch (error: any) {
      let errorMessage = error.message || 'Something went wrong. Please try again.'
      
      console.log('Signup error caught:', errorMessage)
      
      // Specific error messages for better UX
      if (
        errorMessage.includes('Email already registered') || 
        errorMessage.includes('already exists') ||
        errorMessage.includes('already registered') ||
        errorMessage.toLowerCase().includes('duplicate')
      ) {
        showToast('This email is already registered. Please use a different email or try logging in.', 'error')
      } else if (errorMessage.includes('Email') && !errorMessage.includes('already')) {
        showToast('Please enter a valid email address', 'error')
      } else if (errorMessage.includes('Password')) {
        showToast('Password must be at least 6 characters', 'error')
      } else if (
        errorMessage.includes('connection') || 
        errorMessage.includes('Network') ||
        errorMessage.includes('timeout') ||
        errorMessage.includes('ETIMEOUT')
      ) {
        showToast('Database connection timeout. Please check your internet connection and try again.', 'error')
      } else {
        showToast(errorMessage, 'error')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Sign up</h1>
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/account/login" className="text-black font-semibold hover:underline">
                  Log in
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-6 hover:bg-gray-800 dark:hover:bg-gray-200 transition font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Sign up'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

