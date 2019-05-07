export default ({ data }) => {
  let dataArray;
  if (Array.isArray(data)) {
    dataArray = data;
  } else if (Object.keys(data).length === 0) {
    dataArray = [];
  } else {
    dataArray = [data];
  }
  return dataArray.reduce((o, d) => ({ ...o, byId: { ...o.byId, [d.id]: d } }), { byId: {} });
};
