import mergeConfigurations from '../../src/utils/mergeConfigurations';
import snakeCase from '../../src/plugins/snakeCase';
import camelCase from '../../src/plugins/camelCase';

describe(`merge configurations`, () => {
  const getAccessToken = () => {};

  const globalConfiguration = {
    baseUrl: 'https://test.teamleader.eu',
    getAccessToken,
    wrong_property: 'okokokoko',
    plugins: {
      response: [camelCase],
    },
    version: '2018-09-20',
  };

  const localConfiguration = {
    plugins: {
      request: [snakeCase],
    },
  };

  it(`should merge the configurations in a correct way`, async () => {
    const configuration = mergeConfigurations({ globalConfiguration, localConfiguration });

    const expectedConfiguration = {
      baseUrl: 'https://test.teamleader.eu',
      getAccessToken,
      plugins: {
        request: [snakeCase],
        response: [camelCase],
      },
      version: '2018-09-20',
    };

    expect(configuration).toEqual(expectedConfiguration);
  });

  it(`should use the correct defaults when optionals are not provided`, async () => {
    const configuration = mergeConfigurations({
      globalConfiguration: { ...globalConfiguration, version: undefined, baseUrl: undefined },
      localConfiguration,
    });

    const expectedConfiguration = {
      baseUrl: 'https://api.teamleader.eu',
      getAccessToken,
      plugins: {
        request: [snakeCase],
        response: [camelCase],
      },
    };

    expect(configuration).toEqual(expectedConfiguration);
  });

  it(`should prefer the local version over the global version `, async () => {
    const configuration = mergeConfigurations({
      globalConfiguration,
      localConfiguration: { ...localConfiguration, version: '2018-11-20' },
    });

    const expectedConfiguration = {
      baseUrl: 'https://test.teamleader.eu',
      getAccessToken,
      plugins: {
        request: [snakeCase],
        response: [camelCase],
      },
      version: '2018-11-20',
    };

    expect(configuration).toEqual(expectedConfiguration);
  });

  it(`should provide the correct defaults`, async () => {
    const configuration = mergeConfigurations({
      globalConfiguration: { ...globalConfiguration, baseUrl: undefined },
    });

    expect(configuration.baseUrl).toEqual('https://api.teamleader.eu');
  });

  it('should throw an error because an invalid global API version was provided', () => {
    expect(() => {
      mergeConfigurations({
        localConfiguration,
        globalConfiguration: { ...globalConfiguration, version: '2018-12-35' },
      });
    }).toThrowError(`'2018-12-35' is not a valid API version.`);
  });

  it('should throw an error because an invalid local API version was provided', () => {
    expect(() => {
      mergeConfigurations({
        localConfiguration: { ...localConfiguration, version: '2018-12-35' },
        globalConfiguration,
      });
    }).toThrowError(`'2018-12-35' is not a valid API version.`);
  });
});
