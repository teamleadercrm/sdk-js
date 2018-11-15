import flow from '../utils/flow';
import singleRequest from './singleRequest';
import sequentialRequests from './sequentialRequests';

export default async (requestUrl, parameters = {}, configuration = {}) => {
  const { fetchAll, plugins: { response: responsePlugins = [] } = {} } = configuration;

  const call = fetchAll === true ? sequentialRequests : singleRequest;

  return call(requestUrl, parameters, configuration).then(data => flow(data, responsePlugins));
};
