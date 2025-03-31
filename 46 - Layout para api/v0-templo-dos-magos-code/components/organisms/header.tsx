"use client"
import { Menu, X, Search, User, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { Logo } from "@/components/atoms/logo"
import { NavButton } from "@/components/molecules/nav-button"
import { CartIndicator } from "@/components/atoms/cart-indicator"

interface HeaderProps {
  cartItems: number
  onMenuToggle: () => void
  isMenuOpen: boolean
}

export function Header({ cartItems, onMenuToggle, isMenuOpen }: HeaderProps) {
  const isMobile = useMobile()

  return (
    <header className="relative z-10 bg-purple-800 border-b border-purple-600 shadow-sm h-[60px] flex items-center">
      <div className="container mx-auto flex justify-between items-center px-2">
        <div className="flex items-center">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuToggle}
              className="mr-1 text-yellow-400 hover:text-yellow-300 h-7 w-7 p-0"
            >
              {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </Button>
          )}
          <Logo />
        </div>

        <div className="flex items-center gap-1">
          <NavButton icon={Search} color="text-cyan-400" hoverColor="text-cyan-300" />
          <NavButton icon={User} color="text-amber-200" hoverColor="text-amber-100" />
          <NavButton icon={ShoppingCart} color="text-cyan-400" hoverColor="text-cyan-300">
            <CartIndicator count={cartItems} />
          </NavButton>
        </div>
      </div>
    </header>
  )
}

