import domains from './config/domains';
import createDomainWithActions from './utils/createDomainWithActions';

const API = globalConfiguration => {
  const { customActions = {} } = globalConfiguration;
  if (Object.keys(customActions).length > 0) {
    console.warn(
      '@teamleader/api: customActions will be deprecated in the next minor version, use additionalActions instead.',
    );
  }

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

const deprecatedCreateDomainWithActions = configuration => {
  console.warn(
    '@teamleader/api: createDomainWithActions will be deprecated in the next minor version, use additionalActions instead.',
  );
  return createDomainWithActions(configuration);
};

export { deprecatedCreateDomainWithActions as createDomainWithActions };

export { default as camelCase } from './plugins/camelCase';
export { default as normalize } from './plugins/normalize';
export { default as snakeCase } from './plugins/snakeCase';

export default API;
