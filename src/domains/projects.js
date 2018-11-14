import createDomainWithActions from '../utils/createDomainWithActions';

const projects = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'projects',
    actions: [
      'list',
      'info',
      'create',
      'update',
      'delete',
      'addParticipant',
      'updateParticipant',
      ...(configuration.customActions || []),
    ],
  });

export default projects;
