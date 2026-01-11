'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import ThemeToggle from 'components/ThemeToggle/ThemeToggle'

type NavItem = { href: string; label: string }

const NAV: NavItem[] = [
  { href: '/', label: 'Главная' },
  { href: '/pricing', label: 'Цены' },
  { href: '/about', label: 'О компании' },
  { href: '/contacts', label: 'Контакты' },
]

const normalize = (s: string) => (s || '/').replace(/\/+$/, '') || '/'
const isActiveFactory = (pathname: string) => {
  const p = normalize(pathname)
  return (href: string) => {
    const h = normalize(href)
    if (h === '/') return p === '/'
    return p === h || p.startsWith(h + '/')
  }
}

export default function Header() {
  const pathname = usePathname() || '/'
  const isActive = useMemo(() => isActiveFactory(pathname), [pathname])

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className='sticky top-0 z-50'>
      <div
        className={[
          'w-full border-b border-base-content/10',
          'bg-base-100/70 backdrop-blur supports-[backdrop-filter]:bg-base-100/55',
          scrolled ? 'shadow-lg shadow-base-300/20' : '',
        ].join(' ')}
      >
        <div className='container'>
          <div className='navbar min-h-[72px] px-0'>
            <div className='navbar-start'>
              <div className='dropdown'>
                <label tabIndex={0} className='btn btn-ghost btn-sm md:hidden rounded-full focus-ring'>
                  <svg width='20' height='20' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                    <path d='M4 7h16M4 12h16M4 17h16' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className='menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56 border border-base-content/10'
                >
                  {NAV.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={isActive(item.href) ? 'active font-semibold' : ''}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  <li className='mt-2'>
                    <Link href='/request' className='btn btn-primary btn-sm w-full'>
                      Заказать замер
                    </Link>
                  </li>
                </ul>
              </div>

              <Link href='/' className='btn btn-ghost text-xl rounded-2xl px-3 focus-ring'>
                <span className='font-black tracking-tight'>REFLA</span>
                <span className='ml-2 hidden sm:inline text-base-content/60 text-sm font-medium'>зеркала на двери</span>
              </Link>
            </div>

            <div className='navbar-center hidden md:flex'>
              <ul className='menu menu-horizontal px-1 gap-1'>
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        'rounded-2xl focus-ring',
                        isActive(item.href) ? 'font-semibold bg-base-200' : 'text-base-content/80',
                      ].join(' ')}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className='navbar-end gap-1'>
              <ThemeToggle />
              <Link href='/request' className='btn btn-primary btn-sm rounded-full focus-ring hidden sm:inline-flex'>
                Рассчитать стоимость
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
