import list from '../../shared/list';
import info from '../../shared/info';
import add from '../../shared/add';
import update from '../../shared/update';
import remove from '../../shared/remove';

import linkToCompany from './linkToCompany';
import unlinkFromCompany from './unlinkFromCompany';

const contacts = config => {
  const domainName = 'contacts';

  return {
    list: params => list(config, domainName, params),
    info: id => info(config, domainName, id),
    add: entity => add(config, domainName, entity),
    update: entity => update(config, domainName, entity),
    delete: id => remove(config, domainName, id),

    linkToCompany: params => linkToCompany(config, domainName, params),
    unlinkFromCompany: params => unlinkFromCompany(config, domainName, params),
  };
};

export default contacts;
