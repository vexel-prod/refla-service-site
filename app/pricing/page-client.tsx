'use client'

import * as React from 'react'
import QuoteLeadForm from 'components/QuoteLeadForm/QuoteLeadForm'
import styles from './PricingClient.module.css'
import TiltCard from 'components/TiltCard/TiltCard'

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
    description:
      'Приезжаем, делаем замер дверного полотна, обсуждаем задачи и подбираем оптимальное решение.',
    included: ['Замер полотна и проёма', 'Подбор материала и кромки', 'Черновая смета и сроки'],
  },
  {
    id: 'edge',
    kind: 'work',
    name: 'Обработка кромки (пог.м)',
    pricing: {
      spb: { kind: 'from', amount: 870, unit: 'м', affectsArea: true },
      area: { kind: 'from', amount: 870, unit: 'м', affectsArea: true },
    },
    description:
      'Делаем безопасную и аккуратную кромку: полировка — лаконично, фацет — выразительный объём.',
    included: ['Шлифовка торца', 'Полировка или фацет', 'Контроль геометрии кромки'],
    note: 'Фацет считается с коэффициентом, итог зависит от ширины и рисунка.',
  },
  {
    id: 'mount',
    kind: 'work',
    name: 'Монтаж',
    pricing: {
      spb: { kind: 'from', amount: 3750, affectsArea: true },
      area: { kind: 'from', amount: 3750, affectsArea: true },
    },
    description:
      'Устанавливаем зеркало на дверное полотно: ровно по уровню, без смещений и перекосов.',
    included: ['Подготовка полотна', 'Разметка и примерка', 'Крепление на клей/крепёж'],
    note: 'Финальная цена зависит от материала полотна и сложности доступа.',
  },
  {
    id: 'demount',
    kind: 'work',
    name: 'Демонтаж',
    pricing: {
      spb: { kind: 'from', amount: 1650, affectsArea: true },
      area: { kind: 'from', amount: 1650, affectsArea: true },
    },
    description: 'Аккуратно снимаем старое зеркало или панели, готовим дверь под новый монтаж.',
    included: [
      'Защита прилегающих поверхностей',
      'Снятие старого зеркала/крепежа',
      'Базовая очистка полотна',
    ],
    note: 'Сложный демонтаж (много клея, скрытый крепёж) может считаться индивидуально.',
  },

  // материалы
  {
    id: 'glass_tempered',
    kind: 'glass',
    name: 'Зеркало закалённое',
    pricing: { spb: RUB_M2(6590), area: RUB_M2(6590) },
    description:
      'Безопасное ударостойкое стекло: подходит для активных прихожих и семей с детьми или животными.',
    included: [
      'Закалённое стекло 4–6 мм',
      'Повышенная прочность',
      'Безопасный характер разрушения',
    ],
    note: 'Рекомендуем для металлических дверей и интенсивной эксплуатации.',
  },
  {
    id: 'glass_clear',
    kind: 'glass',
    name: 'Прозрачное',
    pricing: { spb: RUB_M2(5490), area: RUB_M2(5490) },
    description:
      'Классическое зеркало без оттенка: универсальный вариант, который подходит к большинству интерьеров.',
    included: [
      'Нейтральный цвет отражения',
      'Хорошая передача оттенков',
      'Оптимальное решение по бюджету',
    ],
  },
  {
    id: 'glass_tinted',
    kind: 'glass',
    name: 'Тонированное',
    pricing: { spb: RUB_M2(6290), area: RUB_M2(6290) },
    description:
      'Бронза или графит: добавляет глубину и мягкий оттенок, делает полотно более декоративным.',
    included: [
      'Бронзовый или графитовый тон',
      'Мягкое “подтягивание” цветов',
      'Эффект более камерной прихожей',
    ],
    note: 'Чуть приглушает свет — это стоит учитывать при слабом освещении.',
  },
  {
    id: 'glass_satin',
    kind: 'glass',
    name: 'Satinato',
    pricing: { spb: RUB_M2(6790), area: RUB_M2(6790) },
    description:
      'Матированное стекло с мягким рассеиванием: меньше бликов и отпечатков, более спокойный вид.',
    included: [
      'Матированная поверхность',
      'Меньше видны следы рук',
      'Мягкое отражение без резких бликов',
    ],
  },
  {
    id: 'glass_pattern',
    kind: 'glass',
    name: 'С узором',
    pricing: { spb: RUB_M2(7290), area: RUB_M2(7290) },
    description:
      'Зеркало с пескоструйным рисунком или узором: работает как аккуратный акцент на входе.',
    included: ['Нанесение узора по макету', 'Согласование эскиза', 'Подбор плотности рисунка'],
    note: 'Сложные макеты и большие площади рисунка рассчитываются отдельно.',
  },
  {
    id: 'glass_facet_incl',
    kind: 'glass',
    name: 'С фацетом (включён)',
    pricing: { spb: RUB_M2(7990), area: RUB_M2(7990) },
    description:
      'Зеркало с декоративной фаской по периметру: объёмный “световой” кант без доплаты за кромку.',
    included: [
      'Зеркало с готовым фацетом',
      'Аккуратный блестящий торец',
      'Эффект “рамки” без лишних деталей',
    ],
    note: 'При выборе этого варианта отдельная “Обработка кромки” не требуется.',
  },
  {
    id: 'glass_acrylic',
    kind: 'glass',
    name: 'Акрил',
    pricing: { spb: RUB_M2(4890), area: RUB_M2(4890) },
    description:
      'Лёгкое пластиковое зеркало: минимальная нагрузка на полотно, выше стойкость к ударам.',
    included: ['Небьющееся полотно', 'Малая масса', 'Подходит для “сложных” дверей'],
    note: 'Отражение чуть мягче, чем у стеклянных зеркал — это нормально для акрила.',
  },
  {
    id: 'glass_titanium',
    kind: 'glass',
    name: 'Титановое',
    pricing: { spb: RUB_M2(8890), area: RUB_M2(8890) },
    description:
      'Зеркало с холодным металлическим отливом: эффект “стального” отражения и современного интерьера.',
    included: [
      'Холодный металлический оттенок',
      'Выразительный современный вид',
      'Хорошо сочетается с чёрной фурнитурой',
    ],
  },
  {
    id: 'glass_aluminum',
    kind: 'glass',
    name: 'Алюминиевое',
    pricing: { spb: RUB_M2(5790), area: RUB_M2(5790) },
    description:
      'Классическое алюминиевое зеркало — проверенная технология и привычный по цвету отражения вариант.',
    included: ['Стабильное покрытие', 'Привычный нейтральный оттенок', 'Баланс цены и качества'],
  },
  {
    id: 'glass_silvered',
    kind: 'glass',
    name: 'Посеребрённое',
    pricing: { spb: RUB_M2(6990), area: RUB_M2(6990) },
    description:
      'Более глубокое отражение с лёгким благородным оттенком: красиво работает в светлых и тёплых интерьерах.',
    included: ['Посеребрённое покрытие', 'Глубокое отражение', 'Чуть более “мягкий” тон'],
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

  function toggleService(id: ServiceId) {
    setState((prev) => {
      const next = new Set(prev.selected)

      if (isGlass(id)) {
        for (const sid of next) {
          if (isGlass(sid)) next.delete(sid)
        }

        if (prev.selected.has(id)) {
          next.delete(id)
          return { ...prev, selected: new Set(next), edgeType: prev.edgeType }
        }

        next.add(id)

        if (id === 'glass_facet_incl') {
          next.delete('edge')
          return { ...prev, selected: new Set(next), edgeType: 'none' }
        }

        return { ...prev, selected: new Set(next) }
      }

      if (next.has(id)) {
        next.delete(id)

        if (id === 'edge') {
          return { ...prev, selected: new Set(next), edgeType: 'none' }
        }

        return { ...prev, selected: new Set(next) }
      }

      next.add(id)

      let edgeType = prev.edgeType
      if (id === 'edge' && edgeType === 'none') {
        edgeType = 'polish'
      }

      return { ...prev, selected: new Set(next), edgeType }
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

  const spbRef = React.useRef<HTMLButtonElement>(null)
  const areaRef = React.useRef<HTMLButtonElement>(null)

  const [activeWidth, setActiveWidth] = React.useState<number>(0)
  const [activeOffset, setActiveOffset] = React.useState<number>(0)

  React.useEffect(() => {
    const el = region === 'spb' ? spbRef.current : areaRef.current
    if (!el) return
    const { offsetWidth, offsetLeft } = el
    setActiveWidth(offsetWidth)
    setActiveOffset(offsetLeft)
  }, [region])

  return (
    <main>
      <section className='topSection'>
        <div className={styles.hero}>
          <h1 className='page-title'>Прайс — выберите услуги для расчёта</h1>
          <p className='page-text'>Выберите ваш регион:</p>

          <div className={styles.pillWrapper}>
            <button
              ref={spbRef}
              onClick={() => setRegion('spb')}
              type='button'
              className={`${styles.pill} ${region === 'spb' ? styles.pillActive : ''}`}
            >
              СПБ
            </button>

            <button
              ref={areaRef}
              onClick={() => setRegion('area')}
              type='button'
              className={`${styles.pill} ${region === 'area' ? styles.pillActive : ''}`}
            >
              ОБЛ
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
              <TiltCard
                key={s.id}
                as='button'
                type='button'
                aria-pressed={active}
                freezeOnLeave={active}
                className={`${styles.cardInner} ${active ? styles.cardInnerActive : ''}`}
                onClick={() => toggleService(s.id)}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.serviceTitle}>{s.name}</div>
                  <div className={styles.checkMark} aria-hidden>
                    {active ? (
                      <svg
                        className={styles.marker}
                        viewBox='0 0 24 24'
                        width='20'
                        height='20'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='4'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path d='M5 12l5 5L20 7' />
                      </svg>
                    ) : null}
                  </div>
                </div>
                {s.description && <p className={styles.serviceDesc}>{s.description}</p>}
                <div className={styles.servicePrice}>
                  <PriceView price={price} region={region} />
                </div>
              </TiltCard>
            )
          })}
        </div>
      </section>
      <QuoteLeadForm
        quote={quotePayload}
        calcState={state}
        setCalcState={setState}
        calcResult={res}
      />
    </main>
  )
}
