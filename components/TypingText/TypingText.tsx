'use client'

import { useEffect, useMemo, useState } from 'react'

export default function TypingText({
  phrases,
  speed = 34,
  pauseMs = 1200,
  className = '',
}: {
  phrases: string[]
  speed?: number
  pauseMs?: number
  className?: string
}) {
  const list = useMemo(() => (phrases?.length ? phrases : ['аккуратный монтаж', 'безопасные материалы']), [phrases])
  const [idx, setIdx] = useState(0)
  const [pos, setPos] = useState(0)
  const [dir, setDir] = useState<'fwd' | 'bwd'>('fwd')

  useEffect(() => {
    const current = list[idx] || ''
    const doneForward = dir === 'fwd' && pos >= current.length
    const doneBackward = dir === 'bwd' && pos <= 0

    const t = window.setTimeout(
      () => {
        if (doneForward) {
          setDir('bwd')
          return
        }
        if (doneBackward && dir === 'bwd') {
          setDir('fwd')
          setIdx((v) => (v + 1) % list.length)
          return
        }
        setPos((p) => p + (dir === 'fwd' ? 1 : -1))
      },
      doneForward ? pauseMs : speed,
    )

    return () => window.clearTimeout(t)
  }, [list, idx, pos, dir, speed, pauseMs])

  const text = (list[idx] || '').slice(0, pos)

  return (
    <span className={['inline-flex items-baseline', className].join(' ')}>
      <span>{text}</span>
      <span className='ml-1 inline-block w-[0.6ch] animate-pulse opacity-80'>▍</span>
    </span>
  )
}
