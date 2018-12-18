import Auth from "repositories/Auth/Auth";
import moment from "moment";
import Utilities from "utilities";
import Form from "models/Form";
import { Fluent } from "fast-fluent";
import Columns from "./repositories/Columns";
import to from "await-to-js";

export default Fluent.model({
  properties: {
    name: "Submission",
    config: {
      remote: undefined
    }
  },
  init({ path }) {
    this.path = path;
    this.config = {
      remote: { path }
    };
  },
  methods: {
    async form() {
      // return this.belongTo('Form', 'path', 'path');
    },
    async getUnsync() {
      let unsynced = (await this.local()
        .where("sync", "=", false)
        .andWhere("draft", "=", false)
        .andWhere("syncError", "=", false)
        .owner(Auth.email())
        .orderBy("created", "desc", "date")
        .get()).filter(d => {
        return !d.queuedForSync;
      });

      return unsynced;
    },
    async showView({ from, limit, owner }) {
      let cols = (await Columns.getTableView(this.path)).map(
        o => `data.${o.path} as ${o.path}`
      );

      cols = [
        ...cols,
        "_id",
        "created",
        "modified",
        "syncError",
        "draft",
        "sync"
      ];

      let submissions = [];

      if (from === "remote") {
        const [error, result] = await to(
          this.remote()
            .select(cols)
            .limit(limit)
            .get()
        );

        if (error) {
          console.log("error", error);
          submissions = [];
        }
        submissions = !error && result;
      } else {
        submissions = await this.local()
          .select(cols)
          .limit(limit)
          .owner(owner)
          .get();

        const [error, result] = await to(
          this.remote()
            .select(cols)
            .limit(limit)
            .owner(Auth.user()._id)
            .get()
        );

        let remote = [];
        if (error) {
          console.log("error", error);
        }

        remote = error ? [] : result;

        submissions = [...submissions, ...remote];
      }

      let templates = await Form.getFastTableTemplates({ path: this.path });

      submissions = submissions.map(s => {
        let sub = {
          _id: s._id,
          status: s.sync === false ? "offline" : "online",
          draft: s.draft,
          HumanUpdated: Number.isInteger(s.modified)
            ? moment.unix(s.modified).fromNow()
            : moment(s.modified).fromNow(),
          syncError: s.syncError ? s.syncError : false,
          updated: Number.isInteger(s.modified)
            ? s.modified
            : moment(s.modified).unix()
        };

        // Custom templates using FAST_TABLE_TEMPLATE propertie
        templates.forEach(t => {
          /* eslint-disable */
          let newFx = new Function("value", "data", t.template);
          /* eslint-enable */
          try {
            s[t.key] = newFx(s[t.key], s);
          } catch (error) {
            console.log("There is an error in one of your calculations", error);
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
    async getParallelParticipants(_id, path) {
      let currentSubmission = await this.local()
        .where("_id", "=", _id)
        .first();

      let groupId = Utilities.get(() => currentSubmission.data.parallelSurvey);

      groupId =
        groupId && groupId !== "[object Object]"
          ? JSON.parse(groupId).groupId
          : undefined;

      let submissions = await this.local()
        .where("path", "=", path)
        .get();

      let a = submissions.filter(submission => {
        let parallelSurveyID = Utilities.get(
          () => submission.data.parallelSurvey
        );
        try {
          parallelSurveyID =
            parallelSurveyID && parallelSurveyID !== "[object Object]"
              ? JSON.parse(parallelSurveyID).groupId
              : undefined;
          return parallelSurveyID && parallelSurveyID === groupId;
        } catch (e) {
          return false;
        }
      });

      return a.map(e => JSON.parse(e.data.parallelSurvey));
    },
    getParallelSurvey(submission) {
      let parallelsurveyInfo = Utilities.get(() => submission.parallelSurvey);

      parallelsurveyInfo =
        parallelsurveyInfo && parallelsurveyInfo !== "[object Object]"
          ? JSON.parse(parallelsurveyInfo)
          : undefined;

      return parallelsurveyInfo;
    },
    setParallelSurvey(parallelsurveyInfo) {
      return JSON.stringify(parallelsurveyInfo);
    },
    async getGroups(formId) {
      let submissions = await this.local()
        .where("path", "=", formId)
        .get();

      submissions = formId
        ? submissions.filter(submission => {
            return submission.data.formio.formId === formId;
          })
        : submissions;

      let groups = submissions.map(submission => {
        return this.local().getParallelSurvey(submission)
          ? {
              groupId: this.local().getParallelSurvey(submission).groupId,
              groupName: this.local().getParallelSurvey(submission).groupName
            }
          : undefined;
      });

      groups = groups.filter(group => {
        return typeof group !== "undefined";
      });

      return Utilities.uniqBy(groups, "groupId");
    },
    async getGroup(id) {
      let groups = await this.local().getGroups();

      groups = groups.filter(group => {
        return group.groupId === id;
      });
      return groups[0];
    },

    async removeFromGroup(submission) {},

    async assingToGroup(submissionId, groupId) {
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
