import Translation from 'database/models/Translation';
import Configuration from '../../database/models/Configuration';
import moment from 'moment';
import Utilities from 'utilities';

const Localization = class {
  static getLocalizationDate (localTranslations) {
    return Utilities.get(() => localTranslations[0].fastUpdated, 0);
  }
  static async setOfflineLocales ({ appConf }) {
    let localTranslations = await Translation.local().find();
    let localDate = Localization.getLocalizationDate(localTranslations);
    let config = await Configuration.getLocal();
    let offlineTranslations = appConf.offlineFiles.Translations;

    if (config.fastUpdated >= localDate) {
      let trans = await Localization.processTranslations(offlineTranslations);

      return Localization.storeTranslations(trans);
    }
    return localTranslations[0].data;
  }

  static async setOnlineLocales ({ appConf }) {
    let localTranslations = await Translation.local().find();
    let appTranslations = await Localization.getOnlineTranslations();

    if (appTranslations) {
      appTranslations = await Localization.processTranslations(appTranslations);
      appTranslations = await Localization.storeTranslations(appTranslations);
      return appTranslations;
    }

    if (localTranslations.length > 0 && localTranslations[0].data) {
      return localTranslations[0].data;
    }
  }
  /**
   * [authenticate description]
   * @param  {[type]} username [description]
   * @param  {[type]} password [description]
   * @return {[type]}          [description]
   */
  static async set ({ appConf, forceOnline }) {
    if (appConf.offlineStart === 'true' && !forceOnline) {
      return this.setOfflineLocales({ appConf });
    }
    return this.setOnlineLocales({ appConf });
  }

  static async getOnlineTranslations () {
    if (navigator.onLine) {
      let onlineTranslations = await Translation.remote().find({ limit: 50000 });

      if (onlineTranslations.length === 0) {
        return undefined;
      }

      return onlineTranslations;
    }
  }

  static async storeTranslations (translationsArray) {
    // Remove all previous translations
    Translation.local().clear();

    // Insert the new ones
    let appTranslations = await Translation.local().insert({
      data: translationsArray,
      fastUpdated: moment().unix()
    });

    return appTranslations.data;
  }
  /**
   * [setTranslations description]
   * @param {[type]} appTranslations [description]
   */
  static async processTranslations (translationArray) {
    let lenguages = Translation.local().getIsoLanguages();
    let processedTranslations = {};

    processedTranslations.label = {};
    // Foreach of the locale lenguages, set the translations
    lenguages.forEach((language) => {
      translationArray.forEach((translation, index) => {
        if (translation.data && translation.data[language.code]) {
          if (!processedTranslations[language.code]) {
            processedTranslations[language.code] = {};
          }
          processedTranslations[language.code][translation.data.label] = translation.data[language.code];
        }

        if (translation.data && translation.data.label) {
          processedTranslations['label'][translation.data.label] = translation.data.label;
        }
      });
    });

    return processedTranslations;
  }

  /**
   * [getTranslation description]
   * @return {[type]} [description]
   */
  static async createTranslation (label) {
    return Translation.remote().insert({
      data: {
        en: label,
        label: label
      }
    });
  }

  static async setTranslations (translations) {
    let trans = await Translation.remote().find({
      filter: [{ element: 'data.label', query: '=', value: translations.label }]
    });
    let id = trans[0]._id;
    let result = await Translation.remote().update({
      _id: id,
      data: translations
    });

    return result;
  }
};

export default Localization;
