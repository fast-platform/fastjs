import Form from 'database/models/Form';
import _isEmpty from 'lodash/isEmpty';
import Event from 'Wrappers/Event';
import Configuration from 'repositories/Configuration/Configuration';
import Utilities from 'utilities';
import moment from 'moment';
let RemoteForms = (() => {
  function getLocalFormsDate (localForms) {
    return Utilities.get(localForms, '[0].fastUpdated', 0);
  }
  async function setOfflineForms ({ appConf }) {
    let localForms = await Form.local().find();

    let localDate = getLocalFormsDate(localForms);
    let config = await Configuration.getLocal();
    let offlineForms = Utilities.get(appConf.offlineFiles, 'Forms', undefined);

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
    // For every new or updated entry
    let unixDate = moment().unix();

    remoteForms.forEach(async function (form) {
      // Find the local Form
      let localRes = await Form.local().findOne({
        'data._id': form._id
      });

      // If the local form exists
      if (!_isEmpty(localRes)) {
        // Replace it with the new Form
        localRes.data = form;
        await Form.local().update(localRes);
      } else {
        // If it doesn't, create a new one
        await Form.local().insert({
          data: form,
          fastUpdated: unixDate
        });
      }
    });

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
