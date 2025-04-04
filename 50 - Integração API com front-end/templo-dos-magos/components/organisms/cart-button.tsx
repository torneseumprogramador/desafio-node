"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface CartButtonProps {
  onClick: () => void
}

export function CartButton({ onClick }: CartButtonProps) {
  return (
    <div className="mt-8 flex justify-center">
      <Button
        className="bg-purple-700 hover:bg-purple-600 text-yellow-400 font-bold text-xl py-6 px-8 rounded-lg shadow-lg border-2 border-yellow-500/50 transition-all duration-300 hover:scale-105"
        onClick={onClick}
      >
        VER CARRINHO
        <ShoppingCart className="ml-2" />
      </Button>
    </div>
  )
}

