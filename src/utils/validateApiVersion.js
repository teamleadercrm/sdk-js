export default version => {
  const API_VERSION_FORMAT_REGEX = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/g;

  if (!API_VERSION_FORMAT_REGEX.test(version)) {
    throw new Error(
      'The provided API version is not in the right format. Please provide the API version in the yyyy-mm-dd format.',
    );
  }

  return true;
};
