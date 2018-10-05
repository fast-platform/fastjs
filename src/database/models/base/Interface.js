import Fluent from '../../Fluent';

export default Fluent.model({
  init ({ name, path }) {
    if (!name && !path) {
      throw new Error('Model must have a name or path');
    }
    this.name = name || this.name;
    this.path = path || this.path;
  },
  methods: {
    async all () {
      throw new Error('all() method not implemented');
    },
    newMethod () {
      throw new Error('newMethod() method not implemented');
    },
    async find () {
      throw new Error('find() method not implemented');
    },
    async findOne () {
      throw new Error('findOne() method not implemented');
    },
    async remove () {
      throw new Error('remove() method not implemented');
    },
    async softDelete () {
      throw new Error('softDelete() method not implemented');
    },
    async insert () {
      throw new Error('insert() method not implemented');
    },
    async update () {
      throw new Error('update() method not implemented');
    },
    async clear () {
      throw new Error('clear() method not implemented');
    },
    async updateOrCreate () {
      throw new Error('updateOrCreate() method not implemented');
    },
    async findAndRemove () {
      throw new Error('findAndRemove() method not implemented');
    }
  }
});
