import Configuration from 'repositories/Configuration/Configuration';
import md5 from 'md5';
import User from 'database/models/User';
import UserRepository from 'repositories/User/User';
import Connection from 'Wrappers/Connection';
import Role from 'database/models/Role';
import RoleRepo from 'repositories/Auth/Role';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';

let Auth = (() => {
  /**
   * [localAuthenticate description]
   * @param  {[type]} credentials [description]
   * @return {[type]}             [description]
   */
  async function localAuthenticate (credentials) {
    const { username, password } = credentials;
    let config = await Configuration.getLocal();

    // Hash password
    const hashedPassword = md5(password, config.MD5_KEY);

    // Get the user
    let dbUser = await User.local().find({
      'data.data.email': username
    });
    let userFound = dbUser && dbUser[0] ? dbUser[0] : undefined;

    console.log('user', userFound);
    if (!userFound) {
      throw new Error();
    }

    // Compare hashed passwords
    const isValidUser = userFound.data.data.hashedPassword === hashedPassword;

    if (!isValidUser) {
      throw new Error();
    }
    // If is valid, return the user
    return userFound;
  }
  /**
   * [remoteAuthenticate description]
   * @param  {[type]} credentials [description]
   * @param  {[type]} baseUrl     [description]
   * @return {[type]}             [description]
   */
  function remoteAuthenticate (credentials, baseUrl, role) {
    return UserRepository.login({ credentials: credentials, role: role }).then((response) => {
      // Store locally the user for future offline login
      let user = response.data;

      UserRepository.updateUser(user);
      return response;
    });
  }

  /**
   * [authenticate description]
   * @param  {[type]} credentials [description]
   * @return {Promise}             [description]
   */
  async function authenticate (credentials, baseUrl, role) {
    let isOnline = await Connection.isOnline();

    if (isOnline) {
      return remoteAuthenticate(credentials, baseUrl, role);
    }
    return localAuthenticate(credentials, baseUrl);
  }
  /**
   * [attempt description]
   * @param  {[type]}   credentials [description]
   * @return {Promise}   callback    [description]
   */
  function attempt (credentials, baseUrl, role) {
    role = role || 'user';

    return new Promise((resolve, reject) => {
      authenticate(credentials, baseUrl, role)
        // If credentials are OK
        .then(async (response) => {
          let headers = response.headers || {};
          let user = response.data;
          /* eslint-disable*/

          user.x_jwt_token = headers['x-jwt-token'];
          /* eslint-enable*/

          // Save auth user
          localStorage.setItem('authUser', JSON.stringify(user));

          // user.isAdmin = true
          let roles = await Role.local().find();

          roles = roles[0];
          user.rolesNames = [];
          Object.keys(roles).forEach((key) => {
            if (key !== '$loki' && key !== '_id' && key !== 'meta') {
              if (user.roles && user.roles.indexOf(roles[key]._id) !== -1) {
                user.rolesNames.push(roles[key]);
              }
            }
          });

          localStorage.setItem('authUser', JSON.stringify(user));

          resolve(user);
        })
        // If there are errors
        .catch((error) => {
          console.log('There was an error over here!');
          reject(error);
        });
    });
  }
  /**
   * Retrieves the current auth user
   * @return {boolean} [description]
   */
  function user () {
    try {
      let user = JSON.parse(localStorage.getItem('authUser'));

      return user === null ? false : user;
    } catch (e) {
      localStorage.removeItem('authUser');
      return false;
    }
  }

  function email () {
    let email = '';

    if (Auth.user() && Auth.user().data && Auth.user().data.email) {
      email = Auth.user().data.email;
    } else if (Auth.user() && Auth.user().email) {
      email = Auth.user().email;
    }
    return email;
  }

  function hasRole (roleName) {
    let user = JSON.parse(localStorage.getItem('authUser'));

    user = user === null ? false : user;

    let result = _find(user.rolesNames, {
      title: roleName
    });

    return typeof result !== 'undefined';
  }

  function hasRoleIn (roles) {
    if (!roles || _isEmpty(roles)) {
      return true;
    }
    return roles.some((role) => {
      return hasRole(role) || role === 'Authenticated';
    });
  }

  async function hasRoleIdIn (rolesIds) {
    if (!rolesIds || _isEmpty(rolesIds)) {
      return true;
    }
    let appRoles = await RoleRepo.getLocal();

    let roles = rolesIds.reduce((reducer, roleId) => {
      Object.keys(appRoles).forEach(function (role) {
        if (appRoles[role] && appRoles[role]._id && appRoles[role]._id === roleId) {
          reducer.push(appRoles[role].title);
        }
      });
      return reducer;
    }, []);

    return roles.some((role) => {
      return hasRole(role) || role === 'Authenticated';
    });
  }
  /**
   * Checks if the current user is
   * Authenticated
   * @return {boolean}
   */
  function check () {
    let user = JSON.parse(localStorage.getItem('authUser'));

    return !!user && !!user.x_jwt_token;
  }

  /**
   * Logs the Authenticated User Out
   */
  async function logOut () {
    await localStorage.removeItem('authUser');
    await localStorage.removeItem('formioToken');
    await localStorage.removeItem('formioUser');
  }

  return Object.freeze({
    user,
    email,
    hasRoleIn,
    hasRoleIdIn,
    hasRole,
    check,
    logOut,
    attempt
  });
})();

export default Auth;
