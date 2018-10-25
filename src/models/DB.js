import Model from '../Fluent/Model';

export default Model.compose({
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
