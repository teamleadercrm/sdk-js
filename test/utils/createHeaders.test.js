import createHeaders from '../../src/utils/createHeaders';

describe(`passing in configuration`, () => {
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

  it(`should throw an error when not passing in a getAccessToken function`, async () => {
    const error = new Error('pass in an (async) function that returns a valid accessToken');

    try {
      await createHeaders();
    } catch (e) {
      expect(e).toEqual(error);
    }
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
