import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'REFLA – КОНТАКТЫ',
  description: 'REFLA — установка зеркал на входные двери. Красиво, безопасно, быстро.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🪞</text></svg>",
      },
    ],
  },
}
// Страница "Контакты": телефоны, мессенджеры и ссылка на карту
export default function Contacts() {
  return (
    <div className='home home__grid'>
      <div className='card contacts about__section about__section--soft'>
        <h1 className='page-title'>Контакты</h1>
        <h2 className='page-sub'>
          Связаться с нами можно по указанным ниже контактным данным, отвечаем в течение получаса!
        </h2>
      </div>
      <section className='card contacts about__section'>
        {/* Заголовок */}
        <section className='contacts__head'>
          {/* Чипы-график работы */}
          <div className='contacts__chips'>
            <span className='chip'>Заявки: 10:00–21:00</span>
            <span className='chip'>Монтаж: 12:00–19:00</span>
            <span className='chip'>Пн–Пт</span>
          </div>
        </section>

        {/* Сетка карточек каналов связи */}
        <div className='contacts__grid'>
          {/* Телефон */}
          <a className='card contacts__item' href='tel:+79111545534'>
            <div className='contacts__icon' aria-hidden>
              {/* Иконка телефона */}
              <svg viewBox='0 0 24 24' width='22' height='22' fill='none'>
                <path
                  d='M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2a1.5 1.5 0 011.5-.37c1.63.48 3.39.75 5.1.75.55 0 1 .45 1 1V21a1 1 0 01-1 1C10.85 22 2 13.15 2 2a1 1 0 011-1h3.42c.55 0 1 .45 1 1 0 1.71.27 3.47.75 5.1.1.5-.06 1.03-.41 1.38L6.6 10.8z'
                  fill='#1f7a8c'
                />
              </svg>
            </div>
            <div className='contacts__body'>
              <div className='page-text'>+7 (995) 624-55-34</div>
            </div>
            <span className='chip'>Позвонить</span>
          </a>

          {/* WhatsApp */}
          {/* <a
					className='card contacts__item'
					href='https://wa.me/79111545534'
					target='_blank'
					rel='noopener noreferrer'
				>
					<div className='contacts__icon' aria-hidden>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='22'
							height='22'
							viewBox='0 0 24 24'
							fill='none'
						>
							<path
								fill='#25D366'
								d='M20.52 3.48A11.92 11.92 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.19 1.6 6.01L0 24l6.15-1.61a12 12 0 0 0 5.85 1.49h.01c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52z'
							/>
							<path
								fill='#fff'
								d='M17.38 14.4c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.73.94-.9 1.13-.17.19-.33.21-.62.06-.29-.15-1.21-.45-2.31-1.45-.85-.76-1.42-1.7-1.59-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.33.43-.5.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.51.07-.77.36-.26.29-1.01.98-1.01 2.39s1.03 2.77 1.17 2.96c.15.19 2.03 3.1 4.91 4.35.69.3 1.23.48 1.65.61.69.22 1.31.19 1.8.12.55-.08 1.7-.69 1.94-1.35.24-.66.24-1.23.17-1.35-.07-.12-.26-.19-.55-.34z'
							/>
						</svg>
					</div>
					<div className='contacts__body'>
						<div className='contacts__label'>WhatsApp</div>
						<div className='contacts__value'>@ +7 (995) 624-55-34</div>
					</div>
					<span className='chip'>Открыть чат</span>
				</a> */}

          {/* Telegram */}
          <a
            className='card contacts__item'
            href='https://t.me/refla_mirror'
            target='_blank'
            rel='noopener noreferrer'
          >
            <div className='contacts__icon' aria-hidden>
              {/* SVG Telegram */}
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='22'
                height='22'
                viewBox='0 0 24 24'
                fill='none'
              >
                <circle cx='12' cy='12' r='12' fill='#0088cc' />
                <path
                  d='M19.285 6.709l-2.37 11.184c-.18.82-.663 1.02-1.34.634l-3.706-2.73-1.788 1.723c-.198.195-.364.364-.746.364l.268-3.79 6.902-6.227c.3-.264-.065-.412-.465-.148l-8.53 5.37-3.673-1.15c-.797-.249-.814-.797.167-1.18l14.327-5.53c.66-.24 1.24.16 1.03 1.158z'
                  fill='#fff'
                />
              </svg>
            </div>
            <div className='contacts__body'>
              <div className='page-text'>@refla_mirror</div>
            </div>
            <span className='chip'>Написать</span>
          </a>

          {/* Почта (опционально — оставил, можно скрыть) */}
          <a className='card contacts__item' href='mailto:refla-mirror@mail.ru'>
            <div className='contacts__icon' aria-hidden>
              {/* Иконка письма */}
              <svg viewBox='0 0 24 24' width='22' height='22' fill='none'>
                <path d='M2 6a2 2 0 012-2h16a2 2 0 012 2v.4l-10 6.25L2 6.4V6z' fill='#1f7a8c' />
                <path
                  d='M22 8.1l-9.45 5.9a2 2 0 01-2.1 0L1 8.1V18a2 2 0 002 2h16a2 2 0 002-2V8.1z'
                  fill='#145362'
                />
              </svg>
            </div>
            <div className='contacts__body'>
              <div className='page-text'>refla-mirror@mail.ru</div>
            </div>
            <span className='chip'>Написать письмо</span>
          </a>
        </div>

        {/* Регион обслуживания + кнопка карты */}
        <div className='contacts__footer card'>
          <div className='contacts__region'>
            Работаем по всему Санкт-Петербургу и Ленинградской области
          </div>
          <a
            className='button button--outline'
            href='https://yandex.ru/maps/?text=Санкт-Петербург'
            target='_blank'
            rel='noreferrer'
          >
            Открыть карту
          </a>
        </div>
      </section>
    </div>
  )
}
