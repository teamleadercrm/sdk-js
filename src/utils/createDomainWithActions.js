import request from './request';

import mergeConfigurations from './mergeConfigurations';
import createFetchOptions from './createFetchOptions';
import createRequestUrl from './createRequestUrl';

const createDomainWithActions = ({ configuration: globalConfiguration, domainName, actions = [] } = {}) =>
  actions.reduce(
    (domainObject, actionName) => ({
      ...domainObject,
      [actionName]: async (parameters, localConfiguration = {}) => {
        const configuration = mergeConfigurations({ globalConfiguration, localConfiguration });

        const fetchOptions = await createFetchOptions({ configuration, parameters });
        const requestUrl = createRequestUrl({ configuration, domainName, actionName });

        return request(requestUrl, fetchOptions, configuration);
      },
    }),
    {},
  );

export default createDomainWithActions;
