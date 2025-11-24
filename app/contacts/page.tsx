import type { Metadata } from 'next'
import styles from './page.module.css'

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
    <div className={styles.root}>
      {/* Шапка страницы */}
      <section className={`card about__section about__section--soft ${styles.hero}`}>
        <h1 className='page-title'>Контакты</h1>
        <h2 className='page-sub'>
          Связаться с нами можно по указанным ниже контактным данным, отвечаем в течение получаса!
        </h2>
      </section>

      {/* Основной блок контактов */}
      <section className={`card about__section ${styles.section}`}>
        {/* Заголовок / график */}
        <header className={styles.head}>
          <div className={styles.chips}>
            <span className='chip'>Заявки: 10:00–21:00</span>
            <span className='chip'>Монтаж: 12:00–19:00</span>
            <span className='chip'>Пн–Пт</span>
          </div>
        </header>

        {/* Сетка карточек каналов связи */}
        <div className={styles.grid}>
          {/* Телефон */}
          <a className={`card ${styles.item}`} href='tel:+79956245534'>
            <div className={styles.icon} aria-hidden>
              <svg viewBox='0 0 24 24' width='22' height='22' fill='none'>
                <path
                  d='M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2a1.5 1.5 0 011.5-.37c1.63.48 3.39.75 5.1.75.55 0 1 .45 1 1V21a1 1 0 01-1 1C10.85 22 2 13.15 2 2a1 1 0 011-1h3.42c.55 0 1 .45 1 1 0 1.71.27 3.47.75 5.1.1.5-.06 1.03-.41 1.38L6.6 10.8z'
                  fill='#1f7a8c'
                />
              </svg>
            </div>
            <div className={styles.body}>
              <div className='page-text'>+7 (995) 624-55-34</div>
            </div>
            <span className='chip'>Позвонить</span>
          </a>

          {/* Telegram */}
          <a
            className={`card ${styles.item}`}
            href='https://t.me/refla_mirror'
            target='_blank'
            rel='noopener noreferrer'
          >
            <div className={styles.icon} aria-hidden>
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
            <div className={styles.body}>
              <div className='page-text'>@refla_mirror</div>
            </div>
            <span className='chip'>Написать</span>
          </a>

          {/* Почта */}
          <a className={`card ${styles.item}`} href='mailto:refla-mirror@mail.ru'>
            <div className={styles.icon} aria-hidden>
              <svg viewBox='0 0 24 24' width='22' height='22' fill='none'>
                <path d='M2 6a2 2 0 012-2h16a2 2 0 012 2v.4l-10 6.25L2 6.4V6z' fill='#1f7a8c' />
                <path
                  d='M22 8.1l-9.45 5.9a2 2 0 01-2.1 0L1 8.1V18a2 2 0 002 2h16a2 2 0 002-2V8.1z'
                  fill='#145362'
                />
              </svg>
            </div>
            <div className={styles.body}>
              <div className='page-text'>refla-mirror@mail.ru</div>
            </div>
            <span className='chip'>Написать письмо</span>
          </a>
        </div>

        {/* Регион обслуживания + кнопка карты */}
        <div className={`card ${styles.footer}`}>
          <div className={styles.region}>
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