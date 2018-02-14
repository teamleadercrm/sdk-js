import invoices from '../../src/domains/invoices';

describe(`check if domain contains correct methods`, () => {
  it(`should contain the correct given methods`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
    };

    const methods = ['list', 'info', 'draft', 'update', 'copy', 'book', 'delete', 'registerPayment'];

    const obj = await invoices(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });
});