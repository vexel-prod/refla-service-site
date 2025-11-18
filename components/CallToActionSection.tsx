import Link from 'next/link'

export default function CallToActionSection() {
  return (
    <section className='call-to-action'>
      <h2 className='page-sub'>Готовы обсудить проект?</h2>
      <p className='page-text'>
        Оставьте заявку — мы предложим оптимальное решение под вашу дверь и интерьер.
      </p>
      <Link className='button button--outline' href='/request/'>
        Оставить заявку
      </Link>
    </section>
  )
}
