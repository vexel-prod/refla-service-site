// components/HomeCarousel.tsx
'use client'

import * as React from 'react'
import Link from 'next/link'
import { GALLERY_ITEMS } from 'components/Gallery/Gallery'
import styles from './HomeCarousel.module.css'

export default function HomeCarousel() {
  // Берём первые 5 работ
  const SLIDES = React.useMemo(() => GALLERY_ITEMS.slice(0, 5), [])

  const [index, setIndex] = React.useState(0)
  const trackRef = React.useRef<HTMLDivElement>(null)

  const len = SLIDES.length
  const clamp = (i: number) => (i + len) % len
  const go = (i: number) => setIndex(clamp(i))
  const prev = () => go(index - 1)
  const next = () => go(index + 1)

  // Клавиатура
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  // Тач-свайпы
  React.useEffect(() => {
    const el = trackRef.current
    if (!el) return

    let startX = 0
    let diff = 0
    let dragging = false

    const onTouchStart = (e: TouchEvent) => {
      dragging = true
      startX = e.touches[0].clientX
      diff = 0
      el.style.transition = 'none'
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging) return
      diff = e.touches[0].clientX - startX
      const width = el.clientWidth
      const offset = -index * width + diff
      el.style.transform = `translateX(${offset}px)`
    }
    const onTouchEnd = () => {
      dragging = false
      el.style.transition = ''
      const width = el.clientWidth
      if (Math.abs(diff) > width * 0.15) diff < 0 ? next() : prev()
      else {
        el.style.transform = ''
        el.getBoundingClientRect() // reflow
        el.style.transform = `translateX(${-index * 100}%)`
      }
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: true })
    el.addEventListener('touchend', onTouchEnd)
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  // Синхронизация transform
  React.useEffect(() => {
    const el = trackRef.current
    if (el) el.style.transform = `translateX(${-index * 100}%)`
  }, [index])

  return (
    <section className={styles.root} aria-label='Примеры работ'>
      <div className={styles.viewport}>
        <div className={styles.track} ref={trackRef}>
          {SLIDES.map((s, i) => (
            <figure className={styles.slide} key={i} aria-hidden={i !== index}>
              <img
                className={styles.img}
                src={s.image}
                alt={s.title}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding='async'
              />
              <figcaption className={styles.caption}>
                <div className={`${styles.captionTitle} title-font`}>{s.title}</div>
                <div className={`${styles.captionText} muted`}>{s.description}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Стрелки */}
        <button
          className={`${styles.nav} ${styles.navPrev}`}
          onClick={prev}
          aria-label='Предыдущая работа'
        >
          ‹
        </button>
        <button
          className={`${styles.nav} ${styles.navNext}`}
          onClick={next}
          aria-label='Следующая работа'
        >
          ›
        </button>
      </div>

      {/* Точки */}
      <div className={styles.dots} role='tablist' aria-label='Слайды'>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            role='tab'
            aria-selected={i === index}
            aria-label={`Слайд ${i + 1}`}
            className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
            onClick={() => go(i)}
          />
        ))}
      </div>

      {/* Ссылка на полную галерею */}
      <div className={styles.more}>
        <Link href='/examples/'>
          <span className='button button--outline'>Смотреть все примеры</span>
        </Link>
      </div>
    </section>
  )
}
