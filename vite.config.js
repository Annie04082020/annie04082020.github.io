import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        zh: resolve(__dirname, 'zh/index.html'),
        zh_journal: resolve(__dirname, 'zh/journal.html'),
        en: resolve(__dirname, 'en/index.html'),
        en_journal: resolve(__dirname, 'en/journal.html'),
        jp: resolve(__dirname, 'jp/index.html'),
        jp_journal: resolve(__dirname, 'jp/journal.html'),
      }
    }
  }
})
