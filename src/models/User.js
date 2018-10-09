import axios from 'axios';
import Configuration from './Configuration';
import Utilities from 'utilities';
import Model from '../Fluent/Model';
import Fluent from '../Fluent/Fluent';

export default Fluent.extend(Model, {
  properties: {
    name: 'User',
    remoteConnection: {
      baseUrl: process.env.FLUENT_FORMIO_BASEURL || 'https://myFluentBaseUrl.com/',
      path: 'user',
      token: undefined
    },
    methods: {
      async storeLocally (formioUser) {
        let user = await this.local()
          .where('data.data.email', '=', formioUser.data.email)
          .first();

        formioUser = Utilities.deleteNulls(formioUser);
        let isUserAlreadyStored = !!user && !Utilities.isEmpty(user);

        //  check if user is already present in local storage
        if (isUserAlreadyStored) {
          throw new Error('The user email is already taken');
        }

        return this.local().insert({
          data: formioUser
        });
      },
      async updateUser (formioUser) {
        // let user = await this.local().where('data.data.email', '=', formioUser.data.email).first();

        // TODO We should at least delete the local user to insert the next one
        formioUser = Utilities.deleteNulls(formioUser);

        return this.local().insert({
          data: formioUser
        });
      },
      async login ({ credentials, role }) {
        let url = (await Configuration.local().first()).baseURL;

        if (role === 'admin') {
          url = url + '/admin/login';
        } else {
          url = url + '/user/login';
        }
        return axios.post(url, {
          data: {
            email: credentials.username,
            password: credentials.password
          }
        });
      }
    }
  }
})();
