import createDomain from '../utils/createDomain';

const dealSources = config =>
  createDomain({
    config,
    domain: 'dealSources',
    actions: ['list', ...(config.customActions || [])],
  });

export default dealSources;
