import contacts from './domains/contacts';
import companies from './domains/companies';
import businessTypes from './domains/businessTypes';
import quotations from './domains/quotations';
import tags from './domains/tags';
import dealPhases from './domains/dealPhases';

const createGetAccessToken = config => {
  const { accessToken, getAccessToken } = config;

  if (accessToken) {
    return () => accessToken;
  }

  return getAccessToken;
};

const API = config => {
  const getAccessToken = createGetAccessToken(config);
  const { baseUrl = 'https://api.teamleader.eu' } = config;

  const configuration = { getAccessToken, baseUrl };

  return {
    contacts: contacts(configuration),
    companies: companies(configuration),
    businessTypes: businessTypes(configuration),
    quotations: quotations(configuration),
    tags: tags(configuration),
    dealPhases: dealPhases(configuration),
  };
};

export default API;
