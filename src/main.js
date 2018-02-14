import contacts from './domains/contacts.js';

import invoices from './domains/invoices.js';
import creditNotes from './domains/creditNotes.js';
import taxRates from './domains/taxRates.js';

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

    invoices: invoices(configuration),
    creditNotes: creditNotes(configuration),
    taxRates: taxRates(configuration),
  };
};

export default API;
