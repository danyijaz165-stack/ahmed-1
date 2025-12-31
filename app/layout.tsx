import type { Metadata } from 'next'
import './globals.css'
import { ToastProvider } from '@/contexts/ToastContext'
import { CartProvider } from '@/contexts/CartContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { FlyingCartProvider } from '@/contexts/FlyingCartContext'
import ChatbotWidget from '@/components/ChatbotWidget'

export const metadata: Metadata = {
  title: 'Ecolight',
  description:
    'Ecolight – premium energy-efficient lighting for homes and offices. Shop LED bulbs, ceiling lights, and decorative lighting to brighten every space.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
        <FlyingCartProvider>
          <CartProvider>
            <ToastProvider>
              <ThemeProvider>
                {children}
                <ChatbotWidget />
              </ThemeProvider>
            </ToastProvider>
          </CartProvider>
        </FlyingCartProvider>
      </body>
    </html>
  )
}

