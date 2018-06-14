import createDomain from '../utils/createDomain';

const dealPhases = config =>
  createDomain({
    config,
    domain: 'dealPhases',
    actions: ['list', ...(config.customActions || [])],
  });

export default dealPhases;
