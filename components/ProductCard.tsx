'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { useCart } from '@/contexts/CartContext'
import { useToast } from '@/contexts/ToastContext'

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  slug: string
  onSale?: boolean
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  slug,
  onSale = false,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({ id, name, price, image })
    showToast(`${name} added to cart!`, 'success')
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    handleAddToCart(e)
    window.location.href = '/cart'
  }

  return (
    <div 
      className="group relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-shrink-0 relative aspect-square w-full overflow-hidden">
        <Link 
          href={`/products/${slug}`} 
          className={`absolute inset-0 z-10 ${isHovered ? 'pointer-events-none' : ''}`}
        >
          <div className="relative w-full h-full bg-gray-100">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-500"
              style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
            {onSale && (
              <span className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 text-xs font-bold rounded-full z-20">
                Sale
              </span>
            )}
          </div>
        </Link>
        
        {/* Hover Overlay with Buttons */}
        {isHovered && (
          <div 
            className="absolute inset-0 bg-black/70 flex items-center justify-center z-30"
            style={{ pointerEvents: 'auto' }}
            onClick={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-2 sm:gap-3 px-3 sm:px-4 w-full z-40">
              <button
                onClick={handleAddToCart}
                className="bg-white text-black py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 w-full shadow-xl transform hover:scale-105 text-sm sm:text-base"
              >
                <FiShoppingCart size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-black text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold hover:bg-gray-800 transition-all w-full shadow-xl transform hover:scale-105 text-sm sm:text-base"
              >
                Buy Now
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3 sm:p-4 flex flex-col flex-grow text-gray-900 dark:text-gray-100">
        <Link href={`/products/${slug}`}>
          <h3 className="font-semibold mb-2 hover:text-gray-600 dark:hover:text-gray-300 transition line-clamp-2 h-12 sm:h-14 text-sm sm:text-base">
            {name}
          </h3>
        </Link>
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1 min-h-[28px] sm:h-7">
          {originalPrice && (
            <span className="text-gray-400 dark:text-gray-400 line-through text-xs sm:text-sm">
              PKR {originalPrice.toLocaleString()}
            </span>
          )}
          <span className="font-bold text-base sm:text-lg text-gray-900 dark:text-gray-100">
            {originalPrice ? 'PKR ' : 'From PKR '}
            {price.toLocaleString()}
          </span>
        </div>
        <div className="h-4 sm:h-5">
          {originalPrice && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Unit price / per
            </p>
          )}
        </div>
      </div>
    </div>
  )
}


