import * as Database from '../../Database';
import _cloneDeep from 'lodash/cloneDeep';
import uuidv4 from 'uuid/v4';

const localModel = (() => {
  /**
   * [getModel description]
   * @return {[type]} [description]
   */
  async function getModel ({ model }) {
    const DB = await Database.get();

    return DB.getCollection(model);
  }

  /**
   * [find description]
   * @param  {[type]} filter [description]
   * @return {[type]}        [description]
   */
  async function find ({ modelName, filter, limit, select, pagination, form }) {
    const model = await getModel({ model: modelName });

    if (filter && Array.isArray(filter)) {
      let owner = filter.find((e) => {
        return e.element === 'owner' && e.type === 'local';
      });

      if (owner) {
        filter = { 'data.user_email': owner.value };
      }

      if (form) {
        filter = { ...filter, 'data.formio.formId': form };
      }
    }

    return model.find(filter);
  }
  /**
   * [findOne description]
   * @param  {[type]} filter [description]
   * @return {[type]}        [description]
   */
  async function findOne ({ modelName, filter }) {
    const model = await getModel({ model: modelName });

    return model.findOne(filter);
  }
  /**
   * [remove description]
   * @param  {[type]} document [description]
   * @return {[type]}          [description]
   */
  async function remove ({ modelName, document }) {
    const model = await getModel({ model: modelName });

    return model.remove(document);
  }
  /**
   * [insert description]
   * @param  {[type]} element [description]
   * @return {[type]}         [description]
   */
  async function insert ({ modelName, element }) {
    element = _cloneDeep(element);

    const model = await getModel({ model: modelName });

    element._id = uuidv4() + '_local';

    return model.insert(element);
  }
  /**
   * [update description]
   * @param  {[type]} document [description]
   * @return {[type]}          [description]
   */
  async function update ({ modelName, document }) {
    const model = await getModel({ model: modelName });

    return model.update(document);
  }

  async function updateOrCreate ({ modelName, document }) {
    const model = await getModel({ model: modelName });
    let role = await model.findOne(document);

    if (!role) {
      model.insert(document);
    }
  }

  async function findAndRemove ({ modelName, filter }) {
    const model = await getModel({ model: modelName });

    return model.findAndRemove(filter);
  }

  async function clear ({ modelName }) {
    const model = await getModel({ model: modelName });

    return model.clear({ removeIndices: true });
  }

  return Object.freeze({
    getModel,
    find,
    findOne,
    remove,
    insert,
    update,
    updateOrCreate,
    findAndRemove,
    clear
  });
})();

export default localModel;
