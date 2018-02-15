import activityTypes from '../../src/domains/activityTypes';

describe(`check if domain contains correct methods`, () => {
  it(`should contain the correct given methods`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
    };

    const methods = ['list'];

    const obj = await activityTypes(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });
});