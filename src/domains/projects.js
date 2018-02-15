import createDomain from '../utils/createDomain';

const projects = config =>
  createDomain({
    config,
    domain: 'projects',
    actions: ['list', 'info', 'create', 'update', 'delete', 'addParticipant', 'updateParticipant'],
  });

export default projects;