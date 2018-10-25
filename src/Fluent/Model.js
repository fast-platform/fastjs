import Fluent from './Fluent';
import stampit from '@stamp/it';
import Privatize from '@stamp/privatize';

export default stampit({
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
      return Fluent.getRemoteConnector({
        remoteConnection: this.remoteConnection
      });
    },
    /**
     * [local description]
     * @return {[type]} [description]
     */
    local () {
      return Fluent.getLocalConnector({ name: this.name });
    },
    /**
     * [local description]
     * @return {[type]} [description]
     */
    merged () {
      const local = this.local();
      const remote = this.remote();

      return Fluent.getMergedConnector()({ local, remote, name: this.name });
    }
  }
}).compose(Privatize);
