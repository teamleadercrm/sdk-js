import mergeArraysOnProperty from './mergeArraysOnProperty';

export default (...plugins) => ({
  request: mergeArraysOnProperty('request', ...plugins),
  response: mergeArraysOnProperty('response', ...plugins),
});
