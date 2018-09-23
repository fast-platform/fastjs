import FormioUtils from 'formiojs/utils';
import _forEach from 'lodash/forEach';
// import _isEmpty from 'lodash/isEmpty';
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
  static async handle () {
    let labels = await this.fetchAllLabels();

    let translations = (await Translation.local().find())[0].data;

    Object.keys(translations).forEach(function (languageCode) {
      let translationsLabels = translations[languageCode];

      Object.keys(translationsLabels).forEach(function (translationLabel) {
        if (
          labels[translationLabel] &&
          translationsLabels[translationLabel] &&
          translationsLabels[translationLabel] !== ''
        ) {
          labels[translationLabel].translations[languageCode] = translationsLabels[translationLabel];
        }
      });
    });

    return labels;
  }

  static async fetchAllLabels () {
    let allLabels = {};

    let forms = (await Form.local().find()).map((form) => {
      return form.data;
    });

    let formLabels = this.getFormLabels(forms);

    let appLabels = await this.getAppLabels(config.get().translations);

    allLabels = this.mergeLabels(formLabels, appLabels);

    let pagesLabels = await this.getPagesLabels(await Pages.getLocal());

    allLabels = this.mergeLabels(allLabels, pagesLabels);

    return allLabels;
  }
  /**
   * Given an Object with text labels and a label Object
   * to add it checks if it already exists or
   * creates it if needed
   * @param {Object} labels
   * @param {Object} label
   */
  static createOrAdd ({ labels, label }) {
    let newObject = { ...labels };

    // If the label already exists
    if (newObject[label.text]) {
      // If the location is an Array of Locations
      if (label.location && Array.isArray(label.location)) {
        label.location.forEach((l) => {
          newObject[label.text].location.push({
            text: label.text,
            template: label.template,
            type: l.type,
            picture: l.picture
          });
        });
      } else {
        newObject[label.text].location.push(label);
      }
    } else {
      if (label.location && Array.isArray(label.location)) {
        newObject[label.text] = {
          location: [],
          template: label.template,
          translations: {}
        };
        label.location.forEach((l) => {
          newObject[label.text].location.push({
            text: label.text,
            template: label.template,
            type: l.type,
            picture: l.picture
          });
        });
      } else {
        newObject[label.text] = {
          location: [label],
          translations: {}
        };
      }
    }
    return newObject;
  }
  static mergeLabels (labelsObject1, labelsObject2) {
    let merged = { ...labelsObject1 };

    Object.keys(labelsObject2).forEach((key) => {
      merged = this.createOrAdd({
        labels: merged,
        label: {
          ...labelsObject2[key],
          text: key
        }
      });
    });
    return merged;
  }
  /**
   * Extracts all labels that could potentially
   * be translated from the Form.io forms
   * @param {Array} Forms
   */
  static getFormLabels (Forms) {
    let componentLabels = {};
    // Extranct all labels for all available forms

    let formioLabelsPositions = [
      'suffix',
      'prefix',
      'addAnother',
      'removeRow',
      'saveRow',
      'legend',
      'title',
      'label',
      'placeholder',
      'tooltip'
    ];

    Forms.forEach((form) => {
      // Add title of the Forms to the translations
      componentLabels = this.createOrAdd({
        labels: componentLabels,
        label: {
          text: form.title,
          type: 'formTitle',
          component: form,
          form: form,
          picture: null
        }
      });
      // Go across every component
      FormioUtils.eachComponent(
        form.components,
        (component) => {
          // Check for the common translated Items listed above
          formioLabelsPositions.forEach((position) => {
            if (component[position] && component[position] !== '') {
              // Add the Label if is not empty
              componentLabels = this.createOrAdd({
                labels: componentLabels,
                label: {
                  text: component[position],
                  type: position,
                  component: component,
                  form: form,
                  picture: null
                }
              });
            }
          });

          // Check for components that have values with labels (i.e: radio)
          if (component.values) {
            _forEach(component.values, (value) => {
              if (value.label && value.label !== '') {
                componentLabels = this.createOrAdd({
                  labels: componentLabels,
                  label: {
                    text: value.label,
                    type: 'value',
                    component: component,
                    form: form,
                    picture: null
                  }
                });
              }
            });
          }

          // Check for HTML tag elements in the forms
          if (component.type === 'htmlelement' && component.content !== '') {
            componentLabels = this.createOrAdd({
              labels: componentLabels,
              label: {
                text: component.content,
                type: 'htmlElement',
                component: component,
                form: form,
                picture: null
              }
            });
          }

          // Check specificaly for select elements
          if (component.type === 'select') {
            if (component.data && component.data.values) {
              _forEach(component.data.values, (value) => {
                if (value.label && value.label !== '') {
                  componentLabels = this.createOrAdd({
                    labels: componentLabels,
                    label: {
                      text: value.label,
                      type: 'selectValue',
                      component: component,
                      form: form,
                      picture: null
                    }
                  });
                }
              });
            }
          }

          // Check for survey elements
          if (component.type && component.type === 'survey') {
            if (component.questions) {
              // Check for every question on the survey
              component.questions.forEach((q) => {
                componentLabels = this.createOrAdd({
                  labels: componentLabels,
                  label: {
                    text: q.label,
                    type: 'surveyLabel',
                    component: component,
                    form: form,
                    picture: null
                  }
                });
              });
              // Check every text of the answers
              component.values.forEach((v) => {
                componentLabels.push(v.label);
                componentLabels = this.createOrAdd({
                  labels: componentLabels,
                  label: {
                    text: v.label,
                    type: 'surveyValues',
                    component: component,
                    form: form,
                    picture: null
                  }
                });
              });
            }
          }
        },
        true
      );
    });

    return componentLabels;
  }
  /**
   *  Creates the Labels Object for the
   *  App translations
   * @param {Array} appLabels
   */
  static async getAppLabels (appLabels) {
    let translations = {};

    appLabels.forEach((l) => {
      translations = this.createOrAdd({
        labels: translations,
        label: l
      });
    });

    return translations;
  }
  /**
   *  Creates the Labels Object for the
   *  App Pages
   * @param {Array} appLabels
   */
  static async getPagesLabels (Pages) {
    let pagesLabels = {};

    Pages.pages.forEach((page) => {
      page.cards.forEach((card) => {
        if (card.title && card.title !== '') {
          this.createOrAdd({
            labels: pagesLabels,
            label: {
              text: card.title,
              type: 'pageCardTitle',
              picture: null,
              card: card,
              page: page
            }
          });
        }

        if (card.subtitle && card.subtitle !== '') {
          this.createOrAdd({
            labels: pagesLabels,
            label: {
              text: card.subtitle,
              type: 'pageCardSubtitle',
              picture: null,
              card: card,
              page: page
            }
          });
        }

        card.actions.forEach((action) => {
          if (action.text && action.text !== '') {
            this.createOrAdd({
              labels: pagesLabels,
              label: {
                text: action.text,
                type: 'pageActionButtonText',
                picture: null,
                card: card,
                page: page
              }
            });
          }
        });
      });
      if (page.title && page.title !== '') {
        this.createOrAdd({
          labels: pagesLabels,
          label: {
            text: page.title,
            type: 'pageTitle',
            picture: null,
            page: page
          }
        });
      }
    });

    return pagesLabels;
  }
}
export default FormLabels;
