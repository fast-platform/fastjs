class SyncHelper {
  /**
   * Removes all the null values from an Object
   * or from an array
   * @param  {Object, Array} object [description]
   * @return {Object, Array}        [description]
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
