import createHeaders from '../utils/createHeaders';
import flow from './flow';

const createFetchParameters = async (config, domainName, action, params = {}) => {
  const { getAccessToken, baseUrl } = config;
  const { request: requestPlugins = [] } = config.plugins || {};

  const headers = await createHeaders({ getAccessToken });
  const url = `${baseUrl}/${domainName}.${action}`;
  const body = JSON.stringify(flow(params, requestPlugins));
  const method = 'POST';

  const fetchOptions = {
    headers,
    body,
    method,
  };

  return {
    url,
    fetchOptions,
    plugins: config.plugins || {},
  };
};

export default createFetchParameters;
