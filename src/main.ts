import { GlobalConfiguration, LocalConfiguration } from './types';
import mergeConfigurations from './utils/mergeConfigurations';
import request from './utils/request';

type ActionEndpoint = <T = any>(
  parameters?: Record<string, any>,
  localConfiguration?: LocalConfiguration,
) => Promise<T>;

const API = (globalConfiguration: GlobalConfiguration) => {
  return new Proxy<Record<string, Record<string, ActionEndpoint>>>(
    {},
    {
      get(_target, domainName) {
        return new Proxy(
          {},
          {
            get(_target, actionName) {
              const actionEndpoint: ActionEndpoint = async (parameters = {}, localConfiguration = {}) => {
                const configuration = mergeConfigurations({ globalConfiguration, localConfiguration });
                return request({
                  domainName: String(domainName),
                  actionName: String(actionName),
                  parameters,
                  configuration,
                });
              };
              return actionEndpoint;
            },
          },
        );
      },
    },
  );
};

export { default as camelCase } from './plugins/camelCase';
export { default as normalize } from './plugins/normalize';
export { default as snakeCase } from './plugins/snakeCase';

export default API;
