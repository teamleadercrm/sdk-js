import parseArguments from './parseArguments';
import call from './call';

const createDomain = ({ config, domain, actions = [], custom = {} } = {}) => {
  const methods = actions.reduce(
    (obj, action) => ({
      ...obj,
      [action]: async (params, options = {}) => {
        const { url, fetchOptions, options: parsedOptions } = await parseArguments({
          config,
          domain,
          action,

          params,
          options,
        });

        return call(url, fetchOptions, parsedOptions);
      },
    }),
    {},
  );

  return { ...methods, ...custom };
};

export default createDomain;
