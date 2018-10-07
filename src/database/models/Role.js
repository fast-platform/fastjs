import Model from '../Fluent/Model';
import Fluent from '../Fluent/Fluent';

export default Fluent.extend(Model, {
  properties: {
    name: 'Role',
    remoteConnection: undefined
  }
})();
