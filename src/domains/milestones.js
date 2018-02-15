import createDomain from '../utils/createDomain';

const milestones = config =>
  createDomain({
    config,
    domain: 'milestones',
    actions: ['list', 'info', 'create', 'update'],
  });

export default milestones;
