/* eslint-disable no-unused-vars */
let config = (() => {
  var jwt, url, submission, baseURL, translations;

  function set ({ jwtToken = undefined, baseURL = undefined, submissionId = undefined, i18n = undefined }) {
    jwt = jwtToken ? jwtToken : jwt;
    url = baseURL ? baseURL : url;
    submission = submissionId ? submissionId : submission ;
    translations = i18n ? i18n : translations ;
  }

  function setBaseUrl (baseUrl) {
    baseURL = baseUrl;
  }

  function get () {
    return { jwt, url, submission, baseURL, translations };
  }
  return Object.freeze({
    set,
    get,
    setBaseUrl
  });
})();

export default config;
