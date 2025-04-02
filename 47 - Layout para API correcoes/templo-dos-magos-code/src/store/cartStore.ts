import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartStore, Product } from '@/types/cart'

interface CartItem extends Product {
  quantity: number
}

interface CartStore {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product: Product) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id)
          
          if (existingItem) {
            const updatedItems = state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
            return {
              items: updatedItems,
              totalItems: state.totalItems + 1,
              totalPrice: state.totalPrice + product.price,
            }
          }

          return {
            items: [...state.items, { ...product, quantity: 1 }],
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          }
        }),

      removeItem: (productId: string) =>
        set((state) => {
          const item = state.items.find((item) => item.id === productId)
          if (!item) return state

          return {
            items: state.items.filter((item) => item.id !== productId),
            totalItems: state.totalItems - (item.quantity || 1),
            totalPrice: state.totalPrice - (item.price * (item.quantity || 1)),
          }
        }),

      updateQuantity: (productId: string, quantity: number) =>
        set((state) => {
          const updatedItems = state.items.map((item) => {
            if (item.id !== productId) return item
            
            const oldQuantity = item.quantity || 1
            const quantityDiff = quantity - oldQuantity
            
            return { ...item, quantity: Math.max(0, quantity) }
          })

          const item = state.items.find((item) => item.id === productId)
          if (!item) return state

          return {
            items: updatedItems.filter((item) => item.quantity > 0),
            totalItems: state.totalItems + (quantity - (item.quantity || 1)),
            totalPrice: state.totalPrice + (item.price * (quantity - (item.quantity || 1))),
          }
        }),

      clearCart: () =>
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        }),
    }),
    {
      name: 'cart-storage',
    }
  )
) 