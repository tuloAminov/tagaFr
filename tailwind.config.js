/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#08090d',
          card: '#111218',
          cardHover: '#161822',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(255, 255, 255, 0.2)',
          muted: '#8b8e9b',
        },
        main: {
          accent: '#a855f7',
          secondary: '#38bdf8',
          glow1: '#6366f1',
          glow2: '#a855f7',
        },
        resume: {
          accent: '#10b981', // emerald-500
          secondary: '#14b8a6', // teal-500
          glow1: '#059669',
          glow2: '#0d9488',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}


