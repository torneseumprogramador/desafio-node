import { 
  Wand2, 
  ScrollText, 
  BookOpenText, 
  Gamepad2, 
  Sparkles 
} from 'lucide-react'

export interface Category {
  id: string
  name: string
  icon: typeof Wand2
  color: string
  hoverColor: string
  bgColor: string
}

export const categories: Category[] = [
  {
    id: 'acessorios',
    name: 'Acessórios',
    icon: Wand2,
    color: '#FFB800',
    hoverColor: '#FCD34D',
    bgColor: '#2D1B69'
  },
  {
    id: 'cartas',
    name: 'Cartas',
    icon: ScrollText,
    color: '#06B6D4',
    hoverColor: '#22D3EE',
    bgColor: '#2D1B69'
  },
  {
    id: 'livros',
    name: 'Livros',
    icon: BookOpenText,
    color: '#9333EA',
    hoverColor: '#A855F7',
    bgColor: '#2D1B69'
  },
  {
    id: 'tabuleiros',
    name: 'Tabuleiros',
    icon: Gamepad2,
    color: '#EC4899',
    hoverColor: '#F472B6',
    bgColor: '#2D1B69'
  },
  {
    id: 'todos',
    name: 'Todos',
    icon: Sparkles,
    color: '#F97316',
    hoverColor: '#FB923C',
    bgColor: '#2D1B69'
  }
] 