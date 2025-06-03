/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          background: '#0F172A',
          card: '#1E293B',
          foreground: '#F8FAFC',
          'muted': '#64748B',
          'muted-foreground': '#94A3B8',
          primary: '#6A0DAD',
          secondary: '#FFD700',
          accent: '#FF6B6B',
          border: '#334155',
        },
        'celestial-gold': '#FFD700',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-cinzel)'],
      },
      animation: {
        'cosmic-spin': 'spin 3s linear infinite',
        'celestial-pulse': 'celestial-pulse 2s ease-in-out infinite',
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(to bottom, #0F172A, #1E1B4B, #0F172A)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}