import Database from '../../Database';
import Utilities from 'utilities';
import uuidv4 from 'uuid/v4';
import Fluent from '../../Fluent';
import Interface from './Interface';

export default Fluent.extend(Interface, {
  methods: {
    /**
     *
     * @param {Object} db The name of the model to fetch
     * @param {String} db.model The name of the model to fetch
     * @returns {Promise} The DB model
     */
    async getModel () {
      const DB = await Database.get();

      return DB.getCollection(this.name);
    },
    /**
     *
     */
    async all () {
      const model = await this.getModel();

      return model.find();
    },
    async find ({ filter = undefined, limit = 30, select = undefined, pagination = undefined, form = undefined } = {}) {
      const model = await this.getModel();

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
    },
    /**
     * [findOne description]
     * @param  {[type]} filter [description]
     * @return {[type]}        [description]
     */
    async findOne ({ filter }) {
      const model = await this.getModel();

      return model.findOne(filter);
    },
    /**
     * [remove description]
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    async remove ({ document }) {
      const model = await this.getModel();

      return model.remove(document);
    },
    /**
     * [insert description]
     * @param  {[type]} element [description]
     * @return {[type]}         [description]
     */
    async insert ({ element }) {
      element = Utilities.cloneDeep(element);

      const model = await this.getModel();

      element._id = uuidv4() + '_local';

      return model.insert(element);
    },
    /**
     * [update description]
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    async update ({ document }) {
      const model = await this.getModel();

      return model.update(document);
    },
    /**
     *
     * @param {*} param0
     */
    async updateOrCreate ({ document }) {
      const model = await this.getModel();
      let role = await model.findOne(document);

      if (!role) {
        model.insert(document);
      }
    },
    /**
     *
     * @param {*} param0
     */
    async findAndRemove ({ filter }) {
      const model = await this.getModel();

      return model.findAndRemove(filter);
    },
    /**
     *
     * @param {*} param0
     */
    async clear () {
      const model = await this.getModel();

      return model.clear({ removeIndices: true });
    }
  }
});
