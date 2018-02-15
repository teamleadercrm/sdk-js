import createFetchParameters from './createFetchParameters';
import call from './call';

const createDomain = ({ config, domain, actions = [], custom = {} } = {}) => {
  const handler = (action, params) => createFetchParameters(config, domain, action, params);

  const methods = actions.reduce(
    (obj, action) => ({
      ...obj,
      [action]: async params => {
        const { url, options } = await handler(action, params);
        return call(url, options);
      },
    }),
    {},
  );

  return { ...methods, ...custom };
};

export default createDomain;
