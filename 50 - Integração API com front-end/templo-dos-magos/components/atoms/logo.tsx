"use client"

import Image from "next/image"
import { useMobile } from "@/hooks/use-mobile"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  const isMobile = useMobile()

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/images/logo.png"
        alt="Templo dos Magos"
        width={80}
        height={80}
        className="object-contain max-h-[80px]"
      />
    </div>
  )
}

