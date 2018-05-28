import Connection from 'Wrappers/Connection';
import Pages from 'database/models/Pages';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import to from 'await-to-js';

let PAGES = (() => {
  async function set () {
    let localPages, remotePages, error;

    localPages = await Pages.local().find();
    localPages = _get(localPages, '[0]', undefined);

    if (Connection.isOnline()) {
      [error, remotePages] = await to(Pages.remote().find({ limit: 500 }));
      if (error) {
        throw new Error(error);
      }
    }
    remotePages = _get(remotePages, '[0].data', undefined);
    if (remotePages) {
      if (localPages) {
        await Pages.local().remove(localPages);
      }
      if (!_isEmpty(remotePages)) {
        let insertedConfig = await Pages.local().insert(remotePages);

        return insertedConfig;
      }
    } else {
      return localPages;
    }
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