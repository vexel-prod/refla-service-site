'use client'

import * as React from 'react'
import styles from './TiltCard.module.css'

// Любой React-тег: 'div', 'section', 'a', 'form', и т.д.
type TiltCardAs = React.ElementType

type TiltCardProps<T extends TiltCardAs = 'div'> = {
  as?: T
  className?: string
  children?: React.ReactNode
  /** если true — карточка остаётся "подсвеченной" после ухода мыши */
  freezeOnLeave?: boolean
} & React.ComponentPropsWithoutRef<T>

export default function TiltCard<T extends TiltCardAs = 'div'>({
  as,
  className = '',
  children,
  freezeOnLeave = false,
  ...rest
}: TiltCardProps<T>) {
  const TagEl = (as || 'div') as TiltCardAs
  const ref = React.useRef<HTMLElement | null>(null)
  const [hovered, setHovered] = React.useState(false)

  const setTilt = (card: HTMLElement, xDeg: number, yDeg: number, zPx: number) => {
    card.style.setProperty('--tilt-x', `${xDeg}deg`)
    card.style.setProperty('--tilt-y', `${yDeg}deg`)
    card.style.setProperty('--tilt-z', `${zPx}px`)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = ref.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const px = x / rect.width
    const py = y / rect.height

    const maxRotate = 10
    const tiltStrength = 18

    const rotateY = (px - 0.5) * 2 * maxRotate
    const rotateX = (0.5 - py) * 2 * maxRotate

    setTilt(card, rotateX, rotateY, tiltStrength)

    card.style.setProperty('--glare-x', `${px * 100}%`)
    card.style.setProperty('--glare-y', `${py * 100}%`)
    card.style.setProperty('--glare-opacity', '1')
  }

  const resetCard = () => {
    const card = ref.current
    if (!card) return
    setTilt(card, 0, 0, 0)
    card.style.setProperty('--glare-opacity', '0')
  }

  const handleEnter = () => {
    setHovered(true)
    ref.current?.style.setProperty('--glare-opacity', '1')
  }

  const handleLeave = () => {
    setHovered(false)
    if (!freezeOnLeave) {
      resetCard()
    }
  }

  // Если freezeOnLeave перестал быть true — аккуратно сбрасываем наклон
  React.useEffect(() => {
    if (!freezeOnLeave) {
      resetCard()
    }
  }, [freezeOnLeave])

  return (
    <div className={styles.tiltWrapper}>
      <TagEl
        ref={ref as any}
        className={`${className} ${styles.tiltInner} ${
          hovered || freezeOnLeave ? styles.tiltInnerHovered : ''
        }`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        {...(rest as any)}
      >
        {children}
      </TagEl>
    </div>
  )
}
