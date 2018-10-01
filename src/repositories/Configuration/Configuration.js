import Connection from 'Wrappers/Connection';
import CONFIGURATION from 'database/models/Configuration';
import _get from 'lodash/get';
import moment from 'moment';

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

    return _get(configuration, '0', undefined);
  }

  async function getRemote (appConf) {
    let remoteConfig;
    let isOnline = await Connection.isOnline();

    if (isOnline) {
      try {
        remoteConfig = await CONFIGURATION.remote().find({
          filter: [{ element: '_id', query: '=', value: appConf.appConfigId }],
          limit: 1
        });
      } catch (error) {
        console.log('error', error);
      }
    }
    return _get(remoteConfig, '[0].data', undefined);
  }

  function getConfigDate (localConfig) {
    return _get(localConfig, 'fastUpdated', 0);
  }

  async function setOfflineConfig ({ Vue, appConf }) {
    let localConfig = await getLocal();

    let localConfigDate = getConfigDate(localConfig);
    let offlineConfigDate = appConf.offlineFiles.lastUpdated.date;

    if (offlineConfigDate > localConfigDate) {
      let offlineConfig = {
        ...appConf.offlineFiles.Configuration.data,
        fastUpdated: moment().unix()
      };

      if (localConfig) {
        await CONFIGURATION.local().clear();
      }

      let insertedConfig = await CONFIGURATION.local().insert(offlineConfig);

      assingGlobalVariable(Vue, insertedConfig);
      return insertedConfig;
    }
    assingGlobalVariable(Vue, localConfig);
    return localConfig;
  }

  async function setOnlineConfig ({ Vue, appConf }) {
    let localConfig = await getLocal();

    let remoteConfig = await getRemote(appConf);

    if (!localConfig && !remoteConfig) {
      throw new Error('Application is not connected to internet, or the configuration file cannot be pulled');
    }

    if (!remoteConfig) {
      assingGlobalVariable(Vue, localConfig);
      return localConfig;
    }

    remoteConfig.fastUpdated = moment().unix();

    if (localConfig) {
      await CONFIGURATION.local().clear();
    }

    let insertedConfig = await CONFIGURATION.local().insert(remoteConfig);

    assingGlobalVariable(Vue, insertedConfig);
    return insertedConfig;
  }

  async function set ({ Vue, appConf, forceOnline }) {
    if (String(appConf.offlineStart) === 'true' && !forceOnline) {
      return setOfflineConfig({ Vue, appConf });
    }
    return setOnlineConfig({ Vue, appConf });
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

    return localConfig;
  }

  return Object.freeze({
    set,
    getLocal,
    setLastUpdated
  });
})();

export default Configuration;
