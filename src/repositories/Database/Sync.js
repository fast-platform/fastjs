import _filter from 'lodash/filter';
import User from 'database/models/User';
import Auth from 'repositories/Auth/Auth';
import Submission from 'database/models/Submission';
import OfflineData from 'repositories/Submission/OfflineData';
import Scheduler from 'repositories/Database/Scheduler';
import Event from 'Wrappers/Event';

let Sync = class {
  /**
   *
   * @param {*} vm
   */
  static async now (vm) {
    await Sync.syncUsers();

    if (Auth.check()) {
      await Sync.syncSubmission(vm);
    }
  }
  static async check () {
    let unsyncSubmissions = await Submission.local().getUnsync();

    if (unsyncSubmissions.length > 0) {
      Event.emit({ name: 'FAST:SUBMISSION:UNSYNCED', data: true, text: 'There are unsynced Submissions' });
    } else {
      Event.emit({ name: 'FAST:SUBMISSION:UNSYNCED', data: false, text: 'There are no unsynced Submissions' });
    }
  }
  /**
   *
   * @param {*} db
   * @param {*} vm
   */
  static async syncSubmission () {
    let usersAreSync = await Sync.areUsersSynced();

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
    let users = await Sync.getUsersToSync();

    return !!users && Array.isArray(users) && users.length === 0;
  }
  /**
   *
   * @param {*} param
   */
  static async syncUsers () {
    let users = await Sync.getUsersToSync();

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
