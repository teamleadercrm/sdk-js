import createDomainWithActions from '../utils/createDomainWithActions';

const activityTypes = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'activityTypes',
    actions: ['list', ...(configuration.customActions || [])],
  });

export default activityTypes;
