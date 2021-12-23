import domains from './config/domains';
import createDomainWithActions from './utils/createDomainWithActions';

const mergeDomains = (originalActions, additionalActions) =>
  Object.keys(additionalActions).reduce((mergedDomains, domainKey) => {
    const mergedActions = [...(originalActions[domainKey] || []), ...(additionalActions[domainKey] || [])];
    return { ...mergedDomains, [domainKey]: mergedActions };
  }, originalActions);

const API = (globalConfiguration) => {
  const { additionalActions = {} } = globalConfiguration;
  const mergedDomains = mergeDomains(domains, additionalActions);

  return Object.keys(mergedDomains).reduce(
    (apiObject, domainName) => ({
      ...apiObject,
      [domainName]: createDomainWithActions({
        configuration: globalConfiguration,
        domainName,
        actions: mergedDomains[domainName],
      }),
    }),
    {},
  );
};

export { default as camelCase } from './plugins/camelCase';
export { default as normalize } from './plugins/normalize';
export { default as snakeCase } from './plugins/snakeCase';

export default API;
