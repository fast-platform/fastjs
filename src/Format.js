import flatten from 'flat';
import FormioUtils from 'formiojs/utils';
import _forEach from 'lodash/forEach';
import i18n from './i18n.js';

let Format = (() => {
  function reCalculateValues(data, components) {
    data.forEach((d) => {
      d = d.data;
      // Check all components having calculated values
      components.forEach((c) => {
        if (c.calculateValue) {
          let newFx = Function('data', 'value', c.calculateValue + '; return value;');

          try {
            d[c.path] = newFx(d);
          } catch (error) {
            // console.log("There is an error on one of your calculations", error)
          }
        }
      });
    });

    return data;
  }
  /**
   *
   * @param {String} output
   * @param {Array} data
   * @param {Object} formioForm
   * @param {Object} i18n
   */
  function submission({ output, data, formioForm, translations, language }) {
    let i = i18n.init(translations);

    i.changeLanguage(language);

    let date = new Date()
      .toJSON()
      .replace(/-/g, '_')
      .replace(/T/g, '_')
      .replace(/:/g, '_')
      .slice(0, 19);
    let json = [];
    let labels = [];

    let components = FormioUtils.findComponents(formioForm.components, {
      input: true
    });

    data = reCalculateValues(data, components);

    if (!formioForm) {
      _forEach(data, function (submission) {
        delete submission.owner;
        json.push(flatten(submission));
      });
      return { date: date, data: json };
    }

    _forEach(data, function (submission) {
      delete submission.owner;
      json.push(flatten(submission));
    });

    // Get the Labels for each one of the keys and filter only the available ones.
    labels = components.reduce((labelArray, component) => {
      if (component.path.indexOf('saveasDraft') <= -1) {
        labelArray.push({
          apiKey: component.path,
          label: i.t(component.label)
        });
      }
      return labelArray;
    }, []);

    labels.push({
      apiKey: 'ownerEmail',
      label: i.t('Owner Email')
    });

    data = output && output === 'json' ? data : json;
    return { date: date, data: data, labels: labels };
  }

  return Object.freeze({
    submission
  });
})();

export default Format;
