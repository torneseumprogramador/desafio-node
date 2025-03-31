'use client'

import { useCartStore } from '@/store/cartStore'
import { products } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import Sidebar from '@/components/Sidebar'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'

export default function Home() {
  const totalItems = useCartStore((state) => 
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 py-4">
        <Header />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Banner */}
            <div className="relative w-full h-48 mb-8 rounded-2xl overflow-hidden">
              <Image
                src="/images/banner.jpg"
                alt="Banner Templo dos Magos"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h1 className="text-3xl font-black mb-2">
                  <span className="text-accent-yellow">TEMPLO</span>{' '}
                  <span className="text-accent-cyan">DOS MAGOS</span>
                </h1>
                <p className="text-gray-200 text-sm">
                  Descubra itens mágicos únicos e poderosos para suas aventuras
                </p>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Fixed Cart Button */}
      {totalItems > 0 && (
        <Link
          href="/carrinho"
          className="
            fixed bottom-8 right-8
            bg-primary text-white
            p-4 rounded-full
            transform transition-all duration-300
            hover:scale-110 hover:shadow-lg
            flex items-center gap-2
          "
        >
          <ShoppingCart className="w-6 h-6 text-accent-yellow" />
          <span className="font-bold text-accent-cyan">{totalItems}</span>
        </Link>
      )}
    </div>
  )
} 