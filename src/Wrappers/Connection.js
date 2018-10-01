import Event from './Event';
import Promise from 'bluebird';
/* eslint-disable no-unused-vars */
let Connection = (() => {
  let online = window.navigator.onLine;

  function setOnline () {
    if (!online) {
      online = true;
      Event.emit({
        name: 'FAST:CONNECTION:ONLINE',
        data: online,
        text: 'Application is now online'
      });
    }
  }

  function setOffline () {
    if (online) {
      online = false;
      Event.emit({
        name: 'FAST:CONNECTION:OFFLINE',
        data: online,
        text: 'Application is now offline'
      });
    }
  }

  /**
   * [status description]
   * @return {Promise} [description]
   */
  function initEventListeners () {
    Event.listen({
      name: 'online',
      callback: function () {
        console.log('App is now online');
        setOnline();
      }
    });
    Event.listen({
      name: 'offline',
      callback: function () {
        console.log('App is now offline');
        setOffline();
      }
    });
  }

  function isOnline () {
    return true;
    return new Promise((resolve, reject) => {
      var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');

      xhr.onload = function () {
        resolve(true);
      };
      xhr.onerror = function (e) {
        resolve(false);
      };
      xhr.open('GET', 'https://yesno.wtf/api', true);
      xhr.send();
    });
  }

  return Object.freeze({
    isOnline,
    initEventListeners
  });
})();

export default Connection;
