import request from './request';
import mergeConfigurations from './mergeConfigurations';

const createDomainWithActions = ({ configuration: globalConfiguration, domainName, actions = [] } = {}) =>
  actions.reduce(
    (domainObject, actionName) => ({
      ...domainObject,
      [actionName]: async (parameters, localConfiguration = {}) => {
        const configuration = mergeConfigurations({ globalConfiguration, localConfiguration });

        return request({ domainName, actionName, parameters, configuration });
      },
    }),
    {},
  );

export default createDomainWithActions;
