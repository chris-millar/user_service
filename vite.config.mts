import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'

export default defineConfig({
  plugins: [
    RubyPlugin(),
  ],
  server: {
    proxy: {
      '/api': 'http://web:3000',
    },
  },
})
