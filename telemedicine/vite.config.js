import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  exclude: [
    'chunk-DW6KUSWX.js?v=e8e0681c',
    'chunk-EPIOFM6Q.js?v=e8e0681c',
    'chunk-ZS5KWNBC.js?v=e8e0681c',
    'chunk-EJAM2MCX.js?v=e8e0681c',
    'chunk-N6MFL52G.js?v=e8e0681c'
  ]
})
