import axios from 'axios';
import _debounce from 'lodash/debounce';
import Event from './Event';
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

  function check () {
    let dHeartBeat = _debounce(this.heartBeat, 3000);

    return dHeartBeat;
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
    return online;
  }

  function heartBeat (vm) {
    return axios
      .get('https://google.com')
      .then(() => {
        this.setOnline.bind(this)(vm);
        return online;
      })
      .catch(() => {
        this.setOffline.bind(this)(vm);
        return online;
      });
  }
  return Object.freeze({
    check,
    isOnline,
    initEventListeners
  });
})();

export default Connection;
