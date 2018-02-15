# @teamleader/api [![npm version](https://badge.fury.io/js/%40teamleader%2Fapi.svg)](https://badge.fury.io/js/%40teamleader%2Fapi)

Teamleader API SDK for JavaScript

## Installation

via NPM

```bash
npm i @teamleader/api
```

or Yarn

```bash
yarn add @teamleader/api
```

## Usage Example

```js
import API from '@teamleader/api';

const { users } = API({
  getAccessToken: () => 'thisisatoken', // async or sync function
});

const init = async () => {
  const me = await users.me();
  console.log(me);
};
```

all domains from [developer.teamleader.eu](https://developer.teamleader.eu/) are available

## Configuration

you should provide `getAccessToken` **or** `accessToken`

* `getAccessToken`: (function) a (a)sync function that returns a valid access token, triggered on each API call
* `accessToken`: (string) an access token

you can optionally pass in a `baseUrl` for the API calls (default is set to `https://api.teamleader.eu`)

[MIT](LICENSE).
