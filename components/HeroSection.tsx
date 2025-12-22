'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const heroSlides = [
  {
    id: 1,
    image:
      'https://images.pexels.com/photos/5696121/pexels-photo-5696121.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Brighten Your Home',
    subtitle: 'Modern LED ceiling and wall lights',
  },
  {
    id: 2,
    image:
      'https://images.pexels.com/photos/112474/pexels-photo-112474.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Eco-Friendly Lights',
    subtitle: 'Save energy with Ecolight LEDs',
  },
  {
    id: 3,
    image:
      'https://images.pexels.com/photos/45072/pexels-photo-45072.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Style Meets Lighting',
    subtitle: 'Decorative lamps for every room',
  },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000) // Auto-slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  return (
    <section className="relative h-[300px] md:h-[350px] overflow-hidden">
      <div className="relative w-full h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
              unoptimized
            />
            {/* Text Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-2xl md:text-4xl font-bold mb-2">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 sm:p-3 z-10 transition"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={20} className="sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 sm:p-3 z-10 transition"
        aria-label="Next slide"
      >
        <FiChevronRight size={20} className="sm:w-6 sm:h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

