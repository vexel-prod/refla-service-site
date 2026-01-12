import Link from 'next/link'

const year = new Date().getFullYear()

function SocialIcon({ name }: { name: 'tg' | 'wa' | 'call' }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true as const }
  if (name === 'call')
    return (
      <svg {...common}>
        <path
          d='M6.6 3.5l2.3-.9c.7-.3 1.5 0 1.8.7l1.1 2.6c.3.7.1 1.5-.5 1.9l-1.3 1c-.3.2-.4.6-.3.9.8 2.1 2.2 3.8 4.1 5 .3.2.7.2 1 0l1.4-.8c.7-.4 1.5-.2 2 .3l1.9 2c.5.5.5 1.4 0 2l-1.6 1.9c-.4.5-1 .7-1.6.6-7.5-1.2-13.4-7-14.8-14.6-.1-.6.1-1.2.6-1.6l1.9-1.6c.4-.3.5-.9.3-1.3l-.8-1.6c-.3-.6 0-1.3.6-1.5Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinejoin='round'
        />
      </svg>
    )

  if (name === 'wa')
    return (
      <svg {...common}>
        <path
          d='M20 11.8c0 4.5-3.7 8.2-8.2 8.2-1.4 0-2.8-.4-4-1l-3.8 1 1.1-3.6c-.8-1.2-1.2-2.7-1.2-4.2C4 7.3 7.7 3.6 12.2 3.6S20 7.3 20 11.8Z'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinejoin='round'
        />
        <path
          d='M10 9.6c.2-.3.5-.3.8-.3l.7 1.6c.1.3 0 .6-.2.8l-.4.4c.7 1.2 1.7 2.1 2.9 2.8l.4-.4c.2-.2.5-.3.8-.2l1.6.7c0 .3 0 .6-.3.8-.5.4-1.1.6-1.7.4-2.9-.8-5.3-3.2-6.1-6.1-.2-.6 0-1.3.5-1.7Z'
          fill='currentColor'
          opacity='.85'
        />
      </svg>
    )

  return (
    <svg {...common}>
      <path
        d='M20.7 6.1c.3-.9-.5-1.7-1.4-1.4L3.8 10.6c-1 .4-1 1.8.1 2.1l4.6 1.4 1.4 4.6c.3 1.1 1.7 1.2 2.1.2l1.5-3 4.3 3.1c.7.5 1.6.1 1.8-.7l2.1-12.2Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinejoin='round'
      />
      <path d='M9 14l10-7' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className='mt-10'>
      <div className='container'>
        <div className='card-surface gradient-border p-7 md:p-10'>
          <div className='grid gap-8 md:grid-cols-2'>
            <div>
              <div className='font-black text-xl tracking-tight'>REFLA</div>
              <p className='mt-3 text-sm text-base-content/70 max-w-md'>
                Зеркала на входные двери под ключ: замер, подготовка, монтаж. Аккуратно, безопасно и с гарантией.
              </p>

              <div className='mt-5 flex flex-wrap gap-2'>
                <Link href='/request' className='btn btn-primary rounded-full shimmer focus-ring'>
                  Рассчитать стоимость
                </Link>
                <Link href='/examples' className='btn btn-ghost rounded-full focus-ring'>
                  Примеры работ
                </Link>
              </div>

              <div className='mt-5 flex items-center gap-3 text-sm text-base-content/70'>
                <span className='inline-flex items-center gap-2'>
                  <span className='h-2 w-2 rounded-full bg-success animate-pulse' aria-hidden='true' />
                  Отвечаем в рабочее время
                </span>
              </div>
            </div>

            <div className='grid gap-6 sm:grid-cols-2'>
              <div>
                <div className='text-sm font-semibold'>Навигация</div>
                <ul className='mt-3 space-y-2 text-sm text-base-content/70'>
                  <li>
                    <Link className='link link-hover' href='/pricing'>Цены</Link>
                  </li>
                  <li>
                    <Link className='link link-hover' href='/about'>О компании</Link>
                  </li>
                  <li>
                    <Link className='link link-hover' href='/contacts'>Контакты</Link>
                  </li>
                  <li>
                    <Link className='link link-hover' href='/privacy'>Политика конфиденциальности</Link>
                  </li>
                </ul>
              </div>

              <div>
                <div className='text-sm font-semibold'>Связь</div>
                <div className='mt-3 space-y-2 text-sm text-base-content/70'>
                  <div className='flex items-center gap-2'>
                    <SocialIcon name='tg' />
                    <span>Telegram</span>
                    <span className='text-xs text-base-content/50'>(по запросу)</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <SocialIcon name='wa' />
                    <span>WhatsApp</span>
                    <span className='text-xs text-base-content/50'>(по запросу)</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <SocialIcon name='call' />
                    <span>Звонок</span>
                    <span className='text-xs text-base-content/50'>(по запросу)</span>
                  </div>
                </div>

                <div className='mt-5 rounded-2xl border border-base-content/10 bg-base-100/50 p-4 text-sm'>
                  <div className='font-semibold'>Санкт‑Петербург и область</div>
                  <div className='mt-1 text-base-content/70'>Выезд на замер • монтаж • гарантия</div>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-8 flex flex-col md:flex-row gap-3 items-start md:items-center justify-between border-t border-base-content/10 pt-6 text-xs text-base-content/60'>
            <div>© {year} REFLA. Все права защищены.</div>
            <div className='flex items-center gap-3'>
              <Link href='/privacy' className='link link-hover'>Политика</Link>
              <span className='opacity-50'>•</span>
              <span>Сайт обновлён: v2 UI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
