import moment from 'moment';
import Auth from 'repositories/Auth/Auth';
import SyncHelper from 'database/helpers/SyncHelper';
import SubmissionModel from 'database/models/Submission';

let Submission = (() => {
  function formatSubmission (submission, formio) {
    submission = SyncHelper.deleteNulls(submission);

    submission = {
      ...submission,
      sync: false,
      /*eslint-disable*/
      user_email: Auth.email(),
      /* eslint-enable*/
      formio: formio
    };
    return submission;
  }

  function alreadyStored (submission) {
    return submission._lid || submission._id;
  }

  async function create (submission) {
    submission.created = moment().unix();
    let newSubmission = await SubmissionModel.local().insert({
      data: submission
    });

    return newSubmission;
  }

  function shouldUpdate (localSubmission, submission) {
    // Cases where we want to update
    let sendingSubmission = submission.draft === false;
    let fromDraftToSubmission = localSubmission.data.draft === false && submission.draft === false;
    let autoSave = submission.trigger === 'autoSaveAsDraft';
    let isSynced = !!(localSubmission.data.access && Array.isArray(localSubmission.data.access));
    let hasError = localSubmission.data.syncError !== false && typeof localSubmission.data.syncError !== 'undefined';

    return ((sendingSubmission || fromDraftToSubmission) && !autoSave) || (!isSynced && autoSave && !hasError);
  }

  async function update (submission) {
    submission = {
      ...submission,
      type: 'update',
      updated: moment().unix()
    };

    let localSubmission = await SubmissionModel.local().get(submission._lid || submission._id);

    if (shouldUpdate(localSubmission, submission)) {
      localSubmission.data = submission;
      localSubmission.isSubmit = submission._lid ? false : localSubmission.isSubmit;
      const saved = await SubmissionModel.local().update(localSubmission);

      return saved;
    }
    return localSubmission;
  }
  /**
   *
   * @param {*} submitedForm
   * @param {*} formio
   */
  async function add ({ submission, formio }) {
    submission = formatSubmission(submission, formio);
    // If we are updating the submission
    if (alreadyStored(submission)) {
      return update(submission);
    }
    // If we are creating a new draft from scratch or a resource
    let newSubmission = await create(submission);

    switch (submission.trigger) {
      case 'importSubmission':
      case 'createLocalDraft':
      case 'resourceCreation':
        return newSubmission;
        break;
      case 'createParalelSurvey':
        newSubmission.trigger = 'createParalelSurvey';
        newSubmission.data.data.parallelSurvey = SubmissionModel.local().setParallelSurvey({
          ...SubmissionModel.local().getParallelSurvey(newSubmission),
          submissionId: newSubmission._id
        });
        await SubmissionModel.local().update(newSubmission);
        return newSubmission;
        break;
    }
  }

  return Object.freeze({
    add
  });
})();

export default Submission;
