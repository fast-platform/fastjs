import Model from '../Fluent/Model';
import Fluent from '../Fluent/Fluent';

export default Fluent.extend(Model, {
  properties: {
    name: 'Pages',
    remoteConnection: {
      baseUrl: 'https://myBaseUrl.com/',
      path: 'fast-app-pages',
      token: undefined
    }
  }
})();
