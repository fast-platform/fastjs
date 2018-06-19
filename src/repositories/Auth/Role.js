import Connection from 'Wrappers/Connection';
import Roles from 'database/models/Role';
import _get from 'lodash/get';
import to from 'await-to-js';
import axios from 'axios';

let Role = (() => {
  async function set (url) {
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
        await Roles.local().remove(localRoles);
      }
      let insertedRoles = await Roles.local().insert(remoteRoles);

      return insertedRoles;
    }
    return localRoles;
  }

  async function getLocal (submission) {
    let pages = await Roles.local().find();

    return _get(pages, '[0]', {});
  }

  return Object.freeze({
    set,
    getLocal
  });
})();

export default Role;
