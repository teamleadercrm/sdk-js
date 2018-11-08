import createDomain from '../utils/createDomain';

const quotations = config =>
  createDomain({
    config,
    domain: 'quotations',
    actions: ['info', 'download', ...(config.customActions || [])],
  });

export default quotations;
