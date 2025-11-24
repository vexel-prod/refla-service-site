'use client'

import * as React from 'react'
import QuoteLeadForm from 'components/QuoteLeadForm/QuoteLeadForm'
import styles from './PricingClient.module.css'

/* ============================================
   Типы
   ============================================ */
type Region = 'spb' | 'area'

type Price =
  | { kind: 'free' }
  | { kind: 'from'; amount: number; unit?: string; affectsArea?: boolean }
  | { kind: 'perKm'; rate: number }
  | { kind: 'custom' }
  | { kind: 'na' }

type BaseServiceId = 'measure' | 'edge' | 'mount' | 'demount'

type GlassId =
  | 'glass_tempered'
  | 'glass_clear'
  | 'glass_tinted'
  | 'glass_satin'
  | 'glass_pattern'
  | 'glass_facet_incl'
  | 'glass_acrylic'
  | 'glass_titanium'
  | 'glass_aluminum'
  | 'glass_silvered'

type ServiceId = BaseServiceId | GlassId

type Service = {
  id: ServiceId
  name: string
  emoji?: string
  highlight?: 'best' | 'popular'
  description?: string
  included?: string[]
  pricing: { spb: Price; area: Price }
  note?: string
  kind: 'work' | 'glass'
}

/* ============================================
   Утилиты
   ============================================ */
const fmt = (n: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(n)

const RUB_M2 = (amount: number): Price => ({ kind: 'from', amount, unit: 'м²' })

const UPLIFT_AREA = 1.09
const applyAreaUplift = (base: number, region: Region, affects?: boolean, uf = UPLIFT_AREA) =>
  region === 'area' && affects ? Math.round(base * uf) : Math.round(base)

const isGlass = (id: ServiceId): id is GlassId =>
  [
    'glass_tempered',
    'glass_clear',
    'glass_tinted',
    'glass_satin',
    'glass_pattern',
    'glass_facet_incl',
    'glass_acrylic',
    'glass_titanium',
    'glass_aluminum',
    'glass_silvered',
  ].includes(id)

function getSelectedGlass(set: Set<ServiceId>): GlassId | null {
  for (const id of set) {
    if (isGlass(id)) return id
  }
  return null
}

function getGlassPricePerM2(id: GlassId, region: Region) {
  const svc = SERVICES.find((s) => s.id === id)!
  const p = svc.pricing[region]
  if (p.kind === 'from') return p.amount
  return 0
}

/* ============================================
   ПРАЙС
   ============================================ */
const SERVICES: Service[] = [
  // работы
  {
    id: 'measure',
    kind: 'work',
    name: 'Замер и консультация',
    pricing: { spb: { kind: 'free' }, area: { kind: 'perKm', rate: 27 } },
    description: 'Снимаем размеры и даём рекомендации.',
    included: ['Замер', 'Подбор варианта', 'Черновая смета'],
  },
  {
    id: 'edge',
    kind: 'work',
    name: 'Обработка кромки (пог.м)',
    pricing: {
      spb: { kind: 'from', amount: 870, unit: 'м', affectsArea: true },
      area: { kind: 'from', amount: 870, unit: 'м', affectsArea: true },
    },
    description: 'Полировка или фацет.',
  },
  {
    id: 'mount',
    kind: 'work',
    name: 'Монтаж',
    pricing: {
      spb: { kind: 'from', amount: 3750, affectsArea: true },
      area: { kind: 'from', amount: 3750, affectsArea: true },
    },
  },
  {
    id: 'demount',
    kind: 'work',
    name: 'Демонтаж',
    pricing: {
      spb: { kind: 'from', amount: 1650, affectsArea: true },
      area: { kind: 'from', amount: 1650, affectsArea: true },
    },
  },

  // материалы
  {
    id: 'glass_tempered',
    kind: 'glass',
    name: 'Зеркало закалённое',
    pricing: { spb: RUB_M2(6590), area: RUB_M2(6590) },
  },
  {
    id: 'glass_clear',
    kind: 'glass',
    name: 'Прозрачное',
    pricing: { spb: RUB_M2(5490), area: RUB_M2(5490) },
  },
  {
    id: 'glass_tinted',
    kind: 'glass',
    name: 'Тонированное',
    pricing: { spb: RUB_M2(6290), area: RUB_M2(6290) },
  },
  {
    id: 'glass_satin',
    kind: 'glass',
    name: 'Satinato',
    pricing: { spb: RUB_M2(6790), area: RUB_M2(6790) },
  },
  {
    id: 'glass_pattern',
    kind: 'glass',
    name: 'С узором',
    pricing: { spb: RUB_M2(7290), area: RUB_M2(7290) },
  },
  {
    id: 'glass_facet_incl',
    kind: 'glass',
    name: 'С фацетом (включён)',
    pricing: { spb: RUB_M2(7990), area: RUB_M2(7990) },
  },
  {
    id: 'glass_acrylic',
    kind: 'glass',
    name: 'Акрил',
    pricing: { spb: RUB_M2(4890), area: RUB_M2(4890) },
  },
  {
    id: 'glass_titanium',
    kind: 'glass',
    name: 'Титановое',
    pricing: { spb: RUB_M2(8890), area: RUB_M2(8890) },
  },
  {
    id: 'glass_aluminum',
    kind: 'glass',
    name: 'Алюминиевое',
    pricing: { spb: RUB_M2(5790), area: RUB_M2(5790) },
  },
  {
    id: 'glass_silvered',
    kind: 'glass',
    name: 'Посеребрённое',
    pricing: { spb: RUB_M2(6990), area: RUB_M2(6990) },
  },
]

/* ============================================
   Калькуляция
   ============================================ */
function mmToM2(w: number, h: number) {
  return (Math.max(w, 0) * Math.max(h, 0)) / 1_000_000
}

function perimeter(w: number, h: number) {
  return ((Math.max(w, 0) + Math.max(h, 0)) * 2) / 1000
}

function calcTotal(s: CalcState) {
  const m2 = mmToM2(s.width, s.height)
  const perim = s.edgeMeters > 0 ? s.edgeMeters : perimeter(s.width, s.height)

  const glassId = getSelectedGlass(s.selected)
  let glass = 0
  if (glassId) {
    const rate = getGlassPricePerM2(glassId, s.region)
    glass = Math.round(m2 * rate)
  }

  const facetIncluded = glassId === 'glass_facet_incl'

  let edge = 0
  if (!facetIncluded && s.selected.has('edge') && s.edgeType !== 'none') {
    const base = s.edgeType === 'facet' ? perim * 870 * 1.6 : perim * 870
    edge = applyAreaUplift(base, s.region, true)
  }

  let mount = s.selected.has('mount') ? applyAreaUplift(3750, s.region, true) : 0
  let demount = s.selected.has('demount') ? applyAreaUplift(1650, s.region, true) : 0

  let travel = 0
  if (s.region === 'area' && s.selected.has('measure')) {
    travel = Math.round(Math.max(s.kmFromKAD, 0) * 27 * 2)
  }

  const total = glass + edge + mount + demount + travel

  return {
    m2,
    perim,
    parts: { glass, edge, mount, demount, travel },
    enabled: {
      edge: !!edge,
      mount: !!mount,
      demount: !!demount,
      travel: travel > 0,
    },
    total,
  }
}

/* ============================================
   Состояние
   ============================================ */
type EdgeType = 'polish' | 'facet' | 'none'

type CalcState = {
  region: Region
  width: number
  height: number
  edgeType: EdgeType
  edgeMeters: number
  includeMount: boolean
  includeDemount: boolean
  kmFromKAD: number
  selected: Set<ServiceId>
}

/* ============================================
   UI helpers
   ============================================ */
function Badge({ children }: { children: React.ReactNode }) {
  return <span className={styles.badge}>{children}</span>
}

function PriceView({ price, region }: { price: Price; region: Region }) {
  if (price.kind === 'free') return <Badge>бесплатно</Badge>
  if (price.kind === 'custom') return <Badge>индивидуально</Badge>
  if (price.kind === 'na') return <span className='muted'>—</span>

  if (price.kind === 'perKm') {
    return (
      <span className={styles.price}>
        <strong>{fmt(price.rate)}</strong>
        <span className={styles.unit}> / км</span>
      </span>
    )
  }

  const val = applyAreaUplift(price.amount, region, price.affectsArea)

  return (
    <span className={styles.price}>
      <span className={styles.pricePart}>от </span>
      <strong>{fmt(val)}</strong>
      {price.unit ? <span className={styles.unit}> / {price.unit}</span> : null}
    </span>
  )
}

/* ============================================
   КОМПОНЕНТ
   ============================================ */
export function PricingClient() {
  const [region, setRegion] = React.useState<Region>('spb')

  const [state, setState] = React.useState<CalcState>({
    region,
    width: 0,
    height: 0,
    edgeType: 'none',
    edgeMeters: 0,
    includeMount: false,
    includeDemount: false,
    kmFromKAD: 0,
    selected: new Set(),
  })

  React.useEffect(() => {
    setState((p) => ({ ...p, region }))
  }, [region])

  /* ========== ГЛАВНЫЙ ФИКС – НОВЫЙ toggleService (правильный!) ========== */
  function toggleService(id: ServiceId) {
    setState((prev) => {
      const next = new Set(prev.selected)

      // клик по материалу — эксклюзивный
      if (isGlass(id)) {
        for (const sid of next) {
          if (isGlass(sid)) next.delete(sid)
        }

        if (prev.selected.has(id)) {
          next.delete(id)
          return {
            ...prev,
            selected: new Set(next),
            edgeType: prev.edgeType,
          }
        }

        next.add(id)

        // выбран материал с фацетом — отключаем edge
        if (id === 'glass_facet_incl') {
          next.delete('edge')
          return { ...prev, selected: new Set(next), edgeType: 'none' }
        }

        return { ...prev, selected: new Set(next) }
      }

      // обычная услуга (работы)
      if (next.has(id)) {
        next.delete(id)

        // если edge снят — обнуляем edgeType
        if (id === 'edge') {
          return {
            ...prev,
            selected: new Set(next),
            edgeType: 'none',
          }
        }

        return { ...prev, selected: new Set(next) }
      }

      // ▶ добавляем новую услугу
      next.add(id)

      let edgeType = prev.edgeType
      if (id === 'edge' && edgeType === 'none') {
        edgeType = 'polish'
      }

      return {
        ...prev,
        selected: new Set(next),
        edgeType,
      }
    })
  }

  const res = React.useMemo(() => calcTotal(state), [state])
  const services = React.useMemo(() => SERVICES, [])

  const selectedNames = services.filter((s) => state.selected.has(s.id)).map((s) => s.name)

  const canSubmit = selectedNames.length >= 1

  const safe = (n: number, d = 0) => (Number.isFinite(n) ? n : d)

  const quotePayload = {
    region,
    width: safe(state.width),
    height: safe(state.height),
    edgeType: state.edgeType,
    includeMount: state.selected.has('mount'),
    includeDemount: state.selected.has('demount'),
    kmFromKAD: safe(state.kmFromKAD),
    m2: Number(res.m2.toFixed(3)),
    perim: Number(res.perim.toFixed(3)),
    parts: res.parts,
    total: res.total,
    selectedServices: selectedNames,
    canSubmit,
  }

  /* ============================================
     JSX
     ============================================ */
  return (
    <main>
      <section className='topSection'>
        <div className={styles.hero}>
          <h1 className='page-title'>Прайс — выберите услуги для расчёта</h1>
          <h2 className='page-sub'>Стоимость учитывается автоматически</h2>

          <p className='page-text'>Выберите ваш регион:</p>
          <div className={styles.region}>
            <button
              type='button'
              className={`${styles.pill} ${region === 'spb' ? styles.pillActive : ''}`}
              onClick={() => setRegion('spb')}
            >
              СПБ
            </button>
            <button
              type='button'
              className={`${styles.pill} ${region === 'area' ? styles.pillActive : ''}`}
              onClick={() => setRegion('area')}
            >
              Область
            </button>
          </div>
        </div>
      </section>

      {/* Карточки услуг */}
      <section>
        <div className={styles.cards}>
          {services.map((s) => {
            const price = s.pricing[region]
            const active = state.selected.has(s.id)

            return (
              <button
                key={s.id}
                type='button'
                className={`${styles.card} ${styles.service} ${active ? styles.serviceActive : ''}`}
                onClick={() => toggleService(s.id)}
                aria-pressed={active}
              >
                <div className={styles.checkMark} aria-hidden>
                  {active ? '✔' : ''}
                </div>

                <div className={styles.serviceTitle}>{s.name}</div>
                {s.description && <div className={styles.serviceDesc}>{s.description}</div>}

                <div className={styles.servicePrice}>
                  <PriceView price={price} region={region} />
                </div>

                {s.note && <div className={styles.note}>* {s.note}</div>}
              </button>
            )
          })}
        </div>
      </section>

      {/* Калькулятор */}
      <section>
        <div className='sub-wrapper'>
          <h2 className='page-sub'>Параметры полотна</h2>
        </div>

        <div>
          <div className={styles.calc}>
            <div className={styles.calcField}>
              <label className='label'>Ширина (мм)</label>
              <input
                suppressHydrationWarning
                className='input'
                type='number'
                min={300}
                max={1200}
                step={10}
                value={Number.isFinite(state.width) ? state.width : ''}
                onChange={(e) =>
                  setState((p) => ({
                    ...p,
                    width: e.target.value === '' ? NaN : Number(e.target.value),
                  }))
                }
                onBlur={(e) => {
                  if (e.target.value === '') {
                    setState((p) => ({ ...p, width: 500 }))
                  }
                }}
              />
            </div>

            <div className={styles.calcField}>
              <label className='label'>Высота (мм)</label>
              <input
                suppressHydrationWarning
                className='input'
                type='number'
                min={800}
                max={2300}
                step={10}
                value={Number.isFinite(state.height) ? state.height : ''}
                onChange={(e) =>
                  setState((p) => ({
                    ...p,
                    height: e.target.value === '' ? NaN : Number(e.target.value),
                  }))
                }
                onBlur={(e) => {
                  if (e.target.value === '') {
                    setState((p) => ({ ...p, height: 1600 }))
                  }
                }}
              />
            </div>

            {/* Кромка */}
            <div className={styles.calcField}>
              <label className='label'>Тип кромки</label>
              <select
                suppressHydrationWarning
                className='input'
                value={state.edgeType}
                onChange={(e) => setState((p) => ({ ...p, edgeType: e.target.value as EdgeType }))}
                disabled={getSelectedGlass(state.selected) === 'glass_facet_incl'}
              >
                <option value='none'>Без обработки</option>
                <option value='polish'>Полировка</option>
                <option value='facet'>Фацет</option>
              </select>
            </div>

            <div className={styles.calcField}>
              <label className='label'>Периметр (м)</label>
              <input
                suppressHydrationWarning
                className='input'
                type='number'
                min={0}
                step={0.1}
                value={Number.isFinite(state.edgeMeters) ? state.edgeMeters : ''}
                onChange={(e) =>
                  setState((p) => ({
                    ...p,
                    edgeMeters: e.target.value === '' ? NaN : Number(e.target.value),
                  }))
                }
              />
              <div className='helper'>0 — рассчитывается автоматически</div>
            </div>

            {region === 'area' && (
              <div className={styles.calcField}>
                <label className='label'>Расстояние от КАД (км)</label>
                <input
                  suppressHydrationWarning
                  className='input'
                  type='number'
                  min={0}
                  step={1}
                  value={Number.isFinite(state.kmFromKAD) ? state.kmFromKAD : ''}
                  onChange={(e) =>
                    setState((p) => ({
                      ...p,
                      kmFromKAD: e.target.value === '' ? NaN : Number(e.target.value),
                    }))
                  }
                />
              </div>
            )}
          </div>

          {/* Разбивка */}
          <div className={styles.breakdown}>
            {res.parts.glass > 0 && (
              <div className={styles.line}>
                <span>Зеркало</span>
                <b>{fmt(res.parts.glass)}</b>
              </div>
            )}

            {res.enabled.edge && (
              <div className={styles.line}>
                <span>Кромка</span>
                <b>{fmt(res.parts.edge)}</b>
              </div>
            )}

            {res.enabled.mount && (
              <div className={styles.line}>
                <span>Монтаж</span>
                <b>{fmt(res.parts.mount)}</b>
              </div>
            )}

            {res.enabled.demount && (
              <div className={styles.line}>
                <span>Демонтаж</span>
                <b>{fmt(res.parts.demount)}</b>
              </div>
            )}

            {res.enabled.travel && (
              <div className={styles.line}>
                <span>Выезд</span>
                <b>{fmt(res.parts.travel)}</b>
              </div>
            )}

            <div className={`${styles.line} ${styles.total}`}>
              <span>Итого</span>
              <b>{fmt(res.total)}</b>
            </div>
          </div>
        </div>
      </section>

      {/* Форма */}
      <section>
        <div className='sub-wrapper'>
          <h2 className='page-sub'>Оформить заявку</h2>
        </div>
        <QuoteLeadForm quote={quotePayload} />
      </section>
    </main>
  )
}
