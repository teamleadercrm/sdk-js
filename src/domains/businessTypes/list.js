import createHeaders from '../../utils/createHeaders';

const list = async (config, domainName, country) => {
  const { getAccessToken, baseUrl } = config;
  const headers = await createHeaders({ getAccessToken });
  const url = `${baseUrl}/${domainName}.list`;

  const options = {
    headers,
    body: JSON.stringify({ country }),
    method: 'POST',
  };

  return fetch(url, options).then(r => r.json());
};

export default list;
