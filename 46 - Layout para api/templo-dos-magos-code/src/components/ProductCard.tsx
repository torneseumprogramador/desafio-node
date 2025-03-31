'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { Product } from '@/data/products'

type ProductCardProps = Product

export default function ProductCard({ id, name, price, imageUrl, description, category }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem({ id, name, price, imageUrl, description, category })
    
    // Feedback visual
    setTimeout(() => {
      setIsAdding(false)
    }, 500)
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        relative bg-primary rounded-2xl overflow-hidden
        transition-transform duration-300
        ${isHovered ? 'scale-105' : ''}
      `}>
        {/* Efeito de brilho */}
        <div className={`
          absolute inset-0 bg-gradient-to-br 
          from-accent-cyan/10 via-transparent to-accent-purple/10
          ${isHovered ? 'animate-pulse' : ''}
        `} />

        {/* Imagem do Produto */}
        <div className="relative h-40 w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent z-10" />
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
          />
        </div>

        {/* Informações do Produto */}
        <div className="p-4">
          <h3 className="text-accent-yellow font-black mb-1 line-clamp-1">{name}</h3>
          <p className="text-gray-300 text-xs mb-3 line-clamp-2">{description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-accent-cyan font-black text-lg">
              R$ {price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`
                px-4 py-1.5 rounded-lg text-sm font-black
                ${isAdding ? 'bg-accent-yellow/50' : 'bg-accent-yellow hover:bg-accent-yellow/80'}
                text-primary
                transition-all
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {isAdding ? 'Adicionado!' : 'ADICIONAR'}
            </button>
          </div>
        </div>

        {/* Efeitos de partículas */}
        {isHovered && (
          <>
            <div className="absolute top-2 right-2 w-2 h-2 bg-accent-yellow rounded-full animate-ping" />
            <div className="absolute top-4 left-2 w-1.5 h-1.5 bg-accent-cyan rounded-full animate-ping delay-100" />
            <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-accent-purple rounded-full animate-ping delay-200" />
          </>
        )}
      </div>
    </div>
  )
} 