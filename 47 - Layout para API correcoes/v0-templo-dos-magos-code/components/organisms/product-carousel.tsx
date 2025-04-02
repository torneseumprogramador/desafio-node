"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import type { Product } from "@/types"
import { ProductCard } from "@/components/molecules/product-card"

interface ProductCarouselProps {
  products: Product[]
  onAddToCart: (productName: string) => void
}

export default function ProductCarousel({ products, onAddToCart }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isMobile = useMobile()
  const carouselRef = useRef<HTMLDivElement>(null)

  const itemsPerPage = isMobile ? 1 : 3
  const totalPages = Math.ceil(products.length / itemsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages)
  }

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentIndex])

  const visibleProducts = []
  for (let i = 0; i < itemsPerPage; i++) {
    const index = (currentIndex * itemsPerPage + i) % products.length
    visibleProducts.push(products[index])
  }

  return (
    <div className="relative">
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="bg-purple-800/80 hover:bg-purple-700 text-yellow-400 rounded-full h-10 w-10"
        >
          <ChevronLeft size={24} />
        </Button>
      </div>

      <div ref={carouselRef} className="flex gap-4 overflow-hidden py-4 px-2">
        {visibleProducts.map((product, index) => (
          <ProductCard
            key={`${product.id}-${index}`}
            product={product}
            onAddToCart={onAddToCart}
            className={cn(
              "w-full transition-all duration-500 ease-out transform",
              index === 1 && !isMobile ? "scale-105 z-10" : "scale-100",
            )}
          />
        ))}
      </div>

      <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="bg-purple-800/80 hover:bg-purple-700 text-yellow-400 rounded-full h-10 w-10"
        >
          <ChevronRight size={24} />
        </Button>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full transition-all ${
              currentIndex === index ? "bg-yellow-400 w-6" : "bg-purple-600 hover:bg-purple-500"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

