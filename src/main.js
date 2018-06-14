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
  const { baseUrl = 'https://api.teamleader.eu', plugins, customActions = {} } = config;

  const domainConfig = { getAccessToken, baseUrl, plugins };

  return {
    contacts: contacts({ ...domainConfig, customActions: customActions.contacts }),

    events: events({ ...domainConfig, customActions: customActions.events }),
    activityTypes: activityTypes({ ...domainConfig, customActions: customActions.activityTypes }),

    invoices: invoices({ ...domainConfig, customActions: customActions.invoices }),
    creditNotes: creditNotes({ ...domainConfig, customActions: customActions.creditNotes }),
    taxRates: taxRates({ ...domainConfig, customActions: customActions.taxRates }),

    companies: companies({ ...domainConfig, customActions: customActions.companies }),
    businessTypes: businessTypes({ ...domainConfig, customActions: customActions.businessTypes }),
    quotations: quotations({ ...domainConfig, customActions: customActions.quotations }),
    tags: tags({ ...domainConfig, customActions: customActions.tags }),
    dealPhases: dealPhases({ ...domainConfig, customActions: customActions.dealPhases }),

    projects: projects({ ...domainConfig, customActions: customActions.projects }),
    milestones: milestones({ ...domainConfig, customActions: customActions.milestones }),

    departments: departments({ ...domainConfig, customActions: customActions.departments }),
    users: users({ ...domainConfig, customActions: customActions.users }),
  };
};

export { default as createDomain } from './utils/createDomain';

export { default as camelCase } from './plugins/camelCase';
export { default as normalize } from './plugins/normalize';

export default API;
