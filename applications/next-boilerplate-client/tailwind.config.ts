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
        },
      },
    },
  },
  plugins: [],
}

export default config
