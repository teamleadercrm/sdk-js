import createDomainWithActions from '../utils/createDomainWithActions';

const companies = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'companies',
    actions: ['list', 'info', 'add', 'update', 'delete', 'tag', 'untag', ...(configuration.customActions || [])],
  });

export default companies;
