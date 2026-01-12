'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import LeadForm from 'components/LeadForm/LeadForm'
import TypingText from 'components/TypingText/TypingText'
import BeforeAfterSlider from 'components/BeforeAfterSlider/BeforeAfterSlider'

const Gallery = dynamic(() => import('components/Gallery/Gallery'), { ssr: false })

const FEATURES: Array<{ title: string; text: string; icon: string }> = [
  {
    title: 'Аккуратный монтаж',
    text: 'Чистая работа и внимание к деталям: ровные зазоры, аккуратная кромка.',
    icon: '✨',
  },
  {
    title: 'Безопасные материалы',
    text: 'Закалённое зеркало и крепления под нагрузку двери.',
    icon: '🛡️',
  },
  {
    title: 'Прозрачная смета',
    text: 'Понятный расчёт до начала работ — без сюрпризов.',
    icon: '🧾',
  },
  {
    title: 'В большинстве случаев — 1 день',
    text: 'От замера до установки: быстро и по делу.',
    icon: '⏱️',
  },
  { title: 'Гарантия', text: 'На монтаж и материалы. Держим качество.', icon: '✅' },
  {
    title: 'Рекомендации по дизайну',
    text: 'Подскажем кромку и формат, чтобы зеркало выглядело «дорого».',
    icon: '🎛️',
  },
]

const STEPS: Array<{ t: string; d: string }> = [
  { t: 'Заявка', d: 'Оставляете контакт — уточняем задачу и адрес.' },
  { t: 'Замер', d: 'Измеряем, согласуем кромку и крепление.' },
  { t: 'Подготовка', d: 'Режем под размер, делаем обработку и вырезы при необходимости.' },
  { t: 'Монтаж', d: 'Устанавливаем, проверяем, убираем рабочее место.' },
]

const FAQ: Array<{ q: string; a: string }> = [
  {
    q: 'Сколько занимает установка?',
    a: 'Обычно 1–3 часа после подготовки. Для нестандартных задач время может увеличиться — уточним на замере.',
  },
  {
    q: 'Насколько это безопасно?',
    a: 'Используем закалённое зеркало и крепления под нагрузку двери. Монтаж выполняется с учётом фурнитуры и открывания.',
  },
  {
    q: 'Можно ли зеркало «в пол»?',
    a: 'Да. Подберём размер под дверь, учтём ручки/замки и сделаем аккуратные вырезы.',
  },
  {
    q: 'Какие есть варианты кромки?',
    a: 'Чаще всего — полировка или фацет. Подскажем лучший вариант по дизайну и практичности.',
  },
]

function Stars({ n }: { n: number }) {
  return (
    <div
      className='flex items-center gap-0.5 text-amber-400'
      aria-label={`Оценка ${n} из 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < n ? '' : 'opacity-25'}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className='section pt-10 md:pt-16'>
        <div className='container'>
          <div className='grid gap-10 lg:grid-cols-2'>
            <div>
              <div className='inline-flex items-center gap-2 rounded-full border border-base-content/10 bg-base-100/60 px-4 py-2 text-sm backdrop-blur'>
                <span className='badge badge-primary badge-sm'>СПБ</span>
                <span className='text-base-content/70'>
                  Зеркало на входную дверь • монтаж под ключ
                </span>
              </div>

              <h1 className='mt-6 text-4xl font-black tracking-tight leading-[1.02]'>
                Зеркало на входную дверь —{' '}
                <span className='bg-gradient-to-r from-sky-400 via-indigo-400 to-orange-400 bg-clip-text text-transparent'>
                  <TypingText phrases={['современно', 'аккуратно', 'быстро', 'с гарантией']} />
                </span>
              </h1>

              <p className='mt-6 text-base md:text-lg text-base-content/70 max-w-xl'>
                Добавьте свет и глубину в прихожую. Подберём размер, кромку и крепление, сделаем
                точный монтаж и оставим после себя чисто.
              </p>

              <div className='mt-8 flex flex-col sm:flex-row gap-3'>
                <Link
                  href='/request'
                  className='btn btn-primary rounded-full shimmer focus-ring'
                >
                  Рассчитать стоимость
                </Link>
                <a
                  href='#examples'
                  className='btn btn-ghost rounded-full focus-ring'
                >
                  Посмотреть примеры
                </a>
              </div>

              <div className='mt-8 grid grid-cols-3 gap-3 max-w-xl'>
                {[
                  ['1 день', 'часто хватает'],
                  ['0 ₽', 'консультация'],
                  ['5★', 'средняя оценка'],
                ].map(([a, b]) => (
                  <div
                    key={a}
                    className='card-surface p-4'
                  >
                    <div className='text-xl font-black'>{a}</div>
                    <div className='text-xs text-base-content/60 mt-1'>{b}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className='grid gap-5'>
              <div className='card-surface p-6 md:p-8'>
                <div className='flex items-end justify-between gap-4 flex-wrap'>
                  <div>
                    <div className='font-black text-lg md:text-xl'>Сравнение</div>
                    <div className='mt-1 text-sm text-base-content/70'>
                      Перетяните ползунок — как меняется ощущение пространства.
                    </div>
                  </div>
                  <div className='badge badge-outline'>до / после</div>
                </div>
                <div className='mt-5'>
                  <BeforeAfterSlider
                    beforeSrc='/assets/7.jpg'
                    afterSrc='/assets/12.jpg'
                  />
                </div>
              </div>
              {/* <div className='card-surface gradient-border p-6 md:p-8'>
                <div className='flex items-center justify-between gap-4'>
                  <div>
                    <div className='font-black text-lg md:text-xl'>Быстрый расчёт</div>
                    <div className='mt-1 text-sm text-base-content/70'>
                      Заполните форму — уточним детали и вернёмся с ценой и сроками.
                    </div>
                  </div>
                  <div className='badge badge-outline'>онлайн</div>
                </div>
                <div className='mt-5'>
                  <LeadForm
                    variant='inline'
                    title='Заявка'
                    subtitle='Телефон или Telegram/WhatsApp — как удобно.'
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className='section pt-0'>
        <div className='container'>
          <div className='flex items-end justify-between gap-6 flex-wrap'>
            <div>
              <h2 className='text-2xl md:text-3xl font-black tracking-tight'>Почему REFLA</h2>
              <p className='mt-2 text-base-content/70 max-w-xl'>
                Сочетаем «красиво» и «надёжно»: детали решают, когда зеркало становится частью
                интерьера.
              </p>
            </div>
            <Link
              href='/pricing'
              className='btn btn-ghost rounded-full focus-ring'
            >
              Открыть прайс
            </Link>
          </div>

          <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className='card-surface p-6 hover:shadow-2xl transition-shadow'
              >
                <div className='flex items-center gap-3'>
                  <div className='h-10 w-10 rounded-2xl bg-primary/15 flex items-center justify-center text-lg'>
                    {f.icon}
                  </div>
                  <div className='font-semibold'>{f.title}</div>
                </div>
                <p className='mt-3 text-sm text-base-content/70'>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className='section'>
        <div className='container'>
          <div className='grid gap-10 lg:grid-cols-2 lg:items-start'>
            <div>
              <h2 className='text-2xl md:text-3xl font-black tracking-tight'>Как это происходит</h2>
              <p className='mt-2 text-base-content/70 max-w-xl'>
                Прозрачный процесс: вы понимаете стоимость, сроки и результат до начала работ.
              </p>

              <div className='mt-7 space-y-3'>
                {STEPS.map((s, i) => (
                  <div
                    key={s.t}
                    className='card-surface p-5 flex gap-4 items-start hover:translate-x-[2px] transition-transform'
                  >
                    <div className='badge badge-primary badge-lg rounded-2xl px-4'>{i + 1}</div>
                    <div>
                      <div className='font-semibold'>{s.t}</div>
                      <div className='text-sm text-base-content/70 mt-1'>{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              id='examples'
              className='card-surface p-6 md:p-8'
            >
              <div className='flex items-end justify-between gap-4 flex-wrap'>
                <div>
                  <h3 className='text-xl md:text-2xl font-black tracking-tight'>Примеры работ</h3>
                  <p className='mt-2 text-sm text-base-content/70'>
                    Нажмите на фото, чтобы увеличить.
                  </p>
                </div>
                <div className='badge badge-outline'>галерея</div>
              </div>
              <div className='mt-6'>
                <Gallery />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className='section pt-0'>
        <div className='container'>
          <div className='flex items-end justify-between gap-6 flex-wrap'>
            <div>
              <h2 className='text-2xl md:text-3xl font-black tracking-tight'>Отзывы</h2>
              <p className='mt-2 text-base-content/70'>
                Коротко и по делу — что отмечают клиенты чаще всего.
              </p>
            </div>
            <div className='badge badge-primary badge-outline'>обновляем</div>
          </div>

          <div className='mt-8 grid gap-4 lg:grid-cols-3'>
            {[
              {
                name: 'Алексей, Санкт‑Петербург',
                rating: 5,
                text: 'Сделали аккуратно и за один день. Прихожая стала визуально больше.',
              },
              {
                name: 'Екатерина, СПб',
                rating: 5,
                text: 'Помогли выбрать кромку и оттенок. Смотрится дорого и минималистично.',
              },
              {
                name: 'Ирина, СПб',
                rating: 5,
                text: 'Очень чистый монтаж, без суеты и пыли. Внимание к деталям.',
              },
              {
                name: 'Дмитрий, Колпино',
                rating: 4,
                text: 'Качественно. Установка заняла чуть больше времени, но результат отличный.',
              },
              {
                name: 'Марина, Гатчина',
                rating: 4,
                text: 'Вежливые, зеркало стоит идеально. Цена выше ожиданий, но качество оправдало.',
              },
              {
                name: 'Игорь, Всеволожск',
                rating: 5,
                text: 'Приехали вовремя, сделали быстро. Буду рекомендовать знакомым.',
              },
            ].map((r) => (
              <div
                key={r.name}
                className='card-surface p-6'
              >
                <Stars n={r.rating} />
                <p className='mt-3 text-sm text-base-content/70'>{r.text}</p>
                <div className='mt-4 text-sm font-semibold'>{r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className='section'>
        <div className='container'>
          <div className='grid gap-8 lg:grid-cols-2 lg:items-start'>
            <div>
              <h2 className='text-2xl md:text-3xl font-black tracking-tight'>Вопросы</h2>
              <p className='mt-2 text-base-content/70 max-w-xl'>
                Ответы на самые частые вопросы — чтобы было спокойно и понятно.
              </p>
              <div className='mt-6 card-surface p-6 md:p-8'>
                <div className='text-sm text-base-content/70'>
                  Если вопрос нестандартный — напишите, и мы подскажем решение.
                </div>
                <div className='mt-4 flex flex-wrap gap-2'>
                  <Link
                    href='/contacts'
                    className='btn btn-ghost rounded-full focus-ring'
                  >
                    Контакты
                  </Link>
                  <Link
                    href='/request'
                    className='btn btn-primary rounded-full focus-ring'
                  >
                    Оставить заявку
                  </Link>
                </div>
              </div>
            </div>

            <div className='space-y-3'>
              {FAQ.map((f) => (
                <div
                  key={f.q}
                  className='collapse collapse-arrow card-surface'
                >
                  <input type='checkbox' />
                  <div className='collapse-title font-semibold'>{f.q}</div>
                  <div className='collapse-content text-sm text-base-content/70'>
                    <p>{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
