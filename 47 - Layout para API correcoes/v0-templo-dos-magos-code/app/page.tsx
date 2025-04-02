"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { StoreLayout } from "@/components/templates/store-layout"
import ProductCarousel from "@/components/organisms/product-carousel"
import { products, categories } from "@/lib/data"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartItems, setCartItems] = useState<number>(0)
  const { toast } = useToast()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const addToCart = (productName: string) => {
    setCartItems(cartItems + 1)
    toast({
      title: "Produto adicionado!",
      description: `${productName} foi adicionado ao seu carrinho.`,
    })
  }

  const openCart = () => {
    toast({ title: "Carrinho aberto!" })
  }

  return (
    <StoreLayout
      cartItems={cartItems}
      isMenuOpen={isMenuOpen}
      onMenuToggle={toggleMenu}
      categories={categories}
      onCartOpen={openCart}
    >
      <ProductCarousel products={products} onAddToCart={addToCart} />
    </StoreLayout>
  )
}

