import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '^/api/': {
        target: 'http://localhost:8443',
        secure: false
      }
    },
    port: 5173,
  }
})
