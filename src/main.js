import mergeConfigurations from './utils/mergeConfigurations';
import request from './utils/request';

const API = (globalConfiguration) => {
  return new Proxy(
    {},
    {
      get(target, domainName) {
        return new Proxy(
          {},
          {
            get(target, actionName) {
              return async (parameters, localConfiguration = {}) => {
                const configuration = mergeConfigurations({ globalConfiguration, localConfiguration });
                return request({ domainName, actionName, parameters, configuration });
              };
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
