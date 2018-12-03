export const validateApiVersion = version => {
  const API_VERSION_FORMAT_REGEX = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/g;

  if (!API_VERSION_FORMAT_REGEX.test(version)) {
    throw new Error(
      'The provided API version is not in the right format. Please provide the API version in the yyyy-mm-dd format.',
    );
  }

  if (isVersionDateInTheFuture(version)) {
    throw new Error('The provided API version date is in the future. Please provide an API version from the past.');
  }

  return true;
};

export const isVersionDateInTheFuture = version => {
  const today = new Date();
  const versionDateIndexes = version.split('-').map(date => parseInt(date, 10));
  const apiVersionDate = new Date(versionDateIndexes[0], versionDateIndexes[1] - 1, versionDateIndexes[2]);

  return today - apiVersionDate < 0;
};
