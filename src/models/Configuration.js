import Model from '../Fluent/Model';
import Fluent from '../Fluent/Fluent';
import Utilities from 'utilities';
import moment from 'moment';

export default Fluent.extend(Model, {
  properties: {
    name: 'Configuration',
    remoteConnection: {
      baseUrl: process.env.FAST_CONFIG_URL || 'https://ydvahgxgqliaeuf.form.io/',
      path: 'configuration',
      id: '5b50a6571c8da0f446286093',
      token: null
    }
  },
  methods: {
    /**
     * Decides whether to set Configurations
     * Online or Offline
     * @param {Object} config.appConfig The application Config
     * @param {Boolean} config.forceOnline If we need online
     */
    async set ({ appConf, forceOnline }) {
      if (String(appConf.offlineStart) === 'true' && !forceOnline) {
        return this.setOffline({ appConf });
      }
      return this.setOnline({ appConf });
    },
    /**
     *
     * @param {*} param0
     */
    async setOffline ({ appConf }) {
      let localConfig = await this.local().first();

      let localConfigDate = this.getConfigDate(localConfig);
      let offlineConfigDate = appConf.offlineFiles.lastUpdated.date;

      // If local config is newer than offline
      if (localConfigDate > offlineConfigDate) {
        return localConfig;
      }

      if (localConfig) {
        await this.local().clear({ sure: true });
      }

      return this.local().insert({
        ...appConf.offlineFiles.Configuration.data,
        fastUpdated: moment().unix()
      });
    },
    /**
     *
     * @param {*} param0
     */
    async setOnline ({ appConf }) {
      let localConfig = await this.local().first();

      let remoteConfig = await this.remote({ token: false }).first();

      if (!localConfig && !remoteConfig) {
        throw new Error('Application is not connected to internet, or the configuration file cannot be pulled');
      }

      if (!remoteConfig) {
        return localConfig;
      }

      if (localConfig) {
        await this.local().clear({ sure: true });
      }

      return this.local().insert({ ...remoteConfig, fastUpdated: moment().unix() });
    },
    /**
     *
     * @param {*} config
     */
    getConfigDate (config) {
      return Utilities.get(() => config.fastUpdated, 0);
    }
  }
})
  .compose(Fluent.privatize)
  .privatizeMethods('setOnlineConfig', 'setOfflineConfig', 'getConfigDate', 'assingGlobalVariable', 'getRemote')();
