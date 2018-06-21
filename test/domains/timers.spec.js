import timers from '../../src/domains/timers';

describe(`check if domain contains correct methods`, () => {
  it(`should contain the correct given methods`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
    };

    const methods = ['current', 'start', 'stop'];

    const obj = await timers(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });

  it(`should contain add the extra custom method`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
      customActions: ['deleted'],
    };

    const methods = ['current', 'start', 'stop', 'deleted'];

    const obj = await timers(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });
});
