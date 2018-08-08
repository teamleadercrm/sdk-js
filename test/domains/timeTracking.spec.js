import timeTracking from '../../src/domains/timeTracking';

describe(`check if domain contains correct methods`, () => {
  it(`should contain the correct given methods`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
    };

    const methods = ['list', 'info', 'add', 'update', 'resume', 'delete'];

    const obj = await timeTracking(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });

  it(`should contain add the extra custom method`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
      customActions: ['deleted'],
    };

    const methods = ['list', 'info', 'add', 'update', 'resume', 'delete', 'deleted'];

    const obj = await timeTracking(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });
});
