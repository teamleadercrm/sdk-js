import createRequestHeaders from './createRequestHeaders';
import flow from './flow';

export default async ({ configuration, parameters = {} } = {}) => {
  const { getAccessToken, plugins: { request: requestPlugins = [] } = {}, fetchAll } = configuration;

  if (fetchAll === true) {
    parameters = { ...parameters, page: { ...(parameters.page || {}), size: 100 } };
  }

  return {
    headers: await createRequestHeaders(getAccessToken),
    body: JSON.stringify(flow(parameters, requestPlugins)),
    method: 'POST',
  };
};
