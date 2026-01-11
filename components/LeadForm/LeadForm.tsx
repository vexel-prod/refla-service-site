'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

export default function LeadForm({
  variant = 'card',
  title = 'Получить расчёт',
  subtitle = 'Ответим в течение 10–20 минут в рабочее время. Можно WhatsApp/Telegram или звонок.',
}: {
  variant?: 'card' | 'inline'
  title?: string
  subtitle?: string
}) {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [address, setAddress] = useState('')
  const [comment, setComment] = useState('')
  const [hp, setHp] = useState('')

  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  const ftRef = useRef<number>(0)
  useEffect(() => {
    if (!ftRef.current) ftRef.current = Date.now()
  }, [])

  const contactValid = useMemo(() => {
    const v = contact.trim()
    if (!v) return false
    const isEmail = /^[^\s@]{1,64}@[^\s@]+\.[^\s@]+$/.test(v)
    const isPhone = /^[+0-9()\-\s]{6,20}$/.test(v)
    return isEmail || isPhone
  }, [contact])

  const canSend = name.trim().length >= 2 && contactValid && address.trim().length >= 5 && !loading

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOk(null)
    setErr(null)
    if (!canSend) return

    setLoading(true)
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          contact: contact.trim(),
          address: address.trim(),
          comment: comment.trim(),
          hp,
          ft: Date.now() - (ftRef.current || Date.now()),
        }),
      })
      const data = (await res.json()) as { ok: boolean; error?: string }
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'send_failed')
      setOk('Заявка отправлена. Мы свяжемся с вами в ближайшее время.')
      setName('')
      setContact('')
      setAddress('')
      setComment('')
    } catch {
      setErr('Не удалось отправить заявку. Попробуйте ещё раз или напишите в мессенджер.')
    } finally {
      setLoading(false)
    }
  }

  const shell =
    variant === 'inline'
      ? 'bg-base-100/60 border border-base-content/10 rounded-3xl p-6 md:p-8 backdrop-blur'
      : 'glass-card p-6 md:p-8'

  return (
    <form onSubmit={onSubmit} className={shell}>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <div className='text-xl md:text-2xl font-black tracking-tight'>{title}</div>
          <p className='mt-2 text-sm text-base-content/70'>{subtitle}</p>
        </div>
        <div className='badge badge-outline hidden sm:inline-flex' style={{width: '100%', maxWidth: 'max-content', color: 'green'}}>без спама</div>
      </div>

      <div className='mt-6 grid gap-3'>
        <input
          className='input input-bordered w-full rounded-2xl focus-ring'
          placeholder='Имя'
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete='name'
        />
        <input
          className='input input-bordered w-full rounded-2xl focus-ring'
          placeholder='Телефон или Email'
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          autoComplete='tel'
        />
        <input
          className='input input-bordered w-full rounded-2xl focus-ring'
          placeholder='Адрес / район'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          autoComplete='street-address'
        />
        <textarea
          className='textarea textarea-bordered w-full rounded-2xl focus-ring min-h-[110px]'
          placeholder='Комментарий (необязательно)'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {/* honeypot */}
        <input
          tabIndex={-1}
          aria-hidden='true'
          className='hidden'
          value={hp}
          onChange={(e) => setHp(e.target.value)}
        />
      </div>

      <div className='mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between'>
        <button className='btn btn-primary rounded-full' disabled={!canSend}>
          {loading ? <span className='loading loading-spinner' /> : 'Отправить'}
        </button>
        <div className='text-xs text-base-content/60'>
          Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных.
        </div>
      </div>

      {ok && (
        <div role='status' className='mt-4 alert alert-success'>
          <span>{ok}</span>
        </div>
      )}
      {err && (
        <div role='alert' className='mt-4 alert alert-error'>
          <span>{err}</span>
        </div>
      )}
    </form>
  )
}
