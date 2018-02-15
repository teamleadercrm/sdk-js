import contacts from './domains/contacts';

import invoices from './domains/invoices';
import creditNotes from './domains/creditNotes';
import taxRates from './domains/taxRates';

import companies from './domains/companies';
import businessTypes from './domains/businessTypes';
import quotations from './domains/quotations';
import tags from './domains/tags';
import dealPhases from './domains/dealPhases';

import projects from './domains/projects';
import milestones from './domains/milestones';

import departments from './domains/departments';
import users from './domains/users';

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

    companies: companies(domainConfig),
    businessTypes: businessTypes(domainConfig),
    quotations: quotations(domainConfig),
    tags: tags(domainConfig),
    dealPhases: dealPhases(domainConfig),

    projects: projects(domainConfig),
    milestones: milestones(domainConfig),

    departments: departments(domainConfig),
    users: users(domainConfig),
  };
};

export default API;
