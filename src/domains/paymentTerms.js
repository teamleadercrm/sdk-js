import createDomainWithActions from '../utils/createDomainWithActions';

const paymentTerms = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'paymentTerms',
    actions: ['list', ...(configuration.customActions || [])],
  });

export default paymentTerms;
