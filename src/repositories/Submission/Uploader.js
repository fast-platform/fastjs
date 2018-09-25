var request = require('request');

import Promise from 'bluebird';
let Uploader = class {
  static async sendDataToFormIO (submission) {
    return new Promise((resolve, reject) => {
      var requestPayload = {
        data: submission.data
      };

      console.log('Sending', requestPayload);
      request.post(
        {
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          url: 'https://vbemsizlqbxmzzk.form.io/translations/submission',
          form: requestPayload
        },
        function (error, response, body) {
          if (error) {
            console.log('Error', error);
            reject(error);
          } else {
            console.log('Enviado!', response.body);
            resolve();
          }
        }
      );
    });
  }
};

export default Uploader;
