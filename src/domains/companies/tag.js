import createHeaders from '../../utils/createHeaders';

const tag = async (config, domainName, params = {}) => {
  const { getAccessToken, baseUrl } = config;
  const headers = await createHeaders({ getAccessToken });
  const url = `${baseUrl}/${domainName}.tag`;

  const { id, tags } = params;

  const options = {
    headers,
    body: JSON.stringify({ id, company_id }),
    method: 'POST',
  };

  return fetch(url, options).then(r => r.json());
};

export default tag;
