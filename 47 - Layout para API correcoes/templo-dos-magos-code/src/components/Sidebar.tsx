'use client'

import { useState } from 'react'
import { categories } from '@/data/categories'

export default function Sidebar() {
  const [selectedCategory, setSelectedCategory] = useState('todos')

  return (
    <div className="bg-primary rounded-2xl p-4">
      <h2 className="text-xl font-black mb-4 text-accent-yellow">
        CATEGORIAS
      </h2>

      <div className="space-y-1">
        {categories.map((category) => {
          const Icon = category.icon
          const isSelected = selectedCategory === category.id

          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                relative w-full p-2
                flex items-center gap-2
                rounded-lg text-sm
                transition-all
                ${isSelected 
                  ? `bg-accent-${category.id === 'todos' ? 'orange' : category.id === 'cartas' ? 'cyan' : category.id === 'livros' ? 'purple' : category.id === 'tabuleiros' ? 'pink' : 'yellow'} text-primary font-black`
                  : 'text-gray-300 hover:text-white hover:bg-background'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{category.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
} 