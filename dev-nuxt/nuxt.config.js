import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
    //Import CSS
    css: ['@flexmonster/flexmonster/flexmonster.css'],
    compatibilityDate: '2026-03-26',
    //   alias: {
    //     '@flexmonster/vue': fileURLToPath(new URL('../dist/flexmonster.js', import.meta.url)),
    //   },
    vue: {
        compilerOptions: {
            isCustomElement: (tag) => tag.startsWith('fm-'),
        },
    },
    imports: {
        transform: {
            exclude: [/\/dist\//],
        },
    },
})
