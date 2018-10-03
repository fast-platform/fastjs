/* eslint-disable no-unused-vars */
let Utilities = (() => {
  /**
   * Deep clones a JS object using JSON.parse
   * This function will not clone object
   * functions
   * @param {Object} object
   */
  const cloneDeep = (object) => {
    return JSON.parse(JSON.stringify(object));
  };
  /**
   * Given an Object and its path, if exisits it will
   * return the value of it, if not the default
   * @param {Object} obj
   * @param {String} path
   * @param {*} def
   */
  const get = (fn, def) => {
    try {
      return fn();
    } catch (e) {
      return def;
    }
  };

  const uniqBy = (arr, predicate) => {
    const cb = typeof predicate === 'function' ? predicate : (o) => o[predicate];

    return [
      ...arr
        .reduce((map, item) => {
          const key = cb(item);

          map.has(key) || map.set(key, item);

          return map;
        }, new Map())
        .values()
    ];
  };

  const orderBy = () => {};

  const isEmpty = (value) => {
    if (!value) {
      return true;
    }
    if (Array.isArray(value) || typeof value === 'string') {
      return !value.length;
    }
    for (let key in value) {
      if (hasOwnProperty.call(value, key)) {
        return false;
      }
    }
    return true;
  };

  const debounce = (fn, time) => {
    let timeout;

    return function () {
      const functionCall = () => fn.apply(this, arguments);

      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    };
  };

  return Object.freeze({
    cloneDeep,
    get,
    orderBy,
    isEmpty,
    debounce
  });
})();

export default Utilities;
