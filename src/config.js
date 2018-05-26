/* eslint-disable no-unused-vars */
let config = (() => {
  let jwt, url, submission, baseURL;

  function set ({ jwtToken = undefined, baseURL = undefined, submissionId = undefined }) {
    jwt = jwtToken;
    url = baseURL;
    submission = submissionId;
  }

  function setBaseUrl (baseUrl) {
    baseURL = baseUrl;
  }

  function get () {
    return { jwt, url, submission, baseURL };
  }
  return Object.freeze({
    set,
    get,
    setBaseUrl
  });
})();

export default config;
