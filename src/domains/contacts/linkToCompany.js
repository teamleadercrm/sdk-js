import createHeaders from '../../utils/createHeaders';

const linkToCompany = async (config, domainName, params = {}) => {
  const { getAccessToken, baseUrl } = config;
  const headers = await createHeaders({ getAccessToken });
  const url = `${baseUrl}/${domainName}.linkToCompany`;

  const { id, company_id, position, decision_maker } = params;

  const options = {
    headers,
    body: JSON.stringify({ id, company_id, position, decision_maker }),
    method: 'POST',
  };

  return fetch(url, options).then(r => r.json());
};

export default linkToCompany;
