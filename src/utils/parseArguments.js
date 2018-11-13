import createHeaders from './createHeaders';
import flow from './flow';

const parseArguments = async ({ config = {}, domain, options = {}, action, params = {} } = {}) => {
  const { getAccessToken, baseUrl } = config;

  const { request: localRequestPlugins = [], response: localResponsePlugins = [] } = options.plugins || {};
  const { request: globalRequestPlugins = [], response: globalResponsePlugins = [] } = config.plugins || {};

  const parsedOptions = {
    ...options,
    plugins: {
      request: [...globalRequestPlugins, ...localRequestPlugins],
      response: [...globalResponsePlugins, ...localResponsePlugins],
    },
  };

  return {
    url: `${baseUrl}/${domain}.${action}`,
    fetchOptions: {
      headers: await createHeaders({ getAccessToken }),
      body: JSON.stringify(flow(params, parsedOptions.plugins.request)),
      method: 'POST',
    },
    options: parsedOptions,
  };
};

export default parseArguments;
