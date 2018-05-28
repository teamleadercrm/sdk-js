# @teamleader/api [![npm version](https://badge.fury.io/js/%40teamleader%2Fapi.svg)](https://badge.fury.io/js/%40teamleader%2Fapi)

Teamleader API SDK for JavaScript

## Installation

NPM

```bash
npm i @teamleader/api
```

Yarn

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

All domains from [developer.teamleader.eu](https://developer.teamleader.eu/) are available

This module is also available as UMD build (in the example below via unpkg).

```html
<script src="https://unpkg.com/@teamleader/api"></script>
```

## Configuration

You should provide `getAccessToken` **or** `accessToken`.

* `getAccessToken`: (function) a (a)sync function that returns a valid access token, triggered on each API call
* `accessToken`: (string) an access token

You can optionally pass in a `baseUrl` for the API calls (default is set to `https://api.teamleader.eu`)

## Plugins

You can provide an extra array of plugins to manipulate your data.

* `plugins`: (Array) Array of functions that receive data and return data

A plugin function has the signature `data => data`;

You can provide them in 2 ways.

* `root` level: passed as an extra argument when creating the root object, used for `all routes`
* `action` level: per route, only triggered on the `provided action` (second argument for the api call)

If you provide plugins at root level and at route level they are merged in this order.

```js
import API from '@teamleader/api';
import { camelCase, normalize } from '@teamleader/api'; // exported at top level

const { users } = API({
  getAccessToken: () => 'thisisatoken', // async or sync function
  plugins: [camelCase], // at root level
});

// own plugin
const addMeta = data => ({ ...data, meta: { size: data.length } });

const init = async () => {
  const me = await users.me(undefined, [normalize, addMeta]); // (options, plugins)
  console.log(me);
};
```

* [camelCase](src/plugins/camelCase.js)
* [normalize](src/plugins/normalize.js)

are exported at top level for convenience.

[MIT](LICENSE).
