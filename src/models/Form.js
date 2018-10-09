import moment from 'moment';
import Utilities from 'utilities';
import Model from '../Fluent/Model';
import Fluent from '../Fluent/Fluent';
import Labels from './repositories/Labels';
import Configuration from './Configuration';

export default Fluent.extend(Model, {
  properties: {
    name: 'Form',
    remoteConnection: {
      baseUrl: process.env.FLUENT_FORMIO_BASEURL || 'https://myFluentBaseUrl.com/',
      path: 'form',
      pullForm: true
    }
  },
  methods: {
    getModel ({ path, name }) {
      return Fluent.extend(Model, {
        properties: {
          name: 'name',
          remoteConnection: {
            baseUrl: process.env.FLUENT_FORMIO_BASEURL || 'https://myFluentBaseUrl.com/',
            path: path
          }
        }
      }).compose(Fluent.privatize)();
    },
    /**
     *
     * @param {*} action
     */
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
    },
    /**
     *
     */
    async labels () {
      let forms = await this.local().get();

      return Labels(forms);
    },
    /**
     *
     * @param {*} forms
     */
    getUpdatedAt (forms) {
      return Utilities.get(() => forms[0].fastUpdated, 0);
    },
    /**
     *
     * @param {*} param0
     */
    async setOffline ({ appConf }) {
      let localForms = await this.local().get();

      let localDate = this.getUpdatedAt(localForms);
      let config = await Configuration.local().first();
      let offlineForms = Utilities.get(() => appConf.offlineFiles.Forms);

      // If the JSON file is newer than the local
      // DB data
      if (config.fastUpdated < localDate) {
        return localForms;
      }

      if (localForms) {
        await this.local().clear({ sure: true });
      }

      offlineForms.forEach(async (form) => {
        await this.local().insert({ data: form, fastUpdated: moment().unix() });
      });
      return offlineForms;
    },
    /**
     *
     */
    async setOnline () {
      let remoteForms = await this.remote().get();
      let unixDate = moment().unix();

      if (remoteForms && !Utilities.isEmpty(remoteForms)) {
        await this.local().clear({ sure: true });
        remoteForms.forEach(async (form) => {
          await this.local().insert({
            data: form,
            fastUpdated: unixDate
          });
        });
      }
    },
    /**
     *
     * @param {*} param0
     */
    async set ({ appConf, forceOnline }) {
      if (appConf.offlineStart === 'true' && !forceOnline) {
        return this.setOffline({ appConf });
      }
      return this.setOnline();
    }
  }
})();
