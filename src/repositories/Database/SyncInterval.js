import Sync from './Sync';
let SyncInterval = (() => {
  async function set (milliseconds) {
    let rInterval = function (callback, delay) {
      let dateNow = Date.now,
        requestAnimation = window.requestAnimationFrame,
        start = dateNow(),
        stop,
        intervalFunc = function () {
          // eslint-disable-next-line no-use-before-define
          dateNow() - start < delay || ((start += delay), callback());
          // eslint-disable-next-line no-use-before-define
          stop || requestAnimation(intervalFunc);
        };

      requestAnimation(intervalFunc);
      return {
        clear: function () {
          stop = 1;
        }
      };
    };

    rInterval(() => {
      return Sync.now();
    }, milliseconds);
  }

  return Object.freeze({
    set
  });
})();

export default SyncInterval;
