import Auth from 'repositories/Auth/Auth';
import moment from 'moment';
import Utilities from 'utilities';
import Form from 'models/Form';
import Model from '../Fluent/Model';
import Columns from './repositories/Columns';

export default Model.compose({
  properties: {
    name: 'Submission',
    remoteConnection: undefined
  },
  init ({ path }) {
    this.path = path;
    this.remoteConnection = { path };
  },
  methods: {
    async form () {
      // return this.belongTo('Form', 'path', 'path');
    },
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

      filter = filter.filter(o => {
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
      let unsynced = (await this.local()
        .where('sync', '=', false)
        .andWhere('draft', '=', false)
        .andWhere('syncError', '=', false)
        .andWhere('user_email', '=', Auth.email())
        .orderBy('created', 'desc', 'date')
        .get()).filter(d => {
        return !d.queuedForSync;
      });

      return unsynced;
    },
    async showView (from) {
      let cols = (await Columns.getTableView(this.path)).map(
        o => `data.${o.path} as ${o.path}`
      );

      cols = [
        ...cols,
        '_id',
        'created',
        'modified',
        'syncError',
        'draft',
        'sync'
      ];

      let submissions = [];

      if (from === 'remote') {
        submissions = await this.remote()
          .select(cols)
          .get();
      } else {
        submissions = await this.merged()
          .select(cols)
          .get();
      }

      let templates = await Form.getFastTableTemplates({ path: this.path });

      submissions = submissions.map(s => {
        let sub = {
          _id: s._id,
          status: s.sync === false ? 'offline' : 'online',
          draft: s.draft,
          HumanUpdated: Number.isInteger(s.modified) ?
            moment.unix(s.modified).fromNow() :
            moment(s.modified).fromNow(),
          syncError: s.syncError ? s.syncError : false,
          updated: Number.isInteger(s.modified) ?
            s.modified :
            moment(s.modified).unix()
        };

        // Custom templates using FAST_TABLE_TEMPLATE propertie
        templates.forEach(t => {
          /* eslint-disable */
          let newFx = new Function("value", "data", t.template);
          /* eslint-enable */
          try {
            s[t.key] = newFx(s[t.key], s);
          } catch (error) {
            console.log('There is an error in one of your calculations', error);
          }
        });

        return { ...sub, ...s };
      });

      submissions = submissions.sort((a, b) => {
        a = new Date(a.updated);
        b = new Date(b.updated);
        return a > b ? -1 : a < b ? 1 : 0;
      });

      return submissions;
    },
    async getParallelParticipants (_id) {
      let currentSubmission = await this.local()
        .where('_id', '=', _id)
        .get();

      currentSubmission = currentSubmission[0];
      let groupId = Utilities.get(
        () => currentSubmission.data.data.parallelSurvey
      );

      groupId =
        groupId && groupId !== '[object Object]' ?
          JSON.parse(groupId).groupId :
          undefined;

      let submissions = await this.local()
        .where('path', '=', this.path)
        .get();

      let a = submissions.filter(submission => {
        let parallelSurveyID = Utilities.get(
          () => submission.data.data.parallelSurvey
        );

        parallelSurveyID =
          parallelSurveyID && parallelSurveyID !== '[object Object]' ?
            JSON.parse(parallelSurveyID).groupId :
            undefined;
        return parallelSurveyID && parallelSurveyID === groupId;
      });

      a = a.map(e => {
        e.data.data.parallelSurvey;
      });
      a = a.map(survey => {
        return JSON.parse(survey);
      });
      return a;
    },
    getParallelSurvey (submission) {
      let parallelsurveyInfo =
        Utilities.get(() => submission.data.data.paraparallelSurvey) ||
        Utilities.get(() => submission.data.parallelSurvey);

      parallelsurveyInfo =
        parallelsurveyInfo && parallelsurveyInfo !== '[object Object]' ?
          JSON.parse(parallelsurveyInfo) :
          undefined;

      return parallelsurveyInfo;
    },
    setParallelSurvey (parallelsurveyInfo) {
      return JSON.stringify(parallelsurveyInfo);
    },
    async getGroups (formId) {
      let submissions = await this.local().find();

      submissions = formId ?
        submissions.filter(submission => {
          return submission.data.formio.formId === formId;
        }) :
        submissions;

      let groups = submissions.map(submission => {
        return this.local().getParallelSurvey(submission) ?
          {
            groupId: this.local().getParallelSurvey(submission).groupId,
            groupName: this.local().getParallelSurvey(submission).groupName
          } :
          undefined;
      });

      groups = groups.filter(group => {
        return typeof group !== 'undefined';
      });

      return Utilities.uniqBy(groups, 'groupId');
    },
    async getGroup (id) {
      let groups = await this.local().getGroups();

      groups = groups.filter(group => {
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

      submission.data.data.parallelSurvey = this.local().setParallelSurvey(
        parallelSurvey
      );
      await this.local().update(submission);
    }
  }
});
