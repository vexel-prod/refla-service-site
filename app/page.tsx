// app/page.tsx
'use client'

import * as React from 'react'
import styles from './page.module.css'
import CallToActionSection from 'components/CallToActionSection/CallToActionSection'
import TypingText from 'components/TypingText/TypingText'
import TiltCard from 'components/TiltCard/TiltCard'

// Карточки преимуществ
const features: Array<[string, string]> = [
  ['Эстетика', 'Точные подрезы, аккуратное крепление, ровные зазоры.'],
  ['Безопасность', 'Закалённое стекло и надёжные крепёжные решения.'],
  ['Чистый монтаж', 'Минимум пыли и шума, бережём вашу отделку.'],
  ['Сроки', 'Большинство работ — за 1 день.'],
  ['Гарантия', 'Даём гарантию на монтаж и материалы.'],
  ['Честная смета', 'Прозрачные цены без скрытых платежей.'],
]

// Отзывы (текстовые)
const reviews: Array<{ name: string; text: string }> = [
  {
    name: 'Алексей, Санкт-Петербург',
    text: 'Сделали аккуратно и за один день. Прихожая стала визуально больше — отлично!',
  },
  {
    name: 'Екатерина, Санкт-Петербург',
    text: 'Помогли выбрать кромку и оттенок, всё смотрится дорого и минималистично.',
  },
  {
    name: 'Ирина, Санкт-Петербург',
    text: 'Очень чистый монтаж, без суеты и пыли. Приятно удивили вниманием к деталям.',
  },
  {
    name: 'Дмитрий, Колпино',
    text: 'Работа выполнена качественно, но ожидал, что установка займёт меньше времени. В целом доволен результатом.',
  },
  {
    name: 'Марина, Гатчина',
    text: 'Зеркало установили аккуратно, ребята вежливые. Цена выше, чем думала, но качество оправдало ожидания.',
  },
  {
    name: 'Сергей, Санкт-Петербург',
    text: 'Хорошая работа, всё ровно и прочно. Правда, пришлось немного подождать мастера дольше назначенного времени.',
  },
  {
    name: 'Анна, Санкт-Петербург',
    text: 'Зеркало классное, прихожая теперь светлее. Немного смутило, что мусор за собой убрали не до конца.',
  },
  {
    name: 'Игорь, Всеволожск',
    text: 'Мастера приехали вовремя, сделали за два часа. Видно, что знают своё дело. Буду советовать знакомым.',
  },
  {
    name: 'Светлана, Санкт-Петербург',
    text: 'Очень понравилось, как смотрится зеркало, но процесс согласования занял больше времени, чем ожидала.',
  },
  {
    name: 'Олег, Петергоф',
    text: 'Думал, будет дороже. Цена оказалась адекватной, а результат отличный.',
  },
  {
    name: 'Виктория, Санкт-Петербург',
    text: 'Замерщик всё подробно объяснил. Монтажники приехали без опозданий. Всё чётко и спокойно.',
  },
  {
    name: 'Тимур, Красное Село',
    text: 'В целом всё понравилось. Зеркало сидит ровно, только небольшая царапина на коробке после установки.',
  },
  {
    name: 'Людмила, Санкт-Петербург',
    text: 'Очень аккуратная работа! Прихожая стала как из журнала. Хотелось бы, чтобы предложили больше вариантов кромки.',
  },
  {
    name: 'Михаил, Санкт-Петербург',
    text: 'Монтаж прошёл хорошо, но сам процесс занял почти три часа. Зато результат радует.',
  },
  {
    name: 'Юлия, Пушкин',
    text: 'Сервис понравился. Всё вежливо и спокойно. Немного дороговато, но качество того стоит.',
  },
  {
    name: 'Константин, Санкт-Петербург',
    text: 'Сделали в срок, зеркало отличное. Единственное — упаковку пришлось выносить самому.',
  },
  {
    name: 'Валерия, Санкт-Петербург',
    text: 'Очень приятные мастера. Всё сделали быстро и красиво. Спасибо!',
  },
  {
    name: 'Николай, Всеволожск',
    text: 'В целом доволен, но ожидал чуть больше предложений по дизайну.',
  },
  {
    name: 'Оксана, Санкт-Петербург',
    text: 'Хорошее качество установки. В прихожей стало просторнее и светлее.',
  },
  {
    name: 'Андрей, Колпино',
    text: 'Всё сделали качественно. Правда, цена чуть выше, чем у конкурентов, но и доверия больше.',
  },
  {
    name: 'Дарья, Санкт-Петербург',
    text: 'Зеркало идеально вписалось в интерьер. Мастера молодцы, но пришлось немного подождать согласования.',
  },
  {
    name: 'Павел, Санкт-Петербург',
    text: 'Отличная работа, но хотелось бы чуть быстрее по срокам. В остальном всё хорошо.',
  },
]

function pickRandom<T>(arr: T[], count: number): T[] {
  const copy = [...arr]
  const result: T[] = []

  for (let i = 0; i < count && copy.length > 0; i++) {
    const index = Math.floor(Math.random() * copy.length)
    result.push(copy.splice(index, 1)[0])
  }

  return result
}

// FAQ
const faqs: Array<{ q: string; a: string }> = [
  {
    q: 'Сколько стоит зеркало?',
    a: 'От 4 890 ₽/м² — точная стоимость зависит от размеров, кромки и монтажа. Вы можете рассчитать примерную стоимость в калькуляторе на странице «Прайс».',
  },
  {
    q: 'Можно ли установить зеркало на металлическую дверь?',
    a: 'Да. Подбираем крепёж и клей с учётом материала полотна, веса зеркала и условий эксплуатации.',
  },
  {
    q: 'Сколько времени займет монтаж?',
    a: 'Обычно – 2-3 часа. В сложных случаях (фацет, дополнительные работы) – занимает до 7-8 часов под ключ.',
  },
  {
    q: 'Даете ли вы гарантию?',
    a: 'Да, 12 месяцев на монтаж и материалы. Также даём рекомендации по уходу.',
  },
]

// Главная страница с плотным контентом без примеров работ
export default function Home() {
  // какие FAQ сейчас открыты (по индексу)
  const [openFaqs, setOpenFaqs] = React.useState<Set<number>>(new Set())

  // детерминированный старт для SSR, чтобы не было расхождения
  const [randomReviews, setRandomReviews] = React.useState(
    () => reviews.slice(0, 6), // первые 6 — одинаково на сервере и клиенте
  )

  React.useEffect(() => {
    // после гидратации один раз подменяем на реально случайные 6 отзывов
    setRandomReviews(pickRandom(reviews, 6))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleToggleFaq = (index: number) => (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const isOpen = (e.currentTarget as HTMLDetailsElement).open

    setOpenFaqs((prev) => {
      const next = new Set(prev)
      if (isOpen) next.add(index)
      else next.delete(index)
      return next
    })
  }

  return (
    <main>
      {/* HERO */}
      <section className='topSection'>
        <h1 className='page-title'>Зеркала на входные двери под ключ</h1>
        <TypingText
          className='page-text'
          text={
            'Преобразим Вашу прихожую: визуально расширим пространство, подберём наилучшее зеркало, аккуратно установим'
          }
        />
      </section>

      {/* Почему с нами удобно */}
      <section>
        <div className='sub-wrapper'>
          <h2 className='page-sub'>Почему с нами удобно:</h2>
        </div>
        <div className={styles.whyWrapper}>
          {features.map(([title, text], i) => (
            <TiltCard key={i} as='article'>
              <p className={styles.whyTitle}>{title}</p>
              <p className={styles.whySubtitle}>{text}</p>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* FAQ — “живые” спойлеры на TiltCard */}
      <section>
        <div className='sub-wrapper'>
          <h2 className='page-sub'>Частые вопросы:</h2>
        </div>

        <div className={styles.faqGrid}>
          {faqs.map((f, i) => {
            const isOpen = openFaqs.has(i)

            return (
              <TiltCard
                as='details'
                key={i}
                className={`${styles.faqCard} ${styles.faqDetails}`}
                onToggle={handleToggleFaq(i)}
                freezeOnLeave={isOpen}
              >
                <summary className={styles.faqSummary}>
                  <span className={styles.faqIndex}>{String(i + 1)}</span>
                  <span className={styles.faqQuestion}>{f.q}</span>
                  <span className={styles.faqIcon} aria-hidden>
                    <span className={styles.faqIconLineV} />
                    <span className={styles.faqIconLineH} />
                  </span>
                </summary>
                <p className={styles.faqText}>{f.a}</p>
              </TiltCard>
            )
          })}
        </div>
      </section>

      {/* Отзывы — витрина с 3D-карточками */}
      <section aria-labelledby='reviews-title'>
        <div className='sub-wrapper'>
          <h2 className='page-sub'>Отзывы клиентов:</h2>
        </div>

        <div className={styles.reviewsShell}>
          {/* Левая колонка — агрегированный рейтинг */}
          <div className={`card ${styles.reviewsMeta}`}>
            <div className={styles.reviewsScoreRow}>
              <div className={styles.reviewsScoreMain}>
                <span className={styles.reviewsScoreValue}>4.8</span>
                <span className={styles.reviewsStars} aria-hidden='true'>
                  ★★★★★
                </span>
              </div>
              <div className={styles.reviewsScoreLabel}>на основе {reviews.length} отзывов</div>
            </div>

            <ul className={styles.reviewsBullets}>
              <li>Чаще всего отмечают аккуратный монтаж и чистоту после работ.</li>
              <li>Для части клиентов важнее сроки и минимальные задержки.</li>
              <li>Некоторые честно пишут про ожидания по цене и времени.</li>
            </ul>
          </div>

          {/* Правая колонка — 3D-карточки отзывов */}
          <div className={styles.reviewsGrid}>
            {randomReviews.map((r, i) => (
              <TiltCard
                key={i}
                as='figure'
                className={`${styles.reviewCard} ${i === 0 ? styles.reviewCardLarge : ''}`}
              >
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewQuoteMark} aria-hidden='true'>
                    “
                  </span>
                  <div className={styles.reviewMeta}>
                    <span className={styles.reviewName}>{r.name}</span>
                  </div>
                </div>

                <blockquote className={styles.reviewText}>«{r.text}»</blockquote>

                <figcaption className={styles.reviewFooter}>
                  <span className={styles.reviewFooterStars} aria-hidden='true'>
                    ★★★★☆
                  </span>
                  <span className={styles.reviewFooterNote}>Типовой проект · входная дверь</span>
                </figcaption>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <CallToActionSection />
    </main>
  )
}
