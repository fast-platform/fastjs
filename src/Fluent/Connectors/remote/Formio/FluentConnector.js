import to from 'await-to-js';
// import Utilities from 'utilities';
import axios from 'axios';
import Interface from '../../../Interface';
import compose from '@stamp/compose';
import Connection from 'Wrappers/Connection';
export default compose(
  Interface,
  {
    methods: {
      getToken () {
        return localStorage.getItem('formioToken');
      },
      async get () {
        let error;
        let result;

        [error, result] = await to(this.httpGET());

        if (error) {
          console.log(error);
          throw new Error('Error while getting submissions');
        }

        result = this.jsApplySelect(result.data);
        result = this.jsApplyOrderBy(result);

        return result;
      },
      async all () {
        return this.get();
      },
      async insert (data) {
        let [error, result] = await to(this.httpPOST(data));

        if (error) {
          console.log(error);
          throw new Error('Cannot insert data');
        }
        return result.data;
      },
      async update (data) {
        if (!data._id) {
          throw new Error('Formio connector error. Cannot update a Model without _id key');
        }
        if (data._id.includes('_local')) {
          throw new Error('Formio connector error. Cannot update a local document');
        }

        let [error, result] = await to(this.httpPUT(data));

        if (error) {
          console.log(error);
          throw new Error('Cannot insert data');
        }
        return result.data;
      },
      async clear ({ sure } = {}) {
        if (!sure || sure !== true) {
          throw new Error(
            'Clear() method will delete everything!, you must set the "sure" parameter "clear({sure:true})" to continue'
          );
        }
        let promises = [];

        let [error, data] = await to(this.select('_id').pluck('_id'));

        if (error) {
          console.log(error);
          throw new Error('Cannot get remote Model');
        }

        data.forEach((_id) => {
          promises.push(this.httpDelete(_id));
        });

        return axios.all(promises);
      },
      async remove (_id) {
        let [error, removed] = await to(this.httpDelete(_id));

        if (error) {
          console.log(error);
          throw new Error(`FormioConnector: Could not delete ${_id}`);
        }

        return removed;
      },
      async find (_id) {
        if (typeof _id !== 'string') {
          throw new Error(
            'Formio connector find() method only accepts strings "' + typeof _id + '" given "' + _id + '"'
          );
        }
        let [error, data] = await to(this.where('_id', '=', _id).first());

        if (error) {
          console.log(error);
          throw new Error('Find() could not get remote data');
        }

        return data;
      },
      getUrl () {
        let baseUrl =
          this.remoteConnection && this.remoteConnection.baseUrl ? this.remoteConnection.baseUrl : undefined;
        let path = this.remoteConnection && this.remoteConnection.path ? this.remoteConnection.path : undefined;

        if (!this.remoteConnection.pullForm) {
          path = !this.remoteConnection.id ? `${path}/submission` : `${path}/submission/${this.remoteConnection.id}`;
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
      getSpacer (url) {
        return url.substr(url.length - 1) === '&' ? '' : '&';
      },
      httpGET () {
        let url = this.getUrl();
        let headers = this.getHeaders();
        let filters = this.getFilters();
        let limit = this.getLimit();
        let skip = this.getSkip();
        let select = this.getSelect();
        let spacer = '';

        // Always limit the amount of requests
        url = url + spacer + limit;

        url = filters ? url + this.getSpacer(url) + filters : url;

        url = skip ? url + this.getSpacer(url) + skip : url;

        url = select ? url + this.getSpacer(url) + select : url;

        if (!Connection.isOnline()) {
          throw new Error(`Cannot make get request to ${url}. You are not online`);
        }

        return axios.get(url, { headers });
      },
      httpPOST (data) {
        let url = this.getUrl();
        let headers = this.getHeaders();

        if (!Connection.isOnline()) {
          throw new Error(`Cannot make request post to ${url}. You are not online`);
        }
        return axios.post(url, data, { headers });
      },
      httpPUT (data) {
        let url = `${this.getUrl()}/${data._id}`;
        let headers = this.getHeaders();

        if (!Connection.isOnline()) {
          throw new Error(`Cannot make request post to ${url}. You are not online`);
        }
        return axios.put(url, data, { headers });
      },
      httpDelete (_id) {
        let headers = this.getHeaders();
        let url = `${this.getUrl()}/${_id}`;

        return axios.delete(url, { headers });
      },
      getTokenType (token) {
        if (token.length > 32) {
          return 'x-jwt-token';
        }
        return 'x-token';
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
        let limit = '?limit=';

        if (!this.limitNumber || this.limitNumber === 0) {
          this.limitNumber = 50;
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
