import LeadForm from 'components/LeadForm/LeadForm'
import styles from './page.module.css'

export default function RequestPage() {
  return (
    <section className={styles.root}>
      <div className='card about__section about__section--soft'>
        <h1 className='page-title'>Заявка без калькуляции</h1>
      </div>

      <LeadForm />
    </section>
  )
}
