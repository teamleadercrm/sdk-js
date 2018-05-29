export default (data, functions = []) => functions.reduce((d, f) => f(d), data);
