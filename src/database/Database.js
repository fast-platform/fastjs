import Loki from 'lokijs';
import Promise from 'bluebird';
import LokiIndexedAdapter from 'lokijs/src/loki-indexed-adapter';
/*
|--------------------------------------------------------------------------
| LockiDB Config
|--------------------------------------------------------------------------
| This is the configuration for the Local DB creation.
|
*/
var DB;
const _create = function () {
  return new Promise((resolve) => {
    var idbAdapter = new LokiIndexedAdapter('FAST');

    var pa = new Loki.LokiPartitioningAdapter(idbAdapter, {
      paging: true
    });
    /*
    eslint-disable
    */
    var db = new Loki('FAST', {
      adapter: pa,
      autosave: true,
      autosaveInterval: 1000,
      autoload: true,
      autoloadCallback: databaseInitialize
    });

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

      // db.saveDatabase();
      resolve(db);
    }
  });
};

export async function get() {
  if (!DB) {
    DB = await _create();
  }
  return DB;
}
