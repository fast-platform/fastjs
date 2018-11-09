import Promise from "bluebird";
import Loki from "lokijs";
import LokiIndexedAdapter from "lokijs/src/loki-indexed-adapter";
var DB = null;
let Database = (() => {
  /*
  |--------------------------------------------------------------------------
  | LockiDB Config
  |--------------------------------------------------------------------------
  | Configuration for the Local DB creation.
  |
  */
  const getModels = () => {
    const models =
      typeof window !== "undefined" &&
      window &&
      window._FLUENT_ &&
      window._FLUENT_.models
        ? window._FLUENT_.models
        : global && global._FLUENT_ && global._FLUENT_.models
        ? global._FLUENT_.models
        : undefined;
    return models;
  };
  /**
   *
   *
   * @param {Object} configuration- The configuration for the DB
   * @param {string} configuration.env - Environment i.e 'production'
   * @returns
   */
  const _create = ({ env }) => {
    return new Promise(resolve => {
      let idbAdapter;
      let pa;
      let db;

      let dbConfig = {
        autosave: true,
        autosaveInterval: 1000,
        autoload: true,
        /* eslint-disable no-use-before-define */
        autoloadCallback: databaseInitialize,
        throttledSaves: false
      };

      try {
        idbAdapter = new LokiIndexedAdapter("FAST");
        pa = new Loki.LokiPartitioningAdapter(idbAdapter, {
          paging: true
        });

        db = new Loki("FAST", { ...dbConfig, adapter: pa });
      } catch (error) {
        db = new Loki("FAST", dbConfig);
      }

      function databaseInitialize() {
        const baseModels = getModels();
        if (!baseModels) {
          throw new Error(
            'Cannot Start FLUENT, no models registered or you dont have access to the "window" or "global" variable'
          );
        }

        Object.keys(baseModels).forEach(model => {
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
   * Checks if the DB is created or if new
   * Models need to be added to the DB
   * @returns {Boolean}
   */
  const shouldRecreate = () => {
    if (!DB) {
      return true;
    }
    const windowModels = getModels();
    const dbModels = DB.collections.reduce((acc, collection) => {
      acc.push(collection.name);
      return acc;
    }, []);
    const should = !Object.keys(windowModels).every(element => {
      return dbModels.includes(element);
    });
    return should;
  };
  /**
   *
   *
   * @export
   * @param {Object} configuration- The configuration for the DB
   * @param {string} configuration.env - Environment i.e 'production'
   * @returns
   */
  const get = async function ({ env = "prod" } = {}) {   
    if (shouldRecreate()) {
      DB = await _create({ env });
    }
    return DB;
  };

  return Object.freeze({
    get
  });
})();

export default Database;
