import Connection from 'Wrappers/Connection';
import Roles from 'database/models/Role';
import _get from 'lodash/get';
import to from 'await-to-js';
import axios from 'axios';
import moment from 'moment';

let Role = (() => {
  function getRolesDate (localRoles) {
    return _get(localRoles, 'fastUpdated', 0);
  }

  async function getLocal () {
    let roles = await Roles.local().find();

    return _get(roles, '[0]', undefined);
  }

  async function setOnlineRoles ({ url }) {
    let error;
    let remoteRoles;

    let localRoles = await Roles.local().find();

    localRoles = _get(localRoles, '[0]', undefined);
    let isOnline = await Connection.isOnline();

    if (isOnline) {
      [error, remoteRoles] = await to(axios.get(url + '/access'));

      if (error) {
        throw new Error(error);
      }
    }

    remoteRoles = _get(remoteRoles, 'data.roles', undefined);

    if (remoteRoles) {
      if (localRoles) {
        await Roles.local().clear();
      }
      remoteRoles.fastUpdated = moment().unix();

      let insertedRoles = await Roles.local().insert(remoteRoles);

      return insertedRoles;
    }
    return localRoles;
  }

  async function setOfflineRoles ({ appConf }) {
    let localRoles = await getLocal();

    let rolesDate = getRolesDate(localRoles);
    let offlineRolesDate = appConf.offlineFiles.lastUpdated.date;

    if (offlineRolesDate > rolesDate || !localRoles) {
      if (localRoles) {
        await Roles.local().clear();
      }
      let insertedRoles = await Roles.local().insert(appConf.offlineFiles.Roles);

      return insertedRoles;
    }

    return localRoles;
  }

  async function set ({ url, appConf, forceOnline }) {
    if (appConf.offlineStart === 'true' && !forceOnline) {
      return setOfflineRoles({ appConf });
    }
    return setOnlineRoles({ url });
  }

  return Object.freeze({
    set,
    getLocal
  });
})();

export default Role;
