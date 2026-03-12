import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // 1. Aumentamos el límite del aviso a 1000kB ya que tu app es visual/musical
    chunkSizeWarningLimit: 1000,
    
    // 2. Dividimos las librerías grandes en "pedazos" separados
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})