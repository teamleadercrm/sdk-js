import { Configuration } from '../types';

export default ({
  configuration: { baseUrl = '' },
  domainName,
  actionName,
}: {
  configuration: Configuration;
  domainName: string;
  actionName: string;
}) => `${baseUrl}/${domainName}.${actionName}`;
