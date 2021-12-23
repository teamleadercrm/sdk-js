import mergeConfigurations from '../../src/utils/mergeConfigurations';
import snakeCase from '../../src/plugins/snakeCase';
import camelCase from '../../src/plugins/camelCase';

describe(`merge configurations`, () => {
  const getAccessToken = () => {};

  const globalConfiguration = {
    baseUrl: 'https://test.teamleader.eu',
    getAccessToken,
    accessToken: 'test',
    wrong_property: 'okokokoko',
    plugins: {
      response: [camelCase],
    },
    version: '2018-09-20',
    fetchOptions: {
      headers: {
        'x-tl-feature-flags': 'core.elastified-companies',
      },
    },
  };

  const localConfiguration = {
    plugins: {
      request: [snakeCase],
    },
    fetchOptions: {
      headers: {
        'x-some-other-header': 'test',
      },
    },
  };

  it(`should merge the configurations in a correct way`, () => {
    const configuration = mergeConfigurations({ globalConfiguration, localConfiguration });

    const expectedConfiguration = {
      baseUrl: 'https://test.teamleader.eu',
      getAccessToken,
      plugins: {
        request: [snakeCase],
        response: [camelCase],
      },
      version: '2018-09-20',
      fetchOptions: {
        headers: {
          'x-tl-feature-flags': 'core.elastified-companies',
          'x-some-other-header': 'test',
        },
      },
    };

    expect(configuration).toEqual(expectedConfiguration);
  });

  it(`should ignore properties when they are not there`, async () => {
    const customGlobalConfiguration = {
      baseUrl: 'https://test.teamleader.eu',
      plugins: {
        response: [camelCase],
      },
    };

    const configuration = mergeConfigurations({ globalConfiguration: customGlobalConfiguration, localConfiguration });

    const expectedConfiguration = {
      baseUrl: 'https://test.teamleader.eu',
      plugins: {
        request: [snakeCase],
        response: [camelCase],
      },
      fetchOptions: {
        headers: {
          'x-some-other-header': 'test',
        },
      },
    };

    expect(configuration).toEqual(expectedConfiguration);
  });

  it(`should create function out of provided accessToken`, async () => {
    const customGlobalConfiguration = {
      baseUrl: 'https://test.teamleader.eu',
      accessToken: 'accessToken',
      plugins: {
        response: [camelCase],
      },
    };

    const configuration = mergeConfigurations({ globalConfiguration: customGlobalConfiguration, localConfiguration });
    expect(configuration.getAccessToken()).toEqual(customGlobalConfiguration.accessToken);
  });

  it(`should use the correct defaults when optionals are not provided`, () => {
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
      fetchOptions: {
        headers: {
          'x-tl-feature-flags': 'core.elastified-companies',
          'x-some-other-header': 'test',
        },
      },
    };

    expect(configuration).toEqual(expectedConfiguration);
  });

  it(`should prefer the local version over the global version `, () => {
    const configuration = mergeConfigurations({
      globalConfiguration,
      localConfiguration: { ...localConfiguration, version: '2018-11-20', fetchAll: true },
    });

    const expectedConfiguration = {
      baseUrl: 'https://test.teamleader.eu',
      getAccessToken,
      plugins: {
        request: [snakeCase],
        response: [camelCase],
      },
      fetchAll: true,
      version: '2018-11-20',
      fetchOptions: {
        headers: {
          'x-tl-feature-flags': 'core.elastified-companies',
          'x-some-other-header': 'test',
        },
      },
    };

    expect(configuration).toEqual(expectedConfiguration);
  });

  it(`should ignore invalid keys`, () => {
    const configuration = mergeConfigurations({
      globalConfiguration: { ...globalConfiguration, fetchAll: true },
      localConfiguration: { ...localConfiguration, blabla: 'checkitout' },
    });

    const expectedConfiguration = {
      baseUrl: 'https://test.teamleader.eu',
      getAccessToken,
      plugins: {
        request: [snakeCase],
        response: [camelCase],
      },
      version: '2018-09-20',
      fetchOptions: {
        headers: {
          'x-tl-feature-flags': 'core.elastified-companies',
          'x-some-other-header': 'test',
        },
      },
    };

    expect(configuration).toEqual(expectedConfiguration);
  });

  it(`should provide the correct defaults`, () => {
    const configuration = mergeConfigurations({
      globalConfiguration: { ...globalConfiguration, baseUrl: undefined },
    });

    expect(configuration.baseUrl).toEqual('https://api.teamleader.eu');
  });
});
