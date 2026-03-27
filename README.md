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
Custom elements are enabled in vite.config.js

Structure:
| Path | Description |
|------|-------------|
| `/dev` | Vue testing grounds using library from dist |
| `/dev-nuxt` | Nuxt testing grounds, using actually published library |
| `/src` | Library code |
| `/dist` | Build output folder |

__TODO:__<br>
- [x] Test components usage
- [x] Test API usage
- [x] Test SSR 
- [x] Add real `@flexmonster/flexmonster` npm package

__PUBLISHING:__<br>
Build from root (`npm run build`), then `npm publish` (don't forget to update the package version)
