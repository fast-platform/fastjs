import Model from '../Fluent/Model';
import Fluent from '../Fluent/Fluent';

export default Fluent.extend(Model, {
  properties: {
    name: undefined,
    remoteConnection: undefined
  },
  methods: {
    table ({ name, remoteConnection }) {
      this.name = name;
      this.remoteConnection = remoteConnection;
      return this;
    }
  }
})();
