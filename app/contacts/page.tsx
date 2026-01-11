import Link from 'next/link'

export const metadata = {
  title: 'Контакты — REFLA',
}

const CONTACTS = [
  { title: 'Телефон', value: '+7 (995) 624‑55‑34', href: 'tel:+79956245534', note: 'Звонки и сообщения' },
  { title: 'Telegram', value: '@refla_mirror', href: 'https://t.me/refla_mirror', note: 'Быстрые ответы' },
  { title: 'Email', value: 'refla-mirror@mail.ru', href: 'mailto:refla-mirror@mail.ru', note: 'Документы и детали' },
]

export default function ContactsPage() {
  return (
    <section className='section'>
      <div className='container'>
        <div className='grid gap-10 lg:grid-cols-2 lg:items-start'>
          <div>
            <h1 className='text-3xl md:text-4xl font-black tracking-tight'>Контакты</h1>
            <p className='mt-4 text-base-content/70 max-w-xl'>
              Напишите в удобный канал — обычно отвечаем быстро. Для точного расчёта полезно прислать фото двери и адрес.
            </p>

            <div className='mt-7 flex flex-wrap gap-2'>
              <span className='badge badge-outline'>Заявки: 10:00–21:00</span>
              <span className='badge badge-outline'>Монтаж: 12:00–19:00</span>
              <span className='badge badge-outline'>Пн–Пт</span>
            </div>

            <div className='mt-8 grid gap-4 sm:grid-cols-2'>
              {CONTACTS.map((c) => (
                <a key={c.title} href={c.href} className='glass-card p-6 hover:shadow-2xl transition-shadow focus-ring'>
                  <div className='text-sm text-base-content/60'>{c.title}</div>
                  <div className='mt-1 font-bold'>{c.value}</div>
                  <div className='mt-2 text-sm text-base-content/70'>{c.note}</div>
                </a>
              ))}
              <div className='glass-card p-6'>
                <div className='text-sm text-base-content/60'>Адрес</div>
                <div className='mt-1 font-bold'>Санкт‑Петербург</div>
                <div className='mt-2 text-sm text-base-content/70'>Выезжаем по городу и области.</div>
              </div>
            </div>
          </div>

          <div className='glass-card p-7 md:p-10'>
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
              <Link href='/request' className='btn btn-primary rounded-full'>
                Оставить заявку
              </Link>
              <Link href='/pricing' className='btn btn-ghost rounded-full'>
                Цены
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
