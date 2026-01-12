'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import ThemeToggle from 'components/ThemeToggle/ThemeToggle'

type NavItem = { href: string; label: string }

const NAV: NavItem[] = [
  { href: '/', label: 'Главная' },
  { href: '/examples', label: 'Примеры' },
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

function LogoMark() {
  return (
    <svg width='26' height='26' viewBox='0 0 32 32' fill='none' aria-hidden='true'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='32' y2='32'>
          <stop stopColor='rgb(var(--brand-a))' />
          <stop offset='0.55' stopColor='rgb(var(--brand-b))' />
          <stop offset='1' stopColor='rgb(var(--brand-c))' />
        </linearGradient>
      </defs>
      <rect x='4' y='3' width='24' height='26' rx='8' stroke='url(#g)' strokeWidth='2' />
      <path d='M11 9.5c3.8-2 6.2-2 10 0' stroke='url(#g)' strokeWidth='2' strokeLinecap='round' />
      <path d='M12 22c3 1.7 5 1.7 8 0' stroke='url(#g)' strokeWidth='2' strokeLinecap='round' opacity='0.75' />
      <path d='M18 7v18' stroke='rgba(255,255,255,.25)' strokeWidth='2' strokeLinecap='round' />
    </svg>
  )
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
          'border-b border-base-content/10',
          'bg-base-100/60 supports-[backdrop-filter]:bg-base-100/40 backdrop-blur-xl',
          scrolled ? 'shadow-lg shadow-base-300/20' : '',
        ].join(' ')}
      >
        <div className='container'>
          <div className='flex items-center justify-between py-3'>
            <div className='flex items-center gap-3'>
              <Link href='/' className='flex items-center gap-2 rounded-2xl px-2 py-1 focus-ring'>
                <LogoMark />
                <div className='leading-tight'>
                  <div className='font-black tracking-tight text-base md:text-lg'>REFLA</div>
                  <div className='text-[11px] md:text-xs text-base-content/60 -mt-0.5'>зеркала на двери</div>
                </div>
              </Link>

              <div className='hidden lg:flex items-center gap-1'>
                {NAV.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    className={[
                      'relative px-3 py-2 rounded-2xl text-sm',
                      'text-base-content/80 hover:text-base-content hover:bg-base-100/50',
                      'transition',
                      isActive(it.href) ? 'text-base-content bg-base-100/60' : '',
                    ].join(' ')}
                  >
                    {it.label}
                    {isActive(it.href) && (
                      <span className='absolute left-3 right-3 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-orange-400' />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <ThemeToggle />

              <Link href='/request' className='btn btn-primary rounded-full shimmer focus-ring hidden sm:inline-flex'>
                Рассчитать стоимость
              </Link>

              <div className='dropdown dropdown-end lg:hidden'>
                <label tabIndex={0} className='btn btn-ghost btn-sm rounded-full focus-ring'>
                  <svg width='20' height='20' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                    <path d='M4 7h16M4 12h16M4 17h16' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className='menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-64 border border-base-content/10'
                >
                  {NAV.map((it) => (
                    <li key={it.href}>
                      <Link href={it.href} className={isActive(it.href) ? 'active font-semibold' : ''}>
                        {it.label}
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
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
