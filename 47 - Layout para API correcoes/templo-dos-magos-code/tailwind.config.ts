import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#1A103F',
        primary: '#2D1B69',
        accent: {
          yellow: '#FFB800',
          cyan: '#06B6D4',
          purple: '#9333EA',
          pink: '#EC4899',
          orange: '#F97316'
        }
      },
      container: {
        center: true,
        padding: '1rem'
      }
    },
  },
  plugins: [],
}

export default config 