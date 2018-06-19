import Configuration from 'repositories/Configuration/Configuration';
import Event from './Wrappers/Event';
import Form from './repositories/Form/RemoteForms';
import Localization from './repositories/Localization/Localization';
import Pages from './repositories/Configuration/Pages';
import SyncInterval from './repositories/Database/SyncInterval';
import fastConfig from './config';
import to from 'await-to-js';
import Roles from 'repositories/Auth/Role';
import Formio from 'formiojs';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import Connection from './Wrappers/Connection';
/* eslint-disable no-unused-vars */
let FAST = (() => {
  async function loadRemainingConfig ({ interval = true }) {
    let pages, err;

    Event.emit({
      name: 'FAST:APPLICATION:LOADING',
      data: {},
      text: 'The application is loading'
    });
    [err, pages] = await to(Pages.set());
    if (err) {
      let e = 'The pages could not be retrieve from source';

      console.log(e, err);
    }
    let currentConf = await Configuration.getLocal();

    let shouldUpdate = !_isEmpty(currentConf.meta.needUpdateForms);

    if (shouldUpdate) {
      await Form.update();
    }

    if (interval) {
      SyncInterval.set(2000);
    }
    let info = {
      pages: pages,
      defaultLenguage: localStorage.getItem('defaultLenguage') || 'en'
    };

    Event.emit({
      name: 'FAST:APPLICATION:LOADED',
      data: info,
      text: 'The application is fully loaded'
    });
    return info;
  }

  async function sync ({ interval = true, appConf }) {
    let pages, err;
    // Pull the configuration
    let config = await Configuration.set({ appConf });

    // Change the Base URL for all the other calls
    fastConfig.setBaseUrl(config.APP_URL);

    [err, pages] = await to(Pages.set());
    if (err) {
      let e = 'The pages could not be retrieve from source';

      console.log(e, err);
    }
    let appTranslations = await Localization.setLocales();

    await Form.update();

    if (interval) {
      SyncInterval.set(2000);
    }
    return {
      translations: appTranslations,
      pages: pages,
      defaultLenguage: localStorage.getItem('defaultLenguage') || 'en',
      config: config
    };
  }

  async function start ({ Vue, interval = true, appConf }) {
    let pages, err;

    fastConfig.set({
      baseURL: appConf.appConfigUrl,
      submissionId: appConf.appConfigId,
      i18n: appConf.i18n
    });

    // Pull the configuration
    let config = await Configuration.set({ Vue, appConf });

    // Change the Base URL for all the other calls
    fastConfig.setBaseUrl(config.APP_URL);

    Roles.set(config.APP_URL);

    let currentConf = await Configuration.getLocal();

    let date = _get(currentConf, 'meta.formsLastUpdated', 1);

    if (Connection.isOnline()) {
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
    }

    let appTranslations = await Localization.setLocales();

    return {
      config: config,
      translations: appTranslations,
      defaultLanguage: localStorage.getItem('defaultLenguage') || 'en'
    };
  }

  return Object.freeze({
    start,
    sync,
    loadRemainingConfig
  });
})();

export default FAST;
