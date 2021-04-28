export default (...headers) =>
  headers.reduce((combined, headerConfiguration) => {
    if (!headerConfiguration || typeof headerConfiguration !== 'object') {
      return combined;
    }
    return { ...combined, ...headerConfiguration };
  }, {});
