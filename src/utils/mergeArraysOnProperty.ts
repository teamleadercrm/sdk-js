export default (property, ...objects) =>
  objects.reduce((arr, object = {}) => [...arr, ...(object[property] || [])], []);
