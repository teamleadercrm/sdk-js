import _set from 'lodash/fp/set';

import { convertPathToKeys, resolveReferences } from './referenceResolver';

const mergeIncludedReferenceIntoEntity = (entity, included, reference, path) => {
  const includedEntity = included[reference.type].find(includedEntry => includedEntry.id === reference.id);

  return _set(path, { ...reference, ...includedEntity }, entity);
};

const composeEntity = (entity, path, included) => {
  const keys = convertPathToKeys(path);
  const resolvedReferences = resolveReferences(entity, keys);

  if (Array.isArray(resolvedReferences)) {
    return resolvedReferences.reduce(
      (mergedEntity, reference, index) =>
        mergeIncludedReferenceIntoEntity(mergedEntity, included, reference, `${path}.${index}`),
      entity,
    );
  }

  return mergeIncludedReferenceIntoEntity(entity, included, resolvedReferences, path);
};

const merge = include => response => {
  const includePaths = include.split(',');

  return {
    data: includePaths.reduce((data, path) => {
      if (Array.isArray(data)) {
        return data.map(entry => composeEntity(entry, path, response.included));
      }

      return composeEntity(data, path, response.included);
    }, response.data),
  };
};

export default merge;
