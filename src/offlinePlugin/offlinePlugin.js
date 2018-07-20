import Formio from 'formiojs';
import Translation from 'database/models/Translation';
import GetRequest from './repositories/getRequest';
import PostRequest from './repositories/postRequest';

const OFFLINE_PLUGIN = class {
  static getPlugin ({ formio, hashField }) {
    let plugin = {
      priority: 0,
      request: async (args) => {
        Formio.clearCache();

        if (args.method === 'GET') {
          return GetRequest.handle(args);
        }

        // If we are trying to save a submission
        if (args.method === 'POST' || args.method === 'PUT') {
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
