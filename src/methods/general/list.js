import createHeaders from '../../utils/createHeaders';

const list = async (config, domainName, params = {}) => {
  const { getAccessToken, baseUrl } = config;
  const headers = await createHeaders({ getAccessToken });
  const url = `${baseUrl}/${domainName}.list`;

  const { filter, page, sort } = params;

  const options = {
    headers,
    body: JSON.stringify({ filter, page, sort }),
    method: 'POST',
  };

  return fetch(url, options).then(r => r.json());
};

export default list;
