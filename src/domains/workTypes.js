import createDomainWithActions from '../utils/createDomainWithActions';

const workTypes = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'workTypes',
    actions: ['list', ...(configuration.customActions || [])],
  });

export default workTypes;
