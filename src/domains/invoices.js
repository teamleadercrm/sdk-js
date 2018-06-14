import createDomain from '../utils/createDomain';

const invoices = config =>
  createDomain({
    config,
    domain: 'invoices',
    actions: [
      'list',
      'info',
      'draft',
      'update',
      'copy',
      'book',
      'delete',
      'registerPayment',
      ...(config.customActions || []),
    ],
  });

export default invoices;
