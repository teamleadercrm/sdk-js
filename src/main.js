import contacts from './domains/contacts.js';
import companies from './domains/companies.js';
import businessTypes from './domains/businessTypes.js';
import quotations from './domains/quotations.js';
import tags from './domains/tags.js';
import dealPhases from './domains/dealPhases.js';

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
