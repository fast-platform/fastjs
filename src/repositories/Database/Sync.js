import _filter from 'lodash/filter';
import User from 'database/models/User';
import Auth from 'repositories/Auth/Auth';
import Submission from 'database/models/Submission';
import OfflineData from 'repositories/Submission/OfflineData';
import Scheduler from 'repositories/Database/Scheduler';

let Sync = class {
  /**
   *
   * @param {*} vm
   */
  static async now (vm) {
    await this.syncUsers();

    if (Auth.check()) {
      await this.syncSubmission(vm);
    }
  }
  /**
   *
   * @param {*} db
   * @param {*} vm
   */
  static async syncSubmission () {
    let usersAreSync = await this.areUsersSynced();

    if (!usersAreSync) {
      return;
    }

    let unsyncSubmissions = await Submission.local().getUnsync();

    let isSyncing = await Scheduler.isSyncing();

    if (unsyncSubmissions.length > 0 && !isSyncing) {
      OfflineData.send(unsyncSubmissions);
    }
  }
  /**
   *
   */
  static async getUsersToSync () {
    let filter = await User.local().find({
      'data.sync': false
    });

    return _filter(filter, function (o) {
      return o.data.sync === false;
    });
  }
  /**
   *
   */
  static async areUsersSynced () {
    let users = await this.getUsersToSync();

    return !!users && Array.isArray(users) && users.length === 0;
  }
  /**
   *
   * @param {*} param
   */
  static async syncUsers () {
    let users = await this.getUsersToSync();

    users = _filter(users, function (o) {
      return o.data.sync === false && !o.data.queuedForSync && !o.data.syncError;
    });

    let isSyncing = await Scheduler.isSyncing();

    if (Array.isArray(users) && users.length > 0 && !isSyncing) {
      OfflineData.send(users);
    }
  }
};

export default Sync;
