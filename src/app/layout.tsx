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
  title: 'Cosmic Birth Charts - Professional Astrology Reports',
  description: 'Generate your personalized natal chart report with AI-powered astrological analysis. Discover your cosmic blueprint, personality insights, and celestial destiny.',
  keywords: ['astrology', 'birth chart', 'horoscope', 'natal chart', 'zodiac', 'celestial', 'cosmic', 'planets'],
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