'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './LeadForm.module.css'

const API_ENDPOINT = 'https://refla.ru/api/lead.php'

export default function LeadForm() {
  // поля формы
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [address, setAddress] = useState('')
  const [comment, setComment] = useState('')

  // служебные
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [hp, setHp] = useState('') // honeypot

  // anti-bot: время рендера формы
  const ftRef = useRef<number>(0)
  useEffect(() => {
    if (!ftRef.current) ftRef.current = Date.now()
  }, [])

  // базовые проверки
  const nameValid = useMemo(() => {
    const v = name.trim()
    return v.length >= 2 && v.length <= 60 && /^[\p{L}\p{M}\s.'-]+$/u.test(v)
  }, [name])

  const contactValid = useMemo(() => {
    const v = contact.trim()
    if (!v) return false
    const isEmail = /^[^\s@]{1,64}@[^\s@]+\.[^\s@]+$/.test(v)
    const isPhone = /^[+0-9()\-\s]{6,20}$/.test(v)
    return isEmail || isPhone
  }, [contact])

  const addressValid = useMemo(() => {
    const v = address.trim()
    return v.length >= 5 && v.length <= 200
  }, [address])

  const commentValid = useMemo(() => comment.length <= 2000, [comment])

  const formValid = nameValid && contactValid && addressValid && commentValid && !loading

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSuccess(null)
    setError(null)

    if (!formValid) {
      setError('Проверьте имя, контакт (телефон/e-mail), адрес и комментарий.')
      return
    }
    if (hp.trim()) {
      // honeypot: для ботов — имитируем успех и выходим
      setSuccess('Заявка отправлена! Мы свяжемся с вами в ближайшее время.')
      return
    }

    setLoading(true)
    const controller = new AbortController()
    const t = setTimeout(() => controller.abort(), 15000)

    try {
      const resp = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          contact: contact.trim(),
          address: address.trim(),
          comment: comment.trim(),
          hp, // honeypot
          ft: ftRef.current, // timestamp рендера для anti-bot на сервере
        }),
        signal: controller.signal,
      })

      const data: any = await resp.json().catch(() => null)

      if (resp.ok && data?.ok) {
        setSuccess('Заявка отправлена! Мы свяжемся с вами в ближайшее время.')
        setName('')
        setContact('')
        setAddress('')
        setComment('')
        ftRef.current = Date.now()
      } else {
        setError(data?.error || `Ошибка отправки (${resp.status}). Попробуйте позже.`)
      }
    } catch (err: unknown) {
      const e = err as { name?: string }
      setError(e?.name === 'AbortError' ? 'Таймаут запроса.' : 'Сетевая ошибка.')
    } finally {
      clearTimeout(t)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className={`card ${styles.root}`} noValidate suppressHydrationWarning>
      {/* honeypot */}
      <div
        style={{
          position: 'absolute',
          left: -9999,
          width: 1,
          height: 1,
          overflow: 'hidden',
        }}
        aria-hidden='true'
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

      <div className={styles.grid}>
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
            aria-invalid={name.trim() !== '' && !nameValid}
            maxLength={60}
          />
          {name.trim() !== '' && !nameValid && (
            <div className='error' style={{ marginTop: 6 }}>
              Имя от 2 до 60 символов, без лишних знаков.
            </div>
          )}
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
            aria-invalid={contact.trim() !== '' && !contactValid}
            inputMode='email'
            autoComplete='email'
            maxLength={100}
          />
          {!contactValid && contact.trim() !== '' && (
            <div className='error' style={{ marginTop: 6 }}>
              Укажите корректный телефон или e-mail.
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
            aria-invalid={address.trim() !== '' && !addressValid}
            maxLength={200}
            autoComplete='street-address'
          />
          {address.trim() !== '' && !addressValid && (
            <div className='error' style={{ marginTop: 6 }}>
              Адрес от 5 до 200 символов.
            </div>
          )}
        </div>

        <div>
          <label className='label' htmlFor='comment'>
            Комментарий (необязательно)
          </label>
          <textarea
            suppressHydrationWarning
            className='textarea'
            id='comment'
            rows={4}
            placeholder='Опишите пожелания...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            aria-invalid={!commentValid}
            maxLength={2000}
          />
          {!commentValid && (
            <div className='error' style={{ marginTop: 6 }}>
              Слишком длинный комментарий (до 2000 символов).
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <button className='button' type='submit' disabled={!formValid}>
            {loading ? 'Отправка...' : 'Отправить заявку'}
          </button>
          <a
            className={`button ${styles.telegramButton}`}
            href='https://t.me/refla_bot?start=lead'
            target='_blank'
            rel='noreferrer'
          >
            Оформить заявку в Telegram
          </a>
        </div>

        {success && <div className='success'>{success}</div>}
        {error && <div className='error'>{error}</div>}
      </div>

      <div className='helper'>
        * Нажимая «Отправить заявку», вы соглашаетесь с политикой обработки персональных данных.
      </div>
    </form>
  )
}
