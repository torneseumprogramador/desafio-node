"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { StoreLayout } from "@/components/templates/store-layout"
import ProductCarousel from "@/components/organisms/product-list"
import { getProducts, getCategories } from "@/lib/data"
import type { Product, Category } from "@/types"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartItems, setCartItems] = useState<number>(0)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const { toast } = useToast()

  useEffect(() => {
    async function loadData() {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories()
      ])

      setProducts(productsData)
      setCategories(categoriesData)
    }

    loadData()
  }, [])

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
