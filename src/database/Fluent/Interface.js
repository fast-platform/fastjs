import stampit from '@stamp/it';

export default stampit({
  init ({ name, path }) {
    if (!name && !path) {
      throw new Error('Model must have a name or path');
    }
    this.name = name || this.name;
    this.path = path || this.path;
  },
  properties: {
    whereArray: [],
    orWhereArray: [],
    selectArray: [],
    orderByArray: [],
    limitNumber: undefined,
    offsetNumber: undefined,
    populate: [],
    chunk: null,
    pullSize: null,
    operators: ['=', '<', '>', '<=', '>=', '<>', '!=', 'like', 'regexp', 'startsWith', 'endsWith', 'contains']
  },
  methods: {
    get () {
      throw new Error('get() method not implemented');
    },
    all () {
      throw new Error('all() method not implemented');
    },
    select () {
      throw new Error('select() method not implemented');
    },
    where () {
      throw new Error('where() method not implemented');
    },
    andWhere () {
      throw new Error('andWhere() method not implemented');
    },
    orWhere () {
      throw new Error('orWhere() method not implemented');
    },
    limit () {
      throw new Error('limit() method not implemented');
    },
    offset () {
      throw new Error('offset() method not implemented');
    },
    pluck (attributePath) {
      throw new Error('pluck() method not implemented');
    },
    prepareInput (input) {
      let cols = [];

      input.forEach((item) => {
        let value = Array.isArray(item) ? item : item.split(',');

        value = value.map((e) => {
          return e.trim();
        });
        cols = cols.concat(value);
      });

      cols.filter((elem, pos, arr) => {
        return arr.indexOf(elem) === pos;
      });

      return cols;
    },
    find () {
      throw new Error('find() method not implemented');
    },
    findOne () {
      throw new Error('findOne() method not implemented');
    },
    remove () {
      throw new Error('remove() method not implemented');
    },
    softDelete () {
      throw new Error('softDelete() method not implemented');
    },
    insert () {
      throw new Error('insert() method not implemented');
    },
    update () {
      throw new Error('update() method not implemented');
    },
    clear () {
      throw new Error('clear() method not implemented');
    },
    updateOrCreate () {
      throw new Error('updateOrCreate() method not implemented');
    },
    findAndRemove () {
      throw new Error('findAndRemove() method not implemented');
    }
  }
});
