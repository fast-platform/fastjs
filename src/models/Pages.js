import Model from '../Fluent/Model';
import Utilities from 'utilities';
import Configuration from './Configuration';
import to from 'await-to-js';
import moment from 'moment';

export default Model.compose({
  properties: {
    name: 'Pages',
    remoteConnection: {
      path: 'fast-app-pages',
      token: undefined
    }
  },
  methods: {
    /**
     * Decides whether to set submissions
     * Online or Offline
     * @param {Object} config.appConfig The application Config
     * @param {Boolean} config.forceOnline If we need online
     */
    async set ({ appConf, forceOnline }) {
      if (String(appConf.offlineStart) === 'true' && !forceOnline) {
        return this.setOffline({ appConf });
      }
      return this.setOnline();
    },
    /**
     * Sets all pages from the offline
     * JSON files
     * @param {Object} appConfig Application config
     * @return {Object} App pages
     */
    async setOffline ({ appConf }) {
      let localPages = await this.local().first();
      let localDate = this.getUpdatedDate(localPages);
      let config = await Configuration.local().first();
      let offlinePages = Utilities.get(() => appConf.offlineFiles.Pages[0].data);

      // If the configuration in the JSON file is
      // older than the one in the local DB
      if (config.fastUpdated < localDate) {
        return Utilities.get(() => localPages.data);
      }

      if (localPages) {
        await this.local().clear({ sure: true });
      }
      return this.local().insert({ ...offlinePages, fastUpdated: moment().unix() });
    },
    /**
     * Sets all pages from the online
     * JSON files
     * @return {Object} App pages
     */
    async setOnline () {
      let localPages = await this.local().first();
      let [error, pages] = await to(this.remote().first());

      if (error) {
        console.log(error);
        throw new Error('Could not get remote Pages.');
      }

      pages = Utilities.get(() => pages.data);

      // If we pulled the remote pages and
      // The submission is not empty
      if (pages && !Utilities.isEmpty(pages)) {
        if (localPages) {
          await this.local().clear({ sure: true });
        }
        return this.local().insert({ ...pages, fastUpdated: moment().unix() });
      }

      return localPages;
    },
    /**
     * Takes the local pages and gets the
     * updated at date
     *
     * @param {Array} pages Array of local pages
     * @returns {number} date las updated
     */
    getUpdatedDate (pages) {
      return Utilities.get(() => pages.fastUpdated, 0);
    }
  }
})();
