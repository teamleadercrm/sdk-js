import createDomain from '../utils/createDomain';

const departments = config =>
  createDomain({
    config,
    domain: 'departments',
    actions: ['list', 'info', ...(config.customActions || [])],
  });

export default departments;
