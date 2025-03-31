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
      <Image
        src="/images/logo.png"
        alt="Templo dos Magos"
        width={isMobile ? 140 : 180}
        height={isMobile ? 50 : 55}
        className="object-contain max-h-[50px]"
      />
    </div>
  )
}

