import config from 'config';
import USER from 'database/models/User';
import SyncHelper from 'database/helpers/SyncHelper';
import _isEmpty from 'lodash/isEmpty';
import axios from 'axios';

let User = (() => {
  async function storeLocally (formIoUser) {
    let user = await USER.local().findOne({
      'data.data.email': formIoUser.data.email
    });

    formIoUser = SyncHelper.deleteNulls(formIoUser);
    let isUserAlreadyStored = !!user && !_isEmpty(user);

    //  check if user is already present in local storage
    if (isUserAlreadyStored) {
      user.data = formIoUser;
      //  update the user with the updated information
      let error = new Error('The user email is already taken');

      throw error;
      // User.local().update(user)
    } else {
      //  Insert the new user
      let user = await USER.local().insert({
        data: formIoUser
      });

      return user;
    }
  }
  async function updateUser (formIoUser) {
    let user = await USER.local().findOne({
      'data.data.email': formIoUser.data.email
    });

    formIoUser = SyncHelper.deleteNulls(formIoUser);
    let isUserAlreadyStored = !!user && !_isEmpty(user);

    //  check if user is already present in local storage
    if (isUserAlreadyStored) {
      let user = await USER.local().insert({
        data: formIoUser
      });

      return user;
    }
  }

  async function login ({ credentials, role }) {
    let url = config.get().baseURL;

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

  return Object.freeze({
    storeLocally,
    updateUser,
    login
  });
})();

export default User;
