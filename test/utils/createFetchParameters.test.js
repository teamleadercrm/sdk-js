import createFetchParameters from '../../src/utils/createFetchParameters';
import snakeCaseKeys from '../../src/plugins/snakeCase';

describe(`create fetch parameters`, () => {
  const getAccessToken = () => 'token';
  const plugin = data => data;

  const config = {
    getAccessToken,
    baseUrl: 'https://api.teamleader.eu',
    plugins: { request: [plugin] },
  };

  const domain = 'contacts';
  const action = 'list';

  const params = {
    id: '48684984984',
    user_id: '848494985',
    firstName: 'john',
  };

  it(`should return the correct url`, async () => {
    const obj = await createFetchParameters(config, domain, action);
    expect(obj.url).toEqual(`https://api.teamleader.eu/${domain}.${action}`);
  });

  it(`should return the provided plugins`, async () => {
    const obj = await createFetchParameters(config, domain, action);
    expect(obj.plugins).toEqual({ request: [plugin] });
  });

  it(`should return the correct Authorization header`, async () => {
    const obj = await createFetchParameters(config, domain, action);
    expect(obj.fetchOptions.headers.Authorization).toEqual(`Bearer ${getAccessToken()}`);
  });

  it(`should return the correct body data`, async () => {
    const obj = await createFetchParameters(config, domain, action, params);
    expect(obj.fetchOptions.body).toEqual(JSON.stringify(params));
  });

  it(`should return the correct body data after running the plugin`, async () => {
    const obj = await createFetchParameters(
      { ...config, plugins: { request: [snakeCaseKeys] } },
      domain,
      action,
      params,
    );

    const snakeCasedParams = {
      id: '48684984984',
      user_id: '848494985',
      first_name: 'john',
    };

    expect(obj.fetchOptions.body).toEqual(JSON.stringify(snakeCasedParams));
  });

  it(`should return the correct body data`, async () => {
    const obj = await createFetchParameters(config, domain, action, params);
    expect(obj.fetchOptions.body).toEqual(JSON.stringify(params));
  });

  it(`should return the correct method`, async () => {
    const obj = await createFetchParameters(config, domain, action, params);
    expect(obj.fetchOptions.method).toEqual('POST');
  });
});
