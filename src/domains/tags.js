import createDomainWithActions from '../utils/createDomainWithActions';

const tags = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'tags',
    actions: ['list', ...(configuration.customActions || [])],
  });

export default tags;
