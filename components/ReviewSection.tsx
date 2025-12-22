'use client'

import { FiStar } from 'react-icons/fi'

const reviews = [
  {
    id: 1,
    name: 'Ahmed Khan',
    rating: 5,
    comment: 'Amazing fragrances! The quality is outstanding and the scents last all day. Highly recommended!',
    product: 'ORCHID DE VANILLE',
  },
  {
    id: 2,
    name: 'Fatima Ali',
    rating: 5,
    comment: 'Best perfume collection I have ever tried. The packaging is beautiful and the fragrances are luxurious.',
    product: 'ELYSIAN FIELDS',
  },
  {
    id: 3,
    name: 'Hassan Malik',
    rating: 5,
    comment: 'Great value for money. The scents are premium quality and delivery was super fast. Will order again!',
    product: 'Killer Impre ed by Tuxedo YSL',
  },
  {
    id: 4,
    name: 'Sara Ahmed',
    rating: 5,
    comment: 'Love the variety of scents available. Each one is unique and long-lasting. Perfect for gifting!',
    product: 'FLORAL VALLEY IMPRESSED BY GUCCI FLORA',
  },
]

export default function ReviewSection() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-gray-900 dark:text-gray-100">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="text-yellow-400 fill-yellow-400"
                    size={18}
                    style={{ width: '18px', height: '18px' }}
                  />
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 italic">"{review.comment}"</p>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-gray-100">{review.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{review.product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

