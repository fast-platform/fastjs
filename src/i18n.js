import i18next from 'i18next';

let i18n = (() => {
  /**
   *
   * @param {Object} translations
   */
  function init(translations) {
    return i18next.init(
      {
        lng: 'en',
        debug: false,
        resources: translations
      },
      function (err, t) {
        if (err) {
          console.log(err);
        }
        return t;
      }
    );
  }

  return Object.freeze({
    init
  });
})();

export default i18n;
