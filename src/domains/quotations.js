import createDomain from '../utils/createDomain';

const quotations = config =>
  createDomain({
    config,
    domain: 'quotations',
    actions: ['list'],
  });

export default quotations;
