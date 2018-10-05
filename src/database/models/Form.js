import moment from 'moment';
import Model from './base/Model';
import remoteModel from './base/remote';
import Connection from 'Wrappers/Connection';
import Fluent from '../Fluent';

export default Fluent.extend(Model, {
  properties: {
    name: 'Form',
    path: 'custom'
  },
  methods: {
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
    },
    async rFind ({ filter = undefined, limit = 200, select, pagination, form } = {}) {
      let formio = await remoteModel.getFormioInstance({ path: 'custom' });
      let queryParams = {};

      if (limit) {
        queryParams.limit = limit;
      }

      if (filter) {
        let filterQuery = this.filterToString(filter);

        queryParams = { ...queryParams, ...filterQuery };
      }
      let isOnline = await Connection.isOnline();
      let remoteForms = isOnline ?
        await formio.loadForms({
          params: queryParams
        }) :
        [];

      return remoteForms;
    },
    async get (id) {
      id = id.replace(/\s/g, '');

      let formRequest = await this.findOne({
        'data.name': id
      });
      let formRequestID = await this.findOne({
        'data._id': id
      });
      let formRequestPath = await this.findOne({
        'data.path': id
      });

      if (formRequest) {
        return formRequest.data;
      }
      if (formRequestID) {
        return formRequestID.data;
      }
      if (formRequestPath) {
        return formRequestPath.data;
      }
    },
    async cardFormattedForms (action) {
      let result = await this.local().find();

      result = result.filter((o) => {
        return o.data.tags.indexOf('visible') > -1;
      });
      result = result.sort((a, b) => {
        a = a.data.title;
        b = b.data.title;
        return a > b ? 1 : a < b ? -1 : 0;
      });

      result = result.map((f) => {
        return {
          title: f.data.title,
          tags: f.data.tags,
          customIcon: true,
          icon: action === 'create' ? 'statics/customSVG/startSurvey.svg' : 'statics/customSVG/collectedData.svg',
          subtitle: 'Last updated: ' + moment(f.data.modified).fromNow(),
          actions: [
            {
              text: action === 'create' ? 'Start' : 'View data',
              target: 'form',
              view: action,
              path: f.data.path
            }
          ]
        };
      });

      result = { cards: result };
      return result;
    }
  }
})();
