import Model from '../Fluent/Model';
import Fluent from '../Fluent/Fluent';

export default Fluent.extend(Model, {
  properties: {
    name: 'Role',
    remoteConnection: {
      baseUrl: process.env.FLUENT_FORMIO_BASEURL || 'https://myFluentBaseUrl.com/',
      path: 'access',
      token: undefined
    }
  }
})();
