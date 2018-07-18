import FormioUtils from 'formiojs/utils';
import _forEach from 'lodash/forEach';
import _isEmpty from 'lodash/isEmpty';
import Translation from 'database/models/Translation';
import config from 'config';
import Form from 'database/models/Form';
import Pages from 'repositories/Configuration/Pages';
class FormLabels {
  /**
   *
   * @param {*} formNameFilter
   * @param {*} languageFilter
   */
  static async get (formNameFilter, languageFilter) {
    return this.handle(formNameFilter, languageFilter);
  }
  /**
   *
   * @param {*} formNameFilter
   * @param {*} languageFilter
   */
  static async handle (formNameFilter, languageFilter) {
    let allLanguages = require('database/resources/isoLanguages.json');

    allLanguages = allLanguages.map((o) => o.code);
    formNameFilter = formNameFilter || undefined;
    languageFilter = languageFilter || allLanguages;

    languageFilter.push('label');

    let formFilter = formNameFilter && {
      'data.title': {
        // $containsAny
        $in: formNameFilter
      }
    };
    let stats = {};

    stats.translations = {};
    stats.missingTranslations = [];
    let translations = await Translation.local().find();

    translations = translations[0].data;
    let forms = await Form.local().find({ filter: formFilter });

    let componentLabels = [];

    // Extranct all labels for all available forms
    _forEach(forms, (form) => {
      componentLabels.push(form.data.title);

      // Go across every component
      FormioUtils.eachComponent(
        form.data.components,
        (component) => {
          if (component.suffix && component.suffix !== '') {
            componentLabels.push(component.suffix);
          }
          if (component.prefix && component.prefix !== '') {
            componentLabels.push(component.prefix);
          }
          if (component.addAnother && component.addAnother !== '') {
            componentLabels.push(component.addAnother);
          }
          if (component.removeRow && component.removeRow !== '') {
            componentLabels.push(component.removeRow);
          }
          if (component.saveRow && component.saveRow !== '') {
            componentLabels.push(component.saveRow);
          }
          if (component.legend && component.legend !== '') {
            componentLabels.push(component.legend);
          }

          if (component.title && component.title !== '') {
            componentLabels.push(component.title);
          }
          // If it has a label
          if (component.label && component.label !== '') {
            componentLabels.push(component.label);
          }
          // If it has a placeholder
          if (component.placeholder && component.placeholder !== '') {
            componentLabels.push(component.placeholder);
          }
          // If it has a tooltip
          if (component.tooltip && component.tooltip !== '?' && component.tooltip !== '') {
            componentLabels.push(component.tooltip);
          }
          // If it has values that have labels (radio)
          if (component.values) {
            _forEach(component.values, (value) => {
              if (value.label && value.label !== '') {
                componentLabels.push(value.label);
              }
            });
          }
          // If it is an HTML element
          if (component.type === 'htmlelement' && component.content !== '') {
            componentLabels.push(component.content);
          }

          // If it is a select component
          if (component.type === 'select') {
            if (component.data && component.data.values) {
              _forEach(component.data.values, (value) => {
                if (value.label && value.label !== '') {
                  componentLabels.push(value.label);
                }
              });
            }
          }
          if (component.type && component.type === 'survey') {
            if (component.questions) {
              component.questions.forEach((q) => {
                componentLabels.push(q.label);
              });
              component.values.forEach((v) => {
                componentLabels.push(v.label);
              });
            }
          }
        },
        true
      );
    });
    // Include the Application translations
    if (formNameFilter.includes('Application')) {
      let translations = config.get().translations;

      componentLabels = componentLabels.concat(translations);
    }

    if (formNameFilter.includes('Pages')) {
      let pagesTranslations = await Pages.getLocal();

      pagesTranslations.pages.forEach((page) => {
        page.cards.forEach((card) => {
          if (card.title && card.title !== '') {
            componentLabels.push(card.title);
          }

          if (card.subtitle && card.subtitle !== '') {
            componentLabels.push(card.subtitle);
          }

          card.actions.forEach((action) => {
            if (action.text && action.text !== '') {
              componentLabels.push(action.text);
            }
          });
        });
        if (page.title && page.title !== '') {
          componentLabels.push(page.title);
        }
      });
    }
    // Clean duplicated labels
    let uniqueLabels = Array.from(new Set(componentLabels)).sort();

    let columnNames = [];
    let labelsArray = [];
    let labelsObject = [];

    // First column will always be the Form Label
    columnNames.push('Form Label');

    if (_isEmpty(translations)) {
      stats.missingTranslations = uniqueLabels;
    }
    // Match the labels with local translations
    _forEach(uniqueLabels, (uniqueLabel) => {
      let translation = [];
      let languages = {};

      translation.push(uniqueLabel);

      _forEach(translations, (language, lenguageCode) => {
        // Dont include if the language is not supported
        if (languageFilter.indexOf(lenguageCode) === -1) {
          return;
        }
        columnNames.push(lenguageCode);
        languages['label'] = uniqueLabel;
        if (typeof language[uniqueLabel] !== 'undefined' && language[uniqueLabel] !== '') {
          // If the language doesn't exist, create it
          if (!stats.translations[lenguageCode]) {
            stats.translations[lenguageCode] = {};
            stats.translations[lenguageCode].total = 0;
          }
          // Add 1 every time we have a translation
          stats.translations[lenguageCode].total = stats.translations[lenguageCode].total + 1;
        }
        languages[lenguageCode] = language[uniqueLabel];
        if (typeof language[uniqueLabel] === 'undefined' && lenguageCode === 'label') {
          stats.missingTranslations.push(uniqueLabel);
        }
        translation.push(language[uniqueLabel]);
      });
      labelsObject.push(languages);
      labelsArray.push(translation);
    });

    // Clean the column Names
    let uniqueColumsNames = Array.from(new Set(columnNames));

    stats.missingTranslations = Array.from(new Set(stats.missingTranslations));

    stats.totalTranslations = labelsArray.length;

    _forEach(stats.translations, (language, index) => {
      stats.translations[index].translated = stats.translations[index].total / stats.totalTranslations;
    });

    let result = {
      labels: labelsArray,
      columns: uniqueColumsNames,
      stats: stats,
      labelsObject: labelsObject
    };

    return result;
  }
}
export default FormLabels;
