import partial from 'ramda/src/partial';

import createFetchParameters from './createFetchParameters';
import call from './call';

const createDomain = ({ config, domain, actions = [], custom = {} } = {}) => {
  const handler = partial(createFetchParameters, [config, domain]);

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
