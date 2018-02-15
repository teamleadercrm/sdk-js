import createDomain from '../utils/createDomain';

const companies = config =>
  createDomain({
    config,
    domain: 'companies',
    actions: ['list', 'info', 'add', 'update', 'delete', 'tag'],
  });

export default companies;