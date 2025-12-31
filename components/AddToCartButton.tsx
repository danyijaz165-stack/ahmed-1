'use client'

import { useState, useRef, useEffect } from 'react'
import { Product } from '@/data/products'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'
import { useFlyingCart } from '@/contexts/FlyingCartContext'
import BuyNowModal from './BuyNowModal'

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [isBuyNowModalOpen, setIsBuyNowModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const { triggerAnimation } = useFlyingCart()
  const addToCartButtonRef = useRef<HTMLButtonElement>(null)
  const buyNowButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = sessionStorage.getItem('user')
      setIsLoggedIn(!!user)
      
      // Listen for login/logout events
      const handleStorageChange = () => {
        const user = sessionStorage.getItem('user')
        setIsLoggedIn(!!user)
      }
      
      window.addEventListener('storage', handleStorageChange)
      window.addEventListener('login', handleStorageChange)
      window.addEventListener('logout', handleStorageChange)
      
      return () => {
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('login', handleStorageChange)
        window.removeEventListener('logout', handleStorageChange)
      }
    }
  }, [])

  const handleAddToCart = async () => {
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      const user = sessionStorage.getItem('user')
      if (!user) {
        showToast('Login First', 'error')
        return
      }
    }

    // Trigger flying animation
    if (addToCartButtonRef.current) {
      triggerAnimation(product.image, addToCartButtonRef.current)
    }
    
    // Small delay before adding to cart
    setTimeout(async () => {
      try {
        for (let i = 0; i < quantity; i++) {
          await addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
          })
        }
        showToast(`${quantity} x ${product.name} added to cart!`, 'success')
      } catch (error: any) {
        showToast(error.message || 'Failed to add to cart', 'error')
      }
    }, 100)
  }

  const handleBuyNow = () => {
    // Open the buy now modal directly without animation
    setIsBuyNowModalOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label className="font-semibold text-gray-900 dark:text-gray-100">Quantity:</label>
        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 text-center border-0 focus:outline-none bg-transparent text-gray-900 dark:text-gray-100"
            min="1"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex space-x-4">
        {isLoggedIn && (
          <button
            ref={addToCartButtonRef}
            onClick={handleAddToCart}
            className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 px-6 hover:bg-gray-800 dark:hover:bg-gray-200 transition font-semibold"
          >
            Add to cart
          </button>
        )}
        <button 
          ref={buyNowButtonRef}
          onClick={handleBuyNow}
          className={isLoggedIn ? "flex-1 bg-gray-200 dark:bg-gray-700 text-black dark:text-white py-3 px-6 hover:bg-gray-300 dark:hover:bg-gray-600 transition font-semibold" : "flex-1 bg-black dark:bg-white text-white dark:text-black py-3 px-6 hover:bg-gray-800 dark:hover:bg-gray-200 transition font-semibold"}
        >
          Buy it now
        </button>
      </div>

      <BuyNowModal
        product={product}
        quantity={quantity}
        isOpen={isBuyNowModalOpen}
        onClose={() => setIsBuyNowModalOpen(false)}
      />
    </div>
  )
}


