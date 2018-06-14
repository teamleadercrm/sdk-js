import quotations from '../../src/domains/quotations';

describe(`check if domain contains correct methods`, () => {
  it(`should contain the correct given methods`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
    };

    const methods = ['info'];

    const obj = await quotations(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });

  it(`should contain add the extra custom method`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
      customMethods: ['deleted'],
    };

    const methods = ['info', 'deleted'];

    const obj = await quotations(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });
});
