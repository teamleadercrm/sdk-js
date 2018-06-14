import contacts from './domains/contacts';

import events from './domains/events';
import activityTypes from './domains/activityTypes';

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
  const { baseUrl = 'https://api.teamleader.eu', plugins, customMethods = {} } = config;

  const domainConfig = { getAccessToken, baseUrl, plugins };

  return {
    contacts: contacts({ ...domainConfig, customMethods: customMethods.contacts }),

    events: events({ ...domainConfig, customMethods: customMethods.events }),
    activityTypes: activityTypes({ ...domainConfig, customMethods: customMethods.activityTypes }),

    invoices: invoices({ ...domainConfig, customMethods: customMethods.invoices }),
    creditNotes: creditNotes({ ...domainConfig, customMethods: customMethods.creditNotes }),
    taxRates: taxRates({ ...domainConfig, customMethods: customMethods.taxRates }),

    companies: companies({ ...domainConfig, customMethods: customMethods.companies }),
    businessTypes: businessTypes({ ...domainConfig, customMethods: customMethods.businessTypes }),
    quotations: quotations({ ...domainConfig, customMethods: customMethods.quotations }),
    tags: tags({ ...domainConfig, customMethods: customMethods.tags }),
    dealPhases: dealPhases({ ...domainConfig, customMethods: customMethods.dealPhases }),

    projects: projects({ ...domainConfig, customMethods: customMethods.projects }),
    milestones: milestones({ ...domainConfig, customMethods: customMethods.milestones }),

    departments: departments({ ...domainConfig, customMethods: customMethods.departments }),
    users: users({ ...domainConfig, customMethods: customMethods.users }),
  };
};

export { default as createDomain } from './utils/createDomain';

export { default as camelCase } from './plugins/camelCase';
export { default as normalize } from './plugins/normalize';

export default API;
