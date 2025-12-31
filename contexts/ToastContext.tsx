'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Toast {
  id: string
  message: string
  type?: 'success' | 'error' | 'info'
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    if (!message) return
    
    console.log('🔔 Toast called:', { message, type })
    
    const id = Math.random().toString(36).substring(7)
    const newToast: Toast = { id, message, type }
    
    setToasts((prev) => {
      console.log('📝 Adding toast to state:', { id, message, type, totalToasts: prev.length + 1 })
      // Remove any existing toasts to prevent stacking
      return [newToast]
    })

    // Auto remove after 1 second
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 1000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {mounted && typeof window !== 'undefined' && (
        <div 
          className="fixed top-1/2 right-4 -translate-y-1/2 z-[100] flex flex-col gap-3 pointer-events-none"
          style={{
            maxWidth: 'calc(100vw - 2rem)',
          }}
        >
          {toasts.map((toast) => {
            console.log('🎨 Rendering toast:', toast.message, toast.type)
            return <ToastNotification key={toast.id} toast={toast} />
          })}
        </div>
      )}
    </ToastContext.Provider>
  )
}

function ToastNotification({ toast }: { toast: Toast }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [toast.id])

  const bgColor = {
    success: '#22c55e', // green-500
    error: '#ef4444', // red-500
    info: '#3b82f6', // blue-500
  }[toast.type || 'success']

  if (!isVisible) return null

  return (
    <div
      className="text-white px-6 py-4 rounded-md shadow-xl animate-slide-in-right flex items-center justify-between min-w-[320px] max-w-[420px] relative overflow-hidden pointer-events-auto z-[10000]"
      style={{ 
        backgroundColor: bgColor,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* Message */}
      <div className="flex-1">
        <p className="font-medium text-base text-white leading-snug">{toast.message}</p>
      </div>
      
      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        className="ml-4 flex-shrink-0 w-6 h-6 bg-white/25 hover:bg-white/35 rounded-sm flex items-center justify-center transition-all duration-150 cursor-pointer"
        aria-label="Close"
      >
        <span className="text-white text-lg font-light leading-none">×</span>
      </button>
    </div>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

