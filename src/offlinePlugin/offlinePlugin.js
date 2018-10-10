import GetRequest from './getRequest';

const OFFLINE_PLUGIN = class {
  static getPlugin ({ formio, hashField }) {
    let plugin = {
      priority: 0,
      request: async (args) => {
        if (args.method === 'GET') {
          return GetRequest.handle(args);
        }
      }
    };

    return plugin;
  }
};

export default OFFLINE_PLUGIN;
