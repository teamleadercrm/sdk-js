import createDomainWithActions from '../utils/createDomainWithActions';

const timers = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'timers',
    actions: ['current', 'start', 'stop', 'update', ...(configuration.customActions || [])],
  });

export default timers;
