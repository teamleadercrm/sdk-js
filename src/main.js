import contacts from './domains/contacts/index.js';
import companies from './domains/companies/index.js';
import businessTypes from './domains/businessTypes/index.js';
import quotations from './domains/quotations/index.js';
import tags from './domains/tags/index.js';
import dealPhases from './domains/dealPhases/index.js';

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

  return {
    // CRM domains.
    contacts: contacts({ getAccessToken, baseUrl }),
    companies: companies({ getAccessToken, baseUrl }),
    businessTypes: businessTypes({ getAccessToken, baseUrl }),
    quotations: quotations({ getAccessToken, baseUrl }),
    tags: tags({ getAccessToken, baseUrl }),
    dealPhases: dealPhases({ getAccessToken, baseUrl }),
  };
};

export default API;
