import createDomainWithActions from '../utils/createDomainWithActions';

const milestones = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'milestones',
    actions: ['list', 'info', 'create', 'update', ...(configuration.customActions || [])],
  });

export default milestones;
