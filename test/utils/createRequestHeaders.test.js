import createRequestHeaders from '../../src/utils/createRequestHeaders';

describe(`create header object`, () => {
  it(`should be able to pass in a sync getAccessToken function`, async () => {
    const getAccessToken = () => 'token';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer token`,
    };

    await expect(createRequestHeaders({ getAccessToken })).resolves.toEqual(headers);
  });

  it(`should be able to pass in a version`, async () => {
    const getAccessToken = () => 'token';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer token`,
      'X-Api-Version': '2018-09-12',
    };

    await expect(createRequestHeaders({ getAccessToken, version: '2018-09-12' })).resolves.toEqual(headers);
  });

  it(`should be able to pass in a async getAccessToken function`, async () => {
    const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

    const getAccessToken = async () => {
      await timeout(200);
      return 'token';
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer token`,
    };

    await expect(createRequestHeaders({ getAccessToken })).resolves.toEqual(headers);
  });

  it(`should only keep content type when no options are provided`, async () => {
    const headers = {
      'Content-Type': 'application/json',
    };

    await expect(createRequestHeaders()).resolves.toEqual(headers);
  });
});
