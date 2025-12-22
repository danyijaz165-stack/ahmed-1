'use client'

import { useState } from 'react'
import { FiMessageCircle, FiSend, FiX } from 'react-icons/fi'

interface ChatMessage {
  id: number
  from: 'user' | 'bot'
  text: string
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      from: 'bot',
      text: 'Hello! 👋 Welcome to Ecolight. I\'m here to help you with lighting products, prices, shipping, and more. How can I assist you today?',
    },
  ])

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase().trim()

    // Greetings
    if (message.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
      return 'Hello! Welcome to Ecolight. How can I help you today?'
    }

    // Products
    if (message.match(/(product|light|led|bulb|lamp|chandelier|ceiling|wall|outdoor|indoor)/)) {
      if (message.match(/(price|cost|how much|pkr)/)) {
        return 'Our lighting products range from PKR 1,800 to PKR 7,000. LED panels start at PKR 2,500, chandeliers from PKR 3,000, and decorative lamps from PKR 1,999. Check our catalog for detailed pricing!'
      }
      return 'We offer a wide range of lighting products including LED panels, chandeliers, pendant lights, track lights, wall sconces, floor lamps, table lamps, outdoor lights, and LED bulbs. Browse our catalog to see all products!'
    }

    // Shipping/Delivery
    if (message.match(/(shipping|delivery|deliver|ship|free shipping|shipping cost|when will|how long)/)) {
      return 'We offer FREE shipping on all orders over PKR 5,000! For orders below PKR 5,000, shipping charges are calculated at checkout. Delivery typically takes 3-5 business days within Pakistan.'
    }

    // Payment
    if (message.match(/(payment|pay|cash|card|bank transfer|how to pay|payment method)/)) {
      return 'We accept Cash on Delivery (COD) and Bank Transfer. You can choose your preferred payment method at checkout. All transactions are secure!'
    }

    // Contact
    if (message.match(/(contact|phone|email|address|location|where|reach|get in touch)/)) {
      return 'You can reach us through our Contact page. Fill out the contact form and we\'ll get back to you soon. You can also visit our website for more information!'
    }

    // Returns/Refunds
    if (message.match(/(return|refund|exchange|warranty|guarantee|defective|broken)/)) {
      return 'We offer a return and refund policy. If you receive a defective product, please contact us within 7 days of delivery. Check our Refund Policy page for detailed information.'
    }

    // Discount/Sale
    if (message.match(/(discount|sale|offer|promotion|deal|save|cheap|affordable)/)) {
      return 'We have great deals! Many products are on sale with up to 40% off. Check out our Featured Collection and All Lights sections for special offers. Plus, free shipping on orders over PKR 5,000!'
    }

    // Energy/Quality
    if (message.match(/(energy|efficient|save|bill|quality|durable|long lasting|warranty)/)) {
      return 'All our LED lights are energy-efficient and can save up to 80% on electricity bills! We use high-quality materials for durability and long-lasting performance. Most products come with warranty coverage.'
    }

    // Order status
    if (message.match(/(order|track|status|where is my|when will i receive)/)) {
      return 'To check your order status, please contact us through the Contact page with your order number. We\'ll provide you with the latest tracking information!'
    }

    // Catalog/Collection
    if (message.match(/(catalog|collection|what do you have|show me|browse|view)/)) {
      return 'We have several collections: Featured Collection (premium lighting), All Lights (complete range), and special categories like Living Room Lights, Bedroom Lamps, and Outdoor Lights. Visit our Catalog page to see everything!'
    }

    // Help
    if (message.match(/(help|support|assist|problem|issue|trouble|don't know|confused)/)) {
      return 'I\'m here to help! You can ask me about:\n• Product information and prices\n• Shipping and delivery\n• Payment methods\n• Returns and refunds\n• Energy efficiency\n• Contact information\nWhat would you like to know?'
    }

    // Default response
    return 'Thank you for your message! For specific inquiries about products, orders, or technical support, please visit our Contact page or browse our Catalog. Is there anything else I can help you with?'
  }

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return

    const nextId = messages.length ? messages[messages.length - 1].id + 1 : 1
    const userMessage: ChatMessage = { id: nextId, from: 'user', text: trimmed }

    setMessages((prev) => [...prev, userMessage])
    setInput('')

    const botResponse = getBotResponse(trimmed)
    const reply: ChatMessage = {
      id: nextId + 1,
      from: 'bot',
      text: botResponse,
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, reply])
    }, 600)
  }

  return (
    <>
      {/* Mobile: Full screen overlay when open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <div className="fixed bottom-4 right-4 z-50 md:z-40">
        {isOpen && (
          <div className="mb-3 w-[calc(100vw-2rem)] sm:w-80 md:w-96 h-[calc(100vh-8rem)] sm:h-auto sm:max-h-[600px] md:max-h-[500px] flex flex-col rounded-2xl sm:rounded-2xl shadow-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-black text-white flex-shrink-0">
              <div>
                <p className="font-semibold text-sm sm:text-base">Ecolight Support</p>
                <p className="text-xs text-gray-200">Online • We're here to help</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 sm:p-1 rounded-full hover:bg-white/10 transition"
                aria-label="Close chat"
              >
                <FiX size={18} className="sm:w-4 sm:h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 space-y-2 sm:space-y-3 bg-gray-50 dark:bg-gray-800">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.from === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm break-words ${
                      msg.from === 'user'
                        ? 'bg-black text-white rounded-br-none'
                        : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <form 
              onSubmit={handleSend} 
              className="flex items-center border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 sm:px-3 py-2 sm:py-2.5 flex-shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-transparent text-sm sm:text-base px-2 sm:px-3 py-1.5 sm:py-2 outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
              />
              <button
                type="submit"
                className="ml-1 sm:ml-2 p-2 sm:p-2.5 rounded-full bg-black text-white hover:bg-gray-800 transition flex-shrink-0"
                aria-label="Send message"
              >
                <FiSend size={16} className="sm:w-4 sm:h-4" />
              </button>
            </form>
          </div>
        )}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-xl bg-black text-white hover:bg-gray-800 transition"
          aria-label="Open chat"
        >
          <FiMessageCircle size={18} className="sm:w-5 sm:h-5" />
          <span className="hidden sm:inline text-sm font-medium">Chat with us</span>
        </button>
      </div>
    </>
  )
}


