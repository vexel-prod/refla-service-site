'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

const MAX_PHOTOS = 5
const MAX_FILE_MB = 8
const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024

type PhotoItem = { id: string; file: File; url: string }

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

  const [photos, setPhotos] = useState<PhotoItem[]>([])

  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  const ftRef = useRef<number>(0)
  useEffect(() => {
    if (!ftRef.current) ftRef.current = Date.now()
  }, [])

  useEffect(() => {
    return () => {
      // cleanup object URLs
      for (const p of photos) URL.revokeObjectURL(p.url)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const contactValid = useMemo(() => {
    const v = contact.trim()
    if (!v) return false
    const isEmail = /^[^\s@]{1,64}@[^\s@]+\.[^\s@]+$/.test(v)
    const isPhone = /^[+0-9()\-\s]{6,20}$/.test(v)
    return isEmail || isPhone
  }, [contact])

  const canSend = name.trim().length >= 2 && contactValid && address.trim().length >= 5 && !loading

  function addFiles(fileList: FileList | null) {
    if (!fileList) return
    setErr(null)
    setOk(null)

    const incoming = Array.from(fileList)
    const next: PhotoItem[] = []
    let rejectedSize = 0
    let rejectedType = 0

    for (const f of incoming) {
      if (photos.length + next.length >= MAX_PHOTOS) break
      if (!f.type.startsWith('image/')) {
        rejectedType++
        continue
      }
      if (f.size > MAX_FILE_BYTES) {
        rejectedSize++
        continue
      }
      const id = `${f.name}-${f.size}-${f.lastModified}-${Math.random().toString(16).slice(2)}`
      next.push({ id, file: f, url: URL.createObjectURL(f) })
    }

    if (rejectedType || rejectedSize) {
      const parts: string[] = []
      if (rejectedType) parts.push(`неизвестный формат: ${rejectedType}`)
      if (rejectedSize) parts.push(`слишком большие: ${rejectedSize} (>${MAX_FILE_MB}MB)`)
      setErr(`Часть файлов не добавлена (${parts.join(', ')}).`)
    }

    if (next.length) setPhotos((prev) => [...prev, ...next])
  }

  function removePhoto(id: string) {
    setPhotos((prev) => {
      const p = prev.find((x) => x.id === id)
      if (p) URL.revokeObjectURL(p.url)
      return prev.filter((x) => x.id !== id)
    })
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOk(null)
    setErr(null)
    if (!canSend) return

    setLoading(true)
    try {
      const fd = new FormData()
      fd.set('name', name.trim())
      fd.set('contact', contact.trim())
      fd.set('address', address.trim())
      fd.set('comment', comment.trim())
      fd.set('hp', hp)
      // анти-бот тайминг: отправляем timestamp начала заполнения (как число)
      fd.set('ft', String(ftRef.current || Date.now()))

      // multiple photos: photo[] (важно имя)
      for (const p of photos) fd.append('photo[]', p.file)

      const res = await fetch('/api/lead.php', { method: 'POST', body: fd })
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null

      if (!res.ok || !data?.ok) {
        console.error('lead_error', res.status, data)
        throw new Error(data?.error || 'send_failed')
      }

      setOk('Заявка отправлена. Мы свяжемся с вами в ближайшее время.')
      setName('')
      setContact('')
      setAddress('')
      setComment('')
      setHp('')
      // cleanup previews
      for (const p of photos) URL.revokeObjectURL(p.url)
      setPhotos([])
      ftRef.current = Date.now()
    } catch {
      setErr('Не удалось отправить заявку. Попробуйте ещё раз или напишите в мессенджер.')
    } finally {
      setLoading(false)
    }
  }

  const shell =
    variant === 'inline' ? 'card-surface p-6 md:p-8' : 'card-surface gradient-border p-6 md:p-8'

  return (
    <form
      onSubmit={onSubmit}
      className={shell}
    >
      <div className='flex items-start justify-between gap-4'>
        <div>
          <div className='text-xl md:text-2xl font-black tracking-tight'>{title}</div>
          <p className='mt-2 text-sm text-base-content/70'>{subtitle}</p>
        </div>
        <div
          className='badge badge-outline hidden sm:inline-flex w-full'
          style={{ maxWidth: 'max-content', color: 'green' }}
        >
          без спама
        </div>
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

        {/* Фото */}
        <div className='grid gap-2'>
          <div className='flex items-center justify-between gap-3'>
            <div className='text-sm text-base-content/80'>
              Фото (до {MAX_PHOTOS} шт., до {MAX_FILE_MB}MB каждое)
            </div>
            <div className='text-xs text-base-content/60'>
              {photos.length}/{MAX_PHOTOS}
            </div>
          </div>

          <input
            type='file'
            accept='image/*'
            multiple
            className='file-input file-input-bordered w-full rounded-2xl focus-ring'
            onChange={(e) => {
              addFiles(e.target.files)
              // чтобы можно было выбрать те же файлы повторно
              e.currentTarget.value = ''
            }}
            disabled={photos.length >= MAX_PHOTOS}
          />

          {photos.length > 0 && (
            <div className='mt-1 grid grid-cols-3 sm:grid-cols-5 gap-2'>
              {photos.map((p) => (
                <div
                  key={p.id}
                  className='relative'
                >
                  <img
                    src={p.url}
                    alt='Фото'
                    className='w-full h-20 object-cover rounded-xl'
                  />
                  <button
                    type='button'
                    className='btn btn-xs btn-circle absolute -top-2 -right-2'
                    onClick={() => removePhoto(p.id)}
                    aria-label='Удалить фото'
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

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
        <button
          className='btn btn-primary rounded-full shimmer focus-ring'
          disabled={!canSend}
        >
          {loading ? <span className='loading loading-spinner' /> : 'Отправить'}
        </button>
        <div className='text-xs text-base-content/60'>
          Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных.
        </div>
      </div>

      {ok && (
        <div
          role='status'
          className='mt-4 alert alert-success'
        >
          <span>{ok}</span>
        </div>
      )}
      {err && (
        <div
          role='alert'
          className='mt-4 alert alert-error'
        >
          <span>{err}</span>
        </div>
      )}
    </form>
  )
}
