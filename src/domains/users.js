import createDomain from '../utils/createDomain';

const users = config =>
  createDomain({
    config,
    domain: 'users',
    actions: ['me', 'list', 'info'],
  });

export default users;
