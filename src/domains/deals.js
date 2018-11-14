import createDomainWithActions from '../utils/createDomainWithActions';

const deals = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'deals',
    actions: [
      'list',
      'info',
      'create',
      'update',
      'move',
      'win',
      'lose',
      'delete',
      ...(configuration.customActions || []),
    ],
  });

export default deals;
