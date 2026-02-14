import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        solar: {
          50: '#fffadd',
          100: '#fff4c2',
          200: '#ffe685',
          300: '#ffd047',
          400: '#ffb31e',
          500: '#ff9500', // Primary Brand Color
          600: '#ed7600',
          700: '#c55500',
          800: '#9d4008',
          900: '#81360d',
          950: '#4a1b02',
        },
        energy: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e', // Success Green
          600: '#16a34a',
        },
        sky: {
          500: '#0ea5e9', // Info Blue
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-short': 'bounce 0.5s infinite',
      }
    },
  },
  plugins: [],
}
export default config
