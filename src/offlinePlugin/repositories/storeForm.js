import md5 from 'md5';
import router from 'config/router';
import CONFIGURATION from 'repositories/Configuration/Configuration';
import User from 'repositories/User/User';
import Submission from 'repositories/Submission/SubmissionRepository';
import Event from 'Wrappers/Event';

let StoreForm = class {
  static handle ({ submission, formio, hashField }) {
    if (typeof hashField !== 'undefined') {
      StoreForm.storeUser({ submission, formio, hashField });
    } else {
      StoreForm.storeSubmission({ submission, formio, hashField });
    }
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

    if (submission._id) {
      let config = await CONFIGURATION.getLocal();

      if (submission.redirect === true) {
        switch (config.SAVE_REDIRECT) {
          case 'dashboard':
            router.push({
              name: 'dashboard'
            });
            break;
          case 'collected':
            router.push({
              name: 'formio_form_show',
              params: {
                idForm: formio.formId
              }
            });
            break;
          default:
            router.push({
              name: 'dashboard'
            });
            break;
        }
      }
    } else if (created.data && created.data.trigger && created.data.trigger === 'importSubmission') {
      return;
    } else {
      router.push({
        name: 'formio_submission_update',
        params: {
          idForm: formio.formId,
          idSubmission: created._id
        }
      });
    }
    return created;
  }
  /**
   *
   */
  static async storeUser ({ submission, formio, hashField }) {
    let config = await CONFIGURATION.getLocal();

    submission.data.hashedPassword = md5(submission.data.password, config.MD5_KEY);

    User.storeLocally({
      data: submission.data,
      sync: false,
      formio: formio
    })
      .then(() => {
        router.push({
          path: '/login'
        });
      })
      .catch((error) => {
        console.log(error);
        /*
        eventHub.emit(
          'FAST:USER:REGISTRATION:ERROR',
          submission.data
        );
        console.log(error);
        */
      });
  }
};

export default StoreForm;
