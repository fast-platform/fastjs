import moment from 'moment';
import 'moment/min/locales';

let Moment = class {
  static setLocales () {
    moment.locale(Moment.getLenguage());
  }
  static changeLanguage (code) {
    moment.locale(code);
  }

  static getLenguage () {
    return localStorage.getItem('defaultLenguage') ? localStorage.getItem('defaultLenguage') : 'en';
  }
};

export default Moment;
