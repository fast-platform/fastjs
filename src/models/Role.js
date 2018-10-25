import Model from '../Fluent/Model';
import Utilities from 'utilities';
import Connection from 'Wrappers/Connection';
import to from 'await-to-js';
import moment from 'moment';

export default Model.compose({
  properties: {
    name: 'Role',
    remoteConnection: {
      path: 'access',
      token: undefined,
      pullForm: true
    }
  },
  methods: {
    async set ({ url, appConf, forceOnline }) {
      if (appConf.offlineStart === 'true' && !forceOnline) {
        return this.setOffline({ appConf });
      }
      return this.setOnline({ url });
    },
    getRolesDate (localRoles) {
      return Utilities.get(() => localRoles.fastUpdated, 0);
    },
    async setOnline () {
      let error;
      let remoteRoles;

      let localRoles = await this.local().first();

      let isOnline = await Connection.isOnline();

      if (isOnline) {
        [error, remoteRoles] = await to(this.remote().first());

        if (error) {
          throw new Error(error);
        }
      }

      remoteRoles = Utilities.get(() => remoteRoles.roles);

      if (remoteRoles) {
        if (localRoles) {
          await this.local().clear();
        }
        remoteRoles.fastUpdated = moment().unix();

        let insertedRoles = await this.local().insert(remoteRoles);

        return insertedRoles;
      }
      return localRoles;
    },
    async setOffline ({ appConf }) {
      let localRoles = await this.local().first();

      let rolesDate = this.getRolesDate(localRoles);
      let offlineRolesDate = appConf.offlineFiles.lastUpdated.date;

      if (offlineRolesDate > rolesDate || !localRoles) {
        if (localRoles) {
          await this.local().clear();
        }
        let insertedRoles = await this.local().insert(appConf.offlineFiles.Roles);

        return insertedRoles;
      }

      return localRoles;
    }
  }
})();
