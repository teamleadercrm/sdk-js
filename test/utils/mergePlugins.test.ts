import mergePlugins from '../../src/utils/mergePlugins';
import snakeCase from '../../src/plugins/snakeCase';
import camelCase from '../../src/plugins/camelCase';

describe(`merge plugins`, () => {
  const globalPlugins = {
    request: [snakeCase],
    response: [camelCase],
  };

  const localPlugins = {
    request: [camelCase],
    response: [snakeCase],
  };

  it(`should merge the plugins in a correct way`, () => {
    const plugins = mergePlugins(globalPlugins, localPlugins);

    const expectedPlugins = {
      request: [snakeCase, camelCase],
      response: [camelCase, snakeCase],
    };

    expect(plugins).toEqual(expectedPlugins);
  });
});
