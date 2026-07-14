import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/hashnode-rss': {
        target: 'https://admincentre.hashnode.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/hashnode-rss/, '/rss.xml'),
      }
    }
  }
})