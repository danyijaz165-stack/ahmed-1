'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to regular login page
    router.push('/account/login')
  }, [router])
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Redirecting to login page...</p>
      </div>
    </div>
  )
}
