import createDomainWithActions from '../utils/createDomainWithActions';

const customFieldDefinitions = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'customFieldDefinitions',
    actions: ['list', 'info', ...(configuration.customActions || [])],
  });

export default customFieldDefinitions;
