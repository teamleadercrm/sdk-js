import createDomain from '../utils/createDomain';

const taxRates = config =>
  createDomain({
    config,
    domain: 'taxRates',
    actions: ['list', ...(config.customActions || [])],
  });

export default taxRates;
