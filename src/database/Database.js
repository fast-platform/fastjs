import Loki from 'lokijs';
import LokiIndexedAdapter from 'lokijs/src/loki-indexed-adapter';
import Promise from 'bluebird';
/*
|--------------------------------------------------------------------------
| LockiDB Config
|--------------------------------------------------------------------------
| This is the configuration for the Local DB creation.
|
*/
var DB = null;
const _create = function ({ env }) {
  return new Promise((resolve) => {
    var idbAdapter;
    var pa;
    var db;

    if (env === 'production') {
      idbAdapter = new LokiIndexedAdapter('FAST');

      pa = new Loki.LokiPartitioningAdapter(idbAdapter, {
        paging: true
      });
      /*
    eslint-disable
    */
      db = new Loki('FAST', {
        adapter: pa,
        autosave: true,
        autosaveInterval: 1000,
        autoload: true,
        autoloadCallback: databaseInitialize
      });
    } else {
      db = new Loki('FAST', {
        autoloadCallback: databaseInitialize,
        autoload: true,
        autosave: true,
        autosaveInterval: 1000
      });
    }

    function databaseInitialize() {
      var submissions = db.getCollection('Submission');
      var forms = db.getCollection('Form');
      var translations = db.getCollection('Translation');
      var users = db.getCollection('User');
      var roles = db.getCollection('Role');
      var configuration = db.getCollection('Configuration');
      var pages = db.getCollection('Pages');

      if (submissions === null) {
        db.addCollection('Submission');
      }
      if (configuration === null) {
        db.addCollection('Configuration');
      }
      if (pages === null) {
        db.addCollection('Pages');
      }
      if (forms === null) {
        db.addCollection('Form');
      }
      if (translations === null) {
        db.addCollection('Translation');
      }
      if (users === null) {
        db.addCollection('User');
      }
      if (roles === null) {
        db.addCollection('Role');
      }
      resolve(db);
    }
  });
};

export async function get({ env }) {
  if (!DB) {
    DB = await _create({ env });
  }
  return DB;
}
