import Utilities from 'utilities';
import Model from '../Fluent/Model';
import Fluent from '../Fluent/Fluent';

export default Fluent.extend(Model, {
  properties: {
    name: 'Translation',
    path: 'translations'
  },
  methods: {
    async getFormTranslations () {
      let i18n = {};

      let localTranslations = await this.local().findOne();

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
      let translations = await this.local().find();

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
      return require('database/resources/isoLanguages.json');
    }
  }
})();
