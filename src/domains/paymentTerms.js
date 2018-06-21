import createDomain from '../utils/createDomain';

const paymentTerms = config =>
  createDomain({
    config,
    domain: 'paymentTerms',
    actions: ['list', ...(config.customActions || [])],
  });

export default paymentTerms;
