export default ({ data }) => data.reduce((o, d) => ({ ...o, byId: { ...o.byId, [d.id]: d } }), {});
