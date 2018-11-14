import createDomainWithActions from '../utils/createDomainWithActions';

const departments = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'departments',
    actions: ['list', 'info', ...(configuration.customActions || [])],
  });

export default departments;
