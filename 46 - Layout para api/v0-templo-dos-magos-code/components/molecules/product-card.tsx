"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
  onAddToCart: (productName: string) => void
  className?: string
}

export function ProductCard({ product, onAddToCart, className }: ProductCardProps) {
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
          <Image src={product.imageUrl || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
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

