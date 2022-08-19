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
  getAccessToken: () => 'thisisatoken',
});

const init = async () => {
  const me = await users.me();
  console.log(me);
};
```

This module is also available as UMD build (in the example below via unpkg).

```html
<script src="https://unpkg.com/@teamleader/api"></script>
```

## Configuration

All configuration is optional.

`getAccessToken` **or** `accessToken` (when both are provided `getAccessToken` has priority)

- `getAccessToken`: (function) an (a)sync function that returns a valid access token, triggered on each API call

```js
import API from '@teamleader/api';

const { users } = API({
  getAccessToken: () => 'thisisatoken',
});
```

- `accessToken`: (string) an access token

```js
import API from '@teamleader/api';

const { users } = API({
  accessToken: 'thisisatoken',
});
```

- `baseUrl`: (string) url the sdk should use to call the API (default is set to `https://api.teamleader.eu`)
- `version`: (string) specific version of the API in YYYY-MM-DD format (see the [Teamleader documentation](https://developer.teamleader.eu/#/introduction/changes-&-upgrades/upgrading-your-api-version))

`version` can also be provided at local level, in that case it will override the global setting.

```js
import API from '@teamleader/api';

const { users } = API({
  getAccessToken: () => 'thisisatoken',
  version: '2018-10-30',
});

const init = async () => {
  // (options, plugins)
  const me = await users.me(undefined, { version: '2018-09-12' }); // version 2018-09-12 is used
};
```

- `fetchOptions`: (object) options for the fetch configuration that will be merged with the internal options.

`fetchOptions` can also be provided at local level, in that case it will override the global configuration.

```js
import API from '@teamleader/api';

const { users } = API({
  getAccessToken: () => 'thisisatoken',
  fetchOptions: {
    headers: {
      'x-tl-feature-flags': 'core.some-feature-flag=true',
    },
  },
});

const init = async () => {
  // (options, plugins)
  const me = await users.me(undefined, {
    fetchOptions: {
      headers: {
        'x-tl-feature-flags': 'core.some-other-feature-flag=true',
      },
    },
  }); // The 'x-tl-feature-flags': 'core.some-other-feature-flag=true' header is passed
};
```

## fetchAll option

In case the response of your API call contains pagination but you want to get all results, you can pass the `fetchAll` option to the request.

```js
import API from '@teamleader/api';

const { users } = API({
  getAccessToken: () => 'thisisatoken',
  version: '2018-10-30',
});

const init = async () => {
  // (options, plugins)
  const users = await users.list(undefined, { fetchAll: true });
};
```

> Note: The fetchAll option is only meant to be used for API endpoints that have paginated results and return the meta information about the pagination containing the `matches` key in their responses.

## Plugins

You can provide an extra array of plugins to manipulate your data.

- `plugins`: (Object) has 2 keys `request` / `response`, each property can contain an Array with plugins.

A plugin is a function that receives data (request params or response data) & returns manipulated data, it has the signature `data => data`.

You can provide them in 2 ways.

- `global` level: passed as an extra argument when creating the API object, used for `all domains`
- `local` level: per action, only triggered on the `provided action` (second argument for the api call)

If you provide plugins at `global level` and at `local level` they are merged into one plugins array in that order

```js
import API from '@teamleader/api';
import { camelCase, normalize, snakeCase } from '@teamleader/api'; // exported as named exports

const { users } = API({
  getAccessToken: () => 'thisisatoken', // async or sync function
  plugins: { response: [camelCase], request: [snakeCase] }, // at root level
});

// own plugin
const addMeta = (data) => ({ ...data, meta: { size: data.length } });

const init = async () => {
  // (options, plugins)
  const me = await users.me(undefined, { plugins: { response: [normalize, addMeta] } }); // at action level
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

Normalize data structure using the domain name of the requested data for easy access and linking. It will do the same for any entities which have been included via sideloading.

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
  users: {
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
