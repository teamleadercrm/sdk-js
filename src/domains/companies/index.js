import list from '../../shared/list';
import info from '../../shared/info';
import add from '../../shared/add';
import update from '../../shared/update';
import remove from '../../shared/remove';

import tag from './tag';

const companies = config => {
  const domainName = 'companies';

  return {
    list: params => list(config, domainName, params),
    info: id => info(config, domainName, id),
    add: entity => add(config, domainName, entity),
    update: entity => update(config, domainName, entity),
    delete: id => remove(config, domainName, id),

    tag: params => tag(config, domainName, params),
  };
};

export default companies;
