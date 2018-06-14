import users from '../../src/domains/users';

describe(`check if domain contains correct methods`, () => {
  it(`should contain the correct given methods`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
    };

    const methods = ['me', 'list', 'info'];

    const obj = await users(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });

  it(`should contain add the extra custom method`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
      customMethods: ['deleted'],
    };

    const methods = ['me', 'list', 'info', 'deleted'];

    const obj = await users(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });
});
