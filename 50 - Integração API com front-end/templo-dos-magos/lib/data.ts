import type { Product, Category } from "@/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL

// Tipagem dos dados importados

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/produtos`)
  const data = await response.json()
  return data
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/categorias`)
  const data = await response.json()
  return data
}

// Funções auxiliares para acessar os dados
export async function getProductById(id: number): Promise<Product | undefined> {
  const response = await fetch(`${API_URL}/produtos/${id}`)
  if (!response.ok) return undefined
  const data = await response.json()
  return data
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const response = await fetch(`${API_URL}/produtos/categoria/${categorySlug}`)
  if (!response.ok) return []
  const data = await response.json()
  return data
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const response = await fetch(`${API_URL}/categorias/${slug}`)
  if (!response.ok) return undefined
  const data = await response.json()
  return data
}
