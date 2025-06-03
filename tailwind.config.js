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
        'astrology': {
          'sun': '#FFA500',
          'moon': '#C0C0C0',
          'mercury': '#87CEEB',
          'venus': '#FFC0CB',
          'mars': '#FF6B6B',
          'jupiter': '#4169E1',
          'saturn': '#DAA520',
          'uranus': '#40E0D0',
          'neptune': '#4682B4',
          'pluto': '#8B4513',
        }
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
      },      typography: (theme) => ({
        cosmic: {
          css: {
            '--tw-prose-body': theme('colors.cosmic.foreground'),
            '--tw-prose-headings': theme('colors.cosmic.secondary'),
            '--tw-prose-lead': theme('colors.cosmic.foreground'),
            '--tw-prose-links': theme('colors.cosmic.secondary'),
            '--tw-prose-bold': theme('colors.cosmic.foreground'),
            '--tw-prose-counters': theme('colors.cosmic.muted'),
            '--tw-prose-bullets': theme('colors.cosmic.muted'),
            '--tw-prose-hr': theme('colors.cosmic.border'),
            '--tw-prose-quotes': theme('colors.cosmic.foreground'),
            '--tw-prose-quote-borders': theme('colors.cosmic.primary'),
            '--tw-prose-captions': theme('colors.cosmic.muted'),
            '--tw-prose-code': theme('colors.cosmic.foreground'),
            '--tw-prose-pre-code': theme('colors.cosmic.foreground'),
            '--tw-prose-pre-bg': theme('colors.cosmic.card'),
            '--tw-prose-th-borders': theme('colors.cosmic.border'),
            '--tw-prose-td-borders': theme('colors.cosmic.border'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}