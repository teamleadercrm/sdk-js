import createDomainWithActions from '../utils/createDomainWithActions';

const timeTracking = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'timeTracking',
    actions: ['list', 'info', 'add', 'update', 'resume', 'delete', ...(configuration.customActions || [])],
  });

export default timeTracking;
