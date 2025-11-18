import Link from 'next/link'

// Простой подвал сайта с копирайтом и быстрыми ссылками
export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className='footer__inner'>
      <p className='footer-text'>
        <b className='brand-text'>REFLA</b> – установка зеркал на входные двери, все права защищены
        © {year} г. Created by «vexel»
      </p>
      <nav className='footer__nav' aria-label='Быстрые ссылки'>
        <Link href='/privacy/'>Политика конфиденциальности</Link>
      </nav>
    </footer>
  )
}
