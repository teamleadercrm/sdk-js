import { camelizeKeys } from 'humps';
const camelCase = (data: any): any => camelizeKeys(data);

export default camelCase;
