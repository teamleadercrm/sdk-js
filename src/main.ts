import { Configuration, GlobalConfiguration, LocalConfiguration, Plugins, Plugin } from './types';
import mergeConfigurations from './utils/mergeConfigurations';
import request from './utils/request';

import camelCase from './plugins/camelCase';
import normalize from './plugins/normalize';
import snakeCase from './plugins/snakeCase';

type ActionEndpoint = <T = any>(
  parameters?: Record<string, any> | null,
  localConfiguration?: LocalConfiguration,
) => Promise<T>;

const API = (globalConfiguration: GlobalConfiguration) => {
  const cachedActionEndpoints: Record<string, Record<string, ActionEndpoint>> = {};

  return new Proxy<Record<string, Record<string, ActionEndpoint>>>(
    {},
    {
      get(_target, domainNameKey) {
        return new Proxy(
          {},
          {
            get(_target, actionNameKey) {
              const domainName = String(domainNameKey);
              const actionName = String(actionNameKey);

              if (typeof cachedActionEndpoints[domainName] === 'undefined') {
                cachedActionEndpoints[domainName] = {};
              }

              if (typeof cachedActionEndpoints[domainName][actionName] !== 'undefined') {
                return cachedActionEndpoints[domainName][actionName];
              }

              const actionEndpoint: ActionEndpoint = async (parameters = {}, localConfiguration = {}) => {
                const configuration = mergeConfigurations({ globalConfiguration, localConfiguration });
                return request({
                  domainName,
                  actionName,
                  parameters,
                  configuration,
                });
              };

              cachedActionEndpoints[domainName][actionName] = actionEndpoint;
              return actionEndpoint;
            },
          },
        );
      },
    },
  );
};

export {
  camelCase,
  snakeCase,
  normalize,
  Configuration,
  GlobalConfiguration,
  LocalConfiguration,
  ActionEndpoint,
  Plugins,
  Plugin,
};

export default API;
