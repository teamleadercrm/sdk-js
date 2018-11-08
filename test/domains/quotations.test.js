import quotations from '../../src/domains/quotations';

describe(`check if domain contains correct methods`, () => {
  it(`should contain the correct given methods`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
    };

    const methods = ['info', 'download'];

    const obj = await quotations(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });

  it(`should contain add the extra custom method`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
      customActions: ['deleted'],
    };

    const methods = ['info', 'download', 'deleted'];

    const obj = await quotations(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });
});
