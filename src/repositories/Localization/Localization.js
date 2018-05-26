import _forEach from 'lodash/forEach';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import Translation from 'database/models/Translation';
import _assign from 'lodash/assign';

const Localization = class {
  /**
   * [authenticate description]
   * @param  {[type]} username [description]
   * @param  {[type]} password [description]
   * @return {[type]}          [description]
   */
  static async setLocales () {
    let localTranslations = await Translation.local().find();
    let appTranslations = await Localization.getTranslations();

    if (appTranslations) {
      return appTranslations;
    }

    if (localTranslations.length > 0 && localTranslations[0].data) {
      return localTranslations[0].data;
    }
  }

  /**
   * [setTranslations description]
   * @param {[type]} appTranslations [description]
   */
  static async getTranslations () {
    let appTranslations = [];

    if (navigator.onLine) {
      try {
        // Fetch the Translation that are online
        let onlineTranslations = await Translation.remote().find({ limit: 50000 });

        if (onlineTranslations.length === 0) {
          return [];
        }
        let lenguages = Translation.local().getIsoLanguages();
        let localTranslations = {};

        localTranslations.label = {};
        // Foreach of the locale lenguages, set the translations
        _forEach(lenguages, (language) => {
          _forEach(onlineTranslations, (translation, index) => {
            if (translation.data && translation.data[language.code]) {
              if (!localTranslations[language.code]) {
                localTranslations[language.code] = {};
              }
              localTranslations[language.code][translation.data.label] = translation.data[language.code];
            }

            if (translation.data && translation.data.label) {
              localTranslations['label'][translation.data.label] = translation.data.label;
            }
          });
        });

        _map(localTranslations, (language, index) => {
          if (!_isEmpty(language.translations)) {
            localTranslations[language.code] = language.translations;
          } else {
            delete localTranslations[language.code];
          }
        });

        // Remove all previous translations
        Translation.local().findAndRemove();

        // Insert the new ones
        appTranslations = await Translation.local().insert({
          data: localTranslations
        });

        appTranslations = appTranslations.data;
        return appTranslations;
      } catch (error) {
        console.log('Error while getting translations');
      }
    } else {
      return undefined;
    }
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

  static async setTranslations (label, translations) {
    let trans = await Translation.remote().find({
      filter: [{ element: 'data.label', query: '=', value: label }]
    });
    let id = trans[0]._id;
    let mergedTranslations = _assign(trans[0].data, translations);
    let result = await Translation.remote().update({
      _id: id,
      data: mergedTranslations
    });

    return result;
  }
};

export default Localization;
