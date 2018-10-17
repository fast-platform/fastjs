import Configuration from './models/Configuration';
import Form from './models/Form';
import Translation from './models/Translation';
import Pages from './models/Pages';
import SyncInterval from './repositories/Database/SyncInterval';
import Roles from './models/Role';
import externalConf from 'config';
/* eslint-disable no-unused-vars */
let FAST = (() => {
  /**
   * Loads all configuration for the FAST app
   * This is the main start function and mandatory
   * to execute if you will use it!
   *
   * @param {*} conf
   * @param {*} conf.appConf Configuration of the App
   */
  async function start ({ appConf, forceOnline }) {
    externalConf.set({
      FLUENT_FORMIO_BASEURL: appConf.fluentFormioBaseUrl,
      FAST_CONFIG_ID: appConf.appConfigId,
      FAST_CONFIG_URL: appConf.appConfigUrl,
      OFFLINE_START: appConf.offlineStart
    });

    if (!forceOnline) {
      SyncInterval.set(3000);
    }

    let config = await Configuration.set({ appConf, forceOnline });

    await Roles.set({ appConf, forceOnline });

    await Pages.set({ appConf, forceOnline });

    await Form.set({ appConf, forceOnline });

    let appTranslations = await Translation.set({ appConf, forceOnline });

    /*
    let currentConf = await Configuration.getLocal();

    let date = _get(currentConf, 'meta.formsLastUpdated', 1);
    let isOnline = await Connection.isOnline();

    if (isOnline) {
      try {
        let data = await Formio.request(
          config.APP_URL + '/form?modified__gt=' + new Date(date * 1000).toISOString() + '&select=path',
          'GET'
        );

        Configuration.setLastUpdated({ element: 'Forms', data });
        let shouldUpdate = data.some((form) => {
          return form.path === 'userregister';
        });

        if (shouldUpdate) {
          Form.update({
            filter: [{ element: 'path', query: '=', value: 'userregister' }]
          });
        }
      } catch (error) {
        console.log('error', error);
      }
    }
    */

    return {
      config: config,
      translations: appTranslations,
      defaultLanguage: localStorage.getItem('defaultLenguage') || 'en'
    };
  }
  /**
   *
   * Triggers a full Online update of all Configuration,
   * Forms, Pages and Roles of the application.
   *
   * @param {Object} conf
   * @param {Object} conf.appConf Configuration of the App
   * @returns
   */
  async function sync ({ appConf }) {
    return start({ appConf, forceOnline: true });
  }

  return Object.freeze({
    start,
    sync
  });
})();

export default FAST;
