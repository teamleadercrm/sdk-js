import activityTypes from './domains/activityTypes';
import businessTypes from './domains/businessTypes';
import companies from './domains/companies';
import contacts from './domains/contacts';
import creditNotes from './domains/creditNotes';
import customFieldDefinitions from './domains/customFieldDefinitions';
import dealPhases from './domains/dealPhases';
import deals from './domains/deals';
import dealSources from './domains/dealSources';
import departments from './domains/departments';
import events from './domains/events';
import invoices from './domains/invoices';
import lostReasons from './domains/lostReasons';
import milestones from './domains/milestones';
import paymentTerms from './domains/paymentTerms';
import productCategories from './domains/productCategories';
import projects from './domains/projects';
import quotations from './domains/quotations';
import tags from './domains/tags';
import taxRates from './domains/taxRates';
import timers from './domains/timers';
import timeTracking from './domains/timeTracking';
import users from './domains/users';
import workTypes from './domains/workTypes';

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
    activityTypes: activityTypes({
      ...domainConfig,
      customActions: customActions.activityTypes,
    }),
    businessTypes: businessTypes({
      ...domainConfig,
      customActions: customActions.businessTypes,
    }),
    companies: companies({
      ...domainConfig,
      customActions: customActions.companies,
    }),
    contacts: contacts({
      ...domainConfig,
      customActions: customActions.contacts,
    }),
    creditNotes: creditNotes({
      ...domainConfig,
      customActions: customActions.creditNotes,
    }),
    customFieldDefinitions: customFieldDefinitions({
      ...domainConfig,
      customActions: customActions.customFieldDefinitions,
    }),
    dealPhases: dealPhases({
      ...domainConfig,
      customActions: customActions.dealPhases,
    }),
    deals: deals({
      ...domainConfig,
      customActions: customActions.deals,
    }),
    dealSources: dealSources({
      ...domainConfig,
      customActions: customActions.dealSources,
    }),
    departments: departments({
      ...domainConfig,
      customActions: customActions.departments,
    }),
    events: events({
      ...domainConfig,
      customActions: customActions.events,
    }),
    invoices: invoices({
      ...domainConfig,
      customActions: customActions.invoices,
    }),
    lostReasons: lostReasons({
      ...domainConfig,
      customActions: customActions.lostReasons,
    }),
    milestones: milestones({
      ...domainConfig,
      customActions: customActions.milestones,
    }),
    paymentTerms: paymentTerms({
      ...domainConfig,
      customActions: customActions.paymentTerms,
    }),
    productCategories: productCategories({
      ...domainConfig,
      customActions: customActions.productCategories,
    }),
    projects: projects({
      ...domainConfig,
      customActions: customActions.projects,
    }),
    quotations: quotations({
      ...domainConfig,
      customActions: customActions.quotations,
    }),
    tags: tags({
      ...domainConfig,
      customActions: customActions.tags,
    }),
    taxRates: taxRates({
      ...domainConfig,
      customActions: customActions.taxRates,
    }),
    timers: timers({
      ...domainConfig,
      customActions: customActions.timers,
    }),
    timeTracking: timeTracking({
      ...domainConfig,
      customActions: customActions.timeTracking,
    }),
    users: users({
      ...domainConfig,
      customActions: customActions.users,
    }),
    workTypes: workTypes({
      ...domainConfig,
      customActions: customActions.workTypes,
    }),
  };
};

export { default as createDomain } from './utils/createDomain';

export { default as camelCase } from './plugins/camelCase';
export { default as normalize } from './plugins/normalize';
export { default as snakeCase } from './plugins/snakeCase';

export default API;
