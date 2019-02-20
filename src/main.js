import domains from './config/domains';
import createDomainWithActions from './utils/createDomainWithActions';

const API = globalConfiguration => {
  const { customActions = {} } = globalConfiguration;

  return Object.keys(domains).reduce(
    (apiObject, domainName) => ({
      ...apiObject,
      [domainName]: createDomainWithActions({
        configuration: globalConfiguration,
        domainName,
        actions: [...domains[domainName], ...(customActions[domainName] || [])],
      }),
    }),
    {},
  );
};

export { default as createDomainWithActions } from './utils/createDomainWithActions';

export { default as camelCase } from './plugins/camelCase';
export { default as normalize } from './plugins/normalize';
export { default as snakeCase } from './plugins/snakeCase';

export default API;
