/* global describe, it, before */
import 'babel-polyfill';
import chai from 'chai';
import FAST from '../../src/start.js';
import TRANSLATIONS from '../resources/Localizations/appTranslations';
import { CONFIG_URL, APP_CONFIG_ID, OFFLINE_START } from '../env';
chai.expect();

const expect = chai.expect;
let fast;

let appConf = {
  type: 'remote',
  appConfigId: APP_CONFIG_ID,
  appConfigUrl: CONFIG_URL,
  i18n: TRANSLATIONS,
  offlineStart: OFFLINE_START,
  offlineFiles: {
    Configuration: require('../resources/offline/Configuration.json'),
    Roles: require('../resources/offline/Roles.json'),
    lastUpdated: require('../resources/offline/lastUpdate.json'),
    Translations: require('../resources/offline/Translations.json'),
    Pages: require('../resources/offline/Pages.json'),
    Forms: require('../resources/offline/Forms.json')
  }
};

describe('Given FAST start', () => {
  before(async () => {
    fast = await FAST.start({ appConf });
  });

  it('Should return the formatted configuration', () => {
    console.log(fast);
    expect(false);
  });
});
