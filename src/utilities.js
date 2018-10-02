import _get from 'lodash/get';
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
  const get = (object, path, def) => {
    /*
      (() => (typeof path === 'string' ? path.replace(/\[(\d+)]/g, '.$1') : path.join('.')))()
    .split('.')
    .filter(Boolean)
    .every((step) => (object = object[step]) !== undefined) ?
    object :
    def;

    */
    return _get(object, path, def);
  };

  return Object.freeze({
    cloneDeep,
    get
  });
})();

export default Utilities;
