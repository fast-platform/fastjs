import to from 'await-to-js';
// import Utilities from 'utilities';
import axios from 'axios';
import Interface from '../../../Interface';
import compose from '@stamp/compose';

export default compose(
  Interface,
  {
    methods: {
      getUrl () {
        let baseUrl =
          this.remoteConnection && this.remoteConnection.baseUrl ? this.remoteConnection.baseUrl : undefined;
        let path = this.remoteConnection && this.remoteConnection.path ? this.remoteConnection.path : undefined;

        if (!this.remoteConnection.pullForm) {
          path = path + '/submission?';
        }

        if (!baseUrl || !path) {
          throw new Error('Cannot get remote model. BaseUrl or Path is not defined');
        }

        let url = baseUrl + path;

        return url;
      },
      getHeaders () {
        let headers = {};

        // Include Auth headers
        if (this.remoteConnection.token) {
          let type = this.getTokenType(this.remoteConnection.token);

          headers[type] = this.remoteConnection.token;
        }

        return headers;
      },
      httpCall () {
        let url = this.getUrl();
        let headers = this.getHeaders();
        let filters = this.getFilters();
        let limit = this.getLimit();
        let skip = this.getSkip();
        let select = this.getSelect();
        let spacer = '';

        if (filters) {
          spacer = url.substr(url.length - 1) === '&' ? '' : '&';
          url = url + spacer + filters;
        }

        if (limit) {
          spacer = url.substr(url.length - 1) === '&' ? '' : '&';
          url = url + spacer + limit;
        }

        if (skip) {
          spacer = url.substr(url.length - 1) === '&' ? '' : '&';
          url = url + spacer + skip;
        }

        if (select) {
          spacer = url.substr(url.length - 1) === '&' ? '' : '&';
          url = url + spacer + select;
        }

        return axios.get(url, { headers });
      },
      getTokenType (token) {
        if (token.length > 32) {
          return 'x-jwt-token';
        }
        return 'x-token';
      },
      async get () {
        let error;
        let result;

        [error, result] = await to(this.httpCall());

        if (error) {
          console.log(error);
          throw new Error('Error while getting submissions');
        }

        result = this.jsApplySelect(result.data);
        result = this.jsApplyOrderBy(result);
        return result;
      },
      getFilters () {
        let filter = this.whereArray;

        if (!filter || filter.length === 0) {
          return undefined;
        }

        let filterQuery = '';

        filter.forEach((condition) => {
          let valueString = '';
          let element = condition[0];
          let operator = condition[1];
          let value = condition[2];

          switch (operator) {
            case '=':
              filterQuery = filterQuery + element + '=' + value + '&';
              break;
            case '!=':
              filterQuery = filterQuery + element + '__ne=' + value + '&';
              break;
            case '>':
              filterQuery = filterQuery + element + '__gt=' + value + '&';
              break;
            case '>=':
              filterQuery = filterQuery + element + '__gte=' + value + '&';
              break;
            case '<':
              filterQuery = filterQuery + element + '__lt=' + value + '&';
              break;
            case '<=':
              filterQuery = filterQuery + element + '__lte=' + value + '&';
              break;
            case 'in':
              valueString = '';
              value.forEach((val, index, array) => {
                valueString = index === array.length - 1 ? valueString + val : valueString + val + ',';
              });
              filterQuery = filterQuery + element + '__in=' + valueString + '&';
              break;
            case 'nin':
              valueString = '';
              value.forEach((val, index, array) => {
                valueString = index === array.length - 1 ? valueString + val : valueString + val + ',';
              });
              filterQuery = filterQuery + element + '__nin=' + valueString + '&';
              break;
            case 'exists':
              filterQuery = filterQuery + element + '__exists=' + true + '&';
              break;
            case '!exists':
              filterQuery = filterQuery + element + '__exists=' + false + '&';
              break;
            case 'regex':
              filterQuery = filterQuery + element + '__regex=' + value + '&';
              break;
          }
        });
        return filterQuery.substring(0, filterQuery.length - 1);
      },
      getLimit () {
        let limit = 'limit=';

        if (!this.limitNumber || this.limitNumber === 0) {
          this.limitNumber = 9999999;
        }

        return limit + this.limitNumber;
      },
      getSkip () {
        let skip = 'skip=';

        if (!this.offsetNumber) {
          this.offsetNumber = 0;
        }

        return skip + this.offsetNumber;
      },
      getSelect () {
        let select = this.selectArray;

        select = select.map((e) => {
          return e.split(' as ')[0];
        });

        if (!select) {
          return;
        }

        return 'select=' + select.join(',');
      }
    }
  }
);

/**
  const remoteModel = ((path) => {
    function filterToString (filter) {
      if (!filter) {
        return;
      }
      // Condition {element: '_id', query: 'in', value: ''}
      let filterQuery = {};

      filter = filter.filter((e) => {
        return !e.type || e.type !== 'local';
      });

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

    function selectToString (select) {
      if (!select) {
        return;
      }
      let selectString = select.reduce((reducer, column) => {
        reducer = reducer + ',' + column;
        return reducer;
      }, '_id,owner,modified');

      return { select: selectString };
    }

    let all = async function () {
      let remoteData, error;
      let formio = await getFormioInstance({ path });

      [error, remoteData] = await to(formio.loadForms());
      if (error) {
        console.log(error);
        throw new Error('Cannot get data');
      }

      return remoteData;
    };

    async function find ({ filter = undefined, limit = 30, select = undefined, populate = undefined, pagination }) {
      let remoteSubmissions, error;
      let formio = await getFormioInstance({ path: path });

      let queryParams = {
        limit: limit
      };

      if (filter && Array.isArray(filter)) {
        let filterQuery = filterToString(filter);

        queryParams = { ...queryParams, ...filterQuery };
      }

      if (select) {
        let selectQuery = selectToString(select);

        queryParams = { ...queryParams, ...selectQuery };
      }

      if (populate && Array.isArray(populate)) {
        queryParams.populate = populate.join(',');
      }

      [error, remoteSubmissions] = await to(
        formio.loadSubmissions({
          params: queryParams
        })
      );
      if (error) {
        let path;

        switch (path) {
          case 'custom':
            path = await config.get().baseURL;
            break;
          case undefined:
            path = await config.get().url;
            break;
          default:
            path = await config.get().baseURL;
            path = path + '/' + path;
            break;
        }
        let e = 'The API call to "' + path + '" could not be completed, server responded with ' + JSON.stringify(error);

        throw new Error(e);
      }

      return remoteSubmissions;
    }

    async function findOne ({ filter }) {}

    async function remove ({ id }) {
      let formio = await getFormioInstance({ path: path, submissionID: id });
      let a = await formio.deleteSubmission();
    }

    async function softDelete ({ id }) {
      let formio = await getFormioInstance({ path: path, submissionID: id });
      let original = await formio.loadSubmission();

      original.data.enabled = false;
      let data = original.data;
      let softDeleted = await formio.saveSubmission({
        _id: id,
        data
      });

      return softDeleted;
    }

    async function insert ({ element }) {
      let formio = await getFormioInstance({ path: path });

      Formio.deregisterPlugin('offline');
      let sub = await formio.saveSubmission(element);

      return sub;
    }

    async function update ({ document }) {
      let formio = await getFormioInstance({ path: path });

      Formio.deregisterPlugin('offline');
      let sub = await formio.saveSubmission(document);

      return sub;
    }

    async function updateOrCreate ({ document }) {}

    async function findAndRemove ({ filter }) {}

    return Object.freeze({
      find,
      findOne,
      remove,
      insert,
      update,
      updateOrCreate,
      findAndRemove,
      getFormioInstance,
      softDelete,
      all
    });
  })();

export default remoteModel;
*/
