import createFetchParameters from './createFetchParameters';
import call from './call';

const createDomain = ({ config, domain, actions = [], custom = {} } = {}) => {
  const handler = (action, params, localPlugins) => {
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
      [action]: async (params, plugins = {}) => {
        const { url, options, plugins: { response: responsePlugins = [] } } = await handler(action, params, plugins);
        return call(url, options, responsePlugins);
      },
    }),
    {},
  );

  return { ...methods, ...custom };
};

export default createDomain;
