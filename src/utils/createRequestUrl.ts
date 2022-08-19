export default ({ configuration: { baseUrl = '' } = {}, domainName = '', actionName = '' } = {}) =>
  `${baseUrl}/${domainName}.${actionName}`;
