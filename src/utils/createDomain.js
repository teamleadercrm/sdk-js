import createFetchParameters from './createFetchParameters';
import call from './call';

const createDomain = ({ config, domain, actions = [], custom = {} } = {}) => {
  const handler = (action, params) => createFetchParameters(config, domain, action, params);
  const { plugins: globalPlugins = [] } = config;

  const methods = actions.reduce(
    (obj, action) => ({
      ...obj,
      [action]: async params => {
        const { url, options, plugins = [] } = await handler(action, params);
        return call(url, options, [...globalPlugins, ...plugins]);
      },
    }),
    {},
  );

  return { ...methods, ...custom };
};

export default createDomain;
