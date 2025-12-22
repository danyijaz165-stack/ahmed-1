'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface FlyingCartContextType {
  triggerAnimation: (image: string, fromButton: HTMLElement | null) => void
  cartIconRef: HTMLElement | null
  setCartIconRef: (element: HTMLElement | null) => void
}

const FlyingCartContext = createContext<FlyingCartContextType | undefined>(undefined)

export function FlyingCartProvider({ children }: { children: ReactNode }) {
  const [cartIconRef, setCartIconRef] = useState<HTMLElement | null>(null)

  const triggerAnimation = (image: string, fromButton: HTMLElement | null) => {
    if (!fromButton || !cartIconRef) return

    const fromRect = fromButton.getBoundingClientRect()
    const toRect = cartIconRef.getBoundingClientRect()

    const animation = document.createElement('div')
    animation.style.position = 'fixed'
    animation.style.left = `${fromRect.left + fromRect.width / 2}px`
    animation.style.top = `${fromRect.top + fromRect.height / 2}px`
    animation.style.width = '80px'
    animation.style.height = '80px'
    animation.style.zIndex = '99999'
    animation.style.pointerEvents = 'none'
    animation.style.borderRadius = '12px'
    animation.style.overflow = 'hidden'
    animation.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.5)'
    animation.style.transform = 'translate(-50%, -50%) scale(1)'
    animation.style.opacity = '1'
    animation.style.backgroundColor = '#f3f4f6'
    animation.style.border = '2px solid #fff'

    const img = document.createElement('img')
    img.src = image
    img.style.width = '100%'
    img.style.height = '100%'
    img.style.objectFit = 'cover'
    img.style.display = 'block'
    img.crossOrigin = 'anonymous'
    
    // Handle image load
    img.onload = () => {
      animation.appendChild(img)
      document.body.appendChild(animation)

      // Animate to cart after image loads
      requestAnimationFrame(() => {
        const finalX = toRect.left + toRect.width / 2
        const finalY = toRect.top + toRect.height / 2
        
        animation.style.transition = 'all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        animation.style.left = `${finalX}px`
        animation.style.top = `${finalY}px`
        animation.style.transform = 'translate(-50%, -50%) scale(0.3)'
        animation.style.opacity = '0.8'
      })
    }

    img.onerror = () => {
      // If image fails to load, still show animation with a placeholder
      const placeholder = document.createElement('div')
      placeholder.style.width = '100%'
      placeholder.style.height = '100%'
      placeholder.style.backgroundColor = '#e5e7eb'
      placeholder.style.display = 'flex'
      placeholder.style.alignItems = 'center'
      placeholder.style.justifyContent = 'center'
      placeholder.style.fontSize = '24px'
      placeholder.textContent = '📦'
      animation.appendChild(placeholder)
      document.body.appendChild(animation)

      requestAnimationFrame(() => {
        const finalX = toRect.left + toRect.width / 2
        const finalY = toRect.top + toRect.height / 2
        
        animation.style.transition = 'all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        animation.style.left = `${finalX}px`
        animation.style.top = `${finalY}px`
        animation.style.transform = 'translate(-50%, -50%) scale(0.3)'
        animation.style.opacity = '0.8'
      })
    }

    // Fallback: if image is already cached, it might not trigger onload
    if (img.complete) {
      animation.appendChild(img)
      document.body.appendChild(animation)

      requestAnimationFrame(() => {
        const finalX = toRect.left + toRect.width / 2
        const finalY = toRect.top + toRect.height / 2
        
        animation.style.transition = 'all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        animation.style.left = `${finalX}px`
        animation.style.top = `${finalY}px`
        animation.style.transform = 'translate(-50%, -50%) scale(0.3)'
        animation.style.opacity = '0.8'
      })
    }

    // Cleanup
    setTimeout(() => {
      if (document.body.contains(animation)) {
        document.body.removeChild(animation)
      }
    }, 800)
  }

  return (
    <FlyingCartContext.Provider value={{ triggerAnimation, cartIconRef, setCartIconRef }}>
      {children}
    </FlyingCartContext.Provider>
  )
}

export function useFlyingCart() {
  const context = useContext(FlyingCartContext)
  if (!context) {
    throw new Error('useFlyingCart must be used within FlyingCartProvider')
  }
  return context
}

