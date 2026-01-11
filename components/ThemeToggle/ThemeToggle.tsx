'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const saved = (localStorage.getItem('theme') as Theme | null) || 'light'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  return (
    <button
      type='button'
      onClick={toggle}
      className='btn btn-ghost btn-sm rounded-full focus-ring'
      aria-label='Переключить тему'
      title='Тема'
    >
      <span className='text-lg'>{theme === 'light' ? '🌙' : '☀️'}</span>
    </button>
  )
}
