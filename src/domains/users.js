import createDomainWithActions from '../utils/createDomainWithActions';

const users = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'users',
    actions: ['me', 'list', 'info', ...(configuration.customActions || [])],
  });

export default users;
