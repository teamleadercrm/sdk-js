import deals from '../../src/domains/deals';

describe(`check if domain contains correct methods`, () => {
  it(`should contain the correct given methods`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
    };

    const methods = ['list', 'info', 'create', 'update', 'move', 'win', 'lose', 'delete'];

    const obj = await deals(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });

  it(`should contain add the extra custom method`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
      customActions: ['deleted'],
    };

    const methods = ['list', 'info', 'create', 'update', 'move', 'win', 'lose', 'delete', 'deleted'];

    const obj = await deals(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });
});
