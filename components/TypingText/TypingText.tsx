'use client'

import { useEffect, useMemo, useState } from 'react'

type Phase = 'typing' | 'pause' | 'fade'

export default function TypingText({
  phrases,
  speed = 100,
  pauseMs = 1600,
  fadeMs = 220,
  className = '',
}: {
  phrases: string[]
  speed?: number
  pauseMs?: number
  fadeMs?: number
  className?: string
}) {
  const list = useMemo(
    () => (phrases?.length ? phrases : ['аккуратный монтаж', 'безопасные материалы']),
    [phrases],
  )

  const [idx, setIdx] = useState(0)
  const [pos, setPos] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')
  const [visible, setVisible] = useState(true)

  const current = list[idx] || ''
  const typed = current.slice(0, pos)

  // резерв ширины под самый длинный текст, чтобы не прыгало
  const maxCh = useMemo(() => {
    const m = list.reduce((acc, s) => Math.max(acc, (s || '').length), 1)
    return Math.max(8, m)
  }, [list])

  useEffect(() => {
    let t: number | undefined

    if (phase === 'typing') {
      setVisible(true)
      if (pos < current.length) {
        t = window.setTimeout(() => setPos((p) => p + 1), speed)
      } else {
        setPhase('pause')
      }
    }

    if (phase === 'pause') {
      t = window.setTimeout(() => {
        setPhase('fade')
        setVisible(false)
      }, pauseMs)
    }

    if (phase === 'fade') {
      t = window.setTimeout(() => {
        setIdx((v) => (v + 1) % list.length)
        setPos(0)
        setPhase('typing')
      }, fadeMs)
    }

    return () => {
      if (t) window.clearTimeout(t)
    }
  }, [phase, pos, current.length, speed, pauseMs, fadeMs, list.length])

  return (
    <span
      className={['inline-flex items-baseline', className].join(' ')}
      style={{ minWidth: `${maxCh}ch` }}
    >
      <span
        className='transition-opacity'
        style={{
          opacity: visible ? 1 : 0,
          transitionDuration: `${fadeMs}ms`,
          // ВАЖНО: фолбэк-цвет, если выше по дереву есть text-transparent/bg-clip-text
          color: 'currentColor',
          whiteSpace: 'nowrap',
        }}
      >
        {typed}
      </span>
      <span className='ml-1 inline-block w-[0.6ch] animate-pulse opacity-80'>▍</span>
    </span>
  )
}
