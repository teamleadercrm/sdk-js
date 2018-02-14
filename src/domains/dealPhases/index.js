import list from '../../shared/list';

const dealPhases = config => {
  const domainName = 'dealPhases';

  return {
    list: params => list(config, domainName, params),
  };
};

export default dealPhases;
