import createRequestHeaders from './createRequestHeaders';
import applyPlugins from './applyPlugins';
import { Configuration } from '../types';

export default async ({
  configuration,
  parameters,
}: {
  configuration: Configuration;
  parameters: Record<string, any> | null;
}): Promise<RequestInit> => {
  const { getAccessToken, plugins: { request: requestPlugins = [] } = {}, version, fetchOptions = {} } = configuration;

  const { headers = {}, ...rest } = fetchOptions;

  return {
    headers: await createRequestHeaders({ getAccessToken, version, headers }),
    body: JSON.stringify(applyPlugins(parameters, requestPlugins)),
    method: 'POST',
    ...rest,
  };
};
