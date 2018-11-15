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

const createGetAccessToken = ({ accessToken, getAccessToken }) => {
  if (accessToken) {
    return () => accessToken;
  }

  return getAccessToken;
};

const API = globalConfiguration => {
  const getAccessToken = createGetAccessToken(globalConfiguration);
  const { baseUrl, plugins, customActions = {} } = globalConfiguration;

  const domainConfiguration = { getAccessToken, baseUrl, plugins };

  return {
    activityTypes: activityTypes({
      ...domainConfiguration,
      customActions: customActions.activityTypes,
    }),
    businessTypes: businessTypes({
      ...domainConfiguration,
      customActions: customActions.businessTypes,
    }),
    companies: companies({
      ...domainConfiguration,
      customActions: customActions.companies,
    }),
    contacts: contacts({
      ...domainConfiguration,
      customActions: customActions.contacts,
    }),
    creditNotes: creditNotes({
      ...domainConfiguration,
      customActions: customActions.creditNotes,
    }),
    customFieldDefinitions: customFieldDefinitions({
      ...domainConfiguration,
      customActions: customActions.customFieldDefinitions,
    }),
    dealPhases: dealPhases({
      ...domainConfiguration,
      customActions: customActions.dealPhases,
    }),
    deals: deals({
      ...domainConfiguration,
      customActions: customActions.deals,
    }),
    dealSources: dealSources({
      ...domainConfiguration,
      customActions: customActions.dealSources,
    }),
    departments: departments({
      ...domainConfiguration,
      customActions: customActions.departments,
    }),
    events: events({
      ...domainConfiguration,
      customActions: customActions.events,
    }),
    invoices: invoices({
      ...domainConfiguration,
      customActions: customActions.invoices,
    }),
    lostReasons: lostReasons({
      ...domainConfiguration,
      customActions: customActions.lostReasons,
    }),
    milestones: milestones({
      ...domainConfiguration,
      customActions: customActions.milestones,
    }),
    paymentTerms: paymentTerms({
      ...domainConfiguration,
      customActions: customActions.paymentTerms,
    }),
    productCategories: productCategories({
      ...domainConfiguration,
      customActions: customActions.productCategories,
    }),
    projects: projects({
      ...domainConfiguration,
      customActions: customActions.projects,
    }),
    quotations: quotations({
      ...domainConfiguration,
      customActions: customActions.quotations,
    }),
    tags: tags({
      ...domainConfiguration,
      customActions: customActions.tags,
    }),
    taxRates: taxRates({
      ...domainConfiguration,
      customActions: customActions.taxRates,
    }),
    timers: timers({
      ...domainConfiguration,
      customActions: customActions.timers,
    }),
    timeTracking: timeTracking({
      ...domainConfiguration,
      customActions: customActions.timeTracking,
    }),
    users: users({
      ...domainConfiguration,
      customActions: customActions.users,
    }),
    workTypes: workTypes({
      ...domainConfiguration,
      customActions: customActions.workTypes,
    }),
  };
};

export { default as createDomainWithActions } from './utils/createDomainWithActions';

export { default as camelCase } from './plugins/camelCase';
export { default as normalize } from './plugins/normalize';
export { default as snakeCase } from './plugins/snakeCase';

export default API;
