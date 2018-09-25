import Configuration from 'repositories/Configuration/Configuration';
import Form from './repositories/Form/RemoteForms';
import Localization from './repositories/Localization/Localization';
import Pages from './repositories/Configuration/Pages';
import SyncInterval from './repositories/Database/SyncInterval';
import fastConfig from './config';
import Roles from 'repositories/Auth/Role';

/* eslint-disable no-unused-vars */
let FAST = (() => {
  async function sync ({ appConf }) {
    let forceOnline = true;
    // Pull the configuration
    let config = await Configuration.set({ appConf, forceOnline });

    // Change the Base URL for all the other calls
    fastConfig.setBaseUrl(config.APP_URL);

    await Roles.set({ url: config.APP_URL, appConf, forceOnline });

    await Pages.set({ appConf, forceOnline });

    await Form.set({ appConf, forceOnline });

    let appTranslations = await Localization.set({ appConf, forceOnline });

    return {
      translations: appTranslations,
      defaultLenguage: localStorage.getItem('defaultLenguage') || 'en',
      config: config
    };
  }

  async function start ({ Vue, appConf }) {
    let pages, err;

    fastConfig.set({
      baseURL: appConf.appConfigUrl,
      submissionId: appConf.appConfigId,
      i18n: appConf.i18n
    });

    SyncInterval.set(3000);

    // Pull the configuration
    let config = await Configuration.set({ Vue, appConf });

    // Change the Base URL for all the other calls
    fastConfig.setBaseUrl(config.APP_URL);

    await Roles.set({ url: config.APP_URL, appConf });

    await Pages.set({ appConf });

    await Form.set({ appConf });

    let appTranslations = await Localization.set({ appConf });

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

  return Object.freeze({
    start,
    sync
  });
})();

export default FAST;
