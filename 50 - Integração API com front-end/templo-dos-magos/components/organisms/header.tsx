"use client"
import { Menu, X, Search, User, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { Logo } from "@/components/atoms/logo"
import { NavButton } from "@/components/molecules/nav-button"
import { CartIndicator } from "@/components/atoms/cart-indicator"
import { useState } from "react"

interface HeaderProps {
  cartItems: number
  onMenuToggle: () => void
  isMenuOpen: boolean
}

export function Header({ cartItems, onMenuToggle, isMenuOpen }: HeaderProps) {
  const isMobile = useMobile()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="relative z-10 bg-purple-800 border-b border-purple-600 shadow-sm h-[90px] flex items-center">
      <div className="container mx-auto flex justify-between items-center px-2">
        <div className="flex items-center">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuToggle}
              className="mr-1 text-yellow-400 hover:text-yellow-300 h-7 w-7 p-0"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          )}
          <Logo />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-[200px] md:w-[800px] p-2 rounded-l-md border border-purple-600 bg-purple-700 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 mr-2.5"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                  className="text-cyan-400 hover:text-cyan-300 h-[40px] rounded-l-none rounded-r-md border border-l-0 border-purple-600 bg-purple-700"
                >
                  <X size={20} />
                </Button>
              </div>
            ) : (
              <NavButton 
                icon={Search} 
                color="text-cyan-400" 
                hoverColor="text-cyan-300" 
                iconSize={28} 
                onClick={() => setIsSearchOpen(true)}
              />
            )}
          </div>
          <NavButton icon={User} color="text-amber-200" hoverColor="text-amber-100" iconSize={28} />
          <NavButton icon={ShoppingCart} color="text-cyan-400" hoverColor="text-cyan-300" iconSize={28}>
            <CartIndicator count={cartItems} />
          </NavButton>
        </div>
      </div>
    </header>
  )
}
