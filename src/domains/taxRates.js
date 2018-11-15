import createDomainWithActions from '../utils/createDomainWithActions';

const taxRates = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'taxRates',
    actions: ['list', ...(configuration.customActions || [])],
  });

export default taxRates;
