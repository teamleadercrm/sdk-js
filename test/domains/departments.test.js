import departments from '../../src/domains/departments';

describe(`check if domain contains correct methods`, () => {
  it(`should contain the correct given methods`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
    };

    const methods = ['list', 'info'];

    const obj = await departments(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });

  it(`should contain add the extra custom method`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
      customMethods: ['deleted'],
    };

    const methods = ['list', 'info', 'deleted'];

    const obj = await departments(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });
});
