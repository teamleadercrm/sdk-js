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
    };

    expect(configuration).toEqual(expectedConfiguration);
  });

  it(`should provide the correct defaults`, async () => {
    const configuration = mergeConfigurations({
      globalConfiguration: { ...globalConfiguration, baseUrl: undefined },
    });

    expect(configuration.baseUrl).toEqual('https://api.teamleader.eu');
  });
});
