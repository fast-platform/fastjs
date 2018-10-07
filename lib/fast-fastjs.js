(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("moment"), require("bluebird"), require("md5"), require("axios"), require("lokijs"), require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define("fast-fastjs", ["moment", "bluebird", "md5", "axios", "lokijs", "_"], factory);
	else if(typeof exports === 'object')
		exports["fast-fastjs"] = factory(require("moment"), require("bluebird"), require("md5"), require("axios"), require("lokijs"), require("lodash"));
	else
		root["fast-fastjs"] = factory(root["moment"], root["bluebird"], root["md5"], root["axios"], root["lokijs"], root["_"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__10__, __WEBPACK_EXTERNAL_MODULE__30__, __WEBPACK_EXTERNAL_MODULE__52__, __WEBPACK_EXTERNAL_MODULE__65__, __WEBPACK_EXTERNAL_MODULE__138__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 56);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* eslint-disable no-unused-vars */
var Utilities = function () {
  /**
   * Deep clones a JS object using JSON.parse
   * This function will not clone object
   * functions
   * @param {Object} object
   */
  var cloneDeep = function cloneDeep(object) {
    return JSON.parse(JSON.stringify(object));
  };
  /**
   * Given an Object and its path, if exisits it will
   * return the value of it, if not the default
   * @param {Object} obj
   * @param {String} path
   * @param {*} def
   */
  var get = function get(fn, def) {
    try {
      return fn();
    } catch (e) {
      return def;
    }
  };
  /**
   *
   * @param {*} obj
   * @param {*} path
   * @param {*} def
   */
  var getFromPath = function getFromPath(obj, path, def) {
    var _path = path;

    if (path.includes(' as ')) {
      path = path.split(' as ');
      _path = path[0];
    }

    var assignedName = get(function () {
      return Array.isArray(path) && path[1].trim();
    }, undefined);

    var fullPath = _path.replace(/\[/g, '.').replace(/]/g, '').split('.').filter(Boolean).map(function (e) {
      return e.trim();
    });

    function everyFunc(step) {
      return !(step && (obj = obj[step]) === undefined);
    }

    var result = fullPath.every(everyFunc) ? obj : def;

    return { label: assignedName || _path, value: result };
  };
  /**
   *
   * @param {*} arr
   * @param {*} predicate
   */
  var uniqBy = function uniqBy(arr, predicate) {
    var cb = typeof predicate === 'function' ? predicate : function (o) {
      return o[predicate];
    };

    return [].concat(_toConsumableArray(arr.reduce(function (map, item) {
      var key = cb(item);

      map.has(key) || map.set(key, item);

      return map;
    }, new Map()).values()));
  };
  /**
   *
   */
  var orderBy = function orderBy() {};
  /**
   *
   * @param {*} value
   */
  var isEmpty = function isEmpty(value) {
    if (!value) {
      return true;
    }
    if (Array.isArray(value) || typeof value === 'string') {
      return !value.length;
    }
    for (var key in value) {
      if (hasOwnProperty.call(value, key)) {
        return false;
      }
    }
    return true;
  };
  /**
   *
   * @param {*} fn
   * @param {*} time
   */
  var debounce = function debounce(fn, time) {
    var timeout = void 0;

    return function () {
      var _this = this,
          _arguments = arguments;

      var functionCall = function functionCall() {
        return fn.apply(_this, _arguments);
      };

      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    };
  };

  return Object.freeze({
    cloneDeep: cloneDeep,
    get: get,
    orderBy: orderBy,
    isEmpty: isEmpty,
    debounce: debounce,
    getFromPath: getFromPath
  });
}();

exports.default = Utilities;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Model = __webpack_require__(4);

var _Model2 = _interopRequireDefault(_Model);

var _Fluent = __webpack_require__(3);

var _Fluent2 = _interopRequireDefault(_Fluent);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _Connection = __webpack_require__(5);

var _Connection2 = _interopRequireDefault(_Connection);

var _moment = __webpack_require__(1);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _Fluent2.default.extend(_Model2.default, {
  properties: {
    name: 'Configuration',
    path: undefined
  },
  methods: {
    /**
     *
     */
    getLocal: function getLocal() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var configuration;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.local().find();

              case 2:
                configuration = _context.sent;
                return _context.abrupt('return', _utilities2.default.get(function () {
                  return configuration[0];
                }));

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },

    /**
     *
     * @param {*} appConf
     */
    getRemote: function getRemote(appConf) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var remoteConfig, isOnline;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                remoteConfig = void 0;
                _context2.next = 3;
                return _Connection2.default.isOnline();

              case 3:
                isOnline = _context2.sent;

                if (!isOnline) {
                  _context2.next = 14;
                  break;
                }

                _context2.prev = 5;
                _context2.next = 8;
                return _this2.remote().find({
                  filter: [{ element: '_id', query: '=', value: appConf.appConfigId }],
                  limit: 1
                });

              case 8:
                remoteConfig = _context2.sent;
                _context2.next = 14;
                break;

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2['catch'](5);

                console.log('error', _context2.t0);

              case 14:
                return _context2.abrupt('return', _utilities2.default.get(function () {
                  return remoteConfig[0].data;
                }));

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[5, 11]]);
      }))();
    },

    /**
     *
     * @param {*} VUE
     * @param {*} configuration
     */
    assingGlobalVariable: function assingGlobalVariable(VUE, configuration) {
      if (VUE && VUE.prototype) {
        VUE.prototype.$FAST_CONFIG = configuration;
      } else if (VUE) {
        VUE.$FAST_CONFIG = configuration;
      }
    },

    /**
     *
     * @param {*} localConfig
     */
    getConfigDate: function getConfigDate(localConfig) {
      return _utilities2.default.get(function () {
        return localConfig.fastUpdated;
      }, 0);
    },

    /**
     *
     * @param {*} param0
     */
    setOfflineConfig: function setOfflineConfig(_ref) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var Vue = _ref.Vue,
            appConf = _ref.appConf;
        var localConfig, localConfigDate, offlineConfigDate, offlineConfig, insertedConfig;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this3.getLocal();

              case 2:
                localConfig = _context3.sent;
                localConfigDate = _this3.getConfigDate(localConfig);
                offlineConfigDate = appConf.offlineFiles.lastUpdated.date;

                if (!(offlineConfigDate > localConfigDate)) {
                  _context3.next = 15;
                  break;
                }

                offlineConfig = _extends({}, appConf.offlineFiles.this.data, {
                  fastUpdated: (0, _moment2.default)().unix()
                });

                if (!localConfig) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 10;
                return _this3.local().clear();

              case 10:
                _context3.next = 12;
                return _this3.local().insert(offlineConfig);

              case 12:
                insertedConfig = _context3.sent;


                _this3.assingGlobalVariable(Vue, insertedConfig);
                return _context3.abrupt('return', insertedConfig);

              case 15:
                _this3.assingGlobalVariable(Vue, localConfig);
                return _context3.abrupt('return', localConfig);

              case 17:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this3);
      }))();
    },

    /**
     *
     * @param {*} param0
     */
    setOnlineConfig: function setOnlineConfig(_ref2) {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var Vue = _ref2.Vue,
            appConf = _ref2.appConf;
        var localConfig, remoteConfig, insertedConfig;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this4.getLocal();

              case 2:
                localConfig = _context4.sent;
                _context4.next = 5;
                return _this4.getRemote(appConf);

              case 5:
                remoteConfig = _context4.sent;

                if (!(!localConfig && !remoteConfig)) {
                  _context4.next = 8;
                  break;
                }

                throw new Error('Application is not connected to internet, or the configuration file cannot be pulled');

              case 8:
                if (remoteConfig) {
                  _context4.next = 11;
                  break;
                }

                _this4.assingGlobalVariable(Vue, localConfig);
                return _context4.abrupt('return', localConfig);

              case 11:

                remoteConfig.fastUpdated = (0, _moment2.default)().unix();

                if (!localConfig) {
                  _context4.next = 15;
                  break;
                }

                _context4.next = 15;
                return _this4.local().clear();

              case 15:
                _context4.next = 17;
                return _this4.local().insert(remoteConfig);

              case 17:
                insertedConfig = _context4.sent;


                _this4.assingGlobalVariable(Vue, insertedConfig);
                return _context4.abrupt('return', insertedConfig);

              case 20:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this4);
      }))();
    },

    /**
     *
     * @param {*} param0
     */
    set: function set(_ref3) {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var Vue = _ref3.Vue,
            appConf = _ref3.appConf,
            forceOnline = _ref3.forceOnline;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(String(appConf.offlineStart) === 'true' && !forceOnline)) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt('return', _this5.setOfflineConfig({ Vue: Vue, appConf: appConf }));

              case 2:
                return _context5.abrupt('return', _this5.setOnlineConfig({ Vue: Vue, appConf: appConf }));

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this5);
      }))();
    }
  }
}).compose(_Fluent2.default.privatize).privatizeMethods('setOnlineConfig', 'setOfflineConfig', 'getConfigDate', 'assingGlobalVariable', 'getRemote')();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _it = __webpack_require__(34);

var _it2 = _interopRequireDefault(_it);

var _privatize = __webpack_require__(62);

var _privatize2 = _interopRequireDefault(_privatize);

var _compose2 = __webpack_require__(9);

var _compose3 = _interopRequireDefault(_compose2);

var _FluentConnector = __webpack_require__(63);

var _FluentConnector2 = _interopRequireDefault(_FluentConnector);

var _FluentConnector3 = __webpack_require__(70);

var _FluentConnector4 = _interopRequireDefault(_FluentConnector3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import formioLoki from './Connectors/merged/Formio-Loki/FluentConnector';

var Fluent = (0, _it2.default)({
  properties: {
    privatize: _privatize2.default,
    defaulLocal: 'loki',
    defaultRemote: 'formio',
    defaultMerged: 'formio-loki',
    connectors: {
      local: { loki: _FluentConnector2.default },
      remote: { formio: _FluentConnector4.default
        // merged: { 'formio-loki': formioLoki }
      } }
  },
  methods: {
    model: function model() {
      return _it2.default.apply(undefined, arguments);
    },
    extend: function extend() {
      return _compose3.default.apply(undefined, arguments);
    },
    compose: function compose() {
      return _compose3.default.apply(undefined, arguments);
    },
    getLocalConnector: function getLocalConnector(modelName) {
      var con = process.env.FLUENT_LOCAL_CONNECTOR || this.defaulLocal;

      return this.connectors.local[con](modelName);
    },
    getRemoteConnector: function getRemoteConnector(pathName) {
      var con = process.env.FLUENT_REMOTE_CONNECTOR || this.defaultRemote;

      return this.connectors.remote[con](pathName);
    },
    getMergedConnector: function getMergedConnector(nameAndPath) {
      // let con = process.env.FLUENT_MERGED_CONNECTOR || this.defaultMerged;
      // return this.connectors.merged[con](nameAndPath);
    }
  }
})();

exports.default = Fluent;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(22)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Fluent = __webpack_require__(3);

var _Fluent2 = _interopRequireDefault(_Fluent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Fluent2.default.compose({
  properties: {
    getFrom: 'remote-local',
    name: 'baseModel',
    path: undefined
  },
  methods: {
    getModelName: function getModelName() {
      return this.name;
    },

    /**
     * [remote description]
     * @return {[type]} [description]
     */
    remote: function remote() {
      return _Fluent2.default.getRemoteConnector({ path: this.path });
    },

    /**
     * [local description]
     * @return {[type]} [description]
     */
    local: function local() {
      return _Fluent2.default.getLocalConnector({ name: this.name });
    },

    /**
     *
     */
    merged: function merged() {
      return _Fluent2.default.getMergedConnector({ name: this.name, path: this.path });
    }
  }
}).compose(_Fluent2.default.privatize);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Event = __webpack_require__(6);

var _Event2 = _interopRequireDefault(_Event);

var _bluebird = __webpack_require__(10);

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
var Connection = function () {
  var online = window.navigator.onLine;

  function setOnline() {
    if (!online) {
      online = true;
      _Event2.default.emit({
        name: 'FAST:CONNECTION:ONLINE',
        data: online,
        text: 'Application is now online'
      });
    }
  }

  function setOffline() {
    if (online) {
      online = false;
      _Event2.default.emit({
        name: 'FAST:CONNECTION:OFFLINE',
        data: online,
        text: 'Application is now offline'
      });
    }
  }

  /**
   * [status description]
   * @return {Promise} [description]
   */
  function initEventListeners() {
    _Event2.default.listen({
      name: 'online',
      callback: function callback() {
        console.log('App is now online');
        setOnline();
      }
    });
    _Event2.default.listen({
      name: 'offline',
      callback: function callback() {
        console.log('App is now offline');
        setOffline();
      }
    });
  }

  function isOnline() {
    return new _bluebird2.default(function (resolve, reject) {
      var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');

      xhr.onload = function () {
        resolve(true);
      };
      xhr.onerror = function (e) {
        resolve(false);
      };
      xhr.open('GET', 'https://yesno.wtf/api', true);
      xhr.send();
    });
  }

  return Object.freeze({
    isOnline: isOnline,
    initEventListeners: initEventListeners
  });
}();

exports.default = Connection;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Event = function () {
  var CustomEvent = function CustomEvent(event, params) {
    var evt = document.createEvent('CustomEvent');

    params = params || { bubbles: false, cancelable: false, detail: undefined };

    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  };

  function emit(_ref) {
    var name = _ref.name,
        data = _ref.data,
        text = _ref.text;

    if (!name) throw new Error('Event must have a name.');
    if (!data) throw new Error('Event must have data.');
    if (!text) throw new Error('Event must have a text.');
    var customEvent = CustomEvent(name, {
      detail: {
        data: data,
        text: text
      }
    });

    window.dispatchEvent(customEvent);
  }
  function listen(_ref2) {
    var name = _ref2.name,
        callback = _ref2.callback;

    if (!name) throw new Error('Listener must have a name.');
    if (!callback) throw new Error('Listener must have a callback.');
    window.addEventListener(name, callback);
  }

  function remove(_ref3) {
    var name = _ref3.name,
        callback = _ref3.callback;

    if (!name) throw new Error('Listener must have a name to detach');
    if (!callback) throw new Error('Listener must have a callback to detach');
    window.removeEventListener(name, callback);
  }
  return Object.freeze({
    emit: emit,
    listen: listen,
    remove: remove
  });
}();

exports.default = Event;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! Native Promise Only
    v0.8.1 (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/

(function UMD(name,context,definition){
	// special form of UMD for polyfilling across evironments
	context[name] = context[name] || definition();
	if (typeof module != "undefined" && module.exports) { module.exports = context[name]; }
	else if (true) { !(__WEBPACK_AMD_DEFINE_RESULT__ = (function $AMD$(){ return context[name]; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); }
})("Promise",typeof global != "undefined" ? global : this,function DEF(){
	/*jshint validthis:true */
	"use strict";

	var builtInProp, cycle, scheduling_queue,
		ToString = Object.prototype.toString,
		timer = (typeof setImmediate != "undefined") ?
			function timer(fn) { return setImmediate(fn); } :
			setTimeout
	;

	// dammit, IE8.
	try {
		Object.defineProperty({},"x",{});
		builtInProp = function builtInProp(obj,name,val,config) {
			return Object.defineProperty(obj,name,{
				value: val,
				writable: true,
				configurable: config !== false
			});
		};
	}
	catch (err) {
		builtInProp = function builtInProp(obj,name,val) {
			obj[name] = val;
			return obj;
		};
	}

	// Note: using a queue instead of array for efficiency
	scheduling_queue = (function Queue() {
		var first, last, item;

		function Item(fn,self) {
			this.fn = fn;
			this.self = self;
			this.next = void 0;
		}

		return {
			add: function add(fn,self) {
				item = new Item(fn,self);
				if (last) {
					last.next = item;
				}
				else {
					first = item;
				}
				last = item;
				item = void 0;
			},
			drain: function drain() {
				var f = first;
				first = last = cycle = void 0;

				while (f) {
					f.fn.call(f.self);
					f = f.next;
				}
			}
		};
	})();

	function schedule(fn,self) {
		scheduling_queue.add(fn,self);
		if (!cycle) {
			cycle = timer(scheduling_queue.drain);
		}
	}

	// promise duck typing
	function isThenable(o) {
		var _then, o_type = typeof o;

		if (o != null &&
			(
				o_type == "object" || o_type == "function"
			)
		) {
			_then = o.then;
		}
		return typeof _then == "function" ? _then : false;
	}

	function notify() {
		for (var i=0; i<this.chain.length; i++) {
			notifyIsolated(
				this,
				(this.state === 1) ? this.chain[i].success : this.chain[i].failure,
				this.chain[i]
			);
		}
		this.chain.length = 0;
	}

	// NOTE: This is a separate function to isolate
	// the `try..catch` so that other code can be
	// optimized better
	function notifyIsolated(self,cb,chain) {
		var ret, _then;
		try {
			if (cb === false) {
				chain.reject(self.msg);
			}
			else {
				if (cb === true) {
					ret = self.msg;
				}
				else {
					ret = cb.call(void 0,self.msg);
				}

				if (ret === chain.promise) {
					chain.reject(TypeError("Promise-chain cycle"));
				}
				else if (_then = isThenable(ret)) {
					_then.call(ret,chain.resolve,chain.reject);
				}
				else {
					chain.resolve(ret);
				}
			}
		}
		catch (err) {
			chain.reject(err);
		}
	}

	function resolve(msg) {
		var _then, self = this;

		// already triggered?
		if (self.triggered) { return; }

		self.triggered = true;

		// unwrap
		if (self.def) {
			self = self.def;
		}

		try {
			if (_then = isThenable(msg)) {
				schedule(function(){
					var def_wrapper = new MakeDefWrapper(self);
					try {
						_then.call(msg,
							function $resolve$(){ resolve.apply(def_wrapper,arguments); },
							function $reject$(){ reject.apply(def_wrapper,arguments); }
						);
					}
					catch (err) {
						reject.call(def_wrapper,err);
					}
				})
			}
			else {
				self.msg = msg;
				self.state = 1;
				if (self.chain.length > 0) {
					schedule(notify,self);
				}
			}
		}
		catch (err) {
			reject.call(new MakeDefWrapper(self),err);
		}
	}

	function reject(msg) {
		var self = this;

		// already triggered?
		if (self.triggered) { return; }

		self.triggered = true;

		// unwrap
		if (self.def) {
			self = self.def;
		}

		self.msg = msg;
		self.state = 2;
		if (self.chain.length > 0) {
			schedule(notify,self);
		}
	}

	function iteratePromises(Constructor,arr,resolver,rejecter) {
		for (var idx=0; idx<arr.length; idx++) {
			(function IIFE(idx){
				Constructor.resolve(arr[idx])
				.then(
					function $resolver$(msg){
						resolver(idx,msg);
					},
					rejecter
				);
			})(idx);
		}
	}

	function MakeDefWrapper(self) {
		this.def = self;
		this.triggered = false;
	}

	function MakeDef(self) {
		this.promise = self;
		this.state = 0;
		this.triggered = false;
		this.chain = [];
		this.msg = void 0;
	}

	function Promise(executor) {
		if (typeof executor != "function") {
			throw TypeError("Not a function");
		}

		if (this.__NPO__ !== 0) {
			throw TypeError("Not a promise");
		}

		// instance shadowing the inherited "brand"
		// to signal an already "initialized" promise
		this.__NPO__ = 1;

		var def = new MakeDef(this);

		this["then"] = function then(success,failure) {
			var o = {
				success: typeof success == "function" ? success : true,
				failure: typeof failure == "function" ? failure : false
			};
			// Note: `then(..)` itself can be borrowed to be used against
			// a different promise constructor for making the chained promise,
			// by substituting a different `this` binding.
			o.promise = new this.constructor(function extractChain(resolve,reject) {
				if (typeof resolve != "function" || typeof reject != "function") {
					throw TypeError("Not a function");
				}

				o.resolve = resolve;
				o.reject = reject;
			});
			def.chain.push(o);

			if (def.state !== 0) {
				schedule(notify,def);
			}

			return o.promise;
		};
		this["catch"] = function $catch$(failure) {
			return this.then(void 0,failure);
		};

		try {
			executor.call(
				void 0,
				function publicResolve(msg){
					resolve.call(def,msg);
				},
				function publicReject(msg) {
					reject.call(def,msg);
				}
			);
		}
		catch (err) {
			reject.call(def,err);
		}
	}

	var PromisePrototype = builtInProp({},"constructor",Promise,
		/*configurable=*/false
	);

	// Note: Android 4 cannot use `Object.defineProperty(..)` here
	Promise.prototype = PromisePrototype;

	// built-in "brand" to signal an "uninitialized" promise
	builtInProp(PromisePrototype,"__NPO__",0,
		/*configurable=*/false
	);

	builtInProp(Promise,"resolve",function Promise$resolve(msg) {
		var Constructor = this;

		// spec mandated checks
		// note: best "isPromise" check that's practical for now
		if (msg && typeof msg == "object" && msg.__NPO__ === 1) {
			return msg;
		}

		return new Constructor(function executor(resolve,reject){
			if (typeof resolve != "function" || typeof reject != "function") {
				throw TypeError("Not a function");
			}

			resolve(msg);
		});
	});

	builtInProp(Promise,"reject",function Promise$reject(msg) {
		return new this(function executor(resolve,reject){
			if (typeof resolve != "function" || typeof reject != "function") {
				throw TypeError("Not a function");
			}

			reject(msg);
		});
	});

	builtInProp(Promise,"all",function Promise$all(arr) {
		var Constructor = this;

		// spec mandated checks
		if (ToString.call(arr) != "[object Array]") {
			return Constructor.reject(TypeError("Not an array"));
		}
		if (arr.length === 0) {
			return Constructor.resolve([]);
		}

		return new Constructor(function executor(resolve,reject){
			if (typeof resolve != "function" || typeof reject != "function") {
				throw TypeError("Not a function");
			}

			var len = arr.length, msgs = Array(len), count = 0;

			iteratePromises(Constructor,arr,function resolver(idx,msg) {
				msgs[idx] = msg;
				if (++count === len) {
					resolve(msgs);
				}
			},reject);
		});
	});

	builtInProp(Promise,"race",function Promise$race(arr) {
		var Constructor = this;

		// spec mandated checks
		if (ToString.call(arr) != "[object Array]") {
			return Constructor.reject(TypeError("Not an array"));
		}

		return new Constructor(function executor(resolve,reject){
			if (typeof resolve != "function" || typeof reject != "function") {
				throw TypeError("Not a function");
			}

			iteratePromises(Constructor,arr,function resolver(idx,msg){
				resolve(msg);
			},reject);
		});
	});

	return Promise;
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7), __webpack_require__(71).setImmediate))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(35);
var isFunction = __webpack_require__(23);
var isObject = __webpack_require__(15);
var isStamp = __webpack_require__(36);
var isComposable = __webpack_require__(58);

var assign = __webpack_require__(37);
var merge = __webpack_require__(38);

var slice = Array.prototype.slice;

/**
 * Creates new factory instance.
 * @returns {Function} The new factory function.
 */
function createFactory() {
  return function Stamp(options) {
    var descriptor = Stamp.compose || {};
    // Next line was optimized for most JS VMs. Please, be careful here!
    var obj = {__proto__: descriptor.methods}; // jshint ignore:line

    merge(obj, descriptor.deepProperties);
    assign(obj, descriptor.properties);
    Object.defineProperties(obj, descriptor.propertyDescriptors || {});

    if (!descriptor.initializers || descriptor.initializers.length === 0) return obj;

    if (options === undefined) options = {};
    var inits = descriptor.initializers;
    var length = inits.length;
    for (var i = 0; i < length; i += 1) {
      var initializer = inits[i];
      if (isFunction(initializer)) {
        var returnedValue = initializer.call(obj, options,
          {instance: obj, stamp: Stamp, args: slice.apply(arguments)});
        obj = returnedValue === undefined ? obj : returnedValue;
      }
    }

    return obj;
  };
}

/**
 * Returns a new stamp given a descriptor and a compose function implementation.
 * @param {Descriptor} [descriptor={}] The information about the object the stamp will be creating.
 * @param {Compose} composeFunction The "compose" function implementation.
 * @returns {Stamp}
 */
function createStamp(descriptor, composeFunction) {
  var Stamp = createFactory();

  if (descriptor.staticDeepProperties) {
    merge(Stamp, descriptor.staticDeepProperties);
  }
  if (descriptor.staticProperties) {
    assign(Stamp, descriptor.staticProperties);
  }
  if (descriptor.staticPropertyDescriptors) {
    Object.defineProperties(Stamp, descriptor.staticPropertyDescriptors);
  }

  var composeImplementation = isFunction(Stamp.compose) ? Stamp.compose : composeFunction;
  Stamp.compose = function _compose() {
    'use strict'; // to make sure `this` is not pointing to `global` or `window`
    return composeImplementation.apply(this, arguments);
  };
  assign(Stamp.compose, descriptor);

  return Stamp;
}

function concatAssignFunctions(dstObject, srcArray, propName) {
  if (!isArray(srcArray)) return;

  var length = srcArray.length;
  var dstArray = dstObject[propName] || [];
  dstObject[propName] = dstArray;
  for (var i = 0; i < length; i += 1) {
    var fn = srcArray[i];
    if (isFunction(fn) && dstArray.indexOf(fn) < 0) {
      dstArray.push(fn);
    }
  }
}


function combineProperties(dstObject, srcObject, propName, action) {
  if (!isObject(srcObject[propName])) return;
  if (!isObject(dstObject[propName])) dstObject[propName] = {};
  action(dstObject[propName], srcObject[propName]);
}

function deepMergeAssign(dstObject, srcObject, propName) {
  combineProperties(dstObject, srcObject, propName, merge);
}
function mergeAssign(dstObject, srcObject, propName) {
  combineProperties(dstObject, srcObject, propName, assign);
}

/**
 * Mutates the dstDescriptor by merging the srcComposable data into it.
 * @param {Descriptor} dstDescriptor The descriptor object to merge into.
 * @param {Composable} [srcComposable] The composable
 * (either descriptor or stamp) to merge data form.
 */
function mergeComposable(dstDescriptor, srcComposable) {
  var srcDescriptor = (srcComposable && srcComposable.compose) || srcComposable;

  mergeAssign(dstDescriptor, srcDescriptor, 'methods');
  mergeAssign(dstDescriptor, srcDescriptor, 'properties');
  deepMergeAssign(dstDescriptor, srcDescriptor, 'deepProperties');
  mergeAssign(dstDescriptor, srcDescriptor, 'propertyDescriptors');
  mergeAssign(dstDescriptor, srcDescriptor, 'staticProperties');
  deepMergeAssign(dstDescriptor, srcDescriptor, 'staticDeepProperties');
  mergeAssign(dstDescriptor, srcDescriptor, 'staticPropertyDescriptors');
  mergeAssign(dstDescriptor, srcDescriptor, 'configuration');
  deepMergeAssign(dstDescriptor, srcDescriptor, 'deepConfiguration');
  concatAssignFunctions(dstDescriptor, srcDescriptor.initializers, 'initializers');
  concatAssignFunctions(dstDescriptor, srcDescriptor.composers, 'composers');
}

/**
 * Given the list of composables (stamp descriptors and stamps) returns
 * a new stamp (composable factory function).
 * @typedef {Function} Compose
 * @param {...(Composable)} [arguments] The list of composables.
 * @returns {Stamp} A new stamp (aka composable factory function)
 */
module.exports = function compose() {
  'use strict'; // to make sure `this` is not pointing to `global` or `window`
  var descriptor = {};
  var composables = [];
  if (isComposable(this)) {
    mergeComposable(descriptor, this);
    composables.push(this);
  }

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (isComposable(arg)) {
      mergeComposable(descriptor, arg);
      composables.push(arg);
    }
  }

  var stamp = createStamp(descriptor, compose);

  var composers = descriptor.composers;
  if (isArray(composers) && composers.length > 0) {
    for (var j = 0; j < composers.length; j += 1) {
      var composer = composers[j];
      var returnedValue = composer({stamp: stamp, composables: composables});
      stamp = isStamp(returnedValue) ? returnedValue : stamp;
    }
  }

  return stamp;
};


/**
 * The Stamp Descriptor
 * @typedef {Function|Object} Descriptor
 * @returns {Stamp} A new stamp based on this Stamp
 * @property {Object} [methods] Methods or other data used as object instances' prototype
 * @property {Array<Function>} [initializers] List of initializers called for each object instance
 * @property {Array<Function>} [composers] List of callbacks called each time a composition happens
 * @property {Object} [properties] Shallow assigned properties of object instances
 * @property {Object} [deepProperties] Deeply merged properties of object instances
 * @property {Object} [staticProperties] Shallow assigned properties of Stamps
 * @property {Object} [staticDeepProperties] Deeply merged properties of Stamps
 * @property {Object} [configuration] Shallow assigned properties of Stamp arbitrary metadata
 * @property {Object} [deepConfiguration] Deeply merged properties of Stamp arbitrary metadata
 * @property {Object} [propertyDescriptors] ES5 Property Descriptors applied to object instances
 * @property {Object} [staticPropertyDescriptors] ES5 Property Descriptors applied to Stamps
 */

/**
 * The Stamp factory function
 * @typedef {Function} Stamp
 * @returns {*} Instantiated object
 * @property {Descriptor} compose - The Stamp descriptor and composition function
 */

/**
 * A composable object - stamp or descriptor
 * @typedef {Stamp|Descriptor} Composable
 */



/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__10__;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nativePromiseOnly = _interopRequireDefault(__webpack_require__(8));

__webpack_require__(40);

var _eventemitter = __webpack_require__(73);

var _browserCookies = _interopRequireDefault(__webpack_require__(74));

var _shallowCopy = _interopRequireDefault(__webpack_require__(75));

var providers = _interopRequireWildcard(__webpack_require__(76));

var _get2 = _interopRequireDefault(__webpack_require__(99));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isBoolean = function isBoolean(val) {
  return _typeof(val) === _typeof(true);
};

var isNil = function isNil(val) {
  return val === null || val === undefined;
};

var isObject = function isObject(val) {
  return val && _typeof(val) === 'object';
};
/**
 * The Formio interface class.
 *
 *   let formio = new Formio('https://examples.form.io/example');
 */


var Formio =
/*#__PURE__*/
function () {
  /* eslint-disable max-statements */
  function Formio(path) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Formio);

    // Ensure we have an instance of Formio.
    if (!(this instanceof Formio)) {
      return new Formio(path);
    } // Initialize our variables.


    this.base = '';
    this.projectsUrl = '';
    this.projectUrl = '';
    this.projectId = '';
    this.formUrl = '';
    this.formsUrl = '';
    this.formId = '';
    this.submissionsUrl = '';
    this.submissionUrl = '';
    this.submissionId = '';
    this.actionsUrl = '';
    this.actionId = '';
    this.actionUrl = '';
    this.vsUrl = '';
    this.vId = '';
    this.vUrl = '';
    this.query = ''; // Store the original path and options.

    this.path = path;
    this.options = options;

    if (options.hasOwnProperty('base')) {
      this.base = options.base;
    } else if (Formio.baseUrl) {
      this.base = Formio.baseUrl;
    } else {
      this.base = window.location.href.match(/http[s]?:\/\/api./)[0];
    }

    if (!path) {
      // Allow user to create new projects if this was instantiated without
      // a url
      this.projectUrl = "".concat(this.base, "/project");
      this.projectsUrl = "".concat(this.base, "/project");
      this.projectId = false;
      this.query = '';
      return;
    }

    if (options.hasOwnProperty('project')) {
      this.projectUrl = options.project;
    }

    var project = this.projectUrl || Formio.projectUrl;
    var projectRegEx = /(^|\/)(project)($|\/[^/]+)/;
    var isProjectUrl = path.search(projectRegEx) !== -1; // The baseURL is the same as the projectUrl, and does not contain "/project/MONGO_ID" in
    // its domain. This is almost certainly against the Open Source server.

    if (project && this.base === project && !isProjectUrl) {
      this.noProject = true;
      this.projectUrl = this.base;
    } // Normalize to an absolute path.


    if (path.indexOf('http') !== 0 && path.indexOf('//') !== 0) {
      path = this.base + path;
    }

    var hostparts = this.getUrlParts(path);
    var parts = [];
    var hostName = hostparts[1] + hostparts[2];
    path = hostparts.length > 3 ? hostparts[3] : '';
    var queryparts = path.split('?');

    if (queryparts.length > 1) {
      path = queryparts[0];
      this.query = "?".concat(queryparts[1]);
    } // Register a specific path.


    var registerPath = function registerPath(name, base) {
      _this["".concat(name, "sUrl")] = "".concat(base, "/").concat(name);
      var regex = new RegExp("/".concat(name, "/([^/]+)"));

      if (path.search(regex) !== -1) {
        parts = path.match(regex);
        _this["".concat(name, "Url")] = parts ? base + parts[0] : '';
        _this["".concat(name, "Id")] = parts.length > 1 ? parts[1] : '';
        base += parts[0];
      }

      return base;
    }; // Register an array of items.


    var registerItems = function registerItems(items, base, staticBase) {
      for (var i in items) {
        if (items.hasOwnProperty(i)) {
          var item = items[i];

          if (Array.isArray(item)) {
            registerItems(item, base, true);
          } else {
            var newBase = registerPath(item, base);
            base = staticBase ? base : newBase;
          }
        }
      }
    };

    if (!this.projectUrl || this.projectUrl === this.base) {
      this.projectUrl = hostName;
    }

    if (!this.noProject) {
      // Determine the projectUrl and projectId
      if (isProjectUrl) {
        // Get project id as project/:projectId.
        registerItems(['project'], hostName);
        path = path.replace(projectRegEx, '');
      } else if (hostName === this.base) {
        // Get project id as first part of path (subdirectory).
        if (hostparts.length > 3 && path.split('/').length > 1) {
          var pathParts = path.split('/');
          pathParts.shift(); // Throw away the first /.

          this.projectId = pathParts.shift();
          path = "/".concat(pathParts.join('/'));
          this.projectUrl = "".concat(hostName, "/").concat(this.projectId);
        }
      } else {
        // Get project id from subdomain.
        if (hostparts.length > 2 && (hostparts[2].split('.').length > 2 || hostName.includes('localhost'))) {
          this.projectUrl = hostName;
          this.projectId = hostparts[2].split('.')[0];
        }
      }

      this.projectsUrl = this.projectsUrl || "".concat(this.base, "/project");
    } // Configure Form urls and form ids.


    if (path.search(/(^|\/)(form)($|\/)/) !== -1) {
      registerItems(['form', ['submission', 'action', 'v']], this.projectUrl);
    } else {
      var subRegEx = new RegExp('/(submission|action|v)($|/.*)');
      var subs = path.match(subRegEx);
      this.pathType = subs && subs.length > 1 ? subs[1] : '';
      path = path.replace(subRegEx, '');
      path = path.replace(/\/$/, '');
      this.formsUrl = "".concat(this.projectUrl, "/form");
      this.formUrl = path ? this.projectUrl + path : '';
      this.formId = path.replace(/^\/+|\/+$/g, '');
      var items = ['submission', 'action', 'v'];

      for (var i in items) {
        if (items.hasOwnProperty(i)) {
          var item = items[i];
          this["".concat(item, "sUrl")] = "".concat(this.projectUrl + path, "/").concat(item);

          if (this.pathType === item && subs.length > 2 && subs[2]) {
            this["".concat(item, "Id")] = subs[2].replace(/^\/+|\/+$/g, '');
            this["".concat(item, "Url")] = this.projectUrl + path + subs[0];
          }
        }
      }
    } // Set the app url if it is not set.


    if (!Formio.projectUrlSet) {
      Formio.projectUrl = this.projectUrl;
    }
  }
  /* eslint-enable max-statements */


  _createClass(Formio, [{
    key: "delete",
    value: function _delete(type, opts) {
      var _id = "".concat(type, "Id");

      var _url = "".concat(type, "Url");

      if (!this[_id]) {
        _nativePromiseOnly.default.reject('Nothing to delete');
      }

      Formio.cache = {};
      return this.makeRequest(type, this[_url], 'delete', null, opts);
    }
  }, {
    key: "index",
    value: function index(type, query, opts) {
      var _url = "".concat(type, "Url");

      query = query || '';

      if (query && isObject(query)) {
        query = "?".concat(Formio.serialize(query.params));
      }

      return this.makeRequest(type, this[_url] + query, 'get', null, opts);
    }
  }, {
    key: "save",
    value: function save(type, data, opts) {
      var _id = "".concat(type, "Id");

      var _url = "".concat(type, "Url");

      var method = this[_id] || data._id ? 'put' : 'post';
      var reqUrl = this[_id] ? this[_url] : this["".concat(type, "sUrl")];

      if (!this[_id] && data._id && method === 'put' && !reqUrl.includes(data._id)) {
        reqUrl += "/".concat(data._id);
      }

      Formio.cache = {};
      return this.makeRequest(type, reqUrl + this.query, method, data, opts);
    }
  }, {
    key: "load",
    value: function load(type, query, opts) {
      var _id = "".concat(type, "Id");

      var _url = "".concat(type, "Url");

      if (query && isObject(query)) {
        query = Formio.serialize(query.params);
      }

      if (query) {
        query = this.query ? "".concat(this.query, "&").concat(query) : "?".concat(query);
      } else {
        query = this.query;
      }

      if (!this[_id]) {
        return _nativePromiseOnly.default.reject("Missing ".concat(_id));
      }

      return this.makeRequest(type, this[_url] + query, 'get', null, opts);
    }
  }, {
    key: "makeRequest",
    value: function makeRequest() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return Formio.makeRequest.apply(Formio, [this].concat(args));
    }
  }, {
    key: "loadProject",
    value: function loadProject(query, opts) {
      return this.load('project', query, opts);
    }
  }, {
    key: "saveProject",
    value: function saveProject(data, opts) {
      return this.save('project', data, opts);
    }
  }, {
    key: "deleteProject",
    value: function deleteProject(opts) {
      return this.delete('project', opts);
    }
  }, {
    key: "loadForm",
    value: function loadForm(query, opts) {
      var _this2 = this;

      return this.load('form', query, opts).then(function (currentForm) {
        // Check to see if there isn't a number in vId.
        if (!currentForm.revisions || isNaN(parseInt(_this2.vId))) {
          return currentForm;
        } // If a submission already exists but form is marked to load current version of form.


        if (currentForm.revisions === 'current' && _this2.submissionId) {
          return currentForm;
        } // If they specified a revision form, load the revised form components.


        if (query && isObject(query)) {
          query = Formio.serialize(query.params);
        }

        if (query) {
          query = _this2.query ? "".concat(_this2.query, "&").concat(query) : "?".concat(query);
        } else {
          query = _this2.query;
        }

        return _this2.makeRequest('form', _this2.vUrl + query, 'get', null, opts).then(function (revisionForm) {
          currentForm.components = revisionForm.components; // Using object.assign so we don't cross polinate multiple form loads.

          return Object.assign({}, currentForm);
        }) // If we couldn't load the revision, just return the original form.
        .catch(function () {
          return Object.assign({}, currentForm);
        });
      });
    }
  }, {
    key: "saveForm",
    value: function saveForm(data, opts) {
      return this.save('form', data, opts);
    }
  }, {
    key: "deleteForm",
    value: function deleteForm(opts) {
      return this.delete('form', opts);
    }
  }, {
    key: "loadForms",
    value: function loadForms(query, opts) {
      return this.index('forms', query, opts);
    }
  }, {
    key: "loadSubmission",
    value: function loadSubmission(query, opts) {
      var _this3 = this;

      return this.load('submission', query, opts).then(function (submission) {
        _this3.vId = submission._fvid;
        _this3.vUrl = "".concat(_this3.formUrl, "/v/").concat(_this3.vId);
        return submission;
      });
    }
  }, {
    key: "saveSubmission",
    value: function saveSubmission(data, opts) {
      if (!isNaN(parseInt(this.vId))) {
        data._fvid = this.vId;
      }

      return this.save('submission', data, opts);
    }
  }, {
    key: "deleteSubmission",
    value: function deleteSubmission(opts) {
      return this.delete('submission', opts);
    }
  }, {
    key: "loadSubmissions",
    value: function loadSubmissions(query, opts) {
      return this.index('submissions', query, opts);
    }
  }, {
    key: "loadAction",
    value: function loadAction(query, opts) {
      return this.load('action', query, opts);
    }
  }, {
    key: "saveAction",
    value: function saveAction(data, opts) {
      return this.save('action', data, opts);
    }
  }, {
    key: "deleteAction",
    value: function deleteAction(opts) {
      return this.delete('action', opts);
    }
  }, {
    key: "loadActions",
    value: function loadActions(query, opts) {
      return this.index('actions', query, opts);
    }
  }, {
    key: "availableActions",
    value: function availableActions() {
      return this.makeRequest('availableActions', "".concat(this.formUrl, "/actions"));
    }
  }, {
    key: "actionInfo",
    value: function actionInfo(name) {
      return this.makeRequest('actionInfo', "".concat(this.formUrl, "/actions/").concat(name));
    }
  }, {
    key: "isObjectId",
    value: function isObjectId(id) {
      var checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
      return checkForHexRegExp.test(id);
    }
  }, {
    key: "getProjectId",
    value: function getProjectId() {
      if (!this.projectId) {
        return _nativePromiseOnly.default.resolve('');
      }

      if (this.isObjectId(this.projectId)) {
        return _nativePromiseOnly.default.resolve(this.projectId);
      } else {
        return this.loadProject().then(function (project) {
          return project._id;
        });
      }
    }
  }, {
    key: "getFormId",
    value: function getFormId() {
      if (!this.formId) {
        return _nativePromiseOnly.default.resolve('');
      }

      if (this.isObjectId(this.formId)) {
        return _nativePromiseOnly.default.resolve(this.formId);
      } else {
        return this.loadForm().then(function (form) {
          return form._id;
        });
      }
    }
  }, {
    key: "currentUser",
    value: function currentUser(options) {
      return Formio.currentUser(this, options);
    }
  }, {
    key: "accessInfo",
    value: function accessInfo() {
      return Formio.accessInfo(this);
    }
    /**
     * Returns the JWT token for this instance.
     *
     * @return {*}
     */

  }, {
    key: "getToken",
    value: function getToken(options) {
      return Formio.getToken(Object.assign({
        formio: this
      }, this.options, options));
    }
    /**
     * Sets the JWT token for this instance.
     *
     * @return {*}
     */

  }, {
    key: "setToken",
    value: function setToken(token, options) {
      return Formio.setToken(token, Object.assign({
        formio: this
      }, this.options, options));
    }
    /**
     * Returns a temporary authentication token for single purpose token generation.
     */

  }, {
    key: "getTempToken",
    value: function getTempToken(expire, allowed, options) {
      var token = Formio.getToken(options);

      if (!token) {
        return _nativePromiseOnly.default.reject('You must be authenticated to generate a temporary auth token.');
      }

      return this.makeRequest('tempToken', "".concat(this.projectUrl, "/token"), 'GET', null, {
        ignoreCache: true,
        header: new Headers({
          'x-expire': expire,
          'x-allow': allowed
        })
      });
    }
    /**
     * Get a download url for a submission PDF of this submission.
     *
     * @return {*}
     */

  }, {
    key: "getDownloadUrl",
    value: function getDownloadUrl(form) {
      var _this4 = this;

      if (!this.submissionId) {
        return _nativePromiseOnly.default.resolve('');
      }

      if (!form) {
        // Make sure to load the form first.
        return this.loadForm().then(function (_form) {
          if (!_form) {
            return '';
          }

          return _this4.getDownloadUrl(_form);
        });
      }

      var apiUrl = "/project/".concat(form.project);
      apiUrl += "/form/".concat(form._id);
      apiUrl += "/submission/".concat(this.submissionId);
      apiUrl += '/download';
      var download = this.base + apiUrl;
      return new _nativePromiseOnly.default(function (resolve, reject) {
        _this4.getTempToken(3600, "GET:".concat(apiUrl)).then(function (tempToken) {
          download += "?token=".concat(tempToken.key);
          resolve(download);
        }, function () {
          resolve(download);
        }).catch(reject);
      });
    }
  }, {
    key: "uploadFile",
    value: function uploadFile(storage, file, fileName, dir, progressCallback, url) {
      var _this5 = this;

      var requestArgs = {
        provider: storage,
        method: 'upload',
        file: file,
        fileName: fileName,
        dir: dir
      };
      var request = Formio.pluginWait('preRequest', requestArgs).then(function () {
        return Formio.pluginGet('fileRequest', requestArgs).then(function (result) {
          if (storage && isNil(result)) {
            if (Formio.providers.storage.hasOwnProperty(storage)) {
              var provider = new Formio.providers.storage[storage](_this5);
              return provider.uploadFile(file, fileName, dir, progressCallback, url);
            } else {
              throw 'Storage provider not found';
            }
          }

          return result || {
            url: ''
          };
        });
      });
      return Formio.pluginAlter('wrapFileRequestPromise', request, requestArgs);
    }
  }, {
    key: "downloadFile",
    value: function downloadFile(file) {
      var _this6 = this;

      var requestArgs = {
        method: 'download',
        file: file
      };
      var request = Formio.pluginWait('preRequest', requestArgs).then(function () {
        return Formio.pluginGet('fileRequest', requestArgs).then(function (result) {
          if (file.storage && isNil(result)) {
            if (Formio.providers.storage.hasOwnProperty(file.storage)) {
              var provider = new Formio.providers.storage[file.storage](_this6);
              return provider.downloadFile(file);
            } else {
              throw 'Storage provider not found';
            }
          }

          return result || {
            url: ''
          };
        });
      });
      return Formio.pluginAlter('wrapFileRequestPromise', request, requestArgs);
    } // Determine if the user can submit the form.

  }, {
    key: "canSubmit",
    value: function canSubmit() {
      /* eslint-disable max-statements, max-depth */
      return _nativePromiseOnly.default.all([this.loadForm(), this.currentUser(), this.accessInfo()]).then(function (results) {
        var form = results.shift();
        var user = results.shift();
        var access = results.shift(); // Get the anonymous and admin roles.

        var anonRole = {};
        var adminRole = {};

        for (var roleName in access.roles) {
          if (access.roles.hasOwnProperty(roleName)) {
            var role = access.roles[roleName];

            if (role.default) {
              anonRole = role;
            }

            if (role.admin) {
              adminRole = role;
            }
          }
        }

        var canSubmit = false;
        var canSubmitAnonymously = false; // If the user is an admin, then they can submit this form.

        if (user && user.roles.includes(adminRole._id)) {
          return true;
        }

        for (var i in form.submissionAccess) {
          if (form.submissionAccess.hasOwnProperty(i)) {
            var subRole = form.submissionAccess[i];

            if (subRole.type === 'create_all' || subRole.type === 'create_own') {
              for (var j in subRole.roles) {
                if (subRole.roles.hasOwnProperty(j)) {
                  // Check if anonymous is allowed.
                  if (anonRole._id === subRole.roles[j]) {
                    canSubmitAnonymously = true;
                  } // Check if the logged in user has the appropriate role.


                  if (user && user.roles.includes(subRole.roles[j])) {
                    canSubmit = true;
                    break;
                  }
                }
              }

              if (canSubmit) {
                break;
              }
            }
          }
        } // If their user cannot submit, but anonymous can, then delete token and allow submission.


        if (!canSubmit && canSubmitAnonymously) {
          canSubmit = true;
          Formio.setUser(null);
        }

        return canSubmit;
      });
      /* eslint-enable max-statements, max-depth */
    }
  }, {
    key: "getUrlParts",
    value: function getUrlParts(url) {
      return Formio.getUrlParts(url, this);
    }
  }], [{
    key: "loadProjects",
    value: function loadProjects(query, opts) {
      query = query || '';

      if (isObject(query)) {
        query = "?".concat(Formio.serialize(query.params));
      }

      return Formio.makeStaticRequest("".concat(Formio.baseUrl, "/project").concat(query), 'GET', null, opts);
    }
  }, {
    key: "getUrlParts",
    value: function getUrlParts(url, formio) {
      var base = formio && formio.base ? formio.base : Formio.baseUrl;
      var regex = '^(http[s]?:\\/\\/)';

      if (base && url.indexOf(base) === 0) {
        regex += "(".concat(base.replace(/^http[s]?:\/\//, ''), ")");
      } else {
        regex += '([^/]+)';
      }

      regex += '($|\\/.*)';
      return url.match(new RegExp(regex));
    }
  }, {
    key: "serialize",
    value: function serialize(obj) {
      var str = [];

      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          str.push("".concat(encodeURIComponent(p), "=").concat(encodeURIComponent(obj[p])));
        }
      }

      return str.join('&');
    }
  }, {
    key: "getRequestArgs",
    value: function getRequestArgs(formio, type, url, method, data, opts) {
      method = (method || 'GET').toUpperCase();

      if (!opts || !isObject(opts)) {
        opts = {};
      }

      var requestArgs = {
        url: url,
        method: method,
        data: data || null,
        opts: opts
      };

      if (type) {
        requestArgs.type = type;
      }

      if (formio) {
        requestArgs.formio = formio;
      }

      return requestArgs;
    }
  }, {
    key: "makeStaticRequest",
    value: function makeStaticRequest(url, method, data, opts) {
      var requestArgs = Formio.getRequestArgs(null, '', url, method, data, opts);
      var request = Formio.pluginWait('preRequest', requestArgs).then(function () {
        return Formio.pluginGet('staticRequest', requestArgs).then(function (result) {
          if (isNil(result)) {
            return Formio.request(url, method, requestArgs.data, requestArgs.opts.header, requestArgs.opts);
          }

          return result;
        });
      });
      return Formio.pluginAlter('wrapStaticRequestPromise', request, requestArgs);
    }
  }, {
    key: "makeRequest",
    value: function makeRequest(formio, type, url, method, data, opts) {
      if (!formio) {
        return Formio.makeStaticRequest(url, method, data, opts);
      }

      var requestArgs = Formio.getRequestArgs(formio, type, url, method, data, opts);
      requestArgs.opts = requestArgs.opts || {};
      requestArgs.opts.formio = formio;
      var request = Formio.pluginWait('preRequest', requestArgs).then(function () {
        return Formio.pluginGet('request', requestArgs).then(function (result) {
          if (isNil(result)) {
            return Formio.request(url, method, requestArgs.data, requestArgs.opts.header, requestArgs.opts);
          }

          return result;
        });
      });
      return Formio.pluginAlter('wrapRequestPromise', request, requestArgs);
    }
  }, {
    key: "request",
    value: function request(url, method, data, header, opts) {
      if (!url) {
        return _nativePromiseOnly.default.reject('No url provided');
      }

      method = (method || 'GET').toUpperCase(); // For reverse compatibility, if they provided the ignoreCache parameter,
      // then change it back to the options format where that is a parameter.

      if (isBoolean(opts)) {
        opts = {
          ignoreCache: opts
        };
      }

      if (!opts || !isObject(opts)) {
        opts = {};
      } // Generate a cachekey.


      var cacheKey = btoa(url); // Get the cached promise to save multiple loads.

      if (!opts.ignoreCache && method === 'GET' && Formio.cache.hasOwnProperty(cacheKey)) {
        return Formio.cache[cacheKey];
      } // Set up and fetch request


      var headers = header || new Headers(opts.headers || {
        'Accept': 'application/json',
        'Content-type': 'application/json; charset=UTF-8'
      });
      var token = Formio.getToken(opts);

      if (token && !opts.noToken) {
        headers.append('x-jwt-token', token);
      }

      var options = {
        method: method,
        headers: headers,
        mode: 'cors'
      };

      if (data) {
        options.body = JSON.stringify(data);
      } // Allow plugins to alter the options.


      options = Formio.pluginAlter('requestOptions', options, url);

      if (options.namespace) {
        opts.namespace = options.namespace;
      }

      var requestToken = options.headers.get('x-jwt-token');
      var result = fetch(url, options).then(function (response) {
        // Allow plugins to respond.
        response = Formio.pluginAlter('requestResponse', response, Formio);

        if (!response.ok) {
          if (response.status === 440) {
            Formio.setToken(null, opts);
            Formio.events.emit('formio.sessionExpired', response.body);
          } else if (response.status === 401) {
            Formio.events.emit('formio.unauthorized', response.body);
          } // Parse and return the error as a rejected promise to reject this promise


          return (response.headers.get('content-type').includes('application/json') ? response.json() : response.text()).then(function (error) {
            return _nativePromiseOnly.default.reject(error);
          });
        } // Handle fetch results


        var token = response.headers.get('x-jwt-token'); // In some strange cases, the fetch library will return an x-jwt-token without sending
        // one to the server. This has even been debugged on the server to verify that no token
        // was introduced with the request, but the response contains a token. This is an Invalid
        // case where we do not send an x-jwt-token and get one in return for any GET request.

        var tokenIntroduced = false;

        if (method === 'GET' && !requestToken && token && !opts.external && !url.includes('token=') && !url.includes('x-jwt-token=')) {
          console.warn('Token was introduced in request.');
          tokenIntroduced = true;
        }

        if (response.status >= 200 && response.status < 300 && token && token !== '' && !tokenIntroduced) {
          Formio.setToken(token, opts);
        } // 204 is no content. Don't try to .json() it.


        if (response.status === 204) {
          return {};
        }

        var getResult = response.headers.get('content-type').includes('application/json') ? response.json() : response.text();
        return getResult.then(function (result) {
          // Add some content-range metadata to the result here
          var range = response.headers.get('content-range');

          if (range && isObject(result)) {
            range = range.split('/');

            if (range[0] !== '*') {
              var skipLimit = range[0].split('-');
              result.skip = Number(skipLimit[0]);
              result.limit = skipLimit[1] - skipLimit[0] + 1;
            }

            result.serverCount = range[1] === '*' ? range[1] : Number(range[1]);
          }

          if (!opts.getHeaders) {
            return result;
          }

          var headers = {};
          response.headers.forEach(function (item, key) {
            headers[key] = item;
          }); // Return the result with the headers.

          return {
            result: result,
            headers: headers
          };
        });
      }).then(function (result) {
        if (opts.getHeaders) {
          return result;
        }

        var resultCopy = {}; // Shallow copy result so modifications don't end up in cache

        if (Array.isArray(result)) {
          resultCopy = result.map(_shallowCopy.default);
          resultCopy.skip = result.skip;
          resultCopy.limit = result.limit;
          resultCopy.serverCount = result.serverCount;
        } else {
          resultCopy = (0, _shallowCopy.default)(result);
        }

        return resultCopy;
      }).catch(function (err) {
        if (err === 'Bad Token') {
          Formio.setToken(null, opts);
          Formio.events.emit('formio.badToken', err);
        }

        if (err.message) {
          err.message = "Could not connect to API server (".concat(err.message, ")");
          err.networkError = true;
        }

        if (method === 'GET') {
          delete Formio.cache[cacheKey];
        }

        return _nativePromiseOnly.default.reject(err);
      }); // Cache the response.

      if (method === 'GET') {
        Formio.cache[cacheKey] = result;
      }

      return result;
    } // Needed to maintain reverse compatability...

  }, {
    key: "setToken",
    value: function setToken(token, opts) {
      token = token || '';
      opts = typeof opts === 'string' ? {
        namespace: opts
      } : opts || {};
      var tokenName = "".concat(opts.namespace || 'formio', "Token");

      if (!Formio.tokens) {
        Formio.tokens = {};
      }

      if (Formio.tokens[tokenName] === token) {
        return;
      }

      Formio.tokens[tokenName] = token;

      if (!token) {
        Formio.setUser(null, opts); // iOS in private browse mode will throw an error but we can't detect ahead of time that we are in private mode.

        try {
          return localStorage.removeItem(tokenName);
        } catch (err) {
          return _browserCookies.default.erase(tokenName, {
            path: '/'
          });
        }
      } // iOS in private browse mode will throw an error but we can't detect ahead of time that we are in private mode.


      try {
        localStorage.setItem(tokenName, token);
      } catch (err) {
        _browserCookies.default.set(tokenName, token, {
          path: '/'
        });
      }

      return Formio.currentUser(opts.formio, opts); // Run this so user is updated if null
    }
  }, {
    key: "getToken",
    value: function getToken(options) {
      options = typeof options === 'string' ? {
        namespace: options
      } : options || {};
      var tokenName = "".concat(options.namespace || 'formio', "Token");

      if (!Formio.tokens) {
        Formio.tokens = {};
      }

      if (Formio.tokens[tokenName]) {
        return Formio.tokens[tokenName];
      }

      try {
        Formio.tokens[tokenName] = localStorage.getItem(tokenName) || '';
        return Formio.tokens[tokenName];
      } catch (e) {
        Formio.tokens[tokenName] = _browserCookies.default.get(tokenName);
        return Formio.tokens[tokenName];
      }
    }
  }, {
    key: "setUser",
    value: function setUser(user, opts) {
      opts = opts || {};
      var userName = "".concat(opts.namespace || 'formio', "User");

      if (!user) {
        this.setToken(null, opts); // iOS in private browse mode will throw an error but we can't detect ahead of time that we are in private mode.

        try {
          return localStorage.removeItem(userName);
        } catch (err) {
          return _browserCookies.default.erase(userName, {
            path: '/'
          });
        }
      } // iOS in private browse mode will throw an error but we can't detect ahead of time that we are in private mode.


      try {
        localStorage.setItem(userName, JSON.stringify(user));
      } catch (err) {
        _browserCookies.default.set(userName, JSON.stringify(user), {
          path: '/'
        });
      }
    }
  }, {
    key: "getUser",
    value: function getUser(options) {
      options = options || {};
      var userName = "".concat(options.namespace || 'formio', "User");

      try {
        return JSON.parse(localStorage.getItem(userName) || null);
      } catch (e) {
        return JSON.parse(_browserCookies.default.get(userName));
      }
    }
  }, {
    key: "setBaseUrl",
    value: function setBaseUrl(url) {
      Formio.baseUrl = url;

      if (!Formio.projectUrlSet) {
        Formio.projectUrl = url;
      }
    }
  }, {
    key: "getBaseUrl",
    value: function getBaseUrl() {
      return Formio.baseUrl;
    }
  }, {
    key: "setApiUrl",
    value: function setApiUrl(url) {
      return Formio.setBaseUrl(url);
    }
  }, {
    key: "getApiUrl",
    value: function getApiUrl() {
      return Formio.getBaseUrl();
    }
  }, {
    key: "setAppUrl",
    value: function setAppUrl(url) {
      console.warn('Formio.setAppUrl() is deprecated. Use Formio.setProjectUrl instead.');
      Formio.projectUrl = url;
      Formio.projectUrlSet = true;
    }
  }, {
    key: "setProjectUrl",
    value: function setProjectUrl(url) {
      Formio.projectUrl = url;
      Formio.projectUrlSet = true;
    }
  }, {
    key: "getAppUrl",
    value: function getAppUrl() {
      console.warn('Formio.getAppUrl() is deprecated. Use Formio.getProjectUrl instead.');
      return Formio.projectUrl;
    }
  }, {
    key: "getProjectUrl",
    value: function getProjectUrl() {
      return Formio.projectUrl;
    }
  }, {
    key: "clearCache",
    value: function clearCache() {
      Formio.cache = {};
    }
  }, {
    key: "noop",
    value: function noop() {}
  }, {
    key: "identity",
    value: function identity(value) {
      return value;
    }
  }, {
    key: "deregisterPlugin",
    value: function deregisterPlugin(plugin) {
      var beforeLength = Formio.plugins.length;
      Formio.plugins = Formio.plugins.filter(function (p) {
        if (p !== plugin && p.__name !== plugin) {
          return true;
        }

        (p.deregister || Formio.noop).call(plugin, Formio);
        return false;
      });
      return beforeLength !== Formio.plugins.length;
    }
  }, {
    key: "registerPlugin",
    value: function registerPlugin(plugin, name) {
      Formio.plugins.push(plugin);
      Formio.plugins.sort(function (a, b) {
        return (b.priority || 0) - (a.priority || 0);
      });
      plugin.__name = name;
      (plugin.init || Formio.noop).call(plugin, Formio);
    }
  }, {
    key: "getPlugin",
    value: function getPlugin(name) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Formio.plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var plugin = _step.value;

          if (plugin.__name === name) {
            return plugin;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return null;
    }
  }, {
    key: "pluginWait",
    value: function pluginWait(pluginFn) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return _nativePromiseOnly.default.all(Formio.plugins.map(function (plugin) {
        var _ref;

        return (_ref = plugin[pluginFn] || Formio.noop).call.apply(_ref, [plugin].concat(args));
      }));
    }
  }, {
    key: "pluginGet",
    value: function pluginGet(pluginFn) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var callPlugin = function callPlugin(index) {
        var _ref2;

        var plugin = Formio.plugins[index];

        if (!plugin) {
          return _nativePromiseOnly.default.resolve(null);
        }

        return _nativePromiseOnly.default.resolve((_ref2 = plugin[pluginFn] || Formio.noop).call.apply(_ref2, [plugin].concat(args))).then(function (result) {
          if (!isNil(result)) {
            return result;
          }

          return callPlugin(index + 1);
        });
      };

      return callPlugin(0);
    }
  }, {
    key: "pluginAlter",
    value: function pluginAlter(pluginFn, value) {
      for (var _len4 = arguments.length, args = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        args[_key4 - 2] = arguments[_key4];
      }

      return Formio.plugins.reduce(function (value, plugin) {
        return (plugin[pluginFn] || Formio.identity).apply(void 0, [value].concat(args));
      }, value);
    }
  }, {
    key: "accessInfo",
    value: function accessInfo(formio) {
      var projectUrl = formio ? formio.projectUrl : Formio.projectUrl;
      return Formio.makeRequest(formio, 'accessInfo', "".concat(projectUrl, "/access"));
    }
  }, {
    key: "currentUser",
    value: function currentUser(formio, options) {
      var projectUrl = formio ? formio.projectUrl : Formio.projectUrl || Formio.baseUrl;
      projectUrl += '/current';
      var user = this.getUser(options);

      if (user) {
        return Formio.pluginAlter('wrapStaticRequestPromise', _nativePromiseOnly.default.resolve(user), {
          url: projectUrl,
          method: 'GET',
          options: options
        });
      }

      var token = Formio.getToken(options);

      if ((!options || !options.external) && !token) {
        return Formio.pluginAlter('wrapStaticRequestPromise', _nativePromiseOnly.default.resolve(null), {
          url: projectUrl,
          method: 'GET',
          options: options
        });
      }

      return Formio.makeRequest(formio, 'currentUser', projectUrl, 'GET', null, options).then(function (response) {
        Formio.setUser(response, options);
        return response;
      });
    }
  }, {
    key: "logout",
    value: function logout(formio, options) {
      options = options || {};
      options.formio = formio;
      Formio.setToken(null, options);
      Formio.setUser(null, options);
      Formio.clearCache();
      var projectUrl = formio ? formio.projectUrl : Formio.baseUrl;
      return Formio.makeRequest(formio, 'logout', "".concat(projectUrl, "/logout"));
    }
  }, {
    key: "oAuthCurrentUser",
    value: function oAuthCurrentUser(formio, token) {
      return Formio.currentUser(formio, {
        external: true,
        headers: {
          Authorization: "Bearer ".concat(token)
        }
      });
    }
  }, {
    key: "oktaInit",
    value: function oktaInit(options) {
      options = options || {};

      if ((typeof OktaAuth === "undefined" ? "undefined" : _typeof(OktaAuth)) !== undefined) {
        options.OktaAuth = OktaAuth;
      }

      if (_typeof(options.OktaAuth) === undefined) {
        var errorMessage = 'Cannot find OktaAuth. Please include the Okta JavaScript SDK within your application. See https://developer.okta.com/code/javascript/okta_auth_sdk for an example.';
        console.warn(errorMessage);
        return _nativePromiseOnly.default.reject(errorMessage);
      }

      return new _nativePromiseOnly.default(function (resolve, reject) {
        var Okta = options.OktaAuth;
        delete options.OktaAuth;
        var authClient = new Okta(options);
        var accessToken = authClient.tokenManager.get('accessToken');

        if (accessToken) {
          resolve(Formio.oAuthCurrentUser(options.formio, accessToken.accessToken));
        } else if (location.hash) {
          authClient.token.parseFromUrl().then(function (token) {
            authClient.tokenManager.add('accessToken', token);
            resolve(Formio.oAuthCurrentUser(options.formio, token.accessToken));
          }).catch(function (err) {
            console.warn(err);
            reject(err);
          });
        } else {
          authClient.token.getWithRedirect({
            responseType: 'token',
            scopes: options.scopes
          });
          resolve(false);
        }
      });
    }
  }, {
    key: "ssoInit",
    value: function ssoInit(type, options) {
      switch (type) {
        case 'okta':
          return Formio.oktaInit(options);

        default:
          console.warn('Unknown SSO type');
          return _nativePromiseOnly.default.reject('Unknown SSO type');
      }
    }
  }, {
    key: "requireLibrary",
    value: function requireLibrary(name, property, src, polling) {
      if (!Formio.libraries.hasOwnProperty(name)) {
        Formio.libraries[name] = {};
        Formio.libraries[name].ready = new _nativePromiseOnly.default(function (resolve, reject) {
          Formio.libraries[name].resolve = resolve;
          Formio.libraries[name].reject = reject;
        });
        var callbackName = "".concat(name, "Callback");

        if (!polling && !window[callbackName]) {
          window[callbackName] = function () {
            return Formio.libraries[name].resolve();
          };
        } // See if the plugin already exists.


        var plugin = (0, _get2.default)(window, property);

        if (plugin) {
          Formio.libraries[name].resolve(plugin);
        } else {
          src = Array.isArray(src) ? src : [src];
          src.forEach(function (lib) {
            var attrs = {};
            var elementType = '';

            if (typeof lib === 'string') {
              lib = {
                type: 'script',
                src: lib
              };
            }

            switch (lib.type) {
              case 'script':
                elementType = 'script';
                attrs = {
                  src: lib.src,
                  type: 'text/javascript',
                  defer: true,
                  async: true
                };
                break;

              case 'styles':
                elementType = 'link';
                attrs = {
                  href: lib.src,
                  rel: 'stylesheet'
                };
                break;
            } // Add the script to the top page.


            var script = document.createElement(elementType);

            for (var attr in attrs) {
              script.setAttribute(attr, attrs[attr]);
            }

            document.getElementsByTagName('head')[0].appendChild(script);
          }); // if no callback is provided, then check periodically for the script.

          if (polling) {
            var interval = setInterval(function () {
              var plugin = (0, _get2.default)(window, property);

              if (plugin) {
                clearInterval(interval);
                Formio.libraries[name].resolve(plugin);
              }
            }, 200);
          }
        }
      }

      return Formio.libraries[name].ready;
    }
  }, {
    key: "libraryReady",
    value: function libraryReady(name) {
      if (Formio.libraries.hasOwnProperty(name) && Formio.libraries[name].ready) {
        return Formio.libraries[name].ready;
      }

      return _nativePromiseOnly.default.reject("".concat(name, " library was not required."));
    }
  }, {
    key: "token",
    get: function get() {
      if (!Formio.tokens) {
        Formio.tokens = {};
      }

      return Formio.tokens.formioToken ? Formio.tokens.formioToken : '';
    } // Needed to maintain reverse compatability...
    ,
    set: function set(token) {
      if (!Formio.tokens) {
        Formio.tokens = {};
      }

      return Formio.tokens.formioToken = token || '';
    }
  }]);

  return Formio;
}(); // Define all the static properties.


exports.default = Formio;
Formio.libraries = {};
Formio.Promise = _nativePromiseOnly.default;
Formio.Headers = Headers;
Formio.baseUrl = 'https://api.form.io';
Formio.projectUrl = Formio.baseUrl;
Formio.projectUrlSet = false;
Formio.plugins = [];
Formio.cache = {};
Formio.providers = providers;
Formio.events = new _eventemitter.EventEmitter2({
  wildcard: false,
  maxListeners: 0
});

if ((typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' && !global.Formio) {
  global.Formio = Formio;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _moment = __webpack_require__(1);

var _moment2 = _interopRequireDefault(_moment);

var _Connection = __webpack_require__(5);

var _Connection2 = _interopRequireDefault(_Connection);

var _Model = __webpack_require__(4);

var _Model2 = _interopRequireDefault(_Model);

var _Fluent = __webpack_require__(3);

var _Fluent2 = _interopRequireDefault(_Fluent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _Fluent2.default.extend(_Model2.default, {
  properties: {
    name: 'Form',
    path: 'custom'
  },
  methods: {
    filterToString: function filterToString(filter) {
      if (!filter) {
        return;
      }
      // Condition {element: '_id', query: 'in', value: ''}
      var filterQuery = {};

      filter.forEach(function (condition) {
        var valueString = '';

        switch (condition.query) {
          case '=':
            filterQuery[condition.element] = condition.value;
            break;
          case '!=':
            filterQuery[condition.element + '__ne'] = condition.value;
            break;
          case '>':
            filterQuery[condition.element + '__gt'] = condition.value;
            break;
          case '>=':
            filterQuery[condition.element + '__gte'] = condition.value;
            break;
          case '<':
            filterQuery[condition.element + '__lt'] = condition.value;
            break;
          case '<=':
            filterQuery[condition.element + '__lte'] = condition.value;
            break;
          case 'in':
            valueString = '';
            condition.value.forEach(function (value, index, array) {
              valueString = index === array.length - 1 ? valueString + value : valueString + value + ',';
            });
            filterQuery[condition.element + '__in'] = valueString;
            break;
          case 'nin':
            valueString = '';
            condition.value.forEach(function (value, index, array) {
              valueString = index === array.length - 1 ? valueString + value : valueString + value + ',';
            });
            filterQuery[condition.element + '__nin'] = valueString;
            break;
          case 'exists':
            filterQuery[condition.element + '__exists'] = true;
            break;
          case '!exists':
            filterQuery[condition.element + '__exists'] = false;
            break;
          case 'regex':
            filterQuery[condition.element + '__regex'] = condition.value;
            break;
        }
      });
      return filterQuery;
    },
    rFind: function rFind() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$filter = _ref.filter,
            filter = _ref$filter === undefined ? undefined : _ref$filter,
            _ref$limit = _ref.limit,
            limit = _ref$limit === undefined ? 200 : _ref$limit,
            select = _ref.select,
            pagination = _ref.pagination,
            form = _ref.form;

        var formio, queryParams, filterQuery, isOnline, remoteForms;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Fluent2.default.getRemoteConnector({ path: 'custom' }).getFormioInstance({ path: 'custom' });

              case 2:
                formio = _context.sent;
                queryParams = {};


                if (limit) {
                  queryParams.limit = limit;
                }

                if (filter) {
                  filterQuery = _this.filterToString(filter);


                  queryParams = _extends({}, queryParams, filterQuery);
                }
                _context.next = 8;
                return _Connection2.default.isOnline();

              case 8:
                isOnline = _context.sent;

                if (!isOnline) {
                  _context.next = 15;
                  break;
                }

                _context.next = 12;
                return formio.loadForms({
                  params: queryParams
                });

              case 12:
                _context.t0 = _context.sent;
                _context.next = 16;
                break;

              case 15:
                _context.t0 = [];

              case 16:
                remoteForms = _context.t0;
                return _context.abrupt('return', remoteForms);

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },
    get: function get(id) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var formRequest, formRequestID, formRequestPath;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = id.replace(/\s/g, '');

                _context2.next = 3;
                return _this2.findOne({
                  'data.name': id
                });

              case 3:
                formRequest = _context2.sent;
                _context2.next = 6;
                return _this2.findOne({
                  'data._id': id
                });

              case 6:
                formRequestID = _context2.sent;
                _context2.next = 9;
                return _this2.findOne({
                  'data.path': id
                });

              case 9:
                formRequestPath = _context2.sent;

                if (!formRequest) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt('return', formRequest.data);

              case 12:
                if (!formRequestID) {
                  _context2.next = 14;
                  break;
                }

                return _context2.abrupt('return', formRequestID.data);

              case 14:
                if (!formRequestPath) {
                  _context2.next = 16;
                  break;
                }

                return _context2.abrupt('return', formRequestPath.data);

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },
    cardFormattedForms: function cardFormattedForms(action) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this3.local().find();

              case 2:
                result = _context3.sent;


                result = result.filter(function (o) {
                  return o.data.tags.indexOf('visible') > -1;
                });
                result = result.sort(function (a, b) {
                  a = a.data.title;
                  b = b.data.title;
                  return a > b ? 1 : a < b ? -1 : 0;
                });

                result = result.map(function (f) {
                  return {
                    title: f.data.title,
                    tags: f.data.tags,
                    customIcon: true,
                    icon: action === 'create' ? 'statics/customSVG/startSurvey.svg' : 'statics/customSVG/collectedData.svg',
                    subtitle: 'Last updated: ' + (0, _moment2.default)(f.data.modified).fromNow(),
                    actions: [{
                      text: action === 'create' ? 'Start' : 'View data',
                      target: 'form',
                      view: action,
                      path: f.data.path
                    }]
                  };
                });

                result = { cards: result };
                return _context3.abrupt('return', result);

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this3);
      }))();
    }
  }
})();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Model = __webpack_require__(4);

var _Model2 = _interopRequireDefault(_Model);

var _Fluent = __webpack_require__(3);

var _Fluent2 = _interopRequireDefault(_Fluent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Fluent2.default.extend(_Model2.default, {
  properties: {
    name: 'User',
    path: 'user'
  }
})();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Auth = __webpack_require__(21);

var _Auth2 = _interopRequireDefault(_Auth);

var _moment = __webpack_require__(1);

var _moment2 = _interopRequireDefault(_moment);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _Form = __webpack_require__(12);

var _Form2 = _interopRequireDefault(_Form);

var _utils = __webpack_require__(54);

var _utils2 = _interopRequireDefault(_utils);

var _Model = __webpack_require__(4);

var _Model2 = _interopRequireDefault(_Model);

var _Fluent = __webpack_require__(3);

var _Fluent2 = _interopRequireDefault(_Fluent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _Fluent2.default.extend(_Model2.default, {
  properties: {
    name: 'Submission',
    path: undefined
  },
  methods: {
    get: function get(id) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var offline;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = id.replace(/\s/g, '');
                _context.next = 3;
                return _this.local().find({
                  filter: {
                    _id: id
                  }
                });

              case 3:
                offline = _context.sent;

                if (!(offline.length > 0)) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', offline[0]);

              case 6:
                return _context.abrupt('return', {
                  data: false
                });

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },
    offline: function offline(formId) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var filter;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this2.find({
                  'data.user_email': _Auth2.default.email(),
                  'data.formio.formId': formId
                });

              case 2:
                filter = _context2.sent;

                // updated incomplete submission

                filter = filter.filter(function (o) {
                  return o.data.sync === false || o.data.draft === false;
                });
                filter = filter.sort(function (a, b) {
                  a = new Date(a.data.created);
                  b = new Date(b.data.created);
                  return a > b ? -1 : a < b ? 1 : 0;
                });
                return _context2.abrupt('return', filter);

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },
    stored: function stored(formId) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', _this3.find({
                  'data.formio.formId': formId,
                  'data.owner': _Auth2.default.user()._id
                }));

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this3);
      }))();
    },
    getUnsync: function getUnsync() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var unsynced;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this4.find({
                  'data.sync': false
                });

              case 2:
                unsynced = _context4.sent;


                // updated incomplete submission
                unsynced = unsynced.filter(function (o) {
                  return o.data.sync === false && o.data.draft === false && o.data.user_email === _Auth2.default.email() && !o.data.queuedForSync && !o.data.syncError;
                });
                unsynced = unsynced.sort(function (a, b) {
                  a = new Date(a.data.created);
                  b = new Date(b.data.created);
                  return a > b ? -1 : a < b ? 1 : 0;
                });
                return _context4.abrupt('return', unsynced);

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this4);
      }))();
    },
    showView: function showView(_ref) {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var form = _ref.form,
            filter = _ref.filter,
            limit = _ref.limit,
            select = _ref.select,
            pagination = _ref.pagination,
            populate = _ref.populate,
            dataExport = _ref.dataExport,
            vm = _ref.vm;
        var page, pageLimit, paginationInfo, submissions, totalRecords, pages, fullForm, templates, paginated;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                page = pagination && pagination.page || 1;
                pageLimit = pagination && pagination.limit || 500;
                paginationInfo = {};
                submissions = [];
                _context5.next = 6;
                return _this5.find({
                  form: form,
                  limit: limit,
                  select: select,
                  pagination: pagination,
                  filter: filter,
                  populate: populate
                });

              case 6:
                submissions = _context5.sent;


                // Need to clone the object as it is Dynamic LokiJs
                submissions = _utilities2.default.cloneDeep(submissions);

                submissions = submissions.map(function (o) {
                  if (o._id && o._id.indexOf('_local') >= 0) {
                    o.data._lid = o._id;
                  }
                  if (o.data && !o.data._id) {
                    o.data._id = o._id;
                  }
                  if (o.data && !o.data.owner) {
                    o.data.owner = o.owner;
                  }
                  if (o.data && !o.data.modified) {
                    o.data.modified = o.modified;
                  }

                  if (dataExport) {
                    if (o.data && o.data.owner && o.data.owner.data && o.data.owner.data.email) {
                      o.data.ownerEmail = o.data.owner.data.email;
                    }
                    if (o.data && o.data.user_email) {
                      o.data.ownerEmail = o.data.user_email;
                    }

                    if (!o.$loki) {
                      return o.data;
                    }
                    o.data.data._id = o._id;
                    return o.data.data;
                  }

                  var result = o.data;

                  if (result && result.data) {
                    var d = result.data;

                    delete result.data;
                    result = Object.assign(result, d);
                  }
                  return result;
                });

                if (!dataExport) {
                  _context5.next = 11;
                  break;
                }

                return _context5.abrupt('return', submissions);

              case 11:

                if (pageLimit > 0) {
                  totalRecords = submissions.length;
                  pages = Math.ceil(totalRecords / pageLimit);
                  // let firstRecord = (pageLimit * page) - (pageLimit - 1)
                  // let lastRecord = (pageLimit * page)

                  paginationInfo = {
                    total: totalRecords,
                    pages: pages,
                    currentPage: page,
                    pageLimit: pageLimit
                  };
                  // submissions = submissions.slice(firstRecord - 1, lastRecord);
                }
                _context5.next = 14;
                return _Form2.default.get(form);

              case 14:
                fullForm = _context5.sent;
                templates = [];


                _utils2.default.eachComponent(fullForm.components, function (c) {
                  if (c.properties && c.properties.FAST_TABLE_TEMPLATE) {
                    templates.push({ key: c.key, template: c.properties.FAST_TABLE_TEMPLATE });
                  }
                });

                submissions = submissions.map(function (s) {
                  var sub = {
                    _id: s._id,
                    status: s.sync === false ? 'offline' : 'online',
                    draft: s.draft,
                    HumanUpdated: s.updated ? _moment2.default.unix(s.updated).fromNow() : (0, _moment2.default)(s.modified).fromNow(),
                    syncError: s.syncError ? s.syncError : false,
                    updated: s.updated ? _moment2.default.unix(s.updated).unix() : (0, _moment2.default)(s.modified).unix()
                  };

                  if (s._lid) {
                    sub._lid = s._lid;
                  }

                  // Custom templates using FAST_TABLE_TEMPLATE propertie
                  templates.forEach(function (t) {
                    /* eslint-disable */
                    var newFx = Function('value', 'data', t.template);
                    /* eslint-enable */
                    try {
                      s[t.key] = newFx(s[t.key], s);
                    } catch (error) {
                      console.log('There is an error on one of your calculations', error);
                    }
                  });

                  // We need to remove this from here and create
                  // A proper extension to allow tables to have custom visuali
                  // of complex data
                  if (s.dataCollected) {
                    if (s.dataCollected.scouting && s.dataCollected.traps) {
                      s.dataCollected = vm.$t('Scouting and traps');
                    } else if (s.dataCollected.scouting) {
                      s.dataCollected = vm.$t('Scouting');
                    } else if (s.dataCollected.traps) {
                      s.dataCollected = vm.$t('Traps');
                    } else {
                      s.dataCollected = '-';
                    }
                  }
                  if (s.date) {
                    s.date = (0, _moment2.default)(s.date).format('DD-MM-YYYY HH:mm:ss');
                  }

                  if (!select) {
                    return sub;
                  }
                  select.forEach(function (c) {
                    c = c.replace('data.', '');
                    sub[c] = s[c];
                  });
                  return sub;
                });

                submissions = submissions.sort(function (a, b) {
                  a = new Date(a.updated);
                  b = new Date(b.updated);
                  return a > b ? -1 : a < b ? 1 : 0;
                });

                paginated = { results: submissions, pagination: paginationInfo };
                return _context5.abrupt('return', paginated);

              case 21:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this5);
      }))();
    },
    getParallelParticipants: function getParallelParticipants(idForm, idSubmission) {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var currentSubmission, groupId, submissions, a;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _this6.local().find({
                  filter: {
                    _id: idSubmission
                  }
                });

              case 2:
                currentSubmission = _context6.sent;


                currentSubmission = currentSubmission[0];
                groupId = _utilities2.default.get(function () {
                  return currentSubmission.data.data.parallelSurvey;
                });


                groupId = groupId && groupId !== '[object Object]' ? JSON.parse(groupId).groupId : undefined;

                _context6.next = 8;
                return _this6.local().find({
                  filter: {
                    'data.formio.formId': idForm
                  }
                });

              case 8:
                submissions = _context6.sent;
                a = submissions.filter(function (submission) {
                  var parallelSurveyID = _utilities2.default.get(function () {
                    return submission.data.data.parallelSurvey;
                  });

                  parallelSurveyID = parallelSurveyID && parallelSurveyID !== '[object Object]' ? JSON.parse(parallelSurveyID).groupId : undefined;
                  return parallelSurveyID && parallelSurveyID === groupId;
                });


                a = a.map(function (e) {
                  e.data.data.parallelSurvey;
                });
                a = a.map(function (survey) {
                  return JSON.parse(survey);
                });
                return _context6.abrupt('return', a);

              case 13:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, _this6);
      }))();
    },
    getParallelSurvey: function getParallelSurvey(submission) {
      var parallelsurveyInfo = _utilities2.default.get(function () {
        return submission.data.data.paraparallelSurvey;
      }) || _utilities2.default.get(function () {
        return submission.data.parallelSurvey;
      });

      parallelsurveyInfo = parallelsurveyInfo && parallelsurveyInfo !== '[object Object]' ? JSON.parse(parallelsurveyInfo) : undefined;

      return parallelsurveyInfo;
    },
    setParallelSurvey: function setParallelSurvey(parallelsurveyInfo) {
      return JSON.stringify(parallelsurveyInfo);
    },
    getGroups: function getGroups(formId) {
      var _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var submissions, groups;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _this7.local().find();

              case 2:
                submissions = _context7.sent;


                submissions = formId ? submissions.filter(function (submission) {
                  return submission.data.formio.formId === formId;
                }) : submissions;

                groups = submissions.map(function (submission) {
                  return _this7.local().getParallelSurvey(submission) ? {
                    groupId: _this7.local().getParallelSurvey(submission).groupId,
                    groupName: _this7.local().getParallelSurvey(submission).groupName
                  } : undefined;
                });


                groups = groups.filter(function (group) {
                  return typeof group !== 'undefined';
                });

                return _context7.abrupt('return', _utilities2.default.uniqBy(groups, 'groupId'));

              case 7:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, _this7);
      }))();
    },
    getGroup: function getGroup(id) {
      var _this8 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var groups;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _this8.local().getGroups();

              case 2:
                groups = _context8.sent;


                groups = groups.filter(function (group) {
                  return group.groupId === id;
                });
                return _context8.abrupt('return', groups[0]);

              case 5:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, _this8);
      }))();
    },
    removeFromGroup: function removeFromGroup(submission) {
      var _this9 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, _this9);
      }))();
    },
    assingToGroup: function assingToGroup(submissionId, groupId) {
      var _this10 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var group, submission, parallelData, parallelSurvey;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return _this10.local().getGroup(groupId[0]);

              case 2:
                group = _context10.sent;
                _context10.next = 5;
                return _this10.local().get(submissionId);

              case 5:
                submission = _context10.sent;
                parallelData = _this10.local().getParallelSurvey(submission);
                parallelSurvey = _extends({}, parallelData, {
                  groupId: group.groupId,
                  groupName: group.groupName
                });


                submission.data.data.parallelSurvey = _this10.local().setParallelSurvey(parallelSurvey);
                _context10.next = 11;
                return _this10.local().update(submission);

              case 11:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, _this10);
      }))();
    }
  }
})();

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function isObject(arg) {
  var type = typeof arg;
  return Boolean(arg) && (type === 'object' || type === 'function');
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(45);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(123);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(129);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-unused-vars */
var config = function () {
  var jwt, url, submission, baseURL, translations;

  function set(_ref) {
    var _ref$jwtToken = _ref.jwtToken,
        jwtToken = _ref$jwtToken === undefined ? undefined : _ref$jwtToken,
        _ref$baseURL = _ref.baseURL,
        baseURL = _ref$baseURL === undefined ? undefined : _ref$baseURL,
        _ref$submissionId = _ref.submissionId,
        submissionId = _ref$submissionId === undefined ? undefined : _ref$submissionId,
        _ref$i18n = _ref.i18n,
        i18n = _ref$i18n === undefined ? undefined : _ref$i18n;

    jwt = jwtToken ? jwtToken : jwt;
    url = baseURL ? baseURL : url;
    submission = submissionId ? submissionId : submission;
    translations = i18n ? i18n : translations;
  }

  function setBaseUrl(baseUrl) {
    baseURL = baseUrl;
  }

  function get() {
    return { jwt: jwt, url: url, submission: submission, baseURL: baseURL, translations: translations };
  }
  return Object.freeze({
    set: set,
    get: get,
    setBaseUrl: setBaseUrl
  });
}();

exports.default = config;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _Model = __webpack_require__(4);

var _Model2 = _interopRequireDefault(_Model);

var _Fluent = __webpack_require__(3);

var _Fluent2 = _interopRequireDefault(_Fluent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _Fluent2.default.extend(_Model2.default, {
  properties: {
    name: 'Translation',
    path: 'translations'
  },
  methods: {
    getFormTranslations: function getFormTranslations() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var i18n, localTranslations;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                i18n = {};
                _context.next = 3;
                return _this.local().findOne();

              case 3:
                localTranslations = _context.sent;


                localTranslations = _utilities2.default.get(function () {
                  return localTranslations.data;
                }, {});

                Object.keys(localTranslations).forEach(function (languageCode) {
                  if (languageCode !== 'type') {
                    i18n[languageCode] = localTranslations[languageCode];
                  }
                });
                return _context.abrupt('return', i18n);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },

    /**
     *
     */
    supportedLanguages: function supportedLanguages() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var translations, isoLanguages, languages;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this2.local().find();

              case 2:
                translations = _context2.sent;

                if (!(translations.length === 0)) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt('return', []);

              case 5:
                isoLanguages = _this2.getIsoLanguages();
                languages = [];


                translations = _utilities2.default.get(function () {
                  return translations[0].data;
                }, []);

                Object.keys(translations).forEach(function (languageCode) {
                  var iso = isoLanguages.find(function (l) {
                    return l.code === languageCode;
                  });

                  if (iso) {
                    languages.push(iso);
                  }
                });

                languages = languages.sort(function (a, b) {
                  a = a.label;
                  b = b.label;
                  return a > b ? 1 : a < b ? -1 : 0;
                });
                return _context2.abrupt('return', languages);

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },

    /**
     *
     */
    getIsoLanguages: function getIsoLanguages() {
      return __webpack_require__(135);
    }
  }
})();

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Configuration = __webpack_require__(2);

var _Configuration2 = _interopRequireDefault(_Configuration);

var _md = __webpack_require__(30);

var _md2 = _interopRequireDefault(_md);

var _User = __webpack_require__(13);

var _User2 = _interopRequireDefault(_User);

var _User3 = __webpack_require__(50);

var _User4 = _interopRequireDefault(_User3);

var _Connection = __webpack_require__(5);

var _Connection2 = _interopRequireDefault(_Connection);

var _Role = __webpack_require__(53);

var _Role2 = _interopRequireDefault(_Role);

var _Role3 = __webpack_require__(31);

var _Role4 = _interopRequireDefault(_Role3);

var _bluebird = __webpack_require__(10);

var _bluebird2 = _interopRequireDefault(_bluebird);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Auth = function () {
  /**
   *
   *
   * @param {any} credentials
   * @returns
   */
  var localAuthenticate = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(credentials) {
      var username, password, config, hashedPassword, dbUser, userFound, isValidUser;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              username = credentials.username, password = credentials.password;
              _context.next = 3;
              return _Configuration2.default.getLocal();

            case 3:
              config = _context.sent;


              // Hash password
              hashedPassword = (0, _md2.default)(password, config.MD5_KEY);

              // Get the user

              _context.next = 7;
              return _User2.default.local().find({
                'data.data.email': username
              });

            case 7:
              dbUser = _context.sent;
              userFound = dbUser && dbUser[0] ? dbUser[0] : undefined;


              console.log('user', userFound);

              if (userFound) {
                _context.next = 12;
                break;
              }

              throw new Error();

            case 12:

              // Compare hashed passwords
              isValidUser = userFound.data.data.hashedPassword === hashedPassword;

              if (isValidUser) {
                _context.next = 15;
                break;
              }

              throw new Error();

            case 15:
              return _context.abrupt('return', userFound);

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function localAuthenticate(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  /**
   *
   *
   * @param {any} credentials
   * @param {any} baseUrl
   * @param {any} role
   * @returns
   */
  var remoteAuthenticate = function remoteAuthenticate(credentials, baseUrl, role) {
    return _User4.default.login({ credentials: credentials, role: role }).then(function (response) {
      // Store locally the user for future offline login
      var user = response.data;

      _User4.default.updateUser(user);
      return response;
    });
  };

  /**
   *
   * Authenticates the User with the given credentials
   * @param {any} credentials
   * @param {any} baseUrl
   * @param {any} role
   * @returns
   */
  var authenticate = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(credentials, baseUrl, role) {
      var isOnline;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _Connection2.default.isOnline();

            case 2:
              isOnline = _context2.sent;

              if (!isOnline) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt('return', remoteAuthenticate(credentials, baseUrl, role));

            case 5:
              return _context2.abrupt('return', localAuthenticate(credentials, baseUrl));

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function authenticate(_x2, _x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   *
   *
   * @param {any} credentials
   * @param {any} baseUrl
   * @param {any} role
   * @returns
   */

  var attempt = function attempt(credentials, baseUrl, role) {
    var _this = this;

    role = role || 'user';

    return new _bluebird2.default(function (resolve, reject) {
      authenticate(credentials, baseUrl, role)
      // If credentials are OK
      .then(function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(response) {
          var headers, user, roles;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  headers = response.headers || {};
                  user = response.data;
                  /* eslint-disable*/

                  user.x_jwt_token = headers['x-jwt-token'];
                  /* eslint-enable*/

                  // Save auth user
                  localStorage.setItem('authUser', JSON.stringify(user));
                  localStorage.setItem('formioToken', headers['x-jwt-token']);
                  // user.isAdmin = true
                  _context3.next = 7;
                  return _Role2.default.local().find();

                case 7:
                  roles = _context3.sent;


                  roles = roles[0];
                  user.rolesNames = [];
                  Object.keys(roles).forEach(function (key) {
                    if (key !== '$loki' && key !== '_id' && key !== 'meta') {
                      if (user.roles && user.roles.indexOf(roles[key]._id) !== -1) {
                        user.rolesNames.push(roles[key]);
                      }
                    }
                  });

                  localStorage.setItem('authUser', JSON.stringify(user));

                  resolve(user);

                case 13:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this);
        }));

        return function (_x5) {
          return _ref3.apply(this, arguments);
        };
      }())
      // If there are errors
      .catch(function (error) {
        console.log('There was an error over here!');
        reject(error);
      });
    });
  };
  /**
   *
   *
   * @returns
   */

  var user = function user() {
    try {
      var _user = JSON.parse(localStorage.getItem('authUser'));

      return _user === null ? false : _user;
    } catch (e) {
      localStorage.removeItem('authUser');
      return false;
    }
  };
  /**
   *
   *
   * @returns
   */

  var email = function email() {
    var email = '';

    if (Auth.user() && Auth.user().data && Auth.user().data.email) {
      email = Auth.user().data.email;
    } else if (Auth.user() && Auth.user().email) {
      email = Auth.user().email;
    }
    return email;
  };
  /**
   *
   *
   * @param {any} roleName
   * @returns
   */

  var hasRole = function hasRole(roleName) {
    var user = JSON.parse(localStorage.getItem('authUser'));

    user = user === null ? false : user;

    var result = user.rolesNames.find(function (r) {
      return r.title === roleName;
    });

    return typeof result !== 'undefined';
  };
  /**
   *
   *
   * @param {any} roles
   * @returns
   */

  var hasRoleIn = function hasRoleIn(roles) {
    if (!roles || _utilities2.default.isEmpty(roles)) {
      return true;
    }
    return roles.some(function (role) {
      return hasRole(role) || role === 'Authenticated';
    });
  };
  /**
   *
   *
   * @param {any} rolesIds
   * @returns
   */

  var hasRoleIdIn = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(rolesIds) {
      var appRoles, roles;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(!rolesIds || _utilities2.default.isEmpty(rolesIds))) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt('return', true);

            case 2:
              _context4.next = 4;
              return _Role4.default.getLocal();

            case 4:
              appRoles = _context4.sent;
              roles = rolesIds.reduce(function (reducer, roleId) {
                Object.keys(appRoles).forEach(function (role) {
                  if (appRoles[role] && appRoles[role]._id && appRoles[role]._id === roleId) {
                    reducer.push(appRoles[role].title);
                  }
                });
                return reducer;
              }, []);
              return _context4.abrupt('return', roles.some(function (role) {
                return hasRole(role) || role === 'Authenticated';
              }));

            case 7:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function hasRoleIdIn(_x6) {
      return _ref4.apply(this, arguments);
    };
  }();
  /**
   * Checks if the current user is
   * Authenticated
   * @return {boolean}
   */

  var check = function check() {
    var user = JSON.parse(localStorage.getItem('authUser'));

    return !!user && !!user.x_jwt_token;
  };
  /**
   * Logs out autheticated user
   *
   */

  var logOut = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return localStorage.removeItem('authUser');

            case 2:
              _context5.next = 4;
              return localStorage.removeItem('formioToken');

            case 4:
              _context5.next = 6;
              return localStorage.removeItem('formioUser');

            case 6:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function logOut() {
      return _ref5.apply(this, arguments);
    };
  }();

  return Object.freeze({
    user: user,
    email: email,
    hasRoleIn: hasRoleIn,
    hasRoleIdIn: hasRoleIdIn,
    hasRole: hasRole,
    check: check,
    logOut: logOut,
    attempt: attempt
  });
}();

exports.default = Auth;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function isFunction(arg) {
  return typeof arg === 'function';
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(25);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(82);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(42),
    isObjectLike = __webpack_require__(86);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "to", function() { return to; });
/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
function to(promise, errorExt) {
    return promise
        .then(function (data) { return [null, data]; })
        .catch(function (err) {
        if (errorExt) {
            Object.assign(err, errorExt);
        }
        return [err, undefined];
    });
}


/* harmony default export */ __webpack_exports__["default"] = (to);
//# sourceMappingURL=await-to-js.es5.js.map


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Connection = __webpack_require__(5);

var _Connection2 = _interopRequireDefault(_Connection);

var _Pages = __webpack_require__(48);

var _Pages2 = _interopRequireDefault(_Pages);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _awaitToJs = __webpack_require__(28);

var _awaitToJs2 = _interopRequireDefault(_awaitToJs);

var _Configuration = __webpack_require__(2);

var _Configuration2 = _interopRequireDefault(_Configuration);

var _moment = __webpack_require__(1);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var PAGES = function () {
  var setOfflinePages = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
      var appConf = _ref.appConf;
      var localPages, localDate, config, offlinePages, newPages;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _Pages2.default.local().find();

            case 2:
              localPages = _context.sent;
              localDate = getLocalPagesDate(localPages);
              _context.next = 6;
              return _Configuration2.default.getLocal();

            case 6:
              config = _context.sent;
              offlinePages = _utilities2.default.get(function () {
                return appConf.offlineFiles.Pages[0].data;
              });

              if (!(config.fastUpdated >= localDate)) {
                _context.next = 16;
                break;
              }

              if (!localPages) {
                _context.next = 12;
                break;
              }

              _context.next = 12;
              return _Pages2.default.local().clear();

            case 12:
              _context.next = 14;
              return _Pages2.default.local().insert(_extends({}, offlinePages, { fastUpdated: (0, _moment2.default)().unix() }));

            case 14:
              newPages = _context.sent;
              return _context.abrupt('return', newPages);

            case 16:
              return _context.abrupt('return', _utilities2.default.get(function () {
                return localPages[0].data;
              }));

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function setOfflinePages(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var setOnlinePages = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var localPages, remotePages, error, isOnline, _ref4, _ref5, newPages;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              localPages = void 0, remotePages = void 0, error = void 0;
              _context2.next = 3;
              return _Pages2.default.local().find();

            case 3:
              localPages = _context2.sent;

              localPages = _utilities2.default.get(function () {
                return localPages[0];
              });
              _context2.next = 7;
              return _Connection2.default.isOnline();

            case 7:
              isOnline = _context2.sent;

              if (!isOnline) {
                _context2.next = 17;
                break;
              }

              _context2.next = 11;
              return (0, _awaitToJs2.default)(_Pages2.default.remote().find({ limit: 500 }));

            case 11:
              _ref4 = _context2.sent;
              _ref5 = _slicedToArray(_ref4, 2);
              error = _ref5[0];
              remotePages = _ref5[1];

              if (!error) {
                _context2.next = 17;
                break;
              }

              throw new Error(error);

            case 17:
              remotePages = _utilities2.default.get(function () {
                return remotePages[0].data;
              });
              newPages = localPages;

              if (!(remotePages && !_utilities2.default.isEmpty(remotePages))) {
                _context2.next = 27;
                break;
              }

              if (!localPages) {
                _context2.next = 23;
                break;
              }

              _context2.next = 23;
              return _Pages2.default.local().clear();

            case 23:
              remotePages.fastUpdated = (0, _moment2.default)().unix();

              _context2.next = 26;
              return _Pages2.default.local().insert(remotePages);

            case 26:
              newPages = _context2.sent;

            case 27:
              return _context2.abrupt('return', newPages);

            case 28:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function setOnlinePages() {
      return _ref3.apply(this, arguments);
    };
  }();

  var set = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref6) {
      var appConf = _ref6.appConf,
          forceOnline = _ref6.forceOnline;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(String(appConf.offlineStart) === 'true' && !forceOnline)) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt('return', setOfflinePages({ appConf: appConf }));

            case 2:
              return _context3.abrupt('return', setOnlinePages());

            case 3:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function set(_x2) {
      return _ref7.apply(this, arguments);
    };
  }();

  var getLocal = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(submission) {
      var pages;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _Pages2.default.local().find();

            case 2:
              pages = _context4.sent;
              return _context4.abrupt('return', _utilities2.default.get(function () {
                return pages[0];
              }, {}));

            case 4:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function getLocal(_x3) {
      return _ref8.apply(this, arguments);
    };
  }();

  function getLocalPagesDate(localPages) {
    return _utilities2.default.get(function () {
      return localPages[0].fastUpdated;
    }, 0);
  }


  return Object.freeze({
    set: set,
    getLocal: getLocal
  });
}();

exports.default = PAGES;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__30__;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Connection = __webpack_require__(5);

var _Connection2 = _interopRequireDefault(_Connection);

var _Role = __webpack_require__(53);

var _Role2 = _interopRequireDefault(_Role);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _awaitToJs = __webpack_require__(28);

var _awaitToJs2 = _interopRequireDefault(_awaitToJs);

var _axios = __webpack_require__(52);

var _axios2 = _interopRequireDefault(_axios);

var _moment = __webpack_require__(1);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Role = function () {
  var getLocal = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var roles;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _Role2.default.local().find();

            case 2:
              roles = _context.sent;
              return _context.abrupt('return', _utilities2.default.get(function () {
                return roles[0];
              }));

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function getLocal() {
      return _ref.apply(this, arguments);
    };
  }();

  var setOnlineRoles = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
      var url = _ref2.url;

      var error, remoteRoles, localRoles, isOnline, _ref4, _ref5, insertedRoles;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              error = void 0;
              remoteRoles = void 0;
              _context2.next = 4;
              return _Role2.default.local().find();

            case 4:
              localRoles = _context2.sent;


              localRoles = _utilities2.default.get(function () {
                return localRoles[0];
              });
              _context2.next = 8;
              return _Connection2.default.isOnline();

            case 8:
              isOnline = _context2.sent;

              if (!isOnline) {
                _context2.next = 18;
                break;
              }

              _context2.next = 12;
              return (0, _awaitToJs2.default)(_axios2.default.get(url + '/access'));

            case 12:
              _ref4 = _context2.sent;
              _ref5 = _slicedToArray(_ref4, 2);
              error = _ref5[0];
              remoteRoles = _ref5[1];

              if (!error) {
                _context2.next = 18;
                break;
              }

              throw new Error(error);

            case 18:

              remoteRoles = _utilities2.default.get(function () {
                return remoteRoles.data.roles;
              });

              if (!remoteRoles) {
                _context2.next = 28;
                break;
              }

              if (!localRoles) {
                _context2.next = 23;
                break;
              }

              _context2.next = 23;
              return _Role2.default.local().clear();

            case 23:
              remoteRoles.fastUpdated = (0, _moment2.default)().unix();

              _context2.next = 26;
              return _Role2.default.local().insert(remoteRoles);

            case 26:
              insertedRoles = _context2.sent;
              return _context2.abrupt('return', insertedRoles);

            case 28:
              return _context2.abrupt('return', localRoles);

            case 29:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function setOnlineRoles(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  var setOfflineRoles = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref6) {
      var appConf = _ref6.appConf;
      var localRoles, rolesDate, offlineRolesDate, insertedRoles;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return getLocal();

            case 2:
              localRoles = _context3.sent;
              rolesDate = getRolesDate(localRoles);
              offlineRolesDate = appConf.offlineFiles.lastUpdated.date;

              if (!(offlineRolesDate > rolesDate || !localRoles)) {
                _context3.next = 13;
                break;
              }

              if (!localRoles) {
                _context3.next = 9;
                break;
              }

              _context3.next = 9;
              return _Role2.default.local().clear();

            case 9:
              _context3.next = 11;
              return _Role2.default.local().insert(appConf.offlineFiles.Roles);

            case 11:
              insertedRoles = _context3.sent;
              return _context3.abrupt('return', insertedRoles);

            case 13:
              return _context3.abrupt('return', localRoles);

            case 14:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function setOfflineRoles(_x2) {
      return _ref7.apply(this, arguments);
    };
  }();

  var set = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref8) {
      var url = _ref8.url,
          appConf = _ref8.appConf,
          forceOnline = _ref8.forceOnline;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!(appConf.offlineStart === 'true' && !forceOnline)) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt('return', setOfflineRoles({ appConf: appConf }));

            case 2:
              return _context4.abrupt('return', setOnlineRoles({ url: url }));

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function set(_x3) {
      return _ref9.apply(this, arguments);
    };
  }();

  function getRolesDate(localRoles) {
    return _utilities2.default.get(function () {
      return localRoles.fastUpdated;
    }, 0);
  }

  return Object.freeze({
    set: set,
    getLocal: getLocal
  });
}();

exports.default = Role;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _moment = __webpack_require__(1);

var _moment2 = _interopRequireDefault(_moment);

var _Auth = __webpack_require__(21);

var _Auth2 = _interopRequireDefault(_Auth);

var _SyncHelper = __webpack_require__(51);

var _SyncHelper2 = _interopRequireDefault(_SyncHelper);

var _Submission = __webpack_require__(14);

var _Submission2 = _interopRequireDefault(_Submission);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Submission = function () {
  var create = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(submission) {
      var newSubmission;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              submission.created = (0, _moment2.default)().unix();
              _context.next = 3;
              return _Submission2.default.local().insert({
                data: submission
              });

            case 3:
              newSubmission = _context.sent;
              return _context.abrupt('return', newSubmission);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function create(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var update = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(submission) {
      var localSubmission, saved;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              submission = _extends({}, submission, {
                type: 'update',
                updated: (0, _moment2.default)().unix()
              });

              _context2.next = 3;
              return _Submission2.default.local().get(submission._lid || submission._id);

            case 3:
              localSubmission = _context2.sent;

              if (!shouldUpdate(localSubmission, submission)) {
                _context2.next = 11;
                break;
              }

              localSubmission.data = submission;
              localSubmission.isSubmit = submission._lid ? false : localSubmission.isSubmit;
              _context2.next = 9;
              return _Submission2.default.local().update(localSubmission);

            case 9:
              saved = _context2.sent;
              return _context2.abrupt('return', saved);

            case 11:
              return _context2.abrupt('return', localSubmission);

            case 12:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function update(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  /**
   *
   * @param {*} submitedForm
   * @param {*} formio
   */


  var add = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref3) {
      var submission = _ref3.submission,
          formio = _ref3.formio;
      var newSubmission;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              submission = formatSubmission(submission, formio);
              // If we are updating the submission

              if (!alreadyStored(submission)) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt('return', update(submission));

            case 3:
              _context3.next = 5;
              return create(submission);

            case 5:
              newSubmission = _context3.sent;
              _context3.t0 = submission.trigger;
              _context3.next = _context3.t0 === 'importSubmission' ? 9 : _context3.t0 === 'createLocalDraft' ? 9 : _context3.t0 === 'resourceCreation' ? 9 : _context3.t0 === 'createParalelSurvey' ? 11 : 17;
              break;

            case 9:
              return _context3.abrupt('return', newSubmission);

            case 11:
              newSubmission.trigger = 'createParalelSurvey';
              newSubmission.data.data.parallelSurvey = _Submission2.default.local().setParallelSurvey(_extends({}, _Submission2.default.local().getParallelSurvey(newSubmission), {
                submissionId: newSubmission._id
              }));
              _context3.next = 15;
              return _Submission2.default.local().update(newSubmission);

            case 15:
              return _context3.abrupt('return', newSubmission);

            case 17:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function add(_x3) {
      return _ref4.apply(this, arguments);
    };
  }();

  function formatSubmission(submission, formio) {
    submission = _SyncHelper2.default.deleteNulls(submission);

    submission = _extends({}, submission, {
      sync: false,
      /*eslint-disable*/
      user_email: _Auth2.default.email(),
      /* eslint-enable*/
      formio: formio
    });
    return submission;
  }

  function alreadyStored(submission) {
    return submission._lid || submission._id;
  }

  function shouldUpdate(localSubmission, submission) {
    // Cases where we want to update
    var sendingSubmission = submission.draft === false;
    var fromDraftToSubmission = localSubmission.data.draft === false && submission.draft === false;
    var autoSave = submission.trigger === 'autoSaveAsDraft' || submission.trigger === 'saveAsLocalDraft';
    var isSynced = !!(localSubmission.data.access && Array.isArray(localSubmission.data.access));
    var hasError = localSubmission.data.syncError !== false && typeof localSubmission.data.syncError !== 'undefined';

    return (sendingSubmission || fromDraftToSubmission) && !autoSave || !isSynced && autoSave && !hasError;
  }

  return Object.freeze({
    add: add
  });
}();

exports.default = Submission;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Formio = __webpack_require__(11);

var _Formio2 = _interopRequireDefault(_Formio);

var _Translation = __webpack_require__(20);

var _Translation2 = _interopRequireDefault(_Translation);

var _getRequest = __webpack_require__(148);

var _getRequest2 = _interopRequireDefault(_getRequest);

var _postRequest = __webpack_require__(149);

var _postRequest2 = _interopRequireDefault(_postRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OFFLINE_PLUGIN = function () {
  function OFFLINE_PLUGIN() {
    _classCallCheck(this, OFFLINE_PLUGIN);
  }

  _createClass(OFFLINE_PLUGIN, null, [{
    key: 'getPlugin',
    value: function getPlugin(_ref) {
      var _this = this;

      var formio = _ref.formio,
          hashField = _ref.hashField;

      var plugin = {
        priority: 0,
        request: function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(args) {
            var submission;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _Formio2.default.clearCache();

                    if (!(args.method === 'GET')) {
                      _context.next = 3;
                      break;
                    }

                    return _context.abrupt('return', _getRequest2.default.handle(args));

                  case 3:
                    if (!(args.method === 'POST' || args.method === 'PUT')) {
                      _context.next = 8;
                      break;
                    }

                    _context.next = 6;
                    return _postRequest2.default.handle({ args: args, hashField: hashField, formio: formio });

                  case 6:
                    submission = _context.sent;
                    return _context.abrupt('return', submission);

                  case 8:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this);
          }));

          function request(_x) {
            return _ref2.apply(this, arguments);
          }

          return request;
        }()
      };

      return plugin;
    }

    /**
     * Transforms the Local Lockijs submissions that
     * are dinamic, to an static array so we
     * can use it as Json input for the
     * selects
     * @param {[type]} lockiJSData [description]
     */

  }, {
    key: 'LocalToJson',
    value: function LocalToJson(lockiJSData) {
      var transformedArray = [];

      lockiJSData.forEach(function (element) {
        transformedArray.push(element.data);
      });
      return transformedArray;
    }
    // Do not removed this function is used inside the formio.vue component

  }, {
    key: 'getLocalTranslations',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var translations;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Translation2.default.local().getFormTranslations();

              case 2:
                translations = _context2.sent;
                return _context2.abrupt('return', translations);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getLocalTranslations() {
        return _ref3.apply(this, arguments);
      }

      return getLocalTranslations;
    }()
  }]);

  return OFFLINE_PLUGIN;
}();

exports.default = OFFLINE_PLUGIN;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var compose = __webpack_require__(9);
var Shortcut = __webpack_require__(60);
var isStamp = __webpack_require__(36);
var isString = __webpack_require__(61);
var isObject = __webpack_require__(15);
var isFunction = __webpack_require__(23);
var merge = __webpack_require__(38);
var assign = __webpack_require__(37);

var concat = Array.prototype.concat;
function extractFunctions() {
  var fns = concat.apply([], arguments).filter(isFunction);
  return fns.length === 0 ? undefined : fns;
}

function standardiseDescriptor(descr) {
  if (!isObject(descr)) return descr;

  var methods = descr.methods;
  var properties = descr.properties;
  var props = descr.props;
  var initializers = descr.initializers;
  var init = descr.init;
  var composers = descr.composers;
  var deepProperties = descr.deepProperties;
  var deepProps = descr.deepProps;
  var pd = descr.propertyDescriptors;
  var staticProperties = descr.staticProperties;
  var statics = descr.statics;
  var staticDeepProperties = descr.staticDeepProperties;
  var deepStatics = descr.deepStatics;
  var configuration = descr.configuration;
  var conf = descr.conf;
  var deepConfiguration = descr.deepConfiguration;
  var deepConf = descr.deepConf;

  var p = isObject(props) || isObject(properties) ?
    assign({}, props, properties) : undefined;

  var dp = isObject(deepProps) ? merge({}, deepProps) : undefined;
  dp = isObject(deepProperties) ? merge(dp, deepProperties) : dp;

  var sp = isObject(statics) || isObject(staticProperties) ?
    assign({}, statics, staticProperties) : undefined;

  var sdp = isObject(deepStatics) ? merge({}, deepStatics) : undefined;
  sdp = isObject(staticDeepProperties) ? merge(sdp, staticDeepProperties) : sdp;

  var spd = descr.staticPropertyDescriptors;
  if (isString(descr.name)) spd = assign({}, spd || {}, { name: { value: descr.name } });

  var c = isObject(conf) || isObject(configuration) ?
    assign({}, conf, configuration) : undefined;

  var dc = isObject(deepConf) ? merge({}, deepConf) : undefined;
  dc = isObject(deepConfiguration) ? merge(dc, deepConfiguration) : dc;

  var ii = extractFunctions(init, initializers);

  var cc = extractFunctions(composers);

  var descriptor = {};
  if (methods) descriptor.methods = methods;
  if (p) descriptor.properties = p;
  if (ii) descriptor.initializers = ii;
  if (cc) descriptor.composers = cc;
  if (dp) descriptor.deepProperties = dp;
  if (sp) descriptor.staticProperties = sp;
  if (sdp) descriptor.staticDeepProperties = sdp;
  if (pd) descriptor.propertyDescriptors = pd;
  if (spd) descriptor.staticPropertyDescriptors = spd;
  if (c) descriptor.configuration = c;
  if (dc) descriptor.deepConfiguration = dc;

  return descriptor;
}

function stampit() {
  'use strict'; // to make sure `this` is not pointing to `global` or `window`
  var length = arguments.length, args = [];
  for (var i = 0; i < length; i += 1) {
    var arg = arguments[i];
    args.push(isStamp(arg) ? arg : standardiseDescriptor(arg));
  }

  return compose.apply(this || baseStampit, args); // jshint ignore:line
}

var baseStampit = Shortcut.compose({
  staticProperties: {
    create: function () { return this.apply(this, arguments); },
    compose: stampit // infecting
  }
});

var shortcuts = Shortcut.compose.staticProperties;
for (var prop in shortcuts) stampit[prop] = shortcuts[prop].bind(baseStampit);
stampit.compose = stampit.bind();

module.exports = stampit;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = Array.isArray;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(23);

module.exports = function isStamp(arg) {
  return isFunction(arg) && isFunction(arg.compose);
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = Object.assign;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var isPlainObject = __webpack_require__(59);
var isObject = __webpack_require__(15);
var isArray = __webpack_require__(35);

/**
 * The 'src' argument plays the command role.
 * The returned values is always of the same type as the 'src'.
 * @param dst The object to merge into
 * @param src The object to merge from
 * @returns {*}
 */
function mergeOne(dst, src) {
  if (src === undefined) return dst;

  // According to specification arrays must be concatenated.
  // Also, the '.concat' creates a new array instance. Overrides the 'dst'.
  if (isArray(src)) return (isArray(dst) ? dst : []).concat(src);

  // Now deal with non plain 'src' object. 'src' overrides 'dst'
  // Note that functions are also assigned! We do not deep merge functions.
  if (!isPlainObject(src)) return src;

  // See if 'dst' is allowed to be mutated.
  // If not - it's overridden with a new plain object.
  var returnValue = isObject(dst) ? dst : {};

  var keys = Object.keys(src);
  for (var i = 0; i < keys.length; i += 1) {
    var key = keys[i];

    var srcValue = src[key];
    // Do not merge properties with the 'undefined' value.
    if (srcValue !== undefined) {
      var dstValue = returnValue[key];
      // Recursive calls to mergeOne() must allow only plain objects or arrays in dst
      var newDst = isPlainObject(dstValue) || isArray(srcValue) ? dstValue : {};

      // deep merge each property. Recursion!
      returnValue[key] = mergeOne(newDst, srcValue);
    }
  }

  return returnValue;
}

module.exports = function (dst) {
  for (var i = 1; i < arguments.length; i++) {
    dst = mergeOne(dst, arguments[i]);
  }
  return dst;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(67);
var bytesToUuid = __webpack_require__(68);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status === undefined ? 200 : options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(24),
    arrayMap = __webpack_require__(83),
    isArray = __webpack_require__(26),
    isSymbol = __webpack_require__(27);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(24),
    getRawTag = __webpack_require__(84),
    objectToString = __webpack_require__(85);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var baseFindIndex = __webpack_require__(90),
    baseIsNaN = __webpack_require__(91),
    strictIndexOf = __webpack_require__(92);

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(41);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(110),
    getValue = __webpack_require__(115);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 46 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Translation = __webpack_require__(20);

var _Translation2 = _interopRequireDefault(_Translation);

var _Configuration = __webpack_require__(2);

var _Configuration2 = _interopRequireDefault(_Configuration);

var _moment = __webpack_require__(1);

var _moment2 = _interopRequireDefault(_moment);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Localization = function () {
  function Localization() {
    _classCallCheck(this, Localization);
  }

  _createClass(Localization, null, [{
    key: 'getLocalizationDate',
    value: function getLocalizationDate(localTranslations) {
      return _utilities2.default.get(function () {
        return localTranslations[0].fastUpdated;
      }, 0);
    }
  }, {
    key: 'setOfflineLocales',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var appConf = _ref.appConf;
        var localTranslations, localDate, config, offlineTranslations, trans;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Translation2.default.local().find();

              case 2:
                localTranslations = _context.sent;
                localDate = Localization.getLocalizationDate(localTranslations);
                _context.next = 6;
                return _Configuration2.default.getLocal();

              case 6:
                config = _context.sent;
                offlineTranslations = appConf.offlineFiles.Translations;

                if (!(config.fastUpdated >= localDate)) {
                  _context.next = 13;
                  break;
                }

                _context.next = 11;
                return Localization.processTranslations(offlineTranslations);

              case 11:
                trans = _context.sent;
                return _context.abrupt('return', Localization.storeTranslations(trans));

              case 13:
                return _context.abrupt('return', localTranslations[0].data);

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setOfflineLocales(_x) {
        return _ref2.apply(this, arguments);
      }

      return setOfflineLocales;
    }()
  }, {
    key: 'setOnlineLocales',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
        var appConf = _ref3.appConf;
        var localTranslations, appTranslations;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Translation2.default.local().find();

              case 2:
                localTranslations = _context2.sent;
                _context2.next = 5;
                return Localization.getOnlineTranslations();

              case 5:
                appTranslations = _context2.sent;

                if (!appTranslations) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 9;
                return Localization.processTranslations(appTranslations);

              case 9:
                appTranslations = _context2.sent;
                _context2.next = 12;
                return Localization.storeTranslations(appTranslations);

              case 12:
                appTranslations = _context2.sent;
                return _context2.abrupt('return', appTranslations);

              case 14:
                if (!(localTranslations.length > 0 && localTranslations[0].data)) {
                  _context2.next = 16;
                  break;
                }

                return _context2.abrupt('return', localTranslations[0].data);

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setOnlineLocales(_x2) {
        return _ref4.apply(this, arguments);
      }

      return setOnlineLocales;
    }()
    /**
     * [authenticate description]
     * @param  {[type]} username [description]
     * @param  {[type]} password [description]
     * @return {[type]}          [description]
     */

  }, {
    key: 'set',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref5) {
        var appConf = _ref5.appConf,
            forceOnline = _ref5.forceOnline;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(appConf.offlineStart === 'true' && !forceOnline)) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return', this.setOfflineLocales({ appConf: appConf }));

              case 2:
                return _context3.abrupt('return', this.setOnlineLocales({ appConf: appConf }));

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function set(_x3) {
        return _ref6.apply(this, arguments);
      }

      return set;
    }()
  }, {
    key: 'getOnlineTranslations',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var onlineTranslations;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!navigator.onLine) {
                  _context4.next = 7;
                  break;
                }

                _context4.next = 3;
                return _Translation2.default.remote().find({ limit: 50000 });

              case 3:
                onlineTranslations = _context4.sent;

                if (!(onlineTranslations.length === 0)) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt('return', undefined);

              case 6:
                return _context4.abrupt('return', onlineTranslations);

              case 7:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getOnlineTranslations() {
        return _ref7.apply(this, arguments);
      }

      return getOnlineTranslations;
    }()
  }, {
    key: 'storeTranslations',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(translationsArray) {
        var appTranslations;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                // Remove all previous translations
                _Translation2.default.local().clear();

                // Insert the new ones
                _context5.next = 3;
                return _Translation2.default.local().insert({
                  data: translationsArray,
                  fastUpdated: (0, _moment2.default)().unix()
                });

              case 3:
                appTranslations = _context5.sent;
                return _context5.abrupt('return', appTranslations.data);

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function storeTranslations(_x4) {
        return _ref8.apply(this, arguments);
      }

      return storeTranslations;
    }()
    /**
     * [setTranslations description]
     * @param {[type]} appTranslations [description]
     */

  }, {
    key: 'processTranslations',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(translationArray) {
        var lenguages, processedTranslations;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                lenguages = _Translation2.default.local().getIsoLanguages();
                processedTranslations = {};


                processedTranslations.label = {};
                // Foreach of the locale lenguages, set the translations
                lenguages.forEach(function (language) {
                  translationArray.forEach(function (translation, index) {
                    if (translation.data && translation.data[language.code]) {
                      if (!processedTranslations[language.code]) {
                        processedTranslations[language.code] = {};
                      }
                      processedTranslations[language.code][translation.data.label] = translation.data[language.code];
                    }

                    if (translation.data && translation.data.label) {
                      processedTranslations['label'][translation.data.label] = translation.data.label;
                    }
                  });
                });

                return _context6.abrupt('return', processedTranslations);

              case 5:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function processTranslations(_x5) {
        return _ref9.apply(this, arguments);
      }

      return processTranslations;
    }()

    /**
     * [getTranslation description]
     * @return {[type]} [description]
     */

  }, {
    key: 'createTranslation',
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(label) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt('return', _Translation2.default.remote().insert({
                  data: {
                    en: label,
                    label: label
                  }
                }));

              case 1:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function createTranslation(_x6) {
        return _ref10.apply(this, arguments);
      }

      return createTranslation;
    }()
  }, {
    key: 'setTranslations',
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(translations) {
        var trans, id, result;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _Translation2.default.remote().find({
                  filter: [{ element: 'data.label', query: '=', value: translations.label }]
                });

              case 2:
                trans = _context8.sent;
                id = trans[0]._id;
                _context8.next = 6;
                return _Translation2.default.remote().update({
                  _id: id,
                  data: translations
                });

              case 6:
                result = _context8.sent;
                return _context8.abrupt('return', result);

              case 8:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function setTranslations(_x7) {
        return _ref11.apply(this, arguments);
      }

      return setTranslations;
    }()
  }]);

  return Localization;
}();

exports.default = Localization;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Model = __webpack_require__(4);

var _Model2 = _interopRequireDefault(_Model);

var _Fluent = __webpack_require__(3);

var _Fluent2 = _interopRequireDefault(_Fluent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Fluent2.default.extend(_Model2.default, {
  properties: {
    name: 'Pages',
    path: 'fast-app-pages'
  }
})();

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _User = __webpack_require__(13);

var _User2 = _interopRequireDefault(_User);

var _Auth = __webpack_require__(21);

var _Auth2 = _interopRequireDefault(_Auth);

var _Submission = __webpack_require__(14);

var _Submission2 = _interopRequireDefault(_Submission);

var _OfflineData = __webpack_require__(145);

var _OfflineData2 = _interopRequireDefault(_OfflineData);

var _Scheduler = __webpack_require__(55);

var _Scheduler2 = _interopRequireDefault(_Scheduler);

var _Event = __webpack_require__(6);

var _Event2 = _interopRequireDefault(_Event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sync = function () {
  function Sync() {
    _classCallCheck(this, Sync);
  }

  _createClass(Sync, null, [{
    key: 'now',

    /**
     *
     * @param {*} vm
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(vm) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Sync.syncUsers();

              case 2:
                if (!_Auth2.default.check()) {
                  _context.next = 5;
                  break;
                }

                _context.next = 5;
                return Sync.syncSubmission(vm);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function now(_x) {
        return _ref.apply(this, arguments);
      }

      return now;
    }()
  }, {
    key: 'check',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var unsyncSubmissions;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Submission2.default.local().getUnsync();

              case 2:
                unsyncSubmissions = _context2.sent;


                if (unsyncSubmissions.length > 0) {
                  _Event2.default.emit({ name: 'FAST:SUBMISSION:UNSYNCED', data: true, text: 'There are unsynced Submissions' });
                } else {
                  _Event2.default.emit({ name: 'FAST:SUBMISSION:UNSYNCED', data: false, text: 'There are no unsynced Submissions' });
                }

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function check() {
        return _ref2.apply(this, arguments);
      }

      return check;
    }()
    /**
     *
     * @param {*} db
     * @param {*} vm
     */

  }, {
    key: 'syncSubmission',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var usersAreSync, unsyncSubmissions, isSyncing;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return Sync.areUsersSynced();

              case 2:
                usersAreSync = _context3.sent;

                if (usersAreSync) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt('return');

              case 5:
                _context3.next = 7;
                return _Submission2.default.local().getUnsync();

              case 7:
                unsyncSubmissions = _context3.sent;
                _context3.next = 10;
                return _Scheduler2.default.isSyncing();

              case 10:
                isSyncing = _context3.sent;


                if (unsyncSubmissions.length > 0 && !isSyncing) {
                  _OfflineData2.default.send(unsyncSubmissions);
                }

              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function syncSubmission() {
        return _ref3.apply(this, arguments);
      }

      return syncSubmission;
    }()
    /**
     *
     */

  }, {
    key: 'getUsersToSync',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var filter;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _User2.default.local().find({
                  'data.sync': false
                });

              case 2:
                filter = _context4.sent;
                return _context4.abrupt('return', filter.filter(function (o) {
                  return o.data.sync === false;
                }));

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getUsersToSync() {
        return _ref4.apply(this, arguments);
      }

      return getUsersToSync;
    }()
    /**
     *
     */

  }, {
    key: 'areUsersSynced',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var users;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return Sync.getUsersToSync();

              case 2:
                users = _context5.sent;
                return _context5.abrupt('return', !!users && Array.isArray(users) && users.length === 0);

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function areUsersSynced() {
        return _ref5.apply(this, arguments);
      }

      return areUsersSynced;
    }()
    /**
     *
     * @param {*} param
     */

  }, {
    key: 'syncUsers',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var users, isSyncing;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return Sync.getUsersToSync();

              case 2:
                users = _context6.sent;


                users = users.filter(function (o) {
                  return o.data.sync === false && !o.data.queuedForSync && !o.data.syncError;
                });

                _context6.next = 6;
                return _Scheduler2.default.isSyncing();

              case 6:
                isSyncing = _context6.sent;


                if (Array.isArray(users) && users.length > 0 && !isSyncing) {
                  _OfflineData2.default.send(users);
                }

              case 8:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function syncUsers() {
        return _ref6.apply(this, arguments);
      }

      return syncUsers;
    }()
  }]);

  return Sync;
}();

exports.default = Sync;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(19);

var _config2 = _interopRequireDefault(_config);

var _User = __webpack_require__(13);

var _User2 = _interopRequireDefault(_User);

var _SyncHelper = __webpack_require__(51);

var _SyncHelper2 = _interopRequireDefault(_SyncHelper);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _axios = __webpack_require__(52);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var User = function () {
  var storeLocally = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(formIoUser) {
      var user, isUserAlreadyStored, error, _user;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _User2.default.local().findOne({
                'data.data.email': formIoUser.data.email
              });

            case 2:
              user = _context.sent;


              formIoUser = _SyncHelper2.default.deleteNulls(formIoUser);
              isUserAlreadyStored = !!user && !_utilities2.default.isEmpty(user);

              //  check if user is already present in local storage

              if (!isUserAlreadyStored) {
                _context.next = 11;
                break;
              }

              user.data = formIoUser;
              //  update the user with the updated information
              error = new Error('The user email is already taken');
              throw error;

            case 11:
              _context.next = 13;
              return _User2.default.local().insert({
                data: formIoUser
              });

            case 13:
              _user = _context.sent;
              return _context.abrupt('return', _user);

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function storeLocally(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var updateUser = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(formIoUser) {
      var user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _User2.default.local().findOne({
                'data.data.email': formIoUser.data.email
              });

            case 2:
              user = _context2.sent;


              formIoUser = _SyncHelper2.default.deleteNulls(formIoUser);

              _context2.next = 6;
              return _User2.default.local().insert({
                data: formIoUser
              });

            case 6:
              user = _context2.sent;
              return _context2.abrupt('return', user);

            case 8:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function updateUser(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var login = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref3) {
      var credentials = _ref3.credentials,
          role = _ref3.role;
      var url;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              url = _config2.default.get().baseURL;


              if (role === 'admin') {
                url = url + '/admin/login';
              } else {
                url = url + '/user/login';
              }
              return _context3.abrupt('return', _axios2.default.post(url, {
                data: {
                  email: credentials.username,
                  password: credentials.password
                }
              }));

            case 3:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function login(_x3) {
      return _ref4.apply(this, arguments);
    };
  }();

  return Object.freeze({
    storeLocally: storeLocally,
    updateUser: updateUser,
    login: login
  });
}();

exports.default = User;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SyncHelper = function () {
  function SyncHelper() {
    _classCallCheck(this, SyncHelper);
  }

  _createClass(SyncHelper, null, [{
    key: 'deleteNulls',

    /**
     * Recursively removes all NULL values
     * from an Object or an Array
     * @static
     * @param {Array|Object} object Array, Object to clean
     * @returns {Array|Object} returns the cleaned value
     * @memberof SyncHelper
     * @example
     *
     * const object = { 'a': 'b', c: null, d: {'a':'b', c:null} }
     *
     * deleteNulls(object)
     * // => {'a': 'b', d: {'a':'b'}}
     */
    value: function deleteNulls(object) {
      var obj = object;
      var isArray = obj instanceof Array;

      for (var k in obj) {
        if (obj[k] === null) isArray ? obj.splice(k, 1) : delete obj[k];else if (_typeof(obj[k]) === 'object') this.deleteNulls(obj[k]);
      }
      return obj;
    }
  }]);

  return SyncHelper;
}();

exports.default = SyncHelper;

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__52__;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Model = __webpack_require__(4);

var _Model2 = _interopRequireDefault(_Model);

var _Fluent = __webpack_require__(3);

var _Fluent2 = _interopRequireDefault(_Fluent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Fluent2.default.extend(_Model2.default, {
  properties: {
    name: 'Role',
    path: undefined
  }
})();

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var FormioUtils = _interopRequireWildcard(__webpack_require__(137));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

if ((typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object') {
  global.FormioUtils = FormioUtils;
}

var _default = FormioUtils;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)))

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FastIsSyncing = false;
var Scheduler = function () {
  function Scheduler() {
    _classCallCheck(this, Scheduler);
  }

  _createClass(Scheduler, null, [{
    key: "isSyncing",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", FastIsSyncing);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function isSyncing() {
        return _ref.apply(this, arguments);
      }

      return isSyncing;
    }()
  }, {
    key: "startSync",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                FastIsSyncing = true;
                return _context2.abrupt("return", this.isSyncing());

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function startSync() {
        return _ref2.apply(this, arguments);
      }

      return startSync;
    }()
  }, {
    key: "stopSync",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                FastIsSyncing = false;
                return _context3.abrupt("return", this.isSyncing());

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function stopSync() {
        return _ref3.apply(this, arguments);
      }

      return stopSync;
    }()
  }]);

  return Scheduler;
}();

exports.default = Scheduler;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sync = exports.Hash = exports.Role = exports.OfflinePlugin = exports.FormLabels = exports.countryList = exports.User = exports.Localization = exports.Import = exports.Translation = exports.Configuration = exports.ParallelSurvey = exports.SubmissionRepo = exports.Submission = exports.PagesRepo = exports.Pages = exports.Form = exports.Auth = exports.Connection = exports.FAST = exports.Event = exports.Moment = undefined;

var _start = __webpack_require__(57);

var _start2 = _interopRequireDefault(_start);

var _Auth = __webpack_require__(21);

var _Auth2 = _interopRequireDefault(_Auth);

var _Connection = __webpack_require__(5);

var _Connection2 = _interopRequireDefault(_Connection);

var _Event = __webpack_require__(6);

var _Event2 = _interopRequireDefault(_Event);

var _moment = __webpack_require__(146);

var _moment2 = _interopRequireDefault(_moment);

var _Form = __webpack_require__(12);

var _Form2 = _interopRequireDefault(_Form);

var _Pages = __webpack_require__(48);

var _Pages2 = _interopRequireDefault(_Pages);

var _Pages3 = __webpack_require__(29);

var _Pages4 = _interopRequireDefault(_Pages3);

var _Submission = __webpack_require__(14);

var _Submission2 = _interopRequireDefault(_Submission);

var _SubmissionRepository = __webpack_require__(32);

var _SubmissionRepository2 = _interopRequireDefault(_SubmissionRepository);

var _ParallelSurvey = __webpack_require__(147);

var _ParallelSurvey2 = _interopRequireDefault(_ParallelSurvey);

var _Configuration = __webpack_require__(2);

var _Configuration2 = _interopRequireDefault(_Configuration);

var _Translation = __webpack_require__(20);

var _Translation2 = _interopRequireDefault(_Translation);

var _Import = __webpack_require__(151);

var _Import2 = _interopRequireDefault(_Import);

var _Localization = __webpack_require__(47);

var _Localization2 = _interopRequireDefault(_Localization);

var _User = __webpack_require__(13);

var _User2 = _interopRequireDefault(_User);

var _countries = __webpack_require__(152);

var _countries2 = _interopRequireDefault(_countries);

var _Labels = __webpack_require__(153);

var _Labels2 = _interopRequireDefault(_Labels);

var _offlinePlugin = __webpack_require__(33);

var _offlinePlugin2 = _interopRequireDefault(_offlinePlugin);

var _Role = __webpack_require__(31);

var _Role2 = _interopRequireDefault(_Role);

var _Hash = __webpack_require__(154);

var _Hash2 = _interopRequireDefault(_Hash);

var _Sync = __webpack_require__(49);

var _Sync2 = _interopRequireDefault(_Sync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Moment = _moment2.default;
exports.Event = _Event2.default;
exports.FAST = _start2.default;
exports.Connection = _Connection2.default;
exports.Auth = _Auth2.default;
exports.Form = _Form2.default;
exports.Pages = _Pages2.default;
exports.PagesRepo = _Pages4.default;
exports.Submission = _Submission2.default;
exports.SubmissionRepo = _SubmissionRepository2.default;
exports.ParallelSurvey = _ParallelSurvey2.default;
exports.Configuration = _Configuration2.default;
exports.Translation = _Translation2.default;
exports.Import = _Import2.default;
exports.Localization = _Localization2.default;
exports.User = _User2.default;
exports.countryList = _countries2.default;
exports.FormLabels = _Labels2.default;
exports.OfflinePlugin = _offlinePlugin2.default;
exports.Role = _Role2.default;
exports.Hash = _Hash2.default;
exports.Sync = _Sync2.default;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Configuration = __webpack_require__(2);

var _Configuration2 = _interopRequireDefault(_Configuration);

var _RemoteForms = __webpack_require__(134);

var _RemoteForms2 = _interopRequireDefault(_RemoteForms);

var _Localization = __webpack_require__(47);

var _Localization2 = _interopRequireDefault(_Localization);

var _Pages = __webpack_require__(29);

var _Pages2 = _interopRequireDefault(_Pages);

var _SyncInterval = __webpack_require__(136);

var _SyncInterval2 = _interopRequireDefault(_SyncInterval);

var _config = __webpack_require__(19);

var _config2 = _interopRequireDefault(_config);

var _Role = __webpack_require__(31);

var _Role2 = _interopRequireDefault(_Role);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable no-unused-vars */
var FAST = function () {
  /**
   *
   * Triggers a full Online update of all Configuration,
   * Forms, Pages and Roles of the application.
   *
   * @param {Object} conf
   * @param {Object} conf.appConf Configuration of the App
   * @returns
   */
  var sync = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
      var appConf = _ref.appConf;
      var forceOnline, config, appTranslations;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              forceOnline = true;
              // Pull the configuration

              _context.next = 3;
              return _Configuration2.default.set({ appConf: appConf, forceOnline: forceOnline });

            case 3:
              config = _context.sent;


              // Change the Base URL for all the other calls
              _config2.default.setBaseUrl(config.APP_URL);

              _context.next = 7;
              return _Role2.default.set({ url: config.APP_URL, appConf: appConf, forceOnline: forceOnline });

            case 7:
              _context.next = 9;
              return _Pages2.default.set({ appConf: appConf, forceOnline: forceOnline });

            case 9:
              _context.next = 11;
              return _RemoteForms2.default.set({ appConf: appConf, forceOnline: forceOnline });

            case 11:
              _context.next = 13;
              return _Localization2.default.set({ appConf: appConf, forceOnline: forceOnline });

            case 13:
              appTranslations = _context.sent;
              return _context.abrupt('return', {
                translations: appTranslations,
                defaultLenguage: localStorage.getItem('defaultLenguage') || 'en',
                config: config
              });

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function sync(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  /**
   *
   * @param {*} conf
   * @param {*} conf.appConf Configuration of the App
   * @param {*} conf.Vue Vue instance
   */


  var start = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
      var Vue = _ref3.Vue,
          appConf = _ref3.appConf;
      var pages, err, config, appTranslations;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              pages = void 0, err = void 0;


              _config2.default.set({
                baseURL: appConf.appConfigUrl,
                submissionId: appConf.appConfigId,
                i18n: appConf.i18n
              });

              _SyncInterval2.default.set(3000);

              // Pull the configuration
              _context2.next = 5;
              return _Configuration2.default.set({ Vue: Vue, appConf: appConf });

            case 5:
              config = _context2.sent;


              // Change the Base URL for all the other calls
              _config2.default.setBaseUrl(config.APP_URL);

              _context2.next = 9;
              return _Role2.default.set({ url: config.APP_URL, appConf: appConf });

            case 9:
              _context2.next = 11;
              return _Pages2.default.set({ appConf: appConf });

            case 11:
              _context2.next = 13;
              return _RemoteForms2.default.set({ appConf: appConf });

            case 13:
              _context2.next = 15;
              return _Localization2.default.set({ appConf: appConf });

            case 15:
              appTranslations = _context2.sent;
              return _context2.abrupt('return', {
                config: config,
                translations: appTranslations,
                defaultLanguage: localStorage.getItem('defaultLenguage') || 'en'
              });

            case 17:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function start(_x2) {
      return _ref4.apply(this, arguments);
    };
  }();

  return Object.freeze({
    start: start,
    sync: sync
  });
}();

exports.default = FAST;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// More proper implementation would be
// isDescriptor(obj) || isStamp(obj)
// but there is no sense since stamp is function and function is object.
module.exports = __webpack_require__(15);


/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' &&
    Object.getPrototypeOf(value) === Object.prototype;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var compose = __webpack_require__(9);

function createShortcut(propName) {
  return function (arg) {
    'use strict';
    var param = {};
    param[propName] = arg;
    return this && this.compose ? this.compose(param) : compose(param);
  };
}

var properties = createShortcut('properties');
var staticProperties = createShortcut('staticProperties');
var configuration = createShortcut('configuration');
var deepProperties = createShortcut('deepProperties');
var staticDeepProperties = createShortcut('staticDeepProperties');
var deepConfiguration = createShortcut('deepConfiguration');
var initializers = createShortcut('initializers');

module.exports = compose({
  staticProperties: {
    methods: createShortcut('methods'),

    props: properties,
    properties: properties,

    statics: staticProperties,
    staticProperties: staticProperties,

    conf: configuration,
    configuration: configuration,

    deepProps: deepProperties,
    deepProperties: deepProperties,

    deepStatics: staticDeepProperties,
    staticDeepProperties: staticDeepProperties,

    deepConf: deepConfiguration,
    deepConfiguration: deepConfiguration,

    init: initializers,
    initializers: initializers,

    composers: createShortcut('composers'),

    propertyDescriptors: createShortcut('propertyDescriptors'),

    staticPropertyDescriptors: createShortcut('staticPropertyDescriptors')
  }
});


/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = function isString(arg) {
  return typeof arg === 'string';
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var compose = __webpack_require__(9);
var privates = new WeakMap(); // WeakMap works in IE11, node 0.12

var makeProxyFunction = function (fn, name) {
  function proxiedFn() {
    'use strict';
    var fields = privates.get(this); // jshint ignore:line
    return fn.apply(fields, arguments);
  }

  Object.defineProperty(proxiedFn, 'name', {
    value: name,
    configurable: true
  });

  return proxiedFn;
};

function initializer(_, opts) {
  var descriptor = opts.stamp.compose;
  var privateMethodNames = descriptor.deepConfiguration.Privatize.methods;

  var newObject = {}; // our proxy object
  privates.set(newObject, this);

  var methods = descriptor.methods;
  if (!methods) {
    return newObject;
  }

  var methodNames = Object.keys(methods);
  for (var i = 0; i < methodNames.length; i++) {
    var name = methodNames[i];
    if (privateMethodNames.indexOf(name) < 0) { // not private, thus wrap
      newObject[name] = makeProxyFunction(methods[name], name);
    }
  }

  // Integration with @stamp/instanceof
  if (typeof Symbol !== "undefined") {
    var stampSymbol = Symbol.for('stamp');
    if (methods[stampSymbol]) {
      newObject[stampSymbol] = opts.stamp;
    }
  }

  return newObject;
}

var Privatize = compose({
  initializers: [initializer],
  deepConfiguration: {Privatize: {methods: []}},
  staticProperties: {
    privatizeMethods: function () {
      'use strict';
      var methodNames = [];
      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (typeof arg === 'string' && arg.length > 0) {
          methodNames.push(arg);
        }
      }
      var Stamp = this && this.compose ? this : Privatize;
      return Stamp.compose({
        deepConfiguration: {
          Privatize: {
            methods: methodNames
          }
        }
      });
    }
  },
  composers: [function (opts) {
    var initializers = opts.stamp.compose.initializers;
    // Keep our initializer the last to return proxy object
    initializers.splice(initializers.indexOf(initializer), 1);
    initializers.push(initializer);
  }]
});

module.exports = Privatize;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Database = __webpack_require__(64);

var _Database2 = _interopRequireDefault(_Database);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _v = __webpack_require__(39);

var _v2 = _interopRequireDefault(_v);

var _Interface = __webpack_require__(69);

var _Interface2 = _interopRequireDefault(_Interface);

var _compose = __webpack_require__(9);

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _compose2.default)(_Interface2.default, {
  methods: {
    /**
     *
     */
    get: function get() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var filterObject, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                filterObject = _this.prepareFilter();
                _context.next = 3;
                return _this.getModel();

              case 3:
                _context.t0 = filterObject;
                _context.t1 = _this.offsetNumber;
                _context.t2 = _this.limitNumber;
                _context.next = 8;
                return _context.sent.chain().find(_context.t0).offset(_context.t1).limit(_context.t2).data();

              case 8:
                data = _context.sent;


                data = _this.applySelect(data);
                data = _this.applyOrderBy(data);

                return _context.abrupt('return', data);

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },

    /**
     *
     * @param {*} attributePath
     */
    pluck: function pluck(attributePath) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this2.get();

              case 2:
                data = _context2.sent;


                data = data.map(function (e) {
                  return e[attributePath];
                });
                return _context2.abrupt('return', data);

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },

    /**
     *
     * @param {*} args
     */
    orderBy: function orderBy() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.orderByArray = args;
      return this;
    },

    /**
     *
     * @param {*} data
     */
    applyOrderBy: function applyOrderBy(data) {
      var _data = [].concat(_toConsumableArray(data));

      if (this.orderByArray.length === 0) {
        return _data;
      }
      var field = this.orderByArray[0];

      if (this.selectArray.length > 0 && (field.includes('.') || field.includes('['))) {
        throw new Error('Cannot orderBy nested attribute "' + field + '" when using Select. You must rename the attribute');
      }

      var order = this.orderByArray[1];
      var type = this.orderByArray[2];

      if (!type) {
        type = 'string';
      }

      _data = _data.sort(function (a, b) {
        var A = _utilities2.default.getFromPath(a, field, undefined).value;
        var B = _utilities2.default.getFromPath(b, field, undefined).value;

        if (!A || !B) {
          throw new Error('Cannot order by property "' + field + ' " not all values have this property');
        }
        // For default order and numbers
        if (type.includes('string') || type.includes('number')) {
          if (order === 'asc') {
            return A > B ? 1 : A < B ? -1 : 0;
          }
          return A > B ? -1 : A < B ? 1 : 0;
        } else if (type.includes('date')) {
          if (order === 'asc') {
            return new Date(A) - new Date(B);
          }
          return new Date(B) - new Date(A);
        }
      });
      return _data;
    },

    /**
     *
     * @param {*} limit
     */
    limit: function limit(_limit) {
      this.limitNumber = _limit;
      return this;
    },

    /**
     *
     * @param {*} offset
     */
    offset: function offset(_offset) {
      this.offsetNumber = _offset;
      return this;
    },

    /**
     *
     * @param {*} args
     */
    where: function where() {
      var _this3 = this;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      args = Array.isArray(args[0]) ? args : [args];
      args.forEach(function (arg) {
        if (arg.length !== 3) {
          throw new Error('There where clouse is not properly formatted, expecting: ["attribute", "operator","value"] but got "' + JSON.stringify(arg) + '" ');
        }
        _this3.whereArray.push(arg);
      });
      return this;
    },

    /**
     *
     * @param {*} args
     */
    andWhere: function andWhere() {
      return this.where.apply(this, arguments);
    },

    /**
     *
     * @param {*} args
     */
    orWhere: function orWhere() {
      var _this4 = this;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      args = Array.isArray(args[0]) ? args : [args];
      args.forEach(function (arg) {
        if (arg.length !== 3) {
          throw new Error('There orWhere clouse is not properly formatted, expecting: ["attribute", "operator","value"] but got "' + JSON.stringify(arg) + '" ');
        }
        _this4.orWhereArray.push(arg);
      });
      return this;
    },

    /**
     *
     */
    prepareFilter: function prepareFilter() {
      var _this5 = this;

      var andObject = { $and: [] };
      var orObject = { $or: [] };
      var globalFilter = {};

      // All first Level AND conditions
      if (this.whereArray.length > 0) {
        this.whereArray.forEach(function (c) {
          var conditionToObject = {};

          conditionToObject[c[0]] = {};
          var lokiOperator = _this5.getLokiOperator(c[1]);

          conditionToObject[c[0]][lokiOperator] = c[2];
          if (lokiOperator.includes('$regex|')) {
            delete conditionToObject[c[0]][lokiOperator];
            conditionToObject[c[0]]['$regex'] = lokiOperator.replace('$regex|', '').replace('{{$var}}', c[2]);
          }

          andObject['$and'].push(conditionToObject);
        });
        globalFilter = andObject;
      }
      // All second level OR conditions
      if (this.orWhereArray.length > 0) {
        this.orWhereArray.forEach(function (c) {
          var conditionToObject = {};

          conditionToObject[c[0]] = {};
          var lokiOperator = _this5.getLokiOperator(c[1]);

          conditionToObject[c[0]][lokiOperator] = c[2];
          if (lokiOperator.includes('$regex|')) {
            delete conditionToObject[c[0]][lokiOperator];
            conditionToObject[c[0]]['$regex'] = lokiOperator.replace('$regex|', '').replace('{{$var}}', c[2]);
          }

          orObject['$or'].push(conditionToObject);
        });

        globalFilter = { $or: [andObject, orObject] };
      }

      // TODO we should include global level and() or()
      // operators to give room for more complex queries

      return globalFilter;
    },

    /**
     *
     * @param {*} operator
     */
    getLokiOperator: function getLokiOperator(operator) {
      if (!this.operators.includes(operator)) {
        throw new Error('The "' + operator + '" operator is not supported');
      }

      var lokiOperators = {
        '=': '$eq',
        '<': '$lt',
        '>': '$gt',
        '<=': '$lte',
        '>=': '$gte',
        '<>': '$ne',
        '!=': '$ne',
        like: '$aeq',
        regexp: '$regex',
        startsWith: '$regex|^{{$var}}',
        endsWith: '$regex|{{$var}}$',
        contains: '$regex|{{$var}}'
      };
      var converted = _utilities2.default.get(function () {
        return lokiOperators[operator];
      }, undefined);

      if (!converted) {
        throw new Error('The operator "' + operator + '" is not supported in Loki ');
      }
      return converted;
    },

    /**
     *
     * @param {Object} db The name of the model to fetch
     * @param {String} db.model The name of the model to fetch
     * @returns {Promise} The DB model
     */
    getModel: function getModel() {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var DB;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _Database2.default.get();

              case 2:
                DB = _context3.sent;
                return _context3.abrupt('return', DB.getCollection(_this6.name));

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this6);
      }))();
    },

    /**
     * Maps the given Data to show only those fields
     * explicitly detailed on the Select function
     * @param {Array} data Data from the Local DB
     * @returns {Array} Formatted data with the selected columns
     */
    applySelect: function applySelect(data) {
      var _this7 = this;

      var _data = [].concat(_toConsumableArray(data));

      if (this.selectArray.length > 0) {
        _data = _data.map(function (element) {
          var newElement = {};

          _this7.selectArray.forEach(function (attribute) {
            var extract = _utilities2.default.getFromPath(element, attribute, undefined);

            if (extract.value) {
              newElement[extract.label] = extract.value;
            }
          });
          return newElement;
        });
      }

      return _data;
    },

    /**
     *
     */
    all: function all() {
      var _this8 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var model;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this8.getModel();

              case 2:
                model = _context4.sent;
                return _context4.abrupt('return', model.find());

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this8);
      }))();
    },

    /**
     *
     * @param {*} columns
     */
    select: function select() {
      for (var _len4 = arguments.length, columns = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        columns[_key4] = arguments[_key4];
      }

      columns = this.prepareInput(columns);

      this.selectArray = this.selectArray.concat(columns).filter(function (elem, pos, arr) {
        return arr.indexOf(elem) === pos;
      });

      return this;
    },

    /**
     *
     * @param {*} param0
     */
    find: function find() {
      var _this9 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$filter = _ref.filter,
            filter = _ref$filter === undefined ? undefined : _ref$filter,
            _ref$limit = _ref.limit,
            limit = _ref$limit === undefined ? 30 : _ref$limit,
            _ref$select = _ref.select,
            select = _ref$select === undefined ? undefined : _ref$select,
            _ref$pagination = _ref.pagination,
            pagination = _ref$pagination === undefined ? undefined : _ref$pagination,
            _ref$form = _ref.form,
            form = _ref$form === undefined ? undefined : _ref$form;

        var model, owner;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _this9.getModel();

              case 2:
                model = _context5.sent;


                if (filter && Array.isArray(filter)) {
                  owner = filter.find(function (e) {
                    return e.element === 'owner' && e.type === 'local';
                  });


                  if (owner) {
                    filter = { 'data.user_email': owner.value };
                  }

                  if (form) {
                    filter = _extends({}, filter, { 'data.formio.formId': form });
                  }
                }

                return _context5.abrupt('return', model.find(filter));

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this9);
      }))();
    },

    /**
     * [findOne description]
     * @param  {[type]} filter [description]
     * @return {[type]}        [description]
     */
    first: function first() {
      var _this10 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var data;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _this10.get();

              case 2:
                data = _context6.sent;
                return _context6.abrupt('return', _utilities2.default.get(function () {
                  return data[0];
                }, []));

              case 4:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, _this10);
      }))();
    },

    /**
     * [remove description]
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    remove: function remove(_ref2) {
      var _this11 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var document = _ref2.document;
        var model;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _this11.getModel();

              case 2:
                model = _context7.sent;
                return _context7.abrupt('return', model.remove(document));

              case 4:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, _this11);
      }))();
    },

    /**
     * [insert description]
     * @param  {[type]} element [description]
     * @return {[type]}         [description]
     */
    insert: function insert(_ref3) {
      var _this12 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var element = _ref3.element;
        var model;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                element = _utilities2.default.cloneDeep(element);

                _context8.next = 3;
                return _this12.getModel();

              case 3:
                model = _context8.sent;


                element._id = (0, _v2.default)() + '_local';

                return _context8.abrupt('return', model.insert(element));

              case 6:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, _this12);
      }))();
    },

    /**
     * [update description]
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    update: function update(_ref4) {
      var _this13 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var document = _ref4.document;
        var model;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return _this13.getModel();

              case 2:
                model = _context9.sent;
                return _context9.abrupt('return', model.update(document));

              case 4:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, _this13);
      }))();
    },

    /**
     *
     * @param {*} param0
     */
    updateOrCreate: function updateOrCreate(_ref5) {
      var _this14 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var document = _ref5.document;
        var model, role;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return _this14.getModel();

              case 2:
                model = _context10.sent;
                _context10.next = 5;
                return model.findOne(document);

              case 5:
                role = _context10.sent;


                if (!role) {
                  model.insert(document);
                }

              case 7:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, _this14);
      }))();
    },

    /**
     *
     * @param {*} param0
     */
    findAndRemove: function findAndRemove(_ref6) {
      var _this15 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var filter = _ref6.filter;
        var model;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return _this15.getModel();

              case 2:
                model = _context11.sent;
                return _context11.abrupt('return', model.findAndRemove(filter));

              case 4:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, _this15);
      }))();
    },

    /**
     *
     * @param {*} param0
     */
    clear: function clear() {
      var _this16 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var model;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return _this16.getModel();

              case 2:
                model = _context12.sent;
                return _context12.abrupt('return', model.clear({ removeIndices: true }));

              case 4:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, _this16);
      }))();
    }
  }
});

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bluebird = __webpack_require__(10);

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lokijs = __webpack_require__(65);

var _lokijs2 = _interopRequireDefault(_lokijs);

var _lokiIndexedAdapter = __webpack_require__(66);

var _lokiIndexedAdapter2 = _interopRequireDefault(_lokiIndexedAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Database = function () {
  var DB = null;

  /*
  |--------------------------------------------------------------------------
  | LockiDB Config
  |--------------------------------------------------------------------------
  | Configuration for the Local DB creation.
  |
  */

  /**
   *
   *
   * @param {Object} configuration- The configuration for the DB
   * @param {string} configuration.env - Environment i.e 'production'
   * @returns
   */
  var _create = function _create(_ref) {
    var env = _ref.env;

    return new _bluebird2.default(function (resolve) {
      var idbAdapter = void 0;
      var pa = void 0;
      var db = void 0;

      var dbConfig = {
        autosave: true,
        autosaveInterval: 1000,
        autoload: true,
        /* eslint-disable no-use-before-define */
        autoloadCallback: databaseInitialize
      };

      try {
        idbAdapter = new _lokiIndexedAdapter2.default('FAST');
        pa = new _lokijs2.default.LokiPartitioningAdapter(idbAdapter, {
          paging: true
        });

        db = new _lokijs2.default('FAST', _extends({}, dbConfig, { adapter: pa }));
      } catch (error) {
        db = new _lokijs2.default('FAST', dbConfig);
      }

      function databaseInitialize() {
        var baseModels = ['Submission', 'Form', 'Translation', 'User', 'Role', 'Configuration', 'Pages'];

        baseModels.forEach(function (model) {
          var dbModel = db.getCollection(model);

          if (!dbModel) {
            db.addCollection(model);
          }
        });
        resolve(db);
      }
    });
  };

  /**
   *
   *
   * @export
   * @param {Object} configuration- The configuration for the DB
   * @param {string} configuration.env - Environment i.e 'production'
   * @returns
   */
  var get = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$env = _ref3.env,
          env = _ref3$env === undefined ? 'prod' : _ref3$env;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (DB) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return _create({ env: env });

            case 3:
              DB = _context.sent;

            case 4:
              return _context.abrupt('return', DB);

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function get() {
      return _ref2.apply(this, arguments);
    };
  }();

  return Object.freeze({
    get: get
  });
}();

exports.default = Database;

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__65__;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
  Loki IndexedDb Adapter (need to include this script to use it)

  Console Usage can be used for management/diagnostic, here are a few examples :
  adapter.getDatabaseList(); // with no callback passed, this method will log results to console
  adapter.saveDatabase('UserDatabase', JSON.stringify(myDb));
  adapter.loadDatabase('UserDatabase'); // will log the serialized db to console
  adapter.deleteDatabase('UserDatabase');
*/

(function (root, factory) {
    if (true) {
        // AMD
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function () {
  return (function() {

    /**
     * Loki persistence adapter class for indexedDb.
     *     This class fulfills abstract adapter interface which can be applied to other storage methods. 
     *     Utilizes the included LokiCatalog app/key/value database for actual database persistence.
     *     Indexeddb is highly async, but this adapter has been made 'console-friendly' as well.
     *     Anywhere a callback is omitted, it should return results (if applicable) to console.
     *     IndexedDb storage is provided per-domain, so we implement app/key/value database to 
     *     allow separate contexts for separate apps within a domain.
     *
     * @example
     * var idbAdapter = new LokiIndexedAdapter('finance');
     *
     * @constructor LokiIndexedAdapter
     *
     * @param {string} appname - (Optional) Application name context can be used to distinguish subdomains, 'loki' by default
     */
    function LokiIndexedAdapter(appname)
    {
      this.app = 'loki';

      if (typeof (appname) !== 'undefined')
      {
        this.app = appname;
      }

      // keep reference to catalog class for base AKV operations
      this.catalog = null;

      if (!this.checkAvailability()) {
        throw new Error('indexedDB does not seem to be supported for your environment');
      }
    }

    /**
     * Used to check if adapter is available
     *
     * @returns {boolean} true if indexeddb is available, false if not.
     * @memberof LokiIndexedAdapter
     */
    LokiIndexedAdapter.prototype.checkAvailability = function()
    {
      if (typeof indexedDB !== 'undefined' && indexedDB) return true;

      return false;
    };

    /**
     * Retrieves a serialized db string from the catalog.
     *
     * @example
     * // LOAD
     * var idbAdapter = new LokiIndexedAdapter('finance');
     * var db = new loki('test', { adapter: idbAdapter });
     *   db.loadDatabase(function(result) {
     *   console.log('done');
     * });
     *
     * @param {string} dbname - the name of the database to retrieve.
     * @param {function} callback - callback should accept string param containing serialized db string.
     * @memberof LokiIndexedAdapter
     */
    LokiIndexedAdapter.prototype.loadDatabase = function(dbname, callback)
    {
      var appName = this.app;
      var adapter = this;

      // lazy open/create db reference so dont -need- callback in constructor
      if (this.catalog === null || this.catalog.db === null) {
        this.catalog = new LokiCatalog(function(cat) {
          adapter.catalog = cat;

          adapter.loadDatabase(dbname, callback);
        });

        return;
      }

      // lookup up db string in AKV db
      this.catalog.getAppKey(appName, dbname, function(result) {
        if (typeof (callback) === 'function') {
          if (result.id === 0) {
            callback(null);
            return;
          }
          callback(result.val);
        }
        else {
          // support console use of api
          console.log(result.val);
        }
      });
    };

    // alias
    LokiIndexedAdapter.prototype.loadKey = LokiIndexedAdapter.prototype.loadDatabase;

    /**
     * Saves a serialized db to the catalog.
     *
     * @example
     * // SAVE : will save App/Key/Val as 'finance'/'test'/{serializedDb}
     * var idbAdapter = new LokiIndexedAdapter('finance');
     * var db = new loki('test', { adapter: idbAdapter });
     * var coll = db.addCollection('testColl');
     * coll.insert({test: 'val'});
     * db.saveDatabase();  // could pass callback if needed for async complete
     *
     * @param {string} dbname - the name to give the serialized database within the catalog.
     * @param {string} dbstring - the serialized db string to save.
     * @param {function} callback - (Optional) callback passed obj.success with true or false
     * @memberof LokiIndexedAdapter
     */
    LokiIndexedAdapter.prototype.saveDatabase = function(dbname, dbstring, callback)
    {
      var appName = this.app;
      var adapter = this;

      function saveCallback(result) {
        if (result && result.success === true) {
          callback(null);
        }
        else {
          callback(new Error("Error saving database"));
        }
      }

      // lazy open/create db reference so dont -need- callback in constructor
      if (this.catalog === null || this.catalog.db === null) {
        this.catalog = new LokiCatalog(function(cat) {
          adapter.catalog = cat;

          // now that catalog has been initialized, set (add/update) the AKV entry
          cat.setAppKey(appName, dbname, dbstring, saveCallback);
        });

        return;
      }

      // set (add/update) entry to AKV database
      this.catalog.setAppKey(appName, dbname, dbstring, saveCallback);
    };

    // alias
    LokiIndexedAdapter.prototype.saveKey = LokiIndexedAdapter.prototype.saveDatabase;

    /**
     * Deletes a serialized db from the catalog.
     *
     * @example
     * // DELETE DATABASE
     * // delete 'finance'/'test' value from catalog
     * idbAdapter.deleteDatabase('test', function {
     *   // database deleted
     * });
     *
     * @param {string} dbname - the name of the database to delete from the catalog.
     * @param {function=} callback - (Optional) executed on database delete
     * @memberof LokiIndexedAdapter
     */
    LokiIndexedAdapter.prototype.deleteDatabase = function(dbname, callback)
    {
      var appName = this.app;
      var adapter = this;

      // lazy open/create db reference and pass callback ahead
      if (this.catalog === null || this.catalog.db === null) {
        this.catalog = new LokiCatalog(function(cat) {
          adapter.catalog = cat;

          adapter.deleteDatabase(dbname, callback);
        });

        return;
      }

      // catalog was already initialized, so just lookup object and delete by id
      this.catalog.getAppKey(appName, dbname, function(result) {
        var id = result.id;

        if (id !== 0) {
          adapter.catalog.deleteAppKey(id, callback);
        } else if (typeof (callback) === 'function') {
          callback({ success: true });
        }
      });
    };

    // alias
    LokiIndexedAdapter.prototype.deleteKey = LokiIndexedAdapter.prototype.deleteDatabase;

    /**
     * Removes all database partitions and pages with the base filename passed in.
     * This utility method does not (yet) guarantee async deletions will be completed before returning
     *
     * @param {string} dbname - the base filename which container, partitions, or pages are derived
     * @memberof LokiIndexedAdapter
     */
    LokiIndexedAdapter.prototype.deleteDatabasePartitions = function(dbname) {
      var self=this;
      this.getDatabaseList(function(result) {
        result.forEach(function(str) {
          if (str.startsWith(dbname)) {
            self.deleteDatabase(str);
          }
        });
      });
    };

    /**
     * Retrieves object array of catalog entries for current app.
     *
     * @example
     * idbAdapter.getDatabaseList(function(result) {
     *   // result is array of string names for that appcontext ('finance')
     *   result.forEach(function(str) {
     *     console.log(str);
     *   });
     * });
     *
     * @param {function} callback - should accept array of database names in the catalog for current app.
     * @memberof LokiIndexedAdapter
     */
    LokiIndexedAdapter.prototype.getDatabaseList = function(callback)
    {
      var appName = this.app;
      var adapter = this;

      // lazy open/create db reference so dont -need- callback in constructor
      if (this.catalog === null || this.catalog.db === null) {
        this.catalog = new LokiCatalog(function(cat) {
          adapter.catalog = cat;

          adapter.getDatabaseList(callback);
        });

        return;
      }

      // catalog already initialized
      // get all keys for current appName, and transpose results so just string array
      this.catalog.getAppKeys(appName, function(results) {
        var names = [];

        for(var idx = 0; idx < results.length; idx++) {
          names.push(results[idx].key);
        }

        if (typeof (callback) === 'function') {
          callback(names);
        }
        else {
          names.forEach(function(obj) {
            console.log(obj);
          });
        }
      });
    };

    // alias
    LokiIndexedAdapter.prototype.getKeyList = LokiIndexedAdapter.prototype.getDatabaseList;

    /**
     * Allows retrieval of list of all keys in catalog along with size
     *
     * @param {function} callback - (Optional) callback to accept result array.
     * @memberof LokiIndexedAdapter
     */
    LokiIndexedAdapter.prototype.getCatalogSummary = function(callback)
    {
      var appName = this.app;
      var adapter = this;

      // lazy open/create db reference
      if (this.catalog === null || this.catalog.db === null) {
        this.catalog = new LokiCatalog(function(cat) {
          adapter.catalog = cat;

          adapter.getCatalogSummary(callback);
        });

        return;
      }

      // catalog already initialized
      // get all keys for current appName, and transpose results so just string array
      this.catalog.getAllKeys(function(results) {
        var entries = [];
        var obj,
          size,
          oapp,
          okey,
          oval;

        for(var idx = 0; idx < results.length; idx++) {
          obj = results[idx];
          oapp = obj.app || '';
          okey = obj.key || '';
          oval = obj.val || '';

          // app and key are composited into an appkey column so we will mult by 2
          size = oapp.length * 2 + okey.length * 2 + oval.length + 1;

          entries.push({ "app": obj.app, "key": obj.key, "size": size });
        }

        if (typeof (callback) === 'function') {
          callback(entries);
        }
        else {
          entries.forEach(function(obj) {
            console.log(obj);
          });
        }
      });
    };

    /**
     * LokiCatalog - underlying App/Key/Value catalog persistence
     *    This non-interface class implements the actual persistence.
     *    Used by the IndexedAdapter class.
     */
    function LokiCatalog(callback)
    {
      this.db = null;
      this.initializeLokiCatalog(callback);
    }

    LokiCatalog.prototype.initializeLokiCatalog = function(callback) {
      var openRequest = indexedDB.open('LokiCatalog', 1);
      var cat = this;

      // If database doesn't exist yet or its version is lower than our version specified above (2nd param in line above)
      openRequest.onupgradeneeded = function(e) {
        var thisDB = e.target.result;
        if (thisDB.objectStoreNames.contains('LokiAKV')) {
          thisDB.deleteObjectStore('LokiAKV');
        }

        if(!thisDB.objectStoreNames.contains('LokiAKV')) {
          var objectStore = thisDB.createObjectStore('LokiAKV', { keyPath: 'id', autoIncrement:true });
          objectStore.createIndex('app', 'app', {unique:false});
          objectStore.createIndex('key', 'key', {unique:false});
          // hack to simulate composite key since overhead is low (main size should be in val field)
          // user (me) required to duplicate the app and key into comma delimited appkey field off object
          // This will allow retrieving single record with that composite key as well as
          // still supporting opening cursors on app or key alone
          objectStore.createIndex('appkey', 'appkey', {unique:true});
        }
      };

      openRequest.onsuccess = function(e) {
        cat.db = e.target.result;

        if (typeof (callback) === 'function') callback(cat);
      };

      openRequest.onerror = function(e) {
        throw e;
      };
    };

    LokiCatalog.prototype.getAppKey = function(app, key, callback) {
      var transaction = this.db.transaction(['LokiAKV'], 'readonly');
      var store = transaction.objectStore('LokiAKV');
      var index = store.index('appkey');
      var appkey = app + "," + key;
      var request = index.get(appkey);

      request.onsuccess = (function(usercallback) {
        return function(e) {
          var lres = e.target.result;

          if (lres === null || typeof(lres) === 'undefined') {
            lres = {
              id: 0,
              success: false
            };
          }

          if (typeof(usercallback) === 'function') {
            usercallback(lres);
          }
          else {
            console.log(lres);
          }
        };
      })(callback);

      request.onerror = (function(usercallback) {
        return function(e) {
          if (typeof(usercallback) === 'function') {
            usercallback({ id: 0, success: false });
          }
          else {
            throw e;
          }
        };
      })(callback);
    };

    LokiCatalog.prototype.getAppKeyById = function (id, callback, data) {
      var transaction = this.db.transaction(['LokiAKV'], 'readonly');
      var store = transaction.objectStore('LokiAKV');
      var request = store.get(id);

      request.onsuccess = (function(data, usercallback){
        return function(e) {
          if (typeof(usercallback) === 'function') {
            usercallback(e.target.result, data);
          }
          else {
            console.log(e.target.result);
          }
        };
      })(data, callback);
    };

    LokiCatalog.prototype.setAppKey = function (app, key, val, callback) {
      var transaction = this.db.transaction(['LokiAKV'], 'readwrite');
      var store = transaction.objectStore('LokiAKV');
      var index = store.index('appkey');
      var appkey = app + "," + key;
      var request = index.get(appkey);

      // first try to retrieve an existing object by that key
      // need to do this because to update an object you need to have id in object, otherwise it will append id with new autocounter and clash the unique index appkey
      request.onsuccess = function(e) {
        var res = e.target.result;

        if (res === null || res === undefined) {
          res = {
            app:app,
            key:key,
            appkey: app + ',' + key,
            val:val
          };
        }
        else {
          res.val = val;
        }

        var requestPut = store.put(res);

        requestPut.onerror = (function(usercallback) {
          return function(e) {
            if (typeof(usercallback) === 'function') {
              usercallback({ success: false });
            }
            else {
              console.error('LokiCatalog.setAppKey (set) onerror');
              console.error(request.error);
            }
          };

        })(callback);

        requestPut.onsuccess = (function(usercallback) {
          return function(e) {
            if (typeof(usercallback) === 'function') {
              usercallback({ success: true });
            }
          };
        })(callback);
      };

      request.onerror = (function(usercallback) {
        return function(e) {
          if (typeof(usercallback) === 'function') {
            usercallback({ success: false });
          }
          else {
            console.error('LokiCatalog.setAppKey (get) onerror');
            console.error(request.error);
          }
        };
      })(callback);
    };

    LokiCatalog.prototype.deleteAppKey = function (id, callback) {
      var transaction = this.db.transaction(['LokiAKV'], 'readwrite');
      var store = transaction.objectStore('LokiAKV');
      var request = store.delete(id);

      request.onsuccess = (function(usercallback) {
        return function(evt) {
          if (typeof(usercallback) === 'function') usercallback({ success: true });
        };
      })(callback);

      request.onerror = (function(usercallback) {
        return function(evt) {
          if (typeof(usercallback) === 'function') {
            usercallback({ success: false });
          }
          else {
            console.error('LokiCatalog.deleteAppKey raised onerror');
            console.error(request.error);
          }
        };
      })(callback);
    };

    LokiCatalog.prototype.getAppKeys = function(app, callback) {
      var transaction = this.db.transaction(['LokiAKV'], 'readonly');
      var store = transaction.objectStore('LokiAKV');
      var index = store.index('app');

      // We want cursor to all values matching our (single) app param
      var singleKeyRange = IDBKeyRange.only(app);

      // To use one of the key ranges, pass it in as the first argument of openCursor()/openKeyCursor()
      var cursor = index.openCursor(singleKeyRange);

      // cursor internally, pushing results into this.data[] and return
      // this.data[] when done (similar to service)
      var localdata = [];

      cursor.onsuccess = (function(data, callback) {
        return function(e) {
          var cursor = e.target.result;
          if (cursor) {
            var currObject = cursor.value;

            data.push(currObject);

            cursor.continue();
          }
          else {
            if (typeof(callback) === 'function') {
              callback(data);
            }
            else {
              console.log(data);
            }
          }
        };
      })(localdata, callback);

      cursor.onerror = (function(usercallback) {
        return function(e) {
          if (typeof(usercallback) === 'function') {
            usercallback(null);
          }
          else {
            console.error('LokiCatalog.getAppKeys raised onerror');
            console.error(e);
          }
        };
      })(callback);

    };

    // Hide 'cursoring' and return array of { id: id, key: key }
    LokiCatalog.prototype.getAllKeys = function (callback) {
      var transaction = this.db.transaction(['LokiAKV'], 'readonly');
      var store = transaction.objectStore('LokiAKV');
      var cursor = store.openCursor();

      var localdata = [];

      cursor.onsuccess = (function(data, callback) {
        return function(e) {
          var cursor = e.target.result;
          if (cursor) {
            var currObject = cursor.value;

            data.push(currObject);

            cursor.continue();
          }
          else {
            if (typeof(callback) === 'function') {
              callback(data);
            }
            else {
              console.log(data);
            }
          }
        };
      })(localdata, callback);

      cursor.onerror = (function(usercallback) {
        return function(e) {
          if (typeof(usercallback) === 'function') usercallback(null);
        };
      })(callback);

    };

    return LokiIndexedAdapter;

  }());
}));


/***/ }),
/* 67 */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && msCrypto.getRandomValues.bind(msCrypto));
if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),
/* 68 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _it = __webpack_require__(34);

var _it2 = _interopRequireDefault(_it);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _it2.default)({
  init: function init(_ref) {
    var name = _ref.name,
        path = _ref.path;

    if (!name && !path) {
      throw new Error('Model must have a name or path');
    }
    this.name = name || this.name;
    this.path = path || this.path;
  },

  properties: {
    whereArray: [],
    orWhereArray: [],
    selectArray: [],
    orderByArray: [],
    limitNumber: undefined,
    offsetNumber: undefined,
    populate: [],
    chunk: null,
    pullSize: null,
    operators: ['=', '<', '>', '<=', '>=', '<>', '!=', 'like', 'regexp', 'startsWith', 'endsWith', 'contains']
  },
  methods: {
    all: function all() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                throw new Error('all() method not implemented');

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },
    select: function select() {
      throw new Error('select() method not implemented');
    },
    where: function where() {
      throw new Error('where() method not implemented');
    },
    andWhere: function andWhere() {
      throw new Error('andWhere() method not implemented');
    },
    get: function get() {
      throw new Error('get() method not implemented');
    },
    limit: function limit() {
      throw new Error('limit() method not implemented');
    },
    offset: function offset() {
      throw new Error('offset() method not implemented');
    },
    pluck: function pluck(attributePath) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                throw new Error('pluck() method not implemented');

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },
    prepareInput: function prepareInput(input) {
      var cols = [];

      input.forEach(function (item) {
        var value = Array.isArray(item) ? item : item.split(',');

        value = value.map(function (e) {
          return e.trim();
        });
        cols = cols.concat(value);
      });

      cols.filter(function (elem, pos, arr) {
        return arr.indexOf(elem) === pos;
      });

      return cols;
    },
    find: function find() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                throw new Error('find() method not implemented');

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this3);
      }))();
    },
    findOne: function findOne() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                throw new Error('findOne() method not implemented');

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this4);
      }))();
    },
    remove: function remove() {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                throw new Error('remove() method not implemented');

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this5);
      }))();
    },
    softDelete: function softDelete() {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                throw new Error('softDelete() method not implemented');

              case 1:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, _this6);
      }))();
    },
    insert: function insert() {
      var _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                throw new Error('insert() method not implemented');

              case 1:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, _this7);
      }))();
    },
    update: function update() {
      var _this8 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                throw new Error('update() method not implemented');

              case 1:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, _this8);
      }))();
    },
    clear: function clear() {
      var _this9 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                throw new Error('clear() method not implemented');

              case 1:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, _this9);
      }))();
    },
    updateOrCreate: function updateOrCreate() {
      var _this10 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                throw new Error('updateOrCreate() method not implemented');

              case 1:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, _this10);
      }))();
    },
    findAndRemove: function findAndRemove() {
      var _this11 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                throw new Error('findAndRemove() method not implemented');

              case 1:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, _this11);
      }))();
    }
  }
});

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Formio = __webpack_require__(11);

var _Formio2 = _interopRequireDefault(_Formio);

var _config = __webpack_require__(19);

var _config2 = _interopRequireDefault(_config);

var _awaitToJs = __webpack_require__(28);

var _awaitToJs2 = _interopRequireDefault(_awaitToJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var remoteModel = function (path) {
  /* eslint-disable no-unused-vars */
  var getFormioInstance = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
      var _ref$submissionID = _ref.submissionID,
          submissionID = _ref$submissionID === undefined ? undefined : _ref$submissionID;
      var formUrl, AuthUser;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              formUrl = void 0;
              AuthUser = JSON.parse(localStorage.getItem('authUser'));


              if (AuthUser && AuthUser.x_jwt_token) {
                _Formio2.default.setToken(AuthUser.x_jwt_token);
              }

              // Get the base URL
              _context.t0 = path;
              _context.next = _context.t0 === 'custom' ? 6 : _context.t0 === undefined ? 10 : 15;
              break;

            case 6:
              _context.next = 8;
              return _config2.default.get().baseURL;

            case 8:
              formUrl = _context.sent;
              return _context.abrupt('break', 20);

            case 10:
              _context.next = 12;
              return _config2.default.get().url;

            case 12:
              formUrl = _context.sent;

              _Formio2.default.setToken('');
              return _context.abrupt('break', 20);

            case 15:
              _context.next = 17;
              return _config2.default.get().baseURL;

            case 17:
              formUrl = _context.sent;

              formUrl = formUrl + '/' + path;
              return _context.abrupt('break', 20);

            case 20:

              _Formio2.default.clearCache();
              // Set URL in case of submission context
              formUrl = submissionID ? formUrl + '/submission/' + submissionID : formUrl;
              return _context.abrupt('return', new _Formio2.default(formUrl));

            case 23:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function getFormioInstance(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  /**
   * [find description]
   * @param  {[type]} filter [description]
   * @return {[type]}        [description]
   */

  var find = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref6) {
      var _ref6$filter = _ref6.filter,
          filter = _ref6$filter === undefined ? undefined : _ref6$filter,
          _ref6$limit = _ref6.limit,
          limit = _ref6$limit === undefined ? 30 : _ref6$limit,
          _ref6$select = _ref6.select,
          select = _ref6$select === undefined ? undefined : _ref6$select,
          _ref6$populate = _ref6.populate,
          populate = _ref6$populate === undefined ? undefined : _ref6$populate,
          pagination = _ref6.pagination;

      var remoteSubmissions, error, formio, queryParams, filterQuery, selectQuery, _ref8, _ref9, _path, e;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              remoteSubmissions = void 0, error = void 0;
              _context3.next = 3;
              return getFormioInstance({ path: path });

            case 3:
              formio = _context3.sent;
              queryParams = {
                limit: limit
              };


              if (filter && Array.isArray(filter)) {
                filterQuery = filterToString(filter);


                queryParams = _extends({}, queryParams, filterQuery);
              }

              if (select) {
                selectQuery = selectToString(select);


                queryParams = _extends({}, queryParams, selectQuery);
              }

              if (populate && Array.isArray(populate)) {
                queryParams.populate = populate.join(',');
              }

              _context3.next = 10;
              return (0, _awaitToJs2.default)(formio.loadSubmissions({
                params: queryParams
              }));

            case 10:
              _ref8 = _context3.sent;
              _ref9 = _slicedToArray(_ref8, 2);
              error = _ref9[0];
              remoteSubmissions = _ref9[1];

              if (!error) {
                _context3.next = 34;
                break;
              }

              _path = void 0;
              _context3.t0 = _path;
              _context3.next = _context3.t0 === 'custom' ? 19 : _context3.t0 === undefined ? 23 : 27;
              break;

            case 19:
              _context3.next = 21;
              return _config2.default.get().baseURL;

            case 21:
              _path = _context3.sent;
              return _context3.abrupt('break', 32);

            case 23:
              _context3.next = 25;
              return _config2.default.get().url;

            case 25:
              _path = _context3.sent;
              return _context3.abrupt('break', 32);

            case 27:
              _context3.next = 29;
              return _config2.default.get().baseURL;

            case 29:
              _path = _context3.sent;

              _path = _path + '/' + _path;
              return _context3.abrupt('break', 32);

            case 32:
              e = 'The API call to "' + _path + '" could not be completed, server responded with ' + JSON.stringify(error);
              throw new Error(e);

            case 34:
              return _context3.abrupt('return', remoteSubmissions);

            case 35:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function find(_x2) {
      return _ref7.apply(this, arguments);
    };
  }();
  /**
   * [findOne description]
   * @param  {[type]} filter [description]
   * @return {[type]}        [description]
   */


  var findOne = function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref10) {
      var filter = _ref10.filter;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function findOne(_x3) {
      return _ref11.apply(this, arguments);
    };
  }();
  /**
   * [remove description]
   * @param  {[type]} document [description]
   * @return {[type]}          [description]
   */


  var remove = function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref12) {
      var id = _ref12.id;
      var formio, a;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return getFormioInstance({ path: path, submissionID: id });

            case 2:
              formio = _context5.sent;
              _context5.next = 5;
              return formio.deleteSubmission();

            case 5:
              a = _context5.sent;

            case 6:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function remove(_x4) {
      return _ref13.apply(this, arguments);
    };
  }();

  var softDelete = function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_ref14) {
      var id = _ref14.id;
      var formio, original, data, softDeleted;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return getFormioInstance({ path: path, submissionID: id });

            case 2:
              formio = _context6.sent;
              _context6.next = 5;
              return formio.loadSubmission();

            case 5:
              original = _context6.sent;


              original.data.enabled = false;
              data = original.data;
              _context6.next = 10;
              return formio.saveSubmission({
                _id: id,
                data: data
              });

            case 10:
              softDeleted = _context6.sent;
              return _context6.abrupt('return', softDeleted);

            case 12:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function softDelete(_x5) {
      return _ref15.apply(this, arguments);
    };
  }();
  /**
   * [insert description]
   * @param  {[type]} element [description]
   * @return {[type]}         [description]
   */


  var insert = function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_ref16) {
      var element = _ref16.element;
      var formio, sub;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return getFormioInstance({ path: path });

            case 2:
              formio = _context7.sent;


              _Formio2.default.deregisterPlugin('offline');
              _context7.next = 6;
              return formio.saveSubmission(element);

            case 6:
              sub = _context7.sent;
              return _context7.abrupt('return', sub);

            case 8:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    return function insert(_x6) {
      return _ref17.apply(this, arguments);
    };
  }();
  /**
   * [update description]
   * @param  {[type]} document [description]
   * @return {[type]}          [description]
   */


  var update = function () {
    var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(_ref18) {
      var document = _ref18.document;
      var formio, sub;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return getFormioInstance({ path: path });

            case 2:
              formio = _context8.sent;


              _Formio2.default.deregisterPlugin('offline');
              _context8.next = 6;
              return formio.saveSubmission(document);

            case 6:
              sub = _context8.sent;
              return _context8.abrupt('return', sub);

            case 8:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    return function update(_x7) {
      return _ref19.apply(this, arguments);
    };
  }();

  var updateOrCreate = function () {
    var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(_ref20) {
      var document = _ref20.document;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    return function updateOrCreate(_x8) {
      return _ref21.apply(this, arguments);
    };
  }();

  var findAndRemove = function () {
    var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(_ref22) {
      var filter = _ref22.filter;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    return function findAndRemove(_x9) {
      return _ref23.apply(this, arguments);
    };
  }();

  function filterToString(filter) {
    if (!filter) {
      return;
    }
    // Condition {element: '_id', query: 'in', value: ''}
    var filterQuery = {};

    filter = filter.filter(function (e) {
      return !e.type || e.type !== 'local';
    });

    filter.forEach(function (condition) {
      var valueString = '';

      switch (condition.query) {
        case '=':
          filterQuery[condition.element] = condition.value;
          break;
        case '!=':
          filterQuery[condition.element + '__ne'] = condition.value;
          break;
        case '>':
          filterQuery[condition.element + '__gt'] = condition.value;
          break;
        case '>=':
          filterQuery[condition.element + '__gte'] = condition.value;
          break;
        case '<':
          filterQuery[condition.element + '__lt'] = condition.value;
          break;
        case '<=':
          filterQuery[condition.element + '__lte'] = condition.value;
          break;
        case 'in':
          valueString = '';
          condition.value.forEach(function (value, index, array) {
            valueString = index === array.length - 1 ? valueString + value : valueString + value + ',';
          });
          filterQuery[condition.element + '__in'] = valueString;
          break;
        case 'nin':
          valueString = '';
          condition.value.forEach(function (value, index, array) {
            valueString = index === array.length - 1 ? valueString + value : valueString + value + ',';
          });
          filterQuery[condition.element + '__nin'] = valueString;
          break;
        case 'exists':
          filterQuery[condition.element + '__exists'] = true;
          break;
        case '!exists':
          filterQuery[condition.element + '__exists'] = false;
          break;
        case 'regex':
          filterQuery[condition.element + '__regex'] = condition.value;
          break;
      }
    });
    return filterQuery;
  }

  function selectToString(select) {
    if (!select) {
      return;
    }
    var selectString = select.reduce(function (reducer, column) {
      reducer = reducer + ',' + column;
      return reducer;
    }, '_id,owner,modified');

    return { select: selectString };
  }

  var all = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var remoteData, error, formio, _ref4, _ref5;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              remoteData = void 0, error = void 0;
              _context2.next = 3;
              return getFormioInstance({ path: path });

            case 3:
              formio = _context2.sent;
              _context2.next = 6;
              return (0, _awaitToJs2.default)(formio.loadForms());

            case 6:
              _ref4 = _context2.sent;
              _ref5 = _slicedToArray(_ref4, 2);
              error = _ref5[0];
              remoteData = _ref5[1];

              if (!error) {
                _context2.next = 13;
                break;
              }

              console.log(error);
              throw new Error('Cannot get data');

            case 13:
              return _context2.abrupt('return', remoteData);

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function all() {
      return _ref3.apply(this, arguments);
    };
  }();

  return Object.freeze({
    find: find,
    findOne: findOne,
    remove: remove,
    insert: insert,
    update: update,
    updateOrCreate: updateOrCreate,
    findAndRemove: findAndRemove,
    getFormioInstance: getFormioInstance,
    softDelete: softDelete,
    all: all
  });
}();

exports.default = remoteModel;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(72);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)))

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7), __webpack_require__(22)))

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * EventEmitter2
 * https://github.com/hij1nx/EventEmitter2
 *
 * Copyright (c) 2013 hij1nx
 * Licensed under the MIT license.
 */
;!function(undefined) {

  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var defaultMaxListeners = 10;

  function init() {
    this._events = {};
    if (this._conf) {
      configure.call(this, this._conf);
    }
  }

  function configure(conf) {
    if (conf) {
      this._conf = conf;

      conf.delimiter && (this.delimiter = conf.delimiter);
      this._maxListeners = conf.maxListeners !== undefined ? conf.maxListeners : defaultMaxListeners;

      conf.wildcard && (this.wildcard = conf.wildcard);
      conf.newListener && (this._newListener = conf.newListener);
      conf.removeListener && (this._removeListener = conf.removeListener);
      conf.verboseMemoryLeak && (this.verboseMemoryLeak = conf.verboseMemoryLeak);

      if (this.wildcard) {
        this.listenerTree = {};
      }
    } else {
      this._maxListeners = defaultMaxListeners;
    }
  }

  function logPossibleMemoryLeak(count, eventName) {
    var errorMsg = '(node) warning: possible EventEmitter memory ' +
        'leak detected. ' + count + ' listeners added. ' +
        'Use emitter.setMaxListeners() to increase limit.';

    if(this.verboseMemoryLeak){
      errorMsg += ' Event name: ' + eventName + '.';
    }

    if(typeof process !== 'undefined' && process.emitWarning){
      var e = new Error(errorMsg);
      e.name = 'MaxListenersExceededWarning';
      e.emitter = this;
      e.count = count;
      process.emitWarning(e);
    } else {
      console.error(errorMsg);

      if (console.trace){
        console.trace();
      }
    }
  }

  function EventEmitter(conf) {
    this._events = {};
    this._newListener = false;
    this._removeListener = false;
    this.verboseMemoryLeak = false;
    configure.call(this, conf);
  }
  EventEmitter.EventEmitter2 = EventEmitter; // backwards compatibility for exporting EventEmitter property

  //
  // Attention, function return type now is array, always !
  // It has zero elements if no any matches found and one or more
  // elements (leafs) if there are matches
  //
  function searchListenerTree(handlers, type, tree, i) {
    if (!tree) {
      return [];
    }
    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
        typeLength = type.length, currentType = type[i], nextType = type[i+1];
    if (i === typeLength && tree._listeners) {
      //
      // If at the end of the event(s) list and the tree has listeners
      // invoke those listeners.
      //
      if (typeof tree._listeners === 'function') {
        handlers && handlers.push(tree._listeners);
        return [tree];
      } else {
        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
          handlers && handlers.push(tree._listeners[leaf]);
        }
        return [tree];
      }
    }

    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
      //
      // If the event emitted is '*' at this part
      // or there is a concrete match at this patch
      //
      if (currentType === '*') {
        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
          }
        }
        return listeners;
      } else if(currentType === '**') {
        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
        if(endReached && tree._listeners) {
          // The next element has a _listeners, add it to the handlers.
          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
        }

        for (branch in tree) {
          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
            if(branch === '*' || branch === '**') {
              if(tree[branch]._listeners && !endReached) {
                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
              }
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            } else if(branch === nextType) {
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
            } else {
              // No match on this one, shift into the tree but not in the type array.
              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
            }
          }
        }
        return listeners;
      }

      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
    }

    xTree = tree['*'];
    if (xTree) {
      //
      // If the listener tree will allow any match for this part,
      // then recursively explore all branches of the tree
      //
      searchListenerTree(handlers, type, xTree, i+1);
    }

    xxTree = tree['**'];
    if(xxTree) {
      if(i < typeLength) {
        if(xxTree._listeners) {
          // If we have a listener on a '**', it will catch all, so add its handler.
          searchListenerTree(handlers, type, xxTree, typeLength);
        }

        // Build arrays of matching next branches and others.
        for(branch in xxTree) {
          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
            if(branch === nextType) {
              // We know the next element will match, so jump twice.
              searchListenerTree(handlers, type, xxTree[branch], i+2);
            } else if(branch === currentType) {
              // Current node matches, move into the tree.
              searchListenerTree(handlers, type, xxTree[branch], i+1);
            } else {
              isolatedBranch = {};
              isolatedBranch[branch] = xxTree[branch];
              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
            }
          }
        }
      } else if(xxTree._listeners) {
        // We have reached the end and still on a '**'
        searchListenerTree(handlers, type, xxTree, typeLength);
      } else if(xxTree['*'] && xxTree['*']._listeners) {
        searchListenerTree(handlers, type, xxTree['*'], typeLength);
      }
    }

    return listeners;
  }

  function growListenerTree(type, listener) {

    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

    //
    // Looks for two consecutive '**', if so, don't add the event at all.
    //
    for(var i = 0, len = type.length; i+1 < len; i++) {
      if(type[i] === '**' && type[i+1] === '**') {
        return;
      }
    }

    var tree = this.listenerTree;
    var name = type.shift();

    while (name !== undefined) {

      if (!tree[name]) {
        tree[name] = {};
      }

      tree = tree[name];

      if (type.length === 0) {

        if (!tree._listeners) {
          tree._listeners = listener;
        }
        else {
          if (typeof tree._listeners === 'function') {
            tree._listeners = [tree._listeners];
          }

          tree._listeners.push(listener);

          if (
            !tree._listeners.warned &&
            this._maxListeners > 0 &&
            tree._listeners.length > this._maxListeners
          ) {
            tree._listeners.warned = true;
            logPossibleMemoryLeak.call(this, tree._listeners.length, name);
          }
        }
        return true;
      }
      name = type.shift();
    }
    return true;
  }

  // By default EventEmitters will print a warning if more than
  // 10 listeners are added to it. This is a useful default which
  // helps finding memory leaks.
  //
  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.

  EventEmitter.prototype.delimiter = '.';

  EventEmitter.prototype.setMaxListeners = function(n) {
    if (n !== undefined) {
      this._maxListeners = n;
      if (!this._conf) this._conf = {};
      this._conf.maxListeners = n;
    }
  };

  EventEmitter.prototype.event = '';


  EventEmitter.prototype.once = function(event, fn) {
    return this._once(event, fn, false);
  };

  EventEmitter.prototype.prependOnceListener = function(event, fn) {
    return this._once(event, fn, true);
  };

  EventEmitter.prototype._once = function(event, fn, prepend) {
    this._many(event, 1, fn, prepend);
    return this;
  };

  EventEmitter.prototype.many = function(event, ttl, fn) {
    return this._many(event, ttl, fn, false);
  }

  EventEmitter.prototype.prependMany = function(event, ttl, fn) {
    return this._many(event, ttl, fn, true);
  }

  EventEmitter.prototype._many = function(event, ttl, fn, prepend) {
    var self = this;

    if (typeof fn !== 'function') {
      throw new Error('many only accepts instances of Function');
    }

    function listener() {
      if (--ttl === 0) {
        self.off(event, listener);
      }
      return fn.apply(this, arguments);
    }

    listener._origin = fn;

    this._on(event, listener, prepend);

    return self;
  };

  EventEmitter.prototype.emit = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this._newListener) {
      if (!this._events.newListener) {
        return false;
      }
    }

    var al = arguments.length;
    var args,l,i,j;
    var handler;

    if (this._all && this._all.length) {
      handler = this._all.slice();
      if (al > 3) {
        args = new Array(al);
        for (j = 0; j < al; j++) args[j] = arguments[j];
      }

      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          handler[i].call(this, type);
          break;
        case 2:
          handler[i].call(this, type, arguments[1]);
          break;
        case 3:
          handler[i].call(this, type, arguments[1], arguments[2]);
          break;
        default:
          handler[i].apply(this, args);
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
      if (typeof handler === 'function') {
        this.event = type;
        switch (al) {
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        default:
          args = new Array(al - 1);
          for (j = 1; j < al; j++) args[j - 1] = arguments[j];
          handler.apply(this, args);
        }
        return true;
      } else if (handler) {
        // need to make copy of handlers because list can change in the middle
        // of emit call
        handler = handler.slice();
      }
    }

    if (handler && handler.length) {
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          handler[i].call(this);
          break;
        case 2:
          handler[i].call(this, arguments[1]);
          break;
        case 3:
          handler[i].call(this, arguments[1], arguments[2]);
          break;
        default:
          handler[i].apply(this, args);
        }
      }
      return true;
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }

    return !!this._all;
  };

  EventEmitter.prototype.emitAsync = function() {

    this._events || init.call(this);

    var type = arguments[0];

    if (type === 'newListener' && !this._newListener) {
        if (!this._events.newListener) { return Promise.resolve([false]); }
    }

    var promises= [];

    var al = arguments.length;
    var args,l,i,j;
    var handler;

    if (this._all) {
      if (al > 3) {
        args = new Array(al);
        for (j = 1; j < al; j++) args[j] = arguments[j];
      }
      for (i = 0, l = this._all.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(this._all[i].call(this, type));
          break;
        case 2:
          promises.push(this._all[i].call(this, type, arguments[1]));
          break;
        case 3:
          promises.push(this._all[i].call(this, type, arguments[1], arguments[2]));
          break;
        default:
          promises.push(this._all[i].apply(this, args));
        }
      }
    }

    if (this.wildcard) {
      handler = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
    } else {
      handler = this._events[type];
    }

    if (typeof handler === 'function') {
      this.event = type;
      switch (al) {
      case 1:
        promises.push(handler.call(this));
        break;
      case 2:
        promises.push(handler.call(this, arguments[1]));
        break;
      case 3:
        promises.push(handler.call(this, arguments[1], arguments[2]));
        break;
      default:
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
        promises.push(handler.apply(this, args));
      }
    } else if (handler && handler.length) {
      handler = handler.slice();
      if (al > 3) {
        args = new Array(al - 1);
        for (j = 1; j < al; j++) args[j - 1] = arguments[j];
      }
      for (i = 0, l = handler.length; i < l; i++) {
        this.event = type;
        switch (al) {
        case 1:
          promises.push(handler[i].call(this));
          break;
        case 2:
          promises.push(handler[i].call(this, arguments[1]));
          break;
        case 3:
          promises.push(handler[i].call(this, arguments[1], arguments[2]));
          break;
        default:
          promises.push(handler[i].apply(this, args));
        }
      }
    } else if (!this._all && type === 'error') {
      if (arguments[1] instanceof Error) {
        return Promise.reject(arguments[1]); // Unhandled 'error' event
      } else {
        return Promise.reject("Uncaught, unspecified 'error' event.");
      }
    }

    return Promise.all(promises);
  };

  EventEmitter.prototype.on = function(type, listener) {
    return this._on(type, listener, false);
  };

  EventEmitter.prototype.prependListener = function(type, listener) {
    return this._on(type, listener, true);
  };

  EventEmitter.prototype.onAny = function(fn) {
    return this._onAny(fn, false);
  };

  EventEmitter.prototype.prependAny = function(fn) {
    return this._onAny(fn, true);
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  EventEmitter.prototype._onAny = function(fn, prepend){
    if (typeof fn !== 'function') {
      throw new Error('onAny only accepts instances of Function');
    }

    if (!this._all) {
      this._all = [];
    }

    // Add the function to the event listener collection.
    if(prepend){
      this._all.unshift(fn);
    }else{
      this._all.push(fn);
    }

    return this;
  }

  EventEmitter.prototype._on = function(type, listener, prepend) {
    if (typeof type === 'function') {
      this._onAny(type, listener);
      return this;
    }

    if (typeof listener !== 'function') {
      throw new Error('on only accepts instances of Function');
    }
    this._events || init.call(this);

    // To avoid recursion in the case that type == "newListeners"! Before
    // adding it to the listeners, first emit "newListeners".
    if (this._newListener)
       this.emit('newListener', type, listener);

    if (this.wildcard) {
      growListenerTree.call(this, type, listener);
      return this;
    }

    if (!this._events[type]) {
      // Optimize the case of one listener. Don't need the extra array object.
      this._events[type] = listener;
    }
    else {
      if (typeof this._events[type] === 'function') {
        // Change to array.
        this._events[type] = [this._events[type]];
      }

      // If we've already got an array, just add
      if(prepend){
        this._events[type].unshift(listener);
      }else{
        this._events[type].push(listener);
      }

      // Check for listener leak
      if (
        !this._events[type].warned &&
        this._maxListeners > 0 &&
        this._events[type].length > this._maxListeners
      ) {
        this._events[type].warned = true;
        logPossibleMemoryLeak.call(this, this._events[type].length, type);
      }
    }

    return this;
  }

  EventEmitter.prototype.off = function(type, listener) {
    if (typeof listener !== 'function') {
      throw new Error('removeListener only takes instances of Function');
    }

    var handlers,leafs=[];

    if(this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
    }
    else {
      // does not use listeners(), so no side effect of creating _events[type]
      if (!this._events[type]) return this;
      handlers = this._events[type];
      leafs.push({_listeners:handlers});
    }

    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
      var leaf = leafs[iLeaf];
      handlers = leaf._listeners;
      if (isArray(handlers)) {

        var position = -1;

        for (var i = 0, length = handlers.length; i < length; i++) {
          if (handlers[i] === listener ||
            (handlers[i].listener && handlers[i].listener === listener) ||
            (handlers[i]._origin && handlers[i]._origin === listener)) {
            position = i;
            break;
          }
        }

        if (position < 0) {
          continue;
        }

        if(this.wildcard) {
          leaf._listeners.splice(position, 1);
        }
        else {
          this._events[type].splice(position, 1);
        }

        if (handlers.length === 0) {
          if(this.wildcard) {
            delete leaf._listeners;
          }
          else {
            delete this._events[type];
          }
        }
        if (this._removeListener)
          this.emit("removeListener", type, listener);

        return this;
      }
      else if (handlers === listener ||
        (handlers.listener && handlers.listener === listener) ||
        (handlers._origin && handlers._origin === listener)) {
        if(this.wildcard) {
          delete leaf._listeners;
        }
        else {
          delete this._events[type];
        }
        if (this._removeListener)
          this.emit("removeListener", type, listener);
      }
    }

    function recursivelyGarbageCollect(root) {
      if (root === undefined) {
        return;
      }
      var keys = Object.keys(root);
      for (var i in keys) {
        var key = keys[i];
        var obj = root[key];
        if ((obj instanceof Function) || (typeof obj !== "object") || (obj === null))
          continue;
        if (Object.keys(obj).length > 0) {
          recursivelyGarbageCollect(root[key]);
        }
        if (Object.keys(obj).length === 0) {
          delete root[key];
        }
      }
    }
    recursivelyGarbageCollect(this.listenerTree);

    return this;
  };

  EventEmitter.prototype.offAny = function(fn) {
    var i = 0, l = 0, fns;
    if (fn && this._all && this._all.length > 0) {
      fns = this._all;
      for(i = 0, l = fns.length; i < l; i++) {
        if(fn === fns[i]) {
          fns.splice(i, 1);
          if (this._removeListener)
            this.emit("removeListenerAny", fn);
          return this;
        }
      }
    } else {
      fns = this._all;
      if (this._removeListener) {
        for(i = 0, l = fns.length; i < l; i++)
          this.emit("removeListenerAny", fns[i]);
      }
      this._all = [];
    }
    return this;
  };

  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

  EventEmitter.prototype.removeAllListeners = function(type) {
    if (type === undefined) {
      !this._events || init.call(this);
      return this;
    }

    if (this.wildcard) {
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
        var leaf = leafs[iLeaf];
        leaf._listeners = null;
      }
    }
    else if (this._events) {
      this._events[type] = null;
    }
    return this;
  };

  EventEmitter.prototype.listeners = function(type) {
    if (this.wildcard) {
      var handlers = [];
      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
      return handlers;
    }

    this._events || init.call(this);

    if (!this._events[type]) this._events[type] = [];
    if (!isArray(this._events[type])) {
      this._events[type] = [this._events[type]];
    }
    return this._events[type];
  };

  EventEmitter.prototype.eventNames = function(){
    return Object.keys(this._events);
  }

  EventEmitter.prototype.listenerCount = function(type) {
    return this.listeners(type).length;
  };

  EventEmitter.prototype.listenersAny = function() {

    if(this._all) {
      return this._all;
    }
    else {
      return [];
    }

  };

  if (true) {
     // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return EventEmitter;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(22)))

/***/ }),
/* 74 */
/***/ (function(module, exports) {

exports.defaults = {};

exports.set = function(name, value, options) {
  // Retrieve options and defaults
  var opts = options || {};
  var defaults = exports.defaults;

  // Apply default value for unspecified options
  var expires  = opts.expires  || defaults.expires;
  var domain   = opts.domain   || defaults.domain;
  var path     = opts.path     !== undefined ? opts.path     : (defaults.path !== undefined ? defaults.path : '/');
  var secure   = opts.secure   !== undefined ? opts.secure   : defaults.secure;
  var httponly = opts.httponly !== undefined ? opts.httponly : defaults.httponly;
  var samesite = opts.samesite !== undefined ? opts.samesite : defaults.samesite;

  // Determine cookie expiration date
  // If succesful the result will be a valid Date, otherwise it will be an invalid Date or false(ish)
  var expDate = expires ? new Date(
      // in case expires is an integer, it should specify the number of days till the cookie expires
      typeof expires === 'number' ? new Date().getTime() + (expires * 864e5) :
      // else expires should be either a Date object or in a format recognized by Date.parse()
      expires
  ) : 0;

  // Set cookie
  document.cookie = name.replace(/[^+#$&^`|]/g, encodeURIComponent)                // Encode cookie name
  .replace('(', '%28')
  .replace(')', '%29') +
  '=' + value.replace(/[^+#$&/:<-\[\]-}]/g, encodeURIComponent) +                  // Encode cookie value (RFC6265)
  (expDate && expDate.getTime() >= 0 ? ';expires=' + expDate.toUTCString() : '') + // Add expiration date
  (domain   ? ';domain=' + domain     : '') +                                      // Add domain
  (path     ? ';path='   + path       : '') +                                      // Add path
  (secure   ? ';secure'               : '') +                                      // Add secure option
  (httponly ? ';httponly'             : '') +                                      // Add httponly option
  (samesite ? ';samesite=' + samesite : '');                                       // Add samesite option
};

exports.get = function(name) {
  var cookies = document.cookie.split(';');
  
  // Iterate all cookies
  while(cookies.length) {
    var cookie = cookies.pop();

    // Determine separator index ("name=value")
    var separatorIndex = cookie.indexOf('=');

    // IE<11 emits the equal sign when the cookie value is empty
    separatorIndex = separatorIndex < 0 ? cookie.length : separatorIndex;

    var cookie_name = decodeURIComponent(cookie.slice(0, separatorIndex).replace(/^\s+/, ''));

    // Return cookie value if the name matches
    if (cookie_name === name) {
      return decodeURIComponent(cookie.slice(separatorIndex + 1));
    }
  }

  // Return `null` as the cookie was not found
  return null;
};

exports.erase = function(name, options) {
  exports.set(name, '', {
    expires:  -1,
    domain:   options && options.domain,
    path:     options && options.path,
    secure:   0,
    httponly: 0}
  );
};

exports.all = function() {
  var all = {};
  var cookies = document.cookie.split(';');

  // Iterate all cookies
  while(cookies.length) {
    var cookie = cookies.pop();

    // Determine separator index ("name=value")
    var separatorIndex = cookie.indexOf('=');

    // IE<11 emits the equal sign when the cookie value is empty
    separatorIndex = separatorIndex < 0 ? cookie.length : separatorIndex;

    // add the cookie name and value to the `all` object
    var cookie_name = decodeURIComponent(cookie.slice(0, separatorIndex).replace(/^\s+/, ''));
    all[cookie_name] = decodeURIComponent(cookie.slice(separatorIndex + 1));
  }

  return all;
};


/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = function (obj) {
    if (!obj || typeof obj !== 'object') return obj;
    
    var copy;
    
    if (isArray(obj)) {
        var len = obj.length;
        copy = Array(len);
        for (var i = 0; i < len; i++) {
            copy[i] = obj[i];
        }
    }
    else {
        var keys = objectKeys(obj);
        copy = {};
        
        for (var i = 0, l = keys.length; i < l; i++) {
            var key = keys[i];
            copy[key] = obj[key];
        }
    }
    return copy;
};

var objectKeys = Object.keys || function (obj) {
    var keys = [];
    for (var key in obj) {
        if ({}.hasOwnProperty.call(obj, key)) keys.push(key);
    }
    return keys;
};

var isArray = Array.isArray || function (xs) {
    return {}.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "storage", {
  enumerable: true,
  get: function get() {
    return _storage2.default;
  }
});

var _storage2 = _interopRequireDefault(__webpack_require__(77));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(__webpack_require__(78));

var _dropbox = _interopRequireDefault(__webpack_require__(79));

var _s = _interopRequireDefault(__webpack_require__(80));

var _url = _interopRequireDefault(__webpack_require__(98));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  base64: _base.default,
  dropbox: _dropbox.default,
  s3: _s.default,
  url: _url.default
};
exports.default = _default;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nativePromiseOnly = _interopRequireDefault(__webpack_require__(8));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var base64 = function base64() {
  return {
    title: 'Base64',
    name: 'base64',
    uploadFile: function uploadFile(file, fileName) {
      var _this = this;

      var reader = new FileReader();
      return new _nativePromiseOnly.default(function (resolve, reject) {
        reader.onload = function (event) {
          var url = event.target.result;
          resolve({
            storage: 'base64',
            name: fileName,
            url: url,
            size: file.size,
            type: file.type,
            data: url.replace("data:".concat(file.type, ";base64,"), '')
          });
        };

        reader.onerror = function () {
          return reject(_this);
        };

        reader.readAsDataURL(file);
      });
    },
    downloadFile: function downloadFile(file) {
      // Return the original as there is nothing to do.
      return _nativePromiseOnly.default.resolve(file);
    }
  };
};

base64.title = 'Base64';
var _default = base64;
exports.default = _default;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nativePromiseOnly = _interopRequireDefault(__webpack_require__(8));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dropbox = function dropbox(formio) {
  return {
    uploadFile: function uploadFile(file, fileName, dir, progressCallback) {
      return new _nativePromiseOnly.default(function (resolve, reject) {
        // Send the file with data.
        var xhr = new XMLHttpRequest();

        if (typeof progressCallback === 'function') {
          xhr.upload.onprogress = progressCallback;
        }

        var fd = new FormData();
        fd.append('name', fileName);
        fd.append('dir', dir);
        fd.append('file', file); // Fire on network error.

        xhr.onerror = function (err) {
          err.networkError = true;
          reject(err);
        };

        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            var response = JSON.parse(xhr.response);
            response.storage = 'dropbox';
            response.size = file.size;
            response.type = file.type;
            response.url = response.path_lower;
            resolve(response);
          } else {
            reject(xhr.response || 'Unable to upload file');
          }
        };

        xhr.onabort = reject;
        xhr.open('POST', "".concat(formio.formUrl, "/storage/dropbox"));
        var token = formio.getToken();

        if (token) {
          xhr.setRequestHeader('x-jwt-token', token);
        }

        xhr.send(fd);
      });
    },
    downloadFile: function downloadFile(file) {
      var token = formio.getToken();
      file.url = "".concat(formio.formUrl, "/storage/dropbox?path_lower=").concat(file.path_lower).concat(token ? "&x-jwt-token=".concat(token) : '');
      return _nativePromiseOnly.default.resolve(file);
    }
  };
};

dropbox.title = 'Dropbox';
var _default = dropbox;
exports.default = _default;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nativePromiseOnly = _interopRequireDefault(__webpack_require__(8));

var _trim2 = _interopRequireDefault(__webpack_require__(81));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var trim = function trim(text) {
  return (0, _trim2.default)(text, '/');
};

var path = function path(items) {
  return items.filter(function (item) {
    return !!item;
  }).map(trim).join('/');
};

var s3 = function s3(formio) {
  return {
    uploadFile: function uploadFile(file, fileName, dir, progressCallback) {
      return new _nativePromiseOnly.default(function (resolve, reject) {
        // Send the pre response to sign the upload.
        var pre = new XMLHttpRequest(); // This only fires on a network error.

        pre.onerror = function (err) {
          err.networkError = true;
          reject(err);
        };

        pre.onabort = reject;

        pre.onload = function () {
          if (pre.status >= 200 && pre.status < 300) {
            var response = JSON.parse(pre.response); // Send the file with data.

            var xhr = new XMLHttpRequest();

            if (typeof progressCallback === 'function') {
              xhr.upload.onprogress = progressCallback;
            }

            response.data.fileName = fileName;
            response.data.key = path([response.data.key, dir, fileName]); // Fire on network error.

            xhr.onerror = function (err) {
              err.networkError = true;
              reject(err);
            };

            xhr.onload = function () {
              if (xhr.status >= 200 && xhr.status < 300) {
                resolve({
                  storage: 's3',
                  name: fileName,
                  bucket: response.bucket,
                  key: response.data.key,
                  url: path([response.url, response.data.key]),
                  acl: response.data.acl,
                  size: file.size,
                  type: file.type
                });
              } else {
                reject(xhr.response || 'Unable to upload file');
              }
            };

            xhr.onabort = reject;

            if (response.signed) {
              xhr.open('PUT', response.signed);
              xhr.setRequestHeader('Content-Type', file.type);
              xhr.send(file);
            } else {
              var fd = new FormData();

              for (var key in response.data) {
                fd.append(key, response.data[key]);
              }

              fd.append('file', file);
              xhr.open('POST', response.url);
              xhr.send(fd);
            }
          } else {
            reject(pre.response || 'Unable to sign file');
          }
        };

        pre.open('POST', "".concat(formio.formUrl, "/storage/s3"));
        pre.setRequestHeader('Accept', 'application/json');
        pre.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        var token = formio.getToken();

        if (token) {
          pre.setRequestHeader('x-jwt-token', token);
        }

        pre.send(JSON.stringify({
          name: path([dir, fileName]),
          size: file.size,
          type: file.type
        }));
      });
    },
    downloadFile: function downloadFile(file) {
      if (file.acl !== 'public-read') {
        return formio.makeRequest('file', "".concat(formio.formUrl, "/storage/s3?bucket=").concat(trim(file.bucket), "&key=").concat(trim(file.key)), 'GET');
      } else {
        return _nativePromiseOnly.default.resolve(file);
      }
    }
  };
};

s3.title = 'S3';
var _default = s3;
exports.default = _default;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(41),
    castSlice = __webpack_require__(87),
    charsEndIndex = __webpack_require__(89),
    charsStartIndex = __webpack_require__(93),
    stringToArray = __webpack_require__(94),
    toString = __webpack_require__(44);

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * _.trim('  abc  ');
 * // => 'abc'
 *
 * _.trim('-_-abc-_-', '_-');
 * // => 'abc'
 *
 * _.map(['  foo  ', '  bar  '], _.trim);
 * // => ['foo', 'bar']
 */
function trim(string, chars, guard) {
  string = toString(string);
  if (string && (guard || chars === undefined)) {
    return string.replace(reTrim, '');
  }
  if (!string || !(chars = baseToString(chars))) {
    return string;
  }
  var strSymbols = stringToArray(string),
      chrSymbols = stringToArray(chars),
      start = charsStartIndex(strSymbols, chrSymbols),
      end = charsEndIndex(strSymbols, chrSymbols) + 1;

  return castSlice(strSymbols, start, end).join('');
}

module.exports = trim;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)))

/***/ }),
/* 83 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(24);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 85 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 86 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var baseSlice = __webpack_require__(88);

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

module.exports = castSlice;


/***/ }),
/* 88 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(43);

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the last unmatched string symbol.
 */
function charsEndIndex(strSymbols, chrSymbols) {
  var index = strSymbols.length;

  while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
  return index;
}

module.exports = charsEndIndex;


/***/ }),
/* 90 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;


/***/ }),
/* 91 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;


/***/ }),
/* 92 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var baseIndexOf = __webpack_require__(43);

/**
 * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the first unmatched string symbol.
 */
function charsStartIndex(strSymbols, chrSymbols) {
  var index = -1,
      length = strSymbols.length;

  while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
  return index;
}

module.exports = charsStartIndex;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var asciiToArray = __webpack_require__(95),
    hasUnicode = __webpack_require__(96),
    unicodeToArray = __webpack_require__(97);

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

module.exports = stringToArray;


/***/ }),
/* 95 */
/***/ (function(module, exports) {

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

module.exports = asciiToArray;


/***/ }),
/* 96 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

module.exports = hasUnicode;


/***/ }),
/* 97 */
/***/ (function(module, exports) {

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

module.exports = unicodeToArray;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nativePromiseOnly = _interopRequireDefault(__webpack_require__(8));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = function url(formio) {
  return {
    title: 'Url',
    name: 'url',
    uploadFile: function uploadFile(file, fileName, dir, progressCallback, url) {
      return new _nativePromiseOnly.default(function (resolve, reject) {
        var data = {
          dir: dir,
          file: file,
          name: fileName
        }; // Send the file with data.

        var xhr = new XMLHttpRequest();

        if (typeof progressCallback === 'function') {
          xhr.upload.onprogress = progressCallback;
        }

        var fd = new FormData();

        for (var key in data) {
          fd.append(key, data[key]);
        }

        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            // Need to test if xhr.response is decoded or not.
            var respData = {};

            try {
              respData = typeof xhr.response === 'string' ? JSON.parse(xhr.response) : {};
              respData = respData && respData.data ? respData.data : respData;
            } catch (err) {
              respData = {};
            }

            var _url = respData.hasOwnProperty('url') ? respData.url : "".concat(xhr.responseURL, "/").concat(fileName);

            resolve({
              storage: 'url',
              name: fileName,
              url: _url,
              size: file.size,
              type: file.type,
              data: respData
            });
          } else {
            reject(xhr.response || 'Unable to upload file');
          }
        }; // Fire on network error.


        xhr.onerror = function () {
          return reject(xhr);
        };

        xhr.onabort = function () {
          return reject(xhr);
        };

        xhr.open('POST', url);
        var token = formio.getToken();

        if (token) {
          xhr.setRequestHeader('x-jwt-token', token);
        }

        xhr.send(fd);
      });
    },
    downloadFile: function downloadFile(file) {
      // Return the original as there is nothing to do.
      return _nativePromiseOnly.default.resolve(file);
    }
  };
};

url.title = 'Url';
var _default = url;
exports.default = _default;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(100);

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(101),
    toKey = __webpack_require__(133);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(26),
    isKey = __webpack_require__(102),
    stringToPath = __webpack_require__(103),
    toString = __webpack_require__(44);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(26),
    isSymbol = __webpack_require__(27);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(104);

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var memoize = __webpack_require__(105);

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(106);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(107),
    mapCacheDelete = __webpack_require__(128),
    mapCacheGet = __webpack_require__(130),
    mapCacheHas = __webpack_require__(131),
    mapCacheSet = __webpack_require__(132);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(108),
    ListCache = __webpack_require__(120),
    Map = __webpack_require__(127);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(109),
    hashDelete = __webpack_require__(116),
    hashGet = __webpack_require__(117),
    hashHas = __webpack_require__(118),
    hashSet = __webpack_require__(119);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(16);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(111),
    isMasked = __webpack_require__(112),
    isObject = __webpack_require__(46),
    toSource = __webpack_require__(114);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(42),
    isObject = __webpack_require__(46);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(113);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(25);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 114 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 115 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 116 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(16);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(16);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(16);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(121),
    listCacheDelete = __webpack_require__(122),
    listCacheGet = __webpack_require__(124),
    listCacheHas = __webpack_require__(125),
    listCacheSet = __webpack_require__(126);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),
/* 121 */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(17);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),
/* 123 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(17);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(17);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(17);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(45),
    root = __webpack_require__(25);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(18);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),
/* 129 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(18);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(18);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(18);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(27);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Form = __webpack_require__(12);

var _Form2 = _interopRequireDefault(_Form);

var _Event = __webpack_require__(6);

var _Event2 = _interopRequireDefault(_Event);

var _Configuration = __webpack_require__(2);

var _Configuration2 = _interopRequireDefault(_Configuration);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _moment = __webpack_require__(1);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var RemoteForms = function () {
  var setOfflineForms = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref) {
      var _this = this;

      var appConf = _ref.appConf;
      var localForms, localDate, config, offlineForms;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _Form2.default.local().find();

            case 2:
              localForms = _context2.sent;
              localDate = getLocalFormsDate(localForms);
              _context2.next = 6;
              return _Configuration2.default.getLocal();

            case 6:
              config = _context2.sent;
              offlineForms = _utilities2.default.get(function () {
                return appConf.offlineFiles.Forms;
              });

              if (!(config.fastUpdated >= localDate)) {
                _context2.next = 14;
                break;
              }

              if (!localForms) {
                _context2.next = 12;
                break;
              }

              _context2.next = 12;
              return _Form2.default.local().clear();

            case 12:
              offlineForms.forEach(function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(form) {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return _Form2.default.local().insert({ data: form, fastUpdated: (0, _moment2.default)().unix() });

                        case 2:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, _this);
                }));

                return function (_x2) {
                  return _ref3.apply(this, arguments);
                };
              }());
              return _context2.abrupt('return', offlineForms);

            case 14:
              return _context2.abrupt('return', localForms);

            case 15:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function setOfflineForms(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var setOnlineForms = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var remoteForms, unixDate;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _Form2.default.remote().find();

            case 2:
              remoteForms = _context4.sent;
              unixDate = (0, _moment2.default)().unix();

              if (!(remoteForms && !_utilities2.default.isEmpty(remoteForms))) {
                _context4.next = 8;
                break;
              }

              _context4.next = 7;
              return _Form2.default.local().clear();

            case 7:
              remoteForms.forEach(function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(form) {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return _Form2.default.local().insert({
                            data: form,
                            fastUpdated: unixDate
                          });

                        case 2:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  }, _callee3, this);
                }));

                return function (_x3) {
                  return _ref5.apply(this, arguments);
                };
              }());

            case 8:
              _Event2.default.emit({
                name: 'FAST:FORMS:UPDATED',
                data: remoteForms.length,
                text: 'Forms were updated'
              });

            case 9:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function setOnlineForms() {
      return _ref4.apply(this, arguments);
    };
  }();

  var set = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_ref6) {
      var appConf = _ref6.appConf,
          forceOnline = _ref6.forceOnline;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(appConf.offlineStart === 'true' && !forceOnline)) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt('return', setOfflineForms({ appConf: appConf }));

            case 2:
              return _context5.abrupt('return', setOnlineForms());

            case 3:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function set(_x4) {
      return _ref7.apply(this, arguments);
    };
  }();

  function getLocalFormsDate(localForms) {
    return _utilities2.default.get(function () {
      return localForms[0].fastUpdated;
    }, 0);
  }

  return Object.freeze({
    set: set
  });
}();

exports.default = RemoteForms;

/***/ }),
/* 135 */
/***/ (function(module) {

module.exports = [{"code":"ab","direction":"ltr","label":"Abkhazian"},{"code":"aa","direction":"ltr","label":"Afar"},{"code":"af","direction":"ltr","label":"Afrikaans"},{"code":"ak","direction":"ltr","label":"Akan"},{"code":"sq","direction":"ltr","label":"Albanian"},{"code":"am","direction":"ltr","label":"Amharic"},{"code":"ar","direction":"rtl","label":"Arabic"},{"code":"an","direction":"ltr","label":"Aragonese"},{"code":"hy","direction":"ltr","label":"Armenian"},{"code":"as","direction":"ltr","label":"Assamese"},{"code":"av","direction":"ltr","label":"Avaric"},{"code":"ae","direction":"ltr","label":"Avestan"},{"code":"ay","direction":"ltr","label":"Aymara"},{"code":"az","direction":"ltr","label":"Azerbaijani"},{"code":"bm","direction":"ltr","label":"Bambara"},{"code":"ba","direction":"ltr","label":"Bashkir"},{"code":"eu","direction":"ltr","label":"Basque"},{"code":"be","direction":"ltr","label":"Belarusian"},{"code":"bn","direction":"ltr","label":"Bengali"},{"code":"bh","direction":"ltr","label":"Bihari languages"},{"code":"bi","direction":"ltr","label":"Bislama"},{"code":"bs","direction":"ltr","label":"Bosnian"},{"code":"br","direction":"ltr","label":"Breton"},{"code":"bg","direction":"ltr","label":"Bulgarian"},{"code":"my","direction":"ltr","label":"Burmese"},{"code":"ca","direction":"ltr","label":"Catalan, Valencian"},{"code":"km","direction":"ltr","label":"Central Khmer"},{"code":"ch","direction":"ltr","label":"Chamorro"},{"code":"ce","direction":"ltr","label":"Chechen"},{"code":"ny","direction":"ltr","label":"Chichewa"},{"code":"zh","direction":"ltr","label":"Chinese"},{"code":"cu","direction":"ltr","label":"Church Slavonic, Old Bulgarian, Old Church Slavonic"},{"code":"cv","direction":"ltr","label":"Chuvash"},{"code":"kw","direction":"ltr","label":"Cornish"},{"code":"co","direction":"ltr","label":"Corsican"},{"code":"cr","direction":"ltr","label":"Cree"},{"code":"hr","direction":"ltr","label":"Croatian"},{"code":"cs","direction":"ltr","label":"Czech"},{"code":"da","direction":"ltr","label":"Danish"},{"code":"dv","direction":"ltr","label":"Divehi, Dhivehi, Maldivian"},{"code":"nl","direction":"ltr","label":"Dutch, Flemish"},{"code":"dz","direction":"ltr","label":"Dzongkha"},{"code":"en","direction":"ltr","label":"English"},{"code":"eo","direction":"ltr","label":"Esperanto"},{"code":"et","direction":"ltr","label":"Estonian"},{"code":"ee","direction":"ltr","label":"Ewe"},{"code":"fo","direction":"ltr","label":"Faroese"},{"code":"fj","direction":"ltr","label":"Fijian"},{"code":"fi","direction":"ltr","label":"Finnish"},{"code":"fr","direction":"ltr","label":"French"},{"code":"ff","direction":"ltr","label":"Fulah"},{"code":"gd","direction":"ltr","label":"Gaelic, Scottish Gaelic"},{"code":"gl","direction":"ltr","label":"Galician"},{"code":"lg","direction":"ltr","label":"Ganda"},{"code":"ka","direction":"ltr","label":"Georgian"},{"code":"de","direction":"ltr","label":"German"},{"code":"ki","direction":"ltr","label":"Gikuyu, Kikuyu"},{"code":"el","direction":"ltr","label":"Greek (Modern)"},{"code":"kl","direction":"ltr","label":"Greenlandic, Kalaallisut"},{"code":"gn","direction":"ltr","label":"Guarani"},{"code":"gu","direction":"ltr","label":"Gujarati"},{"code":"ht","direction":"ltr","label":"Haitian, Haitian Creole"},{"code":"ha","direction":"ltr","label":"Hausa"},{"code":"he","direction":"ltr","label":"Hebrew"},{"code":"hz","direction":"ltr","label":"Herero"},{"code":"hi","direction":"ltr","label":"Hindi"},{"code":"ho","direction":"ltr","label":"Hiri Motu"},{"code":"hu","direction":"ltr","label":"Hungarian"},{"code":"is","direction":"ltr","label":"Icelandic"},{"code":"io","direction":"ltr","label":"Ido"},{"code":"ig","direction":"ltr","label":"Igbo"},{"code":"id","direction":"ltr","label":"Indonesian"},{"code":"ia","direction":"ltr","label":"Interlingua (International Auxiliary Language Association)"},{"code":"ie","direction":"ltr","label":"Interlingue"},{"code":"iu","direction":"ltr","label":"Inuktitut"},{"code":"ik","direction":"ltr","label":"Inupiaq"},{"code":"ga","direction":"ltr","label":"Irish"},{"code":"it","direction":"ltr","label":"Italian"},{"code":"ja","direction":"ltr","label":"Japanese"},{"code":"jv","direction":"ltr","label":"Javanese"},{"code":"kn","direction":"ltr","label":"Kannada"},{"code":"kr","direction":"ltr","label":"Kanuri"},{"code":"ks","direction":"ltr","label":"Kashmiri"},{"code":"kk","direction":"ltr","label":"Kazakh"},{"code":"rw","direction":"ltr","label":"Kinyarwanda"},{"code":"kv","direction":"ltr","label":"Komi"},{"code":"kg","direction":"ltr","label":"Kongo"},{"code":"ko","direction":"ltr","label":"Korean"},{"code":"kj","direction":"ltr","label":"Kwanyama, Kuanyama"},{"code":"ku","direction":"ltr","label":"Kurdish"},{"code":"ky","direction":"ltr","label":"Kyrgyz"},{"code":"lo","direction":"ltr","label":"Lao"},{"code":"la","direction":"ltr","label":"Latin"},{"code":"lv","direction":"ltr","label":"Latvian"},{"code":"lb","direction":"ltr","label":"Letzeburgesch, Luxembourgish"},{"code":"li","direction":"ltr","label":"Limburgish, Limburgan, Limburger"},{"code":"ln","direction":"ltr","label":"Lingala"},{"code":"lt","direction":"ltr","label":"Lithuanian"},{"code":"lu","direction":"ltr","label":"Luba-Katanga"},{"code":"mk","direction":"ltr","label":"Macedonian"},{"code":"mg","direction":"ltr","label":"Malagasy"},{"code":"ms","direction":"ltr","label":"Malay"},{"code":"ml","direction":"ltr","label":"Malayalam"},{"code":"mt","direction":"ltr","label":"Maltese"},{"code":"gv","direction":"ltr","label":"Manx"},{"code":"mi","direction":"ltr","label":"Maori"},{"code":"mr","direction":"ltr","label":"Marathi"},{"code":"mh","direction":"ltr","label":"Marshallese"},{"code":"ro","direction":"ltr","label":"Moldovan, Moldavian, Romanian"},{"code":"mn","direction":"ltr","label":"Mongolian"},{"code":"na","direction":"ltr","label":"Nauru"},{"code":"nv","direction":"ltr","label":"Navajo, Navaho"},{"code":"nd","direction":"ltr","label":"Northern Ndebele"},{"code":"ng","direction":"ltr","label":"Ndonga"},{"code":"ne","direction":"ltr","label":"Nepali"},{"code":"se","direction":"ltr","label":"Northern Sami"},{"code":"no","direction":"ltr","label":"Norwegian"},{"code":"nb","direction":"ltr","label":"Norwegian Bokmål"},{"code":"nn","direction":"ltr","label":"Norwegian Nynorsk"},{"code":"ii","direction":"ltr","label":"Nuosu, Sichuan Yi"},{"code":"oc","direction":"ltr","label":"Occitan (post 1500)"},{"code":"oj","direction":"ltr","label":"Ojibwa"},{"code":"or","direction":"ltr","label":"Oriya"},{"code":"om","direction":"ltr","label":"Oromo"},{"code":"os","direction":"ltr","label":"Ossetian, Ossetic"},{"code":"pi","direction":"ltr","label":"Pali"},{"code":"pa","direction":"ltr","label":"Panjabi, Punjabi"},{"code":"ps","direction":"ltr","label":"Pashto, Pushto"},{"code":"fa","direction":"ltr","label":"Persian"},{"code":"pl","direction":"ltr","label":"Polish"},{"code":"pt","direction":"ltr","label":"Portuguese"},{"code":"qu","direction":"ltr","label":"Quechua"},{"code":"rm","direction":"ltr","label":"Romansh"},{"code":"rn","direction":"ltr","label":"Rundi"},{"code":"ru","direction":"ltr","label":"Russian"},{"code":"sm","direction":"ltr","label":"Samoan"},{"code":"sg","direction":"ltr","label":"Sango"},{"code":"sa","direction":"ltr","label":"Sanskrit"},{"code":"sc","direction":"ltr","label":"Sardinian"},{"code":"sr","direction":"ltr","label":"Serbian"},{"code":"sn","direction":"ltr","label":"Shona"},{"code":"sd","direction":"ltr","label":"Sindhi"},{"code":"si","direction":"ltr","label":"Sinhala, Sinhalese"},{"code":"sk","direction":"ltr","label":"Slovak"},{"code":"sl","direction":"ltr","label":"Slovenian"},{"code":"so","direction":"ltr","label":"Somali"},{"code":"st","direction":"ltr","label":"Sotho, Southern"},{"code":"nr","direction":"ltr","label":"South Ndebele"},{"code":"es","direction":"ltr","label":"Spanish"},{"code":"su","direction":"ltr","label":"Sundanese"},{"code":"sw","direction":"ltr","label":"Swahili"},{"code":"ss","direction":"ltr","label":"Swati"},{"code":"sv","direction":"ltr","label":"Swedish"},{"code":"tl","direction":"ltr","label":"Tagalog"},{"code":"ty","direction":"ltr","label":"Tahitian"},{"code":"tg","direction":"ltr","label":"Tajik"},{"code":"ta","direction":"ltr","label":"Tamil"},{"code":"tt","direction":"ltr","label":"Tatar"},{"code":"te","direction":"ltr","label":"Telugu"},{"code":"th","direction":"ltr","label":"Thai"},{"code":"bo","direction":"ltr","label":"Tibetan"},{"code":"ti","direction":"ltr","label":"Tigrinya"},{"code":"to","direction":"ltr","label":"Tonga (Tonga Islands)"},{"code":"ts","direction":"ltr","label":"Tsonga"},{"code":"tn","direction":"ltr","label":"Tswana"},{"code":"tr","direction":"ltr","label":"Turkish"},{"code":"tk","direction":"ltr","label":"Turkmen"},{"code":"tw","direction":"ltr","label":"Twi"},{"code":"ug","direction":"ltr","label":"Uighur, Uyghur"},{"code":"uk","direction":"ltr","label":"Ukrainian"},{"code":"umb","direction":"ltr","label":"Umbundu"},{"code":"ur","direction":"ltr","label":"Urdu"},{"code":"uz","direction":"ltr","label":"Uzbek"},{"code":"ve","direction":"ltr","label":"Venda"},{"code":"vi","direction":"ltr","label":"Vietnamese"},{"code":"vo","direction":"ltr","label":"Volap_k"},{"code":"wa","direction":"ltr","label":"Walloon"},{"code":"cy","direction":"ltr","label":"Welsh"},{"code":"fy","direction":"ltr","label":"Western Frisian"},{"code":"wo","direction":"ltr","label":"Wolof"},{"code":"xh","direction":"ltr","label":"Xhosa"},{"code":"yi","direction":"ltr","label":"Yiddish"},{"code":"yo","direction":"ltr","label":"Yoruba"},{"code":"za","direction":"ltr","label":"Zhuang, Chuang"},{"code":"zu","direction":"ltr","label":"Zulu"}];

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sync = __webpack_require__(49);

var _Sync2 = _interopRequireDefault(_Sync);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var SyncInterval = function () {
  var set = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(milliseconds) {
      var rInterval, _debouncedSync;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              rInterval = function rInterval(callback, delay) {
                var dateNow = Date.now,
                    requestAnimation = window.requestAnimationFrame,
                    start = dateNow(),
                    stop = void 0,
                    intervalFunc = function intervalFunc() {
                  // eslint-disable-next-line no-use-before-define
                  dateNow() - start < delay || (start += delay, callback());
                  // eslint-disable-next-line no-use-before-define
                  stop || requestAnimation(intervalFunc);
                };

                requestAnimation(intervalFunc);
                return {
                  clear: function clear() {
                    stop = 1;
                  }
                };
              };

              _debouncedSync = _utilities2.default.debounce(_Sync2.default.now, 2000);


              rInterval(_debouncedSync, milliseconds);

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function set(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return Object.freeze({
    set: set
  });
}();

exports.default = SyncInterval;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.evaluate = evaluate;
exports.getRandomComponentId = getRandomComponentId;
exports.getPropertyValue = getPropertyValue;
exports.getElementRect = getElementRect;
exports.boolValue = boolValue;
exports.isMongoId = isMongoId;
exports.isLayoutComponent = isLayoutComponent;
exports.eachComponent = eachComponent;
exports.matchComponent = matchComponent;
exports.getComponent = getComponent;
exports.findComponents = findComponents;
exports.flattenComponents = flattenComponents;
exports.hasCondition = hasCondition;
exports.parseFloatExt = parseFloatExt;
exports.formatAsCurrency = formatAsCurrency;
exports.escapeRegExCharacters = escapeRegExCharacters;
exports.checkCalculated = checkCalculated;
exports.checkSimpleConditional = checkSimpleConditional;
exports.checkCustomConditional = checkCustomConditional;
exports.checkJsonConditional = checkJsonConditional;
exports.checkCondition = checkCondition;
exports.checkTrigger = checkTrigger;
exports.setActionProperty = setActionProperty;
exports.getValue = getValue;
exports.interpolate = interpolate;
exports.uniqueName = uniqueName;
exports.guid = guid;
exports.getDateSetting = getDateSetting;
exports.isValidDate = isValidDate;
exports.currentTimezone = currentTimezone;
exports.offsetDate = offsetDate;
exports.loadZones = loadZones;
exports.timezoneText = timezoneText;
exports.formatDate = formatDate;
exports.formatOffset = formatOffset;
exports.getLocaleDateFormatInfo = getLocaleDateFormatInfo;
exports.convertFormatToFlatpickr = convertFormatToFlatpickr;
exports.convertFormatToMoment = convertFormatToMoment;
exports.convertFormatToMask = convertFormatToMask;
exports.getInputMask = getInputMask;
exports.matchInputMask = matchInputMask;
exports.getNumberSeparators = getNumberSeparators;
exports.getNumberDecimalLimit = getNumberDecimalLimit;
exports.getCurrencyAffixes = getCurrencyAffixes;
exports.fieldData = fieldData;
exports.delay = delay;
exports.iterateKey = iterateKey;
exports.uniqueKey = uniqueKey;
exports.bootstrapVersion = bootstrapVersion;
Object.defineProperty(exports, "jsonLogic", {
  enumerable: true,
  get: function get() {
    return _jsonLogicJs.default;
  }
});

var _lodash = _interopRequireDefault(__webpack_require__(138));

__webpack_require__(40);

var _jsonLogicJs = _interopRequireDefault(__webpack_require__(139));

var _momentTimezone = _interopRequireDefault(__webpack_require__(140));

var _jstimezonedetect = _interopRequireDefault(__webpack_require__(141));

var _operators = __webpack_require__(144);

var _nativePromiseOnly = _interopRequireDefault(__webpack_require__(8));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Configure JsonLogic
_operators.lodashOperators.forEach(function (name) {
  return _jsonLogicJs.default.add_operation("_".concat(name), _lodash.default[name]);
}); // Retrieve Any Date


_jsonLogicJs.default.add_operation('getDate', function (date) {
  return (0, _momentTimezone.default)(date).toISOString();
}); // Set Relative Minimum Date


_jsonLogicJs.default.add_operation('relativeMinDate', function (relativeMinDate) {
  return (0, _momentTimezone.default)().subtract(relativeMinDate, 'days').toISOString();
}); // Set Relative Maximum Date


_jsonLogicJs.default.add_operation('relativeMaxDate', function (relativeMaxDate) {
  return (0, _momentTimezone.default)().add(relativeMaxDate, 'days').toISOString();
});

/**
 * Evaluate a method.
 *
 * @param func
 * @param args
 * @return {*}
 */
function evaluate(func, args, ret, tokenize) {
  var returnVal = null;
  var component = args.component ? args.component : {
    key: 'unknown'
  };

  if (!args.form && args.instance) {
    args.form = _lodash.default.get(args.instance, 'root._form', {});
  }

  if (typeof func === 'string') {
    if (ret) {
      func += ";return ".concat(ret);
    }

    var params = _lodash.default.keys(args);

    if (tokenize) {
      // Replace all {{ }} references with actual data.
      func = func.replace(/({{\s+(.*)\s+}})/, function (match, $1, $2) {
        if ($2.indexOf('data.') === 0) {
          return _lodash.default.get(args.data, $2.replace('data.', ''));
        } else if ($2.indexOf('row.') === 0) {
          return _lodash.default.get(args.row, $2.replace('row.', ''));
        } // Support legacy...


        return _lodash.default.get(args.data, $2);
      });
    }

    try {
      func = _construct(Function, _toConsumableArray(params).concat([func]));
      args = _lodash.default.values(args);
    } catch (err) {
      console.warn("An error occured within the custom function for ".concat(component.key), err);
      returnVal = null;
      func = false;
    }
  }

  if (typeof func === 'function') {
    try {
      returnVal = Array.isArray(args) ? func.apply(void 0, _toConsumableArray(args)) : func(args);
    } catch (err) {
      returnVal = null;
      console.warn("An error occured within custom function for ".concat(component.key), err);
    }
  } else if (_typeof(func) === 'object') {
    try {
      returnVal = _jsonLogicJs.default.apply(func, args);
    } catch (err) {
      returnVal = null;
      console.warn("An error occured within custom function for ".concat(component.key), err);
    }
  } else if (func) {
    console.warn("Unknown function type for ".concat(component.key));
  }

  return returnVal;
}

function getRandomComponentId() {
  return "e".concat(Math.random().toString(36).substring(7));
}
/**
 * Get a property value of an element.
 *
 * @param style
 * @param prop
 * @return {number}
 */


function getPropertyValue(style, prop) {
  var value = style.getPropertyValue(prop);
  value = value ? value.replace(/[^0-9.]/g, '') : '0';
  return parseFloat(value);
}
/**
 * Get an elements bounding rectagle.
 *
 * @param element
 * @return {{x: string, y: string, width: string, height: string}}
 */


function getElementRect(element) {
  var style = window.getComputedStyle(element, null);
  return {
    x: getPropertyValue(style, 'left'),
    y: getPropertyValue(style, 'top'),
    width: getPropertyValue(style, 'width'),
    height: getPropertyValue(style, 'height')
  };
}
/**
 * Determines the boolean value of a setting.
 *
 * @param value
 * @return {boolean}
 */


function boolValue(value) {
  if (_lodash.default.isBoolean(value)) {
    return value;
  } else if (_lodash.default.isString(value)) {
    return value.toLowerCase() === 'true';
  } else {
    return !!value;
  }
}
/**
 * Check to see if an ID is a mongoID.
 * @param text
 * @return {Array|{index: number, input: string}|Boolean|*}
 */


function isMongoId(text) {
  return text.toString().match(/^[0-9a-fA-F]{24}$/);
}
/**
 * Determine if a component is a layout component or not.
 *
 * @param {Object} component
 *   The component to check.
 *
 * @returns {Boolean}
 *   Whether or not the component is a layout component.
 */


function isLayoutComponent(component) {
  return Boolean(component.columns && Array.isArray(component.columns) || component.rows && Array.isArray(component.rows) || component.components && Array.isArray(component.components));
}
/**
 * Iterate through each component within a form.
 *
 * @param {Object} components
 *   The components to iterate.
 * @param {Function} fn
 *   The iteration function to invoke for each component.
 * @param {Boolean} includeAll
 *   Whether or not to include layout components.
 * @param {String} path
 *   The current data path of the element. Example: data.user.firstName
 * @param {Object} parent
 *   The parent object.
 */


function eachComponent(components, fn, includeAll, path, parent) {
  if (!components) return;
  path = path || '';
  components.forEach(function (component) {
    if (!component) {
      return;
    }

    var hasColumns = component.columns && Array.isArray(component.columns);
    var hasRows = component.rows && Array.isArray(component.rows);
    var hasComps = component.components && Array.isArray(component.components);
    var noRecurse = false;
    var newPath = component.key ? path ? "".concat(path, ".").concat(component.key) : component.key : ''; // Keep track of parent references.

    if (parent) {
      // Ensure we don't create infinite JSON structures.
      component.parent = _lodash.default.clone(parent);
      delete component.parent.components;
      delete component.parent.componentMap;
      delete component.parent.columns;
      delete component.parent.rows;
    }

    if (includeAll || component.tree || !hasColumns && !hasRows && !hasComps) {
      noRecurse = fn(component, newPath);
    }

    var subPath = function subPath() {
      if (component.key && !['panel', 'table', 'well', 'columns', 'fieldset', 'tabs', 'form'].includes(component.type) && (['datagrid', 'container', 'editgrid'].includes(component.type) || component.tree)) {
        return newPath;
      } else if (component.key && component.type === 'form') {
        return "".concat(newPath, ".data");
      }

      return path;
    };

    if (!noRecurse) {
      if (hasColumns) {
        component.columns.forEach(function (column) {
          return eachComponent(column.components, fn, includeAll, subPath(), parent ? component : null);
        });
      } else if (hasRows) {
        component.rows.forEach(function (row) {
          if (Array.isArray(row)) {
            row.forEach(function (column) {
              return eachComponent(column.components, fn, includeAll, subPath(), parent ? component : null);
            });
          }
        });
      } else if (hasComps) {
        eachComponent(component.components, fn, includeAll, subPath(), parent ? component : null);
      }
    }
  });
}
/**
 * Matches if a component matches the query.
 *
 * @param component
 * @param query
 * @return {boolean}
 */


function matchComponent(component, query) {
  if (_lodash.default.isString(query)) {
    return component.key === query;
  } else {
    var matches = false;

    _lodash.default.forOwn(query, function (value, key) {
      matches = _lodash.default.get(component, key) === value;

      if (!matches) {
        return false;
      }
    });

    return matches;
  }
}
/**
 * Get a component by its key
 *
 * @param {Object} components
 *   The components to iterate.
 * @param {String|Object} key
 *   The key of the component to get, or a query of the component to search.
 *
 * @returns {Object}
 *   The component that matches the given key, or undefined if not found.
 */


function getComponent(components, key, includeAll) {
  var result;
  eachComponent(components, function (component, path) {
    if (path === key) {
      component.path = path;
      result = component;
      return true;
    }
  }, includeAll);
  return result;
}
/**
 * Finds a component provided a query of properties of that component.
 *
 * @param components
 * @param query
 * @return {*}
 */


function findComponents(components, query) {
  var results = [];
  eachComponent(components, function (component, path) {
    if (matchComponent(component, query)) {
      component.path = path;
      results.push(component);
    }
  }, true);
  return results;
}
/**
 * Flatten the form components for data manipulation.
 *
 * @param {Object} components
 *   The components to iterate.
 * @param {Boolean} includeAll
 *   Whether or not to include layout components.
 *
 * @returns {Object}
 *   The flattened components map.
 */


function flattenComponents(components, includeAll) {
  var flattened = {};
  eachComponent(components, function (component, path) {
    flattened[path] = component;
  }, includeAll);
  return flattened;
}
/**
 * Returns if this component has a conditional statement.
 *
 * @param component - The component JSON schema.
 *
 * @returns {boolean} - TRUE - This component has a conditional, FALSE - No conditional provided.
 */


function hasCondition(component) {
  return Boolean(component.customConditional || component.conditional && component.conditional.when || component.conditional && component.conditional.json);
}
/**
 * Extension of standard #parseFloat(value) function, that also clears input string.
 *
 * @param {any} value
 *   The value to parse.
 *
 * @returns {Number}
 *   Parsed value.
 */


function parseFloatExt(value) {
  return parseFloat(_lodash.default.isString(value) ? value.replace(/[^\de.+-]/gi, '') : value);
}
/**
 * Formats provided value in way how Currency component uses it.
 *
 * @param {any} value
 *   The value to format.
 *
 * @returns {String}
 *   Value formatted for Currency component.
 */


function formatAsCurrency(value) {
  var parsedValue = parseFloatExt(value);

  if (_lodash.default.isNaN(parsedValue)) {
    return '';
  }

  var parts = _lodash.default.round(parsedValue, 2).toString().split('.');

  parts[0] = _lodash.default.chunk(Array.from(parts[0]).reverse(), 3).reverse().map(function (part) {
    return part.reverse().join('');
  }).join(',');
  parts[1] = _lodash.default.pad(parts[1], 2, '0');
  return parts.join('.');
}
/**
 * Escapes RegEx characters in provided String value.
 *
 * @param {String} value
 *   String for escaping RegEx characters.
 * @returns {string}
 *   String with escaped RegEx characters.
 */


function escapeRegExCharacters(value) {
  return value.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}
/**
 * Checks the calculated value for a provided component and data.
 *
 * @param {Object} component
 *   The component to check for the calculated value.
 * @param {Object} submission
 *   A submission object.
 * @param data
 *   The full submission data.
 */


function checkCalculated(component, submission, rowData) {
  // Process calculated value stuff if present.
  if (component.calculateValue) {
    _lodash.default.set(rowData, component.key, evaluate(component.calculateValue, {
      value: undefined,
      data: submission ? submission.data : rowData,
      row: rowData,
      util: this,
      component: component
    }, 'value'));
  }
}
/**
 * Check if a simple conditional evaluates to true.
 *
 * @param condition
 * @param condition
 * @param row
 * @param data
 * @returns {boolean}
 */


function checkSimpleConditional(component, condition, row, data) {
  var value = null;

  if (row) {
    value = getValue({
      data: row
    }, condition.when);
  }

  if (data && _lodash.default.isNil(value)) {
    value = getValue({
      data: data
    }, condition.when);
  } // FOR-400 - Fix issue where falsey values were being evaluated as show=true


  if (_lodash.default.isNil(value)) {
    value = '';
  }

  var eq = String(condition.eq);
  var show = String(condition.show); // Special check for selectboxes component.

  if (_lodash.default.isObject(value) && _lodash.default.has(value, condition.eq)) {
    return String(value[condition.eq]) === show;
  } // FOR-179 - Check for multiple values.


  if (Array.isArray(value) && value.map(String).includes(eq)) {
    return show === 'true';
  }

  return String(value) === eq === (show === 'true');
}
/**
 * Check custom javascript conditional.
 *
 * @param component
 * @param custom
 * @param row
 * @param data
 * @returns {*}
 */


function checkCustomConditional(component, custom, row, data, form, variable, onError, instance) {
  if (typeof custom === 'string') {
    custom = "var ".concat(variable, " = true; ").concat(custom, "; return ").concat(variable, ";");
  }

  var value = instance && instance.evaluate ? instance.evaluate(custom) : evaluate(custom, {
    row: row,
    data: data,
    form: form
  });

  if (value === null) {
    return onError;
  }

  return value;
}

function checkJsonConditional(component, json, row, data, form, onError) {
  try {
    return _jsonLogicJs.default.apply(json, {
      data: data,
      row: row,
      form: form,
      _: _lodash.default
    });
  } catch (err) {
    console.warn("An error occurred in jsonLogic advanced condition for ".concat(component.key), err);
    return onError;
  }
}
/**
 * Checks the conditions for a provided component and data.
 *
 * @param component
 *   The component to check for the condition.
 * @param row
 *   The data within a row
 * @param data
 *   The full submission data.
 *
 * @returns {boolean}
 */


function checkCondition(component, row, data, form, instance) {
  if (component.customConditional) {
    return checkCustomConditional(component, component.customConditional, row, data, form, 'show', true, instance);
  } else if (component.conditional && component.conditional.when) {
    return checkSimpleConditional(component, component.conditional, row, data, true);
  } else if (component.conditional && component.conditional.json) {
    return checkJsonConditional(component, component.conditional.json, row, data, form, instance);
  } // Default to show.


  return true;
}
/**
 * Test a trigger on a component.
 *
 * @param component
 * @param action
 * @param data
 * @param row
 * @returns {mixed}
 */


function checkTrigger(component, trigger, row, data, form, instance) {
  switch (trigger.type) {
    case 'simple':
      return checkSimpleConditional(component, trigger.simple, row, data);

    case 'javascript':
      return checkCustomConditional(component, trigger.javascript, row, data, form, 'result', false, instance);

    case 'json':
      return checkJsonConditional(component, trigger.json, row, data, form, false);
  } // If none of the types matched, don't fire the trigger.


  return false;
}

function setActionProperty(component, action, row, data, result, instance) {
  switch (action.property.type) {
    case 'boolean':
      if (_lodash.default.get(component, action.property.value, false).toString() !== action.state.toString()) {
        _lodash.default.set(component, action.property.value, action.state.toString() === 'true');
      }

      break;

    case 'string':
      {
        var evalData = {
          data: data,
          row: row,
          component: component,
          result: result
        };
        var newValue = instance && instance.interpolate ? instance.interpolate(action.text, evalData) : interpolate(action.text, evalData);

        if (newValue !== _lodash.default.get(component, action.property.value, '')) {
          _lodash.default.set(component, action.property.value, newValue);
        }

        break;
      }
  }

  return component;
}
/**
 * Get the value for a component key, in the given submission.
 *
 * @param {Object} submission
 *   A submission object to search.
 * @param {String} key
 *   A for components API key to search for.
 */


function getValue(submission, key) {
  var search = function search(data) {
    if (_lodash.default.isPlainObject(data)) {
      if (_lodash.default.has(data, key)) {
        return data[key];
      }

      var value = null;

      _lodash.default.forOwn(data, function (prop) {
        var result = search(prop);

        if (!_lodash.default.isNil(result)) {
          value = result;
          return false;
        }
      });

      return value;
    } else {
      return null;
    }
  };

  return search(submission.data);
}
/**
 * Interpolate a string and add data replacements.
 *
 * @param string
 * @param data
 * @returns {XML|string|*|void}
 */


function interpolate(string, data) {
  var templateSettings = {
    evaluate: /\{%(.+?)%\}/g,
    interpolate: /\{\{(.+?)\}\}/g,
    escape: /\{\{\{(.+?)\}\}\}/g
  };

  try {
    return _lodash.default.template(string, templateSettings)(data);
  } catch (err) {
    console.warn('Error interpolating template', err, string, data);
  }
}
/**
 * Make a filename guaranteed to be unique.
 * @param name
 * @returns {string}
 */


function uniqueName(name) {
  var parts = name.toLowerCase().replace(/[^0-9a-z.]/g, '').split('.');
  var fileName = parts[0];
  var ext = parts.length > 1 ? ".".concat(_lodash.default.last(parts)) : '';
  return "".concat(fileName.substr(0, 10), "-").concat(guid()).concat(ext);
}

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
/**
 * Return a translated date setting.
 *
 * @param date
 * @return {*}
 */


function getDateSetting(date) {
  if (_lodash.default.isNil(date) || _lodash.default.isNaN(date) || date === '') {
    return null;
  }

  if (date instanceof Date) {
    return date;
  } else if (typeof date.toDate === 'function') {
    return date.isValid() ? date.toDate() : null;
  }

  var dateSetting = typeof date !== 'string' || date.indexOf('moment(') === -1 ? (0, _momentTimezone.default)(date) : null;

  if (dateSetting && dateSetting.isValid()) {
    return dateSetting.toDate();
  }

  dateSetting = null;

  try {
    var value = new Function('moment', "return ".concat(date, ";"))(_momentTimezone.default);

    if (typeof value === 'string') {
      dateSetting = (0, _momentTimezone.default)(value);
    } else if (typeof value.toDate === 'function') {
      dateSetting = (0, _momentTimezone.default)(value.toDate().toUTCString());
    } else if (value instanceof Date) {
      dateSetting = (0, _momentTimezone.default)(value);
    }
  } catch (e) {
    return null;
  }

  if (!dateSetting) {
    return null;
  } // Ensure this is a date.


  if (!dateSetting.isValid()) {
    return null;
  }

  return dateSetting.toDate();
}

function isValidDate(date) {
  return _lodash.default.isDate(date) && !_lodash.default.isNaN(date.getDate());
}
/**
 * Get the current timezone string.
 *
 * @return {string}
 */


function currentTimezone() {
  if (_momentTimezone.default.currentTimezone) {
    return _momentTimezone.default.currentTimezone;
  }

  _momentTimezone.default.currentTimezone = _jstimezonedetect.default.determine().name();
  return _momentTimezone.default.currentTimezone;
}
/**
 * Get an offset date provided a date object and timezone object.
 *
 * @param date
 * @param timezone
 * @return {Date}
 */


function offsetDate(date, timezone) {
  if (timezone === 'UTC') {
    return {
      date: new Date(date.getTime() + date.getTimezoneOffset() * 60000),
      abbr: 'UTC'
    };
  }

  var dateMoment = (0, _momentTimezone.default)(date).tz(timezone);
  return {
    date: new Date(date.getTime() + (dateMoment.utcOffset() + date.getTimezoneOffset()) * 60000),
    abbr: dateMoment.format('z')
  };
}
/**
 * Externally load the timezone data.
 *
 * @return {Promise<any> | *}
 */


function loadZones(timezone) {
  if (timezone === currentTimezone()) {
    // Return non-resolving promise.
    return new _nativePromiseOnly.default(_lodash.default.noop);
  }

  if (timezone === 'UTC') {
    // Return non-resolving promise.
    return new _nativePromiseOnly.default(_lodash.default.noop);
  }

  if (_momentTimezone.default.zonesPromise) {
    return _momentTimezone.default.zonesPromise;
  }

  return _momentTimezone.default.zonesPromise = fetch('https://cdn.rawgit.com/moment/moment-timezone/develop/data/packed/latest.json').then(function (resp) {
    return resp.json().then(function (zones) {
      _momentTimezone.default.tz.load(zones);

      _momentTimezone.default.zonesLoaded = true;
    });
  });
}
/**
 * Set the timezone text and replace once timezones have loaded.
 *
 * @param offsetFormat
 * @param stdFormat
 * @return {*}
 */


function timezoneText(offsetFormat, stdFormat) {
  loadZones();

  if (_momentTimezone.default.zonesLoaded) {
    return offsetFormat();
  }

  var id = getRandomComponentId();
  var tries = 0;

  _momentTimezone.default.zonesPromise.then(function replaceZone() {
    var element = document.getElementById(id);

    if (element) {
      element.innerHTML = offsetFormat();
    } else if (tries++ < 5) {
      setTimeout(replaceZone, 100);
    }
  }); // For now just return the current format, and replace once zones are loaded.


  return "<span id='".concat(id, "'>").concat(stdFormat(), "</span>");
}
/**
 * Format a date provided a value, format, and timezone object.
 *
 * @param value
 * @param format
 * @param timezone
 * @return {string}
 */


function formatDate(value, format, timezone) {
  var momentDate = (0, _momentTimezone.default)(value);

  if (timezone === currentTimezone()) {
    // See if our format contains a "z" timezone character.
    if (format.match(/\s(z$|z\s)/)) {
      // Return the timezoneText.
      return timezoneText(function () {
        return momentDate.tz(timezone).format(convertFormatToMoment(format));
      }, function () {
        return momentDate.format(convertFormatToMoment(format.replace(/\s(z$|z\s)/, '')));
      });
    } // Return the standard format.


    return momentDate.format(convertFormatToMoment(format));
  }

  if (timezone === 'UTC') {
    var offset = offsetDate(momentDate.toDate(), 'UTC');
    return "".concat((0, _momentTimezone.default)(offset.date).format(convertFormatToMoment(format)), " UTC");
  } // Return the timezoneText.


  return timezoneText(function () {
    return momentDate.tz(timezone).format("".concat(convertFormatToMoment(format), " z"));
  }, function () {
    return momentDate.format(convertFormatToMoment(format));
  });
}
/**
 * Pass a format function to format within a timezone.
 *
 * @param formatFn
 * @param date
 * @param format
 * @param timezone
 * @return {string}
 */


function formatOffset(formatFn, date, format, timezone) {
  if (timezone === currentTimezone()) {
    return formatFn(date, format);
  }

  if (timezone === 'UTC') {
    return "".concat(formatFn(offsetDate(date, 'UTC').date, format), " UTC");
  } // Return the timezone text.


  return timezoneText(function () {
    var offset = offsetDate(date, timezone);
    return "".concat(formatFn(offset.date, format), " ").concat(offset.abbr);
  }, function () {
    return formatFn(date, format);
  });
}

function getLocaleDateFormatInfo(locale) {
  var formatInfo = {};
  var day = 21;
  var exampleDate = new Date(2017, 11, day);
  var localDateString = exampleDate.toLocaleDateString(locale);
  formatInfo.dayFirst = localDateString.slice(0, 2) === day.toString();
  return formatInfo;
}
/**
 * Convert the format from the angular-datepicker module to flatpickr format.
 * @param format
 * @return {string}
 */


function convertFormatToFlatpickr(format) {
  return format // Remove the Z timezone offset, not supported by flatpickr.
  .replace(/Z/g, '') // Year conversion.
  .replace(/y/g, 'Y').replace('YYYY', 'Y').replace('YY', 'y') // Month conversion.
  .replace('MMMM', 'F').replace(/M/g, 'n').replace('nnn', 'M').replace('nn', 'm') // Day in month.
  .replace(/d/g, 'j').replace(/jj/g, 'd') // Day in week.
  .replace('EEEE', 'l').replace('EEE', 'D') // Hours, minutes, seconds
  .replace('HH', 'H').replace('hh', 'h').replace('mm', 'i').replace('ss', 'S').replace(/a/g, 'K');
}
/**
 * Convert the format from the angular-datepicker module to moment format.
 * @param format
 * @return {string}
 */


function convertFormatToMoment(format) {
  return format // Year conversion.
  .replace(/y/g, 'Y') // Day in month.
  .replace(/d/g, 'D') // Day in week.
  .replace(/E/g, 'd') // AM/PM marker
  .replace(/a/g, 'A');
}

function convertFormatToMask(format) {
  return format // Short and long month replacement.
  .replace(/(MMM|MMMM)/g, 'MM') // Year conversion
  .replace(/[ydhmsHM]/g, '9') // AM/PM conversion
  .replace(/a/g, 'AA');
}
/**
 * Returns an input mask that is compatible with the input mask library.
 * @param {string} mask - The Form.io input mask.
 * @returns {Array} - The input mask for the mask library.
 */


function getInputMask(mask) {
  if (mask instanceof Array) {
    return mask;
  }

  var maskArray = [];
  maskArray.numeric = true;

  for (var i = 0; i < mask.length; i++) {
    switch (mask[i]) {
      case '9':
        maskArray.push(/\d/);
        break;

      case 'A':
        maskArray.numeric = false;
        maskArray.push(/[a-zA-Z]/);
        break;

      case 'a':
        maskArray.numeric = false;
        maskArray.push(/[a-z]/);
        break;

      case '*':
        maskArray.numeric = false;
        maskArray.push(/[a-zA-Z0-9]/);
        break;

      default:
        maskArray.push(mask[i]);
        break;
    }
  }

  return maskArray;
}

function matchInputMask(value, inputMask) {
  if (!inputMask) {
    return true;
  }

  for (var i = 0; i < inputMask.length; i++) {
    var char = value[i];
    var charPart = inputMask[i];

    if (!(_lodash.default.isRegExp(charPart) && charPart.test(char) || charPart === char)) {
      return false;
    }
  }

  return true;
}

function getNumberSeparators() {
  var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';
  var formattedNumberString = 12345.6789.toLocaleString(lang);
  var delimeters = formattedNumberString.match(/..(.)...(.)../);

  if (!delimeters) {
    return {
      delimiter: ',',
      decimalSeparator: '.'
    };
  }

  return {
    delimiter: delimeters.length > 1 ? delimeters[1] : ',',
    decimalSeparator: delimeters.length > 2 ? delimeters[2] : '.'
  };
}

function getNumberDecimalLimit(component) {
  // Determine the decimal limit. Defaults to 20 but can be overridden by validate.step or decimalLimit settings.
  var decimalLimit = 20;

  var step = _lodash.default.get(component, 'validate.step', 'any');

  if (step !== 'any') {
    var parts = step.toString().split('.');

    if (parts.length > 1) {
      decimalLimit = parts[1].length;
    }
  }

  return decimalLimit;
}

function getCurrencyAffixes(_ref) {
  var _ref$currency = _ref.currency,
      currency = _ref$currency === void 0 ? 'USD' : _ref$currency,
      decimalLimit = _ref.decimalLimit,
      decimalSeparator = _ref.decimalSeparator,
      lang = _ref.lang;
  // Get the prefix and suffix from the localized string.
  var regex = '(.*)?100';

  if (decimalLimit) {
    regex += "".concat(decimalSeparator === '.' ? '\\.' : decimalSeparator, "0{").concat(decimalLimit, "}");
  }

  regex += '(.*)?';
  var parts = 100 .toLocaleString(lang, {
    style: 'currency',
    currency: currency,
    useGrouping: true,
    maximumFractionDigits: decimalLimit,
    minimumFractionDigits: decimalLimit
  }).replace('.', decimalSeparator).match(new RegExp(regex));
  return {
    prefix: parts[1] || '',
    suffix: parts[2] || ''
  };
}
/**
 * Fetch the field data provided a component.
 *
 * @param data
 * @param component
 * @return {*}
 */


function fieldData(data, component) {
  if (!data) {
    return '';
  }

  if (!component || !component.key) {
    return data;
  }

  if (component.key.includes('.')) {
    var value = data;
    var parts = component.key.split('.');
    var key = '';

    for (var i = 0; i < parts.length; i++) {
      key = parts[i]; // Handle nested resources

      if (value.hasOwnProperty('_id')) {
        value = value.data;
      } // Return if the key is not found on the value.


      if (!value.hasOwnProperty(key)) {
        return;
      } // Convert old single field data in submissions to multiple


      if (key === parts[parts.length - 1] && component.multiple && !Array.isArray(value[key])) {
        value[key] = [value[key]];
      } // Set the value of this key.


      value = value[key];
    }

    return value;
  } else {
    // Convert old single field data in submissions to multiple
    if (component.multiple && !Array.isArray(data[component.key])) {
      data[component.key] = [data[component.key]];
    }

    return data[component.key];
  }
}
/**
 * Delays function execution with possibility to execute function synchronously or cancel it.
 *
 * @param fn Function to delay
 * @param delay Delay time
 * @return {*}
 */


function delay(fn) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var timer = setTimeout.apply(void 0, [fn, delay].concat(args));

  function cancel() {
    clearTimeout(timer);
  }

  function earlyCall() {
    cancel();
    return fn.apply(void 0, args);
  }

  earlyCall.timer = timer;
  earlyCall.cancel = cancel;
  return earlyCall;
}
/**
 * Iterate the given key to make it unique.
 *
 * @param {String} key
 *   Modify the component key to be unique.
 *
 * @returns {String}
 *   The new component key.
 */


function iterateKey(key) {
  if (!key.match(/(\d+)$/)) {
    return "".concat(key, "2");
  }

  return key.replace(/(\d+)$/, function (suffix) {
    return Number(suffix) + 1;
  });
}
/**
 * Determines a unique key within a map provided the base key.
 *
 * @param map
 * @param base
 * @return {*}
 */


function uniqueKey(map, base) {
  var newKey = base;

  while (map.hasOwnProperty(newKey)) {
    newKey = iterateKey(newKey);
  }

  return newKey;
}
/**
 * Determines the major version number of bootstrap.
 *
 * @return {number}
 */


function bootstrapVersion() {
  if (typeof $ === 'function' && typeof $().collapse === 'function') {
    return parseInt($.fn.collapse.Constructor.VERSION.split('.')[0], 10);
  }

  return 0;
}

/***/ }),
/* 138 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__138__;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* globals define,module */
/*
Using a Universal Module Loader that should be browser, require, and AMD friendly
http://ricostacruz.com/cheatsheets/umdjs.html
*/
;(function(root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(this, function() {
  "use strict";
  /* globals console:false */

  if ( ! Array.isArray) {
    Array.isArray = function(arg) {
      return Object.prototype.toString.call(arg) === "[object Array]";
    };
  }

  /**
   * Return an array that contains no duplicates (original not modified)
   * @param  {array} array   Original reference array
   * @return {array}         New array with no duplicates
   */
  function arrayUnique(array) {
    var a = [];
    for (var i=0, l=array.length; i<l; i++) {
      if (a.indexOf(array[i]) === -1) {
        a.push(array[i]);
      }
    }
    return a;
  }

  var jsonLogic = {};
  var operations = {
    "==": function(a, b) {
      return a == b;
    },
    "===": function(a, b) {
      return a === b;
    },
    "!=": function(a, b) {
      return a != b;
    },
    "!==": function(a, b) {
      return a !== b;
    },
    ">": function(a, b) {
      return a > b;
    },
    ">=": function(a, b) {
      return a >= b;
    },
    "<": function(a, b, c) {
      return (c === undefined) ? a < b : (a < b) && (b < c);
    },
    "<=": function(a, b, c) {
      return (c === undefined) ? a <= b : (a <= b) && (b <= c);
    },
    "!!": function(a) {
      return jsonLogic.truthy(a);
    },
    "!": function(a) {
      return !jsonLogic.truthy(a);
    },
    "%": function(a, b) {
      return a % b;
    },
    "log": function(a) {
      console.log(a); return a;
    },
    "in": function(a, b) {
      if(!b || typeof b.indexOf === "undefined") return false;
      return (b.indexOf(a) !== -1);
    },
    "cat": function() {
      return Array.prototype.join.call(arguments, "");
    },
    "substr":function(source, start, end) {
      if(end < 0){
        // JavaScript doesn't support negative end, this emulates PHP behavior
        var temp = String(source).substr(start);
        return temp.substr(0, temp.length + end);
      }
      return String(source).substr(start, end);
    },
    "+": function() {
      return Array.prototype.reduce.call(arguments, function(a, b) {
        return parseFloat(a, 10) + parseFloat(b, 10);
      }, 0);
    },
    "*": function() {
      return Array.prototype.reduce.call(arguments, function(a, b) {
        return parseFloat(a, 10) * parseFloat(b, 10);
      });
    },
    "-": function(a, b) {
      if(b === undefined) {
        return -a;
      }else{
        return a - b;
      }
    },
    "/": function(a, b) {
      return a / b;
    },
    "min": function() {
      return Math.min.apply(this, arguments);
    },
    "max": function() {
      return Math.max.apply(this, arguments);
    },
    "merge": function() {
      return Array.prototype.reduce.call(arguments, function(a, b) {
        return a.concat(b);
      }, []);
    },
    "var": function(a, b) {
      var not_found = (b === undefined) ? null : b;
      var data = this;
      if(typeof a === "undefined" || a==="" || a===null) {
        return data;
      }
      var sub_props = String(a).split(".");
      for(var i = 0; i < sub_props.length; i++) {
        if(data === null) {
          return not_found;
        }
        // Descending into data
        data = data[sub_props[i]];
        if(data === undefined) {
          return not_found;
        }
      }
      return data;
    },
    "missing": function() {
      /*
      Missing can receive many keys as many arguments, like {"missing:[1,2]}
      Missing can also receive *one* argument that is an array of keys,
      which typically happens if it's actually acting on the output of another command
      (like 'if' or 'merge')
      */

      var missing = [];
      var keys = Array.isArray(arguments[0]) ? arguments[0] : arguments;

      for(var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = jsonLogic.apply({"var": key}, this);
        if(value === null || value === "") {
          missing.push(key);
        }
      }

      return missing;
    },
    "missing_some": function(need_count, options) {
      // missing_some takes two arguments, how many (minimum) items must be present, and an array of keys (just like 'missing') to check for presence.
      var are_missing = jsonLogic.apply({"missing": options}, this);

      if(options.length - are_missing.length >= need_count) {
        return [];
      }else{
        return are_missing;
      }
    },
    "method": function(obj, method, args) {
      return obj[method].apply(obj, args);
    },

  };

  jsonLogic.is_logic = function(logic) {
    return (
      typeof logic === "object" && // An object
      logic !== null && // but not null
      ! Array.isArray(logic) && // and not an array
      Object.keys(logic).length === 1 // with exactly one key
    );
  };

  /*
  This helper will defer to the JsonLogic spec as a tie-breaker when different language interpreters define different behavior for the truthiness of primitives.  E.g., PHP considers empty arrays to be falsy, but Javascript considers them to be truthy. JsonLogic, as an ecosystem, needs one consistent answer.

  Spec and rationale here: http://jsonlogic.com/truthy
  */
  jsonLogic.truthy = function(value) {
    if(Array.isArray(value) && value.length === 0) {
      return false;
    }
    return !! value;
  };


  jsonLogic.get_operator = function(logic) {
    return Object.keys(logic)[0];
  };

  jsonLogic.get_values = function(logic) {
    return logic[jsonLogic.get_operator(logic)];
  };

  jsonLogic.apply = function(logic, data) {
    // Does this array contain logic? Only one way to find out.
    if(Array.isArray(logic)) {
      return logic.map(function(l) {
        return jsonLogic.apply(l, data);
      });
    }
    // You've recursed to a primitive, stop!
    if( ! jsonLogic.is_logic(logic) ) {
      return logic;
    }

    data = data || {};

    var op = jsonLogic.get_operator(logic);
    var values = logic[op];
    var i;
    var current;
    var scopedLogic, scopedData, filtered, initial;

    // easy syntax for unary operators, like {"var" : "x"} instead of strict {"var" : ["x"]}
    if( ! Array.isArray(values)) {
      values = [values];
    }

    // 'if', 'and', and 'or' violate the normal rule of depth-first calculating consequents, let each manage recursion as needed.
    if(op === "if" || op == "?:") {
      /* 'if' should be called with a odd number of parameters, 3 or greater
      This works on the pattern:
      if( 0 ){ 1 }else{ 2 };
      if( 0 ){ 1 }else if( 2 ){ 3 }else{ 4 };
      if( 0 ){ 1 }else if( 2 ){ 3 }else if( 4 ){ 5 }else{ 6 };

      The implementation is:
      For pairs of values (0,1 then 2,3 then 4,5 etc)
      If the first evaluates truthy, evaluate and return the second
      If the first evaluates falsy, jump to the next pair (e.g, 0,1 to 2,3)
      given one parameter, evaluate and return it. (it's an Else and all the If/ElseIf were false)
      given 0 parameters, return NULL (not great practice, but there was no Else)
      */
      for(i = 0; i < values.length - 1; i += 2) {
        if( jsonLogic.truthy( jsonLogic.apply(values[i], data) ) ) {
          return jsonLogic.apply(values[i+1], data);
        }
      }
      if(values.length === i+1) return jsonLogic.apply(values[i], data);
      return null;
    }else if(op === "and") { // Return first falsy, or last
      for(i=0; i < values.length; i+=1) {
        current = jsonLogic.apply(values[i], data);
        if( ! jsonLogic.truthy(current)) {
          return current;
        }
      }
      return current; // Last
    }else if(op === "or") {// Return first truthy, or last
      for(i=0; i < values.length; i+=1) {
        current = jsonLogic.apply(values[i], data);
        if( jsonLogic.truthy(current) ) {
          return current;
        }
      }
      return current; // Last




    }else if(op === 'filter'){
      scopedData = jsonLogic.apply(values[0], data);
      scopedLogic = values[1];

      if ( ! Array.isArray(scopedData)) {
          return [];
      }
      // Return only the elements from the array in the first argument,
      // that return truthy when passed to the logic in the second argument.
      // For parity with JavaScript, reindex the returned array
      return scopedData.filter(function(datum){
          return jsonLogic.truthy( jsonLogic.apply(scopedLogic, datum));
      });
  }else if(op === 'map'){
      scopedData = jsonLogic.apply(values[0], data);
      scopedLogic = values[1];

      if ( ! Array.isArray(scopedData)) {
          return [];
      }

      return scopedData.map(function(datum){
          return jsonLogic.apply(scopedLogic, datum);
      });

  }else if(op === 'reduce'){
      scopedData = jsonLogic.apply(values[0], data);
      scopedLogic = values[1];
      initial = typeof values[2] !== 'undefined' ? values[2] : null;

      if ( ! Array.isArray(scopedData)) {
          return initial;
      }

      return scopedData.reduce(
          function(accumulator, current){
              return jsonLogic.apply(
                  scopedLogic,
                  {'current':current, 'accumulator':accumulator}
              );
          },
          initial
      );

    }else if(op === "all") {
      scopedData = jsonLogic.apply(values[0], data);
      scopedLogic = values[1];
      // All of an empty set is false. Note, some and none have correct fallback after the for loop
      if( ! scopedData.length) {
        return false;
      }
      for(i=0; i < scopedData.length; i+=1) {
        if( ! jsonLogic.truthy( jsonLogic.apply(scopedLogic, scopedData[i]) )) {
          return false; // First falsy, short circuit
        }
      }
      return true; // All were truthy
    }else if(op === "none") {
      filtered = jsonLogic.apply({'filter' : values}, data);
      return filtered.length === 0;

    }else if(op === "some") {
      filtered = jsonLogic.apply({'filter' : values}, data);
      return filtered.length > 0;
    }

    // Everyone else gets immediate depth-first recursion
    values = values.map(function(val) {
      return jsonLogic.apply(val, data);
    });


    // The operation is called with "data" bound to its "this" and "values" passed as arguments.
    // Structured commands like % or > can name formal arguments while flexible commands (like missing or merge) can operate on the pseudo-array arguments
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
    if(typeof operations[op] === "function") {
      return operations[op].apply(data, values);
    }else if(op.indexOf(".") > 0) { // Contains a dot, and not in the 0th position
      var sub_ops = String(op).split(".");
      var operation = operations;
      for(i = 0; i < sub_ops.length; i++) {
        // Descending into operations
        operation = operation[sub_ops[i]];
        if(operation === undefined) {
          throw new Error("Unrecognized operation " + op +
          " (failed at " + sub_ops.slice(0, i+1).join(".") + ")");
        }
      }

      return operation.apply(data, values);
    }

    throw new Error("Unrecognized operation " + op );
  };

  jsonLogic.uses_data = function(logic) {
    var collection = [];

    if( jsonLogic.is_logic(logic) ) {
      var op = jsonLogic.get_operator(logic);
      var values = logic[op];

      if( ! Array.isArray(values)) {
        values = [values];
      }

      if(op === "var") {
        // This doesn't cover the case where the arg to var is itself a rule.
        collection.push(values[0]);
      }else{
        // Recursion!
        values.map(function(val) {
          collection.push.apply(collection, jsonLogic.uses_data(val) );
        });
      }
    }

    return arrayUnique(collection);
  };

  jsonLogic.add_operation = function(name, code) {
    operations[name] = code;
  };

  jsonLogic.rm_operation = function(name) {
    delete operations[name];
  };

  jsonLogic.rule_like = function(rule, pattern) {
    // console.log("Is ". JSON.stringify(rule) . " like " . JSON.stringify(pattern) . "?");
    if(pattern === rule) {
      return true;
    } // TODO : Deep object equivalency?
    if(pattern === "@") {
      return true;
    } // Wildcard!
    if(pattern === "number") {
      return (typeof rule === "number");
    }
    if(pattern === "string") {
      return (typeof rule === "string");
    }
    if(pattern === "array") {
      // !logic test might be superfluous in JavaScript
      return Array.isArray(rule) && ! jsonLogic.is_logic(rule);
    }

    if(jsonLogic.is_logic(pattern)) {
      if(jsonLogic.is_logic(rule)) {
        var pattern_op = jsonLogic.get_operator(pattern);
        var rule_op = jsonLogic.get_operator(rule);

        if(pattern_op === "@" || pattern_op === rule_op) {
        // echo "\nOperators match, go deeper\n";
          return jsonLogic.rule_like(
            jsonLogic.get_values(rule, false),
            jsonLogic.get_values(pattern, false)
          );
        }
      }
      return false; // pattern is logic, rule isn't, can't be eq
    }

    if(Array.isArray(pattern)) {
      if(Array.isArray(rule)) {
        if(pattern.length !== rule.length) {
          return false;
        }
        /*
          Note, array order MATTERS, because we're using this array test logic to consider arguments, where order can matter. (e.g., + is commutative, but '-' or 'if' or 'var' are NOT)
        */
        for(var i = 0; i < pattern.length; i += 1) {
          // If any fail, we fail
          if( ! jsonLogic.rule_like(rule[i], pattern[i])) {
            return false;
          }
        }
        return true; // If they *all* passed, we pass
      }else{
        return false; // Pattern is array, rule isn't
      }
    }

    // Not logic, not array, not a === match for rule.
    return false;
  };

  return jsonLogic;
}));


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//! moment-timezone.js
//! version : 0.5.21
//! Copyright (c) JS Foundation and other contributors
//! license : MIT
//! github.com/moment/moment-timezone

(function (root, factory) {
	"use strict";

	/*global define*/
	if (typeof module === 'object' && module.exports) {
		module.exports = factory(__webpack_require__(1)); // Node
	} else if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));                 // AMD
	} else {}
}(this, function (moment) {
	"use strict";

	// Do not load moment-timezone a second time.
	// if (moment.tz !== undefined) {
	// 	logError('Moment Timezone ' + moment.tz.version + ' was already loaded ' + (moment.tz.dataVersion ? 'with data from ' : 'without any data') + moment.tz.dataVersion);
	// 	return moment;
	// }

	var VERSION = "0.5.21",
		zones = {},
		links = {},
		names = {},
		guesses = {},
		cachedGuess;

	if (!moment || typeof moment.version !== 'string') {
		logError('Moment Timezone requires Moment.js. See https://momentjs.com/timezone/docs/#/use-it/browser/');
	}

	var momentVersion = moment.version.split('.'),
		major = +momentVersion[0],
		minor = +momentVersion[1];

	// Moment.js version check
	if (major < 2 || (major === 2 && minor < 6)) {
		logError('Moment Timezone requires Moment.js >= 2.6.0. You are using Moment.js ' + moment.version + '. See momentjs.com');
	}

	/************************************
		Unpacking
	************************************/

	function charCodeToInt(charCode) {
		if (charCode > 96) {
			return charCode - 87;
		} else if (charCode > 64) {
			return charCode - 29;
		}
		return charCode - 48;
	}

	function unpackBase60(string) {
		var i = 0,
			parts = string.split('.'),
			whole = parts[0],
			fractional = parts[1] || '',
			multiplier = 1,
			num,
			out = 0,
			sign = 1;

		// handle negative numbers
		if (string.charCodeAt(0) === 45) {
			i = 1;
			sign = -1;
		}

		// handle digits before the decimal
		for (i; i < whole.length; i++) {
			num = charCodeToInt(whole.charCodeAt(i));
			out = 60 * out + num;
		}

		// handle digits after the decimal
		for (i = 0; i < fractional.length; i++) {
			multiplier = multiplier / 60;
			num = charCodeToInt(fractional.charCodeAt(i));
			out += num * multiplier;
		}

		return out * sign;
	}

	function arrayToInt (array) {
		for (var i = 0; i < array.length; i++) {
			array[i] = unpackBase60(array[i]);
		}
	}

	function intToUntil (array, length) {
		for (var i = 0; i < length; i++) {
			array[i] = Math.round((array[i - 1] || 0) + (array[i] * 60000)); // minutes to milliseconds
		}

		array[length - 1] = Infinity;
	}

	function mapIndices (source, indices) {
		var out = [], i;

		for (i = 0; i < indices.length; i++) {
			out[i] = source[indices[i]];
		}

		return out;
	}

	function unpack (string) {
		var data = string.split('|'),
			offsets = data[2].split(' '),
			indices = data[3].split(''),
			untils  = data[4].split(' ');

		arrayToInt(offsets);
		arrayToInt(indices);
		arrayToInt(untils);

		intToUntil(untils, indices.length);

		return {
			name       : data[0],
			abbrs      : mapIndices(data[1].split(' '), indices),
			offsets    : mapIndices(offsets, indices),
			untils     : untils,
			population : data[5] | 0
		};
	}

	/************************************
		Zone object
	************************************/

	function Zone (packedString) {
		if (packedString) {
			this._set(unpack(packedString));
		}
	}

	Zone.prototype = {
		_set : function (unpacked) {
			this.name       = unpacked.name;
			this.abbrs      = unpacked.abbrs;
			this.untils     = unpacked.untils;
			this.offsets    = unpacked.offsets;
			this.population = unpacked.population;
		},

		_index : function (timestamp) {
			var target = +timestamp,
				untils = this.untils,
				i;

			for (i = 0; i < untils.length; i++) {
				if (target < untils[i]) {
					return i;
				}
			}
		},

		parse : function (timestamp) {
			var target  = +timestamp,
				offsets = this.offsets,
				untils  = this.untils,
				max     = untils.length - 1,
				offset, offsetNext, offsetPrev, i;

			for (i = 0; i < max; i++) {
				offset     = offsets[i];
				offsetNext = offsets[i + 1];
				offsetPrev = offsets[i ? i - 1 : i];

				if (offset < offsetNext && tz.moveAmbiguousForward) {
					offset = offsetNext;
				} else if (offset > offsetPrev && tz.moveInvalidForward) {
					offset = offsetPrev;
				}

				if (target < untils[i] - (offset * 60000)) {
					return offsets[i];
				}
			}

			return offsets[max];
		},

		abbr : function (mom) {
			return this.abbrs[this._index(mom)];
		},

		offset : function (mom) {
			logError("zone.offset has been deprecated in favor of zone.utcOffset");
			return this.offsets[this._index(mom)];
		},

		utcOffset : function (mom) {
			return this.offsets[this._index(mom)];
		}
	};

	/************************************
		Current Timezone
	************************************/

	function OffsetAt(at) {
		var timeString = at.toTimeString();
		var abbr = timeString.match(/\([a-z ]+\)/i);
		if (abbr && abbr[0]) {
			// 17:56:31 GMT-0600 (CST)
			// 17:56:31 GMT-0600 (Central Standard Time)
			abbr = abbr[0].match(/[A-Z]/g);
			abbr = abbr ? abbr.join('') : undefined;
		} else {
			// 17:56:31 CST
			// 17:56:31 GMT+0800 (台北標準時間)
			abbr = timeString.match(/[A-Z]{3,5}/g);
			abbr = abbr ? abbr[0] : undefined;
		}

		if (abbr === 'GMT') {
			abbr = undefined;
		}

		this.at = +at;
		this.abbr = abbr;
		this.offset = at.getTimezoneOffset();
	}

	function ZoneScore(zone) {
		this.zone = zone;
		this.offsetScore = 0;
		this.abbrScore = 0;
	}

	ZoneScore.prototype.scoreOffsetAt = function (offsetAt) {
		this.offsetScore += Math.abs(this.zone.utcOffset(offsetAt.at) - offsetAt.offset);
		if (this.zone.abbr(offsetAt.at).replace(/[^A-Z]/g, '') !== offsetAt.abbr) {
			this.abbrScore++;
		}
	};

	function findChange(low, high) {
		var mid, diff;

		while ((diff = ((high.at - low.at) / 12e4 | 0) * 6e4)) {
			mid = new OffsetAt(new Date(low.at + diff));
			if (mid.offset === low.offset) {
				low = mid;
			} else {
				high = mid;
			}
		}

		return low;
	}

	function userOffsets() {
		var startYear = new Date().getFullYear() - 2,
			last = new OffsetAt(new Date(startYear, 0, 1)),
			offsets = [last],
			change, next, i;

		for (i = 1; i < 48; i++) {
			next = new OffsetAt(new Date(startYear, i, 1));
			if (next.offset !== last.offset) {
				change = findChange(last, next);
				offsets.push(change);
				offsets.push(new OffsetAt(new Date(change.at + 6e4)));
			}
			last = next;
		}

		for (i = 0; i < 4; i++) {
			offsets.push(new OffsetAt(new Date(startYear + i, 0, 1)));
			offsets.push(new OffsetAt(new Date(startYear + i, 6, 1)));
		}

		return offsets;
	}

	function sortZoneScores (a, b) {
		if (a.offsetScore !== b.offsetScore) {
			return a.offsetScore - b.offsetScore;
		}
		if (a.abbrScore !== b.abbrScore) {
			return a.abbrScore - b.abbrScore;
		}
		return b.zone.population - a.zone.population;
	}

	function addToGuesses (name, offsets) {
		var i, offset;
		arrayToInt(offsets);
		for (i = 0; i < offsets.length; i++) {
			offset = offsets[i];
			guesses[offset] = guesses[offset] || {};
			guesses[offset][name] = true;
		}
	}

	function guessesForUserOffsets (offsets) {
		var offsetsLength = offsets.length,
			filteredGuesses = {},
			out = [],
			i, j, guessesOffset;

		for (i = 0; i < offsetsLength; i++) {
			guessesOffset = guesses[offsets[i].offset] || {};
			for (j in guessesOffset) {
				if (guessesOffset.hasOwnProperty(j)) {
					filteredGuesses[j] = true;
				}
			}
		}

		for (i in filteredGuesses) {
			if (filteredGuesses.hasOwnProperty(i)) {
				out.push(names[i]);
			}
		}

		return out;
	}

	function rebuildGuess () {

		// use Intl API when available and returning valid time zone
		try {
			var intlName = Intl.DateTimeFormat().resolvedOptions().timeZone;
			if (intlName && intlName.length > 3) {
				var name = names[normalizeName(intlName)];
				if (name) {
					return name;
				}
				logError("Moment Timezone found " + intlName + " from the Intl api, but did not have that data loaded.");
			}
		} catch (e) {
			// Intl unavailable, fall back to manual guessing.
		}

		var offsets = userOffsets(),
			offsetsLength = offsets.length,
			guesses = guessesForUserOffsets(offsets),
			zoneScores = [],
			zoneScore, i, j;

		for (i = 0; i < guesses.length; i++) {
			zoneScore = new ZoneScore(getZone(guesses[i]), offsetsLength);
			for (j = 0; j < offsetsLength; j++) {
				zoneScore.scoreOffsetAt(offsets[j]);
			}
			zoneScores.push(zoneScore);
		}

		zoneScores.sort(sortZoneScores);

		return zoneScores.length > 0 ? zoneScores[0].zone.name : undefined;
	}

	function guess (ignoreCache) {
		if (!cachedGuess || ignoreCache) {
			cachedGuess = rebuildGuess();
		}
		return cachedGuess;
	}

	/************************************
		Global Methods
	************************************/

	function normalizeName (name) {
		return (name || '').toLowerCase().replace(/\//g, '_');
	}

	function addZone (packed) {
		var i, name, split, normalized;

		if (typeof packed === "string") {
			packed = [packed];
		}

		for (i = 0; i < packed.length; i++) {
			split = packed[i].split('|');
			name = split[0];
			normalized = normalizeName(name);
			zones[normalized] = packed[i];
			names[normalized] = name;
			addToGuesses(normalized, split[2].split(' '));
		}
	}

	function getZone (name, caller) {
		
		name = normalizeName(name);

		var zone = zones[name];
		var link;

		if (zone instanceof Zone) {
			return zone;
		}

		if (typeof zone === 'string') {
			zone = new Zone(zone);
			zones[name] = zone;
			return zone;
		}

		// Pass getZone to prevent recursion more than 1 level deep
		if (links[name] && caller !== getZone && (link = getZone(links[name], getZone))) {
			zone = zones[name] = new Zone();
			zone._set(link);
			zone.name = names[name];
			return zone;
		}

		return null;
	}

	function getNames () {
		var i, out = [];

		for (i in names) {
			if (names.hasOwnProperty(i) && (zones[i] || zones[links[i]]) && names[i]) {
				out.push(names[i]);
			}
		}

		return out.sort();
	}

	function addLink (aliases) {
		var i, alias, normal0, normal1;

		if (typeof aliases === "string") {
			aliases = [aliases];
		}

		for (i = 0; i < aliases.length; i++) {
			alias = aliases[i].split('|');

			normal0 = normalizeName(alias[0]);
			normal1 = normalizeName(alias[1]);

			links[normal0] = normal1;
			names[normal0] = alias[0];

			links[normal1] = normal0;
			names[normal1] = alias[1];
		}
	}

	function loadData (data) {
		addZone(data.zones);
		addLink(data.links);
		tz.dataVersion = data.version;
	}

	function zoneExists (name) {
		if (!zoneExists.didShowError) {
			zoneExists.didShowError = true;
				logError("moment.tz.zoneExists('" + name + "') has been deprecated in favor of !moment.tz.zone('" + name + "')");
		}
		return !!getZone(name);
	}

	function needsOffset (m) {
		var isUnixTimestamp = (m._f === 'X' || m._f === 'x');
		return !!(m._a && (m._tzm === undefined) && !isUnixTimestamp);
	}

	function logError (message) {
		if (typeof console !== 'undefined' && typeof console.error === 'function') {
			console.error(message);
		}
	}

	/************************************
		moment.tz namespace
	************************************/

	function tz (input) {
		var args = Array.prototype.slice.call(arguments, 0, -1),
			name = arguments[arguments.length - 1],
			zone = getZone(name),
			out  = moment.utc.apply(null, args);

		if (zone && !moment.isMoment(input) && needsOffset(out)) {
			out.add(zone.parse(out), 'minutes');
		}

		out.tz(name);

		return out;
	}

	tz.version      = VERSION;
	tz.dataVersion  = '';
	tz._zones       = zones;
	tz._links       = links;
	tz._names       = names;
	tz.add          = addZone;
	tz.link         = addLink;
	tz.load         = loadData;
	tz.zone         = getZone;
	tz.zoneExists   = zoneExists; // deprecated in 0.1.0
	tz.guess        = guess;
	tz.names        = getNames;
	tz.Zone         = Zone;
	tz.unpack       = unpack;
	tz.unpackBase60 = unpackBase60;
	tz.needsOffset  = needsOffset;
	tz.moveInvalidForward   = true;
	tz.moveAmbiguousForward = false;

	/************************************
		Interface with Moment.js
	************************************/

	var fn = moment.fn;

	moment.tz = tz;

	moment.defaultZone = null;

	moment.updateOffset = function (mom, keepTime) {
		var zone = moment.defaultZone,
			offset;

		if (mom._z === undefined) {
			if (zone && needsOffset(mom) && !mom._isUTC) {
				mom._d = moment.utc(mom._a)._d;
				mom.utc().add(zone.parse(mom), 'minutes');
			}
			mom._z = zone;
		}
		if (mom._z) {
			offset = mom._z.utcOffset(mom);
			if (Math.abs(offset) < 16) {
				offset = offset / 60;
			}
			if (mom.utcOffset !== undefined) {
				mom.utcOffset(-offset, keepTime);
			} else {
				mom.zone(offset, keepTime);
			}
		}
	};

	fn.tz = function (name, keepTime) {
		if (name) {
			if (typeof name !== 'string') {
				throw new Error('Time zone name must be a string, got ' + name + ' [' + typeof name + ']');
			}
			this._z = getZone(name);
			if (this._z) {
				moment.updateOffset(this, keepTime);
			} else {
				logError("Moment Timezone has no data for " + name + ". See http://momentjs.com/timezone/docs/#/data-loading/.");
			}
			return this;
		}
		if (this._z) { return this._z.name; }
	};

	function abbrWrap (old) {
		return function () {
			if (this._z) { return this._z.abbr(this); }
			return old.call(this);
		};
	}

	function resetZoneWrap (old) {
		return function () {
			this._z = null;
			return old.apply(this, arguments);
		};
	}

	fn.zoneName = abbrWrap(fn.zoneName);
	fn.zoneAbbr = abbrWrap(fn.zoneAbbr);
	fn.utc      = resetZoneWrap(fn.utc);

	moment.tz.setDefault = function(name) {
		if (major < 2 || (major === 2 && minor < 9)) {
			logError('Moment Timezone setDefault() requires Moment.js >= 2.9.0. You are using Moment.js ' + moment.version + '.');
		}
		moment.defaultZone = name ? getZone(name) : null;
		return moment;
	};

	// Cloning a moment should include the _z property.
	var momentProperties = moment.momentProperties;
	if (Object.prototype.toString.call(momentProperties) === '[object Array]') {
		// moment 2.8.1+
		momentProperties.push('_z');
		momentProperties.push('_a');
	} else if (momentProperties) {
		// moment 2.7.0
		momentProperties._z = null;
	}

	// INJECT DATA

	return moment;
}));


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root) {/*global exports, Intl*/
/**
 * This script gives you the zone info key representing your device's time zone setting.
 *
 * @name jsTimezoneDetect
 * @version 1.0.6
 * @author Jon Nylander
 * @license MIT License - https://bitbucket.org/pellepim/jstimezonedetect/src/default/LICENCE.txt
 *
 * For usage and examples, visit:
 * http://pellepim.bitbucket.org/jstz/
 *
 * Copyright (c) Jon Nylander
 */


/**
 * Namespace to hold all the code for timezone detection.
 */
var jstz = (function () {
    'use strict';
    var HEMISPHERE_SOUTH = 's',

        consts = {
            DAY: 86400000,
            HOUR: 3600000,
            MINUTE: 60000,
            SECOND: 1000,
            BASELINE_YEAR: 2014,
            MAX_SCORE: 864000000, // 10 days
            AMBIGUITIES: {
                'America/Denver':       ['America/Mazatlan'],
                'Europe/London':        ['Africa/Casablanca'],
                'America/Chicago':      ['America/Mexico_City'],
                'America/Asuncion':     ['America/Campo_Grande', 'America/Santiago'],
                'America/Montevideo':   ['America/Sao_Paulo', 'America/Santiago'],
                // Europe/Minsk should not be in this list... but Windows.
                'Asia/Beirut':          ['Asia/Amman', 'Asia/Jerusalem', 'Europe/Helsinki', 'Asia/Damascus', 'Africa/Cairo', 'Asia/Gaza', 'Europe/Minsk'],
                'Pacific/Auckland':     ['Pacific/Fiji'],
                'America/Los_Angeles':  ['America/Santa_Isabel'],
                'America/New_York':     ['America/Havana'],
                'America/Halifax':      ['America/Goose_Bay'],
                'America/Godthab':      ['America/Miquelon'],
                'Asia/Dubai':           ['Asia/Yerevan'],
                'Asia/Jakarta':         ['Asia/Krasnoyarsk'],
                'Asia/Shanghai':        ['Asia/Irkutsk', 'Australia/Perth'],
                'Australia/Sydney':     ['Australia/Lord_Howe'],
                'Asia/Tokyo':           ['Asia/Yakutsk'],
                'Asia/Dhaka':           ['Asia/Omsk'],
                // In the real world Yerevan is not ambigous for Baku... but Windows.
                'Asia/Baku':            ['Asia/Yerevan'],
                'Australia/Brisbane':   ['Asia/Vladivostok'],
                'Pacific/Noumea':       ['Asia/Vladivostok'],
                'Pacific/Majuro':       ['Asia/Kamchatka', 'Pacific/Fiji'],
                'Pacific/Tongatapu':    ['Pacific/Apia'],
                'Asia/Baghdad':         ['Europe/Minsk', 'Europe/Moscow'],
                'Asia/Karachi':         ['Asia/Yekaterinburg'],
                'Africa/Johannesburg':  ['Asia/Gaza', 'Africa/Cairo']
            }
        },

        /**
         * Gets the offset in minutes from UTC for a certain date.
         * @param {Date} date
         * @returns {Number}
         */
        get_date_offset = function get_date_offset(date) {
            var offset = -date.getTimezoneOffset();
            return (offset !== null ? offset : 0);
        },

        /**
         * This function does some basic calculations to create information about
         * the user's timezone. It uses REFERENCE_YEAR as a solid year for which
         * the script has been tested rather than depend on the year set by the
         * client device.
         *
         * Returns a key that can be used to do lookups in jstz.olson.timezones.
         * eg: "720,1,2".
         *
         * @returns {String}
         */
        lookup_key = function lookup_key() {
            var january_offset = get_date_offset(new Date(consts.BASELINE_YEAR, 0, 2)),
                june_offset = get_date_offset(new Date(consts.BASELINE_YEAR, 5, 2)),
                diff = january_offset - june_offset;

            if (diff < 0) {
                return january_offset + ",1";
            } else if (diff > 0) {
                return june_offset + ",1," + HEMISPHERE_SOUTH;
            }

            return january_offset + ",0";
        },


        /**
         * Tries to get the time zone key directly from the operating system for those
         * environments that support the ECMAScript Internationalization API.
         */
        get_from_internationalization_api = function get_from_internationalization_api() {
            var format, timezone;
            if (typeof Intl === "undefined" || typeof Intl.DateTimeFormat === "undefined") {
                return;
            }

            format = Intl.DateTimeFormat();

            if (typeof format === "undefined" || typeof format.resolvedOptions === "undefined") {
                return;
            }

            timezone = format.resolvedOptions().timeZone;

            if (timezone && (timezone.indexOf("/") > -1 || timezone === 'UTC')) {
                return timezone;
            }

        },

        /**
         * Starting point for getting all the DST rules for a specific year
         * for the current timezone (as described by the client system).
         *
         * Returns an object with start and end attributes, or false if no
         * DST rules were found for the year.
         *
         * @param year
         * @returns {Object} || {Boolean}
         */
        dst_dates = function dst_dates(year) {
            var yearstart = new Date(year, 0, 1, 0, 0, 1, 0).getTime();
            var yearend = new Date(year, 12, 31, 23, 59, 59).getTime();
            var current = yearstart;
            var offset = (new Date(current)).getTimezoneOffset();
            var dst_start = null;
            var dst_end = null;

            while (current < yearend - 86400000) {
                var dateToCheck = new Date(current);
                var dateToCheckOffset = dateToCheck.getTimezoneOffset();

                if (dateToCheckOffset !== offset) {
                    if (dateToCheckOffset < offset) {
                        dst_start = dateToCheck;
                    }
                    if (dateToCheckOffset > offset) {
                        dst_end = dateToCheck;
                    }
                    offset = dateToCheckOffset;
                }

                current += 86400000;
            }

            if (dst_start && dst_end) {
                return {
                    s: find_dst_fold(dst_start).getTime(),
                    e: find_dst_fold(dst_end).getTime()
                };
            }

            return false;
        },

        /**
         * Probably completely unnecessary function that recursively finds the
         * exact (to the second) time when a DST rule was changed.
         *
         * @param a_date - The candidate Date.
         * @param padding - integer specifying the padding to allow around the candidate
         *                  date for finding the fold.
         * @param iterator - integer specifying how many milliseconds to iterate while
         *                   searching for the fold.
         *
         * @returns {Date}
         */
        find_dst_fold = function find_dst_fold(a_date, padding, iterator) {
            if (typeof padding === 'undefined') {
                padding = consts.DAY;
                iterator = consts.HOUR;
            }

            var date_start = new Date(a_date.getTime() - padding).getTime();
            var date_end = a_date.getTime() + padding;
            var offset = new Date(date_start).getTimezoneOffset();

            var current = date_start;

            var dst_change = null;
            while (current < date_end - iterator) {
                var dateToCheck = new Date(current);
                var dateToCheckOffset = dateToCheck.getTimezoneOffset();

                if (dateToCheckOffset !== offset) {
                    dst_change = dateToCheck;
                    break;
                }
                current += iterator;
            }

            if (padding === consts.DAY) {
                return find_dst_fold(dst_change, consts.HOUR, consts.MINUTE);
            }

            if (padding === consts.HOUR) {
                return find_dst_fold(dst_change, consts.MINUTE, consts.SECOND);
            }

            return dst_change;
        },

        windows7_adaptations = function windows7_adaptions(rule_list, preliminary_timezone, score, sample) {
            if (score !== 'N/A') {
                return score;
            }
            if (preliminary_timezone === 'Asia/Beirut') {
                if (sample.name === 'Africa/Cairo') {
                    if (rule_list[6].s === 1398376800000 && rule_list[6].e === 1411678800000) {
                        return 0;
                    }
                }
                if (sample.name === 'Asia/Jerusalem') {
                    if (rule_list[6].s === 1395964800000 && rule_list[6].e === 1411858800000) {
                        return 0;
                }
            }
            } else if (preliminary_timezone === 'America/Santiago') {
                if (sample.name === 'America/Asuncion') {
                    if (rule_list[6].s === 1412481600000 && rule_list[6].e === 1397358000000) {
                        return 0;
                    }
                }
                if (sample.name === 'America/Campo_Grande') {
                    if (rule_list[6].s === 1413691200000 && rule_list[6].e === 1392519600000) {
                        return 0;
                    }
                }
            } else if (preliminary_timezone === 'America/Montevideo') {
                if (sample.name === 'America/Sao_Paulo') {
                    if (rule_list[6].s === 1413687600000 && rule_list[6].e === 1392516000000) {
                        return 0;
                    }
                }
            } else if (preliminary_timezone === 'Pacific/Auckland') {
                if (sample.name === 'Pacific/Fiji') {
                    if (rule_list[6].s === 1414245600000 && rule_list[6].e === 1396101600000) {
                        return 0;
                    }
                }
            }

            return score;
        },

        /**
         * Takes the DST rules for the current timezone, and proceeds to find matches
         * in the jstz.olson.dst_rules.zones array.
         *
         * Compares samples to the current timezone on a scoring basis.
         *
         * Candidates are ruled immediately if either the candidate or the current zone
         * has a DST rule where the other does not.
         *
         * Candidates are ruled out immediately if the current zone has a rule that is
         * outside the DST scope of the candidate.
         *
         * Candidates are included for scoring if the current zones rules fall within the
         * span of the samples rules.
         *
         * Low score is best, the score is calculated by summing up the differences in DST
         * rules and if the consts.MAX_SCORE is overreached the candidate is ruled out.
         *
         * Yah follow? :)
         *
         * @param rule_list
         * @param preliminary_timezone
         * @returns {*}
         */
        best_dst_match = function best_dst_match(rule_list, preliminary_timezone) {
            var score_sample = function score_sample(sample) {
                var score = 0;

                for (var j = 0; j < rule_list.length; j++) {

                    // Both sample and current time zone report DST during the year.
                    if (!!sample.rules[j] && !!rule_list[j]) {

                        // The current time zone's DST rules are inside the sample's. Include.
                        if (rule_list[j].s >= sample.rules[j].s && rule_list[j].e <= sample.rules[j].e) {
                            score = 0;
                            score += Math.abs(rule_list[j].s - sample.rules[j].s);
                            score += Math.abs(sample.rules[j].e - rule_list[j].e);

                        // The current time zone's DST rules are outside the sample's. Discard.
                        } else {
                            score = 'N/A';
                            break;
                        }

                        // The max score has been reached. Discard.
                        if (score > consts.MAX_SCORE) {
                            score = 'N/A';
                            break;
                        }
                    }
                }

                score = windows7_adaptations(rule_list, preliminary_timezone, score, sample);

                return score;
            };
            var scoreboard = {};
            var dst_zones = jstz.olson.dst_rules.zones;
            var dst_zones_length = dst_zones.length;
            var ambiguities = consts.AMBIGUITIES[preliminary_timezone];

            for (var i = 0; i < dst_zones_length; i++) {
                var sample = dst_zones[i];
                var score = score_sample(dst_zones[i]);

                if (score !== 'N/A') {
                    scoreboard[sample.name] = score;
                }
            }

            for (var tz in scoreboard) {
                if (scoreboard.hasOwnProperty(tz)) {
                    for (var j = 0; j < ambiguities.length; j++) {
                        if (ambiguities[j] === tz) {
                            return tz;
                        }
                    }
                }
            }

            return preliminary_timezone;
        },

        /**
         * Takes the preliminary_timezone as detected by lookup_key().
         *
         * Builds up the current timezones DST rules for the years defined
         * in the jstz.olson.dst_rules.years array.
         *
         * If there are no DST occurences for those years, immediately returns
         * the preliminary timezone. Otherwise proceeds and tries to solve
         * ambiguities.
         *
         * @param preliminary_timezone
         * @returns {String} timezone_name
         */
        get_by_dst = function get_by_dst(preliminary_timezone) {
            var get_rules = function get_rules() {
                var rule_list = [];
                for (var i = 0; i < jstz.olson.dst_rules.years.length; i++) {
                    var year_rules = dst_dates(jstz.olson.dst_rules.years[i]);
                    rule_list.push(year_rules);
                }
                return rule_list;
            };
            var check_has_dst = function check_has_dst(rules) {
                for (var i = 0; i < rules.length; i++) {
                    if (rules[i] !== false) {
                        return true;
                    }
                }
                return false;
            };
            var rules = get_rules();
            var has_dst = check_has_dst(rules);

            if (has_dst) {
                return best_dst_match(rules, preliminary_timezone);
            }

            return preliminary_timezone;
        },

        /**
         * Uses get_timezone_info() to formulate a key to use in the olson.timezones dictionary.
         *
         * Returns an object with one function ".name()"
         *
         * @returns Object
         */
        determine = function determine() {
            var preliminary_tz = get_from_internationalization_api();

            if (!preliminary_tz) {
                preliminary_tz = jstz.olson.timezones[lookup_key()];

                if (typeof consts.AMBIGUITIES[preliminary_tz] !== 'undefined') {
                    preliminary_tz = get_by_dst(preliminary_tz);
                }
            }

            return {
                name: function () {
                    return preliminary_tz;
                }
            };
        };

    return {
        determine: determine
    };
}());


jstz.olson = jstz.olson || {};

/**
 * The keys in this dictionary are comma separated as such:
 *
 * First the offset compared to UTC time in minutes.
 *
 * Then a flag which is 0 if the timezone does not take daylight savings into account and 1 if it
 * does.
 *
 * Thirdly an optional 's' signifies that the timezone is in the southern hemisphere,
 * only interesting for timezones with DST.
 *
 * The mapped arrays is used for constructing the jstz.TimeZone object from within
 * jstz.determine();
 */
jstz.olson.timezones = {
    '-720,0': 'Etc/GMT+12',
    '-660,0': 'Pacific/Pago_Pago',
    '-660,1,s': 'Pacific/Apia', // Why? Because windows... cry!
    '-600,1': 'America/Adak',
    '-600,0': 'Pacific/Honolulu',
    '-570,0': 'Pacific/Marquesas',
    '-540,0': 'Pacific/Gambier',
    '-540,1': 'America/Anchorage',
    '-480,1': 'America/Los_Angeles',
    '-480,0': 'Pacific/Pitcairn',
    '-420,0': 'America/Phoenix',
    '-420,1': 'America/Denver',
    '-360,0': 'America/Guatemala',
    '-360,1': 'America/Chicago',
    '-360,1,s': 'Pacific/Easter',
    '-300,0': 'America/Bogota',
    '-300,1': 'America/New_York',
    '-270,0': 'America/Caracas',
    '-240,1': 'America/Halifax',
    '-240,0': 'America/Santo_Domingo',
    '-240,1,s': 'America/Asuncion',
    '-210,1': 'America/St_Johns',
    '-180,1': 'America/Godthab',
    '-180,0': 'America/Argentina/Buenos_Aires',
    '-180,1,s': 'America/Montevideo',
    '-120,0': 'America/Noronha',
    '-120,1': 'America/Noronha',
    '-60,1': 'Atlantic/Azores',
    '-60,0': 'Atlantic/Cape_Verde',
    '0,0': 'UTC',
    '0,1': 'Europe/London',
    '60,1': 'Europe/Berlin',
    '60,0': 'Africa/Lagos',
    '60,1,s': 'Africa/Windhoek',
    '120,1': 'Asia/Beirut',
    '120,0': 'Africa/Johannesburg',
    '180,0': 'Asia/Baghdad',
    '180,1': 'Europe/Moscow',
    '210,1': 'Asia/Tehran',
    '240,0': 'Asia/Dubai',
    '240,1': 'Asia/Baku',
    '270,0': 'Asia/Kabul',
    '300,1': 'Asia/Yekaterinburg',
    '300,0': 'Asia/Karachi',
    '330,0': 'Asia/Kolkata',
    '345,0': 'Asia/Kathmandu',
    '360,0': 'Asia/Dhaka',
    '360,1': 'Asia/Omsk',
    '390,0': 'Asia/Rangoon',
    '420,1': 'Asia/Krasnoyarsk',
    '420,0': 'Asia/Jakarta',
    '480,0': 'Asia/Shanghai',
    '480,1': 'Asia/Irkutsk',
    '525,0': 'Australia/Eucla',
    '525,1,s': 'Australia/Eucla',
    '540,1': 'Asia/Yakutsk',
    '540,0': 'Asia/Tokyo',
    '570,0': 'Australia/Darwin',
    '570,1,s': 'Australia/Adelaide',
    '600,0': 'Australia/Brisbane',
    '600,1': 'Asia/Vladivostok',
    '600,1,s': 'Australia/Sydney',
    '630,1,s': 'Australia/Lord_Howe',
    '660,1': 'Asia/Kamchatka',
    '660,0': 'Pacific/Noumea',
    '690,0': 'Pacific/Norfolk',
    '720,1,s': 'Pacific/Auckland',
    '720,0': 'Pacific/Majuro',
    '765,1,s': 'Pacific/Chatham',
    '780,0': 'Pacific/Tongatapu',
    '780,1,s': 'Pacific/Apia',
    '840,0': 'Pacific/Kiritimati'
};

/* Build time: 2015-11-02 13:01:00Z Build by invoking python utilities/dst.py generate */
jstz.olson.dst_rules = {
    "years": [
        2008,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014
    ],
    "zones": [
        {
            "name": "Africa/Cairo",
            "rules": [
                {
                    "e": 1219957200000,
                    "s": 1209074400000
                },
                {
                    "e": 1250802000000,
                    "s": 1240524000000
                },
                {
                    "e": 1285880400000,
                    "s": 1284069600000
                },
                false,
                false,
                false,
                {
                    "e": 1411678800000,
                    "s": 1406844000000
                }
            ]
        },
        {
            "name": "Africa/Casablanca",
            "rules": [
                {
                    "e": 1220223600000,
                    "s": 1212278400000
                },
                {
                    "e": 1250809200000,
                    "s": 1243814400000
                },
                {
                    "e": 1281222000000,
                    "s": 1272758400000
                },
                {
                    "e": 1312066800000,
                    "s": 1301788800000
                },
                {
                    "e": 1348970400000,
                    "s": 1345428000000
                },
                {
                    "e": 1382839200000,
                    "s": 1376100000000
                },
                {
                    "e": 1414288800000,
                    "s": 1406944800000
                }
            ]
        },
        {
            "name": "America/Asuncion",
            "rules": [
                {
                    "e": 1205031600000,
                    "s": 1224388800000
                },
                {
                    "e": 1236481200000,
                    "s": 1255838400000
                },
                {
                    "e": 1270954800000,
                    "s": 1286078400000
                },
                {
                    "e": 1302404400000,
                    "s": 1317528000000
                },
                {
                    "e": 1333854000000,
                    "s": 1349582400000
                },
                {
                    "e": 1364094000000,
                    "s": 1381032000000
                },
                {
                    "e": 1395543600000,
                    "s": 1412481600000
                }
            ]
        },
        {
            "name": "America/Campo_Grande",
            "rules": [
                {
                    "e": 1203217200000,
                    "s": 1224388800000
                },
                {
                    "e": 1234666800000,
                    "s": 1255838400000
                },
                {
                    "e": 1266721200000,
                    "s": 1287288000000
                },
                {
                    "e": 1298170800000,
                    "s": 1318737600000
                },
                {
                    "e": 1330225200000,
                    "s": 1350792000000
                },
                {
                    "e": 1361070000000,
                    "s": 1382241600000
                },
                {
                    "e": 1392519600000,
                    "s": 1413691200000
                }
            ]
        },
        {
            "name": "America/Goose_Bay",
            "rules": [
                {
                    "e": 1225594860000,
                    "s": 1205035260000
                },
                {
                    "e": 1257044460000,
                    "s": 1236484860000
                },
                {
                    "e": 1289098860000,
                    "s": 1268539260000
                },
                {
                    "e": 1320555600000,
                    "s": 1299988860000
                },
                {
                    "e": 1352005200000,
                    "s": 1331445600000
                },
                {
                    "e": 1383454800000,
                    "s": 1362895200000
                },
                {
                    "e": 1414904400000,
                    "s": 1394344800000
                }
            ]
        },
        {
            "name": "America/Havana",
            "rules": [
                {
                    "e": 1224997200000,
                    "s": 1205643600000
                },
                {
                    "e": 1256446800000,
                    "s": 1236488400000
                },
                {
                    "e": 1288501200000,
                    "s": 1268542800000
                },
                {
                    "e": 1321160400000,
                    "s": 1300597200000
                },
                {
                    "e": 1352005200000,
                    "s": 1333256400000
                },
                {
                    "e": 1383454800000,
                    "s": 1362891600000
                },
                {
                    "e": 1414904400000,
                    "s": 1394341200000
                }
            ]
        },
        {
            "name": "America/Mazatlan",
            "rules": [
                {
                    "e": 1225008000000,
                    "s": 1207472400000
                },
                {
                    "e": 1256457600000,
                    "s": 1238922000000
                },
                {
                    "e": 1288512000000,
                    "s": 1270371600000
                },
                {
                    "e": 1319961600000,
                    "s": 1301821200000
                },
                {
                    "e": 1351411200000,
                    "s": 1333270800000
                },
                {
                    "e": 1382860800000,
                    "s": 1365325200000
                },
                {
                    "e": 1414310400000,
                    "s": 1396774800000
                }
            ]
        },
        {
            "name": "America/Mexico_City",
            "rules": [
                {
                    "e": 1225004400000,
                    "s": 1207468800000
                },
                {
                    "e": 1256454000000,
                    "s": 1238918400000
                },
                {
                    "e": 1288508400000,
                    "s": 1270368000000
                },
                {
                    "e": 1319958000000,
                    "s": 1301817600000
                },
                {
                    "e": 1351407600000,
                    "s": 1333267200000
                },
                {
                    "e": 1382857200000,
                    "s": 1365321600000
                },
                {
                    "e": 1414306800000,
                    "s": 1396771200000
                }
            ]
        },
        {
            "name": "America/Miquelon",
            "rules": [
                {
                    "e": 1225598400000,
                    "s": 1205038800000
                },
                {
                    "e": 1257048000000,
                    "s": 1236488400000
                },
                {
                    "e": 1289102400000,
                    "s": 1268542800000
                },
                {
                    "e": 1320552000000,
                    "s": 1299992400000
                },
                {
                    "e": 1352001600000,
                    "s": 1331442000000
                },
                {
                    "e": 1383451200000,
                    "s": 1362891600000
                },
                {
                    "e": 1414900800000,
                    "s": 1394341200000
                }
            ]
        },
        {
            "name": "America/Santa_Isabel",
            "rules": [
                {
                    "e": 1225011600000,
                    "s": 1207476000000
                },
                {
                    "e": 1256461200000,
                    "s": 1238925600000
                },
                {
                    "e": 1288515600000,
                    "s": 1270375200000
                },
                {
                    "e": 1319965200000,
                    "s": 1301824800000
                },
                {
                    "e": 1351414800000,
                    "s": 1333274400000
                },
                {
                    "e": 1382864400000,
                    "s": 1365328800000
                },
                {
                    "e": 1414314000000,
                    "s": 1396778400000
                }
            ]
        },
        {
            "name": "America/Santiago",
            "rules": [
                {
                    "e": 1206846000000,
                    "s": 1223784000000
                },
                {
                    "e": 1237086000000,
                    "s": 1255233600000
                },
                {
                    "e": 1270350000000,
                    "s": 1286683200000
                },
                {
                    "e": 1304823600000,
                    "s": 1313899200000
                },
                {
                    "e": 1335668400000,
                    "s": 1346558400000
                },
                {
                    "e": 1367118000000,
                    "s": 1378612800000
                },
                {
                    "e": 1398567600000,
                    "s": 1410062400000
                }
            ]
        },
        {
            "name": "America/Sao_Paulo",
            "rules": [
                {
                    "e": 1203213600000,
                    "s": 1224385200000
                },
                {
                    "e": 1234663200000,
                    "s": 1255834800000
                },
                {
                    "e": 1266717600000,
                    "s": 1287284400000
                },
                {
                    "e": 1298167200000,
                    "s": 1318734000000
                },
                {
                    "e": 1330221600000,
                    "s": 1350788400000
                },
                {
                    "e": 1361066400000,
                    "s": 1382238000000
                },
                {
                    "e": 1392516000000,
                    "s": 1413687600000
                }
            ]
        },
        {
            "name": "Asia/Amman",
            "rules": [
                {
                    "e": 1225404000000,
                    "s": 1206655200000
                },
                {
                    "e": 1256853600000,
                    "s": 1238104800000
                },
                {
                    "e": 1288303200000,
                    "s": 1269554400000
                },
                {
                    "e": 1319752800000,
                    "s": 1301608800000
                },
                false,
                false,
                {
                    "e": 1414706400000,
                    "s": 1395957600000
                }
            ]
        },
        {
            "name": "Asia/Damascus",
            "rules": [
                {
                    "e": 1225486800000,
                    "s": 1207260000000
                },
                {
                    "e": 1256850000000,
                    "s": 1238104800000
                },
                {
                    "e": 1288299600000,
                    "s": 1270159200000
                },
                {
                    "e": 1319749200000,
                    "s": 1301608800000
                },
                {
                    "e": 1351198800000,
                    "s": 1333058400000
                },
                {
                    "e": 1382648400000,
                    "s": 1364508000000
                },
                {
                    "e": 1414702800000,
                    "s": 1395957600000
                }
            ]
        },
        {
            "name": "Asia/Dubai",
            "rules": [
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ]
        },
        {
            "name": "Asia/Gaza",
            "rules": [
                {
                    "e": 1219957200000,
                    "s": 1206655200000
                },
                {
                    "e": 1252015200000,
                    "s": 1238104800000
                },
                {
                    "e": 1281474000000,
                    "s": 1269640860000
                },
                {
                    "e": 1312146000000,
                    "s": 1301608860000
                },
                {
                    "e": 1348178400000,
                    "s": 1333058400000
                },
                {
                    "e": 1380229200000,
                    "s": 1364508000000
                },
                {
                    "e": 1414098000000,
                    "s": 1395957600000
                }
            ]
        },
        {
            "name": "Asia/Irkutsk",
            "rules": [
                {
                    "e": 1224957600000,
                    "s": 1206813600000
                },
                {
                    "e": 1256407200000,
                    "s": 1238263200000
                },
                {
                    "e": 1288461600000,
                    "s": 1269712800000
                },
                false,
                false,
                false,
                false
            ]
        },
        {
            "name": "Asia/Jerusalem",
            "rules": [
                {
                    "e": 1223161200000,
                    "s": 1206662400000
                },
                {
                    "e": 1254006000000,
                    "s": 1238112000000
                },
                {
                    "e": 1284246000000,
                    "s": 1269561600000
                },
                {
                    "e": 1317510000000,
                    "s": 1301616000000
                },
                {
                    "e": 1348354800000,
                    "s": 1333065600000
                },
                {
                    "e": 1382828400000,
                    "s": 1364515200000
                },
                {
                    "e": 1414278000000,
                    "s": 1395964800000
                }
            ]
        },
        {
            "name": "Asia/Kamchatka",
            "rules": [
                {
                    "e": 1224943200000,
                    "s": 1206799200000
                },
                {
                    "e": 1256392800000,
                    "s": 1238248800000
                },
                {
                    "e": 1288450800000,
                    "s": 1269698400000
                },
                false,
                false,
                false,
                false
            ]
        },
        {
            "name": "Asia/Krasnoyarsk",
            "rules": [
                {
                    "e": 1224961200000,
                    "s": 1206817200000
                },
                {
                    "e": 1256410800000,
                    "s": 1238266800000
                },
                {
                    "e": 1288465200000,
                    "s": 1269716400000
                },
                false,
                false,
                false,
                false
            ]
        },
        {
            "name": "Asia/Omsk",
            "rules": [
                {
                    "e": 1224964800000,
                    "s": 1206820800000
                },
                {
                    "e": 1256414400000,
                    "s": 1238270400000
                },
                {
                    "e": 1288468800000,
                    "s": 1269720000000
                },
                false,
                false,
                false,
                false
            ]
        },
        {
            "name": "Asia/Vladivostok",
            "rules": [
                {
                    "e": 1224950400000,
                    "s": 1206806400000
                },
                {
                    "e": 1256400000000,
                    "s": 1238256000000
                },
                {
                    "e": 1288454400000,
                    "s": 1269705600000
                },
                false,
                false,
                false,
                false
            ]
        },
        {
            "name": "Asia/Yakutsk",
            "rules": [
                {
                    "e": 1224954000000,
                    "s": 1206810000000
                },
                {
                    "e": 1256403600000,
                    "s": 1238259600000
                },
                {
                    "e": 1288458000000,
                    "s": 1269709200000
                },
                false,
                false,
                false,
                false
            ]
        },
        {
            "name": "Asia/Yekaterinburg",
            "rules": [
                {
                    "e": 1224968400000,
                    "s": 1206824400000
                },
                {
                    "e": 1256418000000,
                    "s": 1238274000000
                },
                {
                    "e": 1288472400000,
                    "s": 1269723600000
                },
                false,
                false,
                false,
                false
            ]
        },
        {
            "name": "Asia/Yerevan",
            "rules": [
                {
                    "e": 1224972000000,
                    "s": 1206828000000
                },
                {
                    "e": 1256421600000,
                    "s": 1238277600000
                },
                {
                    "e": 1288476000000,
                    "s": 1269727200000
                },
                {
                    "e": 1319925600000,
                    "s": 1301176800000
                },
                false,
                false,
                false
            ]
        },
        {
            "name": "Australia/Lord_Howe",
            "rules": [
                {
                    "e": 1207407600000,
                    "s": 1223134200000
                },
                {
                    "e": 1238857200000,
                    "s": 1254583800000
                },
                {
                    "e": 1270306800000,
                    "s": 1286033400000
                },
                {
                    "e": 1301756400000,
                    "s": 1317483000000
                },
                {
                    "e": 1333206000000,
                    "s": 1349537400000
                },
                {
                    "e": 1365260400000,
                    "s": 1380987000000
                },
                {
                    "e": 1396710000000,
                    "s": 1412436600000
                }
            ]
        },
        {
            "name": "Australia/Perth",
            "rules": [
                {
                    "e": 1206813600000,
                    "s": 1224957600000
                },
                false,
                false,
                false,
                false,
                false,
                false
            ]
        },
        {
            "name": "Europe/Helsinki",
            "rules": [
                {
                    "e": 1224982800000,
                    "s": 1206838800000
                },
                {
                    "e": 1256432400000,
                    "s": 1238288400000
                },
                {
                    "e": 1288486800000,
                    "s": 1269738000000
                },
                {
                    "e": 1319936400000,
                    "s": 1301187600000
                },
                {
                    "e": 1351386000000,
                    "s": 1332637200000
                },
                {
                    "e": 1382835600000,
                    "s": 1364691600000
                },
                {
                    "e": 1414285200000,
                    "s": 1396141200000
                }
            ]
        },
        {
            "name": "Europe/Minsk",
            "rules": [
                {
                    "e": 1224979200000,
                    "s": 1206835200000
                },
                {
                    "e": 1256428800000,
                    "s": 1238284800000
                },
                {
                    "e": 1288483200000,
                    "s": 1269734400000
                },
                false,
                false,
                false,
                false
            ]
        },
        {
            "name": "Europe/Moscow",
            "rules": [
                {
                    "e": 1224975600000,
                    "s": 1206831600000
                },
                {
                    "e": 1256425200000,
                    "s": 1238281200000
                },
                {
                    "e": 1288479600000,
                    "s": 1269730800000
                },
                false,
                false,
                false,
                false
            ]
        },
        {
            "name": "Pacific/Apia",
            "rules": [
                false,
                false,
                false,
                {
                    "e": 1301752800000,
                    "s": 1316872800000
                },
                {
                    "e": 1333202400000,
                    "s": 1348927200000
                },
                {
                    "e": 1365256800000,
                    "s": 1380376800000
                },
                {
                    "e": 1396706400000,
                    "s": 1411826400000
                }
            ]
        },
        {
            "name": "Pacific/Fiji",
            "rules": [
                false,
                false,
                {
                    "e": 1269698400000,
                    "s": 1287842400000
                },
                {
                    "e": 1327154400000,
                    "s": 1319292000000
                },
                {
                    "e": 1358604000000,
                    "s": 1350741600000
                },
                {
                    "e": 1390050000000,
                    "s": 1382796000000
                },
                {
                    "e": 1421503200000,
                    "s": 1414850400000
                }
            ]
        },
        {
            "name": "Europe/London",
            "rules": [
                {
                    "e": 1224982800000,
                    "s": 1206838800000
                },
                {
                    "e": 1256432400000,
                    "s": 1238288400000
                },
                {
                    "e": 1288486800000,
                    "s": 1269738000000
                },
                {
                    "e": 1319936400000,
                    "s": 1301187600000
                },
                {
                    "e": 1351386000000,
                    "s": 1332637200000
                },
                {
                    "e": 1382835600000,
                    "s": 1364691600000
                },
                {
                    "e": 1414285200000,
                    "s": 1396141200000
                }
            ]
        }
    ]
};
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = jstz;
} else if (("function" !== 'undefined' && __webpack_require__(142) !== null) && (__webpack_require__(143) != null)) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return jstz;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
    if (typeof root === 'undefined') {
        window.jstz = jstz;
    } else {
        root.jstz = jstz;
    }
}
}());


/***/ }),
/* 142 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 143 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lodashOperators = void 0;
// Use only immutable useful functions from Lodash.
// Visit https://lodash.com/docs for more info.
var lodashOperators = [// Array
'chunk', 'compact', 'concat', 'difference', 'differenceBy', 'differenceWith', 'drop', 'dropRight', 'dropRightWhile', 'dropWhile', 'findIndex', 'findLastIndex', 'first', 'flatten', 'flattenDeep', 'flattenDepth', 'fromPairs', 'head', 'indexOf', 'initial', 'intersection', 'intersectionBy', 'intersectionWith', 'join', 'last', 'lastIndexOf', 'nth', 'slice', 'sortedIndex', 'sortedIndexBy', 'sortedIndexOf', 'sortedLastIndex', 'sortedLastIndexBy', 'sortedLastIndexOf', 'sortedUniq', 'sortedUniqBy', 'tail', 'take', 'takeRight', 'takeRightWhile', 'takeWhile', 'union', 'unionBy', 'unionWith', 'uniq', 'uniqBy', 'uniqWith', 'unzip', 'unzipWith', 'without', 'xor', 'xorBy', 'xorWith', 'zip', 'zipObject', 'zipObjectDeep', 'zipWith', // Collection
'countBy', 'every', 'filter', 'find', 'findLast', 'flatMap', 'flatMapDeep', 'flatMapDepth', 'groupBy', 'includes', 'invokeMap', 'keyBy', 'map', 'orderBy', 'partition', 'reduce', 'reduceRight', 'reject', 'sample', 'sampleSize', 'shuffle', 'size', 'some', 'sortBy', // Date
'now', // Function
'flip', 'negate', 'overArgs', 'partial', 'partialRight', 'rearg', 'rest', 'spread', // Lang
'castArray', 'clone', 'cloneDeep', 'cloneDeepWith', 'cloneDeep', 'conformsTo', 'eq', 'gt', 'gte', 'isArguments', 'isArray', 'isArrayBuffer', 'isArrayLike', 'isArrayLikeObject', 'isBoolean', 'isBuffer', 'isDate', 'isElement', 'isEmpty', 'isEqual', 'isEqualWith', 'isError', 'isFinite', 'isFunction', 'isInteger', 'isLength', 'isMap', 'isMatch', 'isMatchWith', 'isNaN', 'isNative', 'isNil', 'isNull', 'isNumber', 'isObject', 'isObjectLike', 'isPlainObject', 'isRegExp', 'isSafeInteger', 'isSet', 'isString', 'isSymbol', 'isTypedArray', 'isUndefined', 'isWeakMap', 'isWeakSet', 'lt', 'lte', 'toArray', 'toFinite', 'toInteger', 'toLength', 'toNumber', 'toPlainObject', 'toSafeInteger', 'toString', // Math
'add', 'ceil', 'divide', 'floor', 'max', 'maxBy', 'mean', 'meanBy', 'min', 'minBy', 'multiply', 'round', 'subtract', 'sum', 'sumBy', // Number
'clamp', 'inRange', 'random', // Object
'at', 'entries', 'entriesIn', 'findKey', 'findLastKey', 'functions', 'functionsIn', 'get', 'has', 'hasIn', 'invert', 'invertBy', 'invoke', 'keys', 'keysIn', 'mapKeys', 'mapValues', 'omit', 'omitBy', 'pick', 'pickBy', 'result', 'toPairs', 'toPairsIn', 'transform', 'values', 'valuesIn', // String
'camelCase', 'capitalize', 'deburr', 'endsWith', 'escape', 'escapeRegExp', 'kebabCase', 'lowerCase', 'lowerFirst', 'pad', 'padEnd', 'padStart', 'parseInt', 'repeat', 'replace', 'snakeCase', 'split', 'startCase', 'startsWith', 'toLower', 'toUpper', 'trim', 'trimEnd', 'trimStart', 'truncate', 'unescape', 'upperCase', 'upperFirst', 'words', // Util
'cond', 'conforms', 'constant', 'defaultTo', 'flow', 'flowRight', 'identity', 'iteratee', 'matches', 'matchesProperty', 'method', 'methodOf', 'nthArg', 'over', 'overEvery', 'overSome', 'property', 'propertyOf', 'range', 'rangeRight', 'stubArray', 'stubFalse', 'stubObject', 'stubString', 'stubTrue', 'times', 'toPath', 'uniqueId'];
exports.lodashOperators = lodashOperators;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Connection = __webpack_require__(5);

var _Connection2 = _interopRequireDefault(_Connection);

var _Submission = __webpack_require__(14);

var _Submission2 = _interopRequireDefault(_Submission);

var _User = __webpack_require__(13);

var _User2 = _interopRequireDefault(_User);

var _Formio = __webpack_require__(11);

var _Formio2 = _interopRequireDefault(_Formio);

var _Event = __webpack_require__(6);

var _Event2 = _interopRequireDefault(_Event);

var _Scheduler = __webpack_require__(55);

var _Scheduler2 = _interopRequireDefault(_Scheduler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var OfflineData = function () {
  var send = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
      var offlineSubmissions, offlinePlugin, isOnline, PromiseEach;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              offlineSubmissions = data;
              offlinePlugin = _Formio2.default.getPlugin('offline');
              _context3.next = 4;
              return _Connection2.default.isOnline();

            case 4:
              isOnline = _context3.sent;

              PromiseEach = function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(arr, fn) {
                  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _iteratorNormalCompletion = true;
                          _didIteratorError = false;
                          _iteratorError = undefined;
                          _context.prev = 3;
                          _iterator = arr[Symbol.iterator]();

                        case 5:
                          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 12;
                            break;
                          }

                          item = _step.value;
                          _context.next = 9;
                          return fn(item);

                        case 9:
                          _iteratorNormalCompletion = true;
                          _context.next = 5;
                          break;

                        case 12:
                          _context.next = 18;
                          break;

                        case 14:
                          _context.prev = 14;
                          _context.t0 = _context['catch'](3);
                          _didIteratorError = true;
                          _iteratorError = _context.t0;

                        case 18:
                          _context.prev = 18;
                          _context.prev = 19;

                          if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                          }

                        case 21:
                          _context.prev = 21;

                          if (!_didIteratorError) {
                            _context.next = 24;
                            break;
                          }

                          throw _iteratorError;

                        case 24:
                          return _context.finish(21);

                        case 25:
                          return _context.finish(18);

                        case 26:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, this, [[3, 14, 18, 26], [19,, 21, 25]]);
                }));

                return function PromiseEach(_x2, _x3) {
                  return _ref2.apply(this, arguments);
                };
              }();

              if (!isOnline) {
                _context3.next = 10;
                break;
              }

              _context3.next = 9;
              return _Scheduler2.default.startSync();

            case 9:
              PromiseEach(offlineSubmissions, function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(offlineSubmission) {
                  var formio, postData, model, FormIOinsertedData, errorEvent;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          formio = new _Formio2.default(offlineSubmission.data.formio.formUrl);
                          postData = {
                            data: offlineSubmission.data.data
                          };


                          offlineSubmission.data.queuedForSync = true;
                          model = _Submission2.default.local();


                          if (offlineSubmission.data.formio.formId === 'userregister') {
                            model = _User2.default.local();
                          }
                          // Set the submission as queuedForSync
                          _context2.next = 7;
                          return model.update(offlineSubmission);

                        case 7:

                          // If it has an ID and the Id its not local (doesnt contain "_local")
                          if (offlineSubmission.data._id && offlineSubmission.data._id.indexOf('_local') === -1) {
                            postData._id = offlineSubmission.data._id;
                          }
                          _Formio2.default.deregisterPlugin('offline');

                          _context2.prev = 9;
                          _context2.next = 12;
                          return formio.saveSubmission(postData);

                        case 12:
                          FormIOinsertedData = _context2.sent;

                          if (FormIOinsertedData._id) {
                            _context2.next = 15;
                            break;
                          }

                          throw Error('Submission cannot be synced');

                        case 15:
                          FormIOinsertedData.formio = formio;

                          // Update the local submission
                          offlineSubmission.data = FormIOinsertedData;
                          _context2.next = 19;
                          return model.update(offlineSubmission);

                        case 19:

                          if (offlinePlugin) {
                            _Formio2.default.registerPlugin(offlinePlugin, 'offline');
                          }
                          _context2.next = 37;
                          break;

                        case 22:
                          _context2.prev = 22;
                          _context2.t0 = _context2['catch'](9);

                          console.log('The submission cannot be synced ', _context2.t0);
                          /*
                          Raven.send(new Error('Submission cannot be synced'), {
                            error: e
                          });
                          */
                          if (_context2.t0 === 'TypeError: Could not connect to API server (Failed to fetch)') {
                            console.log('Error connecting to the API server');
                          }
                          offlineSubmission.data.queuedForSync = false;
                          offlineSubmission.data.syncError = _context2.t0;

                          if (!(offlineSubmission.data.formio.formId === 'userregister')) {
                            _context2.next = 34;
                            break;
                          }

                          model.remove(offlineSubmission);
                          errorEvent = new CustomEvent('FAST:USER:REGISTRATION:ERROR', {
                            detail: {
                              data: {
                                submission: offlineSubmission.data.data,
                                error: _context2.t0
                              },
                              text: 'Validation Error'
                            }
                          });


                          document.dispatchEvent(errorEvent);
                          _context2.next = 36;
                          break;

                        case 34:
                          _context2.next = 36;
                          return model.update(offlineSubmission);

                        case 36:
                          if (offlinePlugin) {
                            _Formio2.default.registerPlugin(offlinePlugin, 'offline');
                          }

                        case 37:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this, [[9, 22]]);
                }));

                return function (_x4) {
                  return _ref3.apply(this, arguments);
                };
              }()).then(function (result) {
                _Scheduler2.default.stopSync();
                _Event2.default.emit({
                  name: 'FAST:SUBMISSION:SYNCED',
                  data: {},
                  text: 'The submissions have been synced'
                });
              }).catch(function (e) {
                console.log(e);
                _Scheduler2.default.stopSync();
              });

            case 10:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function send(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return Object.freeze({
    send: send
  });
}();

exports.default = OfflineData;

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = __webpack_require__(1);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import 'moment/min/locales';

var Moment = function () {
  function Moment() {
    _classCallCheck(this, Moment);
  }

  _createClass(Moment, null, [{
    key: 'setLocales',
    value: function setLocales() {
      _moment2.default.locale(Moment.getLenguage());
    }
  }, {
    key: 'changeLanguage',
    value: function changeLanguage(code) {
      _moment2.default.locale(code);
    }
  }, {
    key: 'getLenguage',
    value: function getLenguage() {
      return localStorage.getItem('defaultLenguage') ? localStorage.getItem('defaultLenguage') : 'en';
    }
  }]);

  return Moment;
}();

exports.default = Moment;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _v = __webpack_require__(39);

var _v2 = _interopRequireDefault(_v);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _Formio = __webpack_require__(11);

var _Formio2 = _interopRequireDefault(_Formio);

var _Submission = __webpack_require__(14);

var _Submission2 = _interopRequireDefault(_Submission);

var _offlinePlugin = __webpack_require__(33);

var _offlinePlugin2 = _interopRequireDefault(_offlinePlugin);

var _bluebird = __webpack_require__(10);

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ParallelSurvey = function () {
  /**
   * Creates the Wizard object to have new user or new group
   * @param {*} param0
   */
  var createWizard = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
      var submission = _ref.submission,
          vm = _ref.vm;
      var groupId;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              groupId = getGroupId(submission);

              if (!submissionHasGroup(groupId)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return', Object.assign({}, getNewUserWizard(vm), { groupId: groupId }));

            case 3:
              return _context.abrupt('return', Object.assign({}, getNewGroupWizard(vm), { groupId: groupId }));

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function createWizard(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  var createNewSurvey = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref5) {
      var submission = _ref5.submission,
          vm = _ref5.vm,
          info = _ref5.info;
      var groupId;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              groupId = getGroupId(submission);

              if (!submissionHasGroup(groupId)) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt('return', prepareNewUserObject({ submission: submission, vm: vm, info: info }));

            case 3:
              return _context2.abrupt('return', prepareNewGroupObject({ submission: submission, vm: vm, info: info }));

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function createNewSurvey(_x2) {
      return _ref6.apply(this, arguments);
    };
  }();

  var storeNewSurvey = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref7) {
      var survey = _ref7.survey,
          vm = _ref7.vm;
      var formio, formSubmission, created;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              formio = new _Formio2.default(vm.$FAST_CONFIG.APP_URL + '/' + vm.$route.params.idForm);
              // De register if there was a previous registration

              _Formio2.default.deregisterPlugin('offline');
              // Register the plugin for offline mode
              _Formio2.default.registerPlugin(_offlinePlugin2.default.getPlugin({ formio: formio, hashField: vm.hashField }), 'offline');

              formSubmission = {
                data: survey,
                redirect: 'Update',
                draft: true,
                trigger: 'createParalelSurvey'
              };
              _context3.next = 6;
              return formio.saveSubmission(formSubmission);

            case 6:
              created = _context3.sent;
              return _context3.abrupt('return', created);

            case 8:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function storeNewSurvey(_x3) {
      return _ref8.apply(this, arguments);
    };
  }();

  function getNewGroupWizard(vm) {
    var progressSteps = ['1', '2', '3'];
    var steps = [{
      title: vm.$t('Group Name'),
      text: vm.$t('Give the group a name'),
      inputValidator: function inputValidator(value) {
        return new _bluebird2.default(function (resolve, reject) {
          if (value !== '') {
            resolve();
          } else {
            var error = new Error(vm.$t('The group name is already taken'));

            reject(error);
          }
        });
      }
    }, {
      title: vm.$t('Current Participant Name'),
      text: vm.$t('Give the current participant a name')
    }, {
      title: vm.$t('Next participant Name'),
      text: vm.$t('Give the next participant a name')
    }];

    return { progressSteps: progressSteps, steps: steps };
  }

  function getNewUserWizard(vm) {
    var progressSteps = ['1'];
    var steps = [{
      title: vm.$t('Participant Name'),
      text: vm.$t('Give the next participant a name')
    }];

    return { progressSteps: progressSteps, steps: steps };
  }

  function getGroupId(submission) {
    var groupId = _utilities2.default.get(function () {
      return _Submission2.default.local().getParallelSurvey(submission).groupId;
    });

    return groupId;
  }

  function submissionHasGroup(groupId) {
    return groupId;
  }
  function prepareNewGroupObject(_ref3) {
    var submission = _ref3.submission,
        vm = _ref3.vm,
        info = _ref3.info;

    var groupName = info[0];
    var participantName = info[1];
    var nextParticipant = info[2];
    // Format the parallelSurvey object
    var parallelSurvey = {
      groupId: (0, _v2.default)(),
      groupName: groupName,
      participantName: participantName,
      submissionId: submission._id
    };

    // Store information of the parallelSurvey on the current submission
    vm.currentSubmission.data.parallelSurvey = _Submission2.default.local().setParallelSurvey(parallelSurvey);

    // New survey Information
    var surveyData = {
      parallelSurvey: _Submission2.default.local().setParallelSurvey(_extends({}, parallelSurvey, {
        participantName: nextParticipant
      }))
    };

    return surveyData;
  }

  function prepareNewUserObject(_ref4) {
    var submission = _ref4.submission,
        vm = _ref4.vm,
        info = _ref4.info;

    var participantName = info[0];
    var parallelsurveyInfo = _Submission2.default.local().getParallelSurvey(submission);

    parallelsurveyInfo.participantName = participantName;
    // New survey Information
    var surveyData = {
      parallelSurvey: _Submission2.default.local().setParallelSurvey(parallelsurveyInfo)
    };

    return surveyData;
  }

  return Object.freeze({
    createWizard: createWizard,
    createNewSurvey: createNewSurvey,
    storeNewSurvey: storeNewSurvey
  });
}();

exports.default = ParallelSurvey;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Form = __webpack_require__(12);

var _Form2 = _interopRequireDefault(_Form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import Auth from 'repositories/Auth/Auth';
// import Submission from 'database/models/Submission';

var GetRequest = function () {
  function GetRequest() {
    _classCallCheck(this, GetRequest);
  }

  _createClass(GetRequest, null, [{
    key: 'handle',

    /**
     *
     * @param {*} args
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(args) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(args.url.indexOf('form.io') === -1)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', GetRequest.handleExternalAPI(args));

              case 2:
                if (!(args.type === 'form')) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', GetRequest.handleLocalForm(args));

              case 4:
                if (!(args.type === 'select' && args.url.indexOf('form.io') !== -1)) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', GetRequest.handleInternalResource(args));

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handle(_x) {
        return _ref.apply(this, arguments);
      }

      return handle;
    }()
    /**
     *
     */

  }, {
    key: 'handleExternalAPI',
    value: function handleExternalAPI() {
      // TODO
      return null;
    }
    /**
     *
     * @param {*} args
     */

  }, {
    key: 'handleLocalForm',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(args) {
        var form;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Form2.default.local().get(args.formio.formId);

              case 2:
                form = _context2.sent;
                return _context2.abrupt('return', form);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleLocalForm(_x2) {
        return _ref2.apply(this, arguments);
      }

      return handleLocalForm;
    }()
    /**
     *
     * @param {*} args
     */

  }, {
    key: 'handleInternalResource',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(args) {
        var formID, form;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', null);

              case 4:
                form = _context3.sent;


                form = form.filter(function (f) {
                  return f.data._id === formID;
                })[0];

                if (form) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt('return');

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function handleInternalResource(_x3) {
        return _ref3.apply(this, arguments);
      }

      return handleInternalResource;
    }()
  }]);

  return GetRequest;
}();

exports.default = GetRequest;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _storeForm = __webpack_require__(150);

var _storeForm2 = _interopRequireDefault(_storeForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PostRequest = function () {
  function PostRequest() {
    _classCallCheck(this, PostRequest);
  }

  _createClass(PostRequest, null, [{
    key: 'handle',

    /**
     *
     * @param {*} args
     */
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var args = _ref.args,
            hashField = _ref.hashField,
            formio = _ref.formio;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(args.type === 'submission')) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', PostRequest.handleSubmission({ args: args, hashField: hashField, formio: formio }));

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handle(_x) {
        return _ref2.apply(this, arguments);
      }

      return handle;
    }()
    /**
     *
     */

  }, {
    key: 'handleSubmission',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
        var args = _ref3.args,
            hashField = _ref3.hashField,
            formio = _ref3.formio;
        var submission, formSubmission, created;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                submission = args.data;

                if (!(args.data && !args.data.trigger)) {
                  _context2.next = 5;
                  break;
                }

                formSubmission = {
                  data: args.data.data,
                  redirect: false,
                  draft: false,
                  trigger: 'resourceCreation'
                };


                submission = formSubmission;
                // TODO we have to figure out how to do this call
                // When we are working in offline mode
                return _context2.abrupt('return', null);

              case 5:
                _context2.next = 7;
                return _storeForm2.default.handle({ submission: submission, formio: formio, hashField: hashField });

              case 7:
                created = _context2.sent;
                return _context2.abrupt('return', created);

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleSubmission(_x2) {
        return _ref4.apply(this, arguments);
      }

      return handleSubmission;
    }()
  }]);

  return PostRequest;
}();

exports.default = PostRequest;

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _md = __webpack_require__(30);

var _md2 = _interopRequireDefault(_md);

var _Configuration = __webpack_require__(2);

var _Configuration2 = _interopRequireDefault(_Configuration);

var _User = __webpack_require__(50);

var _User2 = _interopRequireDefault(_User);

var _SubmissionRepository = __webpack_require__(32);

var _SubmissionRepository2 = _interopRequireDefault(_SubmissionRepository);

var _Event = __webpack_require__(6);

var _Event2 = _interopRequireDefault(_Event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StoreForm = function () {
  function StoreForm() {
    _classCallCheck(this, StoreForm);
  }

  _createClass(StoreForm, null, [{
    key: 'handle',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var submission = _ref.submission,
            formio = _ref.formio,
            hashField = _ref.hashField;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(typeof hashField !== 'undefined')) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', StoreForm.storeUser({ submission: submission, formio: formio, hashField: hashField }));

              case 2:
                return _context.abrupt('return', StoreForm.storeSubmission({ submission: submission, formio: formio, hashField: hashField }));

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handle(_x) {
        return _ref2.apply(this, arguments);
      }

      return handle;
    }()
    /**
     *
     */

  }, {
    key: 'storeSubmission',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
        var submission = _ref3.submission,
            formio = _ref3.formio,
            hashField = _ref3.hashField;
        var created;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _SubmissionRepository2.default.add({
                  submission: submission,
                  formio: formio
                });

              case 2:
                created = _context2.sent;

                if (created) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt('return');

              case 5:

                if (submission.trigger && submission.trigger === 'resourceCreation') {}
                if (submission.trigger && submission.trigger === 'formioSubmit') {
                  created.isSubmit = true;
                } else {
                  created.isSubmit = false;
                }

                _Event2.default.emit({
                  name: 'FAST:SUBMISSION:CHANGED',
                  data: created,
                  text: 'Draft Saved'
                });

                return _context2.abrupt('return', created);

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function storeSubmission(_x2) {
        return _ref4.apply(this, arguments);
      }

      return storeSubmission;
    }()
    /**
     *
     */

  }, {
    key: 'storeUser',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref5) {
        var submission = _ref5.submission,
            formio = _ref5.formio,
            hashField = _ref5.hashField;
        var config, user;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _Configuration2.default.getLocal();

              case 2:
                config = _context3.sent;


                submission.data.hashedPassword = (0, _md2.default)(submission.data.password, config.MD5_KEY);

                _context3.next = 6;
                return _User2.default.storeLocally({
                  data: submission.data,
                  sync: false,
                  formio: formio
                });

              case 6:
                user = _context3.sent;
                return _context3.abrupt('return', user);

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function storeUser(_x3) {
        return _ref6.apply(this, arguments);
      }

      return storeUser;
    }()
  }]);

  return StoreForm;
}();

exports.default = StoreForm;

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Formio = __webpack_require__(11);

var _Formio2 = _interopRequireDefault(_Formio);

var _offlinePlugin = __webpack_require__(33);

var _offlinePlugin2 = _interopRequireDefault(_offlinePlugin);

var _SubmissionRepository = __webpack_require__(32);

var _SubmissionRepository2 = _interopRequireDefault(_SubmissionRepository);

var _Event = __webpack_require__(6);

var _Event2 = _interopRequireDefault(_Event);

var _bluebird = __webpack_require__(10);

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Import = function () {
  function Import() {
    _classCallCheck(this, Import);
  }

  _createClass(Import, null, [{
    key: 'fromJsonFile',

    /**
     *
     * @param {*} file
     * @param {*} vm
     */
    value: function fromJsonFile(file, vm) {
      var reader = new FileReader();
      // Closure to capture the file information.

      reader.onload = function (theFile) {
        return function (e) {
          var json = void 0;

          try {
            json = JSON.parse(e.target.result);
          } catch (ex) {
            throw new Error('The Json file could not be parsed');
          }
          Import.parseJson(json, vm);
        };
      }(file);
      reader.readAsText(file);
    }
    /**
     *
     * @param {*} json
     * @param {*} vm
     */

  }, {
    key: 'parseJson',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(json, vm) {
        var formio;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // let totalSubmissions = json.length;
                formio = Import.getFormIOInstance(vm);

                // Loading.show({ message: 'Importing ' + totalSubmissions + ' submissions' });
                // json = json.slice(151, 200);

                _bluebird2.default.each(json, function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(row, index) {
                    var submission;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            // await Uploader.sendDataToFormIO(row)
                            submission = Import.prepareSubmission(row);
                            _context.next = 3;
                            return Import.saveSubmission(submission, formio, vm);

                          case 3:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, this);
                  }));

                  return function (_x3, _x4) {
                    return _ref2.apply(this, arguments);
                  };
                }()).then(function () {
                  _Event2.default.emit({ name: 'FAST:DATA:IMPORTED', data: { imported: true }, text: 'Data was imported' });
                }).catch(function (error) {
                  // Loading.hide(error);
                  console.log(error);
                  vm.$swal(vm.$t('Import Error!'), vm.$t('Your submission could not be Imported. Please check the format of your Json file.'), 'error');
                });

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function parseJson(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return parseJson;
    }()
  }, {
    key: 'emitNotification',
    value: function emitNotification(vm) {
      vm.$eventHub.emit('FAST-DATA_IMPORTED');
    }
    /**
     *
     * @param {*} row
     */

  }, {
    key: 'prepareSubmission',
    value: function prepareSubmission(row) {
      if (row.id || row._id) {
        delete row.id;
        delete row._id;
      }
      if (row.modified) {
        delete row.modified;
      }
      if (row.owner) {
        delete row.owner;
      }
      var data = row.data ? row.data : row;
      var formSubmission = {
        data: data,
        redirect: false,
        syncError: false,
        draft: true,
        trigger: 'importSubmission'
      };

      return formSubmission;
    }
    /**
     *
     * @param {*} vm
     */

  }, {
    key: 'getFormIOInstance',
    value: function getFormIOInstance(vm) {
      _Formio2.default.deregisterPlugin('offline');
      _Formio2.default.registerPlugin(_offlinePlugin2.default.getPlugin(vm.form.data.path, undefined, false), 'offline');
      var APP_URL = vm.$FAST_CONFIG.APP_URL;
      var formUrl = APP_URL + '/' + vm.form.data.path;
      var formio = new _Formio2.default(formUrl);

      return formio;
    }
    /**
     *
     * @param {*} vm
     */

  }, {
    key: 'saveSubmission',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(submission, formio, vm) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _SubmissionRepository2.default.add({ submission: submission, formio: formio });

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function saveSubmission(_x5, _x6, _x7) {
        return _ref3.apply(this, arguments);
      }

      return saveSubmission;
    }()
  }]);

  return Import;
}();

exports.default = Import;

/***/ }),
/* 152 */
/***/ (function(module) {

module.exports = [{"shortName":"Afghanistan","iso3":"AFG","iso2":"AF","faostat":2},{"shortName":"Albania","iso3":"ALB","iso2":"AL","faostat":3},{"shortName":"Algeria","iso3":"DZA","iso2":"DZ","faostat":4},{"shortName":"Andorra","iso3":"AND","iso2":"AD","faostat":6},{"shortName":"Angola","iso3":"AGO","iso2":"AO","faostat":7},{"shortName":"Antigua and Barbuda","iso3":"ATG","iso2":"AG","faostat":8},{"shortName":"Argentina","iso3":"ARG","iso2":"AR","faostat":9},{"shortName":"Armenia","iso3":"ARM","iso2":"AM","faostat":1},{"shortName":"Australia","iso3":"AUS","iso2":"AU","faostat":10},{"shortName":"Austria","iso3":"AUT","iso2":"AT","faostat":11},{"shortName":"Azerbaijan","iso3":"AZE","iso2":"AZ","faostat":52},{"shortName":"Bahamas","iso3":"BHS","iso2":"BS","faostat":12},{"shortName":"Bahrain","iso3":"BHR","iso2":"BH","faostat":13},{"shortName":"Bangladesh","iso3":"BGD","iso2":"BD","faostat":16},{"shortName":"Barbados","iso3":"BRB","iso2":"BB","faostat":14},{"shortName":"Belarus","iso3":"BLR","iso2":"BY","faostat":57},{"shortName":"Belgium","iso3":"BEL","iso2":"BE","faostat":255},{"shortName":"Belize","iso3":"BLZ","iso2":"BZ","faostat":23},{"shortName":"Benin","iso3":"BEN","iso2":"BJ","faostat":53},{"shortName":"Bhutan","iso3":"BTN","iso2":"BT","faostat":18},{"shortName":"Bolivia (Plurinational State of)","iso3":"BOL","iso2":"BO","faostat":19},{"shortName":"Bosnia and Herzegovina","iso3":"BIH","iso2":"BA","faostat":80},{"shortName":"Botswana","iso3":"BWA","iso2":"BW","faostat":20},{"shortName":"Brazil","iso3":"BRA","iso2":"BR","faostat":21},{"shortName":"Brunei Darussalam","iso3":"BRN","iso2":"BN","faostat":26},{"shortName":"Bulgaria","iso3":"BGR","iso2":"BG","faostat":27},{"shortName":"Burkina Faso","iso3":"BFA","iso2":"BF","faostat":233},{"shortName":"Burundi","iso3":"BDI","iso2":"BI","faostat":29},{"shortName":"Cabo Verde","iso3":"CPV","iso2":"CV","faostat":35},{"shortName":"Cambodia","iso3":"KHM","iso2":"KH","faostat":115},{"shortName":"Cameroon","iso3":"CMR","iso2":"CM","faostat":32},{"shortName":"Canada","iso3":"CAN","iso2":"CA","faostat":33},{"shortName":"Central African Republic","iso3":"CAF","iso2":"CF","faostat":37},{"shortName":"Chad","iso3":"TCD","iso2":"TD","faostat":39},{"shortName":"Chile","iso3":"CHL","iso2":"CL","faostat":40},{"shortName":"China","iso3":"CHN","iso2":"CN","faostat":41},{"shortName":"Colombia","iso3":"COL","iso2":"CO","faostat":44},{"shortName":"Comoros","iso3":"COM","iso2":"KM","faostat":45},{"shortName":"Congo","iso3":"COG","iso2":"CG","faostat":46},{"shortName":"Cook Islands","iso3":"COK","iso2":"CK","faostat":47},{"shortName":"Costa Rica","iso3":"CRI","iso2":"CR","faostat":48},{"shortName":"Croatia","iso3":"HRV","iso2":"HR","faostat":98},{"shortName":"Cuba","iso3":"CUB","iso2":"CU","faostat":49},{"shortName":"Cyprus","iso3":"CYP","iso2":"CY","faostat":50},{"shortName":"Czechia","iso3":"CZE","iso2":"CZ","faostat":167},{"shortName":"Côte d'Ivoire","iso3":"CIV","iso2":"CI","faostat":107},{"shortName":"Democratic People's Republic of Korea","iso3":"PRK","iso2":"KP","faostat":116},{"shortName":"Democratic Republic of the Congo","iso3":"COD","iso2":"CD","faostat":250},{"shortName":"Denmark","iso3":"DNK","iso2":"DK","faostat":54},{"shortName":"Djibouti","iso3":"DJI","iso2":"DJ","faostat":72},{"shortName":"Dominica","iso3":"DMA","iso2":"DM","faostat":55},{"shortName":"Dominican Republic","iso3":"DOM","iso2":"DO","faostat":56},{"shortName":"Ecuador","iso3":"ECU","iso2":"EC","faostat":58},{"shortName":"Egypt","iso3":"EGY","iso2":"EG","faostat":59},{"shortName":"El Salvador","iso3":"SLV","iso2":"SV","faostat":60},{"shortName":"Equatorial Guinea","iso3":"GNQ","iso2":"GQ","faostat":61},{"shortName":"Eritrea","iso3":"ERI","iso2":"ER","faostat":178},{"shortName":"Estonia","iso3":"EST","iso2":"EE","faostat":63},{"shortName":"Ethiopia","iso3":"ETH","iso2":"ET","faostat":238},{"shortName":"Faroe Islands (Associate Member)","iso3":"FRO","iso2":"FO","faostat":64},{"shortName":"Fiji","iso3":"FJI","iso2":"FJ","faostat":66},{"shortName":"Finland","iso3":"FIN","iso2":"FI","faostat":67},{"shortName":"France","iso3":"FRA","iso2":"FR","faostat":68},{"shortName":"Gabon","iso3":"GAB","iso2":"GA","faostat":74},{"shortName":"Gambia","iso3":"GMB","iso2":"GM","faostat":75},{"shortName":"Georgia","iso3":"GEO","iso2":"GE","faostat":73},{"shortName":"Germany","iso3":"DEU","iso2":"DE","faostat":79},{"shortName":"Ghana","iso3":"GHA","iso2":"GH","faostat":81},{"shortName":"Greece","iso3":"GRC","iso2":"GR","faostat":84},{"shortName":"Grenada","iso3":"GRD","iso2":"GD","faostat":86},{"shortName":"Guatemala","iso3":"GTM","iso2":"GT","faostat":89},{"shortName":"Guinea","iso3":"GIN","iso2":"GN","faostat":90},{"shortName":"Guinea-Bissau","iso3":"GNB","iso2":"GW","faostat":175},{"shortName":"Guyana","iso3":"GUY","iso2":"GY","faostat":91},{"shortName":"Haiti","iso3":"HTI","iso2":"HT","faostat":93},{"shortName":"Honduras","iso3":"HND","iso2":"HN","faostat":95},{"shortName":"Hungary","iso3":"HUN","iso2":"HU","faostat":97},{"shortName":"Iceland","iso3":"ISL","iso2":"IS","faostat":99},{"shortName":"India","iso3":"IND","iso2":"IN","faostat":100},{"shortName":"Indonesia","iso3":"IDN","iso2":"ID","faostat":101},{"shortName":"Iran (Islamic Republic of)","iso3":"IRN","iso2":"IR","faostat":102},{"shortName":"Iraq","iso3":"IRQ","iso2":"IQ","faostat":103},{"shortName":"Ireland","iso3":"IRL","iso2":"IE","faostat":104},{"shortName":"Israel","iso3":"ISR","iso2":"IL","faostat":105},{"shortName":"Italy","iso3":"ITA","iso2":"IT","faostat":106},{"shortName":"Jamaica","iso3":"JAM","iso2":"JM","faostat":109},{"shortName":"Japan","iso3":"JPN","iso2":"JP","faostat":110},{"shortName":"Jordan","iso3":"JOR","iso2":"JO","faostat":112},{"shortName":"Kazakhstan","iso3":"KAZ","iso2":"KZ","faostat":108},{"shortName":"Kenya","iso3":"KEN","iso2":"KE","faostat":114},{"shortName":"Kiribati","iso3":"KIR","iso2":"KI","faostat":83},{"shortName":"Kuwait","iso3":"KWT","iso2":"KW","faostat":118},{"shortName":"Kyrgyzstan","iso3":"KGZ","iso2":"KG","faostat":113},{"shortName":"Lao People's Democratic Republic","iso3":"LAO","iso2":"LA","faostat":120},{"shortName":"Latvia","iso3":"LVA","iso2":"LV","faostat":119},{"shortName":"Lebanon","iso3":"LBN","iso2":"LB","faostat":121},{"shortName":"Lesotho","iso3":"LSO","iso2":"LS","faostat":122},{"shortName":"Liberia","iso3":"LBR","iso2":"LR","faostat":123},{"shortName":"Libya","iso3":"LBY","iso2":"LY","faostat":124},{"shortName":"Lithuania","iso3":"LTU","iso2":"LT","faostat":126},{"shortName":"Luxembourg","iso3":"LUX","iso2":"LU","faostat":256},{"shortName":"Madagascar","iso3":"MDG","iso2":"MG","faostat":129},{"shortName":"Malawi","iso3":"MWI","iso2":"MW","faostat":130},{"shortName":"Malaysia","iso3":"MYS","iso2":"MY","faostat":131},{"shortName":"Maldives","iso3":"MDV","iso2":"MV","faostat":132},{"shortName":"Mali","iso3":"MLI","iso2":"ML","faostat":133},{"shortName":"Malta","iso3":"MLT","iso2":"MT","faostat":134},{"shortName":"Marshall Islands","iso3":"MHL","iso2":"MH","faostat":127},{"shortName":"Mauritania","iso3":"MRT","iso2":"MR","faostat":136},{"shortName":"Mauritius","iso3":"MUS","iso2":"MU","faostat":137},{"shortName":"Mexico","iso3":"MEX","iso2":"MX","faostat":138},{"shortName":"Micronesia (Federated States of)","iso3":"FSM","iso2":"FM","faostat":145},{"shortName":"Monaco","iso3":"MCO","iso2":"MC","faostat":140},{"shortName":"Mongolia","iso3":"MNG","iso2":"MN","faostat":141},{"shortName":"Montenegro","iso3":"MNE","iso2":"ME","faostat":273},{"shortName":"Morocco","iso3":"MAR","iso2":"MA","faostat":143},{"shortName":"Mozambique","iso3":"MOZ","iso2":"MZ","faostat":144},{"shortName":"Myanmar","iso3":"MMR","iso2":"MM","faostat":28},{"shortName":"Namibia","iso3":"NAM","iso2":"NA","faostat":147},{"shortName":"Nauru","iso3":"NRU","iso2":"NR","faostat":148},{"shortName":"Nepal","iso3":"NPL","iso2":"NP","faostat":149},{"shortName":"Netherlands","iso3":"NLD","iso2":"NL","faostat":150},{"shortName":"New Zealand","iso3":"NZL","iso2":"NZ","faostat":156},{"shortName":"Nicaragua","iso3":"NIC","iso2":"NI","faostat":157},{"shortName":"Niger","iso3":"NER","iso2":"NE","faostat":158},{"shortName":"Nigeria","iso3":"NGA","iso2":"NG","faostat":159},{"shortName":"Niue","iso3":"NIU","iso2":"NU","faostat":160},{"shortName":"Norway","iso3":"NOR","iso2":"NO","faostat":162},{"shortName":"Oman","iso3":"OMN","iso2":"OM","faostat":221},{"shortName":"Pakistan","iso3":"PAK","iso2":"PK","faostat":165},{"shortName":"Palau","iso3":"PLW","iso2":"PW","faostat":180},{"shortName":"Panama","iso3":"PAN","iso2":"PA","faostat":166},{"shortName":"Papua New Guinea","iso3":"PNG","iso2":"PG","faostat":168},{"shortName":"Paraguay","iso3":"PRY","iso2":"PY","faostat":169},{"shortName":"Peru","iso3":"PER","iso2":"PE","faostat":170},{"shortName":"Philippines","iso3":"PHL","iso2":"PH","faostat":171},{"shortName":"Poland","iso3":"POL","iso2":"PL","faostat":173},{"shortName":"Portugal","iso3":"PRT","iso2":"PT","faostat":174},{"shortName":"Qatar","iso3":"QAT","iso2":"QA","faostat":179},{"shortName":"Republic of Korea","iso3":"KOR","iso2":"KR","faostat":117},{"shortName":"Republic of Moldova","iso3":"MDA","iso2":"MD","faostat":146},{"shortName":"Romania","iso3":"ROU","iso2":"RO","faostat":183},{"shortName":"Russian Federation","iso3":"RUS","iso2":"RU","faostat":185},{"shortName":"Rwanda","iso3":"RWA","iso2":"RW","faostat":184},{"shortName":"Saint Kitts and Nevis","iso3":"KNA","iso2":"KN","faostat":188},{"shortName":"Saint Lucia","iso3":"LCA","iso2":"LC","faostat":189},{"shortName":"Saint Vincent and the Grenadines","iso3":"VCT","iso2":"VC","faostat":191},{"shortName":"Samoa","iso3":"WSM","iso2":"WS","faostat":244},{"shortName":"San Marino","iso3":"SMR","iso2":"SM","faostat":192},{"shortName":"Sao Tome and Principe","iso3":"STP","iso2":"ST","faostat":193},{"shortName":"Saudi Arabia","iso3":"SAU","iso2":"SA","faostat":194},{"shortName":"Senegal","iso3":"SEN","iso2":"SN","faostat":195},{"shortName":"Serbia","iso3":"SRB","iso2":"RS","faostat":272},{"shortName":"Seychelles","iso3":"SYC","iso2":"SC","faostat":196},{"shortName":"Sierra Leone","iso3":"SLE","iso2":"SL","faostat":197},{"shortName":"Singapore","iso3":"SGP","iso2":"SG","faostat":200},{"shortName":"Slovakia","iso3":"SVK","iso2":"SK","faostat":199},{"shortName":"Slovenia","iso3":"SVN","iso2":"SI","faostat":198},{"shortName":"Solomon Islands","iso3":"SLB","iso2":"SB","faostat":25},{"shortName":"Somalia","iso3":"SOM","iso2":"SO","faostat":201},{"shortName":"South Africa","iso3":"ZAF","iso2":"ZA","faostat":202},{"shortName":"South Sudan","iso3":"SSD","iso2":"SS","faostat":277},{"shortName":"Spain","iso3":"ESP","iso2":"ES","faostat":203},{"shortName":"Sri Lanka","iso3":"LKA","iso2":"LK","faostat":38},{"shortName":"Sudan","iso3":"SDN","iso2":"SD","faostat":276},{"shortName":"SurishortName","iso3":"SUR","iso2":"SR","faostat":207},{"shortName":"Swaziland","iso3":"SWZ","iso2":"SZ","faostat":209},{"shortName":"Sweden","iso3":"SWE","iso2":"SE","faostat":210},{"shortName":"Switzerland","iso3":"CHE","iso2":"CH","faostat":211},{"shortName":"Syrian Arab Republic","iso3":"SYR","iso2":"SY","faostat":212},{"shortName":"Tajikistan","iso3":"TJK","iso2":"TJ","faostat":208},{"shortName":"Thailand","iso3":"THA","iso2":"TH","faostat":216},{"shortName":"The former Yugoslav Republic of Macedonia","iso3":"MKD","iso2":"MK","faostat":154},{"shortName":"Timor-Leste","iso3":"TLS","iso2":"TL","faostat":176},{"shortName":"Togo","iso3":"TGO","iso2":"TG","faostat":217},{"shortName":"Tokelau (Associate Member)","iso3":"TKL","iso2":"TK","faostat":218},{"shortName":"Tonga","iso3":"TON","iso2":"TO","faostat":219},{"shortName":"Trinidad and Tobago","iso3":"TTO","iso2":"TT","faostat":220},{"shortName":"Tunisia","iso3":"TUN","iso2":"TN","faostat":222},{"shortName":"Turkey","iso3":"TUR","iso2":"TR","faostat":223},{"shortName":"Turkmenistan","iso3":"TKM","iso2":"TM","faostat":213},{"shortName":"Tuvalu","iso3":"TUV","iso2":"TV","faostat":227},{"shortName":"Uganda","iso3":"UGA","iso2":"UG","faostat":226},{"shortName":"Ukraine","iso3":"UKR","iso2":"UA","faostat":230},{"shortName":"United Arab Emirates","iso3":"ARE","iso2":"AE","faostat":225},{"shortName":"United Kingdom","iso3":"GBR","iso2":"GB","faostat":229},{"shortName":"United Republic of Tanzania","iso3":"TZA","iso2":"TZ","faostat":215},{"shortName":"United States of America","iso3":"USA","iso2":"US","faostat":231},{"shortName":"Uruguay","iso3":"URY","iso2":"UY","faostat":234},{"shortName":"Uzbekistan","iso3":"UZB","iso2":"UZ","faostat":235},{"shortName":"Vanuatu","iso3":"VUT","iso2":"VU","faostat":155},{"shortName":"Venezuela (Bolivarian Republic of)","iso3":"VEN","iso2":"VE","faostat":236},{"shortName":"Viet Nam","iso3":"VNM","iso2":"VN","faostat":237},{"shortName":"Yemen","iso3":"YEM","iso2":"YE","faostat":249},{"shortName":"Zambia","iso3":"ZMB","iso2":"ZM","faostat":251},{"shortName":"Zimbabwe","iso3":"ZWE","iso2":"ZW","faostat":181}];

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(54);

var _utils2 = _interopRequireDefault(_utils);

var _Translation = __webpack_require__(20);

var _Translation2 = _interopRequireDefault(_Translation);

var _config = __webpack_require__(19);

var _config2 = _interopRequireDefault(_config);

var _Form = __webpack_require__(12);

var _Form2 = _interopRequireDefault(_Form);

var _Pages = __webpack_require__(29);

var _Pages2 = _interopRequireDefault(_Pages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormLabels = function () {
  function FormLabels() {
    _classCallCheck(this, FormLabels);
  }

  _createClass(FormLabels, null, [{
    key: 'get',

    /**
     *
     * @param {*} formNameFilter
     * @param {*} languageFilter
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', this.handle());

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get() {
        return _ref.apply(this, arguments);
      }

      return get;
    }()
    /**
     *
     * @param {*} formNameFilter
     * @param {*} languageFilter
     */

  }, {
    key: 'handle',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var labels, translations;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.fetchAllLabels();

              case 2:
                labels = _context2.sent;
                _context2.next = 5;
                return _Translation2.default.local().find();

              case 5:
                translations = _context2.sent[0].data;


                // Merge labels and translations
                Object.keys(translations).forEach(function (languageCode) {
                  var translationsLabels = translations[languageCode];

                  Object.keys(translationsLabels).forEach(function (translationLabel) {
                    if (labels[translationLabel] && translationsLabels[translationLabel] && translationsLabels[translationLabel] !== '') {
                      labels[translationLabel].translations[languageCode] = translationsLabels[translationLabel];
                    }
                  });
                });

                return _context2.abrupt('return', labels);

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handle() {
        return _ref2.apply(this, arguments);
      }

      return handle;
    }()
    /**
     *  Fetches all Labels for the different
     *  types of labels inputs that the
     *  application has
     */

  }, {
    key: 'fetchAllLabels',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var allLabels, forms, formLabels, appLabels, pagesLabels;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                allLabels = {};
                _context3.next = 3;
                return _Form2.default.local().find();

              case 3:
                _context3.t0 = function (form) {
                  return form.data;
                };

                forms = _context3.sent.map(_context3.t0);
                formLabels = this.getFormLabels(forms);
                _context3.next = 8;
                return this.getAppLabels(_config2.default.get().translations);

              case 8:
                appLabels = _context3.sent;


                allLabels = this.mergeLabels(formLabels, appLabels);

                _context3.t1 = this;
                _context3.next = 13;
                return _Pages2.default.getLocal();

              case 13:
                _context3.t2 = _context3.sent;
                _context3.next = 16;
                return _context3.t1.getPagesLabels.call(_context3.t1, _context3.t2);

              case 16:
                pagesLabels = _context3.sent;


                allLabels = this.mergeLabels(allLabels, pagesLabels);

                return _context3.abrupt('return', allLabels);

              case 19:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function fetchAllLabels() {
        return _ref3.apply(this, arguments);
      }

      return fetchAllLabels;
    }()
    /**
     * Given an Object with text labels and a label Object
     * to add it checks if it already exists or
     * creates it if needed
     * @param {Object} labels
     * @param {Object} label
     */

  }, {
    key: 'createOrAdd',
    value: function createOrAdd(_ref4) {
      var labels = _ref4.labels,
          label = _ref4.label;

      var newObject = _extends({}, labels);

      // If the label already exists
      if (newObject[label.text]) {
        // If the location is an Array of Locations
        if (label.location && Array.isArray(label.location)) {
          label.location.forEach(function (l) {
            newObject[label.text].location.push({
              text: label.text,
              template: label.template,
              type: l.type,
              picture: l.picture
            });
          });
        } else {
          newObject[label.text].location.push(label);
        }
        // If the label does not exist
      } else {
        if (label.location && Array.isArray(label.location)) {
          newObject[label.text] = {
            location: [],
            template: label.template,
            translations: {}
          };
          label.location.forEach(function (l) {
            newObject[label.text].location.push({
              text: label.text,
              template: label.template,
              type: l.type,
              picture: l.picture
            });
          });
        } else {
          newObject[label.text] = {
            location: [label],
            translations: {}
          };
        }
      }
      return newObject;
    }
    /**
     * Merges 2 different sets of translations
     * into a single one with no repeted
     * elements
     * @param {Object} labelsObject1
     * @param {Object} labelsObject2
     */

  }, {
    key: 'mergeLabels',
    value: function mergeLabels(labelsObject1, labelsObject2) {
      var _this = this;

      var merged = _extends({}, labelsObject1);

      Object.keys(labelsObject2).forEach(function (key) {
        merged = _this.createOrAdd({
          labels: merged,
          label: _extends({}, labelsObject2[key], {
            text: key
          })
        });
      });
      return merged;
    }
    /**
     * Extracts all labels that could potentially
     * be translated from the Form.io forms
     * @param {Array} Forms
     */

  }, {
    key: 'getFormLabels',
    value: function getFormLabels(Forms) {
      var _this2 = this;

      var componentLabels = {};
      // Extranct all labels for all available forms

      var formioLabelsPositions = ['suffix', 'prefix', 'addAnother', 'removeRow', 'saveRow', 'legend', 'title', 'label', 'placeholder', 'tooltip'];

      Forms.forEach(function (form) {
        // Add title of the Forms to the translations
        componentLabels = _this2.createOrAdd({
          labels: componentLabels,
          label: {
            text: form.title,
            type: 'formTitle',
            component: form.path,
            form: form.path,
            picture: null
          }
        });
        // Go across every component
        _utils2.default.eachComponent(form.components, function (component) {
          // Check for the common translated Items listed above
          formioLabelsPositions.forEach(function (position) {
            if (component[position] && component[position] !== '') {
              // Add the Label if is not empty
              componentLabels = _this2.createOrAdd({
                labels: componentLabels,
                label: {
                  text: component[position],
                  type: position,
                  component: component.key,
                  form: form.path,
                  picture: null
                }
              });
            }
          });

          // Check for components that have values with labels (i.e: radio)
          if (component.values) {
            component.values.forEach(function (value) {
              if (value.label && value.label !== '') {
                componentLabels = _this2.createOrAdd({
                  labels: componentLabels,
                  label: {
                    text: value.label,
                    type: 'value',
                    component: component.key,
                    form: form.path,
                    picture: null
                  }
                });
              }
            });
          }

          // Check for HTML tag elements in the forms
          if (component.type === 'htmlelement' && component.content !== '') {
            componentLabels = _this2.createOrAdd({
              labels: componentLabels,
              label: {
                text: component.content,
                type: 'htmlElement',
                component: component.key,
                form: form.path,
                picture: null
              }
            });
          }

          // Check specificaly for select elements
          if (component.type === 'select') {
            if (component.data && component.data.values) {
              component.data.values.forEach(function (value) {
                if (value.label && value.label !== '') {
                  componentLabels = _this2.createOrAdd({
                    labels: componentLabels,
                    label: {
                      text: value.label,
                      type: 'selectValue',
                      component: component.key,
                      form: form.path,
                      picture: null
                    }
                  });
                }
              });
            }
          }

          // Check for survey elements
          if (component.type && component.type === 'survey') {
            if (component.questions) {
              // Check for every question on the survey
              component.questions.forEach(function (q) {
                componentLabels = _this2.createOrAdd({
                  labels: componentLabels,
                  label: {
                    text: q.label,
                    type: 'surveyLabel',
                    component: component.key,
                    form: form.path,
                    picture: null
                  }
                });
              });
              // Check every text of the answers
              component.values.forEach(function (v) {
                componentLabels = _this2.createOrAdd({
                  labels: componentLabels,
                  label: {
                    text: v.label,
                    type: 'surveyValues',
                    component: component.key,
                    form: form.path,
                    picture: null
                  }
                });
              });
            }
          }
        }, true);
      });

      return componentLabels;
    }
    /**
     *  Creates the Labels Object for the
     *  App translations
     * @param {Array} appLabels
     */

  }, {
    key: 'getAppLabels',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(appLabels) {
        var _this3 = this;

        var translations;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                translations = {};


                appLabels.forEach(function (l) {
                  translations = _this3.createOrAdd({
                    labels: translations,
                    label: l
                  });
                });

                return _context4.abrupt('return', translations);

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getAppLabels(_x) {
        return _ref5.apply(this, arguments);
      }

      return getAppLabels;
    }()
    /**
     *  Creates the Labels Object for the
     *  App Pages
     * @param {Array} appLabels
     */

  }, {
    key: 'getPagesLabels',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(Pages) {
        var _this4 = this;

        var pagesLabels;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                pagesLabels = {};


                Pages.pages.forEach(function (page) {
                  page.cards.forEach(function (card) {
                    if (card.title && card.title !== '') {
                      _this4.createOrAdd({
                        labels: pagesLabels,
                        label: {
                          text: card.title,
                          type: 'pageCardTitle',
                          picture: null,
                          card: card,
                          page: page
                        }
                      });
                    }

                    if (card.subtitle && card.subtitle !== '') {
                      _this4.createOrAdd({
                        labels: pagesLabels,
                        label: {
                          text: card.subtitle,
                          type: 'pageCardSubtitle',
                          picture: null,
                          card: card,
                          page: page
                        }
                      });
                    }

                    card.actions.forEach(function (action) {
                      if (action.text && action.text !== '') {
                        _this4.createOrAdd({
                          labels: pagesLabels,
                          label: {
                            text: action.text,
                            type: 'pageActionButtonText',
                            picture: null,
                            card: card,
                            page: page
                          }
                        });
                      }
                    });
                  });
                  if (page.title && page.title !== '') {
                    _this4.createOrAdd({
                      labels: pagesLabels,
                      label: {
                        text: page.title,
                        type: 'pageTitle',
                        picture: null,
                        page: page
                      }
                    });
                  }
                });

                return _context5.abrupt('return', pagesLabels);

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getPagesLabels(_x2) {
        return _ref6.apply(this, arguments);
      }

      return getPagesLabels;
    }()
  }]);

  return FormLabels;
}();

exports.default = FormLabels;

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _md = __webpack_require__(30);

var _md2 = _interopRequireDefault(_md);

var _Configuration = __webpack_require__(2);

var _Configuration2 = _interopRequireDefault(_Configuration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hash = function () {
  function Hash() {
    _classCallCheck(this, Hash);
  }

  _createClass(Hash, null, [{
    key: 'string',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_string) {
        var config, hashed;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Configuration2.default.getLocal();

              case 2:
                config = _context.sent;
                hashed = '';


                hashed = (0, _md2.default)(_string, config.MD5_KEY);
                return _context.abrupt('return', hashed);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function string(_x) {
        return _ref.apply(this, arguments);
      }

      return string;
    }()
  }]);

  return Hash;
}();

exports.default = Hash;

/***/ })
/******/ ]);
});
//# sourceMappingURL=fast-fastjs.js.map