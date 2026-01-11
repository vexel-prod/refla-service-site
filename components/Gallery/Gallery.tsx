'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'

type Item = { title: string; image: string; description: string }

export const GALLERY_ITEMS: Item[] = [
  {
    title: 'Зеркало на входной двери',
    image: '/assets/3.webp',
    description: 'Максимум света и визуально больше пространства.',
  },
  {
    title: 'Кромка и подрез',
    image: '/assets/11.webp',
    description: 'Точная геометрия и аккуратный внешний вид.',
  },
  {
    title: 'Современный интерьер',
    image: '/assets/12.jpg',
    description: 'Зеркало работает как декоративный элемент.',
  },
  {
    title: 'Сдержанный минимализм',
    image: '/assets/13.jpg',
    description: 'Без лишних деталей — эффект за счёт качества.',
  },
  {
    title: 'Большой формат',
    image: '/assets/16.jpg',
    description: 'Подбираем по вашим размерам и задачам.',
  },
  {
    title: 'Детали монтажа',
    image: '/assets/7.jpg',
    description: 'Надёжные крепления и безопасные материалы.',
  },
]

export default function Gallery() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const item = useMemo(() => GALLERY_ITEMS[active], [active])

  return (
    <div>
      <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {GALLERY_ITEMS.map((it, idx) => (
          <button
            key={it.image}
            type='button'
            onClick={() => {
              setActive(idx)
              setOpen(true)
            }}
            className='group glass-card overflow-hidden text-left focus-ring'
          >
            <div className='relative aspect-[4/3]'>
              <Image
                src={it.image}
                alt={it.title}
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-[1.05]'
                sizes='(max-width: 1024px) 100vw, 33vw'
                priority={idx < 2}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80' />
              <div className='absolute left-4 right-4 bottom-4'>
                <div className='text-base text-white font-semibold'>{it.title}</div>
                <div className='text-sm text-white/80 mt-1 line-clamp-2'>{it.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      <dialog className={'modal ' + (open ? 'modal-open' : '')} onClose={() => setOpen(false)}>
        <div className='modal-box max-w-4xl p-0 overflow-hidden glass-card'>
          <div className='relative aspect-[16/10]'>
            <Image src={item.image} alt={item.title} fill className='object-cover' sizes='80vw' />
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent' />
            <div className='absolute left-5 right-14 bottom-5'>
              <div className='text-white text-xl font-black'>{item.title}</div>
              <div className='text-white/80 text-sm mt-1'>{item.description}</div>
            </div>
            <button
              className='btn btn-ghost btn-sm rounded-full absolute right-3 top-3 text-white focus-ring'
              onClick={() => setOpen(false)}
              aria-label='Закрыть'
            >
              ✕
            </button>
          </div>

          <div className='p-5 flex gap-2 overflow-x-auto'>
            {GALLERY_ITEMS.map((it, idx) => (
              <button
                key={'thumb-' + it.image}
                onClick={() => setActive(idx)}
                className={[
                  'relative h-14 w-24 flex-none overflow-hidden rounded-2xl border',
                  idx === active ? 'border-primary' : 'border-base-content/10 opacity-80 hover:opacity-100',
                ].join(' ')}
                aria-label={it.title}
              >
                <Image src={it.image} alt={it.title} fill className='object-cover' sizes='96px' />
              </button>
            ))}
          </div>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button aria-label='close' onClick={() => setOpen(false)}>
            close
          </button>
        </form>
      </dialog>
    </div>
  )
}
