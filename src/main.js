import contacts from './domains/contacts';

import invoices from './domains/invoices';
import creditNotes from './domains/creditNotes';
import taxRates from './domains/taxRates';

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

  const domainConfig = { getAccessToken, baseUrl };

  return {
    contacts: contacts(domainConfig),

    invoices: invoices(domainConfig),
    creditNotes: creditNotes(domainConfig),
    taxRates: taxRates(domainConfig),
  };
};

export default API;
