import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import 'app/globals.css'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import './globals.css'
import { Manrope, Nunito_Sans } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
  preload: false,
})

const nunito = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-nunito',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: 'REFLA – ОТРАЖЕНИЕ В ВАШ ДОМ',
  description: 'REFLA — установка зеркал на входные двери. Красиво, безопасно, быстро.',
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
    <html lang='ru' data-theme='dark'>
      <body className={`${manrope.variable} ${nunito.variable}`}>
        <Header />
        {children}
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
