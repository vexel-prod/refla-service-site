'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'
import ThemeToggle from 'components/ThemeToggle/ThemeToggle'
import ButtonCTA from 'components/ButtonCTA/ButtonCTA'

// нормализуем путь
const normalize = (s: string) => s.replace(/\/+$/, '') || '/'
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

  // закрываем меню на десктопе
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 860) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // эффект прокрутки
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onHome = isActive('/')

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* ЛОГО */}
        {onHome ? (
          <span className={styles.logo} aria-current='page'>
            <span className={styles.brand}>REFLA</span>
            <span className={styles.tagline}>ОТРАЖЕНИЕ В ВАШ ДОМ</span>
          </span>
        ) : (
          <Link href='/' className={styles.logo}>
            <span className={styles.brand}>REFLA</span>
            <span className={styles.tagline}>ОТРАЖЕНИЕ В ВАШ ДОМ</span>
          </Link>
        )}

        {/* ДЕСКТОП */}
        <div className={styles.wrapper}>
          <nav className={styles.nav} aria-label='Главная навигация'>
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
              Прайс
            </Link>
            <Link
              href='/contacts/'
              className={`button ${isActive('/contacts/') ? '' : 'button--outline'}`}
              aria-current={isActive('/contacts/') ? 'page' : undefined}
            >
              Контакты
            </Link>
            <Link
              href='/request/'
              className={`button ${isActive('/request/') ? '' : 'button--outline'}`}
              aria-current={isActive('/request/') ? 'page' : undefined}
            >
              Оставить заявку
            </Link>
          </nav>

          {/* БУРГЕР */}
          <div className={styles.wrapper}>
            <ThemeToggle />
            <button
              className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
              aria-expanded={open}
              aria-label='Меню'
              onClick={() => setOpen((v) => !v)}
            >
              <span className={`${styles.burgerLine} ${styles.burgerLineTop}`} />
              <span className={`${styles.burgerLine} ${styles.burgerLineMid}`} />
              <span className={`${styles.burgerLine} ${styles.burgerLineBot}`} />
            </button>
          </div>
        </div>
      </div>

      {/* МОБИЛЬНОЕ МЕНЮ */}
      <nav className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ''}`}>
        <Link
          href='/about/'
          className={`${styles.mobileMenuLink} ${
            isActive('/about/') ? styles.mobileMenuLinkActive : ''
          }`}
          onClick={() => setOpen(false)}
        >
          О нас
        </Link>
        <Link
          href='/pricing/'
          className={`${styles.mobileMenuLink} ${
            isActive('/pricing/') ? styles.mobileMenuLinkActive : ''
          }`}
          onClick={() => setOpen(false)}
        >
          Прайс
        </Link>
        <Link
          href='/contacts/'
          className={`${styles.mobileMenuLink} ${
            isActive('/contacts/') ? styles.mobileMenuLinkActive : ''
          }`}
          onClick={() => setOpen(false)}
        >
          Контакты
        </Link>
      </nav>
    </header>
  )
}
