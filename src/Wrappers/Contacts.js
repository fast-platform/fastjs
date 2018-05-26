import { Platform } from 'quasar';
const Contacts = class {
  /**
   * [status description]
   * @return {Promise} [description]
   */
  static pick () {
    return new Promise((resolve, reject) => {
      if (!Platform.is.cordova) {
        reject(false);
      }
      navigator.contacts.pickContact(
        (contact) => {
          resolve(contact);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
};

export default Contacts;
