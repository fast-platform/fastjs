/* eslint-disable no-unused-vars */
let config = (() => {
  let jwt, url, submission, baseURL, translations;

  function set ({ jwtToken = undefined, baseURL = undefined, submissionId = undefined, translations = undefined }) {
    jwt = jwtToken;
    url = baseURL;
    submission = submissionId;
    translations = translations;
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
