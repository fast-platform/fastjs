import baseModel from 'database/models/baseModelFactory';
let Role = (args) => {
  var baseModel = args.baseModel;
  /**
   * [getOwnName description]
   * @return {[type]} [description]
   */
  /* eslint-disable no-unused-vars */

  function getOwnName () {
    return 'Role';
  }

  function getFormPath () {
    return undefined;
  }

  return Object.freeze(
    Object.assign({}, baseModel, {
      getOwnName,
      getFormPath
    })
  );
};

Role = Role({
  baseModel: baseModel()
});
export default Role;
