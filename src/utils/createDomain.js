import createFetchParameters from './createFetchParameters';
import call from './call';

const createDomain = ({ config, domain, actions = [], custom = {} } = {}) => {
  const handler = (action, params = {}, options = {}) => {
    const { plugins: localPlugins = {} } = options;

    const { request: localRequestPlugins = [], response: localResponsePlugins = [] } = localPlugins;
    const { request: globalRequestPlugins = [], response: globalResponsePlugins = [] } = config.plugins || {};

    return createFetchParameters(
      {
        ...config,
        plugins: {
          request: [...globalRequestPlugins, ...localRequestPlugins],
          response: [...globalResponsePlugins, ...localResponsePlugins],
        },
      },
      domain,
      action,
      params,
    );
  };

  const methods = actions.reduce(
    (obj, action) => ({
      ...obj,
      [action]: async (params, options = {}) => {
        const { url, fetchOptions, plugins } = await handler(action, params, options);
        return call(url, fetchOptions, { ...options, plugins });
      },
    }),
    {},
  );

  return { ...methods, ...custom };
};

export default createDomain;
