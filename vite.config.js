import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ mode }) => ({
  plugins: [vue({
    template: {
      compilerOptions: {
        // Treat fm-* as native custom elements
        isCustomElement: (tag) => tag.startsWith('fm-'),
      },
    },
  })],
  root: mode === 'lib' ? '.' : 'dev',
  build:
    mode === 'lib'
      ? {
          lib: {
            entry: resolve(__dirname, 'src/index.js'),
            name: 'Flexmonster',
            fileName: 'flexmonster',
          },
          rollupOptions: {
            external: ['vue', '@flexmonster/flexmonster'],
            output: {
              exports: 'named',
              globals: { vue: 'Vue' },
            },
          },
        }
      : {
          outDir: resolve(__dirname, 'dist-dev'),
        },
}))
