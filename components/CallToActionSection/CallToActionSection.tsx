import Link from 'next/link'
import styles from './CallToActionSection.module.css'

export default function CallToActionSection() {
  return (
    <section className={styles.callToAction} aria-labelledby='cta-title'>
      <div className={styles.textBlock}>
        <h2 id='cta-title' className={styles.pageSub}>
          Готовы обсудить установку?
        </h2>
        <p className={styles.pageText}>
          Оставьте заявку — подберём оптимальное решение под вашу дверь и интерьер.
        </p>
      </div>

      <Link className='button button--outline' href='/request/'>
        Оставить заявку
      </Link>
    </section>
  )
}
