export default ({ baseUrl = '', domainName = '', actionName = '' } = {}) => `${baseUrl}/${domainName}.${actionName}`;
