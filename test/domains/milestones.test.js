import milestones from '../../src/domains/milestones';

describe(`check if domain contains correct methods`, () => {
  it(`should contain the correct given methods`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
    };

    const methods = ['list', 'info', 'create', 'update'];

    const obj = await milestones(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });
});
