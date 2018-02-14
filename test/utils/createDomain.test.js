import createDomain from '../../src/utils/createDomain';

describe(`create domain objects`, () => {
  const config = {
    getAccessToken: () => 'token',
    baseUrl: 'https://api.teamleader.eu',
  };

  const actions = ['method1', 'method2'];

  const customMethod = () => 'custom';

  it(`should create an object with the provided actions as methods`, async () => {
    const obj = await createDomain({ config, domain: 'test', actions });
    expect(Object.keys(obj).sort()).toEqual(actions.sort());
  });

  it(`overrides a method with given implementation`, async () => {
    const obj = await createDomain({ config, domain: 'test', actions, custom: { customMethod } });
    expect(obj.customMethod).toEqual(customMethod);
  });

  it(`adds a provided method`, async () => {
    const obj = await createDomain({ config, domain: 'test', custom: { customMethod } });
    expect(obj.customMethod).toEqual(customMethod);
  });
});
