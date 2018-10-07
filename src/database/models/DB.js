import Model from '../Fluent/Model';
import Fluent from '../Fluent/Fluent';

export default Fluent.extend(Model, {
  properties: {
    name: undefined,
    path: undefined
  },
  methods: {
    table (name) {
      this.name = name;
      this.path = name;
      return this;
    }
  }
})();
