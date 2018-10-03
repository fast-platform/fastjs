import baseModel from './baseModelFactory';
import Utilities from 'utilities';
let Translation = (args) => {
  var baseModel = args.baseModel;

  function getOwnName () {
    return 'Translation';
  }
  function getFormPath () {
    return 'translations';
  }

  async function getFormTranslations () {
    let i18n = {};

    let localTranslations = await Translation.local().findOne();

    localTranslations = Utilities.get(() => localTranslations.data, {});

    Object.keys(localTranslations).forEach((languageCode) => {
      if (languageCode !== 'type') {
        i18n[languageCode] = localTranslations[languageCode];
      }
    });
    return i18n;
  }
  /**
   *
   */
  async function supportedLanguages () {
    let translations = await Translation.local().find();

    if (translations.length === 0) {
      return [];
    }

    let isoLanguages = Translation.getIsoLanguages();
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
  }

  /**
   *
   */
  function getIsoLanguages () {
    let languages = require('database/resources/isoLanguages.json');

    return languages;
  }
  return Object.freeze(
    Object.assign({}, baseModel, {
      getOwnName,
      getFormPath,
      getFormTranslations,
      supportedLanguages,
      getIsoLanguages
    })
  );
};

Translation = Translation({
  baseModel: baseModel()
});

export default Translation;
