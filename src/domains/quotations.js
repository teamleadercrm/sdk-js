import createDomain from '../utils/createDomain';

const quotations = config =>
  createDomain({
    config,
    domain: 'quotations',
    actions: ['info'],
  });

export default quotations;
