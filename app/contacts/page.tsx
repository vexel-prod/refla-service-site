import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Контакты — REFLA',
}

export const CONTACTS = [
  {
    title: 'Телефон',
    value: '+7 (995) 624‑55‑34',
    href: 'tel:+79956245534',
    note: 'Звонки и сообщения',
    icon: { title: 'phone', src: '/assets/phone.svg' },
  },
  {
    title: 'Telegram',
    value: '@refla_mirror',
    href: 'https://t.me/refla_mirror',
    note: 'Быстрые ответы',
    icon: { title: 'tg', src: '/assets/tg.svg' },
  },
  {
    title: 'Email',
    value: 'refla-mirror@mail.ru',
    href: 'mailto:refla-mirror@mail.ru',
    note: 'Документы и детали',
    icon: { title: 'email', src: '/assets/email.svg' },
  },
]

export default function ContactsPage() {
  return (
    <section className='section'>
      <div className='container'>
        <div className='grid gap-10 lg:grid-cols-2 lg:items-start'>
          <div>
            <h1 className='text-3xl md:text-4xl font-black tracking-tight'>Контакты</h1>
            <p className='mt-4 text-base-content/70 max-w-xl'>
              Напишите в удобный канал — обычно отвечаем быстро. Для точного расчёта полезно
              прислать фото двери и адрес.
            </p>

            <div className='mt-7 flex flex-wrap gap-2'>
              <span className='badge badge-outline'>Заявки: 10:00–21:00</span>
              <span className='badge badge-outline'>Монтаж: 12:00–19:00</span>
              <span className='badge badge-outline'>Пн–Пт</span>
            </div>

            <div className='mt-8 grid gap-4 sm:grid-cols-2'>
              {CONTACTS.map((c) => (
                <a
                  key={c.title}
                  href={c.href}
                  className='card-surface p-6 flex items-start gap-4 hover:shadow-2xl transition-all focus-ring group'
                >
                  {/* Иконка */}
                  <div className='shrink-0 h-11 w-11 rounded-2xl bg-base-100/70 border border-base-content/10 grid place-items-center group-hover:scale-105 transition'>
                    <Image
                      src={c.icon.src}
                      alt={c.icon.title}
                      width={22}
                      height={22}
                      className='opacity-80'
                    />
                  </div>

                  {/* Текст */}
                  <div className='min-w-0'>
                    <div className='text-sm text-base-content/60'>{c.title}</div>
                    <div className='mt-0.5 font-bold truncate'>{c.value}</div>
                    <div className='mt-1 text-sm text-base-content/70'>{c.note}</div>
                  </div>
                </a>
              ))}

              {/* Адрес */}
              <div className='card-surface p-6 flex items-start gap-4'>
                <div className='shrink-0 h-11 w-11 rounded-2xl bg-base-100/70 border border-base-content/10 grid place-items-center'>
                  <svg
                    width='22'
                    height='22'
                    viewBox='0 0 24 24'
                    fill='none'
                    className='opacity-70'
                    aria-hidden
                  >
                    <path
                      d='M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z'
                      stroke='currentColor'
                      strokeWidth='2'
                    />
                    <circle
                      cx='12'
                      cy='10'
                      r='3'
                      stroke='currentColor'
                      strokeWidth='2'
                    />
                  </svg>
                </div>

                <div>
                  <div className='text-sm text-base-content/60'>Адрес</div>
                  <div className='mt-0.5 font-bold'>Санкт-Петербург</div>
                  <div className='mt-1 text-sm text-base-content/70'>
                    Выезжаем по городу и области.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='card-surface gradient-border p-7 md:p-10'>
            <h2 className='text-xl md:text-2xl font-black tracking-tight'>Перед тем как писать</h2>
            <p className='mt-3 text-sm text-base-content/70'>
              Чтобы мы сразу дали точную смету, подготовьте:
            </p>
            <ul className='mt-4 space-y-2 text-sm text-base-content/70 list-disc pl-5'>
              <li>Фото двери спереди (и крупно ручку/замок, если есть)</li>
              <li>Желаемый размер зеркала</li>
              <li>Нужны ли вырезы под фурнитуру</li>
              <li>Предпочтения по кромке (полировка / фацет)</li>
            </ul>

            <div className='mt-8 flex gap-3 flex-wrap'>
              <Link
                href='/request'
                className='btn btn-primary rounded-full shimmer focus-ring'
              >
                Оставить заявку
              </Link>
              <Link
                href='/pricing'
                className='btn btn-ghost rounded-full focus-ring'
              >
                Цены
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
