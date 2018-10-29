import Promise from 'bluebird';
import Loki from 'lokijs';
import LokiIndexedAdapter from 'lokijs/src/loki-indexed-adapter';

let Database = (() => {
  var DB = null;
  /*
  |--------------------------------------------------------------------------
  | LockiDB Config
  |--------------------------------------------------------------------------
  | Configuration for the Local DB creation.
  |
  */

  /**
   *
   *
   * @param {Object} configuration- The configuration for the DB
   * @param {string} configuration.env - Environment i.e 'production'
   * @returns
   */
  const _create = function ({ env }) {
    return new Promise((resolve) => {
      let idbAdapter;
      let pa;
      let db;

      let dbConfig = {
        autosave: true,
        autosaveInterval: 1000,
        autoload: true,
        /* eslint-disable no-use-before-define */
        autoloadCallback: databaseInitialize
      };

      try {
        idbAdapter = new LokiIndexedAdapter('FAST');
        pa = new Loki.LokiPartitioningAdapter(idbAdapter, {
          paging: true
        });

        db = new Loki('FAST', { ...dbConfig, adapter: pa });
      } catch (error) {
        db = new Loki('FAST', dbConfig);
      }

      function databaseInitialize() {
        const baseModels =
          window && window._FLUENT_ && window._FLUENT_.models ?
            window._FLUENT_.models :
            global && global._FLUENT_ && global._FLUENT_.models ?
              global._FLUENT_.models :
              undefined;

        if (!baseModels) {
          throw new Error(
            'Cannot Start FLUENT, no models registered or you dont have access to the "window" or "global" variable'
          );
        }

        Object.keys(baseModels).forEach((model) => {
          const dbModel = db.getCollection(model);

          if (!dbModel) {
            db.addCollection(model);
          }
        });
        resolve(db);
      }
    });
  };

  /**
   *
   *
   * @export
   * @param {Object} configuration- The configuration for the DB
   * @param {string} configuration.env - Environment i.e 'production'
   * @returns
   */
  const get = async function ({ env = 'prod' } = {}) {
    return _create({ env });
  };

  return Object.freeze({
    get
  });
})();

export default Database;
