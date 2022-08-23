import { decamelizeKeys } from 'humps';

export default (object: any): any =>
  decamelizeKeys(object, {
    separator: '_',
  });
