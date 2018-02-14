import createHeaders from '../../src/utils/createHeaders';

describe(`create header object`, () => {
  it(`should handle passing in a contentType`, async () => {
    const config = {
      getAccessToken: () => 'token',
      contentType: 'application/xml',
    };

    const headers = {
      'Content-Type': 'application/xml',
      Authorization: `Bearer token`,
    };

    await expect(createHeaders(config)).resolves.toEqual(headers);
  });

  it(`should be able to pass in a sync getAccessToken function`, async () => {
    const getAccessToken = () => 'token';

    const config = {
      getAccessToken,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer token`,
    };

    await expect(createHeaders(config)).resolves.toEqual(headers);
  });

  it(`should be able to pass in a async getAccessToken function`, async () => {
    const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

    const getAccessToken = async () => {
      await timeout(200);
      return 'token';
    };

    const config = {
      getAccessToken,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer token`,
    };

    await expect(createHeaders(config)).resolves.toEqual(headers);
  });
});
