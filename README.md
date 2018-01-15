# blockchain-wallet-ui
Blockchain wallet UI

## Task implemented on Angular 5

### Available next npm scripts:
 
```bash
npm start # Dev mode
npm run build # Build
npm run build:prod # Build for production
npm run build:gh-pages # Build for gh-pages
npm run test # Test tasks
npm run lint # Lint job 
npm run e2e # E2E test
```

## For using with API need to build App with another API endpoint:

In `src/app/services/common-http-service.ts file` need change API URL to your own:
```bash
5  const apiBaseUrl = 'http://192.168.1.206:8081/api';
``` 

## Branch with Blockchain Wallet API:

```html
https://github.com/sheremet/blockchain-wallet-api
```

## Branch with Blockchain Node:

```html
https://github.com/sheremet/blockchain-node```
