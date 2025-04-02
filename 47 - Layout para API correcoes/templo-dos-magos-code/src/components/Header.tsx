'use client'

import { useCartStore } from '@/store/cartStore'
import { Search, ShoppingCart, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const totalItems = useCartStore((state) => 
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  )

  return (
    <header className="bg-primary rounded-2xl p-4">
      <div className="flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image
              src="/images/mago.png"
              alt="Logo Templo dos Magos"
              fill
              className="object-contain"
            />
          </div>
          <div className="font-black text-lg">
            <span className="text-accent-yellow">TEMPLO</span>{' '}
            <span className="text-accent-cyan">DOS MAGOS</span>
          </div>
        </Link>

        {/* Barra de Busca */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Buscar itens mágicos..."
            className="
              w-full pl-10 pr-4 py-2
              bg-background text-white
              rounded-xl text-sm
              border border-accent-purple/20
              focus:border-accent-yellow
              focus:outline-none
              transition-colors
              placeholder:text-gray-400
            "
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        {/* Ícones */}
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg text-accent-yellow hover:bg-background transition-colors">
            <User className="w-5 h-5" />
          </button>

          <Link
            href="/carrinho"
            className="relative p-2 rounded-lg text-accent-cyan hover:bg-background transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="
                absolute -top-1 -right-1
                w-4 h-4
                bg-accent-yellow text-primary
                rounded-full
                flex items-center justify-center
                text-[10px] font-black
                animate-bounce
              ">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
} 