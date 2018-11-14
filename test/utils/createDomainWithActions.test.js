import createDomainWithActions from '../../src/utils/createDomainWithActions';

describe(`create domain objects`, () => {
  const config = {
    getAccessToken: () => 'token',
    baseUrl: 'https://api.teamleader.eu',
  };

  const actions = ['method1', 'method2'];

  it(`should create an object with the provided actions as methods`, async () => {
    const obj = await createDomainWithActions({ config, domain: 'test', actions });
    expect(Object.keys(obj).sort()).toEqual(actions.sort());
  });
});
