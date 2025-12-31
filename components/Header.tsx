'use client'

import Link from 'next/link'
import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  FiSearch,
  FiMenu,
  FiX,
  FiUser,
  FiShoppingCart,
  FiMoon,
  FiSun,
  FiZap,
  FiLogOut,
} from 'react-icons/fi'
import { useCart } from '@/contexts/CartContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useToast } from '@/contexts/ToastContext'
import { authAPI } from '@/lib/api'
import { products } from '@/data/products'
import ProductCard from './ProductCard'
import { useFlyingCart } from '@/contexts/FlyingCartContext'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { showToast } = useToast()
  
  // Check if we're on login/signup pages
  const isAuthPage = pathname === '/account/login' || pathname === '/account/signup'
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [admin, setAdmin] = useState<{ email: string; role: string } | null>(null)
  const [showLogoutMenu, setShowLogoutMenu] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // Get current admin state - only use state to avoid hydration issues
  const currentAdmin = admin
  const { cartCount } = useCart()
  const { theme, toggleTheme } = useTheme()
  const { setCartIconRef } = useFlyingCart()
  const cartIconRef = useRef<HTMLAnchorElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Set mounted to true after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (cartIconRef.current) {
      setCartIconRef(cartIconRef.current)
    }
  }, [setCartIconRef])

  useEffect(() => {
    // Only check sessionStorage after component is mounted (client-side)
    if (!mounted) return
    
    // Check for user and admin in sessionStorage
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const userData = sessionStorage.getItem('user')
        if (userData) {
          try {
            const parsedUser = JSON.parse(userData)
            setUser(parsedUser)
          } catch (e) {
            console.error('Error parsing user data:', e)
          }
        } else {
          setUser(null)
        }
        
        // Check for admin
        const adminData = sessionStorage.getItem('admin')
        if (adminData) {
          try {
            const parsedAdmin = JSON.parse(adminData)
            setAdmin(parsedAdmin)
          } catch (e) {
            console.error('Error parsing admin data:', e)
            setAdmin(null)
          }
        } else {
          setAdmin(null)
        }
      }
    }
    
    checkAuth()
    
    // Also check periodically to catch any updates
    const interval = setInterval(checkAuth, 500)
    
    return () => clearInterval(interval)
  }, [pathname]) // Re-check when route changes

  useEffect(() => {
    // Function to update user and admin from sessionStorage
    const updateUserAndAdmin = () => {
      if (!mounted || typeof window === 'undefined') return
      
      const userData = sessionStorage.getItem('user')
      if (userData) {
        try {
          setUser(JSON.parse(userData))
        } catch (e) {
          setUser(null)
        }
      } else {
        setUser(null)
      }
      
      // Check for admin
      const adminData = sessionStorage.getItem('admin')
      if (adminData) {
        try {
          setAdmin(JSON.parse(adminData))
        } catch (e) {
          setAdmin(null)
        }
      } else {
        setAdmin(null)
      }
    }

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user' || e.key === 'admin') {
        updateUserAndAdmin()
      }
    }

    // Listen for custom storage events (same tab updates)
    const handleCustomStorage = () => {
      updateUserAndAdmin()
    }
    
    // Listen for admin login event
    const handleAdminLogin = () => {
      updateUserAndAdmin()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('adminLogin', handleAdminLogin)
    
    // Also check periodically to catch any updates
    const intervalId = setInterval(() => {
      updateUserAndAdmin()
    }, 1000)
    
    // Initial check
    updateUserAndAdmin()
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('adminLogin', handleAdminLogin)
      clearInterval(intervalId)
    }
  }, [mounted])

  useEffect(() => {
    // Close logout menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowLogoutMenu(false)
      }
    }
    if (showLogoutMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showLogoutMenu])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      setFilteredProducts(filtered)
    }
  }, [searchQuery])

  const handleLogout = async () => {
    try {
      await authAPI.logout()
      setUser(null)
      setShowLogoutMenu(false)
      showToast('Logged out successfully! 👋', 'success')
      router.push('/')
    } catch (error: any) {
      // Even if API fails, clear user locally
      setUser(null)
      setShowLogoutMenu(false)
      showToast('Logged out successfully! 👋', 'success')
      router.push('/')
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 dark:bg-gray-900/95 border-b border-gray-200 dark:border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          {/* Top Bar with Menu, Logo, and Icons */}
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20 border-b border-gray-200 dark:border-gray-800 relative">
            {/* Menu Button - Left Corner - Hidden on auth pages */}
            {!isAuthPage && (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 sm:p-2.5 md:p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-900 dark:text-gray-100 flex-shrink-0 z-10"
                aria-label="Menu"
              >
                {menuOpen ? (
                  <FiX size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
                ) : (
                  <FiMenu size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
                )}
              </button>
            )}
            
            {/* Spacer for auth pages to center logo */}
            {isAuthPage && <div className="w-10 sm:w-12 md:w-14"></div>}

            {/* Logo in Center - Responsive positioning */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 whitespace-nowrap z-10 max-w-[120px] xs:max-w-[140px] sm:max-w-none truncate sm:truncate-none"
            >
              Ecolight
            </Link>

            {/* Right Side Icons - Responsive spacing - Hide search and theme on auth pages */}
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 xl:gap-3 ml-auto flex-shrink-0">
              {!isAuthPage && (
                <>
                  <button
                    onClick={toggleTheme}
                    className="p-1.5 sm:p-2 md:p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-700 dark:text-gray-300 flex-shrink-0"
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? (
                      <FiSun size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    ) : (
                      <FiMoon size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    )}
                  </button>
                  <button
                    onClick={() => setSearchOpen(!searchOpen)}
                    className="p-1.5 sm:p-2 md:p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-700 dark:text-gray-300 flex-shrink-0"
                    aria-label="Search"
                  >
                    <FiSearch size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </button>
                </>
              )}
              {mounted && currentAdmin ? (
                <div className="relative" ref={userMenuRef}>
                  <Link
                    href="/dashboard"
                    className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 transition text-gray-700 dark:text-gray-300 flex-shrink-0 font-medium"
                  >
                    <FiUser size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 sm:mr-1" />
                    <span className="text-xs sm:text-sm md:text-base hidden sm:inline max-w-[80px] sm:max-w-[100px] md:max-w-[120px] truncate">
                      Admin
                    </span>
                  </Link>
                </div>
              ) : mounted && user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowLogoutMenu(!showLogoutMenu)}
                    className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 transition text-gray-700 dark:text-gray-300 flex-shrink-0 font-medium"
                  >
                    <FiUser size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 sm:mr-1" />
                    <span className="text-xs sm:text-sm md:text-base hidden sm:inline max-w-[80px] sm:max-w-[100px] md:max-w-[120px] truncate">
                      {user.name || user.email.split('@')[0]}
                    </span>
                  </button>
                  {showLogoutMenu && (
                    <div className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2 min-w-[180px] z-50">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/account/orders"
                        onClick={() => setShowLogoutMenu(false)}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                      >
                        <FiShoppingCart size={16} />
                        <span>My Orders</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                      >
                        <FiLogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/account/login"
                    className="flex items-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 transition text-gray-700 dark:text-gray-300 flex-shrink-0 font-medium"
                  >
                    <FiUser size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 sm:mr-1" />
                    <span className="text-xs sm:text-sm md:text-base hidden sm:inline">Log in</span>
                  </Link>
                  <Link
                    href="/account/signup"
                    className="flex items-center hover:bg-black dark:hover:bg-gray-700 rounded-lg px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 transition bg-gray-900 dark:bg-gray-800 text-white flex-shrink-0 font-semibold shadow-md hover:shadow-lg text-xs sm:text-sm md:text-base"
                  >
                    <span>Sign up</span>
                  </Link>
                </>
              )}
              {!isAuthPage && (
                <Link
                  ref={cartIconRef}
                  href="/cart"
                  className="p-1.5 sm:p-2 md:p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg relative transition text-gray-700 dark:text-gray-300 flex-shrink-0"
                  aria-label="Cart"
                >
                  <FiShoppingCart size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-500 text-white text-[9px] sm:text-[10px] md:text-xs font-bold rounded-full min-w-[16px] sm:min-w-[18px] md:min-w-[20px] h-4 sm:h-[18px] md:h-5 flex items-center justify-center animate-bounce px-0.5 sm:px-1">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </Link>
              )}
            </div>
          </div>

          {/* Navigation Below - Desktop Only (under logo: only 3 main pages) - Hidden on auth pages */}
          {!isAuthPage && (
          <div className="hidden lg:flex justify-center py-2 md:py-3 lg:py-4">
            <nav className="flex items-center gap-3 md:gap-4 lg:gap-5 xl:gap-6">
              <Link
                href="/"
                className="relative group font-medium text-gray-800 dark:text-gray-100 transition-all duration-300 px-2 md:px-3 lg:px-4 py-1 md:py-1.5 rounded-lg text-sm md:text-base"
              >
                <span className="relative z-10 flex items-center gap-1.5 md:gap-2">
                  <FiZap 
                    className="text-yellow-500 dark:text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-125 group-hover:rotate-12 w-4 h-4 md:w-[18px] md:h-[18px]"
                    size={16}
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(255, 255, 0, 1)) drop-shadow(0 0 20px rgba(255, 255, 0, 0.8)) drop-shadow(0 0 30px rgba(255, 255, 0, 0.6))',
                    }}
                  />
                  <span className="group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors duration-300">Home</span>
                </span>
                <span 
                  className="absolute inset-0 bg-yellow-400/30 dark:bg-yellow-400/40 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-all duration-300"
                  style={{
                    boxShadow: '0 0 30px rgba(255, 255, 0, 0.8), 0 0 60px rgba(255, 255, 0, 0.5), inset 0 0 20px rgba(255, 255, 0, 0.3)'
                  }}
                />
              </Link>
              <Link
                href="/collections/catalog"
                className="relative group font-medium text-gray-800 dark:text-gray-100 transition-all duration-300 px-2 md:px-3 lg:px-4 py-1 md:py-1.5 rounded-lg text-sm md:text-base"
              >
                <span className="relative z-10 flex items-center gap-1.5 md:gap-2">
                  <FiZap 
                    className="text-yellow-500 dark:text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-125 group-hover:rotate-12 w-4 h-4 md:w-[18px] md:h-[18px]"
                    size={16}
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(255, 255, 0, 1)) drop-shadow(0 0 20px rgba(255, 255, 0, 0.8)) drop-shadow(0 0 30px rgba(255, 255, 0, 0.6))',
                    }}
                  />
                  <span className="group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors duration-300">Catalog</span>
                </span>
                <span 
                  className="absolute inset-0 bg-yellow-400/30 dark:bg-yellow-400/40 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-all duration-300"
                  style={{
                    boxShadow: '0 0 30px rgba(255, 255, 0, 0.8), 0 0 60px rgba(255, 255, 0, 0.5), inset 0 0 20px rgba(255, 255, 0, 0.3)'
                  }}
                />
              </Link>
              {mounted && currentAdmin && (
                  <Link
                    href="/dashboard"
                    className="relative group font-medium text-gray-800 dark:text-gray-100 transition-all duration-300 px-2 md:px-3 lg:px-4 py-1 md:py-1.5 rounded-lg text-sm md:text-base"
                  >
                    <span className="relative z-10 flex items-center gap-1.5 md:gap-2">
                      <FiZap 
                        className="text-yellow-500 dark:text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-125 group-hover:rotate-12 w-4 h-4 md:w-[18px] md:h-[18px]"
                        size={16}
                        style={{
                          filter: 'drop-shadow(0 0 10px rgba(255, 255, 0, 1)) drop-shadow(0 0 20px rgba(255, 255, 0, 0.8)) drop-shadow(0 0 30px rgba(255, 255, 0, 0.6))',
                        }}
                      />
                      <span className="group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors duration-300">Dashboard</span>
                    </span>
                    <span 
                      className="absolute inset-0 bg-yellow-400/30 dark:bg-yellow-400/40 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-all duration-300"
                      style={{
                        boxShadow: '0 0 30px rgba(255, 255, 0, 0.8), 0 0 60px rgba(255, 255, 0, 0.5), inset 0 0 20px rgba(255, 255, 0, 0.3)'
                      }}
                    />
                  </Link>
              )}
              <Link
                href="/pages/contact"
                className="relative group font-medium text-gray-800 dark:text-gray-100 transition-all duration-300 px-2 md:px-3 lg:px-4 py-1 md:py-1.5 rounded-lg text-sm md:text-base"
              >
                <span className="relative z-10 flex items-center gap-1.5 md:gap-2">
                  <FiZap 
                    className="text-yellow-500 dark:text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-125 group-hover:rotate-12 w-4 h-4 md:w-[18px] md:h-[18px]"
                    size={16}
                    style={{
                      filter: 'drop-shadow(0 0 10px rgba(255, 255, 0, 1)) drop-shadow(0 0 20px rgba(255, 255, 0, 0.8)) drop-shadow(0 0 30px rgba(255, 255, 0, 0.6))',
                    }}
                  />
                  <span className="group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors duration-300">Contact</span>
                </span>
                <span 
                  className="absolute inset-0 bg-yellow-400/30 dark:bg-yellow-400/40 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-all duration-300"
                  style={{
                    boxShadow: '0 0 30px rgba(255, 255, 0, 0.8), 0 0 60px rgba(255, 255, 0, 0.5), inset 0 0 20px rgba(255, 255, 0, 0.3)'
                  }}
                />
              </Link>
            </nav>
          </div>
          )}
        </div>

        {/* Menu from 3-line icon (all pages) – visible on all screen sizes - Hidden on auth pages */}
        {!isAuthPage && menuOpen && (
          <>
            {/* Backdrop overlay */}
            <div 
              className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute left-0 right-0 top-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-xl z-50">
              <div className="px-3 sm:px-4 py-3 sm:py-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <nav className="space-y-1">
                <Link
                  href="/"
                  className="block py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/collections/catalog"
                  className="block py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Catalog
                </Link>
                {mounted && currentAdmin && (
                  <Link
                    href="/dashboard"
                    className="block py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  href="/collections/gentlemans-reserve"
                  className="block py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Featured Collection
                </Link>
                <Link
                  href="/collections/products"
                  className="block py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  All Lights
                </Link>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                <Link
                  href="/pages/contact"
                  className="block py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact Us
                </Link>
                {mounted && currentAdmin ? (
                  <>
                    <div className="px-3 sm:px-4 py-2 border-b border-gray-200 dark:border-gray-700 mb-2">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Admin
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {currentAdmin.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="block py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        <FiShoppingCart size={18} />
                        <span>Dashboard</span>
                      </div>
                    </Link>
                  </>
                ) : mounted && user ? (
                  <>
                    <div className="px-3 sm:px-4 py-2 border-b border-gray-200 dark:border-gray-700 mb-2">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/account/orders"
                      className="block py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        <FiShoppingCart size={18} />
                        <span>My Orders</span>
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setMenuOpen(false)
                      }}
                      className="w-full flex items-center gap-2 py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition text-red-600 dark:text-red-400"
                    >
                      <FiLogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/account/login"
                      className="block py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/account/signup"
                      className="block py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-800 dark:text-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </>
                )}
                <Link
                  href="/cart"
                  className="flex items-center gap-2 py-2.5 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-medium hover:bg-yellow-100 dark:hover:bg-yellow-900/30 rounded-lg transition text-gray-800 dark:text-gray-100 bg-yellow-50 dark:bg-yellow-900/20"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiShoppingCart size={18} className="flex-shrink-0" />
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full min-w-[24px] h-6 flex items-center justify-center px-1.5">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </Link>
              </nav>
            </div>
          </div>
          </>
        )}

        {/* Search Dialog */}
        {searchOpen && (
          <>
            {/* Backdrop overlay */}
            <div 
              className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40"
              onClick={() => setSearchOpen(false)}
            />
            <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-xl z-50 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <div className="max-w-7xl mx-auto p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setSearchOpen(false)
                    setSearchQuery('')
                  }}
                  className="p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-gray-900 dark:text-gray-100 flex-shrink-0"
                >
                  <FiX size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
              
              {/* Search Results */}
              {searchQuery.trim() !== '' && (
                <div className="mt-3 sm:mt-4">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                    {filteredProducts.length > 0 
                      ? `Found ${filteredProducts.length} product${filteredProducts.length > 1 ? 's' : ''}`
                      : 'No products found'}
                  </p>
                  {filteredProducts.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                      {filteredProducts.map((product) => (
                        <div key={product.id} onClick={() => setSearchOpen(false)}>
                          <ProductCard
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            originalPrice={product.originalPrice}
                            image={product.image}
                            slug={product.slug}
                            onSale={product.onSale}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Show all products when search is empty */}
              {searchQuery.trim() === '' && (
                <div className="mt-3 sm:mt-4">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                    All Products ({products.length})
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                    {products.slice(0, 10).map((product) => (
                      <div key={product.id} onClick={() => setSearchOpen(false)}>
                        <ProductCard
                          id={product.id}
                          name={product.name}
                          price={product.price}
                          originalPrice={product.originalPrice}
                          image={product.image}
                          slug={product.slug}
                          onSale={product.onSale}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              </div>
            </div>
          </>
        )}
      </header>
    </>
  )
}


