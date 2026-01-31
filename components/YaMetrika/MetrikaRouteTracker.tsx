'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function MetrikaRouteTracker() {
  // хуки всегда сверху, без условий
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // все условия — внутри эффекта
    const id = process.env.NEXT_PUBLIC_YM_ID
    if (!id) return
    if (typeof window === 'undefined') return

    // ym может подгружаться позже
    const ym = (window as unknown as { ym?: (...args: unknown[]) => void }).ym
    if (typeof ym !== 'function') return

    const qs = searchParams?.toString()
    const url = qs ? `${pathname}?${qs}` : pathname

    // hit
    ym(Number(id), 'hit', url)
  }, [pathname, searchParams])

  return null
}
