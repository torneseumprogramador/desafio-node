import productsData from "@/mocks/products.json"
import categoriesData from "@/mocks/categories.json"
import type { Product, Category } from "@/types"

// Tipagem dos dados importados
export const products: Product[] = productsData
export const categories: Category[] = categoriesData

// Funções auxiliares para acessar os dados
export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  // Simulando uma filtragem por categoria (em um cenário real, isso viria do backend)
  // Para este mock, apenas retornamos todos os produtos
  return products
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}

