import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
    //Import CSS
    css: ['@flexmonster/js/flexmonster.css'],
    ssr: true,
    compatibilityDate: '2026-03-26',
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
