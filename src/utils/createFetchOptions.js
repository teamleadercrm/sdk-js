import createRequestHeaders from './createRequestHeaders';
import applyPlugins from './applyPlugins';

export default async ({ configuration, parameters } = {}) => {
  const { getAccessToken, plugins: { request: requestPlugins = [] } = {}, version, fetchOptions = {} } = configuration;

  const { headers = {}, ...rest } = fetchOptions;

  return {
    headers: await createRequestHeaders({ getAccessToken, version, additionalHeaders: headers }),
    body: JSON.stringify(applyPlugins(parameters, requestPlugins)),
    method: 'POST',
    ...rest,
  };
};
