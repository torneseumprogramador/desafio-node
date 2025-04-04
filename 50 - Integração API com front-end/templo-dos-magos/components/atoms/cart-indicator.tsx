interface CartIndicatorProps {
  count: number
}

export function CartIndicator({ count }: CartIndicatorProps) {
  if (count <= 0) return null

  return (
    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center">
      {count}
    </span>
  )
}

