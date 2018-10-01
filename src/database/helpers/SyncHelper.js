class SyncHelper {
  /**
   * Recursively removes all NULL values
   * from an Object or an Array
   * @static
   * @param {Array|Object} object Array, Object to clean
   * @returns {Array|Object} returns the cleaned value
   * @memberof SyncHelper
   * @example
   *
   * const object = { 'a': 'b', c: null, d: {'a':'b', c:null} }
   *
   * deleteNulls(object)
   * // => {'a': 'b', d: {'a':'b'}}
   */
  static deleteNulls (object) {
    let obj = object;
    var isArray = obj instanceof Array;

    for (let k in obj) {
      if (obj[k] === null) isArray ? obj.splice(k, 1) : delete obj[k];
      else if (typeof obj[k] === 'object') this.deleteNulls(obj[k]);
    }
    return obj;
  }
}

export default SyncHelper;
