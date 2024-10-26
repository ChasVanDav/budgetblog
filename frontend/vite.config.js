import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/users': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/trips': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/budgets': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/spendings': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
    }}}});
