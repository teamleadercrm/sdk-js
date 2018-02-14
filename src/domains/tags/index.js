import list from '../../shared/list';

const tags = config => {
  const domainName = 'tags';

  return {
    list: params => list(config, domainName, params),
  };
};

export default tags;
