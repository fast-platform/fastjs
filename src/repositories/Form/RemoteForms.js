import Form from 'database/models/Form';
import Event from 'Wrappers/Event';
import Configuration from 'repositories/Configuration/Configuration';
import Utilities from 'utilities';
import moment from 'moment';
let RemoteForms = (() => {
  function getLocalFormsDate (localForms) {
    return Utilities.get(() => localForms[0].fastUpdated, 0);
  }
  async function setOfflineForms ({ appConf }) {
    let localForms = await Form.local().find();

    let localDate = getLocalFormsDate(localForms);
    let config = await Configuration.getLocal();
    let offlineForms = Utilities.get(() => appConf.offlineFiles.Forms);

    if (config.fastUpdated >= localDate) {
      if (localForms) {
        await Form.local().clear();
      }
      offlineForms.forEach(async (form) => {
        await Form.local().insert({ data: form, fastUpdated: moment().unix() });
      });
      return offlineForms;
    }
    return localForms;
  }

  async function setOnlineForms () {
    let remoteForms = await Form.remote().find();
    let unixDate = moment().unix();

    if (remoteForms && !Utilities.isEmpty(remoteForms)) {
      await Form.local().clear();
      remoteForms.forEach(async function (form) {
        await Form.local().insert({
          data: form,
          fastUpdated: unixDate
        });
      });
    }
    Event.emit({
      name: 'FAST:FORMS:UPDATED',
      data: remoteForms.length,
      text: 'Forms were updated'
    });
  }

  async function set ({ appConf, forceOnline }) {
    if (appConf.offlineStart === 'true' && !forceOnline) {
      return setOfflineForms({ appConf });
    }
    return setOnlineForms();
  }
  return Object.freeze({
    set
  });
})();

export default RemoteForms;
