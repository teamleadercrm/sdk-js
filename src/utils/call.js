const call = (url, options) => fetch(url, options).then(d => d.json());
export default call;
