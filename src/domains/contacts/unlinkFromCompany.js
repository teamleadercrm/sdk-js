import createHeaders from '../../utils/createHeaders';

const unlinkFromCompany = async (config, domainName, params = {}) => {
  const { getAccessToken, baseUrl } = config;
  const headers = await createHeaders({ getAccessToken });
  const url = `${baseUrl}/${domainName}.unlinkFromCompany`;

  const { id, company_id } = params;

  const options = {
    headers,
    body: JSON.stringify({ id, company_id }),
    method: 'POST',
  };

  return fetch(url, options).then(r => r.json());
};

export default unlinkFromCompany;
