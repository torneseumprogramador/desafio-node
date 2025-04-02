"use client"

import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

interface NavButtonProps {
  icon: LucideIcon
  color: string
  hoverColor: string
  iconSize: number
  children?: ReactNode
  onClick?: () => void
}

export function NavButton({ icon: Icon, color, hoverColor, iconSize, children, onClick }: NavButtonProps) {
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className={`${color} hover:${hoverColor} h-7 w-7 p-0`}
      onClick={onClick}
    >
      <Icon size={iconSize} />
      {children}
    </Button>
  )
}
