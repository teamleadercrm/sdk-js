import domains from './config/domains';
import createDomainWithActions from './utils/createDomainWithActions';

const mergeDomains = (originalActions, additionalActions) =>
  Object.keys(additionalActions).reduce((mergedDomains, domainKey) => {
    const mergedActions = [...(originalActions[domainKey] || []), ...(additionalActions[domainKey] || [])];
    return { ...mergedDomains, [domainKey]: mergedActions };
  }, originalActions);

const API = globalConfiguration => {
  const { customActions = {}, additionalActions = {} } = globalConfiguration;
  const mergedDomains = mergeDomains(domains, additionalActions);

  if (Object.keys(customActions).length > 0) {
    console.warn(
      '@teamleader/api: `customActions` will be deprecated in a next version, use `additionalActions` instead.',
    );
  }

  return Object.keys(mergedDomains).reduce(
    (apiObject, domainName) => ({
      ...apiObject,
      [domainName]: createDomainWithActions({
        configuration: globalConfiguration,
        domainName,
        actions: [...mergedDomains[domainName], ...(customActions[domainName] || [])],
      }),
    }),
    {},
  );
};

const deprecatedCreateDomainWithActions = configuration => {
  console.warn(
    '@teamleader/api: `createDomainWithActions` will be deprecated in a next version, use `additionalActions` instead.',
  );
  return createDomainWithActions(configuration);
};

export { deprecatedCreateDomainWithActions as createDomainWithActions };

export { default as camelCase } from './plugins/camelCase';
export { default as normalize } from './plugins/normalize';
export { default as snakeCase } from './plugins/snakeCase';

export default API;
