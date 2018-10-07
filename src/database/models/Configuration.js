import Model from '../Fluent/Model';
import Fluent from '../Fluent/Fluent';
import Utilities from 'utilities';
import Connection from 'Wrappers/Connection';
import moment from 'moment';

export default Fluent.extend(Model, {
  properties: {
    name: 'Configuration',
    remoteConnection: undefined
  },
  methods: {
    /**
     *
     */
    async getLocal () {
      let configuration = await this.local().find();

      return Utilities.get(() => configuration[0]);
    },
    /**
     *
     * @param {*} appConf
     */
    async getRemote (appConf) {
      let remoteConfig;
      let isOnline = await Connection.isOnline();

      if (isOnline) {
        try {
          remoteConfig = await this.remote().find({
            filter: [{ element: '_id', query: '=', value: appConf.appConfigId }],
            limit: 1
          });
        } catch (error) {
          console.log('error', error);
        }
      }
      return Utilities.get(() => remoteConfig[0].data);
    },
    /**
     *
     * @param {*} VUE
     * @param {*} configuration
     */
    assingGlobalVariable (VUE, configuration) {
      if (VUE && VUE.prototype) {
        VUE.prototype.$FAST_CONFIG = configuration;
      } else if (VUE) {
        VUE.$FAST_CONFIG = configuration;
      }
    },
    /**
     *
     * @param {*} localConfig
     */
    getConfigDate (localConfig) {
      return Utilities.get(() => localConfig.fastUpdated, 0);
    },
    /**
     *
     * @param {*} param0
     */
    async setOfflineConfig ({ Vue, appConf }) {
      let localConfig = await this.getLocal();

      let localConfigDate = this.getConfigDate(localConfig);
      let offlineConfigDate = appConf.offlineFiles.lastUpdated.date;

      if (offlineConfigDate > localConfigDate) {
        let offlineConfig = {
          ...appConf.offlineFiles.this.data,
          fastUpdated: moment().unix()
        };

        if (localConfig) {
          await this.local().clear();
        }

        let insertedConfig = await this.local().insert(offlineConfig);

        this.assingGlobalVariable(Vue, insertedConfig);
        return insertedConfig;
      }
      this.assingGlobalVariable(Vue, localConfig);
      return localConfig;
    },
    /**
     *
     * @param {*} param0
     */
    async setOnlineConfig ({ Vue, appConf }) {
      let localConfig = await this.getLocal();

      let remoteConfig = await this.getRemote(appConf);

      if (!localConfig && !remoteConfig) {
        throw new Error('Application is not connected to internet, or the configuration file cannot be pulled');
      }

      if (!remoteConfig) {
        this.assingGlobalVariable(Vue, localConfig);
        return localConfig;
      }

      remoteConfig.fastUpdated = moment().unix();

      if (localConfig) {
        await this.local().clear();
      }

      let insertedConfig = await this.local().insert(remoteConfig);

      this.assingGlobalVariable(Vue, insertedConfig);
      return insertedConfig;
    },
    /**
     *
     * @param {*} param0
     */
    async set ({ Vue, appConf, forceOnline }) {
      if (String(appConf.offlineStart) === 'true' && !forceOnline) {
        return this.setOfflineConfig({ Vue, appConf });
      }
      return this.setOnlineConfig({ Vue, appConf });
    }
  }
})
  .compose(Fluent.privatize)
  .privatizeMethods('setOnlineConfig', 'setOfflineConfig', 'getConfigDate', 'assingGlobalVariable', 'getRemote')();
