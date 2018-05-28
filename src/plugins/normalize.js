export default ({ data }) => data.reduce((o, d) => ({ [d.id]: d, ...o }), {});
