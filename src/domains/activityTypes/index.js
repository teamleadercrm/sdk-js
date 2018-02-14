import list from '../../shared/list';

const acivityTypes = config => {
  const domainName = 'acivityTypes';

  return {
    list: params => list(config, domainName, params),
  };
};

export default acivityTypes;
