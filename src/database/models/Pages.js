import baseModel from './baseModelFactory';

let Pages = (args) => {
  var baseModel = args.baseModel;
  /**
   * [getOwnName description]
   * @return {[type]} [description]
   */
  /* eslint-disable no-unused-vars */

  function getOwnName () {
    return 'Pages';
  }

  function getFormPath () {
    return 'fast-app-pages';
  }

  return Object.freeze(
    Object.assign({}, baseModel, {
      getOwnName,
      getFormPath
    })
  );
};

Pages = Pages({
  baseModel: baseModel()
});
export default Pages;
