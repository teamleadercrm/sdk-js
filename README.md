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

## Custom actions

You can also add extra custom actions to the domains (which will be handled the same way as the available actions).

* `customActions`: (Object) domain as property -> array of actions as value

In the example below we are extending `api.contacts` with `deleted` and `api.tags` with `deleted` and `linkToInvoice`

```js
import API from '@teamleader/api';

const api = API({
  getAccessToken: () => 'thisisatoken', // async or sync function
  customActions: {
    contacts: ['deleted'],
    tags: ['deleted', 'linkToInvoice'],
  },
});
```

## Plugins

You can provide an extra array of plugins to manipulate your data.

* `plugins`: (Object) has 2 keys `request` / `response`, each key should be an Array with plugins.

A plugin is a function that receives data (request params or response data) & returns manipulated data, it has the signature `data => data`.

You can provide them in 2 ways.

* `root` level: passed as an extra argument when creating the root object, used for `all routes`
* `action` level: per route, only triggered on the `provided action` (second argument for the api call)

If you provide plugins at `root level` and at `action level` they are merged into one plugins array in that order

```js
import API from '@teamleader/api';
import { camelCase, normalize, snakeCase } from '@teamleader/api'; // exported as named exports

const { users } = API({
  getAccessToken: () => 'thisisatoken', // async or sync function
  plugins: { response: [camelCase], request: [snakeCase] }, // at root level
});

// own plugin
const addMeta = data => ({ ...data, meta: { size: data.length } });

const init = async () => {
  // (options, plugins)
  const me = await users.me(undefined, { response: [normalize, addMeta] }); // at action level
  console.log(me);
};
```

`camelCase`, `snakeCase` & `normalize` are exported as named exports for convenience.

Following the example above:

### camelCase

Recursively convert object keys to camelCase (can be used for response).

data in:

```js
{
  data: [
    {
      id: '8799873',
      user_id: '6979873',
      user_info: {
        first_name: 'Geoffrey',
      },
    },
    {
      id: '3287687',
      user_id: '298034',
      user_info: {
        first_name: 'John',
      },
    },
  ];
}
```

data out:

```js
{
  data: [
    {
      id: '8799873',
      userId: '6979873',
      userInfo: {
        firstName: 'Geoffrey',
      },
    },
    {
      id: '3287687',
      userId: '298034',
      userInfo: {
        firstName: 'John',
      },
    },
  ];
}
```

### snakeCase

Recursively convert object keys to snakeCase (can be used for request).

data in:

```js
{
  data: [
    {
      id: '8799873',
      userId: '6979873',
      userInfo: {
        firstName: 'Geoffrey',
      },
    },
    {
      id: '3287687',
      userId: '298034',
      userInfo: {
        firstName: 'John',
      },
    },
  ];
}
```

data out:

```js
{
  data: [
    {
      id: '8799873',
      user_id: '6979873',
      user_info: {
        first_name: 'Geoffrey',
      },
    },
    {
      id: '3287687',
      user_id: '298034',
      user_info: {
        first_name: 'John',
      },
    },
  ];
}
```

### normalize

Normalize data structure using byId for easy access and linking.

data in:

```js
{
  data: [
    {
      id: '8799873',
      userId: '6979873',
      userInfo: {
        firstName: 'Geoffrey',
      },
    },
    {
      id: '3287687',
      userId: '298034',
      userInfo: {
        firstName: 'John',
      },
    },
  ];
}
```

data out:

```js
{
  byId: {
    '8799873': {
      id: '8799873',
      userId: '6979873',
      userInfo: {
        firstName: 'Geoffrey',
      },
    },
    '3287687': {
      id: '3287687',
      userId: '298034',
      userInfo: {
        firstName: 'John',
      },
    }
  }
}
```

[MIT](LICENSE).
