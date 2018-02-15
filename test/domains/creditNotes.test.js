import creditNotes from '../../src/domains/creditNotes';

describe(`check if domain contains correct methods`, () => {
  it(`should contain the correct given methods`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
    };

    const methods = ['list', 'info'];

    const obj = await creditNotes(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });
});