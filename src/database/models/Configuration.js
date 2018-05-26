import baseModel from './baseModelFactory';

let Configuration = (args) => {
  var baseModel = args.baseModel;
  /**
   * [getOwnName description]
   * @return {[type]} [description]
   */
  /* eslint-disable no-unused-vars */

  function getOwnName () {
    return 'Configuration';
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

Configuration = Configuration({
  baseModel: baseModel()
});
export default Configuration;
