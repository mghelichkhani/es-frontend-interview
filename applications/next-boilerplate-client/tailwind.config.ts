import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: 'rgb(var(--brand-primary))',
          'primary-dark': 'rgb(var(--brand-primary-dark))',
          surface: 'rgb(var(--brand-surface))',
          'surface-muted': 'rgb(var(--brand-surface-muted))',
          'surface-muted-hover': 'rgb(var(--brand-surface-muted-hover))',
          'surface-pressed': 'rgb(var(--brand-surface-pressed))',
        },
        text: {
          DEFAULT: 'rgb(var(--text))',
          strong: 'rgb(var(--text-strong))',
          muted: 'rgb(var(--text-muted))',
          subtle: 'rgb(var(--text-subtle))',
        },
        border: {
          divider: 'rgb(var(--border-divider))',
          subtle: 'rgb(var(--border-subtle))',
        },
        gray: {
          50: 'rgb(var(--gray-50))',
          200: 'rgb(var(--gray-200))',
          500: 'rgb(var(--gray-500))',
          600: 'rgb(var(--gray-600))',
        },
      },
    },
  },
  plugins: [],
}

export default config
