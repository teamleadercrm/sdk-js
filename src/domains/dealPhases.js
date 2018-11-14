import createDomainWithActions from '../utils/createDomainWithActions';

const dealPhases = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'dealPhases',
    actions: ['list', ...(configuration.customActions || [])],
  });

export default dealPhases;
