const convertPathToKeys = path => {
  return path.split('.');
};

const resolveForCondition = condition => (object, keys) => {
  try {
    const item = object[keys[0]];

    if (condition(item)) {
      return item;
    }

    // remove first key from array, we've checked it, keep digging deeper
    return resolveForCondition(condition)(item, keys.filter(key => key === keys[0]));
  } catch (exception) {
    throw new Error("Couldn't resolve path for object");
  }
};

const isRelationship = item => {
  if (typeof item !== 'object') {
    return false;
  }

  return item.hasOwnProperty('type') && item.hasOwnProperty('id');
};

const isListOfRelationships = item => {
  if (!Array.isArray(item)) {
    return false;
  }

  return isRelationship(item[0]);
};

const resolveReferences = resolveForCondition(item => isListOfRelationships(item) || isRelationship(item));

export { convertPathToKeys, resolveReferences };
