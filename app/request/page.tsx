import LeadForm from 'components/LeadForm/LeadForm'
import styles from './page.module.css'

export default function RequestPage() {
  return (
    <main>
      <section className='topSection'>
        <h1 className='page-title'>Заявка без калькуляции</h1>
      </section>
      <section>
        <LeadForm />
      </section>
    </main>
  )
}
