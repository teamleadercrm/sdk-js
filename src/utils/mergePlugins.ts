import { Plugins } from '../types';
import mergeArraysOnProperty from './mergeArraysOnProperty';

export default (...plugins: Plugins[]) => ({
  request: mergeArraysOnProperty('request', ...plugins),
  response: mergeArraysOnProperty('response', ...plugins),
});
