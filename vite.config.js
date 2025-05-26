// filepath: /Users/renzorobles/Desktop/montecarlo-pi-react/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/montecarlo-pi-react/', // <-- add this line
})