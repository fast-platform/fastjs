import FormioJS from 'formiojs/Formio';
import Auth from 'repositories/Auth/Auth';
import Config from 'database/models/Configuration';

let RemoteSubmission = class {
  constructor (formPath) {
    this.formPath = formPath;
  }

  async find ({ filter, limit, select, pagination }) {
    let formio = await this.getFormioInstance();
    let queryParams = {
      limit: limit
    };

    if (filter) {
      let filterQuery = this.filterToString(filter);

      queryParams = { ...queryParams, ...filterQuery };
    }

    if (select) {
      let selectQuery = this.selectToString(select);

      queryParams = { ...queryParams, ...selectQuery };
    }

    let remoteSubmissions = await formio.loadSubmissions({
      params: queryParams
    });

    return remoteSubmissions;
  }

  async save ({ submission }) {
    FormioJS.deregisterPlugin('offline');
    let formio = await this.getFormioInstance(submission._id);

    return formio.saveSubmission(submission);
  }

  async getFormioInstance (submissionID) {
    FormioJS.setToken(Auth.user().x_jwt_token);
    FormioJS.clearCache();
    // Get the base URL
    let formUrl = await Config.getLocal();
    // Get ID of the Form

    formUrl = formUrl.APP_URL + '/' + this.formPath;
    // Set URL in case of submission context
    formUrl = submissionID ? formUrl + 'submission/' + submissionID : formUrl;
    return new FormioJS(formUrl);
  }

  filterToString (filter) {
    if (!filter) {
      return;
    }
    // Condition {element: '_id', query: 'in', value: ''}
    let filterQuery = {};

    filter.forEach((condition) => {
      let valueString = '';

      switch (condition.query) {
        case '=':
          filterQuery[condition.element] = condition.value;
          break;
        case '!=':
          filterQuery[condition.element + '__ne'] = condition.value;
          break;
        case '>':
          filterQuery[condition.element + '__gt'] = condition.value;
          break;
        case '>=':
          filterQuery[condition.element + '__gte'] = condition.value;
          break;
        case '<':
          filterQuery[condition.element + '__lt'] = condition.value;
          break;
        case '<=':
          filterQuery[condition.element + '__lte'] = condition.value;
          break;
        case 'in':
          valueString = '';
          condition.value.forEach((value, index, array) => {
            valueString = index === array.length - 1 ? valueString + value : valueString + value + ',';
          });
          filterQuery[condition.element + '__in'] = valueString;
          break;
        case 'nin':
          valueString = '';
          condition.value.forEach((value, index, array) => {
            valueString = index === array.length - 1 ? valueString + value : valueString + value + ',';
          });
          filterQuery[condition.element + '__nin'] = valueString;
          break;
        case 'exists':
          filterQuery[condition.element + '__exists'] = true;
          break;
        case '!exists':
          filterQuery[condition.element + '__exists'] = false;
          break;
        case 'regex':
          filterQuery[condition.element + '__regex'] = condition.value;
          break;
      }
    });
    return filterQuery;
  }

  selectToString (select) {
    if (!select) {
      return;
    }
    let selectString = select.reduce((reducer, column) => {
      reducer = reducer + ',' + column;
      return reducer;
    }, '_id');

    return { select: selectString };
  }
};

export default RemoteSubmission;
