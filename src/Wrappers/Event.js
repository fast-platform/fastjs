let Event = (() => {
  function emit ({ name, data, text }) {
    var customEvent = new CustomEvent(name, {
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
