import stampit from '@stamp/it';
import compose from '@stamp/compose';
import loki from './Connectors/local/Loki/FluentConnector';
import formio from './Connectors/remote/Formio/FluentConnector';
import formioLoki from './Connectors/merged/Formio-Loki/FluentConnector';

var _FLUENT_FORMIO_BASEURL, _FAST_CONFIG_ID, _FAST_CONFIG_URL, _OFFLINE_START;

const Fluent = stampit({
  init() {
    this.registerInternalModels();
  },
  properties: {
    defaulLocal: 'loki',
    defaultRemote: 'formio',
    defaultMerged: 'formio-loki',
    connectors: {
      local: { loki: loki },
      remote: { formio: formio },
      merged: { 'formio-loki': formioLoki }
    }
  },
  methods: {
    model(...args) {
      this.registerModel(args);
      return stampit(...args);
    },
    extend(...args) {
      this.registerModel(args);
      return compose(...args);
    },
    compose(...args) {
      this.registerModel(args);
      return compose(...args);
    },
    getLocalConnector(modelName) {
      let con = this.getConfigLocalConnector();

      return this.connectors.local[con](modelName);
    },
    getRemoteConnector(remoteConnection) {
      let con = this.getConfigRemoteConnector();

      return this.connectors.remote[con](remoteConnection);
    },
    getMergedConnector() {
      let con = this.getConfigMergedConnector();

      return this.connectors.merged[con];
    },
    getConfigRemoteConnector() {
      if (
        window &&
        window._FLUENT_ &&
        window._FLUENT_.config &&
        window._FLUENT_.config.FLUENT_REMOTE_CONNECTOR
      ) {
        return window._FLUENT_.config.FLUENT_REMOTE_CONNECTOR;
      }
      if (
        global &&
        global._FLUENT_ &&
        global._FLUENT_.config &&
        global._FLUENT_.config.FLUENT_REMOTE_CONNECTOR
      ) {
        return global._FLUENT_.config.FLUENT_REMOTE_CONNECTOR;
      }
      return this.defaultRemote;
    },
    getConfigLocalConnector() {
      if (
        window &&
        window._FLUENT_ &&
        window._FLUENT_.config &&
        window._FLUENT_.config.FLUENT_LOCAL_CONNECTOR
      ) {
        return window._FLUENT_.config.FLUENT_LOCAL_CONNECTOR;
      }
      if (
        global &&
        global._FLUENT_ &&
        global._FLUENT_.config &&
        global._FLUENT_.config.FLUENT_LOCAL_CONNECTOR
      ) {
        return global._FLUENT_.config.FLUENT_LOCAL_CONNECTOR;
      }
      return this.defaulLocal;
    },
    getConfigMergedConnector() {
      if (
        window &&
        window._FLUENT_ &&
        window._FLUENT_.config &&
        window._FLUENT_.config.FLUENT_MERGED_CONNECTOR
      ) {
        return window._FLUENT_.config.FLUENT_MERGED_CONNECTOR;
      }
      if (
        global &&
        global._FLUENT_ &&
        global._FLUENT_.config &&
        global._FLUENT_.config.FLUENT_MERGED_CONNECTOR
      ) {
        return global._FLUENT_.config.FLUENT_MERGED_CONNECTOR;
      }
      return this.defaultMerged;
    },
    registerInternalModels() {
      let models = [
        'Submission',
        'Form',
        'Translation',
        'User',
        'Role',
        'Configuration',
        'Pages',
        'DB'
      ];

      if (window) {
        window._FLUENT_ = { ...window._FLUENT_, ...{ models: {} } };
      }

      if (global) {
        global._FLUENT_ = { ...global._FLUENT_, ...{ models: {} } };
      }

      models.forEach(model => {
        window._FLUENT_.models[model] = true;
        global._FLUENT_.models[model] = true;
      });
    },
    registerModel(args) {
      let name =
        args && args[0] && args[0].properties && args[0].properties.name ?
          args[0].properties.name :
          args && args[1] && args[1].properties && args[1].properties.name ?
            args[1].properties.name :
            undefined;

      if (!name) {
        return;
      }

      if (!(typeof name === 'string')) {
        throw new Error(
          'You must assign a name to your Model when using Fluent.compose'
        );
      }

      if (name !== 'baseModel') {
        window._FLUENT_.models[name] = true;
        global._FLUENT_.models[name] = true;
      }
    },
    getRemoteToken(provider) {
      let con = process.env.FLUENT_REMOTE_CONNECTOR || this.defaultRemote;

      return this.connectors.remote[con]({ name: 'token' }).getToken();
    },
    setConfig({
      FLUENT_FORMIO_BASEURL = undefined,
      FAST_CONFIG_ID = undefined,
      FAST_CONFIG_URL = undefined,
      OFFLINE_START = undefined
    }) {
      _FLUENT_FORMIO_BASEURL = FLUENT_FORMIO_BASEURL;
      _FAST_CONFIG_ID = FAST_CONFIG_ID;
      _FAST_CONFIG_URL = FAST_CONFIG_URL;
      _OFFLINE_START = OFFLINE_START;
    },
    getConfig() {
      return {
        FLUENT_FORMIO_BASEURL: _FLUENT_FORMIO_BASEURL,
        FAST_CONFIG_ID: _FAST_CONFIG_ID,
        FAST_CONFIG_URL: _FAST_CONFIG_URL,
        OFFLINE_START: _OFFLINE_START
      };
    }
  }
})();

export default Fluent;
