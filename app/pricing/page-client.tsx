'use client'

import * as React from 'react'
import QuoteLeadForm from '../../components/QuoteLeadForm.client'

/* ============================================
   Типы и утилиты
   ============================================ */
type Region = 'spb' | 'area'

type Price =
  | { kind: 'free' }
  | { kind: 'from'; amount: number; unit?: string; affectsArea?: boolean }
  | { kind: 'perKm'; rate: number }
  | { kind: 'custom' }
  | { kind: 'na' }

// Базовые сервисы работ
type BaseServiceId = 'measure' | 'edge' | 'mount' | 'demount'

// Материалы (стекло/зеркала) — ВЗАИМНО ИСКЛЮЧАЮТСЯ
type GlassId =
  | 'glass_tempered' // закалённое (изначальный вариант)
  | 'glass_clear' // простое прозрачное
  | 'glass_tinted' // тонированное (бронза/графит)
  | 'glass_satin' // сатин (матированное)
  | 'glass_pattern' // узор / пескоструй
  | 'glass_facet_incl' // зеркало с фацетом (фацет включён)
  | 'glass_acrylic' // акриловое (пластиковое)
  | 'glass_titanium' // титановое / хромовое
  | 'glass_aluminum' // алюминиевое
  | 'glass_silvered' // посеребрённое

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

const fmt = (n: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(n)

// Надбавка в области — только на РАБОТЫ (edge/mount/demount), 9%
const UPLIFT_AREA = 1.09
const applyAreaUplift = (base: number, region: Region, affects?: boolean, uplift = UPLIFT_AREA) =>
  region === 'area' && affects ? Math.round(base * uplift) : Math.round(base)

/* ============================================
   Прайс-лист (карточки)
   Цены: «чуть ниже средних по рынку СПБ»
   Для стекла м²: без надбавки по региону
   ============================================ */
const RUB_M2 = (amount: number): Price => ({ kind: 'from', amount, unit: 'м²' })

const SERVICES: Service[] = [
  // ==== Работы / выезды ====
  {
    id: 'measure',
    kind: 'work',
    name: 'Замер и консультация',
    pricing: { spb: { kind: 'free' }, area: { kind: 'perKm', rate: 27 } },
    description: 'Снимем точные размеры и подскажем по материалам/крепежу.',
    included: ['Замер полотна и проёма', 'Подбор толщины и кромки', 'Черновая смета и сроки'],
  },
  {
    id: 'edge',
    kind: 'work',
    name: 'Обработка кромки (пог.м)',
    pricing: {
      spb: { kind: 'from', amount: 870, unit: 'м', affectsArea: true },
      area: { kind: 'from', amount: 870, unit: 'м', affectsArea: true },
    },
    description: 'Полировка — безопасно и лаконично. Фацет — выразительный акцент.',
    included: ['Шлифовка и полировка', 'Контроль безопасности торца'],
    note: 'Фацет рассчитывается по ширине/рисунку отдельно.',
  },
  {
    id: 'mount',
    kind: 'work',
    name: 'Монтаж на дверное полотно',
    highlight: 'best',
    pricing: {
      spb: { kind: 'from', amount: 3750, affectsArea: true },
      area: { kind: 'from', amount: 3750, affectsArea: true },
    },
    description: 'Аккуратная посадка на клей/крепёж, ровно по уровню.',
    included: ['Подготовка поверхности', 'Разметка', 'Фиксация (клей/скобы/профиль)'],
    note: 'Зависит от материала и состояния полотна.',
  },
  {
    id: 'demount',
    kind: 'work',
    name: 'Демонтаж старого зеркала',
    pricing: {
      spb: { kind: 'from', amount: 1650, affectsArea: true },
      area: { kind: 'from', amount: 1650, affectsArea: true },
    },
    description: 'Снимем бережно и подготовим под новый монтаж.',
    included: ['Защита поверхности', 'Снятие клея/крепежа', 'Подготовка под новое зеркало'],
  },

  // ==== Материалы / зеркала (м²) — эксклюзивный выбор ====
  {
    id: 'glass_tempered',
    kind: 'glass',
    name: 'Зеркало закалённое',
    pricing: { spb: RUB_M2(6590), area: RUB_M2(6590) },
    description: 'Безопасное 4–6 мм: устойчиво к перепадам и повседневной нагрузке.',
    included: ['Оптический класс стекла', 'Контроль геометрии и кромки'],
  },
  {
    id: 'glass_clear',
    kind: 'glass',
    name: 'Зеркало прозрачное (обычное)',
    pricing: { spb: RUB_M2(5490), area: RUB_M2(5490) },
    description: 'Классическое решение без окраса. Экономично и универсально.',
  },
  {
    id: 'glass_tinted',
    kind: 'glass',
    name: 'Зеркало тонированное (бронза/графит)',
    pricing: { spb: RUB_M2(6290), area: RUB_M2(6290) },
    description: 'Бронзовый, графитовый и другие тона — для мягкого акцента.',
  },
  {
    id: 'glass_satin',
    kind: 'glass',
    name: 'Зеркало матированное (Satinato)',
    pricing: { spb: RUB_M2(6790), area: RUB_M2(6790) },
    description: 'Мягкая рассеивающая поверхность, меньше бликов и отпечатков.',
  },
  {
    id: 'glass_pattern',
    kind: 'glass',
    name: 'Зеркало с узором / пескоструй',
    pricing: { spb: RUB_M2(7290), area: RUB_M2(7290) },
    description: 'Декоративный рисунок, индивидуальный характер входной двери.',
    note: 'Сложные макеты и маски оцениваются отдельно.',
  },
  {
    id: 'glass_facet_incl',
    kind: 'glass',
    name: 'Зеркало с фацетом (включён)',
    pricing: { spb: RUB_M2(7990), area: RUB_M2(7990) },
    description: 'Декоративная фаска уже включена в стоимость — без доплаты за кромку.',
    note: 'При выборе этого варианта «Обработка кромки» отключается.',
  },
  {
    id: 'glass_acrylic',
    kind: 'glass',
    name: 'Зеркало акриловое (пластиковое)',
    pricing: { spb: RUB_M2(4890), area: RUB_M2(4890) },
    description: 'Лёгкое и ударостойкое. Хорошо для мест с повышенной безопасностью.',
  },
  {
    id: 'glass_titanium',
    kind: 'glass',
    name: 'Зеркало титановое / хромовое',
    pricing: { spb: RUB_M2(8890), area: RUB_M2(8890) },
    description: 'Эффектное отражение с холодным металлическим отливом.',
  },
  {
    id: 'glass_aluminum',
    kind: 'glass',
    name: 'Зеркало алюминиевое',
    pricing: { spb: RUB_M2(5790), area: RUB_M2(5790) },
    description: 'Классическая технология напыления. Хорошее соотношение цена/качество.',
  },
  {
    id: 'glass_silvered',
    kind: 'glass',
    name: 'Зеркало посеребрённое',
    pricing: { spb: RUB_M2(6990), area: RUB_M2(6990) },
    description: 'Более глубокое отражение, благородный оттенок.',
  },
]

/* ============================================
   Калькулятор (константы/состояние)
   ============================================ */
type EdgeType = 'polish' | 'facet' | 'none'

type CalcState = {
  region: Region
  width: number // допускаем NaN для удобного редактирования
  height: number
  edgeType: EdgeType
  edgeMeters: number // 0 — авто по периметру
  includeMount: boolean
  includeDemount: boolean
  kmFromKAD: number // км в одну сторону
  selected: Set<ServiceId> // изначально пусто
}

const RATE_PER_KM = 27
const EDGE_FROM = 870
const FACET_EXTRA = 1.6
const MOUNT_FROM = 3750
const DEMOUNT_FROM = 1650

const mmToM2 = (wMm: number, hMm: number) => (Math.max(wMm, 0) * Math.max(hMm, 0)) / 1_000_000

const perimeterMeters = (wMm: number, hMm: number) =>
  ((Math.max(wMm, 0) + Math.max(hMm, 0)) * 2) / 1000

// Хелперы по материалам
const isGlass = (id: ServiceId): id is GlassId =>
  (
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
    ] as ServiceId[]
  ).includes(id)

function getGlassPricePerM2(id: GlassId, region: Region): number {
  const svc = SERVICES.find((s) => s.id === id)!
  const price = svc.pricing[region]
  if (price.kind === 'from') return price.amount
  return 0
}

function getSelectedGlass(selected: Set<ServiceId>): GlassId | null {
  for (const id of selected) if (isGlass(id)) return id
  return null
}

function calcTotal(s: CalcState) {
  const w = Number.isFinite(s.width) ? (s.width as number) : 0
  const h = Number.isFinite(s.height) ? (s.height as number) : 0
  const edgeM = Number.isFinite(s.edgeMeters) ? (s.edgeMeters as number) : 0
  const km = Number.isFinite(s.kmFromKAD) ? (s.kmFromKAD as number) : 0

  const m2 = mmToM2(w, h)
  const perim = edgeM > 0 ? edgeM : perimeterMeters(w, h)

  // ==== стекло: берём РОВНО ОДИН выбранный материал
  let glass = 0
  const glassId = getSelectedGlass(s.selected)
  if (glassId) {
    const rate = getGlassPricePerM2(glassId, s.region)
    glass = Math.max(0, Math.round(m2 * rate)) // без надбавки за регион
  }

  // ==== кромка: если выбран вариант с включенным фацетом — не считаем
  let edge = 0
  const facetIncluded = glassId === 'glass_facet_incl'
  if (!facetIncluded && s.selected.has('edge') && s.edgeType !== 'none') {
    const base = s.edgeType === 'facet' ? perim * EDGE_FROM * FACET_EXTRA : perim * EDGE_FROM
    edge = applyAreaUplift(base, s.region, true)
  }

  // ==== монтаж / демонтаж (выбираются карточками)
  let mount = 0
  if (s.selected.has('mount') || s.includeMount) {
    mount = applyAreaUplift(MOUNT_FROM, s.region, true)
  }

  let demount = 0
  if (s.selected.has('demount') || s.includeDemount) {
    demount = applyAreaUplift(DEMOUNT_FROM, s.region, true)
  }

  // ==== выезд/замер (только область + выбран «Замер»)
  let travel = 0
  const travelEnabled = s.selected.has('measure') && s.region === 'area'
  if (travelEnabled) {
    travel = Math.round(Math.max(km, 0) * RATE_PER_KM * 2)
  }

  const subtotal = glass + edge + mount + demount
  const total = subtotal + travel

  return {
    m2,
    perim,
    facetIncluded,
    enabled: {
      edge: !!edge,
      mount: !!mount,
      demount: !!demount,
      travel: travelEnabled,
    },
    parts: { glass, edge, mount, demount, travel },
    subtotal,
    total,
  }
}

/* ============================================
   Мелкие UI-хелперы
   ============================================ */
function Badge({
  children,
  tone,
}: {
  children: React.ReactNode
  tone: 'free' | 'from' | 'custom'
}) {
  const cls = tone === 'free' ? 'badge-free' : tone === 'custom' ? 'badge-custom' : 'badge-from'
  return <span className={`badge ${cls}`}>{children}</span>
}

function PriceView({ price, region }: { price: Price; region: Region }) {
  switch (price.kind) {
    case 'free':
      return <Badge tone='free'>бесплатно</Badge>
    case 'custom':
      return <Badge tone='custom'>индивидуально</Badge>
    case 'na':
      return <span className='muted'>—</span>
    case 'perKm':
      return (
        <span className='price'>
          <strong>{fmt(price.rate)}</strong>
          <span className='unit'> / км</span>
        </span>
      )
    case 'from': {
      const val = applyAreaUplift(price.amount, region, price.affectsArea)
      return (
        <span className='price'>
          <Badge tone='from'>от </Badge>
          <strong>{fmt(val)}</strong>
          {price.unit ? <span className='unit'> / {price.unit}</span> : null}
        </span>
      )
    }
  }
}

/* ============================================
   Компонент (клиент)
   ============================================ */
export function PricingClient() {
  const [region, setRegion] = React.useState<Region>('spb')

  // Старт: ничего не выбрано, итог = 0 ₽. Поля допускают NaN для удобного редактирования.
  const [state, setState] = React.useState<CalcState>({
    region,
    width: 0,
    height: 0,
    edgeType: 'none',
    edgeMeters: 0,
    includeMount: false,
    includeDemount: false,
    kmFromKAD: 0,
    selected: new Set<ServiceId>(),
  })

  React.useEffect(() => {
    setState((p) => ({ ...p, region }))
  }, [region])

  const res = React.useMemo(() => calcTotal(state), [state])
  const services = React.useMemo(() => SERVICES, [])

  // Тоггл карточек: материалы — эксклюзивный выбор; «фацет включён» отключает кромку
  function toggleService(id: ServiceId) {
    setState((prev) => {
      const nextSel = new Set(prev.selected)

      // Клик по материалу — эксклюзивный выбор
      if (isGlass(id)) {
        for (const sid of Array.from(nextSel)) if (isGlass(sid)) nextSel.delete(sid)
        if (!prev.selected.has(id)) nextSel.add(id)

        if (id === 'glass_facet_incl') {
          nextSel.delete('edge')
          return { ...prev, selected: nextSel, edgeType: 'none' }
        }
        return { ...prev, selected: nextSel }
      }

      // Обычный тоггл для работ
      nextSel.has(id) ? nextSel.delete(id) : nextSel.add(id)

      // «умные» подстройки
      let { includeMount, includeDemount, edgeType } = prev
      if (id === 'edge' && nextSel.has('edge') && edgeType === 'none') edgeType = 'polish'
      if (id === 'mount' && nextSel.has('mount')) includeMount = true
      if (id === 'demount' && nextSel.has('demount')) includeDemount = true

      return {
        ...prev,
        selected: nextSel,
        includeMount,
        includeDemount,
        edgeType,
      }
    })
  }

  const selectedNames = services.filter((s) => state.selected.has(s.id)).map((s) => s.name)
  const canSubmit = selectedNames.length >= 1

  const safe = (n: number, d = 0) => (Number.isFinite(n) ? n : d)

  const quotePayload = {
    region,
    width: safe(state.width),
    height: safe(state.height),
    edgeType: state.edgeType,
    includeMount: state.includeMount || state.selected.has('mount'),
    includeDemount: state.includeDemount || state.selected.has('demount'),
    kmFromKAD: safe(state.kmFromKAD),
    m2: Number(res.m2.toFixed(3)),
    perim: Number(res.perim.toFixed(3)),
    parts: res.parts,
    total: res.total,
    selectedServices: selectedNames,
    canSubmit,
  }

  return (
    <div className='home home__grid'>
      {/* Титульный лист страницы */}
      <section className='card about__section about__section--soft'>
        <div className='pricing__hero'>
          <h1 className='page-title'>Прайс — выберите услуги и получите предварительный расчёт</h1>
          <h2 className='page-sub'>
            Для расчета стоимости работ и материалов, просто нажмите на соответствующую карточку,
            все расчеты будут произведены ниже автоматически, с учетом выбранных Вами услуг!
          </h2>
          <p className='page-text'>
            Чтобы учесть параметры выезда нажмите соответсвующий переключатель ниже
          </p>
          <div className='pricing__region'>
            <button
              type='button'
              className={`pill ${region === 'spb' ? 'active' : ''}`}
              onClick={() => setRegion('spb')}
            >
              СПБ
            </button>
            <button
              type='button'
              className={`pill ${region === 'area' ? 'active' : ''}`}
              onClick={() => setRegion('area')}
            >
              Область
            </button>
          </div>
        </div>
      </section>

      {/* Кликабельные карточки услуг (и материалов) */}
      <section className='card about__section'>
        <div className='pricing__cards'>
          {services.map((s) => {
            const price = s.pricing[region]
            const active = state.selected.has(s.id)
            return (
              <button
                key={s.id}
                type='button'
                className={`card service ${active ? 'active' : ''}`}
                onClick={() => toggleService(s.id)}
                aria-pressed={active}
                aria-label={`${active ? 'Убрать' : 'Выбрать'}: ${s.name}`}
              >
                {/* {s.highlight ? (
								<div
									className={`ribbon ${
										s.highlight === 'best' ? 'ribbon-best' : 'ribbon-pop'
									}`}
								>
									{s.highlight === 'best' ? 'Лучший выбор' : 'Популярно'}
								</div>
							) : null} */}

                <div className='checkmark' aria-hidden>
                  {active ? '✔' : ''}
                </div>

                <div className='service-title'>{s.name}</div>

                {s.description ? <div className='service-desc'>{s.description}</div> : null}

                {s.included?.length ? (
                  <ul className='included'>
                    {s.included.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                ) : null}

                {s.note ? <div className='note'>ℹ️ {s.note}</div> : null}
                <div className='service-price'>
                  <PriceView price={price} region={region} />
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* Калькулятор — БЕЗ блока «Монтаж / Демонтаж» (только карточки) */}
      <section className='card about__section'>
        <div className='sub-wrapper'>
          <h2 className='page-sub'>Установите параметры полотна</h2>
        </div>
        <div className='card'>
          <div className='calc grid'>
            {/* Размеры */}
            <div className='calc-field'>
              <label htmlFor='field-1' className='label'>
                Ширина полотна (в мм)
              </label>
              <input
                id='field-1'
                suppressHydrationWarning
                className='input'
                type='number'
                min={300}
                max={1200}
                step={10}
                value={Number.isFinite(state.width) ? state.width : ''}
                onChange={(e) => {
                  const v = e.target.value
                  setState((p) => ({ ...p, width: v === '' ? NaN : Number(v) }))
                }}
                onBlur={(e) => {
                  if (e.target.value === '') setState((p) => ({ ...p, width: 500 }))
                }}
              />
              <div className='helper'>Обычно 500–800 мм</div>
            </div>

            <div className='calc-field'>
              <label htmlFor='field-2' className='label'>
                Высота полотна (в мм)
              </label>
              <input
                id='field-2'
                suppressHydrationWarning
                className='input'
                type='number'
                min={800}
                max={2300}
                step={10}
                value={Number.isFinite(state.height) ? state.height : ''}
                onChange={(e) => {
                  const v = e.target.value
                  setState((p) => ({
                    ...p,
                    height: v === '' ? NaN : Number(v),
                  }))
                }}
                onBlur={(e) => {
                  if (e.target.value === '') setState((p) => ({ ...p, height: 1600 }))
                }}
              />
              <div className='helper'>Обычно 1500–2000 мм</div>
            </div>

            {/* Кромка (отключится автоматически при стекле с включённым фацетом) */}
            <div className='calc-field'>
              <label htmlFor='field-3' className='label'>
                Тип кромки зеркала
              </label>
              <select
                id='field-3'
                suppressHydrationWarning
                className='input'
                value={state.edgeType}
                onChange={(e) =>
                  setState((p) => ({
                    ...p,
                    edgeType: e.target.value as typeof p.edgeType,
                  }))
                }
                disabled={getSelectedGlass(state.selected) === 'glass_facet_incl'}
                aria-disabled={getSelectedGlass(state.selected) === 'glass_facet_incl'}
                title={
                  getSelectedGlass(state.selected) === 'glass_facet_incl'
                    ? 'Фацет уже включён в выбранный тип зеркала'
                    : undefined
                }
              >
                <option value='none'>Без обработки</option>
                <option value='polish'>Полировка (базово)</option>
                <option value='facet'>Фацет (декоративно)</option>
              </select>
              <div className='helper'>
                Кромка учитывается в расчёте, если включена карточка «Обработка кромки».
                {getSelectedGlass(state.selected) === 'glass_facet_incl' &&
                  ' (для выбранного материала фацет уже включён)'}
              </div>
            </div>

            <div className='calc-field'>
              <label htmlFor='field-4' className='label'>
                Периметр кромки (в м)
              </label>
              <input
                id='field-4'
                suppressHydrationWarning
                className='input'
                type='number'
                min={0}
                step={0.1}
                value={Number.isFinite(state.edgeMeters) ? state.edgeMeters : ''}
                onChange={(e) => {
                  const v = e.target.value
                  setState((p) => ({
                    ...p,
                    edgeMeters: v === '' ? NaN : Number(v),
                  }))
                }}
                onBlur={(e) => {
                  if (e.target.value === '') setState((p) => ({ ...p, edgeMeters: 0 }))
                }}
                disabled={getSelectedGlass(state.selected) === 'glass_facet_incl'}
              />
              <div className='helper'>0 — посчитаем по периметру размера</div>
            </div>

            {/* Расстояние — только для «Область» */}
            {region === 'area' && (
              <div className='calc-field'>
                <label className='label'>Расстояние от КАД (км, в одну сторону)</label>
                <input
                  suppressHydrationWarning
                  className='input'
                  type='number'
                  min={0}
                  step={1}
                  value={Number.isFinite(state.kmFromKAD) ? state.kmFromKAD : ''}
                  onChange={(e) => {
                    const v = e.target.value
                    setState((p) => ({
                      ...p,
                      kmFromKAD: v === '' ? NaN : Number(v),
                    }))
                  }}
                  onBlur={(e) => {
                    if (e.target.value === '') setState((p) => ({ ...p, kmFromKAD: 0 }))
                  }}
                />
                <div className='helper'>
                  Учитывается, если выбран «Замер» (считаем туда-обратно).
                </div>
              </div>
            )}
          </div>

          {/* Разбивка суммы */}
          <div className='breakdown'>
            {res.parts.glass ? (
              <div className='line'>
                <span>Зеркало, ~{res.m2.toFixed(2)} м²</span>
                <b>{fmt(res.parts.glass)}</b>
              </div>
            ) : null}
            {res.enabled.edge ? (
              <div className='line'>
                <span>Кромка, ~{res.perim.toFixed(2)} м</span>
                <b>{fmt(res.parts.edge)}</b>
              </div>
            ) : null}
            {res.enabled.mount ? (
              <div className='line'>
                <span>Монтаж</span>
                <b>{fmt(res.parts.mount)}</b>
              </div>
            ) : null}
            {res.enabled.demount ? (
              <div className='line'>
                <span>Демонтаж</span>
                <b>{fmt(res.parts.demount)}</b>
              </div>
            ) : null}
            {res.enabled.travel ? (
              <div className='line'>
                <span>Выезд/замер</span>
                <b>{fmt(res.parts.travel)}</b>
              </div>
            ) : null}
            <div className='line total'>
              <span>Итого</span>
              <b>{fmt(res.total)}</b>
            </div>
          </div>
        </div>
      </section>

      {/* Форма заявки с расчетом */}
      <section className='card about__section'>
        <div className=''>
          <QuoteLeadForm quote={quotePayload} />
        </div>
      </section>
    </div>
  )
}
