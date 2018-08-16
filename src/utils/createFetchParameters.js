import createHeaders from '../utils/createHeaders';
import flow from './flow';

const createFetchParameters = async (config, domainName, action, params = {}) => {
  const { getAccessToken, baseUrl } = config;
  const { request: requestPlugins = [] } = config.plugins || {};

  const headers = await createHeaders({ getAccessToken });
  const url = `${baseUrl}/${domainName}.${action}`;

  const options = {
    headers,
    body: JSON.stringify(flow(params, requestPlugins)),
    method: 'POST',
  };

  return {
    url,
    options,
    plugins: config.plugins || {},
  };
};

export default createFetchParameters;
