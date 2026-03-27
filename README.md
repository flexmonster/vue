__Wrapper for Angular__

Build lib cmd: 
```
npm run build
```
Build lib will be added to a /dist folder.
Test project start cmds: 

Vue, no SSR:
```
npm start
```
OR
```
npm run dev
```
Nuxt, with SSR:
```
npm run dev:ssr
```
Tes
Custom elements are enabled in vite.config.js

__TODO:__<br>
- [x] Test components usage
- [x] Test API usage
- [] Test SSR - refactored for compatibility with SSR
- [x] Add real `@flexmonster/flexmonster` npm package
- [] Add types from .d.ts when it is ready

__PUBLISHING:__<br>
Build from root (`npm run build`), then `cd dist/flexmonster/angular` and `npm publish` (don't forget to update the package version)
