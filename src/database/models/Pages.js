import Model from './base/Model';
import Fluent from '../Fluent';

export default Fluent.extend(Model, {
  properties: {
    name: 'Pages',
    path: 'fast-app-pages'
  }
})();
