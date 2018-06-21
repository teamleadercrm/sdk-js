import createDomain from '../utils/createDomain';

const contacts = config =>
  createDomain({
    config,
    domain: 'contacts',
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
      ...(config.customActions || []),
    ],
  });

export default contacts;
