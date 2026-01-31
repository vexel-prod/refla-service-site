'use client'

import * as React from 'react'
import PricingDoorVizPhoto from 'components/PricingDoorViz/PricingDoorVizPhoto'

type Region = 'spb' | 'area'
type Service = 'mirror' | 'measure' | 'install' | 'demount' | 'delivery' | 'turnkey'
type Material = 'silver' | 'ultra' | 'graphite' | 'bronze'
type Thickness = 3 | 4 | 5

const money = (n: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(Math.round(n))

const SIZE_PRESETS = [
  { w: 60, h: 180, label: '60×180' },
  { w: 70, h: 200, label: '70×200' },
  { w: 80, h: 200, label: '80×200' },
  { w: 60, h: 190, label: '60×190' },
]

const SERVICES: { id: Service; label: string; desc: string; badge?: string }[] = [
  { id: 'turnkey', label: 'Под ключ', desc: 'Зеркало + монтаж', badge: 'популярно' },
  { id: 'mirror', label: 'Только зеркало', desc: 'Изготовление по размеру' },
  { id: 'measure', label: 'Замер', desc: 'Выезд и консультация' },
  { id: 'install', label: 'Монтаж', desc: 'Установка на дверь' },
  { id: 'demount', label: 'Демонтаж', desc: 'Снятие старого зеркала' },
  { id: 'delivery', label: 'Доставка', desc: 'Привезём по адресу' },
]

const MATERIALS: { id: Material; label: string; hint: string; k: number }[] = [
  { id: 'silver', label: 'Классическое', hint: 'Базовый вариант', k: 1.0 },
  { id: 'ultra', label: 'Осветлённое', hint: 'Ultra Clear', k: 1.25 },
  { id: 'graphite', label: 'Графит', hint: 'Тёмный оттенок', k: 1.15 },
  { id: 'bronze', label: 'Бронза', hint: 'Тёплый оттенок', k: 1.15 },
]

const THICKNESS: { id: Thickness; label: string; k: number }[] = [
  { id: 3, label: '3 мм', k: 1.0 },
  { id: 4, label: '4 мм', k: 1.08 },
  { id: 5, label: '5 мм', k: 1.18 },
]

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function calcAreaM2(wCm: number, hCm: number) {
  return Math.max(0.2, (wCm / 100) * (hCm / 100))
}

function calcPrice({
  region,
  service,
  w,
  h,
  edge,
  cutouts,
  oldMirror,
  km,
  material,
  thickness,
  safetyFilm,
  urgent,
}: {
  region: Region
  service: Service
  w: number
  h: number
  edge: 'polish' | 'facet'
  cutouts: boolean
  oldMirror: boolean
  km: number
  material: Material
  thickness: Thickness
  safetyFilm: boolean
  urgent: boolean
}) {
  const areaM2 = calcAreaM2(w, h)

  const baseGlass = 6900
  const perM2 = 5200

  const mountBase = 3900
  const measureBase = 1200
  const demountBase = 1500
  const facetAdd = 2200
  const cutoutAdd = 1800
  const safetyFilmAdd = 900

  const areaDeliveryRate = 60
  const delivery = region === 'area' ? km * areaDeliveryRate : 0

  const materialK = MATERIALS.find((m) => m.id === material)?.k ?? 1
  const thicknessK = THICKNESS.find((t) => t.id === thickness)?.k ?? 1

  let glass = baseGlass + Math.max(0, areaM2 - 0.8) * perM2
  glass *= materialK
  glass *= thicknessK

  const edgePart = edge === 'facet' ? facetAdd : 0
  const cutoutsPart = cutouts ? cutoutAdd : 0
  const safetyPart = safetyFilm ? safetyFilmAdd : 0
  const demountPart = oldMirror ? demountBase : 0

  const mountPart = mountBase
  const measurePart = measureBase

  const parts = {
    glass: 0,
    edge: 0,
    options: 0,
    mount: 0,
    demount: 0,
    measure: 0,
    travel: 0,
  }

  if (service === 'mirror') {
    parts.glass = glass
    parts.edge = edgePart
    parts.options = cutoutsPart + safetyPart
  }

  if (service === 'install') {
    parts.mount = mountPart
  }

  if (service === 'measure') {
    parts.measure = measurePart
  }

  if (service === 'demount') {
    parts.demount = demountBase
  }

  if (service === 'delivery') {
    parts.travel = delivery
  }

  if (service === 'turnkey') {
    parts.glass = glass
    parts.edge = edgePart
    parts.options = cutoutsPart + safetyPart
    parts.mount = mountPart
    parts.demount = demountPart
    parts.travel = delivery
    parts.measure = 0
  }

  let subtotal =
    parts.glass +
    parts.edge +
    parts.options +
    parts.mount +
    parts.demount +
    parts.measure +
    parts.travel

  const urgentPart = urgent ? subtotal * 0.12 : 0
  subtotal += urgentPart
  parts.options += urgentPart

  return {
    areaM2,
    delivery,
    parts,
    total: Math.round(subtotal),
  }
}

export function PricingClient() {
  const [region, setRegion] = React.useState<Region>('spb')
  const [service, setService] = React.useState<Service>('turnkey')

  const [w, setW] = React.useState(60)
  const [h, setH] = React.useState(120)

  const [material, setMaterial] = React.useState<Material>('silver')
  const [thickness, setThickness] = React.useState<Thickness>(4)

  const [edge, setEdge] = React.useState<'polish' | 'facet'>('polish')
  const [cutouts, setCutouts] = React.useState(false)
  const [oldMirror, setOldMirror] = React.useState(false)
  const [safetyFilm, setSafetyFilm] = React.useState(false)
  const [urgent, setUrgent] = React.useState(false)

  const [km, setKm] = React.useState(10)

  const { areaM2, parts, total, delivery } = React.useMemo(
    () =>
      calcPrice({
        region,
        service,
        w: clamp(w, 30, 120),
        h: clamp(h, 60, 220),
        edge,
        cutouts,
        oldMirror,
        km: clamp(km, 0, 200),
        material,
        thickness,
        safetyFilm,
        urgent,
      }),
    [region, service, w, h, edge, cutouts, oldMirror, km, material, thickness, safetyFilm, urgent],
  )

  const showMirrorParams = service === 'mirror' || service === 'turnkey'
  const showDeliveryKm = region === 'area' && (service === 'turnkey' || service === 'delivery')

  const buildEstimate = React.useCallback(() => {
    const serviceLabel = SERVICES.find((x) => x.id === service)?.label ?? service
    const materialLabel = MATERIALS.find((x) => x.id === material)?.label ?? material
    const thicknessLabel = THICKNESS.find((x) => x.id === thickness)?.label ?? `${thickness} мм`

    const lines: string[] = []
    lines.push('Смета с калькулятора:')
    lines.push(`Услуга: ${serviceLabel}`)
    lines.push(`Регион: ${region === 'spb' ? 'СПб' : 'Область'}`)
    lines.push(`Размер: ${w}×${h} см (≈ ${areaM2.toFixed(2)} м²)`)

    if (showMirrorParams) {
      lines.push(`Материал: ${materialLabel}`)
      lines.push(`Толщина: ${thicknessLabel}`)
      lines.push(`Кромка: ${edge === 'facet' ? 'Фацет' : 'Полировка'}`)
      if (cutouts) lines.push('Опция: Вырезы под фурнитуру')
      if (safetyFilm) lines.push('Опция: Защитная плёнка')
      if (oldMirror) lines.push('Опция: Демонтаж старого зеркала')
      if (urgent) lines.push('Опция: Срочно (+12%)')
    }

    if (showDeliveryKm) {
      lines.push(`Удалённость: ${km} км от КАД (доставка: ${money(delivery)})`)
    }

    lines.push('')
    lines.push('Разбивка:')
    if (parts.glass) lines.push(`— Зеркало: ${money(parts.glass)}`)
    if (parts.edge) lines.push(`— Кромка: ${money(parts.edge)}`)
    if (parts.options) lines.push(`— Опции: ${money(parts.options)}`)
    if (parts.mount) lines.push(`— Монтаж: ${money(parts.mount)}`)
    if (parts.demount) lines.push(`— Демонтаж: ${money(parts.demount)}`)
    if (parts.measure) lines.push(`— Замер: ${money(parts.measure)}`)
    if (parts.travel) lines.push(`— Доставка: ${money(parts.travel)}`)

    lines.push('')
    lines.push(`Итого: ${money(total)}`)

    return lines.join('\n')
  }, [
    service,
    region,
    w,
    h,
    areaM2,
    showMirrorParams,
    material,
    thickness,
    edge,
    cutouts,
    safetyFilm,
    oldMirror,
    urgent,
    showDeliveryKm,
    km,
    delivery,
    parts,
    total,
  ])

  const goToRequest = React.useCallback(() => {
    sessionStorage.setItem('lead_prefill_comment', buildEstimate())
    window.location.href = '/request'
  }, [buildEstimate])

  return (
    <section className='section'>
      <div className='container'>
        <div className='flex items-end justify-between gap-6 flex-wrap'>
          <div>
            <h1 className='text-3xl md:text-4xl font-black tracking-tight'>Цены и калькулятор</h1>
            <p className='mt-3 text-base-content/70 max-w-2xl'>
              Ниже — ориентировочный расчёт. Точная стоимость зависит от размеров, кромки, вырезов и
              особенностей двери — согласуем на замере.
            </p>
          </div>
          <div className='join'>
            <button
              className={
                'btn join-item rounded-full ' + (region === 'spb' ? 'btn-primary' : 'btn-ghost')
              }
              onClick={() => setRegion('spb')}
              type='button'
            >
              СПб
            </button>
            <button
              className={
                'btn join-item rounded-full ' + (region === 'area' ? 'btn-primary' : 'btn-ghost')
              }
              onClick={() => setRegion('area')}
              type='button'
            >
              Область
            </button>
          </div>
        </div>

        <div className='flex flex-col gap-5 mt-5'>
          <div className='card-surface gradient-border p-6 md:p-8'>
            <div className='flex items-center justify-between gap-4'>
              <div className='text-xl md:text-2xl font-black tracking-tight'>Калькулятор</div>
              <div className='badge badge-outline'>live</div>
            </div>

            <div className='mt-6'>
              <div className='text-sm text-base-content/70 mb-2'>Выберите услугу</div>
              <div className='grid gap-2 sm:grid-cols-2'>
                {SERVICES.map((s) => {
                  const active = service === s.id
                  return (
                    <button
                      key={s.id}
                      type='button'
                      onClick={() => setService(s.id)}
                      className={[
                        'text-left rounded-3xl border p-4 transition',
                        active
                          ? 'border-base-content/20 gradient-border bg-base-100/70 shadow-lg shadow-base-300/20'
                          : 'border-base-content/10  bg-base-100/40 hover:bg-base-100/60',
                      ].join(' ')}
                    >
                      <div className='flex items-center justify-between gap-3'>
                        <div className='font-bold'>{s.label}</div>
                        {s.badge && <span className='badge badge-primary'>{s.badge}</span>}
                      </div>
                      <div className='text-xs text-base-content/70 mt-1'>{s.desc}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {showMirrorParams && (
              <div className='flex flex-col gap-6 mt-2'>
                <PricingDoorVizPhoto
                  w={w}
                  h={h}
                  setW={setW}
                  setH={setH}
                  imageSrc='/assets/door.png'
                />

                <div className='grid gap-4'>
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
                        onChange={(e) => setW(Number(e.target.value || 0))}
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
                        onChange={(e) => setH(Number(e.target.value || 0))}
                      />
                    </label>
                  </div>

                  <div className='flex flex-wrap gap-2'>
                    {SIZE_PRESETS.map((p) => {
                      const active = w === p.w && h === p.h
                      return (
                        <button
                          key={p.label}
                          type='button'
                          className={[
                            'btn btn-sm rounded-full',
                            active ? 'btn-primary' : 'btn-ghost',
                            'focus-ring',
                          ].join(' ')}
                          onClick={() => {
                            setW(p.w)
                            setH(p.h)
                          }}
                        >
                          {p.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className='rounded-3xl border border-base-content/10 bg-base-100/50 p-4'>
                  <div className='text-sm text-base-content/70'>
                    Площадь: <b>{areaM2.toFixed(2)} м²</b>
                  </div>
                </div>

                <div className='grid gap-3 sm:grid-cols-2'>
                  <div className='form-control'>
                    <div className='label'>
                      <span className='label-text'>Материал</span>
                    </div>
                    <select
                      className='select select-bordered rounded-2xl focus-ring'
                      value={material}
                      onChange={(e) => setMaterial(e.target.value as any)}
                    >
                      {MATERIALS.map((m) => (
                        <option
                          key={m.id}
                          value={m.id}
                        >
                          {m.label}
                        </option>
                      ))}
                    </select>
                    <div className='label'>
                      <span className='label-text-alt text-base-content/60'>
                        {MATERIALS.find((m) => m.id === material)?.hint}
                      </span>
                    </div>
                  </div>

                  <div className='form-control'>
                    <div className='label'>
                      <span className='label-text'>Толщина</span>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      {THICKNESS.map((t) => (
                        <button
                          key={t.id}
                          type='button'
                          className={[
                            'btn btn-sm rounded-full',
                            thickness === t.id ? 'btn-primary' : 'btn-ghost',
                            'focus-ring',
                          ].join(' ')}
                          onClick={() => setThickness(t.id)}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className='grid gap-3'>
                  <div className='form-control'>
                    <div className='label'>
                      <span className='label-text'>Кромка</span>
                    </div>
                    <select
                      className='select select-bordered rounded-2xl focus-ring'
                      value={edge}
                      onChange={(e) => setEdge(e.target.value as any)}
                    >
                      <option value='polish'>Полировка</option>
                      <option value='facet'>Фацет</option>
                    </select>
                  </div>

                  <label className='label cursor-pointer justify-start gap-3'>
                    <input
                      type='checkbox'
                      className='toggle toggle-primary'
                      checked={cutouts}
                      onChange={(e) => setCutouts(e.target.checked)}
                    />
                    <span className='label-text'>Вырезы под фурнитуру</span>
                  </label>

                  <label className='label cursor-pointer justify-start gap-3'>
                    <input
                      type='checkbox'
                      className='toggle toggle-primary'
                      checked={safetyFilm}
                      onChange={(e) => setSafetyFilm(e.target.checked)}
                    />
                    <span className='label-text'>Защитная плёнка</span>
                  </label>

                  <label className='label cursor-pointer justify-start gap-3'>
                    <input
                      type='checkbox'
                      className='toggle toggle-primary'
                      checked={oldMirror}
                      onChange={(e) => setOldMirror(e.target.checked)}
                    />
                    <span className='label-text'>Демонтаж старого зеркала</span>
                  </label>

                  <label className='label cursor-pointer justify-start gap-3'>
                    <input
                      type='checkbox'
                      className='toggle toggle-primary'
                      checked={urgent}
                      onChange={(e) => setUrgent(e.target.checked)}
                    />
                    <span className='label-text'>Срочно (коэф. +12%)</span>
                  </label>
                </div>
              </div>
            )}

            {showDeliveryKm && (
              <div className='mt-6 form-control'>
                <div className='label'>
                  <span className='label-text'>Удалённость (км от КАД)</span>
                </div>
                <input
                  type='number'
                  className='input input-bordered rounded-2xl focus-ring'
                  value={km}
                  min={0}
                  max={200}
                  onChange={(e) => setKm(Number(e.target.value || 0))}
                />
                <div className='label'>
                  <span className='label-text-alt text-base-content/60'>
                    Доставка: {money(delivery)}
                  </span>
                </div>
              </div>
            )}

            <div className='divider my-6' />

            <div className='grid gap-4'>
              <div className='flex items-end justify-between gap-6'>
                <div>
                  <div className='text-sm text-base-content/60'>Итого (ориентир)</div>
                  <div className='text-3xl font-black tracking-tight'>{money(total)}</div>
                  <div className='text-xs text-base-content/60 mt-1'>
                    Точная цена — после замера
                  </div>
                </div>

                <button
                  type='button'
                  onClick={goToRequest}
                  className='btn btn-primary rounded-full'
                >
                  Заказать замер
                </button>
              </div>

              <details className='rounded-3xl border border-base-content/10 bg-base-100/50 p-4'>
                <summary className='cursor-pointer font-semibold'>Как считается</summary>
                <div className='mt-3 space-y-2 text-sm'>
                  <Row
                    label='Зеркало'
                    value={money(parts.glass)}
                    muted={!parts.glass}
                  />
                  <Row
                    label='Кромка'
                    value={money(parts.edge)}
                    muted={!parts.edge}
                  />
                  <Row
                    label='Опции'
                    value={money(parts.options)}
                    muted={!parts.options}
                  />
                  <Row
                    label='Монтаж'
                    value={money(parts.mount)}
                    muted={!parts.mount}
                  />
                  <Row
                    label='Демонтаж'
                    value={money(parts.demount)}
                    muted={!parts.demount}
                  />
                  <Row
                    label='Замер'
                    value={money(parts.measure)}
                    muted={!parts.measure}
                  />
                  <Row
                    label='Доставка'
                    value={money(parts.travel)}
                    muted={!parts.travel}
                  />
                </div>
              </details>
            </div>
          </div>

          {/* Sticky итог на мобилке — БЕЗ горизонтального скролла */}
          <div className='lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-[520px] px-4'>
            <div className='rounded-3xl border border-base-content/10 bg-base-100/80 supports-[backdrop-filter]:bg-base-100/60 backdrop-blur-xl p-4 shadow-lg shadow-base-300/30 overflow-hidden'>
              <div className='flex items-center justify-between gap-3 min-w-0'>
                <div className='text-sm text-base-content/70'>Итого</div>
                <div className='text-xl font-black whitespace-nowrap'>{money(total)}</div>
              </div>

              <div className='mt-2'>
                <button
                  type='button'
                  onClick={goToRequest}
                  className='btn btn-primary rounded-full w-full'
                >
                  Оставить заявку
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div
      className={['flex items-center justify-between gap-3', muted ? 'opacity-60' : ''].join(' ')}
    >
      <div className='text-base-content/70'>{label}</div>
      <div className='font-semibold'>{value}</div>
    </div>
  )
}
