'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'

type BeforeAfterSliderProps = {
  beforeSrc: string
  afterSrc: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'до',
  afterLabel = 'после',
  className = '',
}: BeforeAfterSliderProps) {
  const [p, setP] = useState(55)

  const clip = useMemo(() => ({ clipPath: `inset(0 ${100 - p}% 0 0 round 24px)` }), [p])

  return (
    <div className={['relative overflow-hidden rounded-[var(--radius-xl)] border border-base-content/10 bg-base-200/30', className].join(' ')}>
      <div className='relative aspect-[16/10]'>
        <Image src={afterSrc} alt='После' fill className='object-cover' sizes='(max-width: 1024px) 100vw, 50vw' />
        <div className='absolute left-4 top-4 badge badge-outline'>{afterLabel}</div>

        <div className='absolute inset-0' style={clip}>
          <Image src={beforeSrc} alt='До' fill className='object-cover' sizes='(max-width: 1024px) 100vw, 50vw' />
          <div className='absolute left-4 top-4 badge badge-outline'>{beforeLabel}</div>
        </div>

        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute top-0 bottom-0' style={{ left: `${p}%` }}>
            <div className='-translate-x-1/2 h-full w-[2px] bg-white/65 shadow-[0_0_0_1px_rgba(0,0,0,.15)]' />
            <div className='absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white/80 backdrop-blur px-2 py-1 text-xs font-semibold text-black'>
              ↔
            </div>
          </div>
        </div>
      </div>

      <div className='px-5 py-4'>
        <input
          type='range'
          min={0}
          max={100}
          value={p}
          onChange={(e) => setP(Number(e.target.value))}
          className='range range-primary'
          aria-label='Сравнение до/после'
        />
        <div className='mt-2 flex justify-between text-xs text-base-content/60'>
          <span>{beforeLabel}</span>
          <span>{afterLabel}</span>
        </div>
      </div>
    </div>
  )
}
