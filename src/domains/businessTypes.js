import createDomain from '../utils/createDomain';

const businessTypes = config =>
  createDomain({
    config,
    domain: 'businessTypes',
    actions: ['list', ...(config.customActions || [])],
  });

export default businessTypes;
