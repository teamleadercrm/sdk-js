import createFetchParameters from '../../src/utils/createFetchParameters';

describe(`create fetch parameters`, () => {
  const getAccessToken = () => 'token';

  const config = {
    getAccessToken,
    baseUrl: 'https://api.teamleader.eu',
  };

  const domain = 'contacts';
  const action = 'list';

  const params = {
    id: '48684984984',
  };

  it(`should return the correct url`, async () => {
    const obj = await createFetchParameters(config, domain, action);
    expect(obj.url).toEqual(`https://api.teamleader.eu/${domain}.${action}`);
  });

  it(`should return the correct Authorization header`, async () => {
    const obj = await createFetchParameters(config, domain, action);
    expect(obj.options.headers.Authorization).toEqual(`Bearer ${getAccessToken()}`);
  });

  it(`should return the correct body data`, async () => {
    const obj = await createFetchParameters(config, domain, action, params);
    expect(obj.options.body).toEqual(JSON.stringify(params));
  });

  it(`should return the correct method`, async () => {
    const obj = await createFetchParameters(config, domain, action, params);
    expect(obj.options.method).toEqual('POST');
  });
});
