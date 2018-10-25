import Utilities from 'utilities';
import Form from '../Form';

let Columns = class {
  static async getTableView (path) {
    const form = (await Form.find({ path })).data;

    return Utilities.findComponents(form.components, {
      input: true,
      tableView: true
    })
      .slice(0, 7)
      .filter(c => {
        return !!(c.label !== '');
      });
  }
};

export default Columns;
