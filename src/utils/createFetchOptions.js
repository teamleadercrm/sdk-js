import createRequestHeaders from './createRequestHeaders';
import flow from './flow';

export default async ({ configuration, parameters } = {}) => {
  const { getAccessToken, plugins: { request: requestPlugins = [] } = {} } = configuration;

  return {
    headers: await createRequestHeaders(getAccessToken),
    body: JSON.stringify(flow(parameters, requestPlugins)),
    method: 'POST',
  };
};
