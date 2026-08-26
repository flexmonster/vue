import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig(({ mode }) => ({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Treat fm-* as native custom elements
          isCustomElement: (tag) => tag.startsWith('fm-'),
        },
      },
    }),
    ...(mode === 'lib' ? [dts({ include: ['src'], insertTypesEntry: true })] : []),
  ],
  root: mode === 'lib' ? '.' : 'dev',
  build:
    mode === 'lib'
      ? {
          lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'Flexmonster',
            fileName: 'index',
            formats: ['es', 'cjs'],
          },
          rollupOptions: {
            external: ['vue', '@flexmonster/js'],
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
