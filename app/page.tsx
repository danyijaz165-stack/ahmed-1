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
              className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition font-semibold rounded-md text-sm sm:text-base"
            >
              CONTACT US
            </Link>
          </div>
        </section>

        {/* Gentleman's Reserve Collection */}
        <ProductSlider
          title="Featured Ecolight Collection"
          products={gentlemanReserve}
          viewAllLink="/collections/gentlemans-reserve"
        />

        {/* Review Section */}
        <ReviewSection />

        {/* All Products Collection */}
        <ProductSlider
          title="All Lights"
          products={allProducts}
          viewAllLink="/collections/products"
        />

        {/* Instagram Gallery Section */}
        <section className="py-8 sm:py-12 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                Follow Us on Instagram
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                @ecolight • Share your lighting setup with us
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
              <div className="relative group cursor-pointer">
                <img
                  src="https://images.pexels.com/photos/3288108/pexels-photo-3288108.jpeg?auto=compress&cs=tinysrgb&w=500"
                  alt="Pendant lights"
                  className="aspect-square object-cover rounded hover:scale-105 transition-transform duration-300 w-full"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white font-semibold transition-opacity">
                    View on Instagram
                  </span>
                </div>
              </div>
              <div className="relative group cursor-pointer">
                <img
                  src="https://images.pexels.com/photos/132340/pexels-photo-132340.jpeg?auto=compress&cs=tinysrgb&w=500"
                  alt="Office lighting"
                  className="aspect-square object-cover rounded hover:scale-105 transition-transform duration-300 w-full"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white font-semibold transition-opacity">
                    View on Instagram
                  </span>
                </div>
              </div>
              <div className="relative group cursor-pointer">
                <img
                  src="https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=500"
                  alt="Decorative lamps"
                  className="aspect-square object-cover rounded hover:scale-105 transition-transform duration-300 w-full"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white font-semibold transition-opacity">
                    View on Instagram
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition font-semibold rounded-lg text-sm sm:text-base shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
                FOLLOW US ON INSTAGRAM
              </Link>
            </div>
          </div>
        </section>

        {/* Promo Section */}
        <section className="relative py-6 sm:py-8 md:py-10 text-white overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/5696121/pexels-photo-5696121.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80"></div>
            {/* Additional overlay for depth */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4 drop-shadow-lg">
              SAVE ENERGY, SHINE BRIGHT
            </h2>
            <p className="mb-4 sm:mb-5 text-gray-100 text-sm sm:text-base md:text-lg px-4 max-w-2xl mx-auto drop-shadow-md">
              Ecolight LEDs save up to 80% on electricity bills – perfect for homes and businesses.
            </p>
            <Link
              href="/collections/winter"
              className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-white text-black hover:bg-gray-100 transition-all duration-300 font-bold rounded-lg text-sm sm:text-base shadow-2xl hover:shadow-white/20 hover:scale-105 transform"
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


