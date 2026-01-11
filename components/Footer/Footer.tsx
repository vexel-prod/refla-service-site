import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className='border-t border-base-content/10'>
      <div className='container py-10'>
        <div className='grid gap-8 md:grid-cols-3'>
          <div>
            <div className='text-xl font-black tracking-tight'>REFLA</div>
            <p className='mt-2 text-sm text-base-content/70 max-w-sm'>
              Установка зеркал на входные двери в Санкт‑Петербурге и области. Аккуратный монтаж, безопасные материалы и
              понятная смета.
            </p>
            <div className='mt-4 flex gap-2'>
              <Link href='/privacy' className='link link-hover text-sm'>
                Политика конфиденциальности
              </Link>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div>
              <div className='text-sm font-semibold'>Навигация</div>
              <ul className='mt-3 space-y-2 text-sm text-base-content/70'>
                <li>
                  <Link href='/' className='link link-hover'>
                    Главная
                  </Link>
                </li>
                <li>
                  <Link href='/pricing' className='link link-hover'>
                    Цены
                  </Link>
                </li>
                <li>
                  <Link href='/about' className='link link-hover'>
                    О компании
                  </Link>
                </li>
                <li>
                  <Link href='/contacts' className='link link-hover'>
                    Контакты
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className='text-sm font-semibold'>Быстро</div>
              <ul className='mt-3 space-y-2 text-sm text-base-content/70'>
                <li>
                  <Link href='/request' className='link link-hover'>
                    Заказать замер
                  </Link>
                </li>
                <li>
                  <a href='#faq' className='link link-hover'>
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='glass-card p-6'>
            <div className='text-sm font-semibold'>Связаться</div>
            <p className='mt-2 text-sm text-base-content/70'>
              Оставьте заявку — уточним размеры, предложим варианты кромки и крепления, пришлём смету в мессенджер.
            </p>
            <div className='mt-4 flex flex-col gap-2'>
              <Link href='/request' className='btn btn-primary rounded-full'>
                Получить расчёт
              </Link>
              <Link href='/contacts' className='btn btn-ghost rounded-full'>
                Контакты
              </Link>
            </div>
          </div>
        </div>

        <div className='mt-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm text-base-content/60'>
          <div>© {year} REFLA</div>
          <div className='opacity-80'>Сайт не является публичной офертой</div>
        </div>
      </div>
    </footer>
  )
}
