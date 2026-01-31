'use client'

import Image from 'next/image'
import { useMemo, useRef, useState } from 'react'

type BeforeAfterSliderProps = {
  beforeSrc: string
  afterSrc: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'до',
  afterLabel = 'после',
  className = '',
}: BeforeAfterSliderProps) {
  const [p, setP] = useState(50)
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const dragging = useRef(false)

  const clip = useMemo(() => ({ clipPath: `inset(0 ${100 - p}% 0 0 round 24px)` }), [p])

  const setFromClientX = (clientX: number) => {
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const next = ((clientX - r.left) / r.width) * 100
    setP(Math.max(0, Math.min(100, next)))
  }

  const onDown = (e: React.PointerEvent) => {
    dragging.current = true
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    setFromClientX(e.clientX)
  }

  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    setFromClientX(e.clientX)
  }

  const onUp = (e: React.PointerEvent) => {
    dragging.current = false
    ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
  }

  return (
    <div
      className={[
        'relative overflow-hidden rounded-[var(--radius-xl)] border border-base-content/10 bg-base-200/30',
        className,
      ].join(' ')}
    >
      <div
        ref={wrapRef}
        className='relative aspect-[16/10]'
      >
        <Image
          src={beforeSrc}
          loading='eager'
          alt='До'
          fill
          className='object-cover'
          sizes='(max-width: 1024px) 100vw, 50vw'
        />
        <div className='absolute left-4 top-4 badge badge-outline'>{beforeLabel}</div>

        <div
          className='absolute inset-0'
          style={clip}
        >
          <Image
            src={afterSrc}
            alt='После'
            fill
            className='object-cover'
            sizes='(max-width: 1024px) 100vw, 50vw'
          />
          <div className='absolute right-4 top-4 badge badge-outline'>{afterLabel}</div>
        </div>

        {/* Слайдер прямо на картинке */}
        <div
          className='absolute inset-0 cursor-col-resize'
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <div
            className='absolute top-0 bottom-0'
            style={{ left: `${p}%` }}
          >
            <div className='-translate-x-1/2 h-full w-[2px] bg-white/65 shadow-[0_0_0_1px_rgba(0,0,0,.15)]' />
            <div className='absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white/80 backdrop-blur px-2 py-1 text-xs font-semibold text-black select-none'>
              ↔
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
