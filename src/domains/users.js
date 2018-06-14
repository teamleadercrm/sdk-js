import createDomain from '../utils/createDomain';

const users = config =>
  createDomain({
    config,
    domain: 'users',
    actions: ['me', 'list', 'info', ...(config.customActions || [])],
  });

export default users;
