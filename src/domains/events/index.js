import list from '../../shared/list';
import info from '../../shared/info';

import create from './create';

const events = config => {
  const domainName = 'events';

  return {
    list: params => list(config, domainName, params),
    info: id => info(config, domainName, id),
    create: entity => create(config, domainName, entity),
  };
};

export default events;
