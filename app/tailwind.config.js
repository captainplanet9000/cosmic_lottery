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
          primary: '#6A0DAD',
          secondary: '#FFD700',
          accent: '#FF6B6B',
          background: '#0F172A',
          foreground: '#F8FAFC',
          muted: '#64748B',
          'muted-foreground': '#94A3B8',
          card: '#1E293B',
          'card-foreground': '#F8FAFC',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-cinzel)', 'serif'],
      },
      keyframes: {
        'cosmic-spin': {
          '0%': { transform: 'rotate(0deg) scale(0.8)', opacity: 0.5 },
          '50%': { transform: 'rotate(180deg) scale(1.2)', opacity: 1 },
          '100%': { transform: 'rotate(360deg) scale(0.8)', opacity: 0.5 },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 15px 5px rgba(255, 215, 0, 0.4)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 30px 10px rgba(255, 215, 0, 0.7)',
            transform: 'scale(1.05)'
          },
        },
      },
      animation: {
        'cosmic-spin': 'cosmic-spin 8s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(to right, #0F172A, #1E1B4B, #4C1D95)',
        'golden-ticket': 'linear-gradient(135deg, #FFD700 0%, #FFC800 25%, #FFAB00 50%, #FFC800 75%, #FFD700 100%)',
      },
    },
  },
  plugins: [],
}