import createRequestHeaders from '../createRequestHeaders';

describe(`create header object`, () => {
  it(`should be able to pass in a sync getAccessToken function`, async () => {
    const getAccessToken = () => 'token';

    const testHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer token`,
    };

    const headers = await createRequestHeaders({ getAccessToken });
    expect(headers).toEqual(testHeaders);
  });

  it(`should be able to pass in a version`, async () => {
    const getAccessToken = () => 'token';

    const testHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer token`,
      'X-Api-Version': '2018-09-12',
    };

    const headers = await createRequestHeaders({ getAccessToken, version: '2018-09-12' });
    expect(headers).toEqual(testHeaders);
  });

  it(`should be able to pass in a async getAccessToken function`, async () => {
    const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const getAccessToken = async () => {
      await timeout(200);
      return 'token';
    };

    const testHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer token`,
    };

    const headers = await createRequestHeaders({ getAccessToken });
    expect(headers).toEqual(testHeaders);
  });

  it(`should not set Auth Header if result is undefined`, async () => {
    const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const getAccessToken = async () => {
      await timeout(200);
      return undefined;
    };

    const testHeaders = {
      'Content-Type': 'application/json',
    };

    const headers = await createRequestHeaders({ getAccessToken });
    expect(headers).toEqual(testHeaders);
  });

  it(`should only keep content type when no options are provided`, async () => {
    const headers = {
      'Content-Type': 'application/json',
    };

    await expect(createRequestHeaders()).resolves.toEqual(headers);
  });
});
