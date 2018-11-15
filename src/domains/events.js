import createDomainWithActions from '../utils/createDomainWithActions';

const events = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'events',
    actions: ['list', 'info', 'create', 'update', 'cancel', ...(configuration.customActions || [])],
  });

export default events;
