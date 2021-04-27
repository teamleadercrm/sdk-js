export default (...headers) =>
  headers.reduce((combined, headerConfiguration) => {
    if (!headerConfiguration) {
      return combined;
    }
    if (typeof headerConfiguration[Symbol.iterator] === 'function') {
      return { ...combined, ...headerConfiguration };
    }
    return combined;
  }, {});
