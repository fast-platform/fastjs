import Model from '../Fluent/Model';
import Fluent from '../Fluent/Fluent';

export default Fluent.extend(Model, {
  properties: {
    name: 'User',
    remoteConnection: {
      baseUrl: 'https://myBaseUrl.com/',
      path: 'user',
      token: undefined
    }
  }
})();
