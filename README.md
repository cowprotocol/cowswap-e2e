# CowSwap e2e

End to end tests and monitoring of CowSwap

## Setup

```sh
yarn
npx playwright install
```

## Run tests
```sh
yarn test
```

Alternative:
```sh
yarn test -- --headed
yarn test -- --browser=firefox
yarn test -- --browser=all
```

Run a specific test
```sh
 yarn test -- tests/uniswap.spec.ts
``` 