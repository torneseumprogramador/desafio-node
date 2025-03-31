"use client"

import { Button } from "@/components/ui/button"

interface CategoryButtonProps {
  name: string
  color: string
  onClick?: () => void
}

export function CategoryButton({ name, color, onClick }: CategoryButtonProps) {
  return (
    <Button
      variant="default"
      onClick={onClick}
      className={`${color} hover:brightness-110 text-black font-bold text-lg py-6 rounded-lg shadow-md transition-all duration-300 hover:scale-[1.02] border-2 border-yellow-300/30`}
    >
      {name}
    </Button>
  )
}

