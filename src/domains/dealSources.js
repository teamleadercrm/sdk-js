import createDomainWithActions from '../utils/createDomainWithActions';

const dealSources = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'dealSources',
    actions: ['list', ...(configuration.customActions || [])],
  });

export default dealSources;
