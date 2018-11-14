import createDomainWithActions from '../utils/createDomainWithActions';

const invoices = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'invoices',
    actions: [
      'list',
      'info',
      'download',
      'draft',
      'update',
      'copy',
      'book',
      'delete',
      'registerPayment',
      ...(configuration.customActions || []),
    ],
  });

export default invoices;
