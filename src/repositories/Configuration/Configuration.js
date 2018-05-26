import Connection from 'Wrappers/Connection';
import CONFIGURATION from 'database/models/Configuration';
import _get from 'lodash/get';

let Configuration = (() => {
  /* eslint-disable no-unused-vars */
  function assingGlobalVariable (VUE, configuration) {
    if (VUE && VUE.prototype) {
      VUE.prototype.$FAST_CONFIG = configuration;
    } else if (VUE) {
      VUE.$FAST_CONFIG = configuration;
    }
  }

  async function set ({ Vue, appConf }) {
    let localConfig, remoteConfig;

    localConfig = await CONFIGURATION.local().find();
    localConfig = _get(localConfig, '[0]', undefined);

    if (Connection.isOnline()) {
      try {
        remoteConfig = await CONFIGURATION.remote().find({
          filter: [{ element: '_id', query: '=', value: appConf.appConfigId }],
          limit: 1
        });
      } catch (error) {
        throw new Error(error);
      }
    }
    remoteConfig = _get(remoteConfig, '[0].data', undefined);

    if (!localConfig && !remoteConfig) {
      throw new Error('Application is not connected to internet, or the configuration file cannot be pulled');
    }

    if (!remoteConfig) {
      assingGlobalVariable(Vue, localConfig);
      return localConfig;
    }

    if (localConfig) {
      await CONFIGURATION.local().remove(localConfig);
    }
    let insertedConfig = await CONFIGURATION.local().insert(remoteConfig);
    // Create Global Vue variable

    assingGlobalVariable(Vue, insertedConfig);
    return insertedConfig;
  }

  async function getLocal () {
    let configuration = await CONFIGURATION.local().find();

    return _get(configuration, '[0]', {});
  }

  return Object.freeze({
    set,
    getLocal
  });
})();

export default Configuration;
