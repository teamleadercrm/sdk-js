import invoices from '../../src/domains/invoices';

describe(`check if domain contains correct methods`, () => {
  it(`should contain the correct given methods`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
    };

    const methods = ['list', 'info', 'download', 'draft', 'update', 'copy', 'book', 'delete', 'registerPayment'];

    const obj = await invoices(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });

  it(`should contain add the extra custom method`, async () => {
    const config = {
      getAccessToken: () => 'token',
      baseUrl: 'https://api.teamleader.eu',
      customActions: ['deleted'],
    };

    const methods = [
      'list',
      'info',
      'download',
      'draft',
      'update',
      'copy',
      'book',
      'delete',
      'registerPayment',
      'deleted',
    ];

    const obj = await invoices(config);

    expect(Object.keys(obj).sort()).toEqual(methods.sort());
  });
});
