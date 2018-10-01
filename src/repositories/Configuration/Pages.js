import Connection from 'Wrappers/Connection';
import Pages from 'database/models/Pages';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import to from 'await-to-js';
import Configuration from 'repositories/Configuration/Configuration';
import moment from 'moment';

let PAGES = (() => {
  function getLocalPagesDate (localPages) {
    return _get(localPages, '[0].fastUpdated', 0);
  }
  async function setOfflinePages ({ appConf }) {
    let localPages = await Pages.local().find();

    let localDate = getLocalPagesDate(localPages);
    let config = await Configuration.getLocal();
    let offlinePages = _get(appConf.offlineFiles.Pages, '[0].data', undefined);

    if (config.fastUpdated >= localDate) {
      if (localPages) {
        await Pages.local().clear();
      }
      let newPages = await Pages.local().insert({ ...offlinePages, fastUpdated: moment().unix() });

      return newPages;
    }

    return _get(localPages, '[0].data', undefined);
  }

  async function setOnlinePages () {
    let localPages, remotePages, error;

    localPages = await Pages.local().find();
    localPages = _get(localPages, '[0]', undefined);
    let isOnline = await Connection.isOnline();

    if (isOnline) {
      [error, remotePages] = await to(Pages.remote().find({ limit: 500 }));
      if (error) {
        throw new Error(error);
      }
    }
    remotePages = _get(remotePages, '[0].data', undefined);
    let newPages = localPages;

    if (remotePages && !_isEmpty(remotePages)) {
      if (localPages) {
        await Pages.local().clear();
      }
      remotePages.fastUpdated = moment().unix();

      newPages = await Pages.local().insert(remotePages);
    }

    return newPages;
  }

  async function set ({ appConf, forceOnline }) {
    if (String(appConf.offlineStart) === 'true' && !forceOnline) {
      return setOfflinePages({ appConf });
    }
    return setOnlinePages();
  }

  async function getLocal (submission) {
    let pages = await Pages.local().find();

    return _get(pages, '[0]', {});
  }

  return Object.freeze({
    set,
    getLocal
  });
})();

export default PAGES;
