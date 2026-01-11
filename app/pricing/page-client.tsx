'use client'

import * as React from 'react'
import Link from 'next/link'
import LeadForm from 'components/LeadForm/LeadForm'

type Region = 'spb' | 'area'

const money = (n: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n)

export function PricingClient() {
  const [region, setRegion] = React.useState<Region>('spb')

  // размеры
  const [w, setW] = React.useState(60) // см
  const [h, setH] = React.useState(120) // см

  // опции
  const [edge, setEdge] = React.useState<'polish' | 'facet'>('polish')
  const [cutouts, setCutouts] = React.useState(false)
  const [oldMirror, setOldMirror] = React.useState(false)
  const [km, setKm] = React.useState(10) // для области

  const areaM2 = Math.max(0.2, (w / 100) * (h / 100))

  // модель цены (приближённая; точная — после замера)
  const baseGlass = 6900 // базовая стоимость зеркала с подготовкой (до ~0.8м2)
  const perM2 = 5200 // добавка за площадь
  const mount = 3900 // монтаж
  const facetAdd = 2200
  const cutoutAdd = 1800
  const oldMirrorAdd = 1500
  const areaDeliveryRate = 60 // ₽/км

  const subtotal =
    baseGlass +
    Math.max(0, areaM2 - 0.8) * perM2 +
    mount +
    (edge === 'facet' ? facetAdd : 0) +
    (cutouts ? cutoutAdd : 0) +
    (oldMirror ? oldMirrorAdd : 0)

  const delivery = region === 'area' ? km * areaDeliveryRate : 0
  const total = Math.round(subtotal + delivery)

  return (
    <section className='section'>
      <div className='container'>
        <div className='flex items-end justify-between gap-6 flex-wrap'>
          <div>
            <h1 className='text-3xl md:text-4xl font-black tracking-tight'>Цены и калькулятор</h1>
            <p className='mt-3 text-base-content/70 max-w-2xl'>
              Ниже — ориентировочный расчёт. Точная стоимость зависит от размеров, кромки, вырезов под фурнитуру и
              особенностей двери — согласуем на замере.
            </p>
          </div>
          <div className='join'>
            <button
              className={'btn join-item rounded-full ' + (region === 'spb' ? 'btn-primary' : 'btn-ghost')}
              onClick={() => setRegion('spb')}
            >
              СПб
            </button>
            <button
              className={'btn join-item rounded-full ' + (region === 'area' ? 'btn-primary' : 'btn-ghost')}
              onClick={() => setRegion('area')}
            >
              Область
            </button>
          </div>
        </div>

        <div className='mt-8 grid gap-8 lg:grid-cols-2 lg:items-start'>
          {/* Calculator */}
          <div className='glass-card p-6 md:p-8'>
            <div className='flex items-center justify-between gap-4'>
              <div className='text-xl md:text-2xl font-black tracking-tight'>Калькулятор</div>
              <div className='badge badge-outline'>примерно</div>
            </div>

            <div className='mt-6 grid gap-4'>
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

              <div className='rounded-3xl border border-base-content/10 bg-base-100/50 p-4'>
                <div className='text-sm text-base-content/70'>Площадь: <b>{areaM2.toFixed(2)} м²</b></div>
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
                  <input type='checkbox' className='toggle toggle-primary' checked={cutouts} onChange={(e) => setCutouts(e.target.checked)} />
                  <span className='label-text'>Вырезы под фурнитуру (ручка/замок)</span>
                </label>

                <label className='label cursor-pointer justify-start gap-3'>
                  <input type='checkbox' className='toggle toggle-primary' checked={oldMirror} onChange={(e) => setOldMirror(e.target.checked)} />
                  <span className='label-text'>Демонтаж старого зеркала (если есть)</span>
                </label>

                {region === 'area' && (
                  <div className='form-control'>
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
                      <span className='label-text-alt text-base-content/60'>Доставка: {money(delivery)}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className='divider my-2' />

              <div className='flex items-end justify-between gap-6'>
                <div>
                  <div className='text-sm text-base-content/60'>Итого (ориентир)</div>
                  <div className='text-3xl font-black tracking-tight'>{money(total)}</div>
                  <div className='text-xs text-base-content/60 mt-1'>Точная цена — после замера</div>
                </div>
                <Link href='/request' className='btn btn-primary rounded-full'>
                  Заказать замер
                </Link>
              </div>
            </div>
          </div>

          {/* Packages + form */}
          <div className='grid gap-6'>
            <div className='glass-card p-6 md:p-8'>
              <div className='text-xl md:text-2xl font-black tracking-tight'>Что входит</div>
              <div className='mt-4 grid gap-3 sm:grid-cols-2'>
                {[
                  ['Замер и консультация', 'Подскажем размер, кромку, крепление.'],
                  ['Подготовка зеркала', 'Кромка, вырезы (если нужны).'],
                  ['Монтаж', 'Аккуратно, с проверкой и уборкой.'],
                  ['Гарантия', 'На монтаж и материалы.'],
                ].map(([t, d]) => (
                  <div key={t} className='rounded-3xl border border-base-content/10 bg-base-100/50 p-5'>
                    <div className='font-semibold'>{t}</div>
                    <div className='mt-2 text-sm text-base-content/70'>{d}</div>
                  </div>
                ))}
              </div>

              <div className='mt-6 alert'>
                <span className='text-sm'>
                  Нужны нестандартные решения? Напишите в{' '}
                  <Link href='/contacts' className='link'>
                    контакты
                  </Link>{' '}
                  — подскажем.
                </span>
              </div>
            </div>

            <LeadForm title='Получить точную смету' subtitle='Укажите адрес и удобный способ связи — уточним детали.' />
          </div>
        </div>
      </div>
    </section>
  )
}
