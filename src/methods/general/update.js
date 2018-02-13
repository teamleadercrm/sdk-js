import createHeaders from '../../utils/createHeaders';

const update = async (config, domainName, entity = {}) => {
  const { getAccessToken, baseUrl } = config;
  const headers = await createHeaders({ getAccessToken });
  const url = `${baseUrl}/${domainName}.update`;

  const options = {
    headers,
    body: JSON.stringify(entity),
    method: 'POST',
  };

  return fetch(url, options).then(r => r.json());
};

export default update;
