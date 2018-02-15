import projects from '../../src/domains/projects';

describe(`check if domain contains correct methods`, () => {
  it(`should contain the correct given methods`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
    };

    const methods = ['list', 'info', 'create', 'update', 'delete', 'addParticipant', 'updateParticipant'];

    const obj = await projects(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });
});
