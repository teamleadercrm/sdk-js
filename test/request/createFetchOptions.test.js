import createFetchOptions from '../../src/request/createFetchOptions';
import snakeCaseKeys from '../../src/plugins/snakeCase';

describe(`create fetch options`, () => {
  const getAccessToken = () => 'token';

  const configuration = {
    getAccessToken,
  };

  const plugins = { request: [snakeCaseKeys] };

  const parameters = {
    id: '48684984984',
    user_id: '848494985',
    firstName: 'john',
  };

  it(`should return the correct Authorization header`, async () => {
    const obj = await createFetchOptions({ configuration, parameters });
    expect(obj.headers.Authorization).toEqual(`Bearer ${getAccessToken()}`);
  });

  it(`should return the correct body data`, async () => {
    const obj = await createFetchOptions({ configuration, parameters });
    expect(obj.body).toEqual(JSON.stringify(parameters));
  });

  it(`should return the correct body data after running the plugin`, async () => {
    const obj = await createFetchOptions({
      configuration: {
        ...configuration,
        plugins,
      },
      parameters,
    });

    const snakeCasedParams = {
      id: '48684984984',
      user_id: '848494985',
      first_name: 'john',
    };

    expect(obj.body).toEqual(JSON.stringify(snakeCasedParams));
  });

  it(`should return the correct body data`, async () => {
    const obj = await createFetchOptions({ configuration, parameters });
    expect(obj.body).toEqual(JSON.stringify(parameters));
  });

  it(`should return the correct method`, async () => {
    const obj = await createFetchOptions({ configuration, parameters });
    expect(obj.method).toEqual('POST');
  });

  it(`should return the correct body data with the fetchAll config option`, async () => {
    const obj = await createFetchOptions({
      configuration: {
        ...configuration,
        fetchAll: true,
      },
    });

    expect(obj.body).toEqual(JSON.stringify({ page: { size: 100 } }));
  });

  it(`should return the correct body data with the fetchAll config option`, async () => {
    const obj = await createFetchOptions({
      configuration: {
        ...configuration,
        fetchAll: true,
      },
      parameters: {
        page: {
          number: 3,
        },
      },
    });

    expect(obj.body).toEqual(JSON.stringify({ page: { number: 3, size: 100 } }));
  });
});
