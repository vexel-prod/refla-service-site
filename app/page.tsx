'use client'

import Link from 'next/link'
import Gallery from 'components/Gallery/Gallery'
import LeadForm from 'components/LeadForm/LeadForm'
import TypingText from 'components/TypingText/TypingText'
import TiltCard from 'components/TiltCard/TiltCard'

const features: Array<{ title: string; text: string; icon: string }> = [
  { title: 'Эстетика', text: 'Точные подрезы, аккуратная кромка, ровные зазоры.', icon: '✨' },
  { title: 'Безопасность', text: 'Закалённое зеркало, надёжные крепления, аккуратный монтаж.', icon: '🛡️' },
  { title: 'Чистая работа', text: 'Минимум пыли и шума. Бережём отделку и фурнитуру.', icon: '🧼' },
  { title: 'Сроки', text: 'В большинстве случаев — установка за 1 день.', icon: '⏱️' },
  { title: 'Гарантия', text: 'Даём гарантию на монтаж и материалы.', icon: '✅' },
  { title: 'Смета заранее', text: 'Понятный расчёт стоимости до начала работ.', icon: '🧾' },
]

const steps: Array<{ title: string; text: string }> = [
  { title: 'Заявка', text: 'Оставляете контакт — уточняем задачу и адрес.' },
  { title: 'Замер', text: 'Приезжаем, измеряем, согласуем кромку и крепление.' },
  { title: 'Изготовление', text: 'Подготовка под ваши размеры и требования.' },
  { title: 'Монтаж', text: 'Аккуратно устанавливаем, проверяем, убираем рабочее место.' },
]

const reviews: Array<{ name: string; rating: number; text: string }> = [
  { name: 'Алексей, Санкт‑Петербург', rating: 5, text: 'Сделали аккуратно и за один день. Прихожая стала визуально больше.' },
  { name: 'Екатерина, СПб', rating: 5, text: 'Помогли выбрать кромку и оттенок. Смотрится дорого и минималистично.' },
  { name: 'Ирина, СПб', rating: 5, text: 'Очень чистый монтаж, без суеты и пыли. Внимание к деталям.' },
  { name: 'Дмитрий, Колпино', rating: 4, text: 'Качественно. Установка заняла чуть больше времени, чем ожидал, но результат отличный.' },
  { name: 'Марина, Гатчина', rating: 4, text: 'Ребята вежливые, зеркало стоит идеально. Цена выше ожиданий, но качество оправдало.' },
  { name: 'Игорь, Всеволожск', rating: 5, text: 'Приехали вовремя, сделали быстро. Буду рекомендовать знакомым.' },
]

const faqs: Array<{ q: string; a: string }> = [
  {
    q: 'Сколько занимает установка?',
    a: 'Обычно 1–3 часа на монтаж после подготовки. Для нестандартных задач время может увеличиться — уточним на замере.',
  },
  {
    q: 'Насколько это безопасно?',
    a: 'Используем закалённое зеркало и крепления под нагрузку двери. Монтаж выполняется с учётом фурнитуры и открывания.',
  },
  {
    q: 'Можно ли сделать зеркало «в пол»?',
    a: 'Да. Подбираем размер под вашу дверь, учитываем ручки/замки и делаем аккуратные вырезы при необходимости.',
  },
  {
    q: 'Какие есть варианты кромки?',
    a: 'Чаще всего — полировка или фацет. Подскажем лучший вариант по дизайну и практичности.',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className='section'>
        <div className='container'>
          <div className='grid gap-10 lg:grid-cols-2 lg:items-center'>
            <div>
              <div className='inline-flex items-center gap-2 rounded-full border border-base-content/10 bg-base-100/60 px-4 py-2 text-sm backdrop-blur'>
                <span className='badge badge-primary badge-sm'>SPB</span>
                <span className='text-base-content/70'>Зеркало на входную дверь • монтаж под ключ</span>
              </div>

              <h1 className='mt-5 text-4xl md:text-5xl font-black tracking-tight leading-[1.02]'>
                Зеркало на входную дверь —{' '}
                <span className='text-primary'>
                  <TypingText phrases={['аккуратно', 'быстро', 'безопасно', 'с гарантией']} />
                </span>
              </h1>

              <p className='mt-5 text-base md:text-lg text-base-content/70 max-w-xl'>
                Добавьте свет и глубину в прихожую. Мы подберём размер, кромку и крепление, сделаем точный монтаж и
                оставим после себя чисто.
              </p>

              <div className='mt-7 flex flex-col sm:flex-row gap-3'>
                <Link href='/request' className='btn btn-primary rounded-full'>
                  Рассчитать стоимость
                </Link>
                <a href='#gallery' className='btn btn-ghost rounded-full'>
                  Посмотреть примеры
                </a>
              </div>

              <div className='mt-8 grid grid-cols-3 gap-3 max-w-lg'>
                {[
                  ['1 день', 'часто хватает'],
                  ['0 ₽', 'за консультацию'],
                  ['5★', 'средняя оценка'],
                ].map(([a, b]) => (
                  <div key={a} className='glass-card p-4'>
                    <div className='text-xl font-black'>{a}</div>
                    <div className='text-xs text-base-content/60 mt-1'>{b}</div>
                  </div>
                ))}
              </div>
            </div>

            <TiltCard className='glass-card overflow-hidden'>
              <div className='p-6 md:p-8'>
                <div className='flex items-center justify-between'>
                  <div className='font-black text-lg'>Быстрый расчёт</div>
                  <div className='badge badge-outline'>онлайн</div>
                </div>
                <p className='mt-2 text-sm text-base-content/70'>
                  Заполните форму — мы уточним детали и вернёмся с ценой и сроками.
                </p>
                <div className='mt-5'>
                  <LeadForm variant='inline' title='Заявка' subtitle='Телефон или Telegram/WhatsApp — как удобно.' />
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className='section pt-0'>
        <div className='container'>
          <div className='glass-card p-7 md:p-10'>
            <div className='flex items-end justify-between gap-6 flex-wrap'>
              <div>
                <h2 className='text-2xl md:text-3xl font-black tracking-tight'>Почему REFLA</h2>
                <p className='mt-2 text-base-content/70 max-w-xl'>
                  Сочетаем «красиво» и «надёжно»: детали решают, когда зеркало становится частью интерьера.
                </p>
              </div>
              <Link href='/pricing' className='btn btn-ghost rounded-full'>
                Открыть прайс
              </Link>
            </div>

            <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {features.map((f) => (
                <div key={f.title} className='rounded-3xl border border-base-content/10 bg-base-100/50 p-6'>
                  <div className='flex items-center gap-3'>
                    <div className='h-10 w-10 rounded-2xl bg-primary/15 flex items-center justify-center text-lg'>
                      {f.icon}
                    </div>
                    <div className='font-bold'>{f.title}</div>
                  </div>
                  <p className='mt-3 text-sm text-base-content/70'>{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className='section'>
        <div className='container'>
          <div className='grid gap-8 lg:grid-cols-2 lg:items-center'>
            <div>
              <h2 className='text-2xl md:text-3xl font-black tracking-tight'>Как это происходит</h2>
              <p className='mt-2 text-base-content/70 max-w-xl'>
                Прозрачный процесс: вы понимаете стоимость, сроки и результат до начала работ.
              </p>

              <div className='mt-6 space-y-3'>
                {steps.map((s, i) => (
                  <div key={s.title} className='glass-card p-5 flex gap-4 items-start'>
                    <div className='badge badge-primary badge-lg rounded-2xl px-4'>{i + 1}</div>
                    <div>
                      <div className='font-bold'>{s.title}</div>
                      <div className='text-sm text-base-content/70 mt-1'>{s.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id='gallery' className='glass-card p-6 md:p-8'>
              <div className='flex items-end justify-between gap-4 flex-wrap'>
                <div>
                  <h3 className='text-xl md:text-2xl font-black tracking-tight'>Примеры работ</h3>
                  <p className='mt-2 text-sm text-base-content/70'>Нажмите на фото, чтобы увеличить.</p>
                </div>
                <div className='badge badge-outline'>до / после</div>
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
              <p className='mt-2 text-base-content/70'>Реальные впечатления клиентов (текстовые).</p>
            </div>
            <div className='badge badge-primary badge-outline'>обновляем регулярно</div>
          </div>

          <div className='mt-6 flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory'>
            {reviews.map((r) => (
              <div
                key={r.name}
                className='glass-card p-6 min-w-[320px] max-w-[420px] snap-start'
              >
                <div className='flex items-start justify-between gap-3'>
                  <div className='font-bold'>{r.name}</div>
                  <div className='rating rating-sm'>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <input
                        key={i}
                        type='radio'
                        name={'rating-' + r.name}
                        className='mask mask-star-2 bg-orange-400'
                        checked={i + 1 === r.rating}
                        readOnly
                      />
                    ))}
                  </div>
                </div>
                <p className='mt-3 text-sm text-base-content/70'>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id='faq' className='section'>
        <div className='container'>
          <div className='grid gap-8 lg:grid-cols-2 lg:items-start'>
            <div>
              <h2 className='text-2xl md:text-3xl font-black tracking-tight'>FAQ</h2>
              <p className='mt-2 text-base-content/70 max-w-xl'>Коротко отвечаем на популярные вопросы.</p>

              <div className='mt-6 space-y-3'>
                {faqs.map((f, i) => (
                  <div key={i} className='collapse collapse-plus glass-card'>
                    <input type='radio' name='faq' defaultChecked={i === 0} />
                    <div className='collapse-title text-base font-semibold'>{f.q}</div>
                    <div className='collapse-content text-sm text-base-content/70'>
                      <p>{f.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='glass-card p-6 md:p-8'>
              <h3 className='text-xl md:text-2xl font-black tracking-tight'>Готовы?</h3>
              <p className='mt-2 text-sm text-base-content/70'>
                Оставьте заявку — рассчитаем стоимость и предложим оптимальные варианты под вашу дверь.
              </p>
              <div className='mt-6'>
                <LeadForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
