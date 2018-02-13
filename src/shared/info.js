import createHeaders from '../utils/createHeaders';

const info = async (config, domainName, id) => {
  const { getAccessToken, baseUrl } = config;
  const headers = await createHeaders({ getAccessToken });
  const url = `${baseUrl}/${domainName}.info`;

  const options = {
    headers,
    body: JSON.stringify({ id }),
    method: 'POST',
  };

  return fetch(url, options).then(r => r.json());
};

export default info;
