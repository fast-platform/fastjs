import Database from './Database';
import Utilities from 'utilities';
import uuidv4 from 'uuid/v4';
import Interface from '../../../Interface';
import compose from '@stamp/compose';

export default compose(
  Interface,
  {
    methods: {
      /**
       *
       */
      async get () {
        let filterObject = this.prepareFilter();

        let data = await (await this.getModel())
          .chain()
          .find(filterObject)
          .offset(this.offsetNumber)
          .limit(this.limitNumber)
          .data();

        data = this.applySelect(data);
        data = this.applyOrderBy(data);

        return data;
      },
      /**
       *
       * @param {*} attributePath
       */
      async pluck (attributePath) {
        let data = await this.get();

        data = data.map((e) => e[attributePath]);
        return data;
      },
      /**
       *
       * @param {*} args
       */
      orderBy (...args) {
        this.orderByArray = args;
        return this;
      },
      /**
       *
       * @param {*} data
       */
      applyOrderBy (data) {
        let _data = [...data];

        if (this.orderByArray.length === 0) {
          return _data;
        }
        let field = this.orderByArray[0];

        if (this.selectArray.length > 0 && (field.includes('.') || field.includes('['))) {
          throw new Error(
            'Cannot orderBy nested attribute "' + field + '" when using Select. You must rename the attribute'
          );
        }

        let order = this.orderByArray[1];
        let type = this.orderByArray[2];

        if (!type) {
          type = 'string';
        }

        _data = _data.sort((a, b) => {
          let A = Utilities.getFromPath(a, field, undefined).value;
          let B = Utilities.getFromPath(b, field, undefined).value;

          if (typeof A === 'undefined' || typeof B === 'undefined') {
            throw new Error('Cannot order by property "' + field + '" not all values have this property');
          }
          // For default order and numbers
          if (type.includes('string') || type.includes('number')) {
            if (order === 'asc') {
              return A > B ? 1 : A < B ? -1 : 0;
            }
            return A > B ? -1 : A < B ? 1 : 0;
          } else if (type.includes('date')) {
            if (order === 'asc') {
              return new Date(A) - new Date(B);
            }
            return new Date(B) - new Date(A);
          }
        });
        return _data;
      },
      /**
       *
       * @param {*} limit
       */
      limit (limit) {
        this.limitNumber = limit;
        return this;
      },
      /**
       *
       * @param {*} offset
       */
      offset (offset) {
        this.offsetNumber = offset;
        return this;
      },
      /**
       *
       * @param {*} args
       */
      where (...args) {
        args = Array.isArray(args[0]) ? args : [args];
        args.forEach((arg) => {
          if (arg.length !== 3) {
            throw new Error(
              'There where clouse is not properly formatted, expecting: ["attribute", "operator","value"] but got "' +
                JSON.stringify(arg) +
                '" '
            );
          }
          this.whereArray.push(arg);
        });
        return this;
      },
      /**
       *
       * @param {*} args
       */
      andWhere (...args) {
        return this.where(...args);
      },
      /**
       *
       * @param {*} args
       */
      orWhere (...args) {
        args = Array.isArray(args[0]) ? args : [args];
        args.forEach((arg) => {
          if (arg.length !== 3) {
            throw new Error(
              'There orWhere clouse is not properly formatted, expecting: ["attribute", "operator","value"] but got "' +
                JSON.stringify(arg) +
                '" '
            );
          }
          this.orWhereArray.push(arg);
        });
        return this;
      },
      /**
       *
       */
      prepareFilter () {
        let andObject = { $and: [] };
        let orObject = { $or: [] };
        let globalFilter = {};

        // All first Level AND conditions
        if (this.whereArray.length > 0) {
          this.whereArray.forEach((c) => {
            let conditionToObject = {};

            if (c[0].includes('[')) {
              throw new Error('Error in: "' + c[0] + '" "Where" close does not work with Array elements');
            }

            conditionToObject[c[0]] = {};
            let lokiOperator = this.getLokiOperator(c[1]);

            conditionToObject[c[0]][lokiOperator] = c[2];
            if (lokiOperator.includes('$regex|')) {
              delete conditionToObject[c[0]][lokiOperator];
              conditionToObject[c[0]]['$regex'] = lokiOperator.replace('$regex|', '').replace('{{$var}}', c[2]);
            }

            andObject['$and'].push(conditionToObject);
          });
          globalFilter = andObject;
        }
        // All second level OR conditions
        if (this.orWhereArray.length > 0) {
          this.orWhereArray.forEach((c) => {
            let conditionToObject = {};

            conditionToObject[c[0]] = {};
            let lokiOperator = this.getLokiOperator(c[1]);

            conditionToObject[c[0]][lokiOperator] = c[2];
            if (lokiOperator.includes('$regex|')) {
              delete conditionToObject[c[0]][lokiOperator];
              conditionToObject[c[0]]['$regex'] = lokiOperator.replace('$regex|', '').replace('{{$var}}', c[2]);
            }

            orObject['$or'].push(conditionToObject);
          });

          globalFilter = { $or: [andObject, orObject] };
        }

        // TODO we should include global level and() or()
        // operators to give room for more complex queries
        return globalFilter;
      },
      /**
       *
       * @param {*} operator
       */
      getLokiOperator (operator) {
        if (!this.operators.includes(operator)) {
          throw new Error('The "' + operator + '" operator is not supported');
        }

        let lokiOperators = {
          '=': '$eq',
          '<': '$lt',
          '>': '$gt',
          '<=': '$lte',
          '>=': '$gte',
          '<>': '$ne',
          '!=': '$ne',
          like: '$aeq',
          regexp: '$regex',
          startsWith: '$regex|^{{$var}}',
          endsWith: '$regex|{{$var}}$',
          contains: '$regex|{{$var}}'
        };
        let converted = Utilities.get(() => lokiOperators[operator], undefined);

        if (!converted) {
          throw new Error('The operator "' + operator + '" is not supported in Loki ');
        }
        return converted;
      },
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
       * Maps the given Data to show only those fields
       * explicitly detailed on the Select function
       * @param {Array} data Data from the Local DB
       * @returns {Array} Formatted data with the selected columns
       */
      applySelect (data) {
        let _data = [...data];

        if (this.selectArray.length > 0) {
          _data = _data.map((element) => {
            let newElement = {};

            this.selectArray.forEach((attribute) => {
              let extract = Utilities.getFromPath(element, attribute, undefined);

              let value = Utilities.get(() => extract.value, undefined);

              if (typeof value !== 'undefined') {
                newElement[extract.label] = extract.value;
              }
            });
            return newElement;
          });
        }

        return _data;
      },
      /**
       *
       */
      async all () {
        const model = await this.getModel();

        return model.find();
      },
      /**
       *
       * @param {*} columns
       */
      select (...columns) {
        columns = this.prepareInput(columns);

        this.selectArray = this.selectArray.concat(columns).filter((elem, pos, arr) => {
          return arr.indexOf(elem) === pos;
        });

        return this;
      },
      /**
       *
       * @param {*} param0
       */
      async find ({
        filter = undefined,
        limit = 30,
        select = undefined,
        pagination = undefined,
        form = undefined
      } = {}) {
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
      async first () {
        let data = await this.get();

        return Utilities.get(() => data[0], []);
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
      async insert (element) {
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
  }
);
