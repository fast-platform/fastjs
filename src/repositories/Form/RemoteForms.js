import Form from 'database/models/Form';
import _isEmpty from 'lodash/isEmpty';
import Event from 'Wrappers/Event';
import Configuration from 'repositories/Configuration/Configuration';

let RemoteForms = (() => {
  /**
   *
   */
  async function update ({ filter = undefined } = {}) {
    let remoteForms = await Form.remote().find({ filter });
    // For every new or updated entry

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
          data: form
        });
      }
    });
    if (!_isEmpty(remoteForms) && filter) {
      await Configuration.setLastUpdated({ element: 'register' });
    } else if (!_isEmpty(remoteForms)) {
      await Configuration.setLastUpdated({ element: 'Form' });
    }
    Event.emit({
      name: 'FAST:FORMS:UPDATED',
      data: remoteForms.length,
      text: 'Forms were updated'
    });
  }
  return Object.freeze({
    update
  });
})();

export default RemoteForms;
