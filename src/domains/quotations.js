import createDomainWithActions from '../utils/createDomainWithActions';

const quotations = configuration =>
  createDomainWithActions({
    configuration,
    domainName: 'quotations',
    actions: ['info', 'download', ...(configuration.customActions || [])],
  });

export default quotations;
