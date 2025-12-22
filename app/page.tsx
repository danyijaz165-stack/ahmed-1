import AnnouncementBar from '@/components/AnnouncementBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import ProductSlider from '@/components/ProductSlider'
import ReviewSection from '@/components/ReviewSection'
import { products } from '@/data/products'
import Link from 'next/link'

export default function Home() {
  const gentlemanReserve = products.filter(
    (p) => p.category === "gentleman's-reserve"
  )
  const allProducts = products.filter((p) => p.category === 'products')

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <AnnouncementBar />
      <Header />

      <main className="flex-grow">
        {/* Hero Section with Sliding Images */}
        <HeroSection />

        {/* Hero Collection Sections */}
        <section className="py-8 sm:py-12 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <Link href="/collections/gentlemans-reserve" className="group">
                <div className="relative h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/3945673/pexels-photo-3945673.jpeg?auto=compress&cs=tinysrgb&w=750"
                    alt="Living Room Lights"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Living Room Lights</h3>
                  </div>
                </div>
              </Link>
              <Link href="/collections/womens-reserve" className="group">
                <div className="relative h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg?auto=compress&cs=tinysrgb&w=750"
                    alt="Bedroom Lamps"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Bedroom Lamps</h3>
                  </div>
                </div>
              </Link>
              <Link href="/collections/timeless-elixir" className="group sm:col-span-2 md:col-span-1">
                <div className="relative h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/1517355/pexels-photo-1517355.jpeg?auto=compress&cs=tinysrgb&w=750"
                    alt="Outdoor Lights"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold">Outdoor Lights</h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-8 sm:py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">ABOUT ECOLIGHT</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed px-2">
              Welcome to Ecolight, your premier destination for modern, energy-efficient lighting solutions. 
              We provide high-quality LED bulbs, ceiling lights, track lights, and decorative lamps for homes, 
              shops, and offices. Our priority is delivering bright illumination, lower electricity bills, and 
              exceptional durability, so you can transform your space beautifully without any hassle.
            </p>
            <Link
              href="/pages/contact"
              className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-black text-white hover:bg-gray-800 transition font-semibold rounded-md text-sm sm:text-base"
            >
              CONTACT US
            </Link>
          </div>
        </section>

        {/* Review Section */}
        <ReviewSection />

        {/* Gentleman's Reserve Collection */}
        <ProductSlider
          title="Featured Ecolight Collection"
          products={gentlemanReserve}
          viewAllLink="/collections/gentlemans-reserve"
        />

        {/* All Products Collection */}
        <ProductSlider
          title="All Lights"
          products={allProducts}
          viewAllLink="/collections/products"
        />

        {/* Gallery Section */}
        <section className="py-8 sm:py-12 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
              <img
                src="https://images.pexels.com/photos/3288108/pexels-photo-3288108.jpeg?auto=compress&cs=tinysrgb&w=500"
                alt="Pendant lights"
                className="aspect-square object-cover rounded hover:scale-105 transition-transform duration-300"
              />
              <img
                src="https://images.pexels.com/photos/132340/pexels-photo-132340.jpeg?auto=compress&cs=tinysrgb&w=500"
                alt="Office lighting"
                className="aspect-square object-cover rounded hover:scale-105 transition-transform duration-300"
              />
              <img
                src="https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=500"
                alt="Decorative lamps"
                className="aspect-square object-cover rounded hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="text-center">
              <Link
                href="https://instagram.com"
                target="_blank"
                className="inline-block px-4 sm:px-6 py-2 bg-black text-white hover:bg-gray-800 transition rounded-md text-sm sm:text-base"
              >
                FOLLOW US
              </Link>
            </div>
          </div>
        </section>

        {/* Promo Section */}
        <section className="py-8 sm:py-12 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">SAVE ENERGY, SHINE BRIGHT</h2>
            <p className="mb-4 sm:mb-6 text-gray-200 text-sm sm:text-base px-4">
              Ecolight LEDs save up to 80% on electricity bills – perfect for homes and businesses.
            </p>
            <Link
              href="/collections/winter"
              className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-white text-black hover:bg-gray-200 transition font-semibold rounded-md text-sm sm:text-base"
            >
              SHOP NOW
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}


