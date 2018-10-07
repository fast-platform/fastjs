import md5 from 'md5';
import CONFIGURATION from '../../database/models/Configuration';

let Hash = class {
  static async string (string) {
    let config = await CONFIGURATION.getLocal();
    let hashed = '';

    hashed = md5(string, config.MD5_KEY);
    return hashed;
  }
};

export default Hash;
