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

  async function getLocal () {
    let configuration = await CONFIGURATION.local().find();

    return _get(configuration, '[0]', undefined);
  }

  async function getRemote (appConf) {
    let remoteConfig;

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
    return _get(remoteConfig, '[0].data', undefined);
  }

  async function set ({ Vue, appConf }) {
    let localConfig, remoteConfig;

    localConfig = await getLocal();
    remoteConfig = await getRemote(appConf);

    if (!localConfig && !remoteConfig) {
      throw new Error('Application is not connected to internet, or the configuration file cannot be pulled');
    }

    if (!remoteConfig) {
      assingGlobalVariable(Vue, localConfig);
      return localConfig;
    }

    remoteConfig.meta = localConfig && localConfig.meta ? localConfig.meta : {};

    if (localConfig) {
      await CONFIGURATION.local().remove(localConfig);
    }
    let insertedConfig = await CONFIGURATION.local().insert(remoteConfig);

    assingGlobalVariable(Vue, insertedConfig);
    return insertedConfig;
  }

  async function setLastUpdated ({ element, data }) {
    if (
      !['Form', 'Pages', 'register', 'Forms'].some((el) => {
        return el === element;
      })
    ) {
      throw new Error('The element provided must be "Form" or "Pages"');
    }
    let localConfig = await getLocal();

    localConfig.meta = localConfig.meta ? localConfig.meta : {};
    switch (element) {
      case 'Form':
        localConfig.meta.formsLastUpdated = Math.round(new Date().getTime() / 1000);
        break;
      case 'register':
        localConfig.meta.registerLastUpdated = Math.round(new Date().getTime() / 1000);
        break;
      case 'Pages':
        localConfig.meta.pagesLastUpdated = Math.round(new Date().getTime() / 1000);
        break;
      case 'Forms':
        localConfig.meta.needUpdateForms = data;
        break;
      default:
        break;
    }

    let updated = await CONFIGURATION.local().update(localConfig);

    return updated;
  }

  return Object.freeze({
    set,
    getLocal,
    setLastUpdated
  });
})();

export default Configuration;
