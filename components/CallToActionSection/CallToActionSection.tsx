import TiltCard from 'components/TiltCard/TiltCard'
import ButtonCTA from 'components/ButtonCTA/ButtonCTA'
import styles from './CallToActionSection.module.css'

export default function CallToActionSection() {
  return (
    <section className={styles.wrap}>
      <TiltCard as='div' className={styles.ctaCard}>
        <div className={styles.textBlock}>
          <h2 className={styles.title}>Готовы к красивой двери?</h2>
          <p className={styles.subtitle}>
            Сориентируем по цене, подберём зеркало и ответим на вопросы. Быстро и без навязчивости.
          </p>
        </div>

        <ButtonCTA />
      </TiltCard>
    </section>
  )
}
