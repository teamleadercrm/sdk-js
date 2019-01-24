export const isValidDate = date => {
  const API_VERSION_FORMAT_REGEX = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/g;

  if (!API_VERSION_FORMAT_REGEX.test(date)) {
    return false;
  }

  return true;
};
