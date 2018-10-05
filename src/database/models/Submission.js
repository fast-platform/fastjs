import Auth from 'repositories/Auth/Auth';
import moment from 'moment';
import Utilities from 'utilities';
import Form from 'database/models/Form';
import FormioUtils from 'formiojs/utils';
import Model from './base/Model';
import Fluent from '../Fluent';

export default Fluent.extend(Model, {
  properties: {
    name: 'Submission',
    path: undefined
  },
  methods: {
    async get (id) {
      id = id.replace(/\s/g, '');
      let offline = await this.local().find({
        filter: {
          _id: id
        }
      });

      if (offline.length > 0) {
        return offline[0];
      }
      return {
        data: false
      };
    },

    async offline (formId) {
      let filter = await this.find({
        'data.user_email': Auth.email(),
        'data.formio.formId': formId
      });
      // updated incomplete submission

      filter = filter.filter((o) => {
        return o.data.sync === false || o.data.draft === false;
      });
      filter = filter.sort((a, b) => {
        a = new Date(a.data.created);
        b = new Date(b.data.created);
        return a > b ? -1 : a < b ? 1 : 0;
      });
      return filter;
    },

    async stored (formId) {
      return this.find({
        'data.formio.formId': formId,
        'data.owner': Auth.user()._id
      });
    },

    async getUnsync () {
      let unsynced = await this.find({
        'data.sync': false
      });

      // updated incomplete submission
      unsynced = unsynced.filter((o) => {
        return (
          o.data.sync === false &&
          o.data.draft === false &&
          o.data.user_email === Auth.email() &&
          !o.data.queuedForSync &&
          !o.data.syncError
        );
      });
      unsynced = unsynced.sort((a, b) => {
        a = new Date(a.data.created);
        b = new Date(b.data.created);
        return a > b ? -1 : a < b ? 1 : 0;
      });
      return unsynced;
    },

    async showView ({ form, filter, limit, select, pagination, populate, dataExport, vm }) {
      let page = (pagination && pagination.page) || 1;
      let pageLimit = (pagination && pagination.limit) || 500;
      let paginationInfo = {};
      let submissions = [];

      submissions = await this.find({
        form,
        limit,
        select,
        pagination,
        filter,
        populate
      });

      // Need to clone the object as it is Dynamic LokiJs
      submissions = Utilities.cloneDeep(submissions);

      submissions = submissions.map((o) => {
        if (o._id && o._id.indexOf('_local') >= 0) {
          o.data._lid = o._id;
        }
        if (o.data && !o.data._id) {
          o.data._id = o._id;
        }
        if (o.data && !o.data.owner) {
          o.data.owner = o.owner;
        }
        if (o.data && !o.data.modified) {
          o.data.modified = o.modified;
        }

        if (dataExport) {
          if (o.data && o.data.owner && o.data.owner.data && o.data.owner.data.email) {
            o.data.ownerEmail = o.data.owner.data.email;
          }
          if (o.data && o.data.user_email) {
            o.data.ownerEmail = o.data.user_email;
          }

          if (!o.$loki) {
            return o.data;
          }
          o.data.data._id = o._id;
          return o.data.data;
        }

        let result = o.data;

        if (result && result.data) {
          let d = result.data;

          delete result.data;
          result = Object.assign(result, d);
        }
        return result;
      });

      if (dataExport) {
        return submissions;
      }

      if (pageLimit > 0) {
        let totalRecords = submissions.length;
        let pages = Math.ceil(totalRecords / pageLimit);
        // let firstRecord = (pageLimit * page) - (pageLimit - 1)
        // let lastRecord = (pageLimit * page)

        paginationInfo = {
          total: totalRecords,
          pages: pages,
          currentPage: page,
          pageLimit: pageLimit
        };
        // submissions = submissions.slice(firstRecord - 1, lastRecord);
      }
      let fullForm = await Form.get(form);

      let templates = [];

      FormioUtils.eachComponent(fullForm.components, (c) => {
        if (c.properties && c.properties.FAST_TABLE_TEMPLATE) {
          templates.push({ key: c.key, template: c.properties.FAST_TABLE_TEMPLATE });
        }
      });

      submissions = submissions.map((s) => {
        let sub = {
          _id: s._id,
          status: s.sync === false ? 'offline' : 'online',
          draft: s.draft,
          HumanUpdated: s.updated ? moment.unix(s.updated).fromNow() : moment(s.modified).fromNow(),
          syncError: s.syncError ? s.syncError : false,
          updated: s.updated ? moment.unix(s.updated).unix() : moment(s.modified).unix()
        };

        if (s._lid) {
          sub._lid = s._lid;
        }

        // Custom templates using FAST_TABLE_TEMPLATE propertie
        templates.forEach((t) => {
          /* eslint-disable */
          let newFx = Function('value', 'data', t.template);
          /* eslint-enable */
          try {
            s[t.key] = newFx(s[t.key], s);
          } catch (error) {
            console.log('There is an error on one of your calculations', error);
          }
        });

        // We need to remove this from here and create
        // A proper extension to allow tables to have custom visuali
        // of complex data
        if (s.dataCollected) {
          if (s.dataCollected.scouting && s.dataCollected.traps) {
            s.dataCollected = vm.$t('Scouting and traps');
          } else if (s.dataCollected.scouting) {
            s.dataCollected = vm.$t('Scouting');
          } else if (s.dataCollected.traps) {
            s.dataCollected = vm.$t('Traps');
          } else {
            s.dataCollected = '-';
          }
        }
        if (s.date) {
          s.date = moment(s.date).format('DD-MM-YYYY HH:mm:ss');
        }

        if (!select) {
          return sub;
        }
        select.forEach((c) => {
          c = c.replace('data.', '');
          sub[c] = s[c];
        });
        return sub;
      });

      submissions = submissions.sort((a, b) => {
        a = new Date(a.updated);
        b = new Date(b.updated);
        return a > b ? -1 : a < b ? 1 : 0;
      });

      let paginated = { results: submissions, pagination: paginationInfo };

      return paginated;
    },

    async getParallelParticipants (idForm, idSubmission) {
      let currentSubmission = await this.local().find({
        filter: {
          _id: idSubmission
        }
      });

      currentSubmission = currentSubmission[0];
      let groupId = Utilities.get(() => currentSubmission.data.data.parallelSurvey);

      groupId = groupId && groupId !== '[object Object]' ? JSON.parse(groupId).groupId : undefined;

      let submissions = await this.local().find({
        filter: {
          'data.formio.formId': idForm
        }
      });

      let a = submissions.filter((submission) => {
        let parallelSurveyID = Utilities.get(() => submission.data.data.parallelSurvey);

        parallelSurveyID =
          parallelSurveyID && parallelSurveyID !== '[object Object]' ? JSON.parse(parallelSurveyID).groupId : undefined;
        return parallelSurveyID && parallelSurveyID === groupId;
      });

      a = a.map((e) => {
        e.data.data.parallelSurvey;
      });
      a = a.map((survey) => {
        return JSON.parse(survey);
      });
      return a;
    },

    getParallelSurvey (submission) {
      let parallelsurveyInfo =
        Utilities.get(() => submission.data.data.paraparallelSurvey) ||
        Utilities.get(() => submission.data.parallelSurvey);

      parallelsurveyInfo =
        parallelsurveyInfo && parallelsurveyInfo !== '[object Object]' ? JSON.parse(parallelsurveyInfo) : undefined;

      return parallelsurveyInfo;
    },

    setParallelSurvey (parallelsurveyInfo) {
      return JSON.stringify(parallelsurveyInfo);
    },

    async getGroups (formId) {
      let submissions = await this.local().find();

      submissions = formId ?
        submissions.filter((submission) => {
          return submission.data.formio.formId === formId;
        }) :
        submissions;

      let groups = submissions.map((submission) => {
        return this.local().getParallelSurvey(submission) ?
          {
            groupId: this.local().getParallelSurvey(submission).groupId,
            groupName: this.local().getParallelSurvey(submission).groupName
          } :
          undefined;
      });

      groups = groups.filter((group) => {
        return typeof group !== 'undefined';
      });

      return Utilities.uniqBy(groups, 'groupId');
    },

    async getGroup (id) {
      let groups = await this.local().getGroups();

      groups = groups.filter((group) => {
        return group.groupId === id;
      });
      return groups[0];
    },

    async removeFromGroup (submission) {},

    async assingToGroup (submissionId, groupId) {
      let group = await this.local().getGroup(groupId[0]);
      let submission = await this.local().get(submissionId);

      let parallelData = this.local().getParallelSurvey(submission);

      let parallelSurvey = {
        ...parallelData,
        groupId: group.groupId,
        groupName: group.groupName
      };

      submission.data.data.parallelSurvey = this.local().setParallelSurvey(parallelSurvey);
      await this.local().update(submission);
    }
  }
})();
