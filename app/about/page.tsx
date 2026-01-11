import Link from 'next/link'

export const metadata = {
  title: 'О компании — REFLA',
}

export default function AboutPage() {
  return (
    <section className='section'>
      <div className='container'>
        <div className='grid gap-10 lg:grid-cols-2 lg:items-start'>
          <div>
            <h1 className='text-3xl md:text-4xl font-black tracking-tight'>О REFLA</h1>
            <p className='mt-4 text-base-content/70'>
              Мы специализируемся на установке зеркал на входные двери: от подбора решения до аккуратного монтажа. Ценим
              точность, безопасность и чистоту работ — чтобы результат выглядел как часть интерьера, а не «дополнение».
            </p>

            <div className='mt-7 grid gap-4 sm:grid-cols-2'>
              {[
                ['Фокус на качестве', 'Аккуратные подрезы, ровная кромка, внимательность к деталям.'],
                ['Понятная смета', 'Заранее обсуждаем стоимость и сроки — без сюрпризов.'],
                ['Безопасный монтаж', 'Надёжные крепления и учёт особенностей вашей двери.'],
                ['Сервис', 'Помогаем выбрать вариант под стиль прихожей и бюджет.'],
              ].map(([t, d]) => (
                <div key={t} className='glass-card p-6'>
                  <div className='font-bold'>{t}</div>
                  <div className='mt-2 text-sm text-base-content/70'>{d}</div>
                </div>
              ))}
            </div>

            <div className='mt-8 flex gap-3 flex-wrap'>
              <Link href='/pricing' className='btn btn-primary rounded-full'>
                Посмотреть цены
              </Link>
              <Link href='/request' className='btn btn-ghost rounded-full'>
                Оставить заявку
              </Link>
            </div>
          </div>

          <div className='glass-card p-7 md:p-10'>
            <h2 className='text-xl md:text-2xl font-black tracking-tight'>Принципы работы</h2>
            <div className='mt-6 space-y-3'>
              {[
                ['Сначала — замер', 'Чтобы зеркало идеально «встало» и ничего не мешало открыванию.'],
                ['Дальше — подготовка', 'Размер, кромка, вырезы. Всё согласуем заранее.'],
                ['И только потом монтаж', 'Чисто, аккуратно, с проверкой результата.'],
              ].map(([t, d], i) => (
                <div key={i} className='flex gap-4 items-start'>
                  <div className='badge badge-outline badge-lg rounded-2xl px-4'>{i + 1}</div>
                  <div>
                    <div className='font-semibold'>{t}</div>
                    <div className='text-sm text-base-content/70 mt-1'>{d}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-8 alert'>
              <span className='text-sm'>
                Хотите консультацию? Перейдите в{' '}
                <Link href='/contacts' className='link'>
                  контакты
                </Link>{' '}
                или оставьте заявку.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
