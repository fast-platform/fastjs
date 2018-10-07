import Fluent from './Fluent';

export default Fluent.compose({
  properties: {
    getFrom: 'remote-local',
    name: 'baseModel',
    path: undefined
  },
  methods: {
    getModelName () {
      return this.name;
    },
    /**
     * [remote description]
     * @return {[type]} [description]
     */
    remote () {
      return Fluent.getRemoteConnector({ path: this.path });
    },
    /**
     * [local description]
     * @return {[type]} [description]
     */
    local () {
      return Fluent.getLocalConnector({ name: this.name });
    },
    /**
     *
     */
    merged () {
      return Fluent.getMergedConnector({ name: this.name, path: this.path });
    }
  }
}).compose(Fluent.privatize);
