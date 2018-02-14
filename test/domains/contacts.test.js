import contacts from '../../src/domains/contacts';

describe(`check if domain contains correct methods`, () => {
  it(`should contain the correct given methods`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
    };

    const methods = ['list', 'info', 'add', 'update', 'delete', 'linkToCompany', 'unlinkFromCompany'];

    const obj = await contacts(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });
});
