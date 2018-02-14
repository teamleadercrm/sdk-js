import events from '../../src/domains/events';

describe(`check if domain contains correct methods`, () => {
  it(`should contain the correct given methods`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
    };

    const methods = ['list', 'info', 'create'];

    const obj = await events(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });
});
