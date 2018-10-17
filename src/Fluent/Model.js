import Fluent from './Fluent';

export default Fluent.compose({
  properties: {
    name: 'baseModel',
    remoteConnection: {
      path: '/myRemote/model',
      token: undefined,
      pullForm: false,
      type: 'model'
    }
  },
  methods: {
    getModelName () {
      return this.name;
    },
    /**
     * [remote description]
     * @return {[type]} [description]
     */
    remote ({ token = undefined, pullForm = undefined } = {}) {
      if (token !== false) {
        if (token || Fluent.getRemoteToken()) {
          this.remoteConnection.token = token || Fluent.getRemoteToken();
        }
      }

      if (pullForm) {
        this.remoteConnection.pullForm = pullForm;
      }
      return Fluent.getRemoteConnector({ remoteConnection: this.remoteConnection });
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
    merged ({ token }) {
      this.remoteConnection.token = token;
      return Fluent.getMergedConnector({ name: this.name, path: this.path });
    }
  }
}).compose(Fluent.privatize);
