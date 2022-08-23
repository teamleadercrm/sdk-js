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
