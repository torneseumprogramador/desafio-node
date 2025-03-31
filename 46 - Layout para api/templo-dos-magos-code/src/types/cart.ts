import { Product } from '@/data/products'

export type { Product }

export interface CartItem extends Product {
  quantity: number
}

export interface CartStore {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
} 