import flatten from 'flat';
import _forEach from 'lodash/forEach';
import i18n from './i18n.js';
import _isString from 'lodash/isString';
import _forOwn from 'lodash/forOwn';
import _get from 'lodash/get';
import _clone from 'lodash/clone';

let Format = (() => {
  function reCalculateValues (data, components) {
    data.forEach((d) => {
      d = d.data;
      // Check all components having calculated values
      components.forEach((c) => {
        if (c.calculateValue) {
          /* eslint-disable */
          let newFx = Function('data', 'value', c.calculateValue + '; return value;');
          /* eslint-enable */
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

  function eachComponent (components, fn, includeAll, path, parent) {
    if (!components) return;
    path = path || '';
    components.forEach((component) => {
      const hasColumns = component.columns && Array.isArray(component.columns);
      const hasRows = component.rows && Array.isArray(component.rows);
      const hasComps = component.components && Array.isArray(component.components);
      let noRecurse = false;
      const newPath = component.key ? (path ? `${path}.${component.key}` : component.key) : '';

      // Keep track of parent references.
      if (parent) {
        // Ensure we don't create infinite JSON structures.
        component.parent = _clone(parent);
        delete component.parent.components;
        delete component.parent.componentMap;
        delete component.parent.columns;
        delete component.parent.rows;
      }

      if (includeAll || component.tree || (!hasColumns && !hasRows && !hasComps)) {
        noRecurse = fn(component, newPath);
      }

      const subPath = () => {
        if (component.key && (['datagrid', 'container', 'editgrid'].includes(component.type) || component.tree)) {
          return newPath;
        } else if (component.key && component.type === 'form') {
          return `${newPath}.data`;
        }
        return path;
      };

      if (!noRecurse) {
        if (hasColumns) {
          component.columns.forEach((column) =>
            eachComponent(column.components, fn, includeAll, subPath(), parent ? component : null)
          );
        } else if (hasRows) {
          component.rows.forEach((row) =>
            row.forEach((column) =>
              eachComponent(column.components, fn, includeAll, subPath(), parent ? component : null)
            )
          );
        } else if (hasComps) {
          eachComponent(component.components, fn, includeAll, subPath(), parent ? component : null);
        }
      }
    });
  }
  function matchComponent (component, query) {
    if (_isString(query)) {
      return component.key === query;
    }
    let matches = false;

    _forOwn(query, (value, key) => {
      matches = _get(component, key) === value;
      if (!matches) {
        return false;
      }
      return matches;
    });
    return matches;
  }
  function findComponents (components, query) {
    const results = [];

    eachComponent(
      components,
      (component, path) => {
        if (matchComponent(component, query)) {
          component.path = path;
          results.push(component);
        }
      },
      true
    );
    return results;
  }
  /**
   *
   * @param {String} output
   * @param {Array} data
   * @param {Object} formioForm
   * @param {Object} i18n
   */
  function submission ({ data, formioForm, translations, language }) {
    let i = i18n.init(translations);

    i.changeLanguage(language);

    let json = [];
    let labels = [];

    let components = findComponents(formioForm.components, {
      input: true
    });

    data = reCalculateValues(data, components);

    if (!formioForm) {
      _forEach(data, function (submission) {
        delete submission.owner;
        json.push(flatten(submission));
      });
      return { data: json };
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

    return { data: json, labels: labels };
  }

  return Object.freeze({
    submission
  });
})();

export default Format;
