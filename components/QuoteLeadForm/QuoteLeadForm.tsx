'use client'

import * as React from 'react'
import styles from './QuoteLeadForm.module.css'

type Region = 'spb' | 'area'
type Parts = {
  glass: number
  edge: number
  mount: number
  demount: number
  travel: number
}
type Quote = {
  region: Region
  width: number
  height: number
  edgeType: 'polish' | 'facet' | 'none'
  includeMount: boolean
  includeDemount: boolean
  kmFromKAD: number
  m2: number
  perim: number
  parts: Parts
  total: number
  selectedServices: string[]
  canSubmit: boolean
}

const API_ENDPOINT = 'https://refla.ru/api/lead.php'
const SECRET = 'REFLA_FORM_2025' // тот же, что в api/lead.php

export default function QuoteLeadForm({ quote }: { quote: Quote }) {
  const [name, setName] = React.useState('')
  const [contact, setContact] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [notes, setNotes] = React.useState('')

  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [hp, setHp] = React.useState('') // honeypot

  const [copyToast, setCopyToast] = React.useState<string | null>(null)

  const contactValid = React.useMemo(() => {
    const v = contact.trim()
    if (!v) return false
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
    const isPhone = /^[+0-9()\-\s]{6,}$/.test(v)
    return isEmail || isPhone
  }, [contact])

  const estimate = React.useMemo(() => {
    const fmtMoney = (n: number) => new Intl.NumberFormat('ru-RU').format(n)
    const lines: Array<string | undefined> = [
      '(черновой расчёт)',
      '',
      '------------------------------',
      `Выбранный регион: ${quote.region === 'spb' ? 'СПБ' : 'Область'}`,
      `Выбранные услуги: ${
        quote.selectedServices.length ? quote.selectedServices.join(', ') : '—'
      }`,
      `Размер двери: ${quote.width}×${quote.height} мм (~${quote.m2.toFixed(
        2,
      )} м²; периметр ~${quote.perim.toFixed(2)} м)`,
      `Кромка: ${
        quote.edgeType === 'polish'
          ? 'полировка'
          : quote.edgeType === 'facet'
          ? 'фацет'
          : 'без обработки'
      }`,
      `Монтаж: ${quote.includeMount ? 'да' : 'нет'}, Демонтаж: ${
        quote.includeDemount ? 'да' : 'нет'
      }`,
      quote.region === 'area' || quote.parts.travel > 0
        ? `Расстояние от КАД: ~${quote.kmFromKAD} км (туда-обратно)`
        : undefined,
      '------------------------------',
      `Итого: ${fmtMoney(quote.total)} ₽`,
      '------------------------------',
    ]
    return lines.filter(Boolean).join('\n')
  }, [quote])

  const handleCopyEstimate = React.useCallback(() => {
    if (!estimate) return

    // Пытаемся через современный API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(estimate)
        .then(() => {
          setCopyToast('Смета скопирована в буфер обмена.')
          setTimeout(() => setCopyToast(null), 2000)
        })
        .catch(() => {
          setCopyToast('Не удалось скопировать смету.')
          setTimeout(() => setCopyToast(null), 2000)
        })
      return
    }

    // Фоллбек (старые браузеры)
    try {
      const textarea = document.getElementById('estimate') as HTMLTextAreaElement | null
      if (textarea) {
        textarea.focus()
        textarea.select()
        document.execCommand('copy')
        window.getSelection()?.removeAllRanges()
        setCopyToast('Смета скопирована в буфер обмена.')
        setTimeout(() => setCopyToast(null), 2000)
      }
    } catch {
      setCopyToast('Не удалось скопировать смету.')
      setTimeout(() => setCopyToast(null), 2000)
    }
  }, [estimate])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSuccess(null)
    setError(null)

    if (!quote.canSubmit) {
      setError('Выберите хотя бы одну услугу.')
      return
    }
    if (!name.trim() || !contactValid || !address.trim()) {
      setError('Проверьте имя, контакт (телефон/e-mail) и адрес.')
      return
    }
    if (hp.trim()) {
      setError('Ошибка отправки.')
      return
    }

    setLoading(true)
    const controller = new AbortController()
    const t = setTimeout(() => controller.abort(), 15000)

    try {
      const comment = `${estimate}\n\nПожелания:\n${notes.trim() || '—'}`
      const resp = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: SECRET,
          name: name.trim(),
          contact: contact.trim(),
          address: address.trim(),
          comment,
        }),
        signal: controller.signal,
      })
      const data = await resp.json().catch(() => null)

      if (resp.ok && data?.ok) {
        setSuccess('Заявка отправлена! Мы свяжемся с вами в ближайшее время.')
        setName('')
        setContact('')
        setAddress('')
        setNotes('')
      } else {
        setError(data?.error || `Ошибка отправки (${resp.status}). Попробуйте позже.`)
      }
    } catch (err: any) {
      setError(err?.name === 'AbortError' ? 'Таймаут запроса.' : 'Сетевая ошибка.')
    } finally {
      clearTimeout(t)
      setLoading(false)
    }
  }

  /**
   * ! ===============================================
   * ?                     RETURN
   * ! ===============================================
   */

  return (
    <section>
      <form onSubmit={onSubmit} noValidate suppressHydrationWarning>
        {/* honeypot */}
        <div
          style={{
            position: 'absolute',
            left: -9999,
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          <label>
            Не заполняйте это поле
            <input
              suppressHydrationWarning
              tabIndex={-1}
              autoComplete='off'
              value={hp}
              onChange={(e) => setHp(e.target.value)}
            />
          </label>
        </div>
        <div className='sub-wrapper'>
          <h2 className='page-sub'>Оформить заявку с расчётом</h2>
        </div>

        <div className={styles.formWrapper}>
          <div>
            <label className='label' htmlFor='name'>
              Ваше имя *
            </label>
            <input
              suppressHydrationWarning
              className='input'
              id='name'
              required
              placeholder='Иван'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className='label' htmlFor='contact'>
              Контакт (телефон или e-mail) *
            </label>
            <input
              suppressHydrationWarning
              className='input'
              id='contact'
              required
              placeholder='+7 900 000-00-00'
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            {!contactValid && contact.trim() !== '' && (
              <div className='error' style={{ marginTop: 6 }}>
                Укажите телефон или e-mail.
              </div>
            )}
            <div className='helper'>Мы используем контакт только для связи по заявке.</div>
          </div>

          <div>
            <label className='label' htmlFor='address'>
              Адрес установки *
            </label>
            <input
              suppressHydrationWarning
              className='input'
              id='address'
              required
              placeholder='г. Санкт-Петербург, ул. Пример, д. 1'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* Блок сметы с кнопкой "Скопировать" */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 6,
              }}
            >
              <label className='label' htmlFor='estimate' style={{ marginBottom: 0 }}>
                Смета (автоматически)
              </label>
            </div>
            <div className={styles.relative}>
              <textarea
                suppressHydrationWarning
                id='estimate'
                className='textarea'
                rows={10}
                readOnly
                value={estimate}
                aria-readonly='true'
              />
              <button
                type='button'
                className={`${styles.btnCopy} button button--outline`}
                onClick={handleCopyEstimate}
                disabled={loading || !quote.canSubmit}
                style={{ marginLeft: 'auto', fontSize: 12, padding: '4px 8px' }}
              >
                {loading ? 'Копирую...' : 'Скопировать'}
              </button>
              {copyToast && <p className={`${styles.absolute} success`}>{copyToast}</p>}
            </div>

            <div className='helper'>Смета формируется автоматически из выбранных параметров.</div>
          </div>

          <div>
            <label className='label' htmlFor='notes'>
              Ваши пожелания
            </label>
            <textarea
              suppressHydrationWarning
              id='notes'
              className='textarea'
              rows={6}
              placeholder='Пожелания к оттенку, срокам и т.д.'
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className={styles.leadWrapper}>
            <button
              className='button button--outline'
              type='submit'
              disabled={loading || !quote.canSubmit}
            >
              {loading ? 'Отправка...' : 'Отправить заявку'}
            </button>
            {/* <a
              className='button button--outline'
              href='https://t.me/refla_bot?start=lead'
              target='_blank'
              rel='noreferrer'
            >
              Оформить заявку в Telegram
            </a> */}
          </div>

          {!quote.canSubmit && (
            <div className='error'>Выберите хотя бы одну услугу (например, «Замер»).</div>
          )}
          {success && <div className='success'>{success}</div>}
          {error && <div className='error'>{error}</div>}
        </div>
      </form>
    </section>
  )
}
