import { decamelizeKeys } from 'humps';

export default (object) =>
  decamelizeKeys(object, {
    separator: '_',
  });
