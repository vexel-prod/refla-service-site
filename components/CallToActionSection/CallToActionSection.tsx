import TiltCard from 'components/TiltCard/TiltCard'
import ButtonCTA from 'components/ButtonCTA/ButtonCTA'
import styles from './CallToActionSection.module.css'

export default function CallToActionSection() {
  return (
    <section>
      <TiltCard className={styles.ctaWrapper}>
        <div>
          <h2 className='page-sub'>Готовы к установке !?</h2>
          <p className={styles.ctaText}>– подберём зеркало и ответим на вопросы.</p>
        </div>
        <ButtonCTA />
      </TiltCard>
    </section>
  )
}
