import companies from '../../src/domains/companies';

describe(`check if domain contains correct methods`, () => {
  it(`should contain the correct given methods`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
    };

    const methods = ['list', 'info', 'add', 'update', 'delete', 'tag', 'untag'];

    const obj = await companies(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });

  it(`should contain add the extra custom method`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
      customActions: ['deleted'],
    };

    const methods = ['list', 'info', 'add', 'update', 'delete', 'tag', 'untag', 'deleted'];

    const obj = await companies(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });
});
