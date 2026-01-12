import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import { Manrope, Nunito_Sans, Play } from 'next/font/google'
import 'app/globals.css'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'

const play = Play({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  variable: '--font-play',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
})

const nunito = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-nunito',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: 'REFLA — зеркала на входные двери',
  description: 'REFLA — установка зеркал на входные двери. Аккуратно, безопасно, быстро.',
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🪞</text></svg>",
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ru' suppressHydrationWarning>
      <body className={[play.variable, manrope.variable, nunito.variable, 'font-sans site-bg noise'].join(' ')}>
        <Header />
        <main className='mt-5'>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
