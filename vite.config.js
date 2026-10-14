import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Относительные пути для универсального деплоя (GitHub Pages, свой домен taga.dev или любой хостинг)
})

