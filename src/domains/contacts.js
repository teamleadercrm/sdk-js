import createDomainWithActions from '../utils/createDomainWithActions';

const contacts = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'contacts',
    actions: [
      'list',
      'info',
      'add',
      'update',
      'delete',
      'tag',
      'untag',
      'linkToCompany',
      'unlinkFromCompany',
      ...(configuration.customActions || []),
    ],
  });

export default contacts;
