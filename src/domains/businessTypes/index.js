import list from './list';

const businessTypes = config => {
  const domainName = 'businessTypes';

  return {
    list: country => list(config, domainName, country),
  };
};

export default businessTypes;
