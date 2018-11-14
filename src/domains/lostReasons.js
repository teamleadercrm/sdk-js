import createDomainWithActions from '../utils/createDomainWithActions';

const lostReasons = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'lostReasons',
    actions: ['list', ...(configuration.customActions || [])],
  });

export default lostReasons;
