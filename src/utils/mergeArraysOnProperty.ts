export default <T = any>(property: string, ...objects: Array<Record<string, T[]>>) => {
  return objects.reduce((arr, object = {}) => {
    return [...arr, ...(object[property] || [])];
  }, [] as T[]);
};
