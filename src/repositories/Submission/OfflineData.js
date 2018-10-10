import Connection from 'Wrappers/Connection';
import Submission from 'models/Submission';
import Event from 'Wrappers/Event';
import Scheduler from 'repositories/Database/Scheduler';
import Form from 'models/Form';
import to from 'await-to-js';

let OfflineData = (() => {
  const sendSubmission = async (offlineSubmission) => {
    let remoteEndPoint = Form.getModel({ path: offlineSubmission.path }).remote();

    offlineSubmission.queuedForSync = true;
    // Set the submission as queuedForSync
    await Submission.local().update(offlineSubmission);

    let [error, insertedData] = await to(remoteEndPoint.insert(offlineSubmission));

    if (error) {
      console.log(error);
      offlineSubmission.queuedForSync = false;
      offlineSubmission.syncError = error;
      Submission.local().update(offlineSubmission);
      throw new Error('Error while Syncing data');
    }
    if (!insertedData._id) {
      throw Error('The remote endpoint did not save the submission properly (no _id back)');
    }

    let [e] = await to(Submission.local().remove(offlineSubmission._id));

    if (e) {
      throw new Error('Sync error:Could not remove local submission after sync');
    }
    return true;
  };

  async function send (data) {
    let offlineSubmissions = data;
    let isOnline = await Connection.isOnline();

    let PromiseEach = async function (arr, fn) {
      for (const item of arr) await fn(item);
    };

    if (isOnline) {
      await Scheduler.startSync();

      let [error] = await to(
        PromiseEach(offlineSubmissions, async (offlineSubmission) => {
          await sendSubmission(offlineSubmission);
        })
      );

      Scheduler.stopSync();
      if (error) {
        console.log(error);
      }

      console.log('Submissions Synced');
      Event.emit({
        name: 'FAST:SUBMISSION:SYNCED',
        data: {},
        text: 'The submissions have been synced'
      });
    }
  }

  return Object.freeze({
    send
  });
})();

export default OfflineData;
