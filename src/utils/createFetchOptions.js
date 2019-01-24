import createRequestHeaders from './createRequestHeaders';
import applyPlugins from './applyPlugins';

export default async ({ configuration, parameters } = {}) => {
  const { getAccessToken, plugins: { request: requestPlugins = [] } = {}, version } = configuration;

  return {
    headers: await createRequestHeaders({ getAccessToken, version }),
    body: JSON.stringify(applyPlugins(parameters, requestPlugins)),
    method: 'POST',
  };
};
