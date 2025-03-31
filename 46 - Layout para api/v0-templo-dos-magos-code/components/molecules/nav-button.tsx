"use client"

import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

interface NavButtonProps {
  icon: LucideIcon
  color: string
  hoverColor: string
  onClick?: () => void
  children?: ReactNode
}

export function NavButton({ icon: Icon, color, hoverColor, onClick, children }: NavButtonProps) {
  return (
    <Button variant="ghost" size="sm" onClick={onClick} className={`${color} hover:${hoverColor} relative h-7 w-7 p-0`}>
      <Icon size={16} />
      {children}
    </Button>
  )
}

