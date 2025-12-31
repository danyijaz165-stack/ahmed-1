// API helper functions for frontend

const API_BASE = '/api'

// Get user ID from session (for now using guest or stored user)
function getUserId(): string {
  if (typeof window === 'undefined') return 'guest'
  
  // Try to get from session storage (not localStorage)
  const user = sessionStorage.getItem('user')
  if (user) {
    try {
      const userData = JSON.parse(user)
      return userData.id || 'guest'
    } catch {
      return 'guest'
    }
  }
  return 'guest'
}

// Auth API
export const authAPI = {
  async signup(name: string, email: string, password: string) {
    try {
      // Validate inputs
      if (!name || !name.trim()) {
        throw new Error('Name is required')
      }
      if (!email || !email.trim()) {
        throw new Error('Email is required')
      }
      if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }

      const response = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          name: name.trim(), 
          email: email.trim().toLowerCase(), 
          password 
        }),
      })
      
      // Check if response is ok before parsing
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        throw new Error(`Server error: ${text || response.statusText}`)
      }
      
      const data = await response.json()
      
      if (!response.ok) {
        console.error('Signup API error:', { status: response.status, data })
        // Preserve the exact error message from API
        const errorMsg = data.error || `Signup failed (${response.status})`
        throw new Error(errorMsg)
      }
      
      return data
    } catch (error: any) {
      console.error('Signup fetch error:', error)
      if (error.message) {
        throw error
      }
      throw new Error('Network error. Please check your internet connection and try again.')
    }
  },

  async login(email: string, password: string) {
    try {
      // Validate inputs
      if (!email || !email.trim()) {
        throw new Error('Email is required')
      }
      if (!password) {
        throw new Error('Password is required')
      }

      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      })
      
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        throw new Error(`Server error: ${text || response.statusText}`)
      }
      
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || `Login failed (${response.status})`)
      }
      return data
    } catch (error: any) {
      if (error.message) {
        throw error
      }
      throw new Error('Network error. Please check your internet connection and try again.')
    }
  },

  async logout() {
    try {
      const response = await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      
      // Clear sessionStorage on client side
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('user')
        // Dispatch events for component updates
        window.dispatchEvent(new Event('storage'))
        window.dispatchEvent(new CustomEvent('logout'))
      }
      
      return { message: 'Logged out successfully' }
    } catch (error: any) {
      // Even if API fails, clear sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('user')
        // Dispatch events for component updates
        window.dispatchEvent(new Event('storage'))
        window.dispatchEvent(new CustomEvent('logout'))
      }
      return { message: 'Logged out successfully' }
    }
  },
}

// Cart API
export const cartAPI = {
  async getCart() {
    const response = await fetch(`${API_BASE}/cart`, {
      headers: { 'x-user-id': getUserId() },
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Failed to get cart')
    return data.cart || []
  },

  async addToCart(item: { id: string; name: string; price: number; image: string }) {
    const response = await fetch(`${API_BASE}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': getUserId(),
      },
      body: JSON.stringify({ item }),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Failed to add to cart')
    return data.cart || []
  },

  async updateCart(items: any[]) {
    const response = await fetch(`${API_BASE}/cart`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': getUserId(),
      },
      body: JSON.stringify({ items }),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Failed to update cart')
    return data.cart || []
  },

  async clearCart() {
    const response = await fetch(`${API_BASE}/cart`, {
      method: 'DELETE',
      headers: { 'x-user-id': getUserId() },
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Failed to clear cart')
    return []
  },
}

// Get admin status
function isAdmin(): boolean {
  if (typeof window === 'undefined') return false
  const admin = sessionStorage.getItem('admin')
  return admin !== null
}

// Orders API
export const ordersAPI = {
  async getOrders() {
    const headers: Record<string, string> = { 'x-user-id': getUserId() }
    if (isAdmin()) {
      headers['x-is-admin'] = 'true'
    }
    
    const response = await fetch(`${API_BASE}/orders`, {
      headers,
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Failed to get orders')
    return data.orders || []
  },

  async createOrder(orderData: {
    items: any[]
    customer: any
    total: number
  }) {
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': getUserId(),
      },
      body: JSON.stringify(orderData),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Failed to create order')
    return data.order
  },

  async getOrder(id: string) {
    const response = await fetch(`${API_BASE}/orders/${id}`)
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Failed to get order')
    return data.order
  },
}

