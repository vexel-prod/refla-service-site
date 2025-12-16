// components/PricingCalculator/PricingCalculator.tsx
'use client'

import * as React from 'react'
// используем те же классы, что и на странице прайса
import styles from '../../app/pricing/PricingClient.module.css'

type Region = 'spb' | 'area'

type PricingCalculatorProps = {
  region: Region
  // состояние калькулятора — не заморачиваемся с типами, берём как есть
  state: any
  setState: React.Dispatch<React.SetStateAction<any>>
  // результат calcTotal
  result: {
    parts: {
      glass: number
      edge: number
      mount: number
      demount: number
      travel: number
    }
    enabled: {
      edge: boolean
      mount: boolean
      demount: boolean
      travel: boolean
    }
    total: number
  }
  // форматирование денег
  fmt: (n: number) => string
}

export default function PricingCalculator({
  region,
  state,
  setState,
  result,
  fmt,
}: PricingCalculatorProps) {
  // нужен только чтобы выключить select кромки, когда выбран вариант с фацетом
  const facetIncluded = state.selected?.has('glass_facet_incl')

  return (
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
              setState((p: any) => ({
                ...p,
                width: e.target.value === '' ? NaN : Number(e.target.value),
              }))
            }
            onBlur={(e) => {
              if (e.target.value === '') {
                setState((p: any) => ({ ...p, width: 500 }))
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
              setState((p: any) => ({
                ...p,
                height: e.target.value === '' ? NaN : Number(e.target.value),
              }))
            }
            onBlur={(e) => {
              if (e.target.value === '') {
                setState((p: any) => ({ ...p, height: 1600 }))
              }
            }}
          />
        </div>

        <div className={styles.calcField}>
          <label className='label'>Тип кромки</label>
          <select
            suppressHydrationWarning
            className='input'
            value={state.edgeType}
            onChange={(e) => setState((p: any) => ({ ...p, edgeType: e.target.value as any }))}
            disabled={facetIncluded}
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
              setState((p: any) => ({
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
                setState((p: any) => ({
                  ...p,
                  kmFromKAD: e.target.value === '' ? NaN : Number(e.target.value),
                }))
              }
            />
          </div>
        )}
      </div>
    </div>
  )
}
