
<img src="https://cryptounicorn.live/safari-pinned-tab.svg" width="100" height="100" />

**CryptoUnicorn** is a cryptocurrency live tracker, calculator & live code bet web app.

Bet on code contracts + keep all live prices from your favourite exchanges on the same page and create indicators based on the prices.


Check it out live on **https://cryptounicorn.live**

The structure of this project is the following:

- **api: contains api nodejs files**
- build: contains app compilation files
- **client: contains app source code files**
- dist: contains last app release (compiled client source files)
- static: contains all of the app static files: favicons, app manifest & icons

### App

Uses VuePack: Vue + Vuex + Webkit + Babel and serves the page using node-static. It has a size of ~4MB.

**Development:**

```shell
yarn dev (or) npm run dev
```

**Build:**

```
yarn buildapp (or) npm run buildapp
```

Outputs to a new folder /dist

Once, /dist is generated, *node-static* can serve the app:

```
yarn start (or) npm start
```

### Api

Uses Express + Babel

**Build:**

```
yarn buildapi (or) npm run buildapi
```

**Start:**

```
yarn start (or) npm start
```

License:  **Apache License 2.0**
