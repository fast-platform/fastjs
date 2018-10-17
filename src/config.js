const config = (() => {
  var _FLUENT_FORMIO_BASEURL, _FAST_CONFIG_ID, _FAST_CONFIG_URL, _OFFLINE_START;

  function set ({
    FLUENT_FORMIO_BASEURL = undefined,
    FAST_CONFIG_ID = undefined,
    FAST_CONFIG_URL = undefined,
    OFFLINE_START = undefined }) {
    _FLUENT_FORMIO_BASEURL = FLUENT_FORMIO_BASEURL;
    _FAST_CONFIG_ID = FAST_CONFIG_ID;
    _FAST_CONFIG_URL = FAST_CONFIG_URL;
    _OFFLINE_START = OFFLINE_START;
  }
  function get () {
    return {
      FLUENT_FORMIO_BASEURL: _FLUENT_FORMIO_BASEURL,
      FAST_CONFIG_ID: _FAST_CONFIG_ID,
      FAST_CONFIG_URL: _FAST_CONFIG_URL,
      OFFLINE_START: _OFFLINE_START
    };
  }
  return Object.freeze({
    set,
    get
  });
})();

export default config;
