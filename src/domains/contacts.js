import list from '../methods/general/list';
import info from '../methods/general/info';
import add from '../methods/general/add';
import update from '../methods/general/update';
import remove from '../methods/general/remove';

import linkToCompany from '../methods/contacts/linkToCompany';
import unlinkFromCompany from '../methods/contacts/unlinkFromCompany';

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
