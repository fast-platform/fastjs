import Utilities from 'utilities';
import Model from '../Fluent/Model';
import Fluent from '../Fluent/Fluent';
import Configuration from './Configuration';
import moment from 'moment';

export default Fluent.extend(Model, {
  properties: {
    name: 'Translation',
    remoteConnection: {
      baseUrl: process.env.FLUENT_FORMIO_BASEURL || 'https://myFluentBaseUrl.com/',
      path: 'translations',
      token: undefined
    }
  },
  methods: {
    async getFormTranslations () {
      let i18n = {};

      let localTranslations = await this.local().first();

      localTranslations = Utilities.get(() => localTranslations.data, {});

      Object.keys(localTranslations).forEach((languageCode) => {
        if (languageCode !== 'type') {
          i18n[languageCode] = localTranslations[languageCode];
        }
      });
      return i18n;
    },
    /**
     *
     */
    async supportedLanguages () {
      let translations = await this.local().get();

      if (translations.length === 0) {
        return [];
      }

      let isoLanguages = this.getIsoLanguages();
      let languages = [];

      translations = Utilities.get(() => translations[0].data, []);

      Object.keys(translations).forEach((languageCode) => {
        let iso = isoLanguages.find((l) => {
          return l.code === languageCode;
        });

        if (iso) {
          languages.push(iso);
        }
      });

      languages = languages.sort((a, b) => {
        a = a.label;
        b = b.label;
        return a > b ? 1 : a < b ? -1 : 0;
      });
      return languages;
    },
    /**
     *
     */
    getIsoLanguages () {
      return require('resources/isoLanguages.json');
    },
    /**
     *
     * @param {*} localTranslations
     */
    getLocalizationDate (localTranslations) {
      return Utilities.get(() => localTranslations[0].fastUpdated, 0);
    },
    /**
     * [authenticate description]
     * @param  {[type]} username [description]
     * @param  {[type]} password [description]
     * @return {[type]}          [description]
     */
    async set ({ appConf, forceOnline }) {
      if (appConf.offlineStart === 'true' && !forceOnline) {
        return this.setOffline({ appConf });
      }
      return this.setOnline({ appConf });
    },
    /**
     *
     * @param {*} param0
     */
    async setOffline ({ appConf }) {
      let localTranslations = await this.local().get();
      let localDate = this.getLocalizationDate(localTranslations);
      let config = await Configuration.local().first();
      let offlineTranslations = appConf.offlineFiles.Translations;

      // If the offline Json is older than the local data
      if (config.fastUpdated < localDate) {
        return localTranslations[0].data;
      }
      let trans = await this.process(offlineTranslations);

      return this.storeTranslations(trans);
    },
    /**
     *
     * @param {*} param0
     */
    async setOnline ({ appConf }) {
      let localTranslations = await this.local().get();
      let appTranslations = await this.remote()
        .limit(50000)
        .get();

      if (appTranslations) {
        appTranslations = await this.process(appTranslations);
        appTranslations = await this.storeTranslations(appTranslations);
        return appTranslations;
      }

      if (localTranslations.length > 0 && localTranslations[0].data) {
        return localTranslations[0].data;
      }
    },
    /**
     *
     * @param {*} translationsArray
     */
    async storeTranslations (translationsArray) {
      // Remove all previous translations
      this.local().clear({ sure: true });

      // Insert the new ones
      let appTranslations = await this.local().insert({
        data: translationsArray,
        fastUpdated: moment().unix()
      });

      return appTranslations.data;
    },
    /**
     * [setTranslations description]
     * @param {[type]} appTranslations [description]
     */
    async process (translations) {
      let lenguages = this.getIsoLanguages();
      let result = {};

      result.label = {};
      // Foreach of the locale lenguages, set the translations
      lenguages.forEach((language) => {
        translations.forEach((translation, index) => {
          if (translation.data && translation.data[language.code]) {
            if (!result[language.code]) {
              result[language.code] = {};
            }
            result[language.code][translation.data.label] = translation.data[language.code];
          }

          if (translation.data && translation.data.label) {
            result['label'][translation.data.label] = translation.data.label;
          }
        });
      });

      return result;
    },

    async setTranslations (translations) {
      let trans = await this.remote()
        .where('data.label', '=', translations.label)
        .first();

      let id = trans._id;

      let result = await this.remote().update({
        _id: id,
        data: translations
      });

      return result;
    },

    async createTranslation (label) {
      return this.remote().insert({
        data: {
          en: label,
          label: label
        }
      });
    }
  }
})();
