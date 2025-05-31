import './globals.css'
import { Inter, Cinzel } from 'next/font/google'
import { Metadata } from 'next'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Cosmic Lottery - Discover Your Astrological Fortune',
  description: 'Generate your personalized birth chart report with our cosmic lottery system. Uncover your astrological strengths, personality insights, and cosmic destiny.',
  keywords: ['astrology', 'birth chart', 'horoscope', 'lottery', 'fortune', 'zodiac', 'natal chart'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cinzel.variable} font-sans bg-cosmic-background text-cosmic-foreground`}>
        {children}
      </body>
    </html>
  )
}