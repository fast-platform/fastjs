import stampit from '@stamp/it';
import Utilities from 'utilities';

export default stampit({
  init (data) {
    if (!Array.isArray(data)) {
      throw new Error('Collect method only accepts arrays of data');
    }
    this.data = data;
  },
  properties: {
    data: []
  },
  methods: {
    get () {
      return this.data;
    },
    /**
     * Alias for the "average" method.
     *
     * @param  {String}  path Path of the key
     * @return function
     */
    avg (path) {
      return this.average(path);
    },
    /**
     * Get the average value of a given key.
     *
     * @param  {String}  path Path of the key
     * @return static
     */
    average (path) {
      let data = [...this.data];
      let sum = data.reduce((acc, element) => {
        let extract = Utilities.getFromPath(element, path, undefined);

        if (typeof extract !== 'undefined' && extract.value) {
          return acc + extract.value;
        }
      }, 0);

      try {
        let avg = sum / data.length;

        return avg;
      } catch (e) {
        throw new Error('Division between "' + sum + '" and "' + data.length + '" is not valid.');
      }
    },
    /**
     * Chunks the given array
     *
     * @param {Int} size
     * @return static
     */
    chunks (size) {
      let data = [...this.data];
      var results = [];

      while (data.length) {
        results.push(data.splice(0, size));
      }

      this.data = results;
      return this;
    },
    collapse () {
      let data = [...this.data];
      var results = [];

      data.forEach((chunk) => {
        chunk.forEach((element) => {
          results.push(element);
        });
      });
      this.data = results;

      return this;
    },
    unChunk () {
      return this.collapse();
    },
    concat (array) {
      this.data = [...this.data, array];
      return this;
    }
  }
});
