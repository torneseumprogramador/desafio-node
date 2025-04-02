"use client"

import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { CategoryButton } from "@/components/molecules/category-button"
import type { Category } from "@/types"

interface SidebarProps {
  isMenuOpen: boolean
  categories: Category[]
  onCategoryClick?: (category: string) => void
}

export function Sidebar({ isMenuOpen, categories, onCategoryClick }: SidebarProps) {
  const isMobile = useMobile()

  return (
    <aside
      className={cn(
        "w-full md:w-64 flex-shrink-0 z-20 transition-all duration-300 ease-in-out",
        isMobile ? (isMenuOpen ? "fixed inset-0 bg-purple-900/95 pt-20" : "hidden") : "block",
      )}
    >
      <div className="bg-purple-800 rounded-xl p-4 shadow-lg border-2 border-purple-700">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">CATEGORIAS</h2>
        <div className="flex flex-col gap-3">
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              name={category.name}
              color={category.color}
              onClick={() => onCategoryClick?.(category.slug)}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}

