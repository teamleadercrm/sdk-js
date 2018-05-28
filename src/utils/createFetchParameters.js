import createHeaders from '../utils/createHeaders';

const createFetchParameters = async (config, domainName, action, attributes = {}) => {
  const { getAccessToken, baseUrl, plugins = [] } = config;
  const headers = await createHeaders({ getAccessToken });
  const url = `${baseUrl}/${domainName}.${action}`;

  const options = {
    headers,
    body: JSON.stringify(attributes),
    method: 'POST',
  };

  return {
    url,
    options,
    plugins,
  };
};

export default createFetchParameters;
