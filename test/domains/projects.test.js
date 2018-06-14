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

  it(`should contain add the extra custom method`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
      customActions: ['deleted'],
    };

    const methods = ['list', 'info', 'create', 'update', 'delete', 'addParticipant', 'updateParticipant', 'deleted'];

    const obj = await projects(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });
});
