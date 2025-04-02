"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/products"

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

interface ProductCardProps {
  product: Product
  onAddToCart: (productName: string) => void
  className?: string
}

function ProductCard({ product, onAddToCart, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const cardColors: Record<string, string> = {
    "Carta Mágica": "from-cyan-500 to-blue-600 border-cyan-300",
    "Kit de Cartas": "from-blue-500 to-indigo-600 border-blue-300",
    "Jogo de Tabuleiro": "from-purple-500 to-pink-600 border-purple-300",
    "Pacote de Cartas": "from-green-500 to-emerald-600 border-green-300",
    "Poção Mágica": "from-orange-500 to-amber-600 border-orange-300",
  }

  const colorClass = cardColors[product.name] || "from-cyan-500 to-blue-600 border-cyan-300"

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-xl shadow-xl transition-all duration-300 flex-1 min-w-0",
        `bg-gradient-to-br ${colorClass}`,
        isHovered && "shadow-2xl shadow-cyan-400/30 scale-[1.02]",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Magical sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-yellow-300 rounded-full animate-ping`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="p-4 flex flex-col items-center">
        <div className="relative w-full h-48 mb-4">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-yellow-400/20 rounded-lg" />
          <Image
            src={`/placeholder.svg?height=200&width=200&text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>

        <h3 className="text-xl font-bold text-white mb-2 text-center">{product.name}</h3>
        <p className="text-2xl font-bold text-yellow-300 mb-4">R${product.price.toFixed(2)}</p>

        <Button
          className="bg-orange-500 hover:bg-orange-400 text-black font-bold py-2 px-6 rounded-lg w-full transition-all duration-300 hover:scale-105 border-2 border-yellow-300/50"
          onClick={() => onAddToCart(product.name)}
        >
          ADICIONAR
        </Button>
      </div>

      {/* Glow effect */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 opacity-0 transition-opacity duration-300",
          isHovered && "opacity-30",
        )}
      />
    </Card>
  )
}

