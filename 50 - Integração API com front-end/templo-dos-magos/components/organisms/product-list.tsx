"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"
import type { Product } from "@/types"
import { ProductCard } from "@/components/molecules/product-card"

interface ProductCarouselProps {
  products: Product[]
  onAddToCart: (productName: string) => void
}

export default function ProductCarousel({ products, onAddToCart }: ProductCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={carouselRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-4 px-4 mt-8">
      {products.length > 0 ? (
        products.map((product, index) => 
          <ProductCard
            key={`${product.id}-${index}`}
            product={product}
            onAddToCart={onAddToCart}
            className={cn(
              "transition-all duration-500 ease-out transform scale-100 hover:scale-105 z-10",
            )}
          />
        )
      ) : (
        <div className="col-span-full flex items-center justify-center py-8">
          <h1 className="text-2xl font-bold text-yellow-400 mr-3">Carregando</h1>
          <div className="flex space-x-3">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
    </div>
  )
}
