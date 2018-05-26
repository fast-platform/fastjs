import Formio from 'formiojs';
import Translation from 'database/models/Translation';
import GetRequest from './repositories/offlinePlugin/GetRequest';
import PostRequest from './repositories/offlinePlugin/PostRequest';

const OFFLINE_PLUGIN = class {
  static getPlugin ({ formio, hashField }) {
    let plugin = {
      priority: 0,
      staticRequest: async (args) => {
        /*
        return
        // Try to get the form associated to the static request
        let formArray = args.url.split('/')

        // Making a static Request to Form.io using the Form path
        let localformId = formArray[4] ? formArray[4] : ''

        // Making a static Request to FORM.io Using formID instead of Name
        if (formArray[5] && formArray[5] === 'form') {
          localformId = formArray[6] ? formArray[6] : ''
        }
        let form = await Form.local().get(localformId)
        // If its a external call outside FORM.io (Local Resources)
        if (args.url.indexOf('form.io') === -1 && args.method === 'GET') {
          let a = {
            'count': 811,
            'previous': null,
            'results': [{
              'url': 'https://pokeapi.co/api/v2/pokemon/1/',
              'name': 'aaa'
            }]
          }
          return a
        }
        // If there is no form associated, we stop
        if (!form) {
          console.log('there is no form associated')
          return
        }

        let submissions = await Submission.local().stored(Auth.user()._id, form.path)
        let jsonSubmissions = this.LocalToJson(submissions)
        return jsonSubmissions
        */
      },
      request: async (args) => {
        Formio.clearCache();

        if (args.method === 'GET') {
          let result = GetRequest.handle(args);

          return result;
        }
        // If we are trying to save a submission
        if (args.method === 'POST' || args.method === 'PUT') {
          console.log('we are trying to save a submission');
          let submission = await PostRequest.handle({ args, hashField, formio });

          return submission;
        }
      }
    };

    return plugin;
  }

  /**
   * Transforms the Local Lockijs submissions that
   * are dinamic, to an static array so we
   * can use it as Json input for the
   * selects
   * @param {[type]} lockiJSData [description]
   */
  static LocalToJson (lockiJSData) {
    let transformedArray = [];

    lockiJSData.forEach(function (element) {
      transformedArray.push(element.data);
    });
    return transformedArray;
  }
  // Do not removed this function is used inside the formio.vue component
  static async getLocalTranslations () {
    let translations = await Translation.local().getFormTranslations();

    return translations;
  }
};

export default OFFLINE_PLUGIN;
