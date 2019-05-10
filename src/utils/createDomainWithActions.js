import request from './request';
import mergeConfigurations from './mergeConfigurations';
import createRequestUrl from './createRequestUrl';

const createDomainWithActions = ({ configuration: globalConfiguration, domainName, actions = [] } = {}) =>
  actions.reduce(
    (domainObject, actionName) => ({
      ...domainObject,
      [actionName]: async (parameters, localConfiguration = {}) => {
        const configuration = mergeConfigurations({ globalConfiguration, localConfiguration });
        const url = createRequestUrl({ configuration, domainName, actionName });

        return request({ url, parameters, configuration });
      },
    }),
    {},
  );

export default createDomainWithActions;
