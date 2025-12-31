'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AnnouncementBar from '@/components/AnnouncementBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useToast } from '@/contexts/ToastContext'
import { authAPI } from '@/lib/api'

export default function LoginPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
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
    if (!formData.email.trim()) {
      showToast('Please enter your email', 'error')
      return
    }
    
    if (!formData.password) {
      showToast('Please enter your password', 'error')
      return
    }
    
    setLoading(true)

    try {
      if (isLogin) {
        // Login logic
        const response = await authAPI.login(
          formData.email.trim().toLowerCase(), 
          formData.password
        )
        
        // Store user/admin in sessionStorage
        if (typeof window !== 'undefined') {
          if (response.isAdmin) {
            // Store as admin
            sessionStorage.setItem('admin', JSON.stringify({
              email: response.user.email,
              role: 'admin',
            }))
            // Trigger events for Header update
            window.dispatchEvent(new Event('storage'))
            window.dispatchEvent(new CustomEvent('adminLogin'))
            showToast('Admin login successful! 🎉', 'success')
          } else {
            // Store as regular user
            sessionStorage.setItem('user', JSON.stringify(response.user))
            // Trigger storage event so Header updates
            window.dispatchEvent(new Event('storage'))
            window.dispatchEvent(new CustomEvent('login'))
            showToast('Login successful! Welcome back! 👋', 'success')
          }
        }
        
        // Small delay to show toast before redirect
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        router.push('/')
      } else {
        // Sign up logic
        if (!formData.name.trim()) {
          showToast('❌ Please enter your name', 'error')
          setLoading(false)
          return
        }
        
        if (formData.password.length < 6) {
          showToast('❌ Password must be at least 6 characters', 'error')
          setLoading(false)
          return
        }
        
        if (formData.password !== formData.confirmPassword) {
          showToast('❌ Passwords do not match', 'error')
          setLoading(false)
          return
        }
        
        const response = await authAPI.signup(
          formData.name.trim(), 
          formData.email.trim().toLowerCase(), 
          formData.password
        )
        
        // Store user in sessionStorage
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('user', JSON.stringify(response.user))
          // Trigger storage event so Header updates
          window.dispatchEvent(new Event('storage'))
        }
        
        showToast('✅ Account created successfully! You can now log in. 🎉', 'success')
        setTimeout(() => {
          setIsLogin(true)
          setFormData({ email: formData.email, password: '', name: '', confirmPassword: '' })
          setLoading(false)
        }, 1500)
      }
    } catch (error: any) {
      let errorMessage = error.message || 'Something went wrong. Please try again.'
      
      // Specific error messages for better UX
      if (errorMessage.includes('not registered')) {
        showToast('❌ This email is not registered. Please sign up first.', 'error')
      } else if (errorMessage.includes('Invalid email') || errorMessage.includes('Invalid password')) {
        showToast('❌ Invalid email or password. Please check your credentials.', 'error')
      } else if (
        errorMessage.includes('Email already registered') || 
        errorMessage.includes('already exists') ||
        errorMessage.includes('already registered') ||
        errorMessage.toLowerCase().includes('duplicate')
      ) {
        showToast('❌ Email already registered! Please use a different email or try logging in.', 'error')
      } else if (errorMessage.includes('Email')) {
        showToast('❌ Please enter a valid email address', 'error')
      } else if (errorMessage.includes('Password')) {
        showToast('❌ Password is required', 'error')
      } else if (
        errorMessage.includes('connection') || 
        errorMessage.includes('Network') ||
        errorMessage.includes('timeout') ||
        errorMessage.includes('ETIMEOUT')
      ) {
        showToast('⚠️ Database connection timeout. Please check your internet connection and try again.', 'error')
      } else {
        showToast(`❌ ${errorMessage}`, 'error')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow py-8 sm:py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">{isLogin ? 'Log in' : 'Sign up'}</h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin)
                    setFormData({ email: '', password: '', name: '', confirmPassword: '' })
                  }}
                  className="text-black dark:text-yellow-400 font-semibold hover:underline"
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required={!isLogin}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
              )}

              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => {
                      showToast('Forgot password feature coming soon! 🔜', 'info')
                    }}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-yellow-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black dark:bg-yellow-500 text-white dark:text-black py-3 px-6 hover:bg-gray-800 dark:hover:bg-yellow-400 transition font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : isLogin ? 'Log in' : 'Sign up'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
