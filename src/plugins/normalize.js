export default ({ data }) => {
  const dataArray = Array.isArray(data) ? data : [data];
  return dataArray.reduce((o, d) => ({ ...o, byId: { ...o.byId, [d.id]: d } }), {});
};
