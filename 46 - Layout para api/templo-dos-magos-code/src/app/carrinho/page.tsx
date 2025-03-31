'use client'

import { useCartStore } from '@/store/cartStore'
import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore()
  
  const totalPrice = items.reduce((total, item) => 
    total + (item.price * item.quantity), 0
  )

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#1A103F] text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-black mb-4">
          <span className="text-[#FFB800]">Seu carrinho</span>{' '}
          <span className="text-[#06B6D4]">está vazio</span>
        </h1>
        <p className="text-gray-300 mb-8">
          Explore nossa coleção de itens mágicos e encontre algo especial!
        </p>
        <Link
          href="/"
          className="
            px-8 py-3 rounded-xl
            bg-[#2D1B69] text-white
            font-black text-lg
            transform transition-all duration-300
            hover:scale-105 hover:shadow-[0_0_20px_rgba(107,33,168,0.5)]
          "
        >
          Voltar às Compras
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1A103F] text-white p-8">
      <h1 className="text-4xl font-black mb-8">
        <span className="text-[#FFB800]">Seu</span>{' '}
        <span className="text-[#06B6D4]">Carrinho</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de Itens */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="
                bg-[#2D1B69] rounded-2xl p-4
                flex items-center gap-4
                transform transition-all duration-300
                hover:shadow-[0_0_20px_rgba(107,33,168,0.5)]
              "
            >
              {/* Imagem do Produto */}
              <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Informações do Produto */}
              <div className="flex-1">
                <h3 className="text-xl font-black text-[#FFB800]">{item.name}</h3>
                <p className="text-gray-300 text-sm mb-2">{item.description}</p>
                <span className="text-[#06B6D4] font-black">
                  R$ {item.price.toFixed(2)}
                </span>
              </div>

              {/* Controles de Quantidade */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="
                    p-2 rounded-lg
                    bg-[#1A103F] text-[#FFB800]
                    hover:bg-[#FFB800] hover:text-[#1A103F]
                    transition-colors duration-200
                  "
                >
                  <Minus size={20} />
                </button>
                
                <span className="font-bold w-8 text-center">
                  {item.quantity}
                </span>
                
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="
                    p-2 rounded-lg
                    bg-[#1A103F] text-[#06B6D4]
                    hover:bg-[#06B6D4] hover:text-[#1A103F]
                    transition-colors duration-200
                  "
                >
                  <Plus size={20} />
                </button>

                <button
                  onClick={() => removeItem(item.id)}
                  className="
                    p-2 rounded-lg
                    bg-[#1A103F] text-red-500
                    hover:bg-red-500 hover:text-[#1A103F]
                    transition-colors duration-200
                    ml-2
                  "
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo do Pedido */}
        <div className="lg:col-span-1">
          <div className="
            bg-[#2D1B69] rounded-2xl p-6
            sticky top-8
            transform transition-all duration-300
            hover:shadow-[0_0_20px_rgba(107,33,168,0.5)]
          ">
            <h2 className="text-2xl font-black mb-6">
              <span className="text-[#FFB800]">Resumo</span>{' '}
              <span className="text-[#06B6D4]">do Pedido</span>
            </h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-300">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="text-[#06B6D4] font-bold">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="border-t border-gray-700 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-black text-[#FFB800]">Total</span>
                  <span className="text-2xl font-black text-[#06B6D4]">
                    R$ {totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                className="
                  w-full px-8 py-4 mt-6
                  bg-[#FFB800] text-[#2D1B69]
                  rounded-xl font-black text-lg
                  transform transition-all duration-300
                  hover:bg-[#FCD34D]
                  hover:scale-105
                  hover:shadow-[0_0_15px_#FFB800]
                  active:scale-95
                "
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 