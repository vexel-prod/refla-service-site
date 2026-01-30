'use client'

import * as React from 'react'
import Image from 'next/image'

type Focus = 'none' | 'width' | 'height'

type Props = {
  w: number
  h: number
  setW: (n: number) => void
  setH: (n: number) => void
  imageSrc?: string
  presets?: { w: number; h: number; label: string }[]
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

export default function PricingDoorVizPhoto({
  w,
  h,
  setW,
  setH,
  imageSrc = '/assets/door.png',
  presets = [],
}: Props) {
  const [focus, setFocus] = React.useState<Focus>('none')
  const [draftW, setDraftW] = React.useState<string>(String(w))
  const [draftH, setDraftH] = React.useState<string>(String(h))

  const inputWRef = React.useRef<HTMLInputElement | null>(null)
  const inputHRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFocus('none')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // синхронизация, если родитель изменит значения извне (пресеты/кнопки)
  React.useEffect(() => setDraftW(String(w)), [w])
  React.useEffect(() => setDraftH(String(h)), [h])

  const activeSpot =
    focus === 'width' ? { x: 50, y: 6 } : focus === 'height' ? { x: 83, y: 50 } : { x: 50, y: 50 }

  const zoom = focus === 'none' ? 1 : 1.55

  const applyWidth = React.useCallback(() => {
    const n = Number(draftW)
    if (Number.isFinite(n)) setW(clamp(Math.round(n), 30, 120))
  }, [draftW, setW])

  const applyHeight = React.useCallback(() => {
    const n = Number(draftH)
    if (Number.isFinite(n)) setH(clamp(Math.round(n), 60, 220))
  }, [draftH, setH])

  return (
    <div className='rounded-3xl border border-base-content/10 bg-base-100/40 p-4 md:p-5'>
      <div className='flex items-center justify-between gap-3'>
        <div className='font-bold'>Визуальный замер</div>
        <div className='text-xs opacity-70'>Нажмите на Ш/В прямо на линии и введите значение</div>
      </div>

      <div className='mt-4 grid gap-4 items-start'>
        {/* Фото + линии */}
        <div className='relative'>
          <div className='relative mx-auto w-full max-w-[280px] overflow-hidden rounded-[28px] border border-base-content/10 bg-base-200/30'>
            <div className='relative aspect-[3/5] overflow-hidden'>
              <div
                className='absolute inset-0'
                style={{
                  transformOrigin: `${activeSpot.x}% ${activeSpot.y}%`,
                  transform: `scale(${zoom})`,
                  transition: 'transform 420ms cubic-bezier(.2,.9,.2,1)',
                }}
              >
                <Image
                  src={imageSrc}
                  alt='Дверь'
                  fill
                  className='object-cover object-[50%_15%]'
                  priority
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent' />

                {/* Линии измерения + кликабельные input-лейблы */}
                <MeasureLineEditable
                  type='width'
                  active={focus === 'width'}
                  label='Ш:'
                  value={draftW}
                  inputRef={inputWRef}
                  onActivate={() => {
                    setFocus('width')
                    requestAnimationFrame(() => inputWRef.current?.focus())
                    requestAnimationFrame(() => inputWRef.current?.select())
                  }}
                  onChange={(v) => setDraftW(v)}
                  onCommit={applyWidth}
                />

                <MeasureLineEditable
                  type='height'
                  active={focus === 'height'}
                  label='В:'
                  value={draftH}
                  inputRef={inputHRef}
                  onActivate={() => {
                    setFocus('height')
                    requestAnimationFrame(() => inputHRef.current?.focus())
                    requestAnimationFrame(() => inputHRef.current?.select())
                  }}
                  onChange={(v) => setDraftH(v)}
                  onCommit={applyHeight}
                />
              </div>

              {/* подпись снизу — поверх, не зумится */}
              <div className='absolute bottom-3 left-3 right-3'>
                <div className='rounded-2xl bg-black/35 backdrop-blur px-3 py-2 text-white/90 text-xs flex items-center justify-between'>
                  <span>Текущий размер</span>
                  <b>
                    {w}×{h} см
                  </b>
                </div>
              </div>
            </div>
          </div>

          {focus !== 'none' && (
            <button
              type='button'
              className='absolute inset-0 rounded-[28px]'
              onClick={() => setFocus('none')}
              aria-label='Закрыть фокус'
            />
          )}
        </div>

        {/* Панель ввода (оставил как дубль + пресеты; можно убрать) */}
        {/* <div className='space-y-3 min-w-0'>

          <div className='rounded-3xl border border-base-content/10 bg-base-100/50 p-4'>
            <div className='grid grid-cols-2 gap-3'>
              <label className='form-control'>
                <div className='label'>
                  <span className='label-text'>Ширина (см)</span>
                </div>
                <input
                  type='number'
                  className='input input-bordered rounded-2xl focus-ring'
                  value={w}
                  min={30}
                  max={120}
                  onChange={(e) => setW(clamp(Number(e.target.value || 0), 30, 120))}
                />
              </label>

              <label className='form-control'>
                <div className='label'>
                  <span className='label-text'>Высота (см)</span>
                </div>
                <input
                  type='number'
                  className='input input-bordered rounded-2xl focus-ring'
                  value={h}
                  min={60}
                  max={220}
                  onChange={(e) => setH(clamp(Number(e.target.value || 0), 60, 220))}
                />
              </label>
            </div>

            {presets.length > 0 && (
              <div className='mt-3 flex flex-wrap gap-2'>
                {presets.map((p) => (
                  <button
                    key={p.label}
                    type='button'
                    className='btn btn-sm btn-ghost rounded-full'
                    onClick={() => {
                      setW(p.w)
                      setH(p.h)
                      setFocus('none')
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div> */}
      </div>
    </div>
  )
}

function MeasureLineEditable({
  type,
  active,
  label,
  value,
  inputRef,
  onActivate,
  onChange,
  onCommit,
}: {
  type: 'width' | 'height'
  active: boolean
  label: string // "Ш:" / "В:"
  value: string
  inputRef: React.RefObject<HTMLInputElement | null>
  onActivate: () => void
  onChange: (v: string) => void
  onCommit: () => void
}) {
  const isWidth = type === 'width'

  // Позиции по полотну двери (подстройте один раз под вашу картинку)
  const box = {
    left: '15%',
    right: '15%',
    topW: '6%',
    top: '8%',
    bottom: '8%',
    leftH: '84%',
  }

  const lineCls = 'bg-white/85 shadow-[0_0_0_1px_rgba(255,255,255,.18),0_10px_28px_rgba(0,0,0,.45)]'

  const labelCommon = [
    'absolute z-10 pointer-events-auto',
    'rounded-2xl px-2.5 py-1 whitespace-nowrap',
    'text-[11px] font-black tracking-tight',
    'text-white bg-black/65 backdrop-blur',
    'border border-white/15',
    'shadow-lg shadow-black/35',
    'transition-all duration-300',
    active ? 'opacity-100 ring-2 ring-white/30' : 'opacity-90',
    // “мигание”
    active ? 'animate-pulse' : 'animate-[pulse_2.2s_ease-in-out_infinite]',
  ].join(' ')

  return (
    <div
      className='absolute pointer-events-none'
      style={
        isWidth
          ? { left: box.left, right: box.right, top: box.topW, height: 0 }
          : { top: box.top, bottom: box.bottom, left: box.leftH, width: 0 }
      }
    >
      {/* label-input */}
      <button
        type='button'
        className='pointer-events-auto absolute inset-0'
        onClick={onActivate}
        aria-label={isWidth ? 'Редактировать ширину' : 'Редактировать высоту'}
        style={{ background: 'transparent' }}
      />

      <div
        className={labelCommon}
        style={
          isWidth
            ? {
                left: '50%',
                top: '-10px',
                transform: 'translateX(-50%)',
              }
            : {
                right: '-50px',
                top: '50%',
                rotate: '90deg',
              }
        }
        onMouseDown={(e) => {
          e.preventDefault()
          onActivate()
        }}
      >
        <span className='opacity-90 mr-1'>{label}</span>
        <input
          ref={inputRef}
          inputMode='numeric'
          className={[
            'bg-transparent outline-none',
            'w-[5ch] text-white',
            'placeholder:text-white/50',
          ].join(' ')}
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ''))}
          onFocus={() => {
            if (!active) onActivate()
          }}
          onBlur={onCommit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onCommit()
              ;(e.currentTarget as HTMLInputElement).blur()
            }
            if (e.key === 'Escape') {
              ;(e.currentTarget as HTMLInputElement).blur()
            }
          }}
          placeholder='—'
          aria-label={isWidth ? 'Ширина (см)' : 'Высота (см)'}
        />
        <span className='opacity-80 ml-1'>см</span>
      </div>

      {/* линия + анимация растяжки */}
      {isWidth ? (
        <div className='absolute left-0 right-0 top-0 -translate-y-1/2'>
          <div className={'relative h-[3px] rounded-full ' + lineCls}>
            <div
              className='absolute inset-0 rounded-full'
              style={{
                transformOrigin: 'center',
                transform: active ? 'scaleX(1)' : 'scaleX(0.45)',
                opacity: active ? 1 : 0.75,
                transition: 'transform 420ms cubic-bezier(.2,.9,.2,1), opacity 220ms ease',
              }}
            />
          </div>
          <ArrowCap
            dir='left'
            active={active}
          />
          <ArrowCap
            dir='right'
            active={active}
          />
        </div>
      ) : (
        <div className='absolute top-0 bottom-0 left-0 -translate-x-1/2'>
          <div className={'relative w-[3px] h-full rounded-full ' + lineCls}>
            <div
              className='absolute inset-0 rounded-full'
              style={{
                transformOrigin: 'center',
                transform: active ? 'scaleY(1)' : 'scaleY(0.45)',
                opacity: active ? 1 : 0.75,
                transition: 'transform 420ms cubic-bezier(.2,.9,.2,1), opacity 220ms ease',
              }}
            />
          </div>
          <ArrowCap
            dir='up'
            active={active}
          />
          <ArrowCap
            dir='down'
            active={active}
          />
        </div>
      )}
    </div>
  )
}

function ArrowCap({ dir, active }: { dir: 'left' | 'right' | 'up' | 'down'; active: boolean }) {
  const cls = [
    'absolute text-white drop-shadow-[0_10px_28px_rgba(0,0,0,.55)]',
    active ? 'opacity-100' : 'opacity-85',
    'transition-opacity duration-200',
  ].join(' ')

  const pos =
    dir === 'left'
      ? 'left-[-12px] top-1/2 -translate-y-1/2 rotate-180'
      : dir === 'right'
      ? 'right-[-12px] top-1/2 -translate-y-1/2'
      : dir === 'up'
      ? 'top-[-12px] left-1/2 -translate-x-1/2 -rotate-90'
      : 'bottom-[-12px] left-1/2 -translate-x-1/2 rotate-90'

  return (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      className={[cls, pos].join(' ')}
      fill='none'
      aria-hidden
    >
      <path
        d='M6 12h12M14 6l6 6-6 6'
        stroke='currentColor'
        strokeWidth='2.4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
