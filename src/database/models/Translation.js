import _forEach from 'lodash/forEach';
import _orderBy from 'lodash/orderBy';
import _find from 'lodash/find';
import baseModel from './baseModelFactory';

let Translation = (args) => {
  var baseModel = args.baseModel;

  function getOwnName () {
    return 'Translation';
  }
  function getFormPath () {
    return 'translations';
  }

  async function getFormTranslations () {
    let formTranslations = {
      i18n: {}
    };

    let localTranslations = await Translation.local().findOne();

    localTranslations = localTranslations && localTranslations.data ? localTranslations.data : {};

    _forEach(localTranslations, (lenguage, index) => {
      if (index !== 'type') {
        formTranslations.i18n[index] = lenguage;
      }
    });

    return formTranslations;
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

    _forEach(translations[0].data, (language, code) => {
      let iso = _find(isoLanguages, {
        code: code
      });

      if (iso) {
        languages.push(iso);
      }
    });
    languages = _orderBy(languages, ['label'], ['asc']);
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
