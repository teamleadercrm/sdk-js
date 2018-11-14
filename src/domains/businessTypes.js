import createDomainWithActions from '../utils/createDomainWithActions';

const businessTypes = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'businessTypes',
    actions: ['list', ...(configuration.customActions || [])],
  });

export default businessTypes;
