'use client'

import * as React from 'react'

export default function TiltCard({
  children,
  className = '',
  intensity = 10,
}: {
  children: React.ReactNode
  className?: string
  intensity?: number
}) {
  const ref = React.useRef<HTMLDivElement | null>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    const rx = (-py * intensity).toFixed(2)
    const ry = (px * intensity).toFixed(2)
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={[
        'transition-transform duration-200 will-change-transform',
        'rounded-3xl',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
