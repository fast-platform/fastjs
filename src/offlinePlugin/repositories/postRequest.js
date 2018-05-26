import _debounce from 'lodash/debounce';
import StoreForm from './storeForm';

const PostRequest = class {
  /**
   *
   * @param {*} args
   */
  static async handle ({ args, hashField, formio }) {
    if (args.type === 'submission') {
      return PostRequest.handleSubmission({ args, hashField, formio });
    }
  }
  /**
   *
   */
  static async handleSubmission ({ args, hashField, formio }) {
    let submission = args.data;

    if (args.data && !args.data.trigger) {
      let formSubmission = {
        data: args.data.data,
        redirect: false,
        draft: false,
        trigger: 'resourceCreation'
      };

      submission = formSubmission;
    }
    let dStoreForm = _debounce(StoreForm.handle, 1000);

    dStoreForm({ submission, formio, hashField });
    return args.data;
  }
};

export default PostRequest;
