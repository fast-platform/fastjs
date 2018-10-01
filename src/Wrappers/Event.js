let Event = (() => {
  function emit ({ name, data, text }) {
    let CustomEvent = function (event, params) {
      var evt = document.createEvent('CustomEvent');

      params = params || { bubbles: false, cancelable: false, detail: undefined };

      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };

    let customEvent = CustomEvent(name, {
      detail: {
        data: data,
        text: text
      }
    });

    window.dispatchEvent(customEvent);
  }
  function listen ({ name, callback }) {
    window.addEventListener(name, callback);
  }

  function remove ({ name, callback }) {
    window.removeEventListener(name, callback);
  }
  return Object.freeze({
    emit,
    listen,
    remove
  });
})();

export default Event;
