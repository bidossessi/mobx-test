# mobx-test
Experimenting with Mobx.

Working soo far:
* JWT authentication to an ExpressJS api running on port 3001.
* basic Mobx integration
* basic store/backend unittesting
* generally admitted project structuration best practices

Still to do (in order):
* React UI unit testing best practices
* Mobx best practices
* Bootstrap integration (webpack CDN)
* style preprocessing (SCSS + webpack post-css)
* integrate l18n (don't yet know what is recommended)
* React-router best practices and optimization
* backend/store best practices (I just use plain [axios](https://github.com/mzabriskie/axios) for now)
* general security best practices
* bundle optimization best practices (chunking, selective imports, etc)

## To get started
The usual suspects:
```
npm install
```

### To run the HRM webpack server in development mode

start the [server](https://github.com/bidossessi/mobx-test-server) in another terminal, then
```
npm start
```

### To build the client in the `public` folder
```
npm run build
```
This will also attempt to launch a [bundle size tracker](https://github.com/th0r/webpack-bundle-analyzer) on port 8888

### To run the linter
```
npm run lint
```

### To run the test suite
```
npm run test
```

