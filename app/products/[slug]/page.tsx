import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProductBySlug, products } from '@/data/products'
import AnnouncementBar from '@/components/AnnouncementBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import AddToCartButton from '@/components/AddToCartButton'

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{product.name}</h1>
              
              <div className="mb-6">
                {product.originalPrice && (
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      PKR {product.price.toLocaleString()}
                    </span>
                    <span className="text-xl text-gray-400 dark:text-gray-500 line-through">
                      PKR {product.originalPrice.toLocaleString()}
                    </span>
                    {product.onSale && (
                      <span className="bg-red-600 text-white px-2 py-1 text-sm font-semibold">
                        Sale
                      </span>
                    )}
                  </div>
                )}
                {!product.originalPrice && (
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    From PKR {product.price.toLocaleString()}
                  </div>
                )}
                <p className="text-sm text-gray-500 dark:text-gray-400">Unit price / per</p>
              </div>

              {product.description && (
                <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
              )}

              <div className="mb-6">
                <Link
                  href="/pages/shipping-policy"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Shipping
                </Link>
              </div>

              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

