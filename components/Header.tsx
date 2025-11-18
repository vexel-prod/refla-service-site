'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Нормализация пути: убираем хвостовой слэш, кроме корня
const normalize = (s: string) => s.replace(/\/+$/, '') || '/'

// Совпадение пути со ссылкой (подсвечиваем и вложенные маршруты)
const makeIsActive = (pathname: string) => {
  const p = normalize(pathname || '/')
  return (href: string) => {
    const h = normalize(href)
    if (h === '/') return p === '/'
    return p === h || p.startsWith(h + '/')
  }
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isActive = makeIsActive(pathname)

  // Закрывать меню на десктопе
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Флаг «прокручено»
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onHome = isActive('/')

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className=' header-inner'>
        {/* Лого */}
        {onHome ? (
          <span className='header-logo' aria-current='page'>
            <span className='brand'>REFLA</span>
            <span className='tagline'>ОТРАЖЕНИЕ В ВАШ ДОМ</span>
          </span>
        ) : (
          <Link href='/' className='header-logo' aria-current={isActive('/') ? 'page' : undefined}>
            <span className='brand'>REFLA</span>
            <span className='tagline'>ОТРАЖЕНИЕ В ВАШ ДОМ</span>
          </Link>
        )}

        {/* Навигация */}
        <nav className='nav' aria-label='Главная навигация'>
          <Link
            href='/about/'
            className={`button ${isActive('/about/') ? '' : 'button--outline'}`}
            aria-current={isActive('/about/') ? 'page' : undefined}
          >
            О нас
          </Link>
          <Link
            href='/pricing/'
            className={`button ${isActive('/pricing/') ? '' : 'button--outline'}`}
            aria-current={isActive('/pricing/') ? 'page' : undefined}
          >
            Услуги
          </Link>
          <Link
            href='/contacts/'
            className={`button ${isActive('/contacts/') ? '' : 'button--outline'}`}
            aria-current={isActive('/contacts/') ? 'page' : undefined}
          >
            Контакты
          </Link>
        </nav>

        {/* Бургер */}
        <button
          className='burger'
          aria-label='Меню'
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
            <rect x='3' y='6' width='18' height='2' rx='1' fill='#1F2937' />
            <rect x='3' y='11' width='18' height='2' rx='1' fill='#1F2937' />
            <rect x='3' y='16' width='18' height='2' rx='1' fill='#1F2937' />
          </svg>
        </button>
      </div>

      {/* Мобильное меню */}
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <div className=''>
          <Link
            href='/about/'
            onClick={() => setOpen(false)}
            className={isActive('/about/') ? 'active' : undefined}
            aria-current={isActive('/about/') ? 'page' : undefined}
          >
            О нас
          </Link>
          <Link
            href='/pricing/'
            onClick={() => setOpen(false)}
            className={isActive('/pricing/') ? 'active' : undefined}
            aria-current={isActive('/pricing/') ? 'page' : undefined}
          >
            Услуги
          </Link>
          <Link
            href='/contacts/'
            onClick={() => setOpen(false)}
            className={isActive('/contacts/') ? 'active' : undefined}
            aria-current={isActive('/contacts/') ? 'page' : undefined}
          >
            Контакты
          </Link>
          <Link href='/request/' onClick={() => setOpen(false)}>
            <span className='button mobile-button'>Оставить заявку</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
