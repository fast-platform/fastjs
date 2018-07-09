import Local from './baseModel/local';
import Remote from './baseModel/remote';
import Connection from 'Wrappers/Connection';
const baseModel = () => {
  /* eslint-disable no-unused-vars */
  let getFrom = 'remote-local';
  /**
   * [getOwnName description]
   * @return {[type]} [description]
   */

  function getOwnName () {
    return 'baseModel';
  }

  function getFormPath () {
    return undefined;
  }
  /**
   * [remote description]
   * @return {[type]} [description]
   */
  function remote () {
    getFrom = 'remote';
    return this;
  }
  /**
   * [local description]
   * @return {[type]} [description]
   */
  function local () {
    getFrom = 'local';
    return this;
  }

  function merged () {
    getFrom = 'remote-local';
    return this;
  }
  /**
   * [find description]
   * @param  {[type]} filter [description]
   * @return {[type]}        [description]
   */
  async function find ({ filter, limit = undefined, select, pagination, form, populate } = {}) {
    switch (getFrom) {
      case 'local':
        return Local.find({
          modelName: this.getOwnName(),
          filter,
          limit,
          select,
          pagination
        });
        break;
      case 'remote':
        if (this.getFormPath() === 'custom') {
          return this.rFind({
            formPath: this.getFormPath(),
            filter,
            limit,
            select,
            pagination,
            populate,
            form
          });
        }
        let isOnline = await Connection.isOnline();

        return isOnline ?
          Remote.find({
            formPath: form || this.getFormPath(),
            filter,
            limit,
            select,
            pagination,
            populate
          }) :
          [];
        break;
      case 'remote-local':
        let local = await Local.find({
          modelName: this.getOwnName(),
          filter,
          limit,
          select,
          pagination
        });
        let remote;

        if (this.getFormPath() === 'custom') {
          let isOnline = await Connection.isOnline();

          remote = isOnline ?
            await this.rFind({
              formPath: this.getFormPath(),
              filter,
              limit,
              select,
              pagination,
              populate,
              form
            }) :
            [];
        } else {
          let isOnline = await Connection.isOnline();

          remote = isOnline ?
            await Remote.find({
              formPath: form || this.getFormPath(),
              filter,
              limit,
              select,
              pagination,
              populate
            }) :
            [];
        }

        // We need to include a logic here to check Which submission to keep
        // It could be the offline synced submission, the merge of the two
        // Or just keep the online submission
        let localOnline = local.reduce((reducer, s) => {
          if (s.data && s.data._id && s.data._id.indexOf('_local') === -1) {
            reducer.push(s.data._id);
          }
          return reducer;
        }, []);

        remote = remote.filter((s) => {
          return !localOnline.includes(s._id);
        });

        return remote.concat(local);
        break;
    }
  }
  /**
   * [findOne description]
   * @param  {[type]} filter [description]
   * @return {[type]}        [description]
   */
  async function findOne (filter) {
    switch (getFrom) {
      case 'local':
        return Local.findOne({ modelName: this.getOwnName(), filter: filter });
        break;
      case 'remote':
        return;
        break;
      case 'remote-local':
        return;
        break;
    }
  }
  /**
   * [remove description]
   * @param  {[type]} document [description]
   * @return {[type]}          [description]
   */
  async function remove (document, id, formPath) {
    switch (getFrom) {
      case 'local':
        return Local.remove({
          modelName: this.getOwnName(),
          document: document
        });
        break;
      case 'remote':
        let isOnline = await Connection.isOnline();

        return isOnline ?
          Remote.remove({
            formPath,
            id
          }) :
          undefined;
        return;
        break;
      case 'remote-local':
        return;
        break;
    }
  }
  /**
   * [insert description]
   * @param  {[type]} element [description]
   * @return {[type]}         [description]
   */
  async function insert (element, formPath) {
    switch (getFrom) {
      case 'local':
        return Local.insert({ modelName: this.getOwnName(), element: element });
        break;
      case 'remote':
        return Remote.insert({
          formPath: this.getFormPath() || formPath,
          element: element
        });
        break;
      case 'remote-local':
        return;
        break;
    }
  }
  /**
   * [update description]
   * @param  {[type]} document [description]
   * @return {[type]}          [description]
   */
  async function update (document, formPath) {
    switch (getFrom) {
      case 'local':
        return Local.update({
          modelName: this.getOwnName(),
          document: document
        });
        break;
      case 'remote':
        return Remote.update({
          formPath: this.getFormPath() || formPath,
          document: document
        });
        break;
      case 'remote-local':
        return;
        break;
    }
  }

  async function updateOrCreate (document) {
    switch (getFrom) {
      case 'local':
        return Local.updateOrCreate({
          modelName: this.getOwnName(),
          document: document
        });
        break;
      case 'remote':
        return;
        break;
      case 'remote-local':
        return;
        break;
    }
  }

  async function findAndRemove (filter) {
    switch (getFrom) {
      case 'local':
        return Local.findAndRemove({
          modelName: this.getOwnName(),
          filter: filter
        });
        break;
      case 'remote':
        return;
        break;
      case 'remote-local':
        return;
        break;
    }
  }

  return Object.freeze({
    getOwnName,
    getFormPath,
    remote,
    local,
    merged,
    find,
    findOne,
    remove,
    insert,
    update,
    updateOrCreate,
    findAndRemove
  });
};

export default baseModel;
