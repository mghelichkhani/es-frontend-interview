import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          700: 'rgb(var(--color-brand-700))',
          600: 'rgb(var(--color-brand-600))',
          50: 'rgb(var(--color-brand-50))',
        },
        fg: 'rgb(var(--color-fg))',
        muted: 'rgb(var(--color-muted))',
        border: 'rgb(var(--color-border))',
        'border-light': 'rgb(var(--color-border-light))',
        surface: 'rgb(var(--color-bg))',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
