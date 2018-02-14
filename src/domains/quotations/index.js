import info from '../../shared/info';

const quotations = config => {
  const domainName = 'quotations';

  return {
    info: id => info(config, domainName, id),
  };
};

export default quotations;
