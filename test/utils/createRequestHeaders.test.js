import createRequestHeaders from '../../src/utils/createRequestHeaders';

describe(`create header object`, () => {
  it(`should be able to pass in a sync getAccessToken function`, async () => {
    const getAccessToken = () => 'token';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer token`,
    };

    await expect(createRequestHeaders(getAccessToken)).resolves.toEqual(headers);
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

    await expect(createRequestHeaders(getAccessToken)).resolves.toEqual(headers);
  });
});
