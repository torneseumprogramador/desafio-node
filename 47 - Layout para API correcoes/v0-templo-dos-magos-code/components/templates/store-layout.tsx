"use client"

import type { ReactNode } from "react"
import { SparkleBackground } from "@/components/atoms/sparkle-background"
import { Header } from "@/components/organisms/header"
import { Sidebar } from "@/components/organisms/sidebar"
import { CartButton } from "@/components/organisms/cart-button"
import type { Category } from "@/types"

interface StoreLayoutProps {
  cartItems: number
  isMenuOpen: boolean
  onMenuToggle: () => void
  categories: Category[]
  onCartOpen: () => void
  children: ReactNode
}

export function StoreLayout({
  cartItems,
  isMenuOpen,
  onMenuToggle,
  categories,
  onCartOpen,
  children,
}: StoreLayoutProps) {
  return (
    <main className="min-h-screen bg-purple-900 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-purple-950 to-purple-900 text-white relative overflow-hidden">
      <SparkleBackground />

      <Header cartItems={cartItems} onMenuToggle={onMenuToggle} isMenuOpen={isMenuOpen} />

      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        <Sidebar isMenuOpen={isMenuOpen} categories={categories} />

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-center mb-8 text-cyan-300">
            Produtos em Destaque
            <span className="inline-block ml-2 animate-bounce">✨</span>
          </h1>

          {children}

          <CartButton onClick={onCartOpen} />
        </div>
      </div>
    </main>
  )
}

