import createRequestHeaders from './createRequestHeaders';
import applyPlugins from './applyPlugins';

export default async ({ configuration, parameters } = {}) => {
  const { getAccessToken, plugins: { request: requestPlugins = [] } = {}, version, customHeaders = {} } = configuration;

  return {
    headers: await createRequestHeaders({ getAccessToken, version, customHeaders }),
    body: JSON.stringify(applyPlugins(parameters, requestPlugins)),
    method: 'POST',
  };
};
