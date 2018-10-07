import md5 from 'md5';
import CONFIGURATION from '../../database/models/Configuration';
import User from 'repositories/User/User';
import Submission from 'repositories/Submission/SubmissionRepository';
import Event from 'Wrappers/Event';

let StoreForm = class {
  static async handle ({ submission, formio, hashField }) {
    if (typeof hashField !== 'undefined') {
      return StoreForm.storeUser({ submission, formio, hashField });
    }
    return StoreForm.storeSubmission({ submission, formio, hashField });
  }
  /**
   *
   */
  static async storeSubmission ({ submission, formio, hashField }) {
    let created = await Submission.add({
      submission: submission,
      formio: formio
    });

    if (!created) {
      return;
    }

    if (submission.trigger && submission.trigger === 'resourceCreation') {
    }
    if (submission.trigger && submission.trigger === 'formioSubmit') {
      created.isSubmit = true;
    } else {
      created.isSubmit = false;
    }

    Event.emit({
      name: 'FAST:SUBMISSION:CHANGED',
      data: created,
      text: 'Draft Saved'
    });

    return created;
  }
  /**
   *
   */
  static async storeUser ({ submission, formio, hashField }) {
    let config = await CONFIGURATION.getLocal();

    submission.data.hashedPassword = md5(submission.data.password, config.MD5_KEY);

    let user = await User.storeLocally({
      data: submission.data,
      sync: false,
      formio: formio
    });

    return user;
  }
};

export default StoreForm;
