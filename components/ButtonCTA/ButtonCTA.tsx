import Link from 'next/link'

export default function ButtonCTA() {
  return (
    <Link className='button button--outline' href='/request/'>
      Оставить заявку
    </Link>
  )
}
