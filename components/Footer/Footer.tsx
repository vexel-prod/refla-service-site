// components/Footer.tsx
import Link from 'next/link'
import styles from './Footer.module.css'

// Простой подвал сайта с копирайтом и быстрыми ссылками
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.text}>
          <b className={styles.brandText}>REFLA</b> – установка зеркал на входные двери, все права
          защищены © {year} г. Created by «vexel»
        </p>
        <nav className={styles.nav} aria-label='Быстрые ссылки'>
          <Link href='/privacy/'>Политика конфиденциальности</Link>
        </nav>
      </div>
    </footer>
  )
}
