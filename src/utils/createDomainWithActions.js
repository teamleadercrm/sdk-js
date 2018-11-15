import request from './request';

import mergeConfigurations from './mergeConfigurations';
import createRequestUrl from './createRequestUrl';

const createDomainWithActions = ({ configuration: globalConfiguration, domainName, actions = [] } = {}) =>
  actions.reduce(
    (domainObject, actionName) => ({
      ...domainObject,
      [actionName]: async (parameters, localConfiguration = {}) => {
        const requestUrl = createRequestUrl({ baseUrl: globalConfiguration.baseUrl, domainName, actionName });
        const configuration = mergeConfigurations({ localConfiguration, globalConfiguration });
        return request(requestUrl, parameters, configuration);
      },
    }),
    {},
  );

export default createDomainWithActions;
