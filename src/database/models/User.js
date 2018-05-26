import baseModel from './baseModelFactory';

let User = (args) => {
  var baseModel = args.baseModel;
  /**
   * [getOwnName description]
   * @return {[type]} [description]
   */
  /* eslint-disable no-unused-vars */

  function getOwnName () {
    return 'User';
  }

  function getFormPath () {
    return 'user';
  }

  return Object.freeze(
    Object.assign({}, baseModel, {
      getOwnName,
      getFormPath
    })
  );
};

User = User({
  baseModel: baseModel()
});
export default User;
