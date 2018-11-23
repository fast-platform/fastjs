(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("moment"), require("bluebird"), require("axios"));
	else if(typeof define === 'function' && define.amd)
		define("fast-fastjs", ["moment", "bluebird", "axios"], factory);
	else if(typeof exports === 'object')
		exports["fast-fastjs"] = factory(require("moment"), require("bluebird"), require("axios"));
	else
		root["fast-fastjs"] = factory(root["moment"], root["bluebird"], root["axios"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__3__, __WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__9__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
  /**
   * Recursively removes all NULL values
   * from an Object or an Array
   *
   * @static
   * @param {Array|Object} object Array, Object to clean
   * @returns {Array|Object} returns the cleaned value
   */
  var deleteNulls = function deleteNulls(object) {
    var obj = object;
    var isArray = obj instanceof Array;

    for (var k in obj) {
      if (obj[k] === null) isArray ? obj.splice(k, 1) : delete obj[k];else if (_typeof(obj[k]) === 'object') deleteNulls(obj[k]);
    }
    return obj;
  };

  var eachComponent = function eachComponent(components, fn, includeAll, path, parent) {
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
      var newPath = component.key ? path ? path + '.' + component.key : component.key : '';

      // Keep track of parent references.
      if (parent) {
        // Ensure we don't create infinite JSON structures.
        component.parent = _extends({}, parent);
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
          return newPath + '.data';
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
  };

  var matchComponent = function matchComponent(component, query) {
    if (typeof query === 'string') {
      return component.key === query;
    }
    var matches = false;

    Object.keys(query).forEach(function (path) {
      matches = getFromPath(component, path).value === query[path];
      if (!matches) {
        return false;
      }
    });
    return matches;
  };

  var findComponents = function findComponents(components, query) {
    var results = [];

    eachComponent(components, function (component, path) {
      if (matchComponent(component, query)) {
        component.path = path;
        results.push(component);
      }
    }, true);
    return results;
  };

  var unixDate = function unixDate() {
    return Math.round(+new Date() / 1000);
  };

  return Object.freeze({
    cloneDeep: cloneDeep,
    get: get,
    orderBy: orderBy,
    isEmpty: isEmpty,
    debounce: debounce,
    getFromPath: getFromPath,
    deleteNulls: deleteNulls,
    eachComponent: eachComponent,
    findComponents: findComponents,
    unixDate: unixDate
  });
}();

exports.default = Utilities;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():undefined}(this,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=12)}([function(e,t,r){var n=r(2),o=r(16),i=r(6),a=r(17),s=r(1),c=r(3),u=r(8),f=r(7),l=Array.prototype.concat;function p(){var e=l.apply([],arguments).filter(c);return 0===e.length?void 0:e}function d(e){if(!s(e))return e;var t=e.methods,r=e.properties,n=e.props,o=e.initializers,i=e.init,c=e.composers,l=e.deepProperties,d=e.deepProps,h=e.propertyDescriptors,v=e.staticProperties,m=e.statics,g=e.staticDeepProperties,y=e.deepStatics,w=e.configuration,b=e.conf,A=e.deepConfiguration,P=e.deepConf,_=s(n)||s(r)?f({},n,r):void 0,E=s(d)?u({},d):void 0;E=s(l)?u(E,l):E;var O=s(m)||s(v)?f({},m,v):void 0,x=s(y)?u({},y):void 0;x=s(g)?u(x,g):x;var F=e.staticPropertyDescriptors;a(e.name)&&(F=f({},F||{},{name:{value:e.name}}));var j=s(b)||s(w)?f({},b,w):void 0,C=s(P)?u({},P):void 0;C=s(A)?u(C,A):C;var N=p(i,o),M=p(c),R={};return t&&(R.methods=t),_&&(R.properties=_),N&&(R.initializers=N),M&&(R.composers=M),E&&(R.deepProperties=E),O&&(R.staticProperties=O),x&&(R.staticDeepProperties=x),h&&(R.propertyDescriptors=h),F&&(R.staticPropertyDescriptors=F),j&&(R.configuration=j),C&&(R.deepConfiguration=C),R}function h(){"use strict";for(var e=arguments.length,t=[],r=0;r<e;r+=1){var o=arguments[r];t.push(i(o)?o:d(o))}return n.apply(this||v,t)}var v=o.compose({staticProperties:{create:function(){return this.apply(this,arguments)},compose:h}}),m=o.compose.staticProperties;for(var g in m)h[g]=m[g].bind(v);h.compose=h.bind(),e.exports=h},function(e,t){e.exports=function(e){var t=typeof e;return Boolean(e)&&("object"===t||"function"===t)}},function(e,t,r){var n=r(5),o=r(3),i=r(1),a=r(6),s=r(14),c=r(7),u=r(8),f=Array.prototype.slice;function l(e,t){var r=function e(t){var r=e.compose||{},n={__proto__:r.methods};if(u(n,r.deepProperties),c(n,r.properties),Object.defineProperties(n,r.propertyDescriptors||{}),!r.initializers||0===r.initializers.length)return n;void 0===t&&(t={});for(var i=r.initializers,a=i.length,s=0;s<a;s+=1){var l=i[s];if(o(l)){var p=l.call(n,t,{instance:n,stamp:e,args:f.apply(arguments)});n=void 0===p?n:p}}return n};e.staticDeepProperties&&u(r,e.staticDeepProperties),e.staticProperties&&c(r,e.staticProperties),e.staticPropertyDescriptors&&Object.defineProperties(r,e.staticPropertyDescriptors);var n=o(r.compose)?r.compose:t;return r.compose=function(){"use strict";return n.apply(this,arguments)},c(r.compose,e),r}function p(e,t,r){if(n(t)){var i=t.length,a=e[r]||[];e[r]=a;for(var s=0;s<i;s+=1){var c=t[s];o(c)&&a.indexOf(c)<0&&a.push(c)}}}function d(e,t,r,n){i(t[r])&&(i(e[r])||(e[r]={}),n(e[r],t[r]))}function h(e,t,r){d(e,t,r,u)}function v(e,t,r){d(e,t,r,c)}function m(e,t){var r=t&&t.compose||t;v(e,r,"methods"),v(e,r,"properties"),h(e,r,"deepProperties"),v(e,r,"propertyDescriptors"),v(e,r,"staticProperties"),h(e,r,"staticDeepProperties"),v(e,r,"staticPropertyDescriptors"),v(e,r,"configuration"),h(e,r,"deepConfiguration"),p(e,r.initializers,"initializers"),p(e,r.composers,"composers")}e.exports=function e(){"use strict";var t={},r=[];s(this)&&(m(t,this),r.push(this));for(var o=0;o<arguments.length;o++){var i=arguments[o];s(i)&&(m(t,i),r.push(i))}var c=l(t,e),u=t.composers;if(n(u)&&u.length>0)for(var f=0;f<u.length;f+=1){var p=(0,u[f])({stamp:c,composables:r});c=a(p)?p:c}return c}},function(e,t){e.exports=function(e){return"function"==typeof e}},function(e,t){var r;r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t){e.exports=Array.isArray},function(e,t,r){var n=r(3);e.exports=function(e){return n(e)&&n(e.compose)}},function(e,t){e.exports=Object.assign},function(e,t,r){var n=r(15),o=r(1),i=r(5);function a(e,t){if(void 0===t)return e;if(i(t))return(i(e)?e:[]).concat(t);if(!n(t))return t;for(var r=o(e)?e:{},s=Object.keys(t),c=0;c<s.length;c+=1){var u=s[c],f=t[u];if(void 0!==f){var l=r[u],p=n(l)||i(f)?l:{};r[u]=a(p,f)}}return r}e.exports=function(e){for(var t=1;t<arguments.length;t++)e=a(e,arguments[t]);return e}},function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=i(r(0)),o=i(r(18));function i(e){return e&&e.__esModule?e:{default:e}}t.default=(0,n.default)({properties:{name:"baseModel",config:{remote:{path:void 0,token:void 0,pullForm:!1},local:{connector:"loki"},merge:{connector:"formio-loki"}}},methods:{getModelName:function(){return this.name},getFluentConfig:function(){var t=void 0;return"undefined"!=typeof window&&window&&window._FLUENT_?t=window._FLUENT_:e&&e._FLUENT_&&(t=e._FLUENT_),t},getConnector:function(e,t){return Array.isArray(e)?this.getConnectorFromArray(e,t):e instanceof Object?e:void 0},getConnectorFromArray:function(e,t){var r=this;if(1===e.length)return e[0];if(this.config&&this.config[t]&&this.config[t].connector){var n=e.find(function(e){return e.name===r.config[t].connector});if(n instanceof Object)return n}var o=e.find(function(e){return e.default});return o instanceof Object?o:void 0},remote:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.token,r=void 0===t?void 0:t,n=e.pullForm,o=void 0===n?void 0:n,i=this.getFluentConfig(),a=i&&i.connectors&&i.connectors.remote;if(!a)throw new Error("No remote connector was defined. Please define it using Fluent.config()");var s=this.getConnector(a,"remote");if(this.config.remote.token=r||this.config.remote.token,o&&(this.config.remote.pullForm=o||this.config.remote.pullForm),s)return s.connector({remoteConnection:this.config.remote,connector:s});throw new Error("No default remote connector found. Please assign one as your default in Fluent.config")},local:function(){var e=this.getFluentConfig(),t=e&&e.connectors&&e.connectors.local;if(!t)throw new Error("No local connector was defined. Please define it using Fluent.config()");var r=this.getConnector(t,"local");if(r)return r.connector({name:this.name,connector:r});throw new Error("No default local connector found. Please assign one as your default in Fluent.config")},merged:function(){var e=this.local(),t=this.remote(),r=this.getFluentConfig(),n=r&&r.connectors&&r.connectors.merge;if(!n)throw new Error("No merge connector was defined. Please define it using Fluent.config()");var o=this.getConnector(n,"merge");if(o)return o.connector({local:e,remote:t,name:this.name,connector:o});throw new Error("No default merge connector found. Please assign one as your default in Fluent.config")}}}).compose(o.default)}).call(this,r(4))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o=a(r(0)),i=a(r(11));function a(e){return e&&e.__esModule?e:{default:e}}function s(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}t.default=(0,o.default)({init:function(e){if(!Array.isArray(e))throw new Error("Collect method only accepts arrays of data");this.data=e},properties:{data:[]},methods:{get:function(){return this.data},all:function(){return this.get()},avg:function(e){return this.average(e)},average:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=[].concat(s(this.data)),r=t.reduce(function(t,r){var n=r;if(r instanceof Object){var o=i.default.getFromPath(r,e,void 0);void 0!==o&&o.value&&(n=o.value)}return t+n},0);try{return r/t.length}catch(e){throw new Error('Division between "'+r+'" and "'+t.length+'" is not valid.')}},chunks:function(e){for(var t=[].concat(s(this.data)),r=[];t.length;)r.push(t.splice(0,e));return this.data=r,this},collapse:function(){var e=[];return[].concat(s(this.data)).forEach(function(t){Array.isArray(t)?t.forEach(function(t){e.push(t)}):e.push(t)}),this.data=e,this},unChunk:function(){return this.collapse()},combine:function(e){var t=void 0;return[].concat(s(this.data)).forEach(function(r,o){r instanceof Object?(t||(t=[]),t[o]=n({},r,{_value:e[o]})):(t||(t={}),t[r]=e[o])}),this.data=t,this},concat:function(e){return this.data=[].concat(s(this.data),s(e)),this},contains:function(){var e=void 0,t=void 0,r=void 0;return 1===arguments.length?(this.isFunction(arguments.length<=0?void 0:arguments[0])&&(r=arguments.length<=0?void 0:arguments[0]),e=arguments.length<=0?void 0:arguments[0]):(e=arguments.length<=1?void 0:arguments[1],t=arguments.length<=0?void 0:arguments[0]),[].concat(s(this.data)).some(function(n,o){if(r)return!!r(n,o);var a=n;if(n instanceof Object){var s=i.default.getFromPath(n,t,void 0);s.value&&(a=s.value)}return a===e})},count:function(){return this.data.length},isFunction:function(e){return e&&"[object Function]"==={}.toString.call(e)}}})},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){var e=function(e,t){try{return e()}catch(e){return t}};return Object.freeze({get:e,getFromPath:function(t,r,n){var o=r;r.includes(" as ")&&(o=(r=r.split(" as "))[0]);var i=e(function(){return Array.isArray(r)&&r[1].trim()},void 0);var a=o.replace(/\[/g,".").replace(/]/g,"").split(".").filter(Boolean).map(function(e){return e.trim()}).every(function(e){return!(e&&void 0===(t=t[e]))})?t:n;return{label:i||o,value:a}}})}();t.default=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Interface=t.Fluent=t.Model=void 0;var n=a(r(13)),o=a(r(9)),i=a(r(19));function a(e){return e&&e.__esModule?e:{default:e}}t.Model=o.default,t.Fluent=n.default,t.Interface=i.default},function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=a(r(0)),o=a(r(9)),i=a(r(10));function a(e){return e&&e.__esModule?e:{default:e}}function s(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}var c=(0,n.default)({init:function(){this.registerGlobalVariable()},properties:{},methods:{model:function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return this.registerModel(t),o.default.compose.apply(o.default,s(t))},extend:function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return this.registerModel(t),o.default.compose.apply(o.default,s(t))},compose:function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return this.registerModel(t),o.default.compose.apply(o.default,s(t))},collect:function(e){return(0,i.default)(e)},registerGlobalVariable:function(){"undefined"!=typeof window&&window&&!window._FLUENT_&&(window._FLUENT_={connectors:{},models:{}}),e&&!e._FLUENT_&&(e._FLUENT_={connectors:{},models:{}})},registerModel:function(t){var r=t&&t[0]&&t[0].properties&&t[0].properties.name?t[0].properties.name:void 0;if(r&&"baseModel"!==r){if("string"!=typeof r)throw new Error("You must assign a name to your Model when using Fluent.compose");"undefined"==typeof window?e._FLUENT_.models[r]=!0:window._FLUENT_.models[r]=!0}},config:function(t){var r=t.REMOTE_CONNECTORS,n=void 0===r?void 0:r,o=t.LOCAL_CONNECTORS,i=void 0===o?void 0:o,a=t.MERGE_CONNECTORS,s=void 0===a?void 0:a;"undefined"!=typeof window&&window&&(window._FLUENT_.connectors={local:i,remote:n,merge:s}),void 0!==e&&e&&(e._FLUENT_.connectors={local:i,remote:n,merge:s})},getConfig:function(){return"undefined"!=typeof window&&window?window._FLUENT_:void 0!==e&&e?e._FLUENT_:void 0}}})();t.default=c}).call(this,r(4))},function(e,t,r){e.exports=r(1)},function(e,t){e.exports=function(e){return Boolean(e)&&"object"==typeof e&&Object.getPrototypeOf(e)===Object.prototype}},function(e,t,r){var n=r(2);function o(e){return function(t){"use strict";var r={};return r[e]=t,this&&this.compose?this.compose(r):n(r)}}var i=o("properties"),a=o("staticProperties"),s=o("configuration"),c=o("deepProperties"),u=o("staticDeepProperties"),f=o("deepConfiguration"),l=o("initializers");e.exports=n({staticProperties:{methods:o("methods"),props:i,properties:i,statics:a,staticProperties:a,conf:s,configuration:s,deepProps:c,deepProperties:c,deepStatics:u,staticDeepProperties:u,deepConf:f,deepConfiguration:f,init:l,initializers:l,composers:o("composers"),propertyDescriptors:o("propertyDescriptors"),staticPropertyDescriptors:o("staticPropertyDescriptors")}})},function(e,t){e.exports=function(e){return"string"==typeof e}},function(e,t,r){var n=r(2),o=new WeakMap,i=function(e,t){function r(){"use strict";var t=o.get(this);return e.apply(t,arguments)}return Object.defineProperty(r,"name",{value:t,configurable:!0}),r};function a(e,t){var r=t.stamp.compose,n=r.deepConfiguration.Privatize.methods,a={};o.set(a,this);var s=r.methods;if(!s)return a;for(var c=Object.keys(s),u=0;u<c.length;u++){var f=c[u];n.indexOf(f)<0&&(a[f]=i(s[f],f))}if("undefined"!=typeof Symbol){var l=Symbol.for("stamp");s[l]&&(a[l]=t.stamp)}return a}var s=n({initializers:[a],deepConfiguration:{Privatize:{methods:[]}},staticProperties:{privatizeMethods:function(){"use strict";for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];"string"==typeof r&&r.length>0&&e.push(r)}return(this&&this.compose?this:s).compose({deepConfiguration:{Privatize:{methods:e}}})}},composers:[function(e){var t=e.stamp.compose.initializers;t.splice(t.indexOf(a),1),t.push(a)}]});e.exports=s},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(r(0)),o=a(r(11)),i=a(r(10));function a(e){return e&&e.__esModule?e:{default:e}}function s(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}function c(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,r){return function n(o,i){try{var a=t[o](i),s=a.value}catch(e){return void r(e)}if(!a.done)return Promise.resolve(s).then(function(e){n("next",e)},function(e){n("throw",e)});e(s)}("next")})}}t.default=(0,n.default)({init:function(e){var t=e.name,r=e.remoteConnection,n=e.connector;if(!t&&!r)throw new Error("Model must have a name or path");if(!n)throw new Error("Model must have a connector. Please register one using Fluent.config");this.name=t||this.name,this.remoteConnection=r||this.remoteConnection,this.connector=n||this.connector,this.chainReference=[],this.whereArray=[],this.orWhereArray=[],this.selectArray=[],this.orderByArray=[],this.limitNumber=void 0,this.offsetNumber=void 0,this.populate=[],this.chunk=null,this.pullSize=null,this.ownerEmail=void 0},properties:{operators:["=","<",">","<=",">=","<>","!=","in","nin","like","regexp","startsWith","endsWith","contains"]},methods:{get:function(){throw new Error("get() method not implemented")},all:function(){throw new Error("all() method not implemented")},find:function(e){throw new Error("find() method not implemented")},findOne:function(){throw new Error("findOne() method not implemented")},remove:function(){throw new Error("remove() method not implemented")},softDelete:function(){throw new Error("softDelete() method not implemented")},insert:function(){throw new Error("insert() method not implemented")},update:function(){throw new Error("update() method not implemented")},clear:function(){throw new Error("clear() method not implemented")},updateOrCreate:function(){throw new Error("updateOrCreate() method not implemented")},findAndRemove:function(){throw new Error("findAndRemove() method not implemented")},owner:function(e){return this.chainReference.push({method:"owner",args:e}),this.ownerEmail=e,this},own:function(e){return this.owner(e)},first:function(){var e=this;return c(regeneratorRuntime.mark(function t(){var r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.get();case 2:return r=t.sent,t.abrupt("return",o.default.get(function(){return r[0]},[]));case 4:case"end":return t.stop()}},t,e)}))()},collect:function(){var e=this;return c(regeneratorRuntime.mark(function t(){var r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.get();case 2:if(r=t.sent,Array.isArray(r)){t.next=5;break}throw new Error("Collect method only accepts arrays of data");case 5:return t.abrupt("return",(0,i.default)(r));case 6:case"end":return t.stop()}},t,e)}))()},select:function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return t=this.prepareInput(t),this.chainReference.push({method:"select",args:t}),this.selectArray=this.selectArray.concat(t).filter(function(e,t,r){return r.indexOf(e)===t}),this},jsApplySelect:function(e){var t=this,r=Array.isArray(e)?[].concat(s(e)):[e];return this.selectArray.length>0&&(r=r.map(function(e){var r={};return t.selectArray.forEach(function(t){var n=o.default.getFromPath(e,t,void 0);void 0!==o.default.get(function(){return n.value},void 0)&&(r[n.label]=n.value)}),r})),r},offset:function(e){return this.chainReference.push({method:"offset",args:e}),this.offsetNumber=e,this},skip:function(e){return this.offset(e)},where:function(){for(var e=this,t=arguments.length,r=Array(t),n=0;n<t;n++)r[n]=arguments[n];return this.chainReference.push({method:"where",args:r}),this.whereArray=[],(r=Array.isArray(r[0])?r:[r]).forEach(function(t){if(3!==t.length)throw new Error('There where clouse is not properly formatted, expecting: ["attribute", "operator","value"] but got "'+JSON.stringify(t)+'" ');e.whereArray.push(t)}),this},andWhere:function(){for(var e=this,t=arguments.length,r=Array(t),n=0;n<t;n++)r[n]=arguments[n];return this.chainReference.push({method:"andWhere",args:r}),(r=Array.isArray(r[0])?r:[r]).forEach(function(t){if(3!==t.length)throw new Error('There where clouse is not properly formatted, expecting: ["attribute", "operator","value"] but got "'+JSON.stringify(t)+'" ');e.whereArray.push(t)}),this},orWhere:function(){for(var e=this,t=arguments.length,r=Array(t),n=0;n<t;n++)r[n]=arguments[n];return this.chainReference.push({method:"orWhere",args:r}),(r=Array.isArray(r[0])?r:[r]).forEach(function(t){if(3!==t.length)throw new Error('There orWhere clouse is not properly formatted, expecting: ["attribute", "operator","value"] but got "'+JSON.stringify(t)+'" ');e.orWhereArray.push(t)}),this},limit:function(e){return this.chainReference.push({method:"limit",args:e}),this.limitNumber=e,this},take:function(e){return this.limit(e)},pluck:function(e){var t=this;return c(regeneratorRuntime.mark(function r(){var n;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return t.chainReference.push({method:"pluck",args:e}),r.next=3,t.get();case 3:return n=(n=r.sent).map(function(t){var r=o.default.getFromPath(t,e,void 0);if(void 0!==r.value)return r.value}),r.abrupt("return",n);case 6:case"end":return r.stop()}},r,t)}))()},orderBy:function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return this.chainReference.push({method:"orderBy",args:t}),this.orderByArray=t,this},jsApplyOrderBy:function(e){var t=[].concat(s(e));if(0===this.orderByArray.length)return t;var r=this.orderByArray[0];if(this.selectArray.length>0&&(r.includes(".")||r.includes("[")))throw new Error('Cannot orderBy nested attribute "'+r+'" when using Select. You must rename the attribute');var n=this.orderByArray[1],i=this.orderByArray[2];return i||(i="string"),t=t.sort(function(e,t){var a=o.default.getFromPath(e,r,void 0).value,s=o.default.getFromPath(t,r,void 0).value;if(void 0===a||void 0===s)throw new Error('Cannot order by property "'+r+'" not all values have this property');return i.includes("string")||i.includes("number")?"asc"===n?a>s?1:a<s?-1:0:a>s?-1:a<s?1:0:i.includes("date")?"asc"===n?new Date(a)-new Date(s):new Date(s)-new Date(a):void 0})},prepareInput:function(e){var t=[];return e.forEach(function(e){var r=Array.isArray(e)?e:e.split(",");r=r.map(function(e){return e.trim()}),t=t.concat(r)}),t.filter(function(e,t,r){return r.indexOf(e)===t}),t},ArrayInsert:function(e,t){var r=this;return c(regeneratorRuntime.mark(function n(){var o,i,a,s,c,u,f,l;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:o=1,i=e.length,a=!0,s=!1,c=void 0,n.prev=5,u=e[Symbol.iterator]();case 7:if(a=(f=u.next()).done){n.next=26;break}return l=f.value,t&&t.showProgress&&console.log("Inserting "+o+" of "+i),n.prev=10,n.next=13,r.insert(l,t);case 13:n.sent,t&&t.showProgress&&console.log("Element "+o+" inserted"),o++,n.next=23;break;case 18:n.prev=18,n.t0=n.catch(10),console.log("ERROR - Element "+o+" - "+JSON.stringify(l)+" could not be inserted"),console.log(n.t0),o++;case 23:a=!0,n.next=7;break;case 26:n.next=32;break;case 28:n.prev=28,n.t1=n.catch(5),s=!0,c=n.t1;case 32:n.prev=32,n.prev=33,!a&&u.return&&u.return();case 35:if(n.prev=35,!s){n.next=38;break}throw c;case 38:return n.finish(35);case 39:return n.finish(32);case 40:case"end":return n.stop()}},n,r,[[5,28,32,40],[10,18],[33,,35,39]])}))()}}})}])});
//# sourceMappingURL=fast-fluent.min.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fastFluent = __webpack_require__(1);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _moment = __webpack_require__(3);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// TODO We still have to figure out how to solve the problem of
// The CONFIG URL and FLUENT_URL changing on APP sync
// Every page refresh will make the urls go back to their default
exports.default = _fastFluent.Fluent.model({
  properties: {
    name: "Configuration",
    config: {
      remote: {
        connector: 'formioConfig',
        token: ''
      }
    }
  },
  methods: {
    /**
     * Decides whether to set Configurations
     * Online or Offline
     * @param {Object} config.appConfig The application Config
     * @param {Boolean} config.forceOnline If we need online
     */
    set: function set(_ref) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var appConf = _ref.appConf,
            forceOnline = _ref.forceOnline;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (forceOnline) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", _this.setOffline({ appConf: appConf }));

              case 2:
                return _context.abrupt("return", _this.setOnline({ appConf: appConf }));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },

    /**
     *
     * @param {*} param0
     */
    setOffline: function setOffline(_ref2) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var appConf = _ref2.appConf;
        var localConfig, localConfigDate, offlineConfigDate;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this2.local().first();

              case 2:
                localConfig = _context2.sent;
                localConfigDate = _this2.getConfigDate(localConfig);
                offlineConfigDate = appConf.offlineFiles.lastUpdated.date;

                // If local config is newer than offline

                if (!(localConfigDate > offlineConfigDate)) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", localConfig);

              case 7:
                if (!localConfig) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 10;
                return _this2.local().clear({ sure: true });

              case 10:
                return _context2.abrupt("return", _this2.local().insert(_extends({}, appConf.offlineFiles.Configuration.data, {
                  fastUpdated: (0, _moment2.default)().unix()
                })));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },

    /**
     *
     * @param {*} param0
     */
    setOnline: function setOnline(_ref3) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var appConf = _ref3.appConf;
        var localConfig, remoteConfig;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this3.local().first();

              case 2:
                localConfig = _context3.sent;
                _context3.next = 5;
                return _this3.remote().first();

              case 5:
                remoteConfig = _context3.sent;

                if (!(!localConfig && !remoteConfig)) {
                  _context3.next = 8;
                  break;
                }

                throw new Error("Application is not connected to internet, or the configuration file cannot be pulled");

              case 8:
                if (remoteConfig) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt("return", localConfig);

              case 10:
                if (!localConfig) {
                  _context3.next = 13;
                  break;
                }

                _context3.next = 13;
                return _this3.local().clear({ sure: true });

              case 13:
                return _context3.abrupt("return", _this3.local().insert(_extends({}, remoteConfig.data, {
                  fastUpdated: (0, _moment2.default)().unix()
                })));

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this3);
      }))();
    },

    /**
     *
     * @param {*} config
     */
    getConfigDate: function getConfigDate(config) {
      return _utilities2.default.get(function () {
        return config.fastUpdated;
      }, 0);
    }
  }
}).compose(_fastFluent.Fluent.privatize).privatizeMethods("setOnlineConfig", "setOfflineConfig", "getConfigDate", "assingGlobalVariable", "getRemote")();

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = __webpack_require__(3);

var _moment2 = _interopRequireDefault(_moment);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _fastFluent = __webpack_require__(1);

var _Labels = __webpack_require__(25);

var _Labels2 = _interopRequireDefault(_Labels);

var _Configuration = __webpack_require__(2);

var _Configuration2 = _interopRequireDefault(_Configuration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _fastFluent.Fluent.model({
  properties: {
    name: 'Form',
    config: {
      remote: {
        path: 'form',
        pullForm: true
      }
    }
  },
  methods: {
    getModel: function getModel(_ref) {
      var path = _ref.path;

      return _fastFluent.Fluent.model({
        properties: {
          config: {
            remote: { path: path }
          }
        }
      })();
    },
    find: function find(_ref2) {
      var path = _ref2.path;

      return this.local().where('data.path', '=', path).first();
    },

    /**
     *
     * @param {*} action
     */
    cardFormattedForms: function cardFormattedForms(action) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.local().get();

              case 2:
                result = _context.sent;

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
                return _context.abrupt('return', result);

              case 8:
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
    FormLabels: function FormLabels(i18n) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var forms;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this2.local().get();

              case 2:
                forms = _context2.sent;
                return _context2.abrupt('return', _Labels2.default.get(forms, i18n));

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },

    /**
     *
     * @param {*} forms
     */
    getUpdatedAt: function getUpdatedAt(forms) {
      return _utilities2.default.get(function () {
        return forms[0].fastUpdated;
      }, 0);
    },

    /**
     *
     * @param {*} param0
     */
    setOffline: function setOffline(_ref3) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var appConf = _ref3.appConf;
        var localForms, localDate, config, offlineForms;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this3.local().get();

              case 2:
                localForms = _context4.sent;
                localDate = _this3.getUpdatedAt(localForms);
                _context4.next = 6;
                return _Configuration2.default.local().first();

              case 6:
                config = _context4.sent;
                offlineForms = _utilities2.default.get(function () {
                  return appConf.offlineFiles.Forms;
                });

                // If the JSON file is newer than the local
                // DB data

                if (!(config.fastUpdated < localDate)) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt('return', localForms);

              case 10:
                if (!localForms) {
                  _context4.next = 13;
                  break;
                }

                _context4.next = 13;
                return _this3.local().clear({ sure: true });

              case 13:

                offlineForms.forEach(function () {
                  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(form) {
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return _this3.local().insert({ data: form, fastUpdated: (0, _moment2.default)().unix() });

                          case 2:
                          case 'end':
                            return _context3.stop();
                        }
                      }
                    }, _callee3, _this3);
                  }));

                  return function (_x) {
                    return _ref4.apply(this, arguments);
                  };
                }());
                return _context4.abrupt('return', offlineForms);

              case 15:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this3);
      }))();
    },

    /**
     *
     */
    setOnline: function setOnline() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var remoteForms, unixDate;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _this4.remote().get();

              case 2:
                remoteForms = _context6.sent;
                unixDate = (0, _moment2.default)().unix();

                if (!(remoteForms && !_utilities2.default.isEmpty(remoteForms))) {
                  _context6.next = 8;
                  break;
                }

                _context6.next = 7;
                return _this4.local().clear({ sure: true });

              case 7:
                remoteForms.forEach(function () {
                  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(form) {
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _context5.next = 2;
                            return _this4.local().insert({
                              data: form,
                              fastUpdated: unixDate
                            });

                          case 2:
                          case 'end':
                            return _context5.stop();
                        }
                      }
                    }, _callee5, _this4);
                  }));

                  return function (_x2) {
                    return _ref5.apply(this, arguments);
                  };
                }());

              case 8:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, _this4);
      }))();
    },

    /**
     *
     * @param {*} param0
     */
    set: function set(_ref6) {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var appConf = _ref6.appConf,
            forceOnline = _ref6.forceOnline;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (forceOnline) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt('return', _this5.setOffline({ appConf: appConf }));

              case 2:
                return _context7.abrupt('return', _this5.setOnline());

              case 3:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, _this5);
      }))();
    },
    getFastTableTemplates: function getFastTableTemplates(_ref7) {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var path = _ref7.path;
        var fullForm, templates;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _this6.local().where('data.path', '=', path).first();

              case 2:
                fullForm = _context8.sent;
                templates = [];


                _utilities2.default.eachComponent(fullForm.data.components, function (c) {
                  if (c.properties && c.properties.FAST_TABLE_TEMPLATE) {
                    templates.push({
                      key: c.key,
                      template: c.properties.FAST_TABLE_TEMPLATE
                    });
                  }
                });

                return _context8.abrupt('return', templates);

              case 6:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, _this6);
      }))();
    }
  }
})();

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Event = __webpack_require__(10);

var _Event2 = _interopRequireDefault(_Event);

var _bluebird = __webpack_require__(5);

var _bluebird2 = _interopRequireDefault(_bluebird);

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
var Connection = function () {
  var online = typeof window !== 'undefined' && window && window.navigator ? window.navigator.onLine : true;

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
      _axios2.default.get('https://yesno.wtf/api').then(function (res) {
        resolve(true);
      }).catch(function (err) {
        resolve(false);
      });
    });
  }

  return Object.freeze({
    isOnline: isOnline,
    initEventListeners: initEventListeners
  });
}();

exports.default = Connection;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Auth = __webpack_require__(14);

var _Auth2 = _interopRequireDefault(_Auth);

var _moment = __webpack_require__(3);

var _moment2 = _interopRequireDefault(_moment);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _Form = __webpack_require__(4);

var _Form2 = _interopRequireDefault(_Form);

var _fastFluent = __webpack_require__(1);

var _Columns = __webpack_require__(30);

var _Columns2 = _interopRequireDefault(_Columns);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _fastFluent.Fluent.model({
  properties: {
    name: "Submission",
    config: {
      remote: undefined
    }
  },
  init: function init(_ref) {
    var path = _ref.path;

    this.path = path;
    this.config = {
      remote: { path: path }
    };
  },

  methods: {
    form: function form() {
      // return this.belongTo('Form', 'path', 'path');

      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },
    getUnsync: function getUnsync() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var unsynced;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this2.local().where("sync", "=", false).andWhere("draft", "=", false).andWhere("syncError", "=", false).owner(_Auth2.default.email()).orderBy("created", "desc", "date").get();

              case 2:
                _context2.t0 = function (d) {
                  return !d.queuedForSync;
                };

                unsynced = _context2.sent.filter(_context2.t0);
                return _context2.abrupt("return", unsynced);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },
    showView: function showView(_ref2) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var from = _ref2.from,
            limit = _ref2.limit,
            owner = _ref2.owner;
        var cols, submissions, templates;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _Columns2.default.getTableView(_this3.path);

              case 2:
                _context3.t0 = function (o) {
                  return "data." + o.path + " as " + o.path;
                };

                cols = _context3.sent.map(_context3.t0);


                cols = [].concat(_toConsumableArray(cols), ["_id", "created", "modified", "syncError", "draft", "sync"]);

                submissions = [];

                if (!(from === "remote")) {
                  _context3.next = 12;
                  break;
                }

                _context3.next = 9;
                return _this3.remote().select(cols).limit(limit).get();

              case 9:
                submissions = _context3.sent;
                _context3.next = 15;
                break;

              case 12:
                _context3.next = 14;
                return _this3.merged().select(cols).limit(limit).owner(owner).get();

              case 14:
                submissions = _context3.sent;

              case 15:
                _context3.next = 17;
                return _Form2.default.getFastTableTemplates({ path: _this3.path });

              case 17:
                templates = _context3.sent;


                submissions = submissions.map(function (s) {
                  var sub = {
                    _id: s._id,
                    status: s.sync === false ? "offline" : "online",
                    draft: s.draft,
                    HumanUpdated: Number.isInteger(s.modified) ? _moment2.default.unix(s.modified).fromNow() : (0, _moment2.default)(s.modified).fromNow(),
                    syncError: s.syncError ? s.syncError : false,
                    updated: Number.isInteger(s.modified) ? s.modified : (0, _moment2.default)(s.modified).unix()
                  };

                  // Custom templates using FAST_TABLE_TEMPLATE propertie
                  templates.forEach(function (t) {
                    /* eslint-disable */
                    var newFx = new Function("value", "data", t.template);
                    /* eslint-enable */
                    try {
                      s[t.key] = newFx(s[t.key], s);
                    } catch (error) {
                      console.log("There is an error in one of your calculations", error);
                    }
                  });

                  return _extends({}, sub, s);
                });

                submissions = submissions.sort(function (a, b) {
                  a = new Date(a.updated);
                  b = new Date(b.updated);
                  return a > b ? -1 : a < b ? 1 : 0;
                });

                return _context3.abrupt("return", submissions);

              case 21:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this3);
      }))();
    },
    getParallelParticipants: function getParallelParticipants(_id) {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var currentSubmission, groupId, submissions, a;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this4.local().where("_id", "=", _id).get();

              case 2:
                currentSubmission = _context4.sent;


                currentSubmission = currentSubmission[0];
                groupId = _utilities2.default.get(function () {
                  return currentSubmission.data.data.parallelSurvey;
                });


                groupId = groupId && groupId !== "[object Object]" ? JSON.parse(groupId).groupId : undefined;

                _context4.next = 8;
                return _this4.local().where("path", "=", _this4.path).get();

              case 8:
                submissions = _context4.sent;
                a = submissions.filter(function (submission) {
                  var parallelSurveyID = _utilities2.default.get(function () {
                    return submission.data.data.parallelSurvey;
                  });

                  parallelSurveyID = parallelSurveyID && parallelSurveyID !== "[object Object]" ? JSON.parse(parallelSurveyID).groupId : undefined;
                  return parallelSurveyID && parallelSurveyID === groupId;
                });


                a = a.map(function (e) {
                  e.data.data.parallelSurvey;
                });
                a = a.map(function (survey) {
                  return JSON.parse(survey);
                });
                return _context4.abrupt("return", a);

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, _this4);
      }))();
    },
    getParallelSurvey: function getParallelSurvey(submission) {
      var parallelsurveyInfo = _utilities2.default.get(function () {
        return submission.data.data.paraparallelSurvey;
      }) || _utilities2.default.get(function () {
        return submission.data.parallelSurvey;
      });

      parallelsurveyInfo = parallelsurveyInfo && parallelsurveyInfo !== "[object Object]" ? JSON.parse(parallelsurveyInfo) : undefined;

      return parallelsurveyInfo;
    },
    setParallelSurvey: function setParallelSurvey(parallelsurveyInfo) {
      return JSON.stringify(parallelsurveyInfo);
    },
    getGroups: function getGroups(formId) {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var submissions, groups;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _this5.local().find();

              case 2:
                submissions = _context5.sent;


                submissions = formId ? submissions.filter(function (submission) {
                  return submission.data.formio.formId === formId;
                }) : submissions;

                groups = submissions.map(function (submission) {
                  return _this5.local().getParallelSurvey(submission) ? {
                    groupId: _this5.local().getParallelSurvey(submission).groupId,
                    groupName: _this5.local().getParallelSurvey(submission).groupName
                  } : undefined;
                });


                groups = groups.filter(function (group) {
                  return typeof group !== "undefined";
                });

                return _context5.abrupt("return", _utilities2.default.uniqBy(groups, "groupId"));

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, _this5);
      }))();
    },
    getGroup: function getGroup(id) {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var groups;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _this6.local().getGroups();

              case 2:
                groups = _context6.sent;


                groups = groups.filter(function (group) {
                  return group.groupId === id;
                });
                return _context6.abrupt("return", groups[0]);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, _this6);
      }))();
    },
    removeFromGroup: function removeFromGroup(submission) {
      var _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, _this7);
      }))();
    },
    assingToGroup: function assingToGroup(submissionId, groupId) {
      var _this8 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var group, submission, parallelData, parallelSurvey;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _this8.local().getGroup(groupId[0]);

              case 2:
                group = _context8.sent;
                _context8.next = 5;
                return _this8.local().get(submissionId);

              case 5:
                submission = _context8.sent;
                parallelData = _this8.local().getParallelSurvey(submission);
                parallelSurvey = _extends({}, parallelData, {
                  groupId: group.groupId,
                  groupName: group.groupName
                });


                submission.data.data.parallelSurvey = _this8.local().setParallelSurvey(parallelSurvey);
                _context8.next = 11;
                return _this8.local().update(submission);

              case 11:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, _this8);
      }))();
    }
  }
});

/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__9__;

/***/ }),
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _fastFluent = __webpack_require__(1);

var _Configuration = __webpack_require__(2);

var _Configuration2 = _interopRequireDefault(_Configuration);

var _moment = __webpack_require__(3);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _fastFluent.Fluent.model({
  properties: {
    name: 'Translation',
    config: {
      remote: {
        path: 'translations'
      }
    }
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
                return _this.local().first();

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
                return _this2.local().get();

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
      return __webpack_require__(26);
    },

    /**
     *
     * @param {*} localTranslations
     */
    getLocalizationDate: function getLocalizationDate(localTranslations) {
      return _utilities2.default.get(function () {
        return localTranslations[0].fastUpdated;
      }, 0);
    },

    /**
     * [authenticate description]
     * @param  {[type]} username [description]
     * @param  {[type]} password [description]
     * @return {[type]}          [description]
     */
    set: function set(_ref) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var appConf = _ref.appConf,
            forceOnline = _ref.forceOnline;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (forceOnline) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt('return', _this3.setOffline({ appConf: appConf }));

              case 2:
                return _context3.abrupt('return', _this3.setOnline({ appConf: appConf }));

              case 3:
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
    setOffline: function setOffline(_ref2) {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var appConf = _ref2.appConf;
        var localTranslations, localDate, config, offlineTranslations, trans;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this4.local().get();

              case 2:
                localTranslations = _context4.sent;
                localDate = _this4.getLocalizationDate(localTranslations);
                _context4.next = 6;
                return _Configuration2.default.local().first();

              case 6:
                config = _context4.sent;
                offlineTranslations = appConf.offlineFiles.Translations;

                // If the offline Json is older than the local data

                if (!(config.fastUpdated < localDate)) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt('return', localTranslations[0].data);

              case 10:
                _context4.next = 12;
                return _this4.process(offlineTranslations);

              case 12:
                trans = _context4.sent;
                return _context4.abrupt('return', _this4.storeTranslations(trans));

              case 14:
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
    setOnline: function setOnline(_ref3) {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var appConf = _ref3.appConf;
        var localTranslations, appTranslations;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _this5.local().get();

              case 2:
                localTranslations = _context5.sent;
                _context5.next = 5;
                return _this5.remote().limit(50000).get();

              case 5:
                appTranslations = _context5.sent;

                if (!appTranslations) {
                  _context5.next = 14;
                  break;
                }

                _context5.next = 9;
                return _this5.process(appTranslations);

              case 9:
                appTranslations = _context5.sent;
                _context5.next = 12;
                return _this5.storeTranslations(appTranslations);

              case 12:
                appTranslations = _context5.sent;
                return _context5.abrupt('return', appTranslations);

              case 14:
                if (!(localTranslations.length > 0 && localTranslations[0].data)) {
                  _context5.next = 16;
                  break;
                }

                return _context5.abrupt('return', localTranslations[0].data);

              case 16:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this5);
      }))();
    },

    /**
     *
     * @param {*} translationsArray
     */
    storeTranslations: function storeTranslations(translationsArray) {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var appTranslations;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // Remove all previous translations
                _this6.local().clear({ sure: true });

                // Insert the new ones
                _context6.next = 3;
                return _this6.local().insert({
                  data: translationsArray,
                  fastUpdated: (0, _moment2.default)().unix()
                });

              case 3:
                appTranslations = _context6.sent;
                return _context6.abrupt('return', appTranslations.data);

              case 5:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, _this6);
      }))();
    },

    /**
     * [setTranslations description]
     * @param {[type]} appTranslations [description]
     */
    process: function process(translations) {
      var _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var lenguages, result;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                lenguages = _this7.getIsoLanguages();
                result = {};


                result.label = {};
                // Foreach of the locale lenguages, set the translations
                lenguages.forEach(function (language) {
                  translations.forEach(function (translation) {
                    if (translation.data && translation.data[language.code]) {
                      if (!result[language.code]) {
                        result[language.code] = {};
                      }
                      result[language.code][translation.data.label] = translation.data[language.code];
                    }

                    if (translation.data && translation.data.label) {
                      result['label'][translation.data.label] = translation.data.label;
                    }
                  });
                });

                return _context7.abrupt('return', result);

              case 5:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, _this7);
      }))();
    },
    updateLabel: function updateLabel(label, translation) {
      var _this8 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var trans, id, newTranslations, result;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _this8.remote().where('data.label', '=', label).first();

              case 2:
                trans = _context8.sent;
                id = trans._id;
                newTranslations = _extends({}, trans.data, translation);
                _context8.next = 7;
                return _this8.remote().update({
                  _id: id,
                  data: newTranslations
                });

              case 7:
                result = _context8.sent;
                return _context8.abrupt('return', result);

              case 9:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, _this8);
      }))();
    },
    createTranslation: function createTranslation(label) {
      var _this9 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                return _context9.abrupt('return', _this9.remote().insert({
                  data: {
                    en: label,
                    label: label
                  }
                }));

              case 1:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, _this9);
      }))();
    }
  }
})();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fastFluent = __webpack_require__(1);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _Configuration = __webpack_require__(2);

var _Configuration2 = _interopRequireDefault(_Configuration);

var _awaitToJs = __webpack_require__(8);

var _awaitToJs2 = _interopRequireDefault(_awaitToJs);

var _moment = __webpack_require__(3);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _fastFluent.Fluent.model({
  properties: {
    name: "Pages",
    config: {
      remote: {
        path: "fast-app-pages",
        token: undefined
      }
    }
  },
  methods: {
    /**
     * Decides whether to set submissions
     * Online or Offline
     * @param {Object} config.appConfig The application Config
     * @param {Boolean} config.forceOnline If we need online
     */
    set: function set(_ref) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var appConf = _ref.appConf,
            forceOnline = _ref.forceOnline;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (forceOnline) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", _this.setOffline({ appConf: appConf }));

              case 2:
                return _context.abrupt("return", _this.setOnline());

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },

    /**
     * Sets all pages from the offline
     * JSON files
     * @param {Object} appConfig Application config
     * @return {Object} App pages
     */
    setOffline: function setOffline(_ref2) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var appConf = _ref2.appConf;
        var localPages, localDate, config, offlinePages, p, i;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this2.local().first();

              case 2:
                localPages = _context2.sent;
                localDate = _this2.getUpdatedDate(localPages);
                _context2.next = 6;
                return _Configuration2.default.local().first();

              case 6:
                config = _context2.sent;
                offlinePages = _utilities2.default.get(function () {
                  return appConf.offlineFiles.Pages[0].data;
                });

                // Check if pages follows new or legacy format

                if (!offlinePages.hasOwnProperty("pages")) {
                  p = [];


                  for (i = 0; i < appConf.offlineFiles.Pages.length; i += 1) {
                    p.push(appConf.offlineFiles.Pages[i].data);
                  }

                  offlinePages = {
                    pages: p,
                    submit: true
                  };
                }

                // If the configuration in the JSON file is
                // older than the one in the local DB

                if (!(config.fastUpdated < localDate)) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", _utilities2.default.get(function () {
                  return localPages.data;
                }));

              case 11:
                if (!localPages) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 14;
                return _this2.local().clear({ sure: true });

              case 14:
                return _context2.abrupt("return", _this2.local().insert(_extends({}, offlinePages, {
                  fastUpdated: (0, _moment2.default)().unix()
                })));

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },

    /**
     * Sets all pages from the online
     * JSON files
     * @return {Object} App pages
     */
    setOnline: function setOnline() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var localPages, _ref3, _ref4, error, pages, p, i;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this3.local().first();

              case 2:
                localPages = _context3.sent;
                _context3.next = 5;
                return (0, _awaitToJs2.default)(_this3.remote().get());

              case 5:
                _ref3 = _context3.sent;
                _ref4 = _slicedToArray(_ref3, 2);
                error = _ref4[0];
                pages = _ref4[1];

                if (!error) {
                  _context3.next = 12;
                  break;
                }

                console.log(error);
                throw new Error("Could not get remote Pages.");

              case 12:

                // Check if pages follows new or legacy format
                if (!pages[0].data.hasOwnProperty("pages")) {
                  p = [];


                  for (i = 0; i < pages.length; i += 1) {
                    p.push(pages[i].data);
                  }

                  pages = {
                    pages: p,
                    submit: true
                  };
                } else {
                  pages = _utilities2.default.get(function () {
                    return pages[0].data;
                  });
                }

                pages = console.log("pages", pages);

                // If we pulled the remote pages and
                // The submission is not empty

                if (!(pages && !_utilities2.default.isEmpty(pages))) {
                  _context3.next = 19;
                  break;
                }

                if (!localPages) {
                  _context3.next = 18;
                  break;
                }

                _context3.next = 18;
                return _this3.local().clear({ sure: true });

              case 18:
                return _context3.abrupt("return", _this3.local().insert(_extends({}, pages, { fastUpdated: (0, _moment2.default)().unix() })));

              case 19:
                return _context3.abrupt("return", localPages);

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this3);
      }))();
    },

    /**
     * Takes the local pages and gets the
     * updated at date
     *
     * @param {Array} pages Array of local pages
     * @returns {number} date las updated
     */
    getUpdatedDate: function getUpdatedDate(pages) {
      return _utilities2.default.get(function () {
        return pages.fastUpdated;
      }, 0);
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

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _axios = __webpack_require__(9);

var _axios2 = _interopRequireDefault(_axios);

var _Configuration = __webpack_require__(2);

var _Configuration2 = _interopRequireDefault(_Configuration);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _fastFluent = __webpack_require__(1);

var _Connection = __webpack_require__(6);

var _Connection2 = _interopRequireDefault(_Connection);

var _awaitToJs = __webpack_require__(8);

var _awaitToJs2 = _interopRequireDefault(_awaitToJs);

var _Form = __webpack_require__(4);

var _Form2 = _interopRequireDefault(_Form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _fastFluent.Fluent.model({
  properties: {
    name: 'User',
    config: {
      remote: {
        path: 'user',
        token: undefined
      }
    }
  },
  methods: {
    storeLocally: function storeLocally(user) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var localUser, isUserAlreadyStored, _ref, _ref2, error, onlineUser;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.local().where('data.email', '=', user.data.email).first();

              case 2:
                localUser = _context.sent;


                user = _utilities2.default.deleteNulls(user);
                isUserAlreadyStored = !!localUser && !_utilities2.default.isEmpty(localUser);

                //  check if user is already present in local storage

                if (!isUserAlreadyStored) {
                  _context.next = 7;
                  break;
                }

                throw new Error('The user email is already taken');

              case 7:
                if (!_Connection2.default.isOnline()) {
                  _context.next = 17;
                  break;
                }

                _context.next = 10;
                return (0, _awaitToJs2.default)(_Form2.default.getModel({ path: 'userregister' }).remote().insert(user));

              case 10:
                _ref = _context.sent;
                _ref2 = _slicedToArray(_ref, 2);
                error = _ref2[0];
                onlineUser = _ref2[1];

                if (!error) {
                  _context.next = 16;
                  break;
                }

                throw new Error('The user email is already taken');

              case 16:
                return _context.abrupt('return', _this.local().insert(onlineUser));

              case 17:
                return _context.abrupt('return', _this.local().insert(user));

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },
    updateUser: function updateUser(user) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var localUser;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this2.local().where('data.email', '=', user.data.email).pluck('_id');

              case 2:
                localUser = _context3.sent;


                localUser.forEach(function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_id) {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return _this2.local().remove(_id);

                          case 2:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this2);
                  }));

                  return function (_x) {
                    return _ref3.apply(this, arguments);
                  };
                }());

                user = _utilities2.default.deleteNulls(user);

                return _context3.abrupt('return', _this2.local().insert(user));

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }))();
    },
    login: function login(_ref4) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var credentials = _ref4.credentials,
            role = _ref4.role;
        var url;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _Configuration2.default.local().first();

              case 2:
                url = _context4.sent.APP_URL;


                if (role === 'admin') {
                  url = url + '/admin/login';
                } else {
                  url = url + '/user/login';
                }
                return _context4.abrupt('return', _axios2.default.post(url, {
                  data: credentials
                }));

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this3);
      }))();
    }
  }
})();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Configuration = __webpack_require__(2);

var _Configuration2 = _interopRequireDefault(_Configuration);

var _md = __webpack_require__(17);

var _md2 = _interopRequireDefault(_md);

var _User = __webpack_require__(13);

var _User2 = _interopRequireDefault(_User);

var _Connection = __webpack_require__(6);

var _Connection2 = _interopRequireDefault(_Connection);

var _Role = __webpack_require__(15);

var _Role2 = _interopRequireDefault(_Role);

var _bluebird = __webpack_require__(5);

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
              return _Configuration2.default.local().first();

            case 3:
              config = _context.sent;


              // Hash password
              hashedPassword = (0, _md2.default)(password, config.MD5_KEY);

              // Get the user

              _context.next = 7;
              return _User2.default.local().where('data.username', '=', username).get();

            case 7:
              dbUser = _context.sent;
              userFound = dbUser && dbUser[0] ? dbUser[0] : undefined;

              if (userFound) {
                _context.next = 11;
                break;
              }

              throw new Error();

            case 11:
              // Compare hashed passwords
              isValidUser = userFound.data.hashedPassword === hashedPassword;

              if (isValidUser) {
                _context.next = 14;
                break;
              }

              throw new Error();

            case 14:
              return _context.abrupt('return', userFound);

            case 15:
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
  var remoteAuthenticate = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(credentials, baseUrl, role) {
      var response, user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _User2.default.login({ credentials: credentials, role: role });

            case 2:
              response = _context2.sent;
              user = response.data;
              _context2.next = 6;
              return _User2.default.updateUser(user);

            case 6:
              return _context2.abrupt('return', response);

            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function remoteAuthenticate(_x2, _x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  /**
   *
   * Authenticates the User with the given credentials
   * @param {any} credentials
   * @param {any} baseUrl
   * @param {any} role
   * @returns
   */
  var authenticate = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(credentials, baseUrl, role) {
      var isOnline;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _Connection2.default.isOnline();

            case 2:
              isOnline = _context3.sent;

              if (!isOnline) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt('return', remoteAuthenticate(credentials, baseUrl, role));

            case 5:
              return _context3.abrupt('return', localAuthenticate(credentials, baseUrl));

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function authenticate(_x5, _x6, _x7) {
      return _ref3.apply(this, arguments);
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
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(response) {
          var headers, user, roles;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
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
                  _context4.next = 7;
                  return _Role2.default.local().first();

                case 7:
                  roles = _context4.sent;


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

                case 12:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this);
        }));

        return function (_x8) {
          return _ref4.apply(this, arguments);
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
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(rolesIds) {
      var appRoles, roles;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(!rolesIds || _utilities2.default.isEmpty(rolesIds))) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt('return', true);

            case 2:
              _context5.next = 4;
              return _Role2.default.local().first();

            case 4:
              appRoles = _context5.sent;
              roles = rolesIds.reduce(function (reducer, roleId) {
                Object.keys(appRoles).forEach(function (role) {
                  if (appRoles[role] && appRoles[role]._id && appRoles[role]._id === roleId) {
                    reducer.push(appRoles[role].title);
                  }
                });
                return reducer;
              }, []);
              return _context5.abrupt('return', roles.some(function (role) {
                return hasRole(role) || role === 'Authenticated';
              }));

            case 7:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function hasRoleIdIn(_x9) {
      return _ref5.apply(this, arguments);
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
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return localStorage.removeItem('authUser');

            case 2:
              _context6.next = 4;
              return localStorage.removeItem('formioToken');

            case 4:
              _context6.next = 6;
              return localStorage.removeItem('formioUser');

            case 6:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function logOut() {
      return _ref6.apply(this, arguments);
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fastFluent = __webpack_require__(1);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _Connection = __webpack_require__(6);

var _Connection2 = _interopRequireDefault(_Connection);

var _awaitToJs = __webpack_require__(8);

var _awaitToJs2 = _interopRequireDefault(_awaitToJs);

var _moment = __webpack_require__(3);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _fastFluent.Fluent.model({
  properties: {
    name: 'Role',
    config: {
      remote: {
        path: 'access',
        token: undefined,
        pullForm: true
      }
    }
  },
  methods: {
    set: function set(_ref) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var url = _ref.url,
            appConf = _ref.appConf,
            forceOnline = _ref.forceOnline;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (forceOnline) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', _this.setOffline({ appConf: appConf }));

              case 2:
                return _context.abrupt('return', _this.setOnline({ url: url }));

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },
    getRolesDate: function getRolesDate(localRoles) {
      return _utilities2.default.get(function () {
        return localRoles.fastUpdated;
      }, 0);
    },
    setOnline: function setOnline() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var error, remoteRoles, localRoles, isOnline, _ref2, _ref3, insertedRoles;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                error = void 0;
                remoteRoles = void 0;
                _context2.next = 4;
                return _this2.local().first();

              case 4:
                localRoles = _context2.sent;
                _context2.next = 7;
                return _Connection2.default.isOnline();

              case 7:
                isOnline = _context2.sent;

                if (!isOnline) {
                  _context2.next = 17;
                  break;
                }

                _context2.next = 11;
                return (0, _awaitToJs2.default)(_this2.remote().first());

              case 11:
                _ref2 = _context2.sent;
                _ref3 = _slicedToArray(_ref2, 2);
                error = _ref3[0];
                remoteRoles = _ref3[1];

                if (!error) {
                  _context2.next = 17;
                  break;
                }

                throw new Error(error);

              case 17:

                remoteRoles = _utilities2.default.get(function () {
                  return remoteRoles.roles;
                });

                if (!remoteRoles) {
                  _context2.next = 27;
                  break;
                }

                if (!localRoles) {
                  _context2.next = 22;
                  break;
                }

                _context2.next = 22;
                return _this2.local().clear();

              case 22:
                remoteRoles.fastUpdated = (0, _moment2.default)().unix();

                _context2.next = 25;
                return _this2.local().insert(remoteRoles);

              case 25:
                insertedRoles = _context2.sent;
                return _context2.abrupt('return', insertedRoles);

              case 27:
                return _context2.abrupt('return', localRoles);

              case 28:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },
    setOffline: function setOffline(_ref4) {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var appConf = _ref4.appConf;
        var localRoles, rolesDate, offlineRolesDate, insertedRoles;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this3.local().first();

              case 2:
                localRoles = _context3.sent;
                rolesDate = _this3.getRolesDate(localRoles);
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
                return _this3.local().clear();

              case 9:
                _context3.next = 11;
                return _this3.local().insert(appConf.offlineFiles.Roles);

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
        }, _callee3, _this3);
      }))();
    }
  }
})();

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _User = __webpack_require__(13);

var _User2 = _interopRequireDefault(_User);

var _Auth = __webpack_require__(14);

var _Auth2 = _interopRequireDefault(_Auth);

var _Submission = __webpack_require__(7);

var _Submission2 = _interopRequireDefault(_Submission);

var _OfflineData = __webpack_require__(31);

var _OfflineData2 = _interopRequireDefault(_OfflineData);

var _Scheduler = __webpack_require__(19);

var _Scheduler2 = _interopRequireDefault(_Scheduler);

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
    /**
     *
     * @param {*} db
     * @param {*} vm
     */

  }, {
    key: 'syncSubmission',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var usersAreSync, unsyncSubmissions, isSyncing;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Sync.areUsersSynced();

              case 2:
                usersAreSync = _context2.sent;

                if (usersAreSync) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt('return');

              case 5:
                _context2.next = 7;
                return (0, _Submission2.default)().getUnsync();

              case 7:
                unsyncSubmissions = _context2.sent;
                _context2.next = 10;
                return _Scheduler2.default.isSyncing();

              case 10:
                isSyncing = _context2.sent;


                if (unsyncSubmissions.length > 0 && !isSyncing) {
                  _OfflineData2.default.send(unsyncSubmissions);
                }

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function syncSubmission() {
        return _ref2.apply(this, arguments);
      }

      return syncSubmission;
    }()
    /**
     *
     */

  }, {
    key: 'getUsersToSync',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _User2.default.local().where('sync', '=', false).andWhere('queuedForSync', '=', false).andWhere('syncError', '=', false).get();

              case 2:
                return _context3.abrupt('return', _context3.sent);

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getUsersToSync() {
        return _ref3.apply(this, arguments);
      }

      return getUsersToSync;
    }()
    /**
     *
     */

  }, {
    key: 'areUsersSynced',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var users;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return Sync.getUsersToSync();

              case 2:
                users = _context4.sent;
                return _context4.abrupt('return', !!users && Array.isArray(users) && users.length === 0);

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function areUsersSynced() {
        return _ref4.apply(this, arguments);
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
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var users, isSyncing;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return Sync.getUsersToSync();

              case 2:
                users = _context5.sent;
                _context5.next = 5;
                return _Scheduler2.default.isSyncing();

              case 5:
                isSyncing = _context5.sent;


                if (Array.isArray(users) && users.length > 0 && !isSyncing) {
                  _OfflineData2.default.syncUsers(users);
                }

              case 7:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function syncUsers() {
        return _ref5.apply(this, arguments);
      }

      return syncUsers;
    }()
  }]);

  return Sync;
}();

exports.default = Sync;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

(function(){
  var crypt = __webpack_require__(28),
      utf8 = __webpack_require__(18).utf8,
      isBuffer = __webpack_require__(29),
      bin = __webpack_require__(18).bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();


/***/ }),
/* 18 */
/***/ (function(module, exports) {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),
/* 19 */
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
/* 20 */
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
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(37);
var bytesToUuid = __webpack_require__(38);

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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Utilities = exports.Sync = exports.Hash = exports.Role = exports.OfflinePlugin = exports.User = exports.Import = exports.Translation = exports.Configuration = exports.ParallelSurvey = exports.Submission = exports.Pages = exports.Form = exports.Auth = exports.Connection = exports.FAST = exports.Event = exports.Moment = undefined;

var _start = __webpack_require__(24);

var _start2 = _interopRequireDefault(_start);

var _Auth = __webpack_require__(14);

var _Auth2 = _interopRequireDefault(_Auth);

var _Connection = __webpack_require__(6);

var _Connection2 = _interopRequireDefault(_Connection);

var _Event = __webpack_require__(10);

var _Event2 = _interopRequireDefault(_Event);

var _moment = __webpack_require__(42);

var _moment2 = _interopRequireDefault(_moment);

var _Form = __webpack_require__(4);

var _Form2 = _interopRequireDefault(_Form);

var _Pages = __webpack_require__(12);

var _Pages2 = _interopRequireDefault(_Pages);

var _Submission = __webpack_require__(7);

var _Submission2 = _interopRequireDefault(_Submission);

var _ParallelSurvey = __webpack_require__(43);

var _ParallelSurvey2 = _interopRequireDefault(_ParallelSurvey);

var _Configuration = __webpack_require__(2);

var _Configuration2 = _interopRequireDefault(_Configuration);

var _Translation = __webpack_require__(11);

var _Translation2 = _interopRequireDefault(_Translation);

var _Import = __webpack_require__(44);

var _Import2 = _interopRequireDefault(_Import);

var _User = __webpack_require__(13);

var _User2 = _interopRequireDefault(_User);

var _offlinePlugin = __webpack_require__(45);

var _offlinePlugin2 = _interopRequireDefault(_offlinePlugin);

var _Role = __webpack_require__(15);

var _Role2 = _interopRequireDefault(_Role);

var _Hash = __webpack_require__(47);

var _Hash2 = _interopRequireDefault(_Hash);

var _Sync = __webpack_require__(16);

var _Sync2 = _interopRequireDefault(_Sync);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Moment = _moment2.default;
exports.Event = _Event2.default;
exports.FAST = _start2.default;
exports.Connection = _Connection2.default;
exports.Auth = _Auth2.default;
exports.Form = _Form2.default;
exports.Pages = _Pages2.default;
exports.Submission = _Submission2.default;
exports.ParallelSurvey = _ParallelSurvey2.default;
exports.Configuration = _Configuration2.default;
exports.Translation = _Translation2.default;
exports.Import = _Import2.default;
exports.User = _User2.default;
exports.OfflinePlugin = _offlinePlugin2.default;
exports.Role = _Role2.default;
exports.Hash = _Hash2.default;
exports.Sync = _Sync2.default;
exports.Utilities = _utilities2.default;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Configuration = __webpack_require__(2);

var _Configuration2 = _interopRequireDefault(_Configuration);

var _Form = __webpack_require__(4);

var _Form2 = _interopRequireDefault(_Form);

var _Translation = __webpack_require__(11);

var _Translation2 = _interopRequireDefault(_Translation);

var _Pages = __webpack_require__(12);

var _Pages2 = _interopRequireDefault(_Pages);

var _SyncInterval = __webpack_require__(27);

var _SyncInterval2 = _interopRequireDefault(_SyncInterval);

var _Role = __webpack_require__(15);

var _Role2 = _interopRequireDefault(_Role);

var _fastFluent = __webpack_require__(1);

var _FluentConnector = __webpack_require__(32);

var _FluentConnector2 = _interopRequireDefault(_FluentConnector);

var _fluentFormio = __webpack_require__(39);

var _fluentFormio2 = _interopRequireDefault(_fluentFormio);

var _FluentConnector3 = __webpack_require__(41);

var _FluentConnector4 = _interopRequireDefault(_FluentConnector3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import formio from './Fluent/Connectors/remote/Formio/FluentConnector';


/* eslint-disable no-unused-vars */
var FAST = function () {
  /**
   * Loads all configuration for the FAST app
   * This is the main start function and mandatory
   * to execute if you will use it!
   *
   * @param {*} conf
   * @param {*} conf.appConf Configuration of the App
   */
  var start = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
      var appConf = _ref.appConf,
          forceOnline = _ref.forceOnline;
      var config, appTranslations;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (forceOnline) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return _fastFluent.Fluent.config({
                REMOTE_CONNECTORS: [{
                  default: true,
                  name: 'formio',
                  baseUrl: appConf.fluentFormioBaseUrl,
                  connector: _fluentFormio2.default
                }, {
                  name: 'formioConfig',
                  baseUrl: appConf.appConfigUrl,
                  connector: _fluentFormio2.default
                }],
                LOCAL_CONNECTORS: [{
                  name: 'loki',
                  connector: _FluentConnector2.default,
                  default: true
                }],
                MERGE_CONNECTORS: [{
                  default: true,
                  name: 'formioLoki',
                  connector: _FluentConnector4.default
                }]
              });

            case 3:
              _context.next = 5;
              return _Configuration2.default.set({ appConf: appConf, forceOnline: forceOnline });

            case 5:
              config = _context.sent;
              _context.next = 8;
              return _Role2.default.set({ appConf: appConf, forceOnline: forceOnline });

            case 8:
              _context.next = 10;
              return _Pages2.default.set({ appConf: appConf, forceOnline: forceOnline });

            case 10:
              _context.next = 12;
              return _Form2.default.set({ appConf: appConf, forceOnline: forceOnline });

            case 12:
              _context.next = 14;
              return _Translation2.default.set({ appConf: appConf, forceOnline: forceOnline });

            case 14:
              appTranslations = _context.sent;
              return _context.abrupt('return', {
                config: config,
                translations: appTranslations,
                defaultLanguage: localStorage.getItem('defaultLenguage') || 'en'
              });

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function start(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
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
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
      var appConf = _ref3.appConf;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', start({ appConf: appConf, forceOnline: true }));

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function sync(_x2) {
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _Translation = __webpack_require__(11);

var _Translation2 = _interopRequireDefault(_Translation);

var _Pages = __webpack_require__(12);

var _Pages2 = _interopRequireDefault(_Pages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormLabels = function () {
  function FormLabels() {
    _classCallCheck(this, FormLabels);
  }

  _createClass(FormLabels, null, [{
    key: "get",

    /**
     *
     * @param {*} formNameFilter
     * @param {*} languageFilter
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(forms, i18n) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.handle(forms, i18n));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x, _x2) {
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
    key: "handle",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(forms, i18n) {
        var labels, translations;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.fetchAllLabels(forms, i18n);

              case 2:
                labels = _context2.sent;
                _context2.next = 5;
                return _Translation2.default.local().first();

              case 5:
                translations = _context2.sent.data;


                // Merge labels and translations
                Object.keys(translations).forEach(function (languageCode) {
                  var translationsLabels = translations[languageCode];

                  Object.keys(translationsLabels).forEach(function (translationLabel) {
                    if (labels[translationLabel] && translationsLabels[translationLabel] && translationsLabels[translationLabel] !== "") {
                      labels[translationLabel].translations[languageCode] = translationsLabels[translationLabel];
                    }
                  });
                });

                return _context2.abrupt("return", labels);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handle(_x3, _x4) {
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
    key: "fetchAllLabels",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(forms, i18n) {
        var allLabels, formLabels, appLabels, pagesLabels;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                allLabels = {};


                forms = forms.map(function (form) {
                  return form.data;
                });

                formLabels = this.getFormLabels(forms);
                _context3.next = 5;
                return this.getAppLabels(i18n);

              case 5:
                appLabels = _context3.sent;


                allLabels = this.mergeLabels(formLabels, appLabels);

                _context3.t0 = this;
                _context3.next = 10;
                return _Pages2.default.local().first();

              case 10:
                _context3.t1 = _context3.sent;
                _context3.next = 13;
                return _context3.t0.getPagesLabels.call(_context3.t0, _context3.t1);

              case 13:
                pagesLabels = _context3.sent;


                allLabels = this.mergeLabels(allLabels, pagesLabels);

                return _context3.abrupt("return", allLabels);

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function fetchAllLabels(_x5, _x6) {
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
    key: "createOrAdd",
    value: function createOrAdd(_ref4) {
      var labels = _ref4.labels,
          label = _ref4.label;

      var newObject = _extends({}, labels);

      if (!label) {
        return newObject;
      }

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
    key: "mergeLabels",
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
    key: "getFormLabels",
    value: function getFormLabels(Forms) {
      var _this2 = this;

      var componentLabels = {};
      // Extranct all labels for all available forms

      var formioLabelsPositions = ["suffix", "prefix", "addAnother", "removeRow", "saveRow", "legend", "title", "label", "placeholder", "tooltip"];

      Forms.forEach(function (form) {
        // Add title of the Forms to the translations
        componentLabels = _this2.createOrAdd({
          labels: componentLabels,
          label: {
            text: form.title,
            type: "formTitle",
            component: form.path,
            form: form.path,
            picture: null
          }
        });
        // Go across every component
        _utilities2.default.eachComponent(form.components, function (component) {
          // Check for the common translated Items listed above
          formioLabelsPositions.forEach(function (position) {
            if (component[position] && component[position] !== "") {
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
              if (value.label && value.label !== "") {
                componentLabels = _this2.createOrAdd({
                  labels: componentLabels,
                  label: {
                    text: value.label,
                    type: "value",
                    component: component.key,
                    form: form.path,
                    picture: null
                  }
                });
              }
            });
          }

          // Check for HTML tag elements in the forms
          if (component.type === "htmlelement" && component.content !== "") {
            componentLabels = _this2.createOrAdd({
              labels: componentLabels,
              label: {
                text: component.content,
                type: "htmlElement",
                component: component.key,
                form: form.path,
                picture: null
              }
            });
          }

          // Check specificaly for select elements
          if (component.type === "select") {
            if (component.data && component.data.values) {
              component.data.values.forEach(function (value) {
                if (value.label && value.label !== "") {
                  componentLabels = _this2.createOrAdd({
                    labels: componentLabels,
                    label: {
                      text: value.label,
                      type: "selectValue",
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
          if (component.type && component.type === "survey") {
            if (component.questions) {
              // Check for every question on the survey
              component.questions.forEach(function (q) {
                componentLabels = _this2.createOrAdd({
                  labels: componentLabels,
                  label: {
                    text: q.label,
                    type: "surveyLabel",
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
                    type: "surveyValues",
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
    key: "getAppLabels",
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

                return _context4.abrupt("return", translations);

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getAppLabels(_x7) {
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
    key: "getPagesLabels",
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
                  if (page.title && page.title !== "") {
                    pagesLabels = _this4.createOrAdd({
                      labels: pagesLabels,
                      label: {
                        text: page.title,
                        type: "pageTitle",
                        picture: null,
                        page: page
                      }
                    });
                  }
                  page.cards.forEach(function (card) {
                    if (card.title && card.title !== "") {
                      pagesLabels = _this4.createOrAdd({
                        labels: pagesLabels,
                        label: {
                          text: card.title,
                          type: "pageCardTitle",
                          picture: null,
                          card: card,
                          page: page
                        }
                      });
                    }

                    if (card.subtitle && card.subtitle !== "") {
                      _this4.createOrAdd({
                        labels: pagesLabels,
                        label: {
                          text: card.subtitle,
                          type: "pageCardSubtitle",
                          picture: null,
                          card: card,
                          page: page
                        }
                      });
                    }

                    card.actions.forEach(function (action) {
                      if (action.text && action.text !== "") {
                        pagesLabels = _this4.createOrAdd({
                          labels: pagesLabels,
                          label: {
                            text: action.text,
                            type: "pageActionButtonText",
                            picture: null,
                            card: card,
                            page: page
                          }
                        });
                      }
                    });
                  });
                });

                return _context5.abrupt("return", pagesLabels);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getPagesLabels(_x8) {
        return _ref6.apply(this, arguments);
      }

      return getPagesLabels;
    }()
  }]);

  return FormLabels;
}();

exports.default = FormLabels;

/***/ }),
/* 26 */
/***/ (function(module) {

module.exports = [{"code":"ab","direction":"ltr","label":"Abkhazian"},{"code":"aa","direction":"ltr","label":"Afar"},{"code":"af","direction":"ltr","label":"Afrikaans"},{"code":"ak","direction":"ltr","label":"Akan"},{"code":"sq","direction":"ltr","label":"Albanian"},{"code":"am","direction":"ltr","label":"Amharic"},{"code":"ar","direction":"rtl","label":"Arabic"},{"code":"an","direction":"ltr","label":"Aragonese"},{"code":"hy","direction":"ltr","label":"Armenian"},{"code":"as","direction":"ltr","label":"Assamese"},{"code":"av","direction":"ltr","label":"Avaric"},{"code":"ae","direction":"ltr","label":"Avestan"},{"code":"ay","direction":"ltr","label":"Aymara"},{"code":"az","direction":"ltr","label":"Azerbaijani"},{"code":"bm","direction":"ltr","label":"Bambara"},{"code":"ba","direction":"ltr","label":"Bashkir"},{"code":"eu","direction":"ltr","label":"Basque"},{"code":"be","direction":"ltr","label":"Belarusian"},{"code":"bn","direction":"ltr","label":"Bengali"},{"code":"bh","direction":"ltr","label":"Bihari languages"},{"code":"bi","direction":"ltr","label":"Bislama"},{"code":"bs","direction":"ltr","label":"Bosnian"},{"code":"br","direction":"ltr","label":"Breton"},{"code":"bg","direction":"ltr","label":"Bulgarian"},{"code":"my","direction":"ltr","label":"Burmese"},{"code":"ca","direction":"ltr","label":"Catalan, Valencian"},{"code":"km","direction":"ltr","label":"Central Khmer"},{"code":"ch","direction":"ltr","label":"Chamorro"},{"code":"ce","direction":"ltr","label":"Chechen"},{"code":"ny","direction":"ltr","label":"Chichewa"},{"code":"zh","direction":"ltr","label":"Chinese"},{"code":"cu","direction":"ltr","label":"Church Slavonic, Old Bulgarian, Old Church Slavonic"},{"code":"cv","direction":"ltr","label":"Chuvash"},{"code":"kw","direction":"ltr","label":"Cornish"},{"code":"co","direction":"ltr","label":"Corsican"},{"code":"cr","direction":"ltr","label":"Cree"},{"code":"hr","direction":"ltr","label":"Croatian"},{"code":"cs","direction":"ltr","label":"Czech"},{"code":"da","direction":"ltr","label":"Danish"},{"code":"dv","direction":"ltr","label":"Divehi, Dhivehi, Maldivian"},{"code":"nl","direction":"ltr","label":"Dutch, Flemish"},{"code":"dz","direction":"ltr","label":"Dzongkha"},{"code":"en","direction":"ltr","label":"English"},{"code":"eo","direction":"ltr","label":"Esperanto"},{"code":"et","direction":"ltr","label":"Estonian"},{"code":"ee","direction":"ltr","label":"Ewe"},{"code":"fo","direction":"ltr","label":"Faroese"},{"code":"fj","direction":"ltr","label":"Fijian"},{"code":"fi","direction":"ltr","label":"Finnish"},{"code":"fr","direction":"ltr","label":"French"},{"code":"ff","direction":"ltr","label":"Fulah"},{"code":"gd","direction":"ltr","label":"Gaelic, Scottish Gaelic"},{"code":"gl","direction":"ltr","label":"Galician"},{"code":"lg","direction":"ltr","label":"Ganda"},{"code":"ka","direction":"ltr","label":"Georgian"},{"code":"de","direction":"ltr","label":"German"},{"code":"ki","direction":"ltr","label":"Gikuyu, Kikuyu"},{"code":"el","direction":"ltr","label":"Greek (Modern)"},{"code":"kl","direction":"ltr","label":"Greenlandic, Kalaallisut"},{"code":"gn","direction":"ltr","label":"Guarani"},{"code":"gu","direction":"ltr","label":"Gujarati"},{"code":"ht","direction":"ltr","label":"Haitian, Haitian Creole"},{"code":"ha","direction":"ltr","label":"Hausa"},{"code":"he","direction":"ltr","label":"Hebrew"},{"code":"hz","direction":"ltr","label":"Herero"},{"code":"hi","direction":"ltr","label":"Hindi"},{"code":"ho","direction":"ltr","label":"Hiri Motu"},{"code":"hu","direction":"ltr","label":"Hungarian"},{"code":"is","direction":"ltr","label":"Icelandic"},{"code":"io","direction":"ltr","label":"Ido"},{"code":"ig","direction":"ltr","label":"Igbo"},{"code":"id","direction":"ltr","label":"Indonesian"},{"code":"ia","direction":"ltr","label":"Interlingua (International Auxiliary Language Association)"},{"code":"ie","direction":"ltr","label":"Interlingue"},{"code":"iu","direction":"ltr","label":"Inuktitut"},{"code":"ik","direction":"ltr","label":"Inupiaq"},{"code":"ga","direction":"ltr","label":"Irish"},{"code":"it","direction":"ltr","label":"Italian"},{"code":"ja","direction":"ltr","label":"Japanese"},{"code":"jv","direction":"ltr","label":"Javanese"},{"code":"kn","direction":"ltr","label":"Kannada"},{"code":"kr","direction":"ltr","label":"Kanuri"},{"code":"ks","direction":"ltr","label":"Kashmiri"},{"code":"kk","direction":"ltr","label":"Kazakh"},{"code":"rw","direction":"ltr","label":"Kinyarwanda"},{"code":"kv","direction":"ltr","label":"Komi"},{"code":"kg","direction":"ltr","label":"Kongo"},{"code":"ko","direction":"ltr","label":"Korean"},{"code":"kj","direction":"ltr","label":"Kwanyama, Kuanyama"},{"code":"ku","direction":"ltr","label":"Kurdish"},{"code":"ky","direction":"ltr","label":"Kyrgyz"},{"code":"lo","direction":"ltr","label":"Lao"},{"code":"la","direction":"ltr","label":"Latin"},{"code":"lv","direction":"ltr","label":"Latvian"},{"code":"lb","direction":"ltr","label":"Letzeburgesch, Luxembourgish"},{"code":"li","direction":"ltr","label":"Limburgish, Limburgan, Limburger"},{"code":"ln","direction":"ltr","label":"Lingala"},{"code":"lt","direction":"ltr","label":"Lithuanian"},{"code":"lu","direction":"ltr","label":"Luba-Katanga"},{"code":"mk","direction":"ltr","label":"Macedonian"},{"code":"mg","direction":"ltr","label":"Malagasy"},{"code":"ms","direction":"ltr","label":"Malay"},{"code":"ml","direction":"ltr","label":"Malayalam"},{"code":"mt","direction":"ltr","label":"Maltese"},{"code":"gv","direction":"ltr","label":"Manx"},{"code":"mi","direction":"ltr","label":"Maori"},{"code":"mr","direction":"ltr","label":"Marathi"},{"code":"mh","direction":"ltr","label":"Marshallese"},{"code":"ro","direction":"ltr","label":"Moldovan, Moldavian, Romanian"},{"code":"mn","direction":"ltr","label":"Mongolian"},{"code":"na","direction":"ltr","label":"Nauru"},{"code":"nv","direction":"ltr","label":"Navajo, Navaho"},{"code":"nd","direction":"ltr","label":"Northern Ndebele"},{"code":"ng","direction":"ltr","label":"Ndonga"},{"code":"ne","direction":"ltr","label":"Nepali"},{"code":"se","direction":"ltr","label":"Northern Sami"},{"code":"no","direction":"ltr","label":"Norwegian"},{"code":"nb","direction":"ltr","label":"Norwegian Bokmål"},{"code":"nn","direction":"ltr","label":"Norwegian Nynorsk"},{"code":"ii","direction":"ltr","label":"Nuosu, Sichuan Yi"},{"code":"oc","direction":"ltr","label":"Occitan (post 1500)"},{"code":"oj","direction":"ltr","label":"Ojibwa"},{"code":"or","direction":"ltr","label":"Oriya"},{"code":"om","direction":"ltr","label":"Oromo"},{"code":"os","direction":"ltr","label":"Ossetian, Ossetic"},{"code":"pi","direction":"ltr","label":"Pali"},{"code":"pa","direction":"ltr","label":"Panjabi, Punjabi"},{"code":"ps","direction":"ltr","label":"Pashto, Pushto"},{"code":"fa","direction":"ltr","label":"Persian"},{"code":"pl","direction":"ltr","label":"Polish"},{"code":"pt","direction":"ltr","label":"Portuguese"},{"code":"qu","direction":"ltr","label":"Quechua"},{"code":"rm","direction":"ltr","label":"Romansh"},{"code":"rn","direction":"ltr","label":"Rundi"},{"code":"ru","direction":"ltr","label":"Russian"},{"code":"sm","direction":"ltr","label":"Samoan"},{"code":"sg","direction":"ltr","label":"Sango"},{"code":"sa","direction":"ltr","label":"Sanskrit"},{"code":"sc","direction":"ltr","label":"Sardinian"},{"code":"sr","direction":"ltr","label":"Serbian"},{"code":"sn","direction":"ltr","label":"Shona"},{"code":"sd","direction":"ltr","label":"Sindhi"},{"code":"si","direction":"ltr","label":"Sinhala, Sinhalese"},{"code":"sk","direction":"ltr","label":"Slovak"},{"code":"sl","direction":"ltr","label":"Slovenian"},{"code":"so","direction":"ltr","label":"Somali"},{"code":"st","direction":"ltr","label":"Sotho, Southern"},{"code":"nr","direction":"ltr","label":"South Ndebele"},{"code":"es","direction":"ltr","label":"Spanish"},{"code":"su","direction":"ltr","label":"Sundanese"},{"code":"sw","direction":"ltr","label":"Swahili"},{"code":"ss","direction":"ltr","label":"Swati"},{"code":"sv","direction":"ltr","label":"Swedish"},{"code":"tl","direction":"ltr","label":"Tagalog"},{"code":"ty","direction":"ltr","label":"Tahitian"},{"code":"tg","direction":"ltr","label":"Tajik"},{"code":"ta","direction":"ltr","label":"Tamil"},{"code":"tt","direction":"ltr","label":"Tatar"},{"code":"te","direction":"ltr","label":"Telugu"},{"code":"th","direction":"ltr","label":"Thai"},{"code":"bo","direction":"ltr","label":"Tibetan"},{"code":"ti","direction":"ltr","label":"Tigrinya"},{"code":"to","direction":"ltr","label":"Tonga (Tonga Islands)"},{"code":"ts","direction":"ltr","label":"Tsonga"},{"code":"tn","direction":"ltr","label":"Tswana"},{"code":"tr","direction":"ltr","label":"Turkish"},{"code":"tk","direction":"ltr","label":"Turkmen"},{"code":"tw","direction":"ltr","label":"Twi"},{"code":"ug","direction":"ltr","label":"Uighur, Uyghur"},{"code":"uk","direction":"ltr","label":"Ukrainian"},{"code":"umb","direction":"ltr","label":"Umbundu"},{"code":"ur","direction":"ltr","label":"Urdu"},{"code":"uz","direction":"ltr","label":"Uzbek"},{"code":"ve","direction":"ltr","label":"Venda"},{"code":"vi","direction":"ltr","label":"Vietnamese"},{"code":"vo","direction":"ltr","label":"Volap_k"},{"code":"wa","direction":"ltr","label":"Walloon"},{"code":"cy","direction":"ltr","label":"Welsh"},{"code":"fy","direction":"ltr","label":"Western Frisian"},{"code":"wo","direction":"ltr","label":"Wolof"},{"code":"xh","direction":"ltr","label":"Xhosa"},{"code":"yi","direction":"ltr","label":"Yiddish"},{"code":"yo","direction":"ltr","label":"Yoruba"},{"code":"za","direction":"ltr","label":"Zhuang, Chuang"},{"code":"zu","direction":"ltr","label":"Zulu"}];

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sync = __webpack_require__(16);

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
                    requestAnimation = typeof window !== 'undefined' && window.requestAnimationFrame,
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
/* 28 */
/***/ (function(module, exports) {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),
/* 29 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _Form = __webpack_require__(4);

var _Form2 = _interopRequireDefault(_Form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Columns = function () {
  function Columns() {
    _classCallCheck(this, Columns);
  }

  _createClass(Columns, null, [{
    key: 'getTableView',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(path) {
        var form;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Form2.default.find({ path: path });

              case 2:
                form = _context.sent.data;
                return _context.abrupt('return', _utilities2.default.findComponents(form.components, {
                  input: true,
                  tableView: true
                }).slice(0, 7).filter(function (c) {
                  return !!(c.label !== '');
                }));

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getTableView(_x) {
        return _ref.apply(this, arguments);
      }

      return getTableView;
    }()
  }]);

  return Columns;
}();

exports.default = Columns;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Connection = __webpack_require__(6);

var _Connection2 = _interopRequireDefault(_Connection);

var _Submission = __webpack_require__(7);

var _Submission2 = _interopRequireDefault(_Submission);

var _Event = __webpack_require__(10);

var _Event2 = _interopRequireDefault(_Event);

var _Scheduler = __webpack_require__(19);

var _Scheduler2 = _interopRequireDefault(_Scheduler);

var _Form = __webpack_require__(4);

var _Form2 = _interopRequireDefault(_Form);

var _awaitToJs = __webpack_require__(8);

var _awaitToJs2 = _interopRequireDefault(_awaitToJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var OfflineData = function () {
  var send = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data) {
      var _this = this;

      var offlineSubmissions, isOnline, PromiseEach, _ref8, _ref9, error;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              offlineSubmissions = data;
              _context4.next = 3;
              return _Connection2.default.isOnline();

            case 3:
              isOnline = _context4.sent;

              PromiseEach = function () {
                var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(arr, fn) {
                  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _iteratorNormalCompletion = true;
                          _didIteratorError = false;
                          _iteratorError = undefined;
                          _context2.prev = 3;
                          _iterator = arr[Symbol.iterator]();

                        case 5:
                          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context2.next = 12;
                            break;
                          }

                          item = _step.value;
                          _context2.next = 9;
                          return fn(item);

                        case 9:
                          _iteratorNormalCompletion = true;
                          _context2.next = 5;
                          break;

                        case 12:
                          _context2.next = 18;
                          break;

                        case 14:
                          _context2.prev = 14;
                          _context2.t0 = _context2['catch'](3);
                          _didIteratorError = true;
                          _iteratorError = _context2.t0;

                        case 18:
                          _context2.prev = 18;
                          _context2.prev = 19;

                          if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                          }

                        case 21:
                          _context2.prev = 21;

                          if (!_didIteratorError) {
                            _context2.next = 24;
                            break;
                          }

                          throw _iteratorError;

                        case 24:
                          return _context2.finish(21);

                        case 25:
                          return _context2.finish(18);

                        case 26:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this, [[3, 14, 18, 26], [19,, 21, 25]]);
                }));

                return function PromiseEach(_x3, _x4) {
                  return _ref7.apply(this, arguments);
                };
              }();

              if (!isOnline) {
                _context4.next = 17;
                break;
              }

              _context4.next = 8;
              return _Scheduler2.default.startSync();

            case 8:
              _context4.next = 10;
              return (0, _awaitToJs2.default)(PromiseEach(offlineSubmissions, function () {
                var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(offlineSubmission) {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return sendSubmission(offlineSubmission);

                        case 2:
                        case 'end':
                          return _context3.stop();
                      }
                    }
                  }, _callee3, _this);
                }));

                return function (_x5) {
                  return _ref10.apply(this, arguments);
                };
              }()));

            case 10:
              _ref8 = _context4.sent;
              _ref9 = _slicedToArray(_ref8, 1);
              error = _ref9[0];


              _Scheduler2.default.stopSync();
              if (error) {
                console.log(error);
              }

              console.log('Submissions Synced');
              _Event2.default.emit({
                name: 'FAST:SUBMISSION:SYNCED',
                data: {},
                text: 'The submissions have been synced'
              });

            case 17:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function send(_x2) {
      return _ref6.apply(this, arguments);
    };
  }();

  var sendSubmission = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(offlineSubmission) {
      var remoteEndPoint, sub, _ref2, _ref3, error, insertedData, _ref4, _ref5, e;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              remoteEndPoint = _Form2.default.getModel({ path: offlineSubmission.path }).remote();


              offlineSubmission.queuedForSync = true;
              sub = (0, _Submission2.default)(offlineSubmission.path);

              // Set the submission as queuedForSync

              _context.next = 5;
              return sub.local().update(offlineSubmission);

            case 5:
              _context.next = 7;
              return (0, _awaitToJs2.default)(remoteEndPoint.insert(offlineSubmission));

            case 7:
              _ref2 = _context.sent;
              _ref3 = _slicedToArray(_ref2, 2);
              error = _ref3[0];
              insertedData = _ref3[1];

              if (!error) {
                _context.next = 17;
                break;
              }

              console.log(error);
              offlineSubmission.queuedForSync = false;
              offlineSubmission.syncError = error;
              sub.local().update(offlineSubmission);
              throw new Error('Error while Syncing data');

            case 17:
              if (insertedData._id) {
                _context.next = 19;
                break;
              }

              throw Error('The remote endpoint did not save the submission properly (no _id back)');

            case 19:
              _context.next = 21;
              return (0, _awaitToJs2.default)(sub.local().remove(offlineSubmission._id));

            case 21:
              _ref4 = _context.sent;
              _ref5 = _slicedToArray(_ref4, 1);
              e = _ref5[0];

              if (!e) {
                _context.next = 26;
                break;
              }

              throw new Error('Sync error:Could not remove local submission after sync');

            case 26:
              return _context.abrupt('return', true);

            case 27:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function sendSubmission(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return Object.freeze({
    send: send
  });
}();

exports.default = OfflineData;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Database = __webpack_require__(33);

var _Database2 = _interopRequireDefault(_Database);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _v = __webpack_require__(22);

var _v2 = _interopRequireDefault(_v);

var _fastFluent = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _fastFluent.Interface.compose({
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
                if (_this.ownerEmail) {
                  _this.andWhere("user_email", "=", _this.ownerEmail);
                }
                filterObject = _this.prepareFilter();
                _context.next = 4;
                return _this.getModel();

              case 4:
                _context.t0 = filterObject;
                _context.t1 = _this.offsetNumber;
                _context.t2 = _this.limitNumber;
                _context.next = 9;
                return _context.sent.chain().find(_context.t0).offset(_context.t1).limit(_context.t2).data();

              case 9:
                data = _context.sent;


                data = _this.jsApplySelect(data);
                data = _this.jsApplyOrderBy(data);

                return _context.abrupt("return", data);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },

    /**
     *
     */
    prepareFilter: function prepareFilter() {
      var _this2 = this;

      var andObject = { $and: [] };
      var orObject = { $or: [] };
      var globalFilter = {};

      // All first Level AND conditions
      if (this.whereArray.length > 0) {
        this.whereArray.forEach(function (c) {
          var conditionToObject = {};

          if (c[0].includes("[")) {
            throw new Error('Error in: "' + c[0] + '" "Where" close does not work with Array elements');
          }

          conditionToObject[c[0]] = {};
          var lokiOperator = _this2.getLokiOperator(c[1]);

          conditionToObject[c[0]][lokiOperator] = c[2];
          if (lokiOperator.includes("$regex|")) {
            delete conditionToObject[c[0]][lokiOperator];
            conditionToObject[c[0]]["$regex"] = lokiOperator.replace("$regex|", "").replace("{{$var}}", c[2]);
          }

          andObject["$and"].push(conditionToObject);
        });
        globalFilter = andObject;
      }
      // All second level OR conditions
      if (this.orWhereArray.length > 0) {
        this.orWhereArray.forEach(function (c) {
          var conditionToObject = {};

          conditionToObject[c[0]] = {};
          var lokiOperator = _this2.getLokiOperator(c[1]);

          conditionToObject[c[0]][lokiOperator] = c[2];
          if (lokiOperator.includes("$regex|")) {
            delete conditionToObject[c[0]][lokiOperator];
            conditionToObject[c[0]]["$regex"] = lokiOperator.replace("$regex|", "").replace("{{$var}}", c[2]);
          }

          orObject["$or"].push(conditionToObject);
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
        "=": "$eq",
        "<": "$lt",
        ">": "$gt",
        "<=": "$lte",
        ">=": "$gte",
        "<>": "$ne",
        "!=": "$ne",
        in: "$in",
        nin: "$nin",
        like: "$aeq",
        regexp: "$regex",
        startsWith: "$regex|^{{$var}}",
        endsWith: "$regex|{{$var}}$",
        contains: "$regex|{{$var}}"
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
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var DB;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Database2.default.get();

              case 2:
                DB = _context2.sent;
                return _context2.abrupt("return", DB.getCollection(_this3.name));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this3);
      }))();
    },

    /**
     *
     */
    all: function all() {
      var _this4 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var model;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this4.getModel();

              case 2:
                model = _context3.sent;
                return _context3.abrupt("return", model.find());

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this4);
      }))();
    },

    /**
     * [remove description]
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    remove: function remove(_id) {
      var _this5 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var model;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (_id) {
                  _context4.next = 2;
                  break;
                }

                throw new Error("No id assign to remove().You must give and _id to delete");

              case 2:
                if (_id.includes("_local")) {
                  _context4.next = 4;
                  break;
                }

                throw new Error("You can`t delete non local submissions");

              case 4:
                _context4.next = 6;
                return _this5.getModel();

              case 6:
                model = _context4.sent;
                return _context4.abrupt("return", model.findAndRemove({ _id: _id }));

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, _this5);
      }))();
    },

    /**
     * [insert description]
     * @param  {Object, Array} element [description]
     * @return {[type]}         [description]
     */
    insert: function insert(data, options) {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var model;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!Array.isArray(data)) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return", _this6.ArrayInsert(data, options));

              case 2:
                data = _utilities2.default.cloneDeep(data);

                _context5.next = 5;
                return _this6.getModel();

              case 5:
                model = _context5.sent;


                data._id = (0, _v2.default)() + "_local";

                return _context5.abrupt("return", model.insert(data));

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, _this6);
      }))();
    },

    /**
     * [update description]
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    update: function update(document) {
      var _this7 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var model, local, mod;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (document._id) {
                  _context6.next = 2;
                  break;
                }

                throw new Error("Loki connector error. Cannot update a Model without _id key");

              case 2:
                _context6.next = 4;
                return _this7.getModel();

              case 4:
                model = _context6.sent;


                document.modified = Math.round(+new Date() / 1000);
                _context6.next = 8;
                return model.findOne({ _id: document._id });

              case 8:
                local = _context6.sent;
                mod = _extends({}, local, document);
                return _context6.abrupt("return", model.update(mod));

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, _this7);
      }))();
    },

    /**
     *
     * @param {*} param0
     */
    updateOrCreate: function updateOrCreate(_ref) {
      var _this8 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var document = _ref.document;
        var model, role;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _this8.getModel();

              case 2:
                model = _context7.sent;
                _context7.next = 5;
                return model.findOne(document);

              case 5:
                role = _context7.sent;


                if (!role) {
                  model.insert(document);
                }

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, _this8);
      }))();
    },

    /**
     *
     * @param {*} param0
     */
    findAndRemove: function findAndRemove(_ref2) {
      var _this9 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var filter = _ref2.filter;
        var model;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _this9.getModel();

              case 2:
                model = _context8.sent;
                return _context8.abrupt("return", model.findAndRemove(filter));

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, _this9);
      }))();
    },

    /**
     *
     * @param {*} param0
     */
    clear: function clear() {
      var _this10 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var model;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return _this10.getModel();

              case 2:
                model = _context9.sent;
                return _context9.abrupt("return", model.clear({ removeIndices: true }));

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, _this10);
      }))();
    }
  }
});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bluebird = __webpack_require__(5);

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lokijs = __webpack_require__(34);

var _lokijs2 = _interopRequireDefault(_lokijs);

var _lokiIndexedAdapter = __webpack_require__(21);

var _lokiIndexedAdapter2 = _interopRequireDefault(_lokiIndexedAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _bluebird2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _bluebird2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var DB = null;
var Database = function () {
  /*
  |--------------------------------------------------------------------------
  | LockiDB Config
  |--------------------------------------------------------------------------
  | Configuration for the Local DB creation.
  |
  */
  var getModels = function getModels() {
    var models = typeof window !== "undefined" && window && window._FLUENT_ && window._FLUENT_.models ? window._FLUENT_.models : global && global._FLUENT_ && global._FLUENT_.models ? global._FLUENT_.models : undefined;
    return models;
  };
  /**
   *
   *
   * @param {Object} configuration- The configuration for the DB
   * @param {string} configuration.env - Environment i.e 'production'
   * @returns
   */
  var _create = function _create() {
    return new _bluebird2.default(function (resolve) {
      var idbAdapter = void 0;
      var pa = void 0;
      var db = void 0;

      var dbConfig = {
        autosave: true,
        autosaveInterval: 1000,
        autoload: true,
        /* eslint-disable no-use-before-define */
        autoloadCallback: databaseInitialize,
        throttledSaves: false
      };

      try {
        idbAdapter = new _lokiIndexedAdapter2.default("FAST");
        pa = new _lokijs2.default.LokiPartitioningAdapter(idbAdapter, {
          paging: true
        });

        db = new _lokijs2.default("FAST", _extends({}, dbConfig, { adapter: pa }));
      } catch (error) {
        db = new _lokijs2.default("FAST", dbConfig);
      }

      function databaseInitialize() {
        var baseModels = getModels();
        if (!baseModels) {
          throw new Error('Cannot Start FLUENT, no models registered or you dont have access to the "window" or "global" variable');
        }

        Object.keys(baseModels).forEach(function (model) {
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
   * Checks if the DB is created or if new
   * Models need to be added to the DB
   * @returns {Boolean}
   */
  var shouldCreate = function shouldCreate() {
    var windowModels = getModels();
    var dbModels = DB.collections.reduce(function (acc, collection) {
      acc.push(collection.name);
      return acc;
    }, []);

    var models = [];
    Object.keys(windowModels).forEach(function (m) {
      if (!dbModels.includes(m)) {
        models.push(m);
      }
    });

    return models;
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
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var recreateModels;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (DB) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return _create();

            case 3:
              DB = _context.sent;

            case 4:
              recreateModels = shouldCreate();

              if (recreateModels.length > 0) {
                recreateModels.forEach(function (model) {
                  DB.addCollection(model);
                });
              }
              return _context.abrupt("return", DB);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function get() {
      return _ref.apply(this, arguments);
    };
  }();

  return Object.freeze({
    get: get
  });
}();

exports.default = Database;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(20)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * LokiJS
 * @author Joe Minichino <joe.minichino@gmail.com>
 *
 * A lightweight document oriented javascript database
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

  return (function () {
    'use strict';

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    var Utils = {
      copyProperties: function (src, dest) {
        var prop;
        for (prop in src) {
          dest[prop] = src[prop];
        }
      },
      // used to recursively scan hierarchical transform step object for param substitution
      resolveTransformObject: function (subObj, params, depth) {
        var prop,
          pname;

        if (typeof depth !== 'number') {
          depth = 0;
        }

        if (++depth >= 10) return subObj;

        for (prop in subObj) {
          if (typeof subObj[prop] === 'string' && subObj[prop].indexOf("[%lktxp]") === 0) {
            pname = subObj[prop].substring(8);
            if (params.hasOwnProperty(pname)) {
              subObj[prop] = params[pname];
            }
          } else if (typeof subObj[prop] === "object") {
            subObj[prop] = Utils.resolveTransformObject(subObj[prop], params, depth);
          }
        }

        return subObj;
      },
      // top level utility to resolve an entire (single) transform (array of steps) for parameter substitution
      resolveTransformParams: function (transform, params) {
        var idx,
          clonedStep,
          resolvedTransform = [];

        if (typeof params === 'undefined') return transform;

        // iterate all steps in the transform array
        for (idx = 0; idx < transform.length; idx++) {
          // clone transform so our scan/replace can operate directly on cloned transform
          clonedStep = clone(transform[idx], "shallow-recurse-objects");
          resolvedTransform.push(Utils.resolveTransformObject(clonedStep, params));
        }

        return resolvedTransform;
      }
    };

    // wrapping in object to expose to default export for potential user override.
    // warning: overriding these methods will override behavior for all loki db instances in memory.
    // warning: if you use binary indices these comparators should be the same for all inserts/updates/removes.
    var Comparators = {
      aeq: aeqHelper,
      lt: ltHelper,
      gt: gtHelper
    };

    /** Helper function for determining 'loki' abstract equality which is a little more abstract than ==
     *     aeqHelper(5, '5') === true
     *     aeqHelper(5.0, '5') === true
     *     aeqHelper(new Date("1/1/2011"), new Date("1/1/2011")) === true
     *     aeqHelper({a:1}, {z:4}) === true (all objects sorted equally)
     *     aeqHelper([1, 2, 3], [1, 3]) === false
     *     aeqHelper([1, 2, 3], [1, 2, 3]) === true
     *     aeqHelper(undefined, null) === true
     */
    function aeqHelper(prop1, prop2) {
      var cv1, cv2, t1, t2;

      if (prop1 === prop2) return true;

      // 'falsy' and Boolean handling
      if (!prop1 || !prop2 || prop1 === true || prop2 === true || prop1 !== prop1 || prop2 !== prop2) {
        // dates and NaN conditions (typed dates before serialization)
        switch (prop1) {
          case undefined: t1 = 1; break;
          case null: t1 = 1; break;
          case false: t1 = 3; break;
          case true: t1 = 4; break;
          case "": t1 = 5; break;
          default: t1 = (prop1 === prop1)?9:0; break;
        }

        switch (prop2) {
          case undefined: t2 = 1; break;
          case null: t2 = 1; break;
          case false: t2 = 3; break;
          case true: t2 = 4; break;
          case "": t2 = 5; break;
          default: t2 = (prop2 === prop2)?9:0; break;
        }

        // one or both is edge case
        if (t1 !== 9 || t2 !== 9) {
          return (t1===t2);
        }
      }

      // Handle 'Number-like' comparisons
      cv1 = Number(prop1);
      cv2 = Number(prop2);

      // if one or both are 'number-like'...
      if (cv1 === cv1 || cv2 === cv2) {
        return (cv1 === cv2);
      }

      // not strict equal nor less than nor gt so must be mixed types, convert to string and use that to compare
      cv1 = prop1.toString();
      cv2 = prop2.toString();

      return (cv1 == cv2);
    }

    /** Helper function for determining 'less-than' conditions for ops, sorting, and binary indices.
     *     In the future we might want $lt and $gt ops to use their own functionality/helper.
     *     Since binary indices on a property might need to index [12, NaN, new Date(), Infinity], we
     *     need this function (as well as gtHelper) to always ensure one value is LT, GT, or EQ to another.
     */
    function ltHelper(prop1, prop2, equal) {
      var cv1, cv2, t1, t2;

      // if one of the params is falsy or strictly true or not equal to itself
      // 0, 0.0, "", NaN, null, undefined, not defined, false, true
      if (!prop1 || !prop2 || prop1 === true || prop2 === true || prop1 !== prop1 || prop2 !== prop2) {
        switch (prop1) {
          case undefined: t1 = 1; break;
          case null: t1 = 1; break;
          case false: t1 = 3; break;
          case true: t1 = 4; break;
          case "": t1 = 5; break;
          // if strict equal probably 0 so sort higher, otherwise probably NaN so sort lower than even null
          default: t1 = (prop1 === prop1)?9:0; break;
        }

        switch (prop2) {
          case undefined: t2 = 1; break;
          case null: t2 = 1; break;
          case false: t2 = 3; break;
          case true: t2 = 4; break;
          case "": t2 = 5; break;
          default: t2 = (prop2 === prop2)?9:0; break;
        }

        // one or both is edge case
        if (t1 !== 9 || t2 !== 9) {
          return (t1===t2)?equal:(t1<t2);
        }
      }

      // if both are numbers (string encoded or not), compare as numbers
      cv1 = Number(prop1);
      cv2 = Number(prop2);

      if (cv1 === cv1 && cv2 === cv2) {
        if (cv1 < cv2) return true;
        if (cv1 > cv2) return false;
        return equal;
      }

      if (cv1 === cv1 && cv2 !== cv2) {
        return true;
      }

      if (cv2 === cv2 && cv1 !== cv1) {
        return false;
      }

      if (prop1 < prop2) return true;
      if (prop1 > prop2) return false;
      if (prop1 == prop2) return equal;

      // not strict equal nor less than nor gt so must be mixed types, convert to string and use that to compare
      cv1 = prop1.toString();
      cv2 = prop2.toString();

      if (cv1 < cv2) {
        return true;
      }

      if (cv1 == cv2) {
        return equal;
      }

      return false;
    }

    function gtHelper(prop1, prop2, equal) {
      var cv1, cv2, t1, t2;

      // 'falsy' and Boolean handling
      if (!prop1 || !prop2 || prop1 === true || prop2 === true || prop1 !== prop1 || prop2 !== prop2) {
        switch (prop1) {
          case undefined: t1 = 1; break;
          case null: t1 = 1; break;
          case false: t1 = 3; break;
          case true: t1 = 4; break;
          case "": t1 = 5; break;
          // NaN 0
          default: t1 = (prop1 === prop1)?9:0; break;
        }

        switch (prop2) {
          case undefined: t2 = 1; break;
          case null: t2 = 1; break;
          case false: t2 = 3; break;
          case true: t2 = 4; break;
          case "": t2 = 5; break;
          default: t2 = (prop2 === prop2)?9:0; break;
        }

        // one or both is edge case
        if (t1 !== 9 || t2 !== 9) {
          return (t1===t2)?equal:(t1>t2);
        }
      }

      // if both are numbers (string encoded or not), compare as numbers
      cv1 = Number(prop1);
      cv2 = Number(prop2);
      if (cv1 === cv1 && cv2 === cv2) {
        if (cv1 > cv2) return true;
        if (cv1 < cv2) return false;
        return equal;
      }

      if (cv1 === cv1 && cv2 !== cv2) {
        return false;
      }

      if (cv2 === cv2 && cv1 !== cv1) {
        return true;
      }

      if (prop1 > prop2) return true;
      if (prop1 < prop2) return false;
      if (prop1 == prop2) return equal;

      // not strict equal nor less than nor gt so must be dates or mixed types
      // convert to string and use that to compare
      cv1 = prop1.toString();
      cv2 = prop2.toString();

      if (cv1 > cv2) {
        return true;
      }

      if (cv1 == cv2) {
        return equal;
      }

      return false;
    }

    function sortHelper(prop1, prop2, desc) {
      if (Comparators.aeq(prop1, prop2)) return 0;

      if (Comparators.lt(prop1, prop2, false)) {
        return (desc) ? (1) : (-1);
      }

      if (Comparators.gt(prop1, prop2, false)) {
        return (desc) ? (-1) : (1);
      }

      // not lt, not gt so implied equality-- date compatible
      return 0;
    }

    /**
     * compoundeval() - helper function for compoundsort(), performing individual object comparisons
     *
     * @param {array} properties - array of property names, in order, by which to evaluate sort order
     * @param {object} obj1 - first object to compare
     * @param {object} obj2 - second object to compare
     * @returns {integer} 0, -1, or 1 to designate if identical (sortwise) or which should be first
     */
    function compoundeval(properties, obj1, obj2) {
      var res = 0;
      var prop, field, val1, val2, arr;
      for (var i = 0, len = properties.length; i < len; i++) {
        prop = properties[i];
        field = prop[0];
        if (~field.indexOf('.')) {
          arr = field.split('.');
          val1 = arr.reduce(function(obj, i) { return obj && obj[i] || undefined; }, obj1);
          val2 = arr.reduce(function(obj, i) { return obj && obj[i] || undefined; }, obj2);
        } else {
          val1 = obj1[field];
          val2 = obj2[field];
        }
        res = sortHelper(val1, val2, prop[1]);
        if (res !== 0) {
          return res;
        }
      }
      return 0;
    }

    /**
     * dotSubScan - helper function used for dot notation queries.
     *
     * @param {object} root - object to traverse
     * @param {array} paths - array of properties to drill into
     * @param {function} fun - evaluation function to test with
     * @param {any} value - comparative value to also pass to (compare) fun
     * @param {number} poffset - index of the item in 'paths' to start the sub-scan from
     */
    function dotSubScan(root, paths, fun, value, poffset) {
      var pathOffset = poffset || 0;
      var path = paths[pathOffset];
      if (root === undefined || root === null || !hasOwnProperty.call(root, path)) {
        return false;
      }

      var valueFound = false;
      var element = root[path];
      if (pathOffset + 1 >= paths.length) {
        // if we have already expanded out the dot notation,
        // then just evaluate the test function and value on the element
        valueFound = fun(element, value);
      } else if (Array.isArray(element)) {
        for (var index = 0, len = element.length; index < len; index += 1) {
          valueFound = dotSubScan(element[index], paths, fun, value, pathOffset + 1);
          if (valueFound === true) {
            break;
          }
        }
      } else {
        valueFound = dotSubScan(element, paths, fun, value, pathOffset + 1);
      }

      return valueFound;
    }

    function containsCheckFn(a) {
      if (typeof a === 'string' || Array.isArray(a)) {
        return function (b) {
          return a.indexOf(b) !== -1;
        };
      } else if (typeof a === 'object' && a !== null) {
        return function (b) {
          return hasOwnProperty.call(a, b);
        };
      }
      return null;
    }

    function doQueryOp(val, op) {
      for (var p in op) {
        if (hasOwnProperty.call(op, p)) {
          return LokiOps[p](val, op[p]);
        }
      }
      return false;
    }

    var LokiOps = {
      // comparison operators
      // a is the value in the collection
      // b is the query value
      $eq: function (a, b) {
        return a === b;
      },

      // abstract/loose equality
      $aeq: function (a, b) {
        return a == b;
      },

      $ne: function (a, b) {
        // ecma 5 safe test for NaN
        if (b !== b) {
          // ecma 5 test value is not NaN
          return (a === a);
        }

        return a !== b;
      },
      // date equality / loki abstract equality test
      $dteq: function (a, b) {
        return Comparators.aeq(a, b);
      },

      // loki comparisons: return identical unindexed results as indexed comparisons
      $gt: function (a, b) {
        return Comparators.gt(a, b, false);
      },

      $gte: function (a, b) {
        return Comparators.gt(a, b, true);
      },

      $lt: function (a, b) {
        return Comparators.lt(a, b, false);
      },

      $lte: function (a, b) {
        return Comparators.lt(a, b, true);
      },

      // lightweight javascript comparisons
      $jgt: function (a, b) {
        return a > b;
      },

      $jgte: function (a, b) {
        return a >= b;
      },

      $jlt: function (a, b) {
        return a < b;
      },

      $jlte: function (a, b) {
        return a <= b;
      },

      // ex : coll.find({'orderCount': {$between: [10, 50]}});
      $between: function (a, vals) {
        if (a === undefined || a === null) return false;
        return (Comparators.gt(a, vals[0], true) && Comparators.lt(a, vals[1], true));
      },

      $jbetween: function (a, vals) {
        if (a === undefined || a === null) return false;
        return (a >= vals[0] && a <= vals[1]);
      },

      $in: function (a, b) {
        return b.indexOf(a) !== -1;
      },

      $nin: function (a, b) {
        return b.indexOf(a) === -1;
      },

      $keyin: function (a, b) {
        return a in b;
      },

      $nkeyin: function (a, b) {
        return !(a in b);
      },

      $definedin: function (a, b) {
        return b[a] !== undefined;
      },

      $undefinedin: function (a, b) {
        return b[a] === undefined;
      },

      $regex: function (a, b) {
        return b.test(a);
      },

      $containsString: function (a, b) {
        return (typeof a === 'string') && (a.indexOf(b) !== -1);
      },

      $containsNone: function (a, b) {
        return !LokiOps.$containsAny(a, b);
      },

      $containsAny: function (a, b) {
        var checkFn = containsCheckFn(a);
        if (checkFn !== null) {
          return (Array.isArray(b)) ? (b.some(checkFn)) : (checkFn(b));
        }
        return false;
      },

      $contains: function (a, b) {
        var checkFn = containsCheckFn(a);
        if (checkFn !== null) {
          return (Array.isArray(b)) ? (b.every(checkFn)) : (checkFn(b));
        }
        return false;
      },

      $type: function (a, b) {
        var type = typeof a;
        if (type === 'object') {
          if (Array.isArray(a)) {
            type = 'array';
          } else if (a instanceof Date) {
            type = 'date';
          }
        }
        return (typeof b !== 'object') ? (type === b) : doQueryOp(type, b);
      },

      $finite: function(a, b) {
        return (b === isFinite(a));
      },

      $size: function (a, b) {
        if (Array.isArray(a)) {
          return (typeof b !== 'object') ? (a.length === b) : doQueryOp(a.length, b);
        }
        return false;
      },

      $len: function (a, b) {
        if (typeof a === 'string') {
          return (typeof b !== 'object') ? (a.length === b) : doQueryOp(a.length, b);
        }
        return false;
      },

      $where: function (a, b) {
        return b(a) === true;
      },

      // field-level logical operators
      // a is the value in the collection
      // b is the nested query operation (for '$not')
      //   or an array of nested query operations (for '$and' and '$or')
      $not: function (a, b) {
        return !doQueryOp(a, b);
      },

      $and: function (a, b) {
        for (var idx = 0, len = b.length; idx < len; idx += 1) {
          if (!doQueryOp(a, b[idx])) {
            return false;
          }
        }
        return true;
      },

      $or: function (a, b) {
        for (var idx = 0, len = b.length; idx < len; idx += 1) {
          if (doQueryOp(a, b[idx])) {
            return true;
          }
        }
        return false;
      }
    };

    // if an op is registered in this object, our 'calculateRange' can use it with our binary indices.
    // if the op is registered to a function, we will run that function/op as a 2nd pass filter on results.
    // those 2nd pass filter functions should be similar to LokiOps functions, accepting 2 vals to compare.
    var indexedOps = {
      $eq: LokiOps.$eq,
      $aeq: true,
      $dteq: true,
      $gt: true,
      $gte: true,
      $lt: true,
      $lte: true,
      $in: true,
      $between: true
    };

    function clone(data, method) {
      if (data === null || data === undefined) {
        return null;
      }

      var cloneMethod = method || 'parse-stringify',
        cloned;

      switch (cloneMethod) {
      case "parse-stringify":
        cloned = JSON.parse(JSON.stringify(data));
        break;
      case "jquery-extend-deep":
        cloned = jQuery.extend(true, {}, data);
        break;
      case "shallow":
        // more compatible method for older browsers
        cloned = Object.create(data.constructor.prototype);
        Object.keys(data).map(function (i) {
          cloned[i] = data[i];
        });
        break;
      case "shallow-assign":
        // should be supported by newer environments/browsers
        cloned = Object.create(data.constructor.prototype);
        Object.assign(cloned, data);
        break;
      case "shallow-recurse-objects":
        // shallow clone top level properties
        cloned = clone(data, "shallow");
        var keys = Object.keys(data);
        // for each of the top level properties which are object literals, recursively shallow copy
        keys.forEach(function(key) {
          if (typeof data[key] === "object" && data[key].constructor.name === "Object")  {
            cloned[key] = clone(data[key], "shallow-recurse-objects");
          }
        });
        break;
      default:
        break;
      }

      return cloned;
    }

    function cloneObjectArray(objarray, method) {
      var i,
        result = [];

      if (method == "parse-stringify") {
        return clone(objarray, method);
      }

      i = objarray.length - 1;

      for (; i <= 0; i--) {
        result.push(clone(objarray[i], method));
      }

      return result;
    }

    function localStorageAvailable() {
      try {
        return (window && window.localStorage !== undefined && window.localStorage !== null);
      } catch (e) {
        return false;
      }
    }


    /**
     * LokiEventEmitter is a minimalist version of EventEmitter. It enables any
     * constructor that inherits EventEmitter to emit events and trigger
     * listeners that have been added to the event through the on(event, callback) method
     *
     * @constructor LokiEventEmitter
     */
    function LokiEventEmitter() {}

    /**
     * @prop {hashmap} events - a hashmap, with each property being an array of callbacks
     * @memberof LokiEventEmitter
     */
    LokiEventEmitter.prototype.events = {};

    /**
     * @prop {boolean} asyncListeners - boolean determines whether or not the callbacks associated with each event
     * should happen in an async fashion or not
     * Default is false, which means events are synchronous
     * @memberof LokiEventEmitter
     */
    LokiEventEmitter.prototype.asyncListeners = false;

    /**
     * on(eventName, listener) - adds a listener to the queue of callbacks associated to an event
     * @param {string|string[]} eventName - the name(s) of the event(s) to listen to
     * @param {function} listener - callback function of listener to attach
     * @returns {int} the index of the callback in the array of listeners for a particular event
     * @memberof LokiEventEmitter
     */
    LokiEventEmitter.prototype.on = function (eventName, listener) {
      var event;
      var self = this;

      if (Array.isArray(eventName)) {
        eventName.forEach(function(currentEventName) {
          self.on(currentEventName, listener);
        });
        return listener;
      }

      event = this.events[eventName];
      if (!event) {
        event = this.events[eventName] = [];
      }
      event.push(listener);
      return listener;
    };

    /**
     * emit(eventName, data) - emits a particular event
     * with the option of passing optional parameters which are going to be processed by the callback
     * provided signatures match (i.e. if passing emit(event, arg0, arg1) the listener should take two parameters)
     * @param {string} eventName - the name of the event
     * @param {object=} data - optional object passed with the event
     * @memberof LokiEventEmitter
     */
    LokiEventEmitter.prototype.emit = function (eventName) {
      var self = this;
      var selfArgs = Array.prototype.slice.call(arguments, 1);
      if (eventName && this.events[eventName]) {
        this.events[eventName].forEach(function (listener) {
          if (self.asyncListeners) {
            setTimeout(function () {
              listener.apply(self, selfArgs);
            }, 1);
          } else {
            listener.apply(self, selfArgs);
          }

        });
      } else {
        throw new Error('No event ' + eventName + ' defined');
      }
    };

    /**
     * Alias of LokiEventEmitter.prototype.on
     * addListener(eventName, listener) - adds a listener to the queue of callbacks associated to an event
     * @param {string|string[]} eventName - the name(s) of the event(s) to listen to
     * @param {function} listener - callback function of listener to attach
     * @returns {int} the index of the callback in the array of listeners for a particular event
     * @memberof LokiEventEmitter
     */
    LokiEventEmitter.prototype.addListener = LokiEventEmitter.prototype.on;

    /**
     * removeListener() - removes the listener at position 'index' from the event 'eventName'
     * @param {string|string[]} eventName - the name(s) of the event(s) which the listener is attached to
     * @param {function} listener - the listener callback function to remove from emitter
     * @memberof LokiEventEmitter
     */
    LokiEventEmitter.prototype.removeListener = function (eventName, listener) {
      var self = this;

      if (Array.isArray(eventName)) {
        eventName.forEach(function(currentEventName) {
          self.removeListener(currentEventName, listener);
        });

        return;
      }

      if (this.events[eventName]) {
        var listeners = this.events[eventName];
        listeners.splice(listeners.indexOf(listener), 1);
      }
    };

    /**
     * Loki: The main database class
     * @constructor Loki
     * @implements LokiEventEmitter
     * @param {string} filename - name of the file to be saved to
     * @param {object=} options - (Optional) config options object
     * @param {string} options.env - override environment detection as 'NODEJS', 'BROWSER', 'CORDOVA'
     * @param {boolean} [options.verbose=false] - enable console output
     * @param {boolean} [options.autosave=false] - enables autosave
     * @param {int} [options.autosaveInterval=5000] - time interval (in milliseconds) between saves (if dirty)
     * @param {boolean} [options.autoload=false] - enables autoload on loki instantiation
     * @param {function} options.autoloadCallback - user callback called after database load
     * @param {adapter} options.adapter - an instance of a loki persistence adapter
     * @param {string} [options.serializationMethod='normal'] - ['normal', 'pretty', 'destructured']
     * @param {string} options.destructureDelimiter - string delimiter used for destructured serialization
     * @param {boolean} [options.throttledSaves=true] - debounces multiple calls to to saveDatabase reducing number of disk I/O operations
                                                and guaranteeing proper serialization of the calls.
     */
    function Loki(filename, options) {
      this.filename = filename || 'loki.db';
      this.collections = [];

      // persist version of code which created the database to the database.
      // could use for upgrade scenarios
      this.databaseVersion = 1.5;
      this.engineVersion = 1.5;

      // autosave support (disabled by default)
      // pass autosave: true, autosaveInterval: 6000 in options to set 6 second autosave
      this.autosave = false;
      this.autosaveInterval = 5000;
      this.autosaveHandle = null;
      this.throttledSaves = true;

      this.options = {};

      // currently keeping persistenceMethod and persistenceAdapter as loki level properties that
      // will not or cannot be deserialized.  You are required to configure persistence every time
      // you instantiate a loki object (or use default environment detection) in order to load the database anyways.

      // persistenceMethod could be 'fs', 'localStorage', or 'adapter'
      // this is optional option param, otherwise environment detection will be used
      // if user passes their own adapter we will force this method to 'adapter' later, so no need to pass method option.
      this.persistenceMethod = null;

      // retain reference to optional (non-serializable) persistenceAdapter 'instance'
      this.persistenceAdapter = null;

      // flags used to throttle saves
      this.throttledSavePending = false;
      this.throttledCallbacks = [];

      // enable console output if verbose flag is set (disabled by default)
      this.verbose = options && options.hasOwnProperty('verbose') ? options.verbose : false;

      this.events = {
        'init': [],
        'loaded': [],
        'flushChanges': [],
        'close': [],
        'changes': [],
        'warning': []
      };

      var getENV = function () {
        if (typeof global !== 'undefined' && (global.android || global.NSObject)) {
           // If no adapter assume nativescript which needs adapter to be passed manually
           return 'NATIVESCRIPT'; //nativescript
        }

        if (typeof window === 'undefined') {
          return 'NODEJS';
        }

        if (typeof global !== 'undefined' && global.window && process) {
          return 'NODEJS'; //node-webkit
        }

        if (typeof document !== 'undefined') {
          if (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1) {
            return 'CORDOVA';
          }
          return 'BROWSER';
        }
        return 'CORDOVA';
      };

      // refactored environment detection due to invalid detection for browser environments.
      // if they do not specify an options.env we want to detect env rather than default to nodejs.
      // currently keeping two properties for similar thing (options.env and options.persistenceMethod)
      //   might want to review whether we can consolidate.
      if (options && options.hasOwnProperty('env')) {
        this.ENV = options.env;
      } else {
        this.ENV = getENV();
      }

      // not sure if this is necessary now that i have refactored the line above
      if (this.ENV === 'undefined') {
        this.ENV = 'NODEJS';
      }

      this.configureOptions(options, true);

      this.on('init', this.clearChanges);

    }

    // db class is an EventEmitter
    Loki.prototype = new LokiEventEmitter();
    Loki.prototype.constructor = Loki;

    // experimental support for browserify's abstract syntax scan to pick up dependency of indexed adapter.
    // Hopefully, once this hits npm a browserify require of lokijs should scan the main file and detect this indexed adapter reference.
    Loki.prototype.getIndexedAdapter = function () {
      var adapter;

      if (true) {
        adapter = __webpack_require__(21);
      }

      return adapter;
    };


    /**
     * Allows reconfiguring database options
     *
     * @param {object} options - configuration options to apply to loki db object
     * @param {string} options.env - override environment detection as 'NODEJS', 'BROWSER', 'CORDOVA'
     * @param {boolean} options.verbose - enable console output (default is 'false')
     * @param {boolean} options.autosave - enables autosave
     * @param {int} options.autosaveInterval - time interval (in milliseconds) between saves (if dirty)
     * @param {boolean} options.autoload - enables autoload on loki instantiation
     * @param {function} options.autoloadCallback - user callback called after database load
     * @param {adapter} options.adapter - an instance of a loki persistence adapter
     * @param {string} options.serializationMethod - ['normal', 'pretty', 'destructured']
     * @param {string} options.destructureDelimiter - string delimiter used for destructured serialization
     * @param {boolean} initialConfig - (internal) true is passed when loki ctor is invoking
     * @memberof Loki
     */
    Loki.prototype.configureOptions = function (options, initialConfig) {
      var defaultPersistence = {
          'NODEJS': 'fs',
          'BROWSER': 'localStorage',
          'CORDOVA': 'localStorage',
          'MEMORY': 'memory'
        },
        persistenceMethods = {
          'fs': LokiFsAdapter,
          'localStorage': LokiLocalStorageAdapter,
          'memory': LokiMemoryAdapter
        };

      this.options = {};

      this.persistenceMethod = null;
      // retain reference to optional persistence adapter 'instance'
      // currently keeping outside options because it can't be serialized
      this.persistenceAdapter = null;

      // process the options
      if (typeof (options) !== 'undefined') {
        this.options = options;

        if (this.options.hasOwnProperty('persistenceMethod')) {
          // check if the specified persistence method is known
          if (typeof (persistenceMethods[options.persistenceMethod]) == 'function') {
            this.persistenceMethod = options.persistenceMethod;
            this.persistenceAdapter = new persistenceMethods[options.persistenceMethod]();
          }
          // should be throw an error here, or just fall back to defaults ??
        }

        // if user passes adapter, set persistence mode to adapter and retain persistence adapter instance
        if (this.options.hasOwnProperty('adapter')) {
          this.persistenceMethod = 'adapter';
          this.persistenceAdapter = options.adapter;
          this.options.adapter = null;
        }


        // if they want to load database on loki instantiation, now is a good time to load... after adapter set and before possible autosave initiation
        if (options.autoload && initialConfig) {
          // for autoload, let the constructor complete before firing callback
          var self = this;
          setTimeout(function () {
            self.loadDatabase(options, options.autoloadCallback);
          }, 1);
        }

        if (this.options.hasOwnProperty('autosaveInterval')) {
          this.autosaveDisable();
          this.autosaveInterval = parseInt(this.options.autosaveInterval, 10);
        }

        if (this.options.hasOwnProperty('autosave') && this.options.autosave) {
          this.autosaveDisable();
          this.autosave = true;

          if (this.options.hasOwnProperty('autosaveCallback')) {
            this.autosaveEnable(options, options.autosaveCallback);
          } else {
            this.autosaveEnable();
          }
        }

        if (this.options.hasOwnProperty('throttledSaves')) {
          this.throttledSaves = this.options.throttledSaves;
        }
      } // end of options processing

      // ensure defaults exists for options which were not set
      if (!this.options.hasOwnProperty('serializationMethod')) {
        this.options.serializationMethod = 'normal';
      }

      // ensure passed or default option exists
      if (!this.options.hasOwnProperty('destructureDelimiter')) {
        this.options.destructureDelimiter = '$<\n';
      }

      // if by now there is no adapter specified by user nor derived from persistenceMethod: use sensible defaults
      if (this.persistenceAdapter === null) {
        this.persistenceMethod = defaultPersistence[this.ENV];
        if (this.persistenceMethod) {
          this.persistenceAdapter = new persistenceMethods[this.persistenceMethod]();
        }
      }

    };

    /**
     * Copies 'this' database into a new Loki instance. Object references are shared to make lightweight.
     *
     * @param {object} options - apply or override collection level settings
     * @param {bool} options.removeNonSerializable - nulls properties not safe for serialization.
     * @memberof Loki
     */
    Loki.prototype.copy = function(options) {
      // in case running in an environment without accurate environment detection, pass 'NA'
      var databaseCopy = new Loki(this.filename, { env: "NA" });
      var clen, idx;

      options = options || {};

      // currently inverting and letting loadJSONObject do most of the work
      databaseCopy.loadJSONObject(this, { retainDirtyFlags: true });

      // since our JSON serializeReplacer is not invoked for reference database adapters, this will let us mimic
      if(options.hasOwnProperty("removeNonSerializable") && options.removeNonSerializable === true) {
        databaseCopy.autosaveHandle = null;
        databaseCopy.persistenceAdapter = null;

        clen = databaseCopy.collections.length;
        for (idx=0; idx<clen; idx++) {
          databaseCopy.collections[idx].constraints = null;
          databaseCopy.collections[idx].ttl = null;
        }
      }

      return databaseCopy;
    };

    /**
     * Adds a collection to the database.
     * @param {string} name - name of collection to add
     * @param {object=} options - (optional) options to configure collection with.
     * @param {array=} [options.unique=[]] - array of property names to define unique constraints for
     * @param {array=} [options.exact=[]] - array of property names to define exact constraints for
     * @param {array=} [options.indices=[]] - array property names to define binary indexes for
     * @param {boolean} [options.asyncListeners=false] - whether listeners are called asynchronously
     * @param {boolean} [options.disableMeta=false] - set to true to disable meta property on documents
     * @param {boolean} [options.disableChangesApi=true] - set to false to enable Changes Api
     * @param {boolean} [options.disableDeltaChangesApi=true] - set to false to enable Delta Changes API (requires Changes API, forces cloning)
     * @param {boolean} [options.autoupdate=false] - use Object.observe to update objects automatically
     * @param {boolean} [options.clone=false] - specify whether inserts and queries clone to/from user
     * @param {string} [options.cloneMethod='parse-stringify'] - 'parse-stringify', 'jquery-extend-deep', 'shallow, 'shallow-assign'
     * @param {int=} options.ttl - age of document (in ms.) before document is considered aged/stale.
     * @param {int=} options.ttlInterval - time interval for clearing out 'aged' documents; not set by default.
     * @returns {Collection} a reference to the collection which was just added
     * @memberof Loki
     */
    Loki.prototype.addCollection = function (name, options) {
      var i,
        len = this.collections.length;

      if (options && options.disableMeta === true) {
        if (options.disableChangesApi === false) {
          throw new Error("disableMeta option cannot be passed as true when disableChangesApi is passed as false");
        }
        if (options.disableDeltaChangesApi === false) {
          throw new Error("disableMeta option cannot be passed as true when disableDeltaChangesApi is passed as false");
        }
        if (typeof options.ttl === "number" && options.ttl > 0) {
          throw new Error("disableMeta option cannot be passed as true when ttl is enabled");
        }
      }

      for (i = 0; i < len; i += 1) {
        if (this.collections[i].name === name) {
          return this.collections[i];
        }
      }

      var collection = new Collection(name, options);
      this.collections.push(collection);

      if (this.verbose)
        collection.console = console;

      return collection;
    };

    Loki.prototype.loadCollection = function (collection) {
      if (!collection.name) {
        throw new Error('Collection must have a name property to be loaded');
      }
      this.collections.push(collection);
    };

    /**
     * Retrieves reference to a collection by name.
     * @param {string} collectionName - name of collection to look up
     * @returns {Collection} Reference to collection in database by that name, or null if not found
     * @memberof Loki
     */
    Loki.prototype.getCollection = function (collectionName) {
      var i,
        len = this.collections.length;

      for (i = 0; i < len; i += 1) {
        if (this.collections[i].name === collectionName) {
          return this.collections[i];
        }
      }

      // no such collection
      this.emit('warning', 'collection ' + collectionName + ' not found');
      return null;
    };

    /**
     * Renames an existing loki collection
     * @param {string} oldName - name of collection to rename
     * @param {string} newName - new name of collection
     * @returns {Collection} reference to the newly renamed collection
     * @memberof Loki
     */
    Loki.prototype.renameCollection = function (oldName, newName) {
      var c = this.getCollection(oldName);

      if (c) {
        c.name = newName;
      }

      return c;
    };

    /**
     * Returns a list of collections in the database.
     * @returns {object[]} array of objects containing 'name', 'type', and 'count' properties.
     * @memberof Loki
     */
    Loki.prototype.listCollections = function () {

      var i = this.collections.length,
        colls = [];

      while (i--) {
        colls.push({
          name: this.collections[i].name,
          type: this.collections[i].objType,
          count: this.collections[i].data.length
        });
      }
      return colls;
    };

    /**
     * Removes a collection from the database.
     * @param {string} collectionName - name of collection to remove
     * @memberof Loki
     */
    Loki.prototype.removeCollection = function (collectionName) {
      var i,
        len = this.collections.length;

      for (i = 0; i < len; i += 1) {
        if (this.collections[i].name === collectionName) {
          var tmpcol = new Collection(collectionName, {});
          var curcol = this.collections[i];
          for (var prop in curcol) {
            if (curcol.hasOwnProperty(prop) && tmpcol.hasOwnProperty(prop)) {
              curcol[prop] = tmpcol[prop];
            }
          }
          this.collections.splice(i, 1);
          return;
        }
      }
    };

    Loki.prototype.getName = function () {
      return this.name;
    };

    /**
     * serializeReplacer - used to prevent certain properties from being serialized
     *
     */
    Loki.prototype.serializeReplacer = function (key, value) {
      switch (key) {
      case 'autosaveHandle':
      case 'persistenceAdapter':
      case 'constraints':
      case 'ttl':
        return null;
      case 'throttledSavePending':
      case 'throttledCallbacks':
        return undefined;
      default:
        return value;
      }
    };

    /**
     * Serialize database to a string which can be loaded via {@link Loki#loadJSON}
     *
     * @returns {string} Stringified representation of the loki database.
     * @memberof Loki
     */
    Loki.prototype.serialize = function (options) {
      options = options || {};

      if (!options.hasOwnProperty("serializationMethod")) {
        options.serializationMethod = this.options.serializationMethod;
      }

      switch(options.serializationMethod) {
        case "normal": return JSON.stringify(this, this.serializeReplacer);
        case "pretty": return JSON.stringify(this, this.serializeReplacer, 2);
        case "destructured": return this.serializeDestructured(); // use default options
        default: return JSON.stringify(this, this.serializeReplacer);
      }
    };

    // alias of serialize
    Loki.prototype.toJson = Loki.prototype.serialize;

    /**
     * Database level destructured JSON serialization routine to allow alternate serialization methods.
     * Internally, Loki supports destructuring via loki "serializationMethod' option and
     * the optional LokiPartitioningAdapter class. It is also available if you wish to do
     * your own structured persistence or data exchange.
     *
     * @param {object=} options - output format options for use externally to loki
     * @param {bool=} options.partitioned - (default: false) whether db and each collection are separate
     * @param {int=} options.partition - can be used to only output an individual collection or db (-1)
     * @param {bool=} options.delimited - (default: true) whether subitems are delimited or subarrays
     * @param {string=} options.delimiter - override default delimiter
     *
     * @returns {string|array} A custom, restructured aggregation of independent serializations.
     * @memberof Loki
     */
    Loki.prototype.serializeDestructured = function(options) {
      var idx, sidx, result, resultlen;
      var reconstruct = [];
      var dbcopy;

      options = options || {};

      if (!options.hasOwnProperty("partitioned")) {
        options.partitioned = false;
      }

      if (!options.hasOwnProperty("delimited")) {
        options.delimited = true;
      }

      if (!options.hasOwnProperty("delimiter")) {
        options.delimiter = this.options.destructureDelimiter;
      }

      // 'partitioned' along with 'partition' of 0 or greater is a request for single collection serialization
      if (options.partitioned === true && options.hasOwnProperty("partition") && options.partition >= 0) {
        return this.serializeCollection({
          delimited: options.delimited,
          delimiter: options.delimiter,
          collectionIndex: options.partition
        });
      }

      // not just an individual collection, so we will need to serialize db container via shallow copy
      dbcopy = new Loki(this.filename);
      dbcopy.loadJSONObject(this);

      for(idx=0; idx < dbcopy.collections.length; idx++) {
        dbcopy.collections[idx].data = [];
      }

      // if we -only- wanted the db container portion, return it now
      if (options.partitioned === true && options.partition === -1) {
        // since we are deconstructing, override serializationMethod to normal for here
        return dbcopy.serialize({
          serializationMethod: "normal"
        });
      }

      // at this point we must be deconstructing the entire database
      // start by pushing db serialization into first array element
      reconstruct.push(dbcopy.serialize({
          serializationMethod: "normal"
      }));

      dbcopy = null;

      // push collection data into subsequent elements
      for(idx=0; idx < this.collections.length; idx++) {
        result = this.serializeCollection({
          delimited: options.delimited,
          delimiter: options.delimiter,
          collectionIndex: idx
        });

        // NDA : Non-Delimited Array : one iterable concatenated array with empty string collection partitions
        if (options.partitioned === false && options.delimited === false) {
          if (!Array.isArray(result)) {
            throw new Error("a nondelimited, non partitioned collection serialization did not return an expected array");
          }

          // Array.concat would probably duplicate memory overhead for copying strings.
          // Instead copy each individually, and clear old value after each copy.
          // Hopefully this will allow g.c. to reduce memory pressure, if needed.
          resultlen = result.length;

          for (sidx=0; sidx < resultlen; sidx++) {
            reconstruct.push(result[sidx]);
            result[sidx] = null;
          }

          reconstruct.push("");
        }
        else {
          reconstruct.push(result);
        }
      }

      // Reconstruct / present results according to four combinations : D, DA, NDA, NDAA
      if (options.partitioned) {
        // DA : Delimited Array of strings [0] db [1] collection [n] collection { partitioned: true, delimited: true }
        // useful for simple future adaptations of existing persistence adapters to save collections separately
        if (options.delimited) {
          return reconstruct;
        }
        // NDAA : Non-Delimited Array with subArrays. db at [0] and collection subarrays at [n] { partitioned: true, delimited : false }
        // This format might be the most versatile for 'rolling your own' partitioned sync or save.
        // Memory overhead can be reduced by specifying a specific partition, but at this code path they did not, so its all.
        else {
          return reconstruct;
        }
      }
      else {
        // D : one big Delimited string { partitioned: false, delimited : true }
        // This is the method Loki will use internally if 'destructured'.
        // Little memory overhead improvements but does not require multiple asynchronous adapter call scheduling
        if (options.delimited) {
          // indicate no more collections
          reconstruct.push("");

          return reconstruct.join(options.delimiter);
        }
        // NDA : Non-Delimited Array : one iterable array with empty string collection partitions { partitioned: false, delimited: false }
        // This format might be best candidate for custom synchronous syncs or saves
        else {
          // indicate no more collections
          reconstruct.push("");

          return reconstruct;
        }
      }

      reconstruct.push("");

      return reconstruct.join(delim);
    };

    /**
     * Collection level utility method to serialize a collection in a 'destructured' format
     *
     * @param {object=} options - used to determine output of method
     * @param {int} options.delimited - whether to return single delimited string or an array
     * @param {string} options.delimiter - (optional) if delimited, this is delimiter to use
     * @param {int} options.collectionIndex -  specify which collection to serialize data for
     *
     * @returns {string|array} A custom, restructured aggregation of independent serializations for a single collection.
     * @memberof Loki
     */
    Loki.prototype.serializeCollection = function(options) {
      var doccount,
        docidx,
        resultlines = [];

      options = options || {};

      if (!options.hasOwnProperty("delimited")) {
        options.delimited = true;
      }

      if (!options.hasOwnProperty("collectionIndex")) {
        throw new Error("serializeCollection called without 'collectionIndex' option");
      }

      doccount = this.collections[options.collectionIndex].data.length;

      resultlines = [];

      for(docidx=0; docidx<doccount; docidx++) {
        resultlines.push(JSON.stringify(this.collections[options.collectionIndex].data[docidx]));
      }

      // D and DA
      if (options.delimited) {
         // indicate no more documents in collection (via empty delimited string)
        resultlines.push("");

        return resultlines.join(options.delimiter);
      }
      else {
        // NDAA and NDA
        return resultlines;
      }
    };

    /**
     * Database level destructured JSON deserialization routine to minimize memory overhead.
     * Internally, Loki supports destructuring via loki "serializationMethod' option and
     * the optional LokiPartitioningAdapter class. It is also available if you wish to do
     * your own structured persistence or data exchange.
     *
     * @param {string|array} destructuredSource - destructured json or array to deserialize from
     * @param {object=} options - source format options
     * @param {bool=} [options.partitioned=false] - whether db and each collection are separate
     * @param {int=} options.partition - can be used to deserialize only a single partition
     * @param {bool=} [options.delimited=true] - whether subitems are delimited or subarrays
     * @param {string=} options.delimiter - override default delimiter
     *
     * @returns {object|array} An object representation of the deserialized database, not yet applied to 'this' db or document array
     * @memberof Loki
     */
    Loki.prototype.deserializeDestructured = function(destructuredSource, options) {
      var workarray=[];
      var len, cdb;
      var idx, collIndex=0, collCount, lineIndex=1, done=false;
      var currLine, currObject;

      options = options || {};

      if (!options.hasOwnProperty("partitioned")) {
        options.partitioned = false;
      }

      if (!options.hasOwnProperty("delimited")) {
        options.delimited = true;
      }

      if (!options.hasOwnProperty("delimiter")) {
        options.delimiter = this.options.destructureDelimiter;
      }

      // Partitioned
      // DA : Delimited Array of strings [0] db [1] collection [n] collection { partitioned: true, delimited: true }
      // NDAA : Non-Delimited Array with subArrays. db at [0] and collection subarrays at [n] { partitioned: true, delimited : false }
      // -or- single partition
      if (options.partitioned) {
        // handle single partition
        if (options.hasOwnProperty('partition')) {
          // db only
          if (options.partition === -1) {
            cdb = JSON.parse(destructuredSource[0]);

            return cdb;
          }

          // single collection, return doc array
          return this.deserializeCollection(destructuredSource[options.partition+1], options);
        }

        // Otherwise we are restoring an entire partitioned db
        cdb = JSON.parse(destructuredSource[0]);
        collCount = cdb.collections.length;
        for(collIndex=0; collIndex<collCount; collIndex++) {
          // attach each collection docarray to container collection data, add 1 to collection array index since db is at 0
          cdb.collections[collIndex].data = this.deserializeCollection(destructuredSource[collIndex+1], options);
        }

        return cdb;
      }

      // Non-Partitioned
      // D : one big Delimited string { partitioned: false, delimited : true }
      // NDA : Non-Delimited Array : one iterable array with empty string collection partitions { partitioned: false, delimited: false }

      // D
      if (options.delimited) {
        workarray = destructuredSource.split(options.delimiter);
        destructuredSource = null; // lower memory pressure
        len = workarray.length;

        if (len === 0) {
          return null;
        }
      }
      // NDA
      else {
        workarray = destructuredSource;
      }

      // first line is database and collection shells
      cdb = JSON.parse(workarray[0]);
      collCount = cdb.collections.length;
      workarray[0] = null;

      while (!done) {
        currLine = workarray[lineIndex];

        // empty string indicates either end of collection or end of file
        if (workarray[lineIndex] === "") {
          // if no more collections to load into, we are done
          if (++collIndex > collCount) {
            done = true;
          }
        }
        else {
          currObject = JSON.parse(workarray[lineIndex]);
          cdb.collections[collIndex].data.push(currObject);
        }

        // lower memory pressure and advance iterator
        workarray[lineIndex++] = null;
      }

      return cdb;
    };

    /**
     * Collection level utility function to deserializes a destructured collection.
     *
     * @param {string|array} destructuredSource - destructured representation of collection to inflate
     * @param {object=} options - used to describe format of destructuredSource input
     * @param {int=} [options.delimited=false] - whether source is delimited string or an array
     * @param {string=} options.delimiter - if delimited, this is delimiter to use (if other than default)
     *
     * @returns {array} an array of documents to attach to collection.data.
     * @memberof Loki
     */
    Loki.prototype.deserializeCollection = function(destructuredSource, options) {
      var workarray=[];
      var idx, len;

      options = options || {};

      if (!options.hasOwnProperty("partitioned")) {
        options.partitioned = false;
      }

      if (!options.hasOwnProperty("delimited")) {
        options.delimited = true;
      }

      if (!options.hasOwnProperty("delimiter")) {
        options.delimiter = this.options.destructureDelimiter;
      }

      if (options.delimited) {
        workarray = destructuredSource.split(options.delimiter);
        workarray.pop();
      }
      else {
        workarray = destructuredSource;
      }

      len = workarray.length;
      for (idx=0; idx < len; idx++) {
        workarray[idx] = JSON.parse(workarray[idx]);
      }

      return workarray;
    };

    /**
     * Inflates a loki database from a serialized JSON string
     *
     * @param {string} serializedDb - a serialized loki database string
     * @param {object=} options - apply or override collection level settings
     * @param {bool} options.retainDirtyFlags - whether collection dirty flags will be preserved
     * @memberof Loki
     */
    Loki.prototype.loadJSON = function (serializedDb, options) {
      var dbObject;
      if (serializedDb.length === 0) {
        dbObject = {};
      } else {
        // using option defined in instantiated db not what was in serialized db
        switch (this.options.serializationMethod) {
          case "normal":
          case "pretty": dbObject = JSON.parse(serializedDb); break;
          case "destructured": dbObject = this.deserializeDestructured(serializedDb); break;
          default:  dbObject = JSON.parse(serializedDb); break;
        }
      }

      this.loadJSONObject(dbObject, options);
    };

    /**
     * Inflates a loki database from a JS object
     *
     * @param {object} dbObject - a serialized loki database string
     * @param {object=} options - apply or override collection level settings
     * @param {bool} options.retainDirtyFlags - whether collection dirty flags will be preserved
     * @memberof Loki
     */
    Loki.prototype.loadJSONObject = function (dbObject, options) {
      var i = 0,
        len = dbObject.collections ? dbObject.collections.length : 0,
        coll,
        copyColl,
        clen,
        j,
        loader,
        collObj;

      this.name = dbObject.name;

      // restore save throttled boolean only if not defined in options
      if (dbObject.hasOwnProperty('throttledSaves') && options && !options.hasOwnProperty('throttledSaves')) {
        this.throttledSaves = dbObject.throttledSaves;
      }

      this.collections = [];

      function makeLoader(coll) {
        var collOptions = options[coll.name];
        var inflater;

        if(collOptions.proto) {
          inflater = collOptions.inflate || Utils.copyProperties;

          return function(data) {
            var collObj = new(collOptions.proto)();
            inflater(data, collObj);
            return collObj;
          };
        }

        return collOptions.inflate;
      }

      for (i; i < len; i += 1) {
        coll = dbObject.collections[i];

        copyColl = this.addCollection(coll.name, { disableChangesApi: coll.disableChangesApi, disableDeltaChangesApi: coll.disableDeltaChangesApi, disableMeta: coll.disableMeta });

        copyColl.adaptiveBinaryIndices = coll.hasOwnProperty('adaptiveBinaryIndices')?(coll.adaptiveBinaryIndices === true): false;
        copyColl.transactional = coll.transactional;
        copyColl.asyncListeners = coll.asyncListeners;
        copyColl.cloneObjects = coll.cloneObjects;
        copyColl.cloneMethod = coll.cloneMethod || "parse-stringify";
        copyColl.autoupdate = coll.autoupdate;
        copyColl.changes = coll.changes;

        if (options && options.retainDirtyFlags === true) {
          copyColl.dirty = coll.dirty;
        }
        else {
          copyColl.dirty = false;
        }

        // load each element individually
        clen = coll.data.length;
        j = 0;
        if (options && options.hasOwnProperty(coll.name)) {
          loader = makeLoader(coll);

          for (j; j < clen; j++) {
            collObj = loader(coll.data[j]);
            copyColl.data[j] = collObj;
            copyColl.addAutoUpdateObserver(collObj);
          }
        } else {

          for (j; j < clen; j++) {
            copyColl.data[j] = coll.data[j];
            copyColl.addAutoUpdateObserver(copyColl.data[j]);
          }
        }

        copyColl.maxId = (typeof coll.maxId === 'undefined') ? 0 : coll.maxId;
        copyColl.idIndex = coll.idIndex;
        if (typeof (coll.binaryIndices) !== 'undefined') {
          copyColl.binaryIndices = coll.binaryIndices;
        }
        if (typeof coll.transforms !== 'undefined') {
          copyColl.transforms = coll.transforms;
        }

        copyColl.ensureId();

        // regenerate unique indexes
        copyColl.uniqueNames = [];
        if (coll.hasOwnProperty("uniqueNames")) {
          copyColl.uniqueNames = coll.uniqueNames;
          for (j = 0; j < copyColl.uniqueNames.length; j++) {
            copyColl.ensureUniqueIndex(copyColl.uniqueNames[j]);
          }
        }

        // in case they are loading a database created before we added dynamic views, handle undefined
        if (typeof (coll.DynamicViews) === 'undefined') continue;

        // reinflate DynamicViews and attached Resultsets
        for (var idx = 0; idx < coll.DynamicViews.length; idx++) {
          var colldv = coll.DynamicViews[idx];

          var dv = copyColl.addDynamicView(colldv.name, colldv.options);
          dv.resultdata = colldv.resultdata;
          dv.resultsdirty = colldv.resultsdirty;
          dv.filterPipeline = colldv.filterPipeline;

          dv.sortCriteria = colldv.sortCriteria;
          dv.sortFunction = null;

          dv.sortDirty = colldv.sortDirty;
          dv.resultset.filteredrows = colldv.resultset.filteredrows;
          dv.resultset.filterInitialized = colldv.resultset.filterInitialized;

          dv.rematerialize({
            removeWhereFilters: true
          });
        }

        // Upgrade Logic for binary index refactoring at version 1.5
        if (dbObject.databaseVersion < 1.5) {
            // rebuild all indices
            copyColl.ensureAllIndexes(true);
            copyColl.dirty = true;
        }
      }
    };

    /**
     * Emits the close event. In autosave scenarios, if the database is dirty, this will save and disable timer.
     * Does not actually destroy the db.
     *
     * @param {function=} callback - (Optional) if supplied will be registered with close event before emitting.
     * @memberof Loki
     */
    Loki.prototype.close = function (callback) {
      // for autosave scenarios, we will let close perform final save (if dirty)
      // For web use, you might call from window.onbeforeunload to shutdown database, saving pending changes
      if (this.autosave) {
        this.autosaveDisable();
        if (this.autosaveDirty()) {
          this.saveDatabase(callback);
          callback = undefined;
        }
      }

      if (callback) {
        this.on('close', callback);
      }
      this.emit('close');
    };

    /**-------------------------+
    | Changes API               |
    +--------------------------*/

    /**
     * The Changes API enables the tracking the changes occurred in the collections since the beginning of the session,
     * so it's possible to create a differential dataset for synchronization purposes (possibly to a remote db)
     */

    /**
     * (Changes API) : takes all the changes stored in each
     * collection and creates a single array for the entire database. If an array of names
     * of collections is passed then only the included collections will be tracked.
     *
     * @param {array=} optional array of collection names. No arg means all collections are processed.
     * @returns {array} array of changes
     * @see private method createChange() in Collection
     * @memberof Loki
     */
    Loki.prototype.generateChangesNotification = function (arrayOfCollectionNames) {
      function getCollName(coll) {
        return coll.name;
      }
      var changes = [],
        selectedCollections = arrayOfCollectionNames || this.collections.map(getCollName);

      this.collections.forEach(function (coll) {
        if (selectedCollections.indexOf(getCollName(coll)) !== -1) {
          changes = changes.concat(coll.getChanges());
        }
      });
      return changes;
    };

    /**
     * (Changes API) - stringify changes for network transmission
     * @returns {string} string representation of the changes
     * @memberof Loki
     */
    Loki.prototype.serializeChanges = function (collectionNamesArray) {
      return JSON.stringify(this.generateChangesNotification(collectionNamesArray));
    };

    /**
     * (Changes API) : clears all the changes in all collections.
     * @memberof Loki
     */
    Loki.prototype.clearChanges = function () {
      this.collections.forEach(function (coll) {
        if (coll.flushChanges) {
          coll.flushChanges();
        }
      });
    };

    /*------------------+
    | PERSISTENCE       |
    -------------------*/

    /** there are two build in persistence adapters for internal use
     * fs             for use in Nodejs type environments
     * localStorage   for use in browser environment
     * defined as helper classes here so its easy and clean to use
     */

    /**
     * In in-memory persistence adapter for an in-memory database.
     * This simple 'key/value' adapter is intended for unit testing and diagnostics.
     *
     * @param {object=} options - memory adapter options
     * @param {boolean} [options.asyncResponses=false] - whether callbacks are invoked asynchronously
     * @param {int} [options.asyncTimeout=50] - timeout in ms to queue callbacks
     * @constructor LokiMemoryAdapter
     */
    function LokiMemoryAdapter(options) {
      this.hashStore = {};
      this.options = options || {};

      if (!this.options.hasOwnProperty('asyncResponses')) {
        this.options.asyncResponses = false;
      }

      if (!this.options.hasOwnProperty('asyncTimeout')) {
        this.options.asyncTimeout = 50; // 50 ms default
      }
    }

    /**
     * Loads a serialized database from its in-memory store.
     * (Loki persistence adapter interface function)
     *
     * @param {string} dbname - name of the database (filename/keyname)
     * @param {function} callback - adapter callback to return load result to caller
     * @memberof LokiMemoryAdapter
     */
    LokiMemoryAdapter.prototype.loadDatabase = function (dbname, callback) {
      var self=this;

      if (this.options.asyncResponses) {
        setTimeout(function() {
          if (self.hashStore.hasOwnProperty(dbname)) {
            callback(self.hashStore[dbname].value);
          }
          else {
            // database doesn't exist, return falsy
            callback (null);
          }
        }, this.options.asyncTimeout);
      }
      else {
        if (this.hashStore.hasOwnProperty(dbname)) {
          // database doesn't exist, return falsy
          callback(this.hashStore[dbname].value);
        }
        else {
          callback (null);
        }
      }
    };

    /**
     * Saves a serialized database to its in-memory store.
     * (Loki persistence adapter interface function)
     *
     * @param {string} dbname - name of the database (filename/keyname)
     * @param {function} callback - adapter callback to return load result to caller
     * @memberof LokiMemoryAdapter
     */
    LokiMemoryAdapter.prototype.saveDatabase = function (dbname, dbstring, callback) {
      var self=this;
      var saveCount;

      if (this.options.asyncResponses) {
        setTimeout(function() {
          saveCount = (self.hashStore.hasOwnProperty(dbname)?self.hashStore[dbname].savecount:0);

          self.hashStore[dbname] = {
            savecount: saveCount+1,
            lastsave: new Date(),
            value: dbstring
          };

          callback();
        }, this.options.asyncTimeout);
      }
      else {
        saveCount = (this.hashStore.hasOwnProperty(dbname)?this.hashStore[dbname].savecount:0);

        this.hashStore[dbname] = {
          savecount: saveCount+1,
          lastsave: new Date(),
          value: dbstring
        };

        callback();
      }
    };

    /**
     * Deletes a database from its in-memory store.
     *
     * @param {string} dbname - name of the database (filename/keyname)
     * @param {function} callback - function to call when done
     * @memberof LokiMemoryAdapter
     */
    LokiMemoryAdapter.prototype.deleteDatabase = function(dbname, callback) {
      if (this.hashStore.hasOwnProperty(dbname)) {
        delete this.hashStore[dbname];
      }

      if (typeof callback === "function") {
        callback();
      }
    };

    /**
     * An adapter for adapters.  Converts a non reference mode adapter into a reference mode adapter
     * which can perform destructuring and partioning.  Each collection will be stored in its own key/save and
     * only dirty collections will be saved.  If you  turn on paging with default page size of 25megs and save
     * a 75 meg collection it should use up roughly 3 save slots (key/value pairs sent to inner adapter).
     * A dirty collection that spans three pages will save all three pages again
     * Paging mode was added mainly because Chrome has issues saving 'too large' of a string within a
     * single indexeddb row.  If a single document update causes the collection to be flagged as dirty, all
     * of that collection's pages will be written on next save.
     *
     * @param {object} adapter - reference to a 'non-reference' mode loki adapter instance.
     * @param {object=} options - configuration options for partitioning and paging
     * @param {bool} options.paging - (default: false) set to true to enable paging collection data.
     * @param {int} options.pageSize - (default : 25MB) you can use this to limit size of strings passed to inner adapter.
     * @param {string} options.delimiter - allows you to override the default delimeter
     * @constructor LokiPartitioningAdapter
     */
    function LokiPartitioningAdapter(adapter, options) {
      this.mode = "reference";
      this.adapter = null;
      this.options = options || {};
      this.dbref = null;
      this.dbname = "";
      this.pageIterator = {};

      // verify user passed an appropriate adapter
      if (adapter) {
        if (adapter.mode === "reference") {
          throw new Error("LokiPartitioningAdapter cannot be instantiated with a reference mode adapter");
        }
        else {
          this.adapter = adapter;
        }
      }
      else {
        throw new Error("LokiPartitioningAdapter requires a (non-reference mode) adapter on construction");
      }

      // set collection paging defaults
      if (!this.options.hasOwnProperty("paging")) {
        this.options.paging = false;
      }

      // default to page size of 25 megs (can be up to your largest serialized object size larger than this)
      if (!this.options.hasOwnProperty("pageSize")) {
        this.options.pageSize = 25*1024*1024;
      }

      if (!this.options.hasOwnProperty("delimiter")) {
        this.options.delimiter = '$<\n';
      }
    }

    /**
     * Loads a database which was partitioned into several key/value saves.
     * (Loki persistence adapter interface function)
     *
     * @param {string} dbname - name of the database (filename/keyname)
     * @param {function} callback - adapter callback to return load result to caller
     * @memberof LokiPartitioningAdapter
     */
    LokiPartitioningAdapter.prototype.loadDatabase = function (dbname, callback) {
      var self=this;
      this.dbname = dbname;
      this.dbref = new Loki(dbname);

      // load the db container (without data)
      this.adapter.loadDatabase(dbname, function(result) {
        // empty database condition is for inner adapter return null/undefined/falsy
        if (!result) {
          // partition 0 not found so new database, no need to try to load other partitions.
          // return same falsy result to loadDatabase to signify no database exists (yet)
          callback(result);
          return;
        }

        if (typeof result !== "string") {
          callback(new Error("LokiPartitioningAdapter received an unexpected response from inner adapter loadDatabase()"));
        }

        // I will want to use loki destructuring helper methods so i will inflate into typed instance
        var db = JSON.parse(result);
        self.dbref.loadJSONObject(db);
        db = null;

        var clen = self.dbref.collections.length;

        if (self.dbref.collections.length === 0) {
          callback(self.dbref);
          return;
        }

        self.pageIterator = {
          collection: 0,
          pageIndex: 0
        };

        self.loadNextPartition(0, function() {
          callback(self.dbref);
        });
      });
    };

    /**
     * Used to sequentially load each collection partition, one at a time.
     *
     * @param {int} partition - ordinal collection position to load next
     * @param {function} callback - adapter callback to return load result to caller
     */
    LokiPartitioningAdapter.prototype.loadNextPartition = function(partition, callback) {
      var keyname = this.dbname + "." + partition;
      var self=this;

      if (this.options.paging === true) {
        this.pageIterator.pageIndex = 0;
        this.loadNextPage(callback);
        return;
      }

      this.adapter.loadDatabase(keyname, function(result) {
        var data = self.dbref.deserializeCollection(result, { delimited: true, collectionIndex: partition });
        self.dbref.collections[partition].data = data;

        if (++partition < self.dbref.collections.length) {
          self.loadNextPartition(partition, callback);
        }
        else {
          callback();
        }
      });
    };

    /**
     * Used to sequentially load the next page of collection partition, one at a time.
     *
     * @param {function} callback - adapter callback to return load result to caller
     */
    LokiPartitioningAdapter.prototype.loadNextPage = function(callback) {
      // calculate name for next saved page in sequence
      var keyname = this.dbname + "." + this.pageIterator.collection + "." + this.pageIterator.pageIndex;
      var self=this;

      // load whatever page is next in sequence
      this.adapter.loadDatabase(keyname, function(result) {
        var data = result.split(self.options.delimiter);
        result = ""; // free up memory now that we have split it into array
        var dlen = data.length;
        var idx;

        // detect if last page by presence of final empty string element and remove it if so
        var isLastPage = (data[dlen-1] === "");
        if (isLastPage) {
          data.pop();
          dlen = data.length;
          // empty collections are just a delimiter meaning two blank items
          if (data[dlen-1] === "" && dlen === 1) {
            data.pop();
            dlen = data.length;
          }
        }

        // convert stringified array elements to object instances and push to collection data
        for(idx=0; idx < dlen; idx++) {
          self.dbref.collections[self.pageIterator.collection].data.push(JSON.parse(data[idx]));
          data[idx] = null;
        }
        data = [];

        // if last page, we are done with this partition
        if (isLastPage) {

          // if there are more partitions, kick off next partition load
          if (++self.pageIterator.collection < self.dbref.collections.length) {
            self.loadNextPartition(self.pageIterator.collection, callback);
          }
          else {
            callback();
          }
        }
        else {
          self.pageIterator.pageIndex++;
          self.loadNextPage(callback);
        }
      });
    };

    /**
     * Saves a database by partioning into separate key/value saves.
     * (Loki 'reference mode' persistence adapter interface function)
     *
     * @param {string} dbname - name of the database (filename/keyname)
     * @param {object} dbref - reference to database which we will partition and save.
     * @param {function} callback - adapter callback to return load result to caller
     *
     * @memberof LokiPartitioningAdapter
     */
    LokiPartitioningAdapter.prototype.exportDatabase = function(dbname, dbref, callback) {
      var self=this;
      var idx, clen = dbref.collections.length;

      this.dbref = dbref;
      this.dbname = dbname;

      // queue up dirty partitions to be saved
      this.dirtyPartitions = [-1];
      for(idx=0; idx<clen; idx++) {
        if (dbref.collections[idx].dirty) {
          this.dirtyPartitions.push(idx);
        }
      }

      this.saveNextPartition(function(err) {
        callback(err);
      });
    };

    /**
     * Helper method used internally to save each dirty collection, one at a time.
     *
     * @param {function} callback - adapter callback to return load result to caller
     */
    LokiPartitioningAdapter.prototype.saveNextPartition = function(callback) {
      var self=this;
      var partition = this.dirtyPartitions.shift();
      var keyname = this.dbname + ((partition===-1)?"":("." + partition));

      // if we are doing paging and this is collection partition
      if (this.options.paging && partition !== -1) {
        this.pageIterator = {
          collection: partition,
          docIndex: 0,
          pageIndex: 0
        };

        // since saveNextPage recursively calls itself until done, our callback means this whole paged partition is finished
        this.saveNextPage(function(err) {
          if (self.dirtyPartitions.length === 0) {
            callback(err);
          }
          else {
            self.saveNextPartition(callback);
          }
        });
        return;
      }

      // otherwise this is 'non-paged' partioning...
      var result = this.dbref.serializeDestructured({
        partitioned : true,
        delimited: true,
        partition: partition
      });

      this.adapter.saveDatabase(keyname, result, function(err) {
        if (err) {
          callback(err);
          return;
        }

        if (self.dirtyPartitions.length === 0) {
          callback(null);
        }
        else {
          self.saveNextPartition(callback);
        }
      });
    };

    /**
     * Helper method used internally to generate and save the next page of the current (dirty) partition.
     *
     * @param {function} callback - adapter callback to return load result to caller
     */
    LokiPartitioningAdapter.prototype.saveNextPage = function(callback) {
      var self=this;
      var coll = this.dbref.collections[this.pageIterator.collection];
      var keyname = this.dbname + "." + this.pageIterator.collection + "." + this.pageIterator.pageIndex;
      var pageLen=0,
        cdlen = coll.data.length,
        delimlen = this.options.delimiter.length;
      var serializedObject = "",
        pageBuilder = "";
      var doneWithPartition=false,
        doneWithPage=false;

      var pageSaveCallback = function(err) {
        pageBuilder = "";

        if (err) {
          callback(err);
        }

        // update meta properties then continue process by invoking callback
        if (doneWithPartition) {
          callback(null);
        }
        else {
          self.pageIterator.pageIndex++;
          self.saveNextPage(callback);
        }
      };

      if (coll.data.length === 0) {
        doneWithPartition = true;
      }

      while (true) {
        if (!doneWithPartition) {
          // serialize object
          serializedObject = JSON.stringify(coll.data[this.pageIterator.docIndex]);
          pageBuilder += serializedObject;
          pageLen += serializedObject.length;

          // if no more documents in collection to add, we are done with partition
          if (++this.pageIterator.docIndex >= cdlen) doneWithPartition = true;
        }
        // if our current page is bigger than defined pageSize, we are done with page
        if (pageLen >= this.options.pageSize) doneWithPage = true;

        // if not done with current page, need delimiter before next item
        // if done with partition we also want a delmiter to indicate 'end of pages' final empty row
        if (!doneWithPage || doneWithPartition) {
          pageBuilder += this.options.delimiter;
          pageLen += delimlen;
        }

        // if we are done with page save it and pass off to next recursive call or callback
        if (doneWithPartition || doneWithPage) {
          this.adapter.saveDatabase(keyname, pageBuilder, pageSaveCallback);
          return;
        }
      }
    };

    /**
     * A loki persistence adapter which persists using node fs module
     * @constructor LokiFsAdapter
     */
    function LokiFsAdapter() {
      try {
        this.fs = __webpack_require__(36);
      }catch(e) {
        this.fs = null;
      }
    }

    /**
     * loadDatabase() - Load data from file, will throw an error if the file does not exist
     * @param {string} dbname - the filename of the database to load
     * @param {function} callback - the callback to handle the result
     * @memberof LokiFsAdapter
     */
    LokiFsAdapter.prototype.loadDatabase = function loadDatabase(dbname, callback) {
      var self = this;

      this.fs.stat(dbname, function (err, stats) {
        if (!err && stats.isFile()) {
          self.fs.readFile(dbname, {
            encoding: 'utf8'
          }, function readFileCallback(err, data) {
            if (err) {
              callback(new Error(err));
            } else {
              callback(data);
            }
          });
        }
        else {
          callback(null);
        }
      });
    };

    /**
     * saveDatabase() - save data to file, will throw an error if the file can't be saved
     * might want to expand this to avoid dataloss on partial save
     * @param {string} dbname - the filename of the database to load
     * @param {function} callback - the callback to handle the result
     * @memberof LokiFsAdapter
     */
    LokiFsAdapter.prototype.saveDatabase = function saveDatabase(dbname, dbstring, callback) {
      var self = this;
      var tmpdbname = dbname + '~';
      this.fs.writeFile(tmpdbname, dbstring, function writeFileCallback(err) {
        if (err) {
          callback(new Error(err));
        } else {
          self.fs.rename(tmpdbname,dbname,callback);
        }
      });
    };

    /**
     * deleteDatabase() - delete the database file, will throw an error if the
     * file can't be deleted
     * @param {string} dbname - the filename of the database to delete
     * @param {function} callback - the callback to handle the result
     * @memberof LokiFsAdapter
     */
    LokiFsAdapter.prototype.deleteDatabase = function deleteDatabase(dbname, callback) {
      this.fs.unlink(dbname, function deleteDatabaseCallback(err) {
        if (err) {
          callback(new Error(err));
        } else {
          callback();
        }
      });
    };


    /**
     * A loki persistence adapter which persists to web browser's local storage object
     * @constructor LokiLocalStorageAdapter
     */
    function LokiLocalStorageAdapter() {}

    /**
     * loadDatabase() - Load data from localstorage
     * @param {string} dbname - the name of the database to load
     * @param {function} callback - the callback to handle the result
     * @memberof LokiLocalStorageAdapter
     */
    LokiLocalStorageAdapter.prototype.loadDatabase = function loadDatabase(dbname, callback) {
      if (localStorageAvailable()) {
        callback(localStorage.getItem(dbname));
      } else {
        callback(new Error('localStorage is not available'));
      }
    };

    /**
     * saveDatabase() - save data to localstorage, will throw an error if the file can't be saved
     * might want to expand this to avoid dataloss on partial save
     * @param {string} dbname - the filename of the database to load
     * @param {function} callback - the callback to handle the result
     * @memberof LokiLocalStorageAdapter
     */
    LokiLocalStorageAdapter.prototype.saveDatabase = function saveDatabase(dbname, dbstring, callback) {
      if (localStorageAvailable()) {
        localStorage.setItem(dbname, dbstring);
        callback(null);
      } else {
        callback(new Error('localStorage is not available'));
      }
    };

    /**
     * deleteDatabase() - delete the database from localstorage, will throw an error if it
     * can't be deleted
     * @param {string} dbname - the filename of the database to delete
     * @param {function} callback - the callback to handle the result
     * @memberof LokiLocalStorageAdapter
     */
    LokiLocalStorageAdapter.prototype.deleteDatabase = function deleteDatabase(dbname, callback) {
      if (localStorageAvailable()) {
        localStorage.removeItem(dbname);
        callback(null);
      } else {
        callback(new Error('localStorage is not available'));
      }
    };

    /**
     * Wait for throttledSaves to complete and invoke your callback when drained or duration is met.
     *
     * @param {function} callback - callback to fire when save queue is drained, it is passed a sucess parameter value
     * @param {object=} options - configuration options
     * @param {boolean} options.recursiveWait - (default: true) if after queue is drained, another save was kicked off, wait for it
     * @param {bool} options.recursiveWaitLimit - (default: false) limit our recursive waiting to a duration
     * @param {int} options.recursiveWaitLimitDelay - (default: 2000) cutoff in ms to stop recursively re-draining
     * @memberof Loki
     */
    Loki.prototype.throttledSaveDrain = function(callback, options) {
      var self = this;
      var now = (new Date()).getTime();

      if (!this.throttledSaves) {
        callback(true);
      }

      options = options || {};
      if (!options.hasOwnProperty('recursiveWait')) {
        options.recursiveWait = true;
      }
      if (!options.hasOwnProperty('recursiveWaitLimit')) {
        options.recursiveWaitLimit = false;
      }
      if (!options.hasOwnProperty('recursiveWaitLimitDuration')) {
        options.recursiveWaitLimitDuration = 2000;
      }
      if (!options.hasOwnProperty('started')) {
        options.started = (new Date()).getTime();
      }

      // if save is pending
      if (this.throttledSaves && this.throttledSavePending) {
        // if we want to wait until we are in a state where there are no pending saves at all
        if (options.recursiveWait) {
          // queue the following meta callback for when it completes
          this.throttledCallbacks.push(function() {
            // if there is now another save pending...
            if (self.throttledSavePending) {
              // if we wish to wait only so long and we have exceeded limit of our waiting, callback with false success value
              if (options.recursiveWaitLimit && (now - options.started > options.recursiveWaitLimitDuration)) {
                callback(false);
                return;
              }
              // it must be ok to wait on next queue drain
              self.throttledSaveDrain(callback, options);
              return;
            }
            // no pending saves so callback with true success
            else {
              callback(true);
              return;
            }
          });
        }
        // just notify when current queue is depleted
        else {
          this.throttledCallbacks.push(callback);
          return;
        }
      }
      // no save pending, just callback
      else {
        callback(true);
      }
    };

    /**
     * Internal load logic, decoupled from throttling/contention logic
     *
     * @param {object} options - not currently used (remove or allow overrides?)
     * @param {function=} callback - (Optional) user supplied async callback / error handler
     */
    Loki.prototype.loadDatabaseInternal = function (options, callback) {
      var cFun = callback || function (err, data) {
          if (err) {
            throw err;
          }
        },
        self = this;

      // the persistenceAdapter should be present if all is ok, but check to be sure.
      if (this.persistenceAdapter !== null) {

        this.persistenceAdapter.loadDatabase(this.filename, function loadDatabaseCallback(dbString) {
          if (typeof (dbString) === 'string') {
            var parseSuccess = false;
            try {
              self.loadJSON(dbString, options || {});
              parseSuccess = true;
            } catch (err) {
              cFun(err);
            }
            if (parseSuccess) {
              cFun(null);
              self.emit('loaded', 'database ' + self.filename + ' loaded');
            }
          } else {
            // falsy result means new database
            if (!dbString) {
              cFun(null);
              self.emit('loaded', 'empty database ' + self.filename + ' loaded');
              return;
            }

            // instanceof error means load faulted
            if (dbString instanceof Error) {
                cFun(dbString);
                return;
            }

            // if adapter has returned an js object (other than null or error) attempt to load from JSON object
            if (typeof (dbString) === "object") {
              self.loadJSONObject(dbString, options || {});
              cFun(null); // return null on success
              self.emit('loaded', 'database ' + self.filename + ' loaded');
              return;
            }

            cFun("unexpected adapter response : " + dbString);
          }
        });

      } else {
        cFun(new Error('persistenceAdapter not configured'));
      }
    };

    /**
     * Handles manually loading from file system, local storage, or adapter (such as indexeddb)
     *    This method utilizes loki configuration options (if provided) to determine which
     *    persistence method to use, or environment detection (if configuration was not provided).
     *    To avoid contention with any throttledSaves, we will drain the save queue first.
     *
     * If you are configured with autosave, you do not need to call this method yourself.
     *
     * @param {object} options - if throttling saves and loads, this controls how we drain save queue before loading
     * @param {boolean} options.recursiveWait - (default: true) wait recursively until no saves are queued
     * @param {bool} options.recursiveWaitLimit - (default: false) limit our recursive waiting to a duration
     * @param {int} options.recursiveWaitLimitDelay - (default: 2000) cutoff in ms to stop recursively re-draining
     * @param {function=} callback - (Optional) user supplied async callback / error handler
     * @memberof Loki
     * @example
     * db.loadDatabase({}, function(err) {
     *   if (err) {
     *     console.log("error : " + err);
     *   }
     *   else {
     *     console.log("database loaded.");
     *   }
     * });
     */
    Loki.prototype.loadDatabase = function (options, callback) {
      var self=this;

      // if throttling disabled, just call internal
      if (!this.throttledSaves) {
        this.loadDatabaseInternal(options, callback);
        return;
      }

      // try to drain any pending saves in the queue to lock it for loading
      this.throttledSaveDrain(function(success) {
        if (success) {
          // pause/throttle saving until loading is done
          self.throttledSavePending = true;

          self.loadDatabaseInternal(options, function(err) {
            // now that we are finished loading, if no saves were throttled, disable flag
            if (self.throttledCallbacks.length === 0) {
              self.throttledSavePending = false;
            }
            // if saves requests came in while loading, kick off new save to kick off resume saves
            else {
              self.saveDatabase();
            }

            if (typeof callback === 'function') {
              callback(err);
            }
          });
          return;
        }
        else {
          if (typeof callback === 'function') {
            callback(new Error("Unable to pause save throttling long enough to read database"));
          }
        }
      }, options);
    };

    /**
     * Internal save logic, decoupled from save throttling logic
     */
    Loki.prototype.saveDatabaseInternal = function (callback) {
      var cFun = callback || function (err) {
          if (err) {
            throw err;
          }
          return;
        },
        self = this;

      // the persistenceAdapter should be present if all is ok, but check to be sure.
      if (this.persistenceAdapter !== null) {
        // check if the adapter is requesting (and supports) a 'reference' mode export
        if (this.persistenceAdapter.mode === "reference" && typeof this.persistenceAdapter.exportDatabase === "function") {
          // filename may seem redundant but loadDatabase will need to expect this same filename
          this.persistenceAdapter.exportDatabase(this.filename, this.copy({removeNonSerializable:true}), function exportDatabaseCallback(err) {
            self.autosaveClearFlags();
            cFun(err);
          });
        }
        // otherwise just pass the serialized database to adapter
        else {
          // persistenceAdapter might be asynchronous, so we must clear `dirty` immediately
          // or autosave won't work if an update occurs between here and the callback
          self.autosaveClearFlags();
          this.persistenceAdapter.saveDatabase(this.filename, self.serialize(), function saveDatabasecallback(err) {
            cFun(err);
          });
        }
      } else {
        cFun(new Error('persistenceAdapter not configured'));
      }
    };

    /**
     * Handles manually saving to file system, local storage, or adapter (such as indexeddb)
     *    This method utilizes loki configuration options (if provided) to determine which
     *    persistence method to use, or environment detection (if configuration was not provided).
     *
     * If you are configured with autosave, you do not need to call this method yourself.
     *
     * @param {function=} callback - (Optional) user supplied async callback / error handler
     * @memberof Loki
     * @example
     * db.saveDatabase(function(err) {
     *   if (err) {
     *     console.log("error : " + err);
     *   }
     *   else {
     *     console.log("database saved.");
     *   }
     * });
     */
    Loki.prototype.saveDatabase = function (callback) {
      if (!this.throttledSaves) {
        this.saveDatabaseInternal(callback);
        return;
      }

      if (this.throttledSavePending) {
        this.throttledCallbacks.push(callback);
        return;
      }

      var localCallbacks = this.throttledCallbacks;
      this.throttledCallbacks = [];
      localCallbacks.unshift(callback);
      this.throttledSavePending = true;

      var self = this;
      this.saveDatabaseInternal(function(err) {
        self.throttledSavePending = false;
        localCallbacks.forEach(function(pcb) {
          if (typeof pcb === 'function') {
            // Queue the callbacks so we first finish this method execution
            setTimeout(function() {
              pcb(err);
            }, 1);
          }
        });

        // since this is called async, future requests may have come in, if so.. kick off next save
        if (self.throttledCallbacks.length > 0) {
          self.saveDatabase();
        }
      });
    };

    // alias
    Loki.prototype.save = Loki.prototype.saveDatabase;

    /**
     * Handles deleting a database from file system, local
     *    storage, or adapter (indexeddb)
     *    This method utilizes loki configuration options (if provided) to determine which
     *    persistence method to use, or environment detection (if configuration was not provided).
     *
     * @param {function=} callback - (Optional) user supplied async callback / error handler
     * @memberof Loki
     */
    Loki.prototype.deleteDatabase = function (options, callback) {
      var cFun = callback || function (err, data) {
        if (err) {
          throw err;
        }
      };

      // we aren't even using options, so we will support syntax where
      // callback is passed as first and only argument
      if (typeof options === 'function' && !callback) {
        cFun = options;
      }

      // the persistenceAdapter should be present if all is ok, but check to be sure.
      if (this.persistenceAdapter !== null) {
        this.persistenceAdapter.deleteDatabase(this.filename, function deleteDatabaseCallback(err) {
          cFun(err);
        });
      } else {
        cFun(new Error('persistenceAdapter not configured'));
      }
    };

    /**
     * autosaveDirty - check whether any collections are 'dirty' meaning we need to save (entire) database
     *
     * @returns {boolean} - true if database has changed since last autosave, false if not.
     */
    Loki.prototype.autosaveDirty = function () {
      for (var idx = 0; idx < this.collections.length; idx++) {
        if (this.collections[idx].dirty) {
          return true;
        }
      }

      return false;
    };

    /**
     * autosaveClearFlags - resets dirty flags on all collections.
     *    Called from saveDatabase() after db is saved.
     *
     */
    Loki.prototype.autosaveClearFlags = function () {
      for (var idx = 0; idx < this.collections.length; idx++) {
        this.collections[idx].dirty = false;
      }
    };

    /**
     * autosaveEnable - begin a javascript interval to periodically save the database.
     *
     * @param {object} options - not currently used (remove or allow overrides?)
     * @param {function=} callback - (Optional) user supplied async callback
     */
    Loki.prototype.autosaveEnable = function (options, callback) {
      this.autosave = true;

      var delay = 5000,
        self = this;

      if (typeof (this.autosaveInterval) !== 'undefined' && this.autosaveInterval !== null) {
        delay = this.autosaveInterval;
      }

      this.autosaveHandle = setInterval(function autosaveHandleInterval() {
        // use of dirty flag will need to be hierarchical since mods are done at collection level with no visibility of 'db'
        // so next step will be to implement collection level dirty flags set on insert/update/remove
        // along with loki level isdirty() function which iterates all collections to see if any are dirty

        if (self.autosaveDirty()) {
          self.saveDatabase(callback);
        }
      }, delay);
    };

    /**
     * autosaveDisable - stop the autosave interval timer.
     *
     */
    Loki.prototype.autosaveDisable = function () {
      if (typeof (this.autosaveHandle) !== 'undefined' && this.autosaveHandle !== null) {
        clearInterval(this.autosaveHandle);
        this.autosaveHandle = null;
      }
    };


    /**
     * Resultset class allowing chainable queries.  Intended to be instanced internally.
     *    Collection.find(), Collection.where(), and Collection.chain() instantiate this.
     *
     * @example
     *    mycollection.chain()
     *      .find({ 'doors' : 4 })
     *      .where(function(obj) { return obj.name === 'Toyota' })
     *      .data();
     *
     * @constructor Resultset
     * @param {Collection} collection - The collection which this Resultset will query against.
     */
    function Resultset(collection, options) {
      options = options || {};

      // retain reference to collection we are querying against
      this.collection = collection;
      this.filteredrows = [];
      this.filterInitialized = false;

      return this;
    }

    /**
     * reset() - Reset the resultset to its initial state.
     *
     * @returns {Resultset} Reference to this resultset, for future chain operations.
     */
    Resultset.prototype.reset = function () {
      if (this.filteredrows.length > 0) {
        this.filteredrows = [];
      }
      this.filterInitialized = false;
      return this;
    };

    /**
     * toJSON() - Override of toJSON to avoid circular references
     *
     */
    Resultset.prototype.toJSON = function () {
      var copy = this.copy();
      copy.collection = null;
      return copy;
    };

    /**
     * Allows you to limit the number of documents passed to next chain operation.
     *    A resultset copy() is made to avoid altering original resultset.
     *
     * @param {int} qty - The number of documents to return.
     * @returns {Resultset} Returns a copy of the resultset, limited by qty, for subsequent chain ops.
     * @memberof Resultset
     * // find the two oldest users
     * var result = users.chain().simplesort("age", true).limit(2).data();
     */
    Resultset.prototype.limit = function (qty) {
      // if this has no filters applied, we need to populate filteredrows first
      if (!this.filterInitialized && this.filteredrows.length === 0) {
        this.filteredrows = this.collection.prepareFullDocIndex();
      }

      var rscopy = new Resultset(this.collection);
      rscopy.filteredrows = this.filteredrows.slice(0, qty);
      rscopy.filterInitialized = true;
      return rscopy;
    };

    /**
     * Used for skipping 'pos' number of documents in the resultset.
     *
     * @param {int} pos - Number of documents to skip; all preceding documents are filtered out.
     * @returns {Resultset} Returns a copy of the resultset, containing docs starting at 'pos' for subsequent chain ops.
     * @memberof Resultset
     * // find everyone but the two oldest users
     * var result = users.chain().simplesort("age", true).offset(2).data();
     */
    Resultset.prototype.offset = function (pos) {
      // if this has no filters applied, we need to populate filteredrows first
      if (!this.filterInitialized && this.filteredrows.length === 0) {
        this.filteredrows = this.collection.prepareFullDocIndex();
      }

      var rscopy = new Resultset(this.collection);
      rscopy.filteredrows = this.filteredrows.slice(pos);
      rscopy.filterInitialized = true;
      return rscopy;
    };

    /**
     * copy() - To support reuse of resultset in branched query situations.
     *
     * @returns {Resultset} Returns a copy of the resultset (set) but the underlying document references will be the same.
     * @memberof Resultset
     */
    Resultset.prototype.copy = function () {
      var result = new Resultset(this.collection);

      if (this.filteredrows.length > 0) {
        result.filteredrows = this.filteredrows.slice();
      }
      result.filterInitialized = this.filterInitialized;

      return result;
    };

    /**
     * Alias of copy()
     * @memberof Resultset
     */
    Resultset.prototype.branch = Resultset.prototype.copy;

    /**
     * transform() - executes a named collection transform or raw array of transform steps against the resultset.
     *
     * @param transform {(string|array)} - name of collection transform or raw transform array
     * @param parameters {object=} - (Optional) object property hash of parameters, if the transform requires them.
     * @returns {Resultset} either (this) resultset or a clone of of this resultset (depending on steps)
     * @memberof Resultset
     * @example
     * users.addTransform('CountryFilter', [
     *   {
     *     type: 'find',
     *     value: {
     *       'country': { $eq: '[%lktxp]Country' }
     *     }
     *   },
     *   {
     *     type: 'simplesort',
     *     property: 'age',
     *     options: { desc: false}
     *   }
     * ]);
     * var results = users.chain().transform("CountryFilter", { Country: 'fr' }).data();
     */
    Resultset.prototype.transform = function (transform, parameters) {
      var idx,
        step,
        rs = this;

      // if transform is name, then do lookup first
      if (typeof transform === 'string') {
        if (this.collection.transforms.hasOwnProperty(transform)) {
          transform = this.collection.transforms[transform];
        }
      }

      // either they passed in raw transform array or we looked it up, so process
      if (typeof transform !== 'object' || !Array.isArray(transform)) {
        throw new Error("Invalid transform");
      }

      if (typeof parameters !== 'undefined') {
        transform = Utils.resolveTransformParams(transform, parameters);
      }

      for (idx = 0; idx < transform.length; idx++) {
        step = transform[idx];

        switch (step.type) {
        case "find":
          rs.find(step.value);
          break;
        case "where":
          rs.where(step.value);
          break;
        case "simplesort":
          rs.simplesort(step.property, step.desc || step.options);
          break;
        case "compoundsort":
          rs.compoundsort(step.value);
          break;
        case "sort":
          rs.sort(step.value);
          break;
        case "limit":
          rs = rs.limit(step.value);
          break; // limit makes copy so update reference
        case "offset":
          rs = rs.offset(step.value);
          break; // offset makes copy so update reference
        case "map":
          rs = rs.map(step.value, step.dataOptions);
          break;
        case "eqJoin":
          rs = rs.eqJoin(step.joinData, step.leftJoinKey, step.rightJoinKey, step.mapFun, step.dataOptions);
          break;
          // following cases break chain by returning array data so make any of these last in transform steps
        case "mapReduce":
          rs = rs.mapReduce(step.mapFunction, step.reduceFunction);
          break;
          // following cases update documents in current filtered resultset (use carefully)
        case "update":
          rs.update(step.value);
          break;
        case "remove":
          rs.remove();
          break;
        default:
          break;
        }
      }

      return rs;
    };

    /**
     * User supplied compare function is provided two documents to compare. (chainable)
     * @example
     *    rslt.sort(function(obj1, obj2) {
     *      if (obj1.name === obj2.name) return 0;
     *      if (obj1.name > obj2.name) return 1;
     *      if (obj1.name < obj2.name) return -1;
     *    });
     *
     * @param {function} comparefun - A javascript compare function used for sorting.
     * @returns {Resultset} Reference to this resultset, sorted, for future chain operations.
     * @memberof Resultset
     */
    Resultset.prototype.sort = function (comparefun) {
      // if this has no filters applied, just we need to populate filteredrows first
      if (!this.filterInitialized && this.filteredrows.length === 0) {
        this.filteredrows = this.collection.prepareFullDocIndex();
      }

      var wrappedComparer =
        (function (userComparer, data) {
          return function (a, b) {
            return userComparer(data[a], data[b]);
          };
        })(comparefun, this.collection.data);

      this.filteredrows.sort(wrappedComparer);

      return this;
    };

    /**
     * Simpler, loose evaluation for user to sort based on a property name. (chainable).
     *    Sorting based on the same lt/gt helper functions used for binary indices.
     *
     * @param {string} propname - name of property to sort by.
     * @param {object|bool=} options - boolean to specify if isdescending, or options object
     * @param {boolean} [options.desc=false] - whether to sort descending
     * @param {boolean} [options.disableIndexIntersect=false] - whether we should explicity not use array intersection.
     * @param {boolean} [options.forceIndexIntersect=false] - force array intersection (if binary index exists).
     * @param {boolean} [options.useJavascriptSorting=false] - whether results are sorted via basic javascript sort.
     * @returns {Resultset} Reference to this resultset, sorted, for future chain operations.
     * @memberof Resultset
     * @example
     * var results = users.chain().simplesort('age').data();
     */
    Resultset.prototype.simplesort = function (propname, options) {
      var eff, 
        targetEff = 10,
        dc = this.collection.data.length, 
        frl = this.filteredrows.length,
        hasBinaryIndex = this.collection.binaryIndices.hasOwnProperty(propname);

      if (typeof (options) === 'undefined' || options === false) {
        options = { desc: false };
      }
      if (options === true) {
        options = { desc: true };
      }

      // if nothing in filtered rows array...
      if (frl === 0) {
        // if the filter is initialized to be empty resultset, do nothing
        if (this.filterInitialized) {
          return this;
        }
        
        // otherwise no filters applied implies all documents, so we need to populate filteredrows first
        
        // if we have a binary index, we can just use that instead of sorting (again)
        if (this.collection.binaryIndices.hasOwnProperty(propname)) {
          // make sure index is up-to-date
          this.collection.ensureIndex(propname);
          // copy index values into filteredrows
          this.filteredrows = this.collection.binaryIndices[propname].values.slice(0);

          if (options.desc) {
            this.filteredrows.reverse();
          }

          // we are done, return this (resultset) for further chain ops
          return this;
        }
        // otherwise initialize array for sort below
        else {
          // build full document index (to be sorted subsequently)
          this.filteredrows = this.collection.prepareFullDocIndex();
        }
      }
      // otherwise we had results to begin with, see if we qualify for index intercept optimization
      else {

        // If already filtered, but we want to leverage binary index on sort.
        // This will use custom array intection algorithm.
        if (!options.disableIndexIntersect && hasBinaryIndex) {

          // calculate filter efficiency
          eff = dc/frl;

          // when javascript sort fallback is enabled, you generally need more than ~17% of total docs in resultset
          // before array intersect is determined to be the faster algorithm, otherwise leave at 10% for loki sort.
          if (options.useJavascriptSorting) {
            targetEff = 6;
          }

          // anything more than ratio of 10:1 (total documents/current results) should use old sort code path
          // So we will only use array intersection if you have more than 10% of total docs in your current resultset.
          if (eff <= targetEff || options.forceIndexIntersect) {
            var idx, fr=this.filteredrows;
            var io = {};
            // set up hashobject for simple 'inclusion test' with existing (filtered) results
            for(idx=0; idx<frl; idx++) {
              io[fr[idx]] = true;
            }
            // grab full sorted binary index array
            var pv = this.collection.binaryIndices[propname].values;

            // filter by existing results
            this.filteredrows = pv.filter(function(n) { return io[n]; });

            if (options.desc) {
              this.filteredrows.reverse();
            }

            return this;
          }
        }
      }

      // at this point, we will not be able to leverage binary index so we will have to do an array sort
      
      // if we have opted to use simplified javascript comparison function...
      if (options.useJavascriptSorting) {
        return this.sort(function(obj1, obj2) {
          if (obj1[propname] === obj2[propname]) return 0;
          if (obj1[propname] > obj2[propname]) return 1;
          if (obj1[propname] < obj2[propname]) return -1;
        });
      }

      // otherwise use loki sort which will return same results if column is indexed or not
      var wrappedComparer =
        (function (prop, desc, data) {
          var val1, val2, arr;
          return function (a, b) {
            if (~prop.indexOf('.')) {
              arr = prop.split('.');
              val1 = arr.reduce(function(obj, i) { return obj && obj[i] || undefined; }, data[a]);
              val2 = arr.reduce(function(obj, i) { return obj && obj[i] || undefined; }, data[b]);
            } else {
              val1 = data[a][prop];
              val2 = data[b][prop];
            }
            return sortHelper(val1, val2, desc);
          };
        })(propname, options.desc, this.collection.data);

      this.filteredrows.sort(wrappedComparer);

      return this;
    };

    /**
     * Allows sorting a resultset based on multiple columns.
     * @example
     * // to sort by age and then name (both ascending)
     * rs.compoundsort(['age', 'name']);
     * // to sort by age (ascending) and then by name (descending)
     * rs.compoundsort(['age', ['name', true]);
     *
     * @param {array} properties - array of property names or subarray of [propertyname, isdesc] used evaluate sort order
     * @returns {Resultset} Reference to this resultset, sorted, for future chain operations.
     * @memberof Resultset
     */
    Resultset.prototype.compoundsort = function (properties) {
      if (properties.length === 0) {
        throw new Error("Invalid call to compoundsort, need at least one property");
      }

      var prop;
      if (properties.length === 1) {
        prop = properties[0];
        if (Array.isArray(prop)) {
          return this.simplesort(prop[0], prop[1]);
        }
        return this.simplesort(prop, false);
      }

      // unify the structure of 'properties' to avoid checking it repeatedly while sorting
      for (var i = 0, len = properties.length; i < len; i += 1) {
        prop = properties[i];
        if (!Array.isArray(prop)) {
          properties[i] = [prop, false];
        }
      }

      // if this has no filters applied, just we need to populate filteredrows first
      if (!this.filterInitialized && this.filteredrows.length === 0) {
        this.filteredrows = this.collection.prepareFullDocIndex();
      }

      var wrappedComparer =
        (function (props, data) {
          return function (a, b) {
            return compoundeval(props, data[a], data[b]);
          };
        })(properties, this.collection.data);

      this.filteredrows.sort(wrappedComparer);

      return this;
    };

    /**
     * findOr() - oversee the operation of OR'ed query expressions.
     *    OR'ed expression evaluation runs each expression individually against the full collection,
     *    and finally does a set OR on each expression's results.
     *    Each evaluation can utilize a binary index to prevent multiple linear array scans.
     *
     * @param {array} expressionArray - array of expressions
     * @returns {Resultset} this resultset for further chain ops.
     */
    Resultset.prototype.findOr = function (expressionArray) {
      var fr = null,
        fri = 0,
        frlen = 0,
        docset = [],
        idxset = [],
        idx = 0,
        origCount = this.count();

      // If filter is already initialized, then we query against only those items already in filter.
      // This means no index utilization for fields, so hopefully its filtered to a smallish filteredrows.
      for (var ei = 0, elen = expressionArray.length; ei < elen; ei++) {
        // we need to branch existing query to run each filter separately and combine results
        fr = this.branch().find(expressionArray[ei]).filteredrows;
        frlen = fr.length;
        // if the find operation did not reduce the initial set, then the initial set is the actual result
        if (frlen === origCount) {
          return this;
        }

        // add any document 'hits'
        for (fri = 0; fri < frlen; fri++) {
          idx = fr[fri];
          if (idxset[idx] === undefined) {
            idxset[idx] = true;
            docset.push(idx);
          }
        }
      }

      this.filteredrows = docset;
      this.filterInitialized = true;

      return this;
    };
    Resultset.prototype.$or = Resultset.prototype.findOr;

    /**
     * findAnd() - oversee the operation of AND'ed query expressions.
     *    AND'ed expression evaluation runs each expression progressively against the full collection,
     *    internally utilizing existing chained resultset functionality.
     *    Only the first filter can utilize a binary index.
     *
     * @param {array} expressionArray - array of expressions
     * @returns {Resultset} this resultset for further chain ops.
     */
    Resultset.prototype.findAnd = function (expressionArray) {
      // we have already implementing method chaining in this (our Resultset class)
      // so lets just progressively apply user supplied and filters
      for (var i = 0, len = expressionArray.length; i < len; i++) {
        if (this.count() === 0) {
          return this;
        }
        this.find(expressionArray[i]);
      }
      return this;
    };
    Resultset.prototype.$and = Resultset.prototype.findAnd;

    /**
     * Used for querying via a mongo-style query object.
     *
     * @param {object} query - A mongo-style query object used for filtering current results.
     * @param {boolean=} firstOnly - (Optional) Used by collection.findOne()
     * @returns {Resultset} this resultset for further chain ops.
     * @memberof Resultset
     * @example
     * var over30 = users.chain().find({ age: { $gte: 30 } }).data();
     */
    Resultset.prototype.find = function (query, firstOnly) {
      if (this.collection.data.length === 0) {
        this.filteredrows = [];
        this.filterInitialized = true;
        return this;
      }

      var queryObject = query || 'getAll',
        p,
        property,
        queryObjectOp,
        obj,
        operator,
        value,
        key,
        searchByIndex = false,
        result = [],
        filters = [],
        index = null;

      // flag if this was invoked via findOne()
      firstOnly = firstOnly || false;

      if (typeof queryObject === 'object') {
        for (p in queryObject) {
          obj = {};
          obj[p] = queryObject[p];
          filters.push(obj);

          if (hasOwnProperty.call(queryObject, p)) {
            property = p;
            queryObjectOp = queryObject[p];
          }
        }
        // if more than one expression in single query object,
        // convert implicit $and to explicit $and
        if (filters.length > 1) {
          return this.find({ '$and': filters }, firstOnly);
        }
      }

      // apply no filters if they want all
      if (!property || queryObject === 'getAll') {
        if (firstOnly) {
          this.filteredrows = (this.collection.data.length > 0)?[0]: [];
          this.filterInitialized = true;
        }

        return this;
      }

      // injecting $and and $or expression tree evaluation here.
      if (property === '$and' || property === '$or') {
        this[property](queryObjectOp);

        // for chained find with firstonly,
        if (firstOnly && this.filteredrows.length > 1) {
          this.filteredrows = this.filteredrows.slice(0, 1);
        }

        return this;
      }

      // see if query object is in shorthand mode (assuming eq operator)
      if (queryObjectOp === null || (typeof queryObjectOp !== 'object' || queryObjectOp instanceof Date)) {
        operator = '$eq';
        value = queryObjectOp;
      } else if (typeof queryObjectOp === 'object') {
        for (key in queryObjectOp) {
          if (hasOwnProperty.call(queryObjectOp, key)) {
            operator = key;
            value = queryObjectOp[key];
            break;
          }
        }
      } else {
        throw new Error('Do not know what you want to do.');
      }

      // for regex ops, precompile
      if (operator === '$regex') {
        if (Array.isArray(value)) {
          value = new RegExp(value[0], value[1]);
        } else if (!(value instanceof RegExp)) {
          value = new RegExp(value);
        }
      }

      // if user is deep querying the object such as find('name.first': 'odin')
      var usingDotNotation = (property.indexOf('.') !== -1);

      // if an index exists for the property being queried against, use it
      // for now only enabling where it is the first filter applied and prop is indexed
      var doIndexCheck = !usingDotNotation && !this.filterInitialized;

      if (doIndexCheck && this.collection.binaryIndices[property] && indexedOps[operator]) {
        // this is where our lazy index rebuilding will take place
        // basically we will leave all indexes dirty until we need them
        // so here we will rebuild only the index tied to this property
        // ensureIndex() will only rebuild if flagged as dirty since we are not passing force=true param
        if (this.collection.adaptiveBinaryIndices !== true) {
          this.collection.ensureIndex(property);
        }

        searchByIndex = true;
        index = this.collection.binaryIndices[property];
      }

      // the comparison function
      var fun = LokiOps[operator];

      // "shortcut" for collection data
      var t = this.collection.data;
      // filter data length
      var i = 0,
        len = 0;

      // Query executed differently depending on :
      //    - whether the property being queried has an index defined
      //    - if chained, we handle first pass differently for initial filteredrows[] population
      //
      // For performance reasons, each case has its own if block to minimize in-loop calculations

      var filter, rowIdx = 0;

      // If the filteredrows[] is already initialized, use it
      if (this.filterInitialized) {
        filter = this.filteredrows;
        len = filter.length;

        // currently supporting dot notation for non-indexed conditions only
        if (usingDotNotation) {
          property = property.split('.');
          for(i=0; i<len; i++) {
            rowIdx = filter[i];
            if (dotSubScan(t[rowIdx], property, fun, value)) {
              result.push(rowIdx);
            }
          }
        } else {
          for(i=0; i<len; i++) {
            rowIdx = filter[i];
            if (fun(t[rowIdx][property], value)) {
              result.push(rowIdx);
            }
          }
        }
      }
      // first chained query so work against data[] but put results in filteredrows
      else {
        // if not searching by index
        if (!searchByIndex) {
          len = t.length;

          if (usingDotNotation) {
            property = property.split('.');
            for(i=0; i<len; i++) {
              if (dotSubScan(t[i], property, fun, value)) {
                result.push(i);
                if (firstOnly) {
                  this.filteredrows = result;
                  this.filterInitialized = true;
                  return this;
                }
              }
            }
          } else {
            for(i=0; i<len; i++) {
              if (fun(t[i][property], value)) {
                result.push(i);
                if (firstOnly) {
                  this.filteredrows = result;
                  this.filterInitialized = true;
                  return this;
                }
              }
            }
          }
        } else {
          // search by index
          var segm = this.collection.calculateRange(operator, property, value);

          if (operator !== '$in') {
            for (i = segm[0]; i <= segm[1]; i++) {
              if (indexedOps[operator] !== true) {
                // must be a function, implying 2nd phase filtering of results from calculateRange
                if (indexedOps[operator](t[index.values[i]][property], value)) {
                  result.push(index.values[i]);
                  if (firstOnly) {
                    this.filteredrows = result;
                    this.filterInitialized = true;
                    return this;
                  }
                }
              }
              else {
                  result.push(index.values[i]);
                  if (firstOnly) {
                    this.filteredrows = result;
                    this.filterInitialized = true;
                    return this;
                  }
              }
            }
          } else {
            for (i = 0, len = segm.length; i < len; i++) {
              result.push(index.values[segm[i]]);
              if (firstOnly) {
                this.filteredrows = result;
                this.filterInitialized = true;
                return this;
              }
            }
          }
        }

      }

      this.filteredrows = result;
      this.filterInitialized = true; // next time work against filteredrows[]
      return this;
    };


    /**
     * where() - Used for filtering via a javascript filter function.
     *
     * @param {function} fun - A javascript function used for filtering current results by.
     * @returns {Resultset} this resultset for further chain ops.
     * @memberof Resultset
     * @example
     * var over30 = users.chain().where(function(obj) { return obj.age >= 30; }.data();
     */
    Resultset.prototype.where = function (fun) {
      var viewFunction,
        result = [];

      if ('function' === typeof fun) {
        viewFunction = fun;
      } else {
        throw new TypeError('Argument is not a stored view or a function');
      }
      try {
        // If the filteredrows[] is already initialized, use it
        if (this.filterInitialized) {
          var j = this.filteredrows.length;

          while (j--) {
            if (viewFunction(this.collection.data[this.filteredrows[j]]) === true) {
              result.push(this.filteredrows[j]);
            }
          }

          this.filteredrows = result;

          return this;
        }
        // otherwise this is initial chained op, work against data, push into filteredrows[]
        else {
          var k = this.collection.data.length;

          while (k--) {
            if (viewFunction(this.collection.data[k]) === true) {
              result.push(k);
            }
          }

          this.filteredrows = result;
          this.filterInitialized = true;

          return this;
        }
      } catch (err) {
        throw err;
      }
    };

    /**
     * count() - returns the number of documents in the resultset.
     *
     * @returns {number} The number of documents in the resultset.
     * @memberof Resultset
     * @example
     * var over30Count = users.chain().find({ age: { $gte: 30 } }).count();
     */
    Resultset.prototype.count = function () {
      if (this.filterInitialized) {
        return this.filteredrows.length;
      }
      return this.collection.count();
    };

    /**
     * Terminates the chain and returns array of filtered documents
     *
     * @param {object=} options - allows specifying 'forceClones' and 'forceCloneMethod' options.
     * @param {boolean} options.forceClones - Allows forcing the return of cloned objects even when
     *        the collection is not configured for clone object.
     * @param {string} options.forceCloneMethod - Allows overriding the default or collection specified cloning method.
     *        Possible values include 'parse-stringify', 'jquery-extend-deep', 'shallow', 'shallow-assign'
     * @param {bool} options.removeMeta - Will force clones and strip $loki and meta properties from documents
     *
     * @returns {array} Array of documents in the resultset
     * @memberof Resultset
     * @example
     * var resutls = users.chain().find({ age: 34 }).data();
     */
    Resultset.prototype.data = function (options) {
      var result = [],
        data = this.collection.data,
        obj,
        len,
        i,
        method;

      options = options || {};

      // if user opts to strip meta, then force clones and use 'shallow' if 'force' options are not present
      if (options.removeMeta && !options.forceClones) {
        options.forceClones = true;
        options.forceCloneMethod = options.forceCloneMethod || 'shallow';
      }

      // if collection has delta changes active, then force clones and use 'parse-stringify' for effective change tracking of nested objects
      if (!this.collection.disableDeltaChangesApi) {
        options.forceClones = true;
        options.forceCloneMethod = 'parse-stringify';
      }

      // if this has no filters applied, just return collection.data
      if (!this.filterInitialized) {
        if (this.filteredrows.length === 0) {
          // determine whether we need to clone objects or not
          if (this.collection.cloneObjects || options.forceClones) {
            len = data.length;
            method = options.forceCloneMethod || this.collection.cloneMethod;

            for (i = 0; i < len; i++) {
              obj = clone(data[i], method);
              if (options.removeMeta) {
                delete obj.$loki;
                delete obj.meta;
              }
              result.push(obj);
            }
            return result;
          }
          // otherwise we are not cloning so return sliced array with same object references
          else {
            return data.slice();
          }
        } else {
          // filteredrows must have been set manually, so use it
          this.filterInitialized = true;
        }
      }

      var fr = this.filteredrows;
      len = fr.length;

      if (this.collection.cloneObjects || options.forceClones) {
        method = options.forceCloneMethod || this.collection.cloneMethod;
        for (i = 0; i < len; i++) {
          obj = clone(data[fr[i]], method);
          if (options.removeMeta) {
            delete obj.$loki;
            delete obj.meta;
          }
          result.push(obj);
        }
      } else {
        for (i = 0; i < len; i++) {
          result.push(data[fr[i]]);
        }
      }
      return result;
    };

    /**
     * Used to run an update operation on all documents currently in the resultset.
     *
     * @param {function} updateFunction - User supplied updateFunction(obj) will be executed for each document object.
     * @returns {Resultset} this resultset for further chain ops.
     * @memberof Resultset
     * @example
     * users.chain().find({ country: 'de' }).update(function(user) {
     *   user.phoneFormat = "+49 AAAA BBBBBB";
     * });
     */
    Resultset.prototype.update = function (updateFunction) {

      if (typeof (updateFunction) !== "function") {
        throw new TypeError('Argument is not a function');
      }

      // if this has no filters applied, we need to populate filteredrows first
      if (!this.filterInitialized && this.filteredrows.length === 0) {
        this.filteredrows = this.collection.prepareFullDocIndex();
      }

      var obj, len = this.filteredrows.length,
        rcd = this.collection.data;

      // pass in each document object currently in resultset to user supplied updateFunction
      for (var idx = 0; idx < len; idx++) {
        // if we have cloning option specified or are doing differential delta changes, clone object first
        if (this.collection.cloneObjects || !this.collection.disableDeltaChangesApi) {
          obj = clone(rcd[this.filteredrows[idx]], this.collection.cloneMethod);
          updateFunction(obj);
          this.collection.update(obj);
        }
        else {
          // no need to clone, so just perform update on collection data object instance
          updateFunction(rcd[this.filteredrows[idx]]);
          this.collection.update(rcd[this.filteredrows[idx]]);
        }
      }

      return this;
    };

    /**
     * Removes all document objects which are currently in resultset from collection (as well as resultset)
     *
     * @returns {Resultset} this (empty) resultset for further chain ops.
     * @memberof Resultset
     * @example
     * // remove users inactive since 1/1/2001
     * users.chain().find({ lastActive: { $lte: new Date("1/1/2001").getTime() } }).remove();
     */
    Resultset.prototype.remove = function () {

      // if this has no filters applied, we need to populate filteredrows first
      if (!this.filterInitialized && this.filteredrows.length === 0) {
        this.filteredrows = this.collection.prepareFullDocIndex();
      }

      this.collection.removeBatchByPositions(this.filteredrows);

      this.filteredrows = [];

      return this;
    };

    /**
     * data transformation via user supplied functions
     *
     * @param {function} mapFunction - this function accepts a single document for you to transform and return
     * @param {function} reduceFunction - this function accepts many (array of map outputs) and returns single value
     * @returns {value} The output of your reduceFunction
     * @memberof Resultset
     * @example
     * var db = new loki("order.db");
     * var orders = db.addCollection("orders");
     * orders.insert([{ qty: 4, unitCost: 100.00 }, { qty: 10, unitCost: 999.99 }, { qty: 2, unitCost: 49.99 }]);
     *
     * function mapfun (obj) { return obj.qty*obj.unitCost };
     * function reducefun(array) {
     *   var grandTotal=0;
     *   array.forEach(function(orderTotal) { grandTotal += orderTotal; });
     *   return grandTotal;
     * }
     * var grandOrderTotal = orders.chain().mapReduce(mapfun, reducefun);
     * console.log(grandOrderTotal);
     */
    Resultset.prototype.mapReduce = function (mapFunction, reduceFunction) {
      try {
        return reduceFunction(this.data().map(mapFunction));
      } catch (err) {
        throw err;
      }
    };

    /**
     * eqJoin() - Left joining two sets of data. Join keys can be defined or calculated properties
     * eqJoin expects the right join key values to be unique.  Otherwise left data will be joined on the last joinData object with that key
     * @param {Array|Resultset|Collection} joinData - Data array to join to.
     * @param {(string|function)} leftJoinKey - Property name in this result set to join on or a function to produce a value to join on
     * @param {(string|function)} rightJoinKey - Property name in the joinData to join on or a function to produce a value to join on
     * @param {function=} mapFun - (Optional) A function that receives each matching pair and maps them into output objects - function(left,right){return joinedObject}
     * @param {object=} dataOptions - options to data() before input to your map function
     * @param {bool} dataOptions.removeMeta - allows removing meta before calling mapFun
     * @param {boolean} dataOptions.forceClones - forcing the return of cloned objects to your map object
     * @param {string} dataOptions.forceCloneMethod - Allows overriding the default or collection specified cloning method.
     * @returns {Resultset} A resultset with data in the format [{left: leftObj, right: rightObj}]
     * @memberof Resultset
     * @example
     * var db = new loki('sandbox.db');
     *
     * var products = db.addCollection('products');
     * var orders = db.addCollection('orders');
     *
     * products.insert({ productId: "100234", name: "flywheel energy storage", unitCost: 19999.99 });
     * products.insert({ productId: "140491", name: "300F super capacitor", unitCost: 129.99 });
     * products.insert({ productId: "271941", name: "fuel cell", unitCost: 3999.99 });
     * products.insert({ productId: "174592", name: "390V 3AH lithium bank", unitCost: 4999.99 });
     *
     * orders.insert({ orderDate : new Date("12/1/2017").getTime(), prodId: "174592", qty: 2, customerId: 2 });
     * orders.insert({ orderDate : new Date("4/15/2016").getTime(), prodId: "271941", qty: 1, customerId: 1 });
     * orders.insert({ orderDate : new Date("3/12/2017").getTime(), prodId: "140491", qty: 4, customerId: 4 });
     * orders.insert({ orderDate : new Date("7/31/2017").getTime(), prodId: "100234", qty: 7, customerId: 3 });
     * orders.insert({ orderDate : new Date("8/3/2016").getTime(), prodId: "174592", qty: 3, customerId: 5 });
     *
     * var mapfun = function(left, right) {
     *   return {
     *     orderId: left.$loki,
     *     orderDate: new Date(left.orderDate) + '',
     *     customerId: left.customerId,
     *     qty: left.qty,
     *     productId: left.prodId,
     *     prodName: right.name,
     *     prodCost: right.unitCost,
     *     orderTotal: +((right.unitCost * left.qty).toFixed(2))
     *   };
     * };
     *
     * // join orders with relevant product info via eqJoin
     * var orderSummary = orders.chain().eqJoin(products, "prodId", "productId", mapfun).data();
     * 
     * console.log(orderSummary);     
     */
    Resultset.prototype.eqJoin = function (joinData, leftJoinKey, rightJoinKey, mapFun, dataOptions) {

      var leftData = [],
        leftDataLength,
        rightData = [],
        rightDataLength,
        key,
        result = [],
        leftKeyisFunction = typeof leftJoinKey === 'function',
        rightKeyisFunction = typeof rightJoinKey === 'function',
        joinMap = {};

      //get the left data
      leftData = this.data(dataOptions);
      leftDataLength = leftData.length;

      //get the right data
      if (joinData instanceof Collection) {
        rightData = joinData.chain().data(dataOptions);
      } else if (joinData instanceof Resultset) {
        rightData = joinData.data(dataOptions);
      } else if (Array.isArray(joinData)) {
        rightData = joinData;
      } else {
        throw new TypeError('joinData needs to be an array or result set');
      }
      rightDataLength = rightData.length;

      //construct a lookup table

      for (var i = 0; i < rightDataLength; i++) {
        key = rightKeyisFunction ? rightJoinKey(rightData[i]) : rightData[i][rightJoinKey];
        joinMap[key] = rightData[i];
      }

      if (!mapFun) {
        mapFun = function (left, right) {
          return {
            left: left,
            right: right
          };
        };
      }

      //Run map function over each object in the resultset
      for (var j = 0; j < leftDataLength; j++) {
        key = leftKeyisFunction ? leftJoinKey(leftData[j]) : leftData[j][leftJoinKey];
        result.push(mapFun(leftData[j], joinMap[key] || {}));
      }

      //return return a new resultset with no filters
      this.collection = new Collection('joinData');
      this.collection.insert(result);
      this.filteredrows = [];
      this.filterInitialized = false;

      return this;
    };

    /**
     * Applies a map function into a new collection for further chaining.
     * @param {function} mapFun - javascript map function
     * @param {object=} dataOptions - options to data() before input to your map function
     * @param {bool} dataOptions.removeMeta - allows removing meta before calling mapFun
     * @param {boolean} dataOptions.forceClones - forcing the return of cloned objects to your map object
     * @param {string} dataOptions.forceCloneMethod - Allows overriding the default or collection specified cloning method.
     * @memberof Resultset
     * @example
     * var orders.chain().find({ productId: 32 }).map(function(obj) {
     *   return {
     *     orderId: $loki,
     *     productId: productId,
     *     quantity: qty
     *   };
     * });
     */
    Resultset.prototype.map = function (mapFun, dataOptions) {
      var data = this.data(dataOptions).map(mapFun);
      //return return a new resultset with no filters
      this.collection = new Collection('mappedData');
      this.collection.insert(data);
      this.filteredrows = [];
      this.filterInitialized = false;

      return this;
    };

    /**
     * DynamicView class is a versatile 'live' view class which can have filters and sorts applied.
     *    Collection.addDynamicView(name) instantiates this DynamicView object and notifies it
     *    whenever documents are add/updated/removed so it can remain up-to-date. (chainable)
     *
     * @example
     * var mydv = mycollection.addDynamicView('test');  // default is non-persistent
     * mydv.applyFind({ 'doors' : 4 });
     * mydv.applyWhere(function(obj) { return obj.name === 'Toyota'; });
     * var results = mydv.data();
     *
     * @constructor DynamicView
     * @implements LokiEventEmitter
     * @param {Collection} collection - A reference to the collection to work against
     * @param {string} name - The name of this dynamic view
     * @param {object=} options - (Optional) Pass in object with 'persistent' and/or 'sortPriority' options.
     * @param {boolean} [options.persistent=false] - indicates if view is to main internal results array in 'resultdata'
     * @param {string} [options.sortPriority='passive'] - 'passive' (sorts performed on call to data) or 'active' (after updates)
     * @param {number} options.minRebuildInterval - minimum rebuild interval (need clarification to docs here)
     * @see {@link Collection#addDynamicView} to construct instances of DynamicView
     */
    function DynamicView(collection, name, options) {
      this.collection = collection;
      this.name = name;
      this.rebuildPending = false;
      this.options = options || {};

      if (!this.options.hasOwnProperty('persistent')) {
        this.options.persistent = false;
      }

      // 'persistentSortPriority':
      // 'passive' will defer the sort phase until they call data(). (most efficient overall)
      // 'active' will sort async whenever next idle. (prioritizes read speeds)
      if (!this.options.hasOwnProperty('sortPriority')) {
        this.options.sortPriority = 'passive';
      }

      if (!this.options.hasOwnProperty('minRebuildInterval')) {
        this.options.minRebuildInterval = 1;
      }

      this.resultset = new Resultset(collection);
      this.resultdata = [];
      this.resultsdirty = false;

      this.cachedresultset = null;

      // keep ordered filter pipeline
      this.filterPipeline = [];

      // sorting member variables
      // we only support one active search, applied using applySort() or applySimpleSort()
      this.sortFunction = null;
      this.sortCriteria = null;
      this.sortCriteriaSimple = null;
      this.sortDirty = false;

      // for now just have 1 event for when we finally rebuilt lazy view
      // once we refactor transactions, i will tie in certain transactional events

      this.events = {
        'rebuild': []
      };
    }

    DynamicView.prototype = new LokiEventEmitter();


    /**
     * rematerialize() - internally used immediately after deserialization (loading)
     *    This will clear out and reapply filterPipeline ops, recreating the view.
     *    Since where filters do not persist correctly, this method allows
     *    restoring the view to state where user can re-apply those where filters.
     *
     * @param {Object=} options - (Optional) allows specification of 'removeWhereFilters' option
     * @returns {DynamicView} This dynamic view for further chained ops.
     * @memberof DynamicView
     * @fires DynamicView.rebuild
     */
    DynamicView.prototype.rematerialize = function (options) {
      var fpl,
        fpi,
        idx;

      options = options || {};

      this.resultdata = [];
      this.resultsdirty = true;
      this.resultset = new Resultset(this.collection);

      if (this.sortFunction || this.sortCriteria || this.sortCriteriaSimple) {
        this.sortDirty = true;
      }

      if (options.hasOwnProperty('removeWhereFilters')) {
        // for each view see if it had any where filters applied... since they don't
        // serialize those functions lets remove those invalid filters
        fpl = this.filterPipeline.length;
        fpi = fpl;
        while (fpi--) {
          if (this.filterPipeline[fpi].type === 'where') {
            if (fpi !== this.filterPipeline.length - 1) {
              this.filterPipeline[fpi] = this.filterPipeline[this.filterPipeline.length - 1];
            }

            this.filterPipeline.length--;
          }
        }
      }

      // back up old filter pipeline, clear filter pipeline, and reapply pipeline ops
      var ofp = this.filterPipeline;
      this.filterPipeline = [];

      // now re-apply 'find' filterPipeline ops
      fpl = ofp.length;
      for (idx = 0; idx < fpl; idx++) {
        this.applyFind(ofp[idx].val);
      }

      // during creation of unit tests, i will remove this forced refresh and leave lazy
      this.data();

      // emit rebuild event in case user wants to be notified
      this.emit('rebuild', this);

      return this;
    };

    /**
     * branchResultset() - Makes a copy of the internal resultset for branched queries.
     *    Unlike this dynamic view, the branched resultset will not be 'live' updated,
     *    so your branched query should be immediately resolved and not held for future evaluation.
     *
     * @param {(string|array=)} transform - Optional name of collection transform, or an array of transform steps
     * @param {object=} parameters - optional parameters (if optional transform requires them)
     * @returns {Resultset} A copy of the internal resultset for branched queries.
     * @memberof DynamicView
     * @example
     * var db = new loki('test');
     * var coll = db.addCollection('mydocs');
     * var dv = coll.addDynamicView('myview');
     * var tx = [
     *   {
     *     type: 'offset',
     *     value: '[%lktxp]pageStart'
     *   },
     *   {
     *     type: 'limit',
     *     value: '[%lktxp]pageSize'
     *   }
     * ];
     * coll.addTransform('viewPaging', tx);
     * 
     * // add some records
     * 
     * var results = dv.branchResultset('viewPaging', { pageStart: 10, pageSize: 10 }).data();     
     */
    DynamicView.prototype.branchResultset = function (transform, parameters) {
      var rs = this.resultset.branch();

      if (typeof transform === 'undefined') {
        return rs;
      }

      return rs.transform(transform, parameters);
    };

    /**
     * toJSON() - Override of toJSON to avoid circular references
     *
     */
    DynamicView.prototype.toJSON = function () {
      var copy = new DynamicView(this.collection, this.name, this.options);

      copy.resultset = this.resultset;
      copy.resultdata = []; // let's not save data (copy) to minimize size
      copy.resultsdirty = true;
      copy.filterPipeline = this.filterPipeline;
      copy.sortFunction = this.sortFunction;
      copy.sortCriteria = this.sortCriteria;
      copy.sortCriteriaSimple = this.sortCriteriaSimple || null;
      copy.sortDirty = this.sortDirty;

      // avoid circular reference, reapply in db.loadJSON()
      copy.collection = null;

      return copy;
    };

    /**
     * removeFilters() - Used to clear pipeline and reset dynamic view to initial state.
     *     Existing options should be retained.
     * @param {object=} options - configure removeFilter behavior
     * @param {boolean=} options.queueSortPhase - (default: false) if true we will async rebuild view (maybe set default to true in future?)
     * @memberof DynamicView
     */
    DynamicView.prototype.removeFilters = function (options) {
      options = options || {};

      this.rebuildPending = false;
      this.resultset.reset();
      this.resultdata = [];
      this.resultsdirty = true;

      this.cachedresultset = null;

      // keep ordered filter pipeline
      this.filterPipeline = [];

      // sorting member variables
      // we only support one active search, applied using applySort() or applySimpleSort()
      this.sortFunction = null;
      this.sortCriteria = null;
      this.sortCriteriaSimple = null;
      this.sortDirty = false;

      if (options.queueSortPhase === true) {
        this.queueSortPhase();
      }
    };

    /**
     * applySort() - Used to apply a sort to the dynamic view
     * @example
     * dv.applySort(function(obj1, obj2) {
     *   if (obj1.name === obj2.name) return 0;
     *   if (obj1.name > obj2.name) return 1;
     *   if (obj1.name < obj2.name) return -1;
     * });
     *
     * @param {function} comparefun - a javascript compare function used for sorting
     * @returns {DynamicView} this DynamicView object, for further chain ops.
     * @memberof DynamicView
     */
    DynamicView.prototype.applySort = function (comparefun) {
      this.sortFunction = comparefun;
      this.sortCriteria = null;
      this.sortCriteriaSimple = null;

      this.queueSortPhase();

      return this;
    };

    /**
     * applySimpleSort() - Used to specify a property used for view translation.
     * @example
     * dv.applySimpleSort("name");
     *
     * @param {string} propname - Name of property by which to sort.
     * @param {object|boolean=} options - boolean for sort descending or options object
     * @param {boolean} [options.desc=false] - whether we should sort descending.
     * @param {boolean} [options.disableIndexIntersect=false] - whether we should explicity not use array intersection.
     * @param {boolean} [options.forceIndexIntersect=false] - force array intersection (if binary index exists).
     * @param {boolean} [options.useJavascriptSorting=false] - whether results are sorted via basic javascript sort.
     * @returns {DynamicView} this DynamicView object, for further chain ops.
     * @memberof DynamicView
     */
    DynamicView.prototype.applySimpleSort = function (propname, options) {
      this.sortCriteriaSimple = { propname: propname, options: options || false };
      this.sortCriteria = null;
      this.sortFunction = null;

      this.queueSortPhase();

      return this;
    };

    /**
     * applySortCriteria() - Allows sorting a resultset based on multiple columns.
     * @example
     * // to sort by age and then name (both ascending)
     * dv.applySortCriteria(['age', 'name']);
     * // to sort by age (ascending) and then by name (descending)
     * dv.applySortCriteria(['age', ['name', true]);
     * // to sort by age (descending) and then by name (descending)
     * dv.applySortCriteria(['age', true], ['name', true]);
     *
     * @param {array} properties - array of property names or subarray of [propertyname, isdesc] used evaluate sort order
     * @returns {DynamicView} Reference to this DynamicView, sorted, for future chain operations.
     * @memberof DynamicView
     */
    DynamicView.prototype.applySortCriteria = function (criteria) {
      this.sortCriteria = criteria;
      this.sortCriteriaSimple = null;
      this.sortFunction = null;

      this.queueSortPhase();

      return this;
    };

    /**
     * startTransaction() - marks the beginning of a transaction.
     *
     * @returns {DynamicView} this DynamicView object, for further chain ops.
     */
    DynamicView.prototype.startTransaction = function () {
      this.cachedresultset = this.resultset.copy();

      return this;
    };

    /**
     * commit() - commits a transaction.
     *
     * @returns {DynamicView} this DynamicView object, for further chain ops.
     */
    DynamicView.prototype.commit = function () {
      this.cachedresultset = null;

      return this;
    };

    /**
     * rollback() - rolls back a transaction.
     *
     * @returns {DynamicView} this DynamicView object, for further chain ops.
     */
    DynamicView.prototype.rollback = function () {
      this.resultset = this.cachedresultset;

      if (this.options.persistent) {
        // for now just rebuild the persistent dynamic view data in this worst case scenario
        // (a persistent view utilizing transactions which get rolled back), we already know the filter so not too bad.
        this.resultdata = this.resultset.data();

        this.emit('rebuild', this);
      }

      return this;
    };


    /**
     * Implementation detail.
     * _indexOfFilterWithId() - Find the index of a filter in the pipeline, by that filter's ID.
     *
     * @param {(string|number)} uid - The unique ID of the filter.
     * @returns {number}: index of the referenced filter in the pipeline; -1 if not found.
     */
    DynamicView.prototype._indexOfFilterWithId = function (uid) {
      if (typeof uid === 'string' || typeof uid === 'number') {
        for (var idx = 0, len = this.filterPipeline.length; idx < len; idx += 1) {
          if (uid === this.filterPipeline[idx].uid) {
            return idx;
          }
        }
      }
      return -1;
    };

    /**
     * Implementation detail.
     * _addFilter() - Add the filter object to the end of view's filter pipeline and apply the filter to the resultset.
     *
     * @param {object} filter - The filter object. Refer to applyFilter() for extra details.
     */
    DynamicView.prototype._addFilter = function (filter) {
      this.filterPipeline.push(filter);
      this.resultset[filter.type](filter.val);
    };

    /**
     * reapplyFilters() - Reapply all the filters in the current pipeline.
     *
     * @returns {DynamicView} this DynamicView object, for further chain ops.
     */
    DynamicView.prototype.reapplyFilters = function () {
      this.resultset.reset();

      this.cachedresultset = null;
      if (this.options.persistent) {
        this.resultdata = [];
        this.resultsdirty = true;
      }

      var filters = this.filterPipeline;
      this.filterPipeline = [];

      for (var idx = 0, len = filters.length; idx < len; idx += 1) {
        this._addFilter(filters[idx]);
      }

      if (this.sortFunction || this.sortCriteria || this.sortCriteriaSimple) {
        this.queueSortPhase();
      } else {
        this.queueRebuildEvent();
      }

      return this;
    };

    /**
     * applyFilter() - Adds or updates a filter in the DynamicView filter pipeline
     *
     * @param {object} filter - A filter object to add to the pipeline.
     *    The object is in the format { 'type': filter_type, 'val', filter_param, 'uid', optional_filter_id }
     * @returns {DynamicView} this DynamicView object, for further chain ops.
     * @memberof DynamicView
     */
    DynamicView.prototype.applyFilter = function (filter) {
      var idx = this._indexOfFilterWithId(filter.uid);
      if (idx >= 0) {
        this.filterPipeline[idx] = filter;
        return this.reapplyFilters();
      }

      this.cachedresultset = null;
      if (this.options.persistent) {
        this.resultdata = [];
        this.resultsdirty = true;
      }

      this._addFilter(filter);

      if (this.sortFunction || this.sortCriteria || this.sortCriteriaSimple) {
        this.queueSortPhase();
      } else {
        this.queueRebuildEvent();
      }

      return this;
    };

    /**
     * applyFind() - Adds or updates a mongo-style query option in the DynamicView filter pipeline
     *
     * @param {object} query - A mongo-style query object to apply to pipeline
     * @param {(string|number)=} uid - Optional: The unique ID of this filter, to reference it in the future.
     * @returns {DynamicView} this DynamicView object, for further chain ops.
     * @memberof DynamicView
     */
    DynamicView.prototype.applyFind = function (query, uid) {
      this.applyFilter({
        type: 'find',
        val: query,
        uid: uid
      });
      return this;
    };

    /**
     * applyWhere() - Adds or updates a javascript filter function in the DynamicView filter pipeline
     *
     * @param {function} fun - A javascript filter function to apply to pipeline
     * @param {(string|number)=} uid - Optional: The unique ID of this filter, to reference it in the future.
     * @returns {DynamicView} this DynamicView object, for further chain ops.
     * @memberof DynamicView
     */
    DynamicView.prototype.applyWhere = function (fun, uid) {
      this.applyFilter({
        type: 'where',
        val: fun,
        uid: uid
      });
      return this;
    };

    /**
     * removeFilter() - Remove the specified filter from the DynamicView filter pipeline
     *
     * @param {(string|number)} uid - The unique ID of the filter to be removed.
     * @returns {DynamicView} this DynamicView object, for further chain ops.
     * @memberof DynamicView
     */
    DynamicView.prototype.removeFilter = function (uid) {
      var idx = this._indexOfFilterWithId(uid);
      if (idx < 0) {
        throw new Error("Dynamic view does not contain a filter with ID: " + uid);
      }

      this.filterPipeline.splice(idx, 1);
      this.reapplyFilters();
      return this;
    };

    /**
     * count() - returns the number of documents representing the current DynamicView contents.
     *
     * @returns {number} The number of documents representing the current DynamicView contents.
     * @memberof DynamicView
     */
    DynamicView.prototype.count = function () {
      // in order to be accurate we will pay the minimum cost (and not alter dv state management)
      // recurring resultset data resolutions should know internally its already up to date.
      // for persistent data this will not update resultdata nor fire rebuild event.
      if (this.resultsdirty) {
        this.resultdata = this.resultset.data();
      }

      return this.resultset.count();
    };

    /**
     * data() - resolves and pending filtering and sorting, then returns document array as result.
     *
     * @param {object=} options - optional parameters to pass to resultset.data() if non-persistent
     * @param {boolean} options.forceClones - Allows forcing the return of cloned objects even when
     *        the collection is not configured for clone object.
     * @param {string} options.forceCloneMethod - Allows overriding the default or collection specified cloning method.
     *        Possible values include 'parse-stringify', 'jquery-extend-deep', 'shallow', 'shallow-assign'
     * @param {bool} options.removeMeta - Will force clones and strip $loki and meta properties from documents
     * @returns {array} An array of documents representing the current DynamicView contents.
     * @memberof DynamicView
     */
    DynamicView.prototype.data = function (options) {
      // using final sort phase as 'catch all' for a few use cases which require full rebuild
      if (this.sortDirty || this.resultsdirty) {
        this.performSortPhase({
          suppressRebuildEvent: true
        });
      }
      return (this.options.persistent) ? (this.resultdata) : (this.resultset.data(options));
    };

    /**
     * queueRebuildEvent() - When the view is not sorted we may still wish to be notified of rebuild events.
     *     This event will throttle and queue a single rebuild event when batches of updates affect the view.
     */
    DynamicView.prototype.queueRebuildEvent = function () {
      if (this.rebuildPending) {
        return;
      }
      this.rebuildPending = true;

      var self = this;
      setTimeout(function () {
        if (self.rebuildPending) {
          self.rebuildPending = false;
          self.emit('rebuild', self);
        }
      }, this.options.minRebuildInterval);
    };

    /**
     * queueSortPhase : If the view is sorted we will throttle sorting to either :
     *    (1) passive - when the user calls data(), or
     *    (2) active - once they stop updating and yield js thread control
     */
    DynamicView.prototype.queueSortPhase = function () {
      // already queued? exit without queuing again
      if (this.sortDirty) {
        return;
      }
      this.sortDirty = true;

      var self = this;
      if (this.options.sortPriority === "active") {
        // active sorting... once they are done and yield js thread, run async performSortPhase()
        setTimeout(function () {
          self.performSortPhase();
        }, this.options.minRebuildInterval);
      } else {
        // must be passive sorting... since not calling performSortPhase (until data call), lets use queueRebuildEvent to
        // potentially notify user that data has changed.
        this.queueRebuildEvent();
      }
    };

    /**
     * performSortPhase() - invoked synchronously or asynchronously to perform final sort phase (if needed)
     *
     */
    DynamicView.prototype.performSortPhase = function (options) {
      // async call to this may have been pre-empted by synchronous call to data before async could fire
      if (!this.sortDirty && !this.resultsdirty) {
        return;
      }

      options = options || {};

      if (this.sortDirty) {
        if (this.sortFunction) {
          this.resultset.sort(this.sortFunction);
        } else if (this.sortCriteria) {
          this.resultset.compoundsort(this.sortCriteria);
        } else if (this.sortCriteriaSimple) {
          this.resultset.simplesort(this.sortCriteriaSimple.propname, this.sortCriteriaSimple.options);
        }

        this.sortDirty = false;
      }

      if (this.options.persistent) {
        // persistent view, rebuild local resultdata array
        this.resultdata = this.resultset.data();
        this.resultsdirty = false;
      }

      if (!options.suppressRebuildEvent) {
        this.emit('rebuild', this);
      }
    };

    /**
     * evaluateDocument() - internal method for (re)evaluating document inclusion.
     *    Called by : collection.insert() and collection.update().
     *
     * @param {int} objIndex - index of document to (re)run through filter pipeline.
     * @param {bool} isNew - true if the document was just added to the collection.
     */
    DynamicView.prototype.evaluateDocument = function (objIndex, isNew) {
      // if no filter applied yet, the result 'set' should remain 'everything'
      if (!this.resultset.filterInitialized) {
        if (this.options.persistent) {
          this.resultdata = this.resultset.data();
        }
        // need to re-sort to sort new document
        if (this.sortFunction || this.sortCriteria || this.sortCriteriaSimple) {
          this.queueSortPhase();
        } else {
          this.queueRebuildEvent();
        }
        return;
      }

      var ofr = this.resultset.filteredrows;
      var oldPos = (isNew) ? (-1) : (ofr.indexOf(+objIndex));
      var oldlen = ofr.length;

      // creating a 1-element resultset to run filter chain ops on to see if that doc passes filters;
      // mostly efficient algorithm, slight stack overhead price (this function is called on inserts and updates)
      var evalResultset = new Resultset(this.collection);
      evalResultset.filteredrows = [objIndex];
      evalResultset.filterInitialized = true;
      var filter;
      for (var idx = 0, len = this.filterPipeline.length; idx < len; idx++) {
        filter = this.filterPipeline[idx];
        evalResultset[filter.type](filter.val);
      }

      // not a true position, but -1 if not pass our filter(s), 0 if passed filter(s)
      var newPos = (evalResultset.filteredrows.length === 0) ? -1 : 0;

      // wasn't in old, shouldn't be now... do nothing
      if (oldPos === -1 && newPos === -1) return;

      // wasn't in resultset, should be now... add
      if (oldPos === -1 && newPos !== -1) {
        ofr.push(objIndex);

        if (this.options.persistent) {
          this.resultdata.push(this.collection.data[objIndex]);
        }

        // need to re-sort to sort new document
        if (this.sortFunction || this.sortCriteria || this.sortCriteriaSimple) {
          this.queueSortPhase();
        } else {
          this.queueRebuildEvent();
        }

        return;
      }

      // was in resultset, shouldn't be now... delete
      if (oldPos !== -1 && newPos === -1) {
        if (oldPos < oldlen - 1) {
          ofr.splice(oldPos, 1);

          if (this.options.persistent) {
            this.resultdata.splice(oldPos, 1);
          }
        } else {
          ofr.length = oldlen - 1;

          if (this.options.persistent) {
            this.resultdata.length = oldlen - 1;
          }
        }

        // in case changes to data altered a sort column
        if (this.sortFunction || this.sortCriteria || this.sortCriteriaSimple) {
          this.queueSortPhase();
        } else {
          this.queueRebuildEvent();
        }

        return;
      }

      // was in resultset, should still be now... (update persistent only?)
      if (oldPos !== -1 && newPos !== -1) {
        if (this.options.persistent) {
          // in case document changed, replace persistent view data with the latest collection.data document
          this.resultdata[oldPos] = this.collection.data[objIndex];
        }

        // in case changes to data altered a sort column
        if (this.sortFunction || this.sortCriteria || this.sortCriteriaSimple) {
          this.queueSortPhase();
        } else {
          this.queueRebuildEvent();
        }

        return;
      }
    };

    /**
     * removeDocument() - internal function called on collection.delete()
     * @param {number|number[]} objIndex - index of document to (re)run through filter pipeline.
     */
    DynamicView.prototype.removeDocument = function (objIndex) {
      var idx, rmidx, rmlen, rxo = {}, fxo = {};
      var adjels = [];
      var drs = this.resultset;
      var fr = this.resultset.filteredrows;
      var frlen = fr.length;

      // if no filter applied yet, the result 'set' should remain 'everything'
      if (!this.resultset.filterInitialized) {
        if (this.options.persistent) {
          this.resultdata = this.resultset.data();
        }
        // in case changes to data altered a sort column
        if (this.sortFunction || this.sortCriteria || this.sortCriteriaSimple) {
          this.queueSortPhase();
        } else {
          this.queueRebuildEvent();
        }
        return;
      }

      // if passed single index, wrap in array
      if (!Array.isArray(objIndex)) {
        objIndex = [objIndex];
      }

      rmlen = objIndex.length;
      // create intersection object of data indices to remove
      for(rmidx=0;rmidx<rmlen; rmidx++) {
        rxo[objIndex[rmidx]] = true;
      }

      // pivot remove data indices into remove filteredrows indices and dump in hashobject
      for (idx=0; idx<frlen; idx++) {
        if (rxo[fr[idx]]) fxo[idx] = true;
      }

      // if any of the removed items were in our filteredrows...
      if (Object.keys(fxo).length > 0) {
        // remove them from filtered rows
        this.resultset.filteredrows = this.resultset.filteredrows.filter(function(di, idx) { return !fxo[idx]; });
        // if persistent...
        if (this.options.persistent) {
          // remove from resultdata
          this.resultdata = this.resultdata.filter(function(obj, idx) { return !fxo[idx]; });
        }

        // and queue sorts 
        if (this.sortFunction || this.sortCriteria || this.sortCriteriaSimple) {
          this.queueSortPhase();
        } else {
          this.queueRebuildEvent();
        }
      }

      // to remove holes, we need to 'shift down' indices, this filter function finds number of positions to shift
      var filt = function(idx) { return function(di) { return di < drs.filteredrows[idx]; }; };

      frlen = drs.filteredrows.length;
      for (idx = 0; idx < frlen; idx++) {
        // grab subset of removed elements where data index is less than current filtered row data index;
        // use this to determine how many positions iterated remaining data index needs to be 'shifted down'
        adjels = objIndex.filter(filt(idx));
        drs.filteredrows[idx] -= adjels.length;
      }
    };

    /**
     * mapReduce() - data transformation via user supplied functions
     *
     * @param {function} mapFunction - this function accepts a single document for you to transform and return
     * @param {function} reduceFunction - this function accepts many (array of map outputs) and returns single value
     * @returns The output of your reduceFunction
     * @memberof DynamicView
     */
    DynamicView.prototype.mapReduce = function (mapFunction, reduceFunction) {
      try {
        return reduceFunction(this.data().map(mapFunction));
      } catch (err) {
        throw err;
      }
    };


    /**
     * Collection class that handles documents of same type
     * @constructor Collection
     * @implements LokiEventEmitter
     * @param {string} name - collection name
     * @param {(array|object)=} options - (optional) array of property names to be indicized OR a configuration object
     * @param {array=} [options.unique=[]] - array of property names to define unique constraints for
     * @param {array=} [options.exact=[]] - array of property names to define exact constraints for
     * @param {array=} [options.indices=[]] - array property names to define binary indexes for
     * @param {boolean} [options.adaptiveBinaryIndices=true] - collection indices will be actively rebuilt rather than lazily
     * @param {boolean} [options.asyncListeners=false] - whether listeners are invoked asynchronously
     * @param {boolean} [options.disableMeta=false] - set to true to disable meta property on documents
     * @param {boolean} [options.disableChangesApi=true] - set to false to enable Changes API
     * @param {boolean} [options.disableDeltaChangesApi=true] - set to false to enable Delta Changes API (requires Changes API, forces cloning)
     * @param {boolean} [options.autoupdate=false] - use Object.observe to update objects automatically
     * @param {boolean} [options.clone=false] - specify whether inserts and queries clone to/from user
     * @param {boolean} [options.serializableIndices=true[]] - converts date values on binary indexed properties to epoch time
     * @param {string} [options.cloneMethod='parse-stringify'] - 'parse-stringify', 'jquery-extend-deep', 'shallow', 'shallow-assign'
     * @param {int=} options.ttl - age of document (in ms.) before document is considered aged/stale.
     * @param {int=} options.ttlInterval - time interval for clearing out 'aged' documents; not set by default.
     * @see {@link Loki#addCollection} for normal creation of collections
     */
    function Collection(name, options) {
      // the name of the collection

      this.name = name;
      // the data held by the collection
      this.data = [];
      this.idIndex = []; // index of id
      this.binaryIndices = {}; // user defined indexes
      this.constraints = {
        unique: {},
        exact: {}
      };

      // unique contraints contain duplicate object references, so they are not persisted.
      // we will keep track of properties which have unique contraint applied here, and regenerate on load
      this.uniqueNames = [];

      // transforms will be used to store frequently used query chains as a series of steps
      // which itself can be stored along with the database.
      this.transforms = {};

      // the object type of the collection
      this.objType = name;

      // in autosave scenarios we will use collection level dirty flags to determine whether save is needed.
      // currently, if any collection is dirty we will autosave the whole database if autosave is configured.
      // defaulting to true since this is called from addCollection and adding a collection should trigger save
      this.dirty = true;

      // private holders for cached data
      this.cachedIndex = null;
      this.cachedBinaryIndex = null;
      this.cachedData = null;
      var self = this;

      /* OPTIONS */
      options = options || {};

      // exact match and unique constraints
      if (options.hasOwnProperty('unique')) {
        if (!Array.isArray(options.unique)) {
          options.unique = [options.unique];
        }
        options.unique.forEach(function (prop) {
          self.uniqueNames.push(prop); // used to regenerate on subsequent database loads
          self.constraints.unique[prop] = new UniqueIndex(prop);
        });
      }

      if (options.hasOwnProperty('exact')) {
        options.exact.forEach(function (prop) {
          self.constraints.exact[prop] = new ExactIndex(prop);
        });
      }

      // if set to true we will optimally keep indices 'fresh' during insert/update/remove ops (never dirty/never needs rebuild)
      // if you frequently intersperse insert/update/remove ops between find ops this will likely be significantly faster option.
      this.adaptiveBinaryIndices = options.hasOwnProperty('adaptiveBinaryIndices') ? options.adaptiveBinaryIndices : true;

      // is collection transactional
      this.transactional = options.hasOwnProperty('transactional') ? options.transactional : false;

      // options to clone objects when inserting them
      this.cloneObjects = options.hasOwnProperty('clone') ? options.clone : false;

      // default clone method (if enabled) is parse-stringify
      this.cloneMethod = options.hasOwnProperty('cloneMethod') ? options.cloneMethod : "parse-stringify";

      // option to make event listeners async, default is sync
      this.asyncListeners = options.hasOwnProperty('asyncListeners') ? options.asyncListeners : false;

      // if set to true we will not maintain a meta property for a document
      this.disableMeta = options.hasOwnProperty('disableMeta') ? options.disableMeta : false;

      // disable track changes
      this.disableChangesApi = options.hasOwnProperty('disableChangesApi') ? options.disableChangesApi : true;

      // disable delta update object style on changes
      this.disableDeltaChangesApi = options.hasOwnProperty('disableDeltaChangesApi') ? options.disableDeltaChangesApi : true;
      if (this.disableChangesApi) { this.disableDeltaChangesApi = true; }

      // option to observe objects and update them automatically, ignored if Object.observe is not supported
      this.autoupdate = options.hasOwnProperty('autoupdate') ? options.autoupdate : false;

      // by default, if you insert a document into a collection with binary indices, if those indexed properties contain
      // a DateTime we will convert to epoch time format so that (across serializations) its value position will be the
      // same 'after' serialization as it was 'before'.
      this.serializableIndices = options.hasOwnProperty('serializableIndices') ? options.serializableIndices : true;

      //option to activate a cleaner daemon - clears "aged" documents at set intervals.
      this.ttl = {
        age: null,
        ttlInterval: null,
        daemon: null
      };
      this.setTTL(options.ttl || -1, options.ttlInterval);

      // currentMaxId - change manually at your own peril!
      this.maxId = 0;

      this.DynamicViews = [];

      // events
      this.events = {
        'insert': [],
        'update': [],
        'pre-insert': [],
        'pre-update': [],
        'close': [],
        'flushbuffer': [],
        'error': [],
        'delete': [],
        'warning': []
      };

      // changes are tracked by collection and aggregated by the db
      this.changes = [];

      // initialize the id index
      this.ensureId();
      var indices = [];
      // initialize optional user-supplied indices array ['age', 'lname', 'zip']
      if (options && options.indices) {
        if (Object.prototype.toString.call(options.indices) === '[object Array]') {
          indices = options.indices;
        } else if (typeof options.indices === 'string') {
          indices = [options.indices];
        } else {
          throw new TypeError('Indices needs to be a string or an array of strings');
        }
      }

      for (var idx = 0; idx < indices.length; idx++) {
        this.ensureIndex(indices[idx]);
      }

      function observerCallback(changes) {

        var changedObjects = typeof Set === 'function' ? new Set() : [];

        if (!changedObjects.add)
          changedObjects.add = function (object) {
            if (this.indexOf(object) === -1)
              this.push(object);
            return this;
          };

        changes.forEach(function (change) {
          changedObjects.add(change.object);
        });

        changedObjects.forEach(function (object) {
          if (!hasOwnProperty.call(object, '$loki'))
            return self.removeAutoUpdateObserver(object);
          try {
            self.update(object);
          } catch (err) {}
        });
      }

      this.observerCallback = observerCallback;

      //Compare changed object (which is a forced clone) with existing object and return the delta
      function getChangeDelta(obj, old) {
        if (old) {
          return getObjectDelta(old, obj);
        }
        else {
          return JSON.parse(JSON.stringify(obj));
        }
      }

      this.getChangeDelta = getChangeDelta;

      function getObjectDelta(oldObject, newObject) {
        var propertyNames = newObject !== null && typeof newObject === 'object' ? Object.keys(newObject) : null;
        if (propertyNames && propertyNames.length && ['string', 'boolean', 'number'].indexOf(typeof(newObject)) < 0) {
          var delta = {};
          for (var i = 0; i < propertyNames.length; i++) {
            var propertyName = propertyNames[i];
            if (newObject.hasOwnProperty(propertyName)) {
              if (!oldObject.hasOwnProperty(propertyName) || self.uniqueNames.indexOf(propertyName) >= 0 || propertyName == '$loki' || propertyName == 'meta') {
                delta[propertyName] = newObject[propertyName];
              }
              else {
                var propertyDelta = getObjectDelta(oldObject[propertyName], newObject[propertyName]);
                if (typeof propertyDelta !== "undefined" && propertyDelta != {}) {
                  delta[propertyName] = propertyDelta;
                }
              }
            }
          }
          return Object.keys(delta).length === 0 ? undefined : delta;
        }
        else {
          return oldObject === newObject ? undefined : newObject;
        }
      }

      this.getObjectDelta = getObjectDelta;

      // clear all the changes
      function flushChanges() {
        self.changes = [];
      }

      this.getChanges = function () {
        return self.changes;
      };

      this.flushChanges = flushChanges;

      this.setChangesApi = function (enabled) {
        self.disableChangesApi = !enabled;
        if (!enabled) { self.disableDeltaChangesApi = false; }
      };

      this.on('delete', function deleteCallback(obj) {
        if (!self.disableChangesApi) {
          self.createChange(self.name, 'R', obj);
        }
      });

      this.on('warning', function (warning) {
        self.console.warn(warning);
      });
      // for de-serialization purposes
      flushChanges();
    }

    Collection.prototype = new LokiEventEmitter();

    /*
      * For ChangeAPI default to clone entire object, for delta changes create object with only differences (+ $loki and meta)
      */
    Collection.prototype.createChange = function(name, op, obj, old) {
      this.changes.push({
        name: name,
        operation: op,
        obj: op == 'U' && !this.disableDeltaChangesApi ? this.getChangeDelta(obj, old) : JSON.parse(JSON.stringify(obj))
      });
    };

    Collection.prototype.insertMeta = function(obj) {
      var len, idx;

      if (this.disableMeta || !obj) {
        return;
      }

      // if batch insert
      if (Array.isArray(obj)) {
        len = obj.length;

        for(idx=0; idx<len; idx++) {
          if (!obj[idx].hasOwnProperty('meta')) {
            obj[idx].meta = {};
          }

          obj[idx].meta.created = (new Date()).getTime();
          obj[idx].meta.revision = 0;
        }

        return;
      }

      // single object
      if (!obj.meta) {
        obj.meta = {};
      }

      obj.meta.created = (new Date()).getTime();
      obj.meta.revision = 0;
    };

    Collection.prototype.updateMeta = function(obj) {
      if (this.disableMeta || !obj) {
        return;
      }
      obj.meta.updated = (new Date()).getTime();
      obj.meta.revision += 1;
    };

    Collection.prototype.createInsertChange = function(obj) {
      this.createChange(this.name, 'I', obj);
    };

    Collection.prototype.createUpdateChange = function(obj, old) {
      this.createChange(this.name, 'U', obj, old);
    };

    Collection.prototype.insertMetaWithChange = function(obj) {
      this.insertMeta(obj);
      this.createInsertChange(obj);
    };

    Collection.prototype.updateMetaWithChange = function(obj, old) {
      this.updateMeta(obj);
      this.createUpdateChange(obj, old);
    };

    Collection.prototype.console = {
      log: function () {},
      warn: function () {},
      error: function () {},
    };

    Collection.prototype.addAutoUpdateObserver = function (object) {
      if (!this.autoupdate || typeof Object.observe !== 'function')
        return;

      Object.observe(object, this.observerCallback, ['add', 'update', 'delete', 'reconfigure', 'setPrototype']);
    };

    Collection.prototype.removeAutoUpdateObserver = function (object) {
      if (!this.autoupdate || typeof Object.observe !== 'function')
        return;

      Object.unobserve(object, this.observerCallback);
    };

    /**
     * Adds a named collection transform to the collection
     * @param {string} name - name to associate with transform
     * @param {array} transform - an array of transformation 'step' objects to save into the collection
     * @memberof Collection
     * @example
     * users.addTransform('progeny', [
     *   {
     *     type: 'find',
     *     value: {
     *       'age': {'$lte': 40}
     *     }
     *   }
     * ]);
     *
     * var results = users.chain('progeny').data();
     */
    Collection.prototype.addTransform = function (name, transform) {
      if (this.transforms.hasOwnProperty(name)) {
        throw new Error("a transform by that name already exists");
      }

      this.transforms[name] = transform;
    };

    /**
     * Retrieves a named transform from the collection.
     * @param {string} name - name of the transform to lookup.
     * @memberof Collection
     */
    Collection.prototype.getTransform = function (name) {
      return this.transforms[name];
    };

    /**
     * Updates a named collection transform to the collection
     * @param {string} name - name to associate with transform
     * @param {object} transform - a transformation object to save into collection
     * @memberof Collection
     */
    Collection.prototype.setTransform = function (name, transform) {
      this.transforms[name] = transform;
    };

    /**
     * Removes a named collection transform from the collection
     * @param {string} name - name of collection transform to remove
     * @memberof Collection
     */
    Collection.prototype.removeTransform = function (name) {
      delete this.transforms[name];
    };

    Collection.prototype.byExample = function (template) {
      var k, obj, query;
      query = [];
      for (k in template) {
        if (!template.hasOwnProperty(k)) continue;
        query.push((
          obj = {},
          obj[k] = template[k],
          obj
        ));
      }
      return {
        '$and': query
      };
    };

    Collection.prototype.findObject = function (template) {
      return this.findOne(this.byExample(template));
    };

    Collection.prototype.findObjects = function (template) {
      return this.find(this.byExample(template));
    };

    /*----------------------------+
    | TTL daemon                  |
    +----------------------------*/
    Collection.prototype.ttlDaemonFuncGen = function () {
      var collection = this;
      var age = this.ttl.age;
      return function ttlDaemon() {
        var now = Date.now();
        var toRemove = collection.chain().where(function daemonFilter(member) {
          var timestamp = member.meta.updated || member.meta.created;
          var diff = now - timestamp;
          return age < diff;
        });
        toRemove.remove();
      };
    };

    /**
     * Updates or applies collection TTL settings.
     * @param {int} age - age (in ms) to expire document from collection
     * @param {int} interval - time (in ms) to clear collection of aged documents.
     * @memberof Collection
     */
    Collection.prototype.setTTL = function (age, interval) {
      if (age < 0) {
        clearInterval(this.ttl.daemon);
      } else {
        this.ttl.age = age;
        this.ttl.ttlInterval = interval;
        this.ttl.daemon = setInterval(this.ttlDaemonFuncGen(), interval);
      }
    };

    /*----------------------------+
    | INDEXING                    |
    +----------------------------*/

    /**
     * create a row filter that covers all documents in the collection
     */
    Collection.prototype.prepareFullDocIndex = function () {
      var len = this.data.length;
      var indexes = new Array(len);
      for (var i = 0; i < len; i += 1) {
        indexes[i] = i;
      }
      return indexes;
    };

    /**
     * Will allow reconfiguring certain collection options.
     * @param {boolean} options.adaptiveBinaryIndices - collection indices will be actively rebuilt rather than lazily
     * @memberof Collection
     */
    Collection.prototype.configureOptions = function (options) {
      options = options || {};

      if (options.hasOwnProperty('adaptiveBinaryIndices')) {
        this.adaptiveBinaryIndices = options.adaptiveBinaryIndices;

        // if switching to adaptive binary indices, make sure none are 'dirty'
        if (this.adaptiveBinaryIndices) {
          this.ensureAllIndexes();
        }
      }
    };

    /**
     * Ensure binary index on a certain field
     * @param {string} property - name of property to create binary index on
     * @param {boolean=} force - (Optional) flag indicating whether to construct index immediately
     * @memberof Collection
     */
    Collection.prototype.ensureIndex = function (property, force) {
      // optional parameter to force rebuild whether flagged as dirty or not
      if (typeof (force) === 'undefined') {
        force = false;
      }

      if (property === null || property === undefined) {
        throw new Error('Attempting to set index without an associated property');
      }

      if (this.binaryIndices[property] && !force) {
        if (!this.binaryIndices[property].dirty) return;
      }

      // if the index is already defined and we are using adaptiveBinaryIndices and we are not forcing a rebuild, return.
      if (this.adaptiveBinaryIndices === true && this.binaryIndices.hasOwnProperty(property) && !force) {
        return;
      }

      var index = {
        'name': property,
        'dirty': true,
        'values': this.prepareFullDocIndex()
      };
      this.binaryIndices[property] = index;

      var wrappedComparer =
        (function (prop, data) {
          var val1, val2, arr;
          return function (a, b) {
            if (~prop.indexOf('.')) {
              arr = prop.split('.');
              val1 = arr.reduce(function(obj, i) { return obj && obj[i] || undefined; }, data[a]);
              val2 = arr.reduce(function(obj, i) { return obj && obj[i] || undefined; }, data[b]);
            } else {
              val1 = data[a][prop];
              val2 = data[b][prop];
            }

            if (val1 !== val2) {
              if (Comparators.lt(val1, val2, false)) return -1;
              if (Comparators.gt(val1, val2, false)) return 1;
            }
            return 0;
          };
        })(property, this.data);

      index.values.sort(wrappedComparer);
      index.dirty = false;

      this.dirty = true; // for autosave scenarios
    };

    /**
     * Perform checks to determine validity/consistency of all binary indices
     * @param {object=} options - optional configuration object
     * @param {boolean} [options.randomSampling=false] - whether (faster) random sampling should be used
     * @param {number} [options.randomSamplingFactor=0.10] - percentage of total rows to randomly sample
     * @param {boolean} [options.repair=false] - whether to fix problems if they are encountered
     * @returns {string[]} array of index names where problems were found.
     * @memberof Collection
     * @example
     * // check all indices on a collection, returns array of invalid index names
     * var result = coll.checkAllIndexes({ repair: true, randomSampling: true, randomSamplingFactor: 0.15 });
     * if (result.length > 0) {
     *   results.forEach(function(name) { 
     *     console.log('problem encountered with index : ' + name); 
     *   });
     * }     
     */
    Collection.prototype.checkAllIndexes = function (options) {
      var key, bIndices = this.binaryIndices;
      var results = [], result;

      for (key in bIndices) {
        if (hasOwnProperty.call(bIndices, key)) {
          result = this.checkIndex(key, options);
          if (!result) {
            results.push(key);
          }
        }
      }

      return results;
    };

    /**
     * Perform checks to determine validity/consistency of a binary index
     * @param {string} property - name of the binary-indexed property to check
     * @param {object=} options - optional configuration object
     * @param {boolean} [options.randomSampling=false] - whether (faster) random sampling should be used
     * @param {number} [options.randomSamplingFactor=0.10] - percentage of total rows to randomly sample
     * @param {boolean} [options.repair=false] - whether to fix problems if they are encountered
     * @returns {boolean} whether the index was found to be valid (before optional correcting).
     * @memberof Collection
     * @example
     * // full test
     * var valid = coll.checkIndex('name');
     * // full test with repair (if issues found)
     * valid = coll.checkIndex('name', { repair: true });
     * // random sampling (default is 10% of total document count)
     * valid = coll.checkIndex('name', { randomSampling: true });
     * // random sampling (sample 20% of total document count)
     * valid = coll.checkIndex('name', { randomSampling: true, randomSamplingFactor: 0.20 });
     * // random sampling (implied boolean)
     * valid = coll.checkIndex('name', { randomSamplingFactor: 0.20 });
     * // random sampling with repair (if issues found)
     * valid = coll.checkIndex('name', { repair: true, randomSampling: true });
     */
    Collection.prototype.checkIndex = function (property, options) {
      options = options || {};
      // if 'randomSamplingFactor' specified but not 'randomSampling', assume true
      if (options.randomSamplingFactor && options.randomSampling !== false) {
        options.randomSampling = true;
      }
      options.randomSamplingFactor = options.randomSamplingFactor || 0.1;
      if (options.randomSamplingFactor < 0 || options.randomSamplingFactor > 1) {
        options.randomSamplingFactor = 0.1;
      }

      var valid=true, idx, iter, pos, len, biv;

      // make sure we are passed a valid binary index name
      if (!this.binaryIndices.hasOwnProperty(property)) {
        throw new Error("called checkIndex on property without an index: " + property);
      }

      // if lazy indexing, rebuild only if flagged as dirty
      if (!this.adaptiveBinaryIndices) {
        this.ensureIndex(property);
      }

      biv = this.binaryIndices[property].values;
      len = biv.length;

      // if the index has an incorrect number of values
      if (len !== this.data.length) {
        if (options.repair) {
          this.ensureIndex(property, true);
        }
        return false;
      }

      if (len === 0) {
        return true;
      }

      if (len === 1) {
        valid = (biv[0] === 0);
      }
      else {
        if (options.randomSampling) {
          // validate first and last
          if (!LokiOps.$lte(this.data[biv[0]][property], this.data[biv[1]][property])) {
            valid=false;
          }
          if (!LokiOps.$lte(this.data[biv[len-2]][property], this.data[biv[len-1]][property])) {
            valid=false;
          }

          // if first and last positions are sorted correctly with their nearest neighbor,
          // continue onto random sampling phase...
          if (valid) {
            // # random samplings = total count * sampling factor
            iter = Math.floor((len-1) * options.randomSamplingFactor);

            // for each random sampling, validate that the binary index is sequenced properly
            // with next higher value.
            for(idx=0; idx<iter-1; idx++) {
              // calculate random position
              pos = Math.floor(Math.random() * (len-1));
              if (!LokiOps.$lte(this.data[biv[pos]][property], this.data[biv[pos+1]][property])) {
                valid=false;
                break;
              }
            }
          }
        }
        else {
          // validate that the binary index is sequenced properly
          for(idx=0; idx<len-1; idx++) {
            if (!LokiOps.$lte(this.data[biv[idx]][property], this.data[biv[idx+1]][property])) {
              valid=false;
              break;
            }
          }
        }
      }

      // if incorrectly sequenced and we are to fix problems, rebuild index
      if (!valid && options.repair) {
        this.ensureIndex(property, true);
      }

      return valid;
    };

    Collection.prototype.getBinaryIndexValues = function (property) {
      var idx, idxvals = this.binaryIndices[property].values;
      var result = [];

      for (idx = 0; idx < idxvals.length; idx++) {
        result.push(this.data[idxvals[idx]][property]);
      }

      return result;
    };

    Collection.prototype.ensureUniqueIndex = function (field) {
      var index = this.constraints.unique[field];
      if (!index) {
        // keep track of new unique index for regenerate after database (re)load.
        if (this.uniqueNames.indexOf(field) == -1) {
          this.uniqueNames.push(field);
        }
      }

      // if index already existed, (re)loading it will likely cause collisions, rebuild always
      this.constraints.unique[field] = index = new UniqueIndex(field);
      this.data.forEach(function (obj) {
        index.set(obj);
      });
      return index;
    };

    /**
     * Ensure all binary indices
     * @param {boolean} force - whether to force rebuild of existing lazy binary indices
     * @memberof Collection
     */
    Collection.prototype.ensureAllIndexes = function (force) {
      var key, bIndices = this.binaryIndices;
      for (key in bIndices) {
        if (hasOwnProperty.call(bIndices, key)) {
          this.ensureIndex(key, force);
        }
      }
    };

    /**
     * Internal method used to flag all lazy index as dirty
     */
    Collection.prototype.flagBinaryIndexesDirty = function () {
      var key, bIndices = this.binaryIndices;
      for (key in bIndices) {
        if (hasOwnProperty.call(bIndices, key)) {
          bIndices[key].dirty = true;
        }
      }
    };

    /**
     * Internal method used to flag a lazy index as dirty
     */
    Collection.prototype.flagBinaryIndexDirty = function (index) {
      if (this.binaryIndices[index])
        this.binaryIndices[index].dirty = true;
    };

    /**
     * Quickly determine number of documents in collection (or query)
     * @param {object=} query - (optional) query object to count results of
     * @returns {number} number of documents in the collection
     * @memberof Collection
     */
    Collection.prototype.count = function (query) {
      if (!query) {
        return this.data.length;
      }

      return this.chain().find(query).filteredrows.length;
    };

    /**
     * Rebuild idIndex
     */
    Collection.prototype.ensureId = function () {
      var len = this.data.length,
        i = 0;

      this.idIndex = [];
      for (i; i < len; i += 1) {
        this.idIndex.push(this.data[i].$loki);
      }
    };

    /**
     * Rebuild idIndex async with callback - useful for background syncing with a remote server
     */
    Collection.prototype.ensureIdAsync = function (callback) {
      this.async(function () {
        this.ensureId();
      }, callback);
    };

    /**
     * Add a dynamic view to the collection
     * @param {string} name - name of dynamic view to add
     * @param {object=} options - options to configure dynamic view with
     * @param {boolean} [options.persistent=false] - indicates if view is to main internal results array in 'resultdata'
     * @param {string} [options.sortPriority='passive'] - 'passive' (sorts performed on call to data) or 'active' (after updates)
     * @param {number} options.minRebuildInterval - minimum rebuild interval (need clarification to docs here)
     * @returns {DynamicView} reference to the dynamic view added
     * @memberof Collection
     * @example
     * var pview = users.addDynamicView('progeny');
     * pview.applyFind({'age': {'$lte': 40}});
     * pview.applySimpleSort('name');
     *
     * var results = pview.data();
     **/

    Collection.prototype.addDynamicView = function (name, options) {
      var dv = new DynamicView(this, name, options);
      this.DynamicViews.push(dv);

      return dv;
    };

    /**
     * Remove a dynamic view from the collection
     * @param {string} name - name of dynamic view to remove
     * @memberof Collection
     **/
    Collection.prototype.removeDynamicView = function (name) {
      for (var idx = 0; idx < this.DynamicViews.length; idx++) {
        if (this.DynamicViews[idx].name === name) {
          this.DynamicViews.splice(idx, 1);
        }
      }
    };

    /**
     * Look up dynamic view reference from within the collection
     * @param {string} name - name of dynamic view to retrieve reference of
     * @returns {DynamicView} A reference to the dynamic view with that name
     * @memberof Collection
     **/
    Collection.prototype.getDynamicView = function (name) {
      for (var idx = 0; idx < this.DynamicViews.length; idx++) {
        if (this.DynamicViews[idx].name === name) {
          return this.DynamicViews[idx];
        }
      }

      return null;
    };

    /**
     * Applies a 'mongo-like' find query object and passes all results to an update function.
     * For filter function querying you should migrate to [updateWhere()]{@link Collection#updateWhere}.
     *
     * @param {object|function} filterObject - 'mongo-like' query object (or deprecated filterFunction mode)
     * @param {function} updateFunction - update function to run against filtered documents
     * @memberof Collection
     */
    Collection.prototype.findAndUpdate = function (filterObject, updateFunction) {
      if (typeof (filterObject) === "function") {
        this.updateWhere(filterObject, updateFunction);
      }
      else {
        this.chain().find(filterObject).update(updateFunction);
      }
    };

    /**
     * Applies a 'mongo-like' find query object removes all documents which match that filter.
     *
     * @param {object} filterObject - 'mongo-like' query object
     * @memberof Collection
     */
    Collection.prototype.findAndRemove = function(filterObject) {
      this.chain().find(filterObject).remove();
    };

    /**
     * Adds object(s) to collection, ensure object(s) have meta properties, clone it if necessary, etc.
     * @param {(object|array)} doc - the document (or array of documents) to be inserted
     * @returns {(object|array)} document or documents inserted
     * @memberof Collection
     * @example
     * users.insert({
     *     name: 'Odin',
     *     age: 50,
     *     address: 'Asgard'
     * });
     *
     * // alternatively, insert array of documents
     * users.insert([{ name: 'Thor', age: 35}, { name: 'Loki', age: 30}]);
     */
    Collection.prototype.insert = function (doc) {
      if (!Array.isArray(doc)) {
        return this.insertOne(doc);
      }

      // holder to the clone of the object inserted if collections is set to clone objects
      var obj;
      var results = [];

      this.emit('pre-insert', doc);
      for (var i = 0, len = doc.length; i < len; i++) {
        obj = this.insertOne(doc[i], true);
        if (!obj) {
          return undefined;
        }
        results.push(obj);
      }

      // at the 'batch' level, if clone option is true then emitted docs are clones
      this.emit('insert', results);

      // if clone option is set, clone return values
      results = this.cloneObjects ? clone(results, this.cloneMethod) : results;

      return results.length === 1 ? results[0] : results;
    };

    /**
     * Adds a single object, ensures it has meta properties, clone it if necessary, etc.
     * @param {object} doc - the document to be inserted
     * @param {boolean} bulkInsert - quiet pre-insert and insert event emits
     * @returns {object} document or 'undefined' if there was a problem inserting it
     */
    Collection.prototype.insertOne = function (doc, bulkInsert) {
      var err = null;
      var returnObj;

      if (typeof doc !== 'object') {
        err = new TypeError('Document needs to be an object');
      } else if (doc === null) {
        err = new TypeError('Object cannot be null');
      }

      if (err !== null) {
        this.emit('error', err);
        throw err;
      }

      // if configured to clone, do so now... otherwise just use same obj reference
      var obj = this.cloneObjects ? clone(doc, this.cloneMethod) : doc;

      if (!this.disableMeta && typeof obj.meta === 'undefined') {
        obj.meta = {
          revision: 0,
          created: 0
        };
      }

      // both 'pre-insert' and 'insert' events are passed internal data reference even when cloning
      // insert needs internal reference because that is where loki itself listens to add meta
      if (!bulkInsert) {
        this.emit('pre-insert', obj);
      }
      if (!this.add(obj)) {
        return undefined;
      }

      // update meta and store changes if ChangesAPI is enabled
      // (moved from "insert" event listener to allow internal reference to be used)
      if (this.disableChangesApi) {
        this.insertMeta(obj);
      }
      else {
        this.insertMetaWithChange(obj);
      }

      // if cloning is enabled, emit insert event with clone of new object
      returnObj = this.cloneObjects ? clone(obj, this.cloneMethod) : obj;
      if (!bulkInsert) {
        this.emit('insert', returnObj);
      }

      this.addAutoUpdateObserver(returnObj);
      return returnObj;
    };

    /**
     * Empties the collection.
     * @param {object=} options - configure clear behavior
     * @param {bool=} [options.removeIndices=false] - whether to remove indices in addition to data
     * @memberof Collection
     */
    Collection.prototype.clear = function (options) {
      var self = this;

      options = options || {};

      this.data = [];
      this.idIndex = [];
      this.cachedIndex = null;
      this.cachedBinaryIndex = null;
      this.cachedData = null;
      this.maxId = 0;
      this.DynamicViews = [];
      this.dirty = true;

      // if removing indices entirely
      if (options.removeIndices === true) {
        this.binaryIndices = {};

        this.constraints = {
          unique: {},
          exact: {}
        };
        this.uniqueNames = [];
      }
      // clear indices but leave definitions in place
      else {
        // clear binary indices
        var keys = Object.keys(this.binaryIndices);
        keys.forEach(function(biname) {
          self.binaryIndices[biname].dirty = false;
          self.binaryIndices[biname].values = [];
        });

        // clear entire unique indices definition
        this.constraints = {
          unique: {},
          exact: {}
        };

        // add definitions back
        this.uniqueNames.forEach(function(uiname) {
          self.ensureUniqueIndex(uiname);
        });
      }
    };

    /**
     * Updates an object and notifies collection that the document has changed.
     * @param {object} doc - document to update within the collection
     * @memberof Collection
     */
    Collection.prototype.update = function (doc) {
      var adaptiveBatchOverride, k, len;

      if (Array.isArray(doc)) {
        len = doc.length;

        // if not cloning, disable adaptive binary indices for the duration of the batch update,
        // followed by lazy rebuild and re-enabling adaptive indices after batch update.
        adaptiveBatchOverride = !this.cloneObjects &&
          this.adaptiveBinaryIndices && Object.keys(this.binaryIndices).length > 0;

        if (adaptiveBatchOverride) {
          this.adaptiveBinaryIndices = false;
        }

        try {
          for (k=0; k < len; k += 1) {
            this.update(doc[k]);
          }
        }
        finally {
          if (adaptiveBatchOverride) {
            this.ensureAllIndexes();
            this.adaptiveBinaryIndices = true;
          }
        }

        return;
      }

      // verify object is a properly formed document
      if (!hasOwnProperty.call(doc, '$loki')) {
        throw new Error('Trying to update unsynced document. Please save the document first by using insert() or addMany()');
      }
      try {
        this.startTransaction();
        var arr = this.get(doc.$loki, true),
          oldInternal,   // ref to existing obj
          newInternal, // ref to new internal obj
          position,
          self = this;

        if (!arr) {
          throw new Error('Trying to update a document not in collection.');
        }

        oldInternal = arr[0]; // -internal- obj ref
        position = arr[1]; // position in data array

        // if configured to clone, do so now... otherwise just use same obj reference
        newInternal = this.cloneObjects || !this.disableDeltaChangesApi ? clone(doc, this.cloneMethod) : doc;

        this.emit('pre-update', doc);

        Object.keys(this.constraints.unique).forEach(function (key) {
          self.constraints.unique[key].update(oldInternal, newInternal);
        });

        // operate the update
        this.data[position] = newInternal;

        if (newInternal !== doc) {
          this.addAutoUpdateObserver(doc);
        }

        // now that we can efficiently determine the data[] position of newly added document,
        // submit it for all registered DynamicViews to evaluate for inclusion/exclusion
        for (var idx = 0; idx < this.DynamicViews.length; idx++) {
          this.DynamicViews[idx].evaluateDocument(position, false);
        }

        var key;
        if (this.adaptiveBinaryIndices) {
          // for each binary index defined in collection, immediately update rather than flag for lazy rebuild
          var bIndices = this.binaryIndices;
          for (key in bIndices) {
            this.adaptiveBinaryIndexUpdate(position, key);
          }
        }
        else {
          this.flagBinaryIndexesDirty();
        }

        this.idIndex[position] = newInternal.$loki;
        //this.flagBinaryIndexesDirty();

        this.commit();
        this.dirty = true; // for autosave scenarios

        // update meta and store changes if ChangesAPI is enabled
        if (this.disableChangesApi) {
          this.updateMeta(newInternal, null);
        }
        else {
          this.updateMetaWithChange(newInternal, oldInternal);
        }

        var returnObj;

        // if cloning is enabled, emit 'update' event and return with clone of new object
        if (this.cloneObjects) {
          returnObj = clone(newInternal, this.cloneMethod);
        }
        else {
          returnObj = newInternal;
        }

        this.emit('update', returnObj, oldInternal);
        return returnObj;
      } catch (err) {
        this.rollback();
        this.console.error(err.message);
        this.emit('error', err);
        throw (err); // re-throw error so user does not think it succeeded
      }
    };

    /**
     * Add object to collection
     */
    Collection.prototype.add = function (obj) {
      // if parameter isn't object exit with throw
      if ('object' !== typeof obj) {
        throw new TypeError('Object being added needs to be an object');
      }
      // if object you are adding already has id column it is either already in the collection
      // or the object is carrying its own 'id' property.  If it also has a meta property,
      // then this is already in collection so throw error, otherwise rename to originalId and continue adding.
      if (typeof (obj.$loki) !== 'undefined') {
        throw new Error('Document is already in collection, please use update()');
      }

      /*
       * try adding object to collection
       */
      try {
        this.startTransaction();
        this.maxId++;

        if (isNaN(this.maxId)) {
          this.maxId = (this.data[this.data.length - 1].$loki + 1);
        }

        obj.$loki = this.maxId;

        if (!this.disableMeta) {
          obj.meta.version = 0;
        }

        var key, constrUnique = this.constraints.unique;
        for (key in constrUnique) {
          if (hasOwnProperty.call(constrUnique, key)) {
            constrUnique[key].set(obj);
          }
        }

        // add new obj id to idIndex
        this.idIndex.push(obj.$loki);

        // add the object
        this.data.push(obj);

        var addedPos = this.data.length - 1;

        // now that we can efficiently determine the data[] position of newly added document,
        // submit it for all registered DynamicViews to evaluate for inclusion/exclusion
        var dvlen = this.DynamicViews.length;
        for (var i = 0; i < dvlen; i++) {
          this.DynamicViews[i].evaluateDocument(addedPos, true);
        }

        if (this.adaptiveBinaryIndices) {
          // for each binary index defined in collection, immediately update rather than flag for lazy rebuild
          var bIndices = this.binaryIndices;
          for (key in bIndices) {
            this.adaptiveBinaryIndexInsert(addedPos, key);
          }
        }
        else {
          this.flagBinaryIndexesDirty();
        }

        this.commit();
        this.dirty = true; // for autosave scenarios

        return (this.cloneObjects) ? (clone(obj, this.cloneMethod)) : (obj);
      } catch (err) {
        this.rollback();
        this.console.error(err.message);
        this.emit('error', err);
        throw (err); // re-throw error so user does not think it succeeded
      }
    };

    /**
     * Applies a filter function and passes all results to an update function.
     *
     * @param {function} filterFunction - filter function whose results will execute update
     * @param {function} updateFunction - update function to run against filtered documents
     * @memberof Collection
     */
    Collection.prototype.updateWhere = function(filterFunction, updateFunction) {
      var results = this.where(filterFunction),
        i = 0,
        obj;
      try {
        for (i; i < results.length; i++) {
          obj = updateFunction(results[i]);
          this.update(obj);
        }

      } catch (err) {
        this.rollback();
        this.console.error(err.message);
      }
    };

    /**
     * Remove all documents matching supplied filter function.
     * For 'mongo-like' querying you should migrate to [findAndRemove()]{@link Collection#findAndRemove}.
     * @param {function|object} query - query object to filter on
     * @memberof Collection
     */
    Collection.prototype.removeWhere = function (query) {
      var list;
      if (typeof query === 'function') {
        list = this.data.filter(query);
        this.remove(list);
      } else {
        this.chain().find(query).remove();
      }
    };

    Collection.prototype.removeDataOnly = function () {
      this.remove(this.data.slice());
    };

    /**
     * Internal method to remove a batch of documents from the collection.
     * @param {number[]} positions - data/idIndex positions to remove
     */
    Collection.prototype.removeBatchByPositions = function(positions) {
      var len = positions.length;
      var xo = {};
      var dlen, didx, idx;
      var bic=Object.keys(this.binaryIndices).length;
      var uic=Object.keys(this.constraints.unique).length;
      var adaptiveOverride = this.adaptiveBinaryIndices && Object.keys(this.binaryIndices).length > 0;
      var doc, self=this;

      try {
        this.startTransaction();

        // create hashobject for positional removal inclusion tests...
        // all keys defined in this hashobject represent $loki ids of the documents to remove.
        for(idx=0; idx < len; idx++) {
          xo[this.idIndex[positions[idx]]] = true;
        }

        // if we will need to notify dynamic views and/or binary indices to update themselves...
        dlen = this.DynamicViews.length;
        if ((dlen > 0) || (bic > 0) || (uic > 0)) {
          if (dlen > 0) {
            // notify dynamic views to remove relevant documents at data positions
            for (didx = 0; didx < dlen; didx++) {
              // notify dv of remove (passing batch/array of positions)
              this.DynamicViews[didx].removeDocument(positions);
            }
          }

          // notify binary indices to update
          if (this.adaptiveBinaryIndices && !adaptiveOverride) {
            // for each binary index defined in collection, immediately update rather than flag for lazy rebuild
            var key, bIndices = this.binaryIndices;

            for (key in bIndices) {
              this.adaptiveBinaryIndexRemove(positions, key);
            }
          }
          else {
            this.flagBinaryIndexesDirty();
          }

          if (uic) {
            Object.keys(this.constraints.unique).forEach(function (key) {
              for(idx=0; idx < len; idx++) {
                doc = self.data[positions[idx]];
                if (doc[key] !== null && doc[key] !== undefined) {
                  self.constraints.unique[key].remove(doc[key]);
                }
              }
            });
          }
        }

        // emit 'delete' events only of listeners are attached.
        // since data not removed yet, in future we can emit single delete event with array...
        // for now that might be breaking change to put in potential 1.6 or LokiDB (lokijs2) version
        if (!this.disableChangesApi || this.events.delete.length > 1) {
          for(idx=0; idx < len; idx++) {
            this.emit('delete', this.data[positions[idx]]);
          }
        }

        // remove from data[] :
        // filter collection data for items not in inclusion hashobject
        this.data = this.data.filter(function(obj) {
          return !xo[obj.$loki];
        });

        // remove from idIndex[] :
        // filter idIndex for items not in inclusion hashobject
        this.idIndex = this.idIndex.filter(function(id) {
            return !xo[id];
        });

        if (this.adaptiveBinaryIndices && adaptiveOverride) {
          this.adaptiveBinaryIndices = false;
          this.ensureAllIndexes(true);
          this.adaptiveBinaryIndices = true;
        }

        this.commit();

        // flag collection as dirty for autosave
        this.dirty = true;
      } 
      catch (err) {
        this.rollback();
        if (adaptiveOverride) {
          this.adaptiveBinaryIndices = true;
        }
        this.console.error(err.message);
        this.emit('error', err);
        return null;
      }      
    };

    /**
     *  Internal method called by remove()
     * @param {object[]|number[]} batch - array of documents or $loki ids to remove
     */
    Collection.prototype.removeBatch = function(batch) {
      var len = batch.length, 
        dlen=this.data.length, 
        idx;
      var xlt = {};
      var posx = [];
      
      // create lookup hashobject to translate $loki id to position
      for (idx=0; idx < dlen; idx++) {
        xlt[this.data[idx].$loki] = idx;
      }

      // iterate the batch
      for (idx=0; idx < len; idx++) {
        if (typeof(batch[idx]) === 'object') {
          posx.push(xlt[batch[idx].$loki]);
        }
        else {
          posx.push(xlt[batch[idx]]);
        }
      }

      this.removeBatchByPositions(posx);
    };

    /**
     * Remove a document from the collection
     * @param {object} doc - document to remove from collection
     * @memberof Collection
     */
    Collection.prototype.remove = function (doc) {
      if (typeof doc === 'number') {
        doc = this.get(doc);
      }

      if ('object' !== typeof doc) {
        throw new Error('Parameter is not an object');
      }
      if (Array.isArray(doc)) {
        this.removeBatch(doc);
        return;
      }

      if (!hasOwnProperty.call(doc, '$loki')) {
        throw new Error('Object is not a document stored in the collection');
      }

      try {
        this.startTransaction();
        var arr = this.get(doc.$loki, true),
          // obj = arr[0],
          position = arr[1];
        var self = this;
        Object.keys(this.constraints.unique).forEach(function (key) {
          if (doc[key] !== null && typeof doc[key] !== 'undefined') {
            self.constraints.unique[key].remove(doc[key]);
          }
        });
        // now that we can efficiently determine the data[] position of newly added document,
        // submit it for all registered DynamicViews to remove
        for (var idx = 0; idx < this.DynamicViews.length; idx++) {
          this.DynamicViews[idx].removeDocument(position);
        }

        if (this.adaptiveBinaryIndices) {
          // for each binary index defined in collection, immediately update rather than flag for lazy rebuild
          var key, bIndices = this.binaryIndices;
          for (key in bIndices) {
            this.adaptiveBinaryIndexRemove(position, key);
          }
        }
        else {
          this.flagBinaryIndexesDirty();
        }

        this.data.splice(position, 1);
        this.removeAutoUpdateObserver(doc);

        // remove id from idIndex
        this.idIndex.splice(position, 1);

        this.commit();
        this.dirty = true; // for autosave scenarios
        this.emit('delete', arr[0]);
        delete doc.$loki;
        delete doc.meta;
        return doc;

      } catch (err) {
        this.rollback();
        this.console.error(err.message);
        this.emit('error', err);
        return null;
      }
    };

    /*---------------------+
    | Finding methods     |
    +----------------------*/

    /**
     * Get by Id - faster than other methods because of the searching algorithm
     * @param {int} id - $loki id of document you want to retrieve
     * @param {boolean} returnPosition - if 'true' we will return [object, position]
     * @returns {(object|array|null)} Object reference if document was found, null if not,
     *     or an array if 'returnPosition' was passed.
     * @memberof Collection
     */
    Collection.prototype.get = function (id, returnPosition) {
      var retpos = returnPosition || false,
        data = this.idIndex,
        max = data.length - 1,
        min = 0,
        mid = (min + max) >> 1;

      id = typeof id === 'number' ? id : parseInt(id, 10);

      if (isNaN(id)) {
        throw new TypeError('Passed id is not an integer');
      }

      while (data[min] < data[max]) {
        mid = (min + max) >> 1;

        if (data[mid] < id) {
          min = mid + 1;
        } else {
          max = mid;
        }
      }

      if (max === min && data[min] === id) {
        if (retpos) {
          return [this.data[min], min];
        }
        return this.data[min];
      }
      return null;

    };

    /**
     * Perform binary range lookup for the data[dataPosition][binaryIndexName] property value
     *    Since multiple documents may contain the same value (which the index is sorted on),
     *    we hone in on range and then linear scan range to find exact index array position.
     * @param {int} dataPosition : coll.data array index/position
     * @param {string} binaryIndexName : index to search for dataPosition in
     */
    Collection.prototype.getBinaryIndexPosition = function(dataPosition, binaryIndexName) {
      var val = this.data[dataPosition][binaryIndexName];
      var index = this.binaryIndices[binaryIndexName].values;

      // i think calculateRange can probably be moved to collection
      // as it doesn't seem to need resultset.  need to verify
      var range = this.calculateRange("$eq", binaryIndexName, val);

      if (range[0] === 0 && range[1] === -1) {
        // uhoh didn't find range
        return null;
      }

      var min = range[0];
      var max = range[1];

      // narrow down the sub-segment of index values
      // where the indexed property value exactly matches our
      // value and then linear scan to find exact -index- position
      for(var idx = min; idx <= max; idx++) {
        if (index[idx] === dataPosition) return idx;
      }

      // uhoh
      return null;
    };

    /**
     * Adaptively insert a selected item to the index.
     * @param {int} dataPosition : coll.data array index/position
     * @param {string} binaryIndexName : index to search for dataPosition in
     */
    Collection.prototype.adaptiveBinaryIndexInsert = function(dataPosition, binaryIndexName) {
      var index = this.binaryIndices[binaryIndexName].values;
      var val = this.data[dataPosition][binaryIndexName];

      // If you are inserting a javascript Date value into a binary index, convert to epoch time
      if (this.serializableIndices === true && val instanceof Date) {
        this.data[dataPosition][binaryIndexName] = val.getTime();
        val = this.data[dataPosition][binaryIndexName];
      }

      var idxPos = (index.length === 0)?0:this.calculateRangeStart(binaryIndexName, val, true);

      // insert new data index into our binary index at the proper sorted location for relevant property calculated by idxPos.
      // doing this after adjusting dataPositions so no clash with previous item at that position.
      this.binaryIndices[binaryIndexName].values.splice(idxPos, 0, dataPosition);
    };

    /**
     * Adaptively update a selected item within an index.
     * @param {int} dataPosition : coll.data array index/position
     * @param {string} binaryIndexName : index to search for dataPosition in
     */
    Collection.prototype.adaptiveBinaryIndexUpdate = function(dataPosition, binaryIndexName) {
      // linear scan needed to find old position within index unless we optimize for clone scenarios later
      // within (my) node 5.6.0, the following for() loop with strict compare is -much- faster than indexOf()
      var idxPos,
        index = this.binaryIndices[binaryIndexName].values,
        len=index.length;

      for(idxPos=0; idxPos < len; idxPos++) {
        if (index[idxPos] === dataPosition) break;
      }

      //var idxPos = this.binaryIndices[binaryIndexName].values.indexOf(dataPosition);
      this.binaryIndices[binaryIndexName].values.splice(idxPos, 1);

      //this.adaptiveBinaryIndexRemove(dataPosition, binaryIndexName, true);
      this.adaptiveBinaryIndexInsert(dataPosition, binaryIndexName);
    };

    /**
     * Adaptively remove a selected item from the index.
     * @param {number|number[]} dataPosition : coll.data array index/position
     * @param {string} binaryIndexName : index to search for dataPosition in
     */
    Collection.prototype.adaptiveBinaryIndexRemove = function(dataPosition, binaryIndexName, removedFromIndexOnly) {
      var bi = this.binaryIndices[binaryIndexName];
      var len, idx, rmidx, rmlen, rxo = {};
      var curr, shift, idxPos;

      if (Array.isArray(dataPosition)) {
        // when called from chained remove, and only one document in array,
        // it will be faster to use old algorithm
        rmlen = dataPosition.length;
        if (rmlen === 1) {
          dataPosition = dataPosition[0];
        }
        // we were passed an array (batch) of documents so use this 'batch optimized' algorithm
        else {
          for(rmidx=0;rmidx<rmlen; rmidx++) {
            rxo[dataPosition[rmidx]] = true;
          }
    
          // remove document from index (with filter function)
          bi.values = bi.values.filter(function(di) { return !rxo[di]; });
    
          // if we passed this optional flag parameter, we are calling from adaptiveBinaryIndexUpdate,
          // in which case data positions stay the same.
          if (removedFromIndexOnly === true) {
            return;
          }
    
          var sortedPositions = dataPosition.slice();
          sortedPositions.sort(function (a, b) { return a-b; });
    
          // to remove holes, we need to 'shift down' the index's data array positions
          // we need to adjust array positions -1 for each index data positions greater than removed positions
          len = bi.values.length;
          for (idx=0; idx<len; idx++) {
            curr=bi.values[idx];
            shift=0;
            for(rmidx=0; rmidx<rmlen && curr > sortedPositions[rmidx]; rmidx++) {
                shift++;
            }
            bi.values[idx]-=shift;
          }

          // batch processed, bail out
          return;
        }

        // not a batch so continue...
      }

      idxPos = this.getBinaryIndexPosition(dataPosition, binaryIndexName);

      if (idxPos === null) {
        // throw new Error('unable to determine binary index position');
        return null;
      }

      // remove document from index (with splice)
      bi.values.splice(idxPos, 1);

      // if we passed this optional flag parameter, we are calling from adaptiveBinaryIndexUpdate,
      // in which case data positions stay the same.
      if (removedFromIndexOnly === true) {
        return;
      }

      // since index stores data array positions, if we remove a document
      // we need to adjust array positions -1 for all document positions greater than removed position
      len = bi.values.length;
      for (idx = 0; idx < len; idx++) {
        if (bi.values[idx] > dataPosition) {
          bi.values[idx]--;
        }
      }
    };

    /**
     * Internal method used for index maintenance and indexed searching.
     * Calculates the beginning of an index range for a given value.
     * For index maintainance (adaptive:true), we will return a valid index position to insert to.
     * For querying (adaptive:false/undefined), we will :
     *    return lower bound/index of range of that value (if found)
     *    return next lower index position if not found (hole)
     * If index is empty it is assumed to be handled at higher level, so
     * this method assumes there is at least 1 document in index.
     *
     * @param {string} prop - name of property which has binary index
     * @param {any} val - value to find within index
     * @param {bool?} adaptive - if true, we will return insert position
     */
    Collection.prototype.calculateRangeStart = function (prop, val, adaptive) {
      var rcd = this.data;
      var index = this.binaryIndices[prop].values;
      var min = 0;
      var max = index.length - 1;
      var mid = 0;

      if (index.length === 0) {
        return -1;
      }

      var minVal = rcd[index[min]][prop];
      var maxVal = rcd[index[max]][prop];

      // hone in on start position of value
      while (min < max) {
        mid = (min + max) >> 1;

        if (Comparators.lt(rcd[index[mid]][prop], val, false)) {
          min = mid + 1;
        } else {
          max = mid;
        }
      }

      var lbound = min;

      // found it... return it
      if (Comparators.aeq(val, rcd[index[lbound]][prop])) {
        return lbound;
      }

      // if not in index and our value is less than the found one
      if (Comparators.lt(val, rcd[index[lbound]][prop], false)) {
        return adaptive?lbound:lbound-1;
      }

      // not in index and our value is greater than the found one
      return adaptive?lbound+1:lbound;
    };

    /**
     * Internal method used for indexed $between.  Given a prop (index name), and a value
     * (which may or may not yet exist) this will find the final position of that upper range value.
     */
    Collection.prototype.calculateRangeEnd = function (prop, val) {
      var rcd = this.data;
      var index = this.binaryIndices[prop].values;
      var min = 0;
      var max = index.length - 1;
      var mid = 0;

      if (index.length === 0) {
        return -1;
      }

      var minVal = rcd[index[min]][prop];
      var maxVal = rcd[index[max]][prop];

      // hone in on start position of value
      while (min < max) {
        mid = (min + max) >> 1;

        if (Comparators.lt(val, rcd[index[mid]][prop], false)) {
          max = mid;
        } else {
          min = mid + 1;
        }
      }

      var ubound = max;

      // only eq if last element in array is our val
      if (Comparators.aeq(val, rcd[index[ubound]][prop])) {
        return ubound;
      }

       // if not in index and our value is less than the found one
      if (Comparators.gt(val, rcd[index[ubound]][prop], false)) {
        return ubound+1;
      }

      // either hole or first nonmatch
      if (Comparators.aeq(val, rcd[index[ubound-1]][prop])) {
        return ubound-1;
      }

      // hole, so ubound if nearest gt than the val we were looking for
      return ubound;
    };

    /**
     * calculateRange() - Binary Search utility method to find range/segment of values matching criteria.
     *    this is used for collection.find() and first find filter of resultset/dynview
     *    slightly different than get() binary search in that get() hones in on 1 value,
     *    but we have to hone in on many (range)
     * @param {string} op - operation, such as $eq
     * @param {string} prop - name of property to calculate range for
     * @param {object} val - value to use for range calculation.
     * @returns {array} [start, end] index array positions
     */
    Collection.prototype.calculateRange = function (op, prop, val) {
      var rcd = this.data;
      var index = this.binaryIndices[prop].values;
      var min = 0;
      var max = index.length - 1;
      var mid = 0;
      var lbound, lval;
      var ubound, uval;

      // when no documents are in collection, return empty range condition
      if (rcd.length === 0) {
        return [0, -1];
      }

      var minVal = rcd[index[min]][prop];
      var maxVal = rcd[index[max]][prop];

      // if value falls outside of our range return [0, -1] to designate no results
      switch (op) {
      case '$eq':
      case '$aeq':
        if (Comparators.lt(val, minVal, false) || Comparators.gt(val, maxVal, false)) {
          return [0, -1];
        }
        break;
      case '$dteq':
        if (Comparators.lt(val, minVal, false) || Comparators.gt(val, maxVal, false)) {
          return [0, -1];
        }
        break;
      case '$gt':
        // none are within range
        if (Comparators.gt(val, maxVal, true)) {
          return [0, -1];
        }
        // all are within range
        if (Comparators.gt(minVal, val, false)) {
          return [min, max];
        }
        break;
      case '$gte':
        // none are within range
        if (Comparators.gt(val, maxVal, false)) {
          return [0, -1];
        }
        // all are within range
        if (Comparators.gt(minVal, val, true)) {
            return [min, max];
        }
        break;
      case '$lt':
        // none are within range
        if (Comparators.lt(val, minVal, true)) {
          return [0, -1];
        }
        // all are within range
        if (Comparators.lt(maxVal, val, false)) {
          return [min, max];
        }
        break;
      case '$lte':
        // none are within range
        if (Comparators.lt(val, minVal, false)) {
          return [0, -1];
        }
        // all are within range
        if (Comparators.lt(maxVal, val, true)) {
          return [min, max];
        }
        break;
      case '$between':
        // none are within range (low range is greater)
        if (Comparators.gt(val[0], maxVal, false)) {
          return [0, -1];
        }
        // none are within range (high range lower)
        if (Comparators.lt(val[1], minVal, false)) {
          return [0, -1];
        }

        lbound = this.calculateRangeStart(prop, val[0]);
        ubound = this.calculateRangeEnd(prop, val[1]);

        if (lbound < 0) lbound++;
        if (ubound > max) ubound--;

        if (!Comparators.gt(rcd[index[lbound]][prop], val[0], true)) lbound++;
        if (!Comparators.lt(rcd[index[ubound]][prop], val[1], true)) ubound--;

        if (ubound < lbound) return [0, -1];

        return ([lbound, ubound]);
      case '$in':
        var idxset = [],
          segResult = [];
        // query each value '$eq' operator and merge the seqment results.
        for (var j = 0, len = val.length; j < len; j++) {
            var seg = this.calculateRange('$eq', prop, val[j]);

            for (var i = seg[0]; i <= seg[1]; i++) {
                if (idxset[i] === undefined) {
                    idxset[i] = true;
                    segResult.push(i);
                }
            }
        }
        return segResult;
      }

      // determine lbound where needed
      switch (op) {
        case '$eq':
        case '$aeq':
        case '$dteq':
        case '$gte':
        case '$lt':
          lbound = this.calculateRangeStart(prop, val);
          lval = rcd[index[lbound]][prop];
          break;
        default: break;
      }

      // determine ubound where needed
      switch (op) {
        case '$eq':
        case '$aeq':
        case '$dteq':
        case '$lte':
        case '$gt':
          ubound = this.calculateRangeEnd(prop, val);
          uval = rcd[index[ubound]][prop];
          break;
        default: break;
      }


      switch (op) {
      case '$eq':
      case '$aeq':
      case '$dteq':
        // if hole (not found)
        if (!Comparators.aeq(lval, val)) {
          return [0, -1];
        }

        return [lbound, ubound];

      case '$gt':
        // if hole (not found) ub position is already greater
        if (!Comparators.aeq(rcd[index[ubound]][prop], val)) {
          return [ubound, max];
        }
        // otherwise (found) so ubound is still equal, get next
        return [ubound+1, max];

      case '$gte':
        // if hole (not found) lb position marks left outside of range
        if (!Comparators.aeq(rcd[index[lbound]][prop], val)) {
          return [lbound+1, max];
        }
        // otherwise (found) so lb is first position where its equal
        return [lbound, max];

      case '$lt':
        // if hole (not found) position already is less than
        if (!Comparators.aeq(rcd[index[lbound]][prop], val)) {
          return [min, lbound];
        }
        // otherwise (found) so lb marks left inside of eq range, get previous
        return [min, lbound-1];

      case '$lte':
        // if hole (not found) ub position marks right outside so get previous
        if (!Comparators.aeq(rcd[index[ubound]][prop], val)) {
          return [min, ubound-1];
        }
        // otherwise (found) so ub is last position where its still equal
        return [min, ubound];

      default:
        return [0, rcd.length - 1];
      }
    };

    /**
     * Retrieve doc by Unique index
     * @param {string} field - name of uniquely indexed property to use when doing lookup
     * @param {value} value - unique value to search for
     * @returns {object} document matching the value passed
     * @memberof Collection
     */
    Collection.prototype.by = function (field, value) {
      var self;
      if (value === undefined) {
        self = this;
        return function (value) {
          return self.by(field, value);
        };
      }

      var result = this.constraints.unique[field].get(value);
      if (!this.cloneObjects) {
        return result;
      } else {
        return clone(result, this.cloneMethod);
      }
    };

    /**
     * Find one object by index property, by property equal to value
     * @param {object} query - query object used to perform search with
     * @returns {(object|null)} First matching document, or null if none
     * @memberof Collection
     */
    Collection.prototype.findOne = function (query) {
      query = query || {};

      // Instantiate Resultset and exec find op passing firstOnly = true param
      var result = this.chain().find(query,true).data();

      if (Array.isArray(result) && result.length === 0) {
        return null;
      } else {
        if (!this.cloneObjects) {
          return result[0];
        } else {
          return clone(result[0], this.cloneMethod);
        }
      }
    };

    /**
     * Chain method, used for beginning a series of chained find() and/or view() operations
     * on a collection.
     *
     * @param {string|array=} transform - named transform or array of transform steps
     * @param {object=} parameters - Object containing properties representing parameters to substitute
     * @returns {Resultset} (this) resultset, or data array if any map or join functions where called
     * @memberof Collection
     */
    Collection.prototype.chain = function (transform, parameters) {
      var rs = new Resultset(this);

      if (typeof transform === 'undefined') {
        return rs;
      }

      return rs.transform(transform, parameters);
    };

    /**
     * Find method, api is similar to mongodb.
     * for more complex queries use [chain()]{@link Collection#chain} or [where()]{@link Collection#where}.
     * @example {@tutorial Query Examples}
     * @param {object} query - 'mongo-like' query object
     * @returns {array} Array of matching documents
     * @memberof Collection
     */
    Collection.prototype.find = function (query) {
      return this.chain().find(query).data();
    };

    /**
     * Find object by unindexed field by property equal to value,
     * simply iterates and returns the first element matching the query
     */
    Collection.prototype.findOneUnindexed = function (prop, value) {
      var i = this.data.length,
        doc;
      while (i--) {
        if (this.data[i][prop] === value) {
          doc = this.data[i];
          return doc;
        }
      }
      return null;
    };

    /**
     * Transaction methods
     */

    /** start the transation */
    Collection.prototype.startTransaction = function () {
      if (this.transactional) {
        this.cachedData = clone(this.data, this.cloneMethod);
        this.cachedIndex = this.idIndex;
        this.cachedBinaryIndex = this.binaryIndices;

        // propagate startTransaction to dynamic views
        for (var idx = 0; idx < this.DynamicViews.length; idx++) {
          this.DynamicViews[idx].startTransaction();
        }
      }
    };

    /** commit the transation */
    Collection.prototype.commit = function () {
      if (this.transactional) {
        this.cachedData = null;
        this.cachedIndex = null;
        this.cachedBinaryIndex = null;

        // propagate commit to dynamic views
        for (var idx = 0; idx < this.DynamicViews.length; idx++) {
          this.DynamicViews[idx].commit();
        }
      }
    };

    /** roll back the transation */
    Collection.prototype.rollback = function () {
      if (this.transactional) {
        if (this.cachedData !== null && this.cachedIndex !== null) {
          this.data = this.cachedData;
          this.idIndex = this.cachedIndex;
          this.binaryIndices = this.cachedBinaryIndex;
        }

        // propagate rollback to dynamic views
        for (var idx = 0; idx < this.DynamicViews.length; idx++) {
          this.DynamicViews[idx].rollback();
        }
      }
    };

    // async executor. This is only to enable callbacks at the end of the execution.
    Collection.prototype.async = function (fun, callback) {
      setTimeout(function () {
        if (typeof fun === 'function') {
          fun();
          callback();
        } else {
          throw new TypeError('Argument passed for async execution is not a function');
        }
      }, 0);
    };

    /**
     * Query the collection by supplying a javascript filter function.
     * @example
     * var results = coll.where(function(obj) {
     *   return obj.legs === 8;
     * });
     *
     * @param {function} fun - filter function to run against all collection docs
     * @returns {array} all documents which pass your filter function
     * @memberof Collection
     */
    Collection.prototype.where = function (fun) {
      return this.chain().where(fun).data();
    };

    /**
     * Map Reduce operation
     *
     * @param {function} mapFunction - function to use as map function
     * @param {function} reduceFunction - function to use as reduce function
     * @returns {data} The result of your mapReduce operation
     * @memberof Collection
     */
    Collection.prototype.mapReduce = function (mapFunction, reduceFunction) {
      try {
        return reduceFunction(this.data.map(mapFunction));
      } catch (err) {
        throw err;
      }
    };

    /**
     * Join two collections on specified properties
     *
     * @param {array|Resultset|Collection} joinData - array of documents to 'join' to this collection
     * @param {string} leftJoinProp - property name in collection
     * @param {string} rightJoinProp - property name in joinData
     * @param {function=} mapFun - (Optional) map function to use
     * @param {object=} dataOptions - options to data() before input to your map function
     * @param {bool} dataOptions.removeMeta - allows removing meta before calling mapFun
     * @param {boolean} dataOptions.forceClones - forcing the return of cloned objects to your map object
     * @param {string} dataOptions.forceCloneMethod - Allows overriding the default or collection specified cloning method.
     * @returns {Resultset} Result of the mapping operation
     * @memberof Collection
     */
    Collection.prototype.eqJoin = function (joinData, leftJoinProp, rightJoinProp, mapFun, dataOptions) {
      // logic in Resultset class
      return new Resultset(this).eqJoin(joinData, leftJoinProp, rightJoinProp, mapFun, dataOptions);
    };

    /* ------ STAGING API -------- */
    /**
     * stages: a map of uniquely identified 'stages', which hold copies of objects to be
     * manipulated without affecting the data in the original collection
     */
    Collection.prototype.stages = {};

    /**
     * (Staging API) create a stage and/or retrieve it
     * @memberof Collection
     */
    Collection.prototype.getStage = function (name) {
      if (!this.stages[name]) {
        this.stages[name] = {};
      }
      return this.stages[name];
    };
    /**
     * a collection of objects recording the changes applied through a commmitStage
     */
    Collection.prototype.commitLog = [];

    /**
     * (Staging API) create a copy of an object and insert it into a stage
     * @memberof Collection
     */
    Collection.prototype.stage = function (stageName, obj) {
      var copy = JSON.parse(JSON.stringify(obj));
      this.getStage(stageName)[obj.$loki] = copy;
      return copy;
    };

    /**
     * (Staging API) re-attach all objects to the original collection, so indexes and views can be rebuilt
     * then create a message to be inserted in the commitlog
     * @param {string} stageName - name of stage
     * @param {string} message
     * @memberof Collection
     */
    Collection.prototype.commitStage = function (stageName, message) {
      var stage = this.getStage(stageName),
        prop,
        timestamp = new Date().getTime();

      for (prop in stage) {

        this.update(stage[prop]);
        this.commitLog.push({
          timestamp: timestamp,
          message: message,
          data: JSON.parse(JSON.stringify(stage[prop]))
        });
      }
      this.stages[stageName] = {};
    };

    Collection.prototype.no_op = function () {
      return;
    };

    /**
     * @memberof Collection
     */
    Collection.prototype.extract = function (field) {
      var i = 0,
        len = this.data.length,
        isDotNotation = isDeepProperty(field),
        result = [];
      for (i; i < len; i += 1) {
        result.push(deepProperty(this.data[i], field, isDotNotation));
      }
      return result;
    };

    /**
     * @memberof Collection
     */
    Collection.prototype.max = function (field) {
      return Math.max.apply(null, this.extract(field));
    };

    /**
     * @memberof Collection
     */
    Collection.prototype.min = function (field) {
      return Math.min.apply(null, this.extract(field));
    };

    /**
     * @memberof Collection
     */
    Collection.prototype.maxRecord = function (field) {
      var i = 0,
        len = this.data.length,
        deep = isDeepProperty(field),
        result = {
          index: 0,
          value: undefined
        },
        max;

      for (i; i < len; i += 1) {
        if (max !== undefined) {
          if (max < deepProperty(this.data[i], field, deep)) {
            max = deepProperty(this.data[i], field, deep);
            result.index = this.data[i].$loki;
          }
        } else {
          max = deepProperty(this.data[i], field, deep);
          result.index = this.data[i].$loki;
        }
      }
      result.value = max;
      return result;
    };

    /**
     * @memberof Collection
     */
    Collection.prototype.minRecord = function (field) {
      var i = 0,
        len = this.data.length,
        deep = isDeepProperty(field),
        result = {
          index: 0,
          value: undefined
        },
        min;

      for (i; i < len; i += 1) {
        if (min !== undefined) {
          if (min > deepProperty(this.data[i], field, deep)) {
            min = deepProperty(this.data[i], field, deep);
            result.index = this.data[i].$loki;
          }
        } else {
          min = deepProperty(this.data[i], field, deep);
          result.index = this.data[i].$loki;
        }
      }
      result.value = min;
      return result;
    };

    /**
     * @memberof Collection
     */
    Collection.prototype.extractNumerical = function (field) {
      return this.extract(field).map(parseBase10).filter(Number).filter(function (n) {
        return !(isNaN(n));
      });
    };

    /**
     * Calculates the average numerical value of a property
     *
     * @param {string} field - name of property in docs to average
     * @returns {number} average of property in all docs in the collection
     * @memberof Collection
     */
    Collection.prototype.avg = function (field) {
      return average(this.extractNumerical(field));
    };

    /**
     * Calculate standard deviation of a field
     * @memberof Collection
     * @param {string} field
     */
    Collection.prototype.stdDev = function (field) {
      return standardDeviation(this.extractNumerical(field));
    };

    /**
     * @memberof Collection
     * @param {string} field
     */
    Collection.prototype.mode = function (field) {
      var dict = {},
        data = this.extract(field);
      data.forEach(function (obj) {
        if (dict[obj]) {
          dict[obj] += 1;
        } else {
          dict[obj] = 1;
        }
      });
      var max,
        prop, mode;
      for (prop in dict) {
        if (max) {
          if (max < dict[prop]) {
            mode = prop;
          }
        } else {
          mode = prop;
          max = dict[prop];
        }
      }
      return mode;
    };

    /**
     * @memberof Collection
     * @param {string} field - property name
     */
    Collection.prototype.median = function (field) {
      var values = this.extractNumerical(field);
      values.sort(sub);

      var half = Math.floor(values.length / 2);

      if (values.length % 2) {
        return values[half];
      } else {
        return (values[half - 1] + values[half]) / 2.0;
      }
    };

    /**
     * General utils, including statistical functions
     */
    function isDeepProperty(field) {
      return field.indexOf('.') !== -1;
    }

    function parseBase10(num) {
      return parseFloat(num, 10);
    }

    function isNotUndefined(obj) {
      return obj !== undefined;
    }

    function add(a, b) {
      return a + b;
    }

    function sub(a, b) {
      return a - b;
    }

    function median(values) {
      values.sort(sub);
      var half = Math.floor(values.length / 2);
      return (values.length % 2) ? values[half] : ((values[half - 1] + values[half]) / 2.0);
    }

    function average(array) {
      return (array.reduce(add, 0)) / array.length;
    }

    function standardDeviation(values) {
      var avg = average(values);
      var squareDiffs = values.map(function (value) {
        var diff = value - avg;
        var sqrDiff = diff * diff;
        return sqrDiff;
      });

      var avgSquareDiff = average(squareDiffs);

      var stdDev = Math.sqrt(avgSquareDiff);
      return stdDev;
    }

    function deepProperty(obj, property, isDeep) {
      if (isDeep === false) {
        // pass without processing
        return obj[property];
      }
      var pieces = property.split('.'),
        root = obj;
      while (pieces.length > 0) {
        root = root[pieces.shift()];
      }
      return root;
    }

    function binarySearch(array, item, fun) {
      var lo = 0,
        hi = array.length,
        compared,
        mid;
      while (lo < hi) {
        mid = (lo + hi) >> 1;
        compared = fun.apply(null, [item, array[mid]]);
        if (compared === 0) {
          return {
            found: true,
            index: mid
          };
        } else if (compared < 0) {
          hi = mid;
        } else {
          lo = mid + 1;
        }
      }
      return {
        found: false,
        index: hi
      };
    }

    function BSonSort(fun) {
      return function (array, item) {
        return binarySearch(array, item, fun);
      };
    }

    function KeyValueStore() {}

    KeyValueStore.prototype = {
      keys: [],
      values: [],
      sort: function (a, b) {
        return (a < b) ? -1 : ((a > b) ? 1 : 0);
      },
      setSort: function (fun) {
        this.bs = new BSonSort(fun);
      },
      bs: function () {
        return new BSonSort(this.sort);
      },
      set: function (key, value) {
        var pos = this.bs(this.keys, key);
        if (pos.found) {
          this.values[pos.index] = value;
        } else {
          this.keys.splice(pos.index, 0, key);
          this.values.splice(pos.index, 0, value);
        }
      },
      get: function (key) {
        return this.values[binarySearch(this.keys, key, this.sort).index];
      }
    };

    function UniqueIndex(uniqueField) {
      this.field = uniqueField;
      this.keyMap = {};
      this.lokiMap = {};
    }
    UniqueIndex.prototype.keyMap = {};
    UniqueIndex.prototype.lokiMap = {};
    UniqueIndex.prototype.set = function (obj) {
      var fieldValue = obj[this.field];
      if (fieldValue !== null && typeof (fieldValue) !== 'undefined') {
        if (this.keyMap[fieldValue]) {
          throw new Error('Duplicate key for property ' + this.field + ': ' + fieldValue);
        } else {
          this.keyMap[fieldValue] = obj;
          this.lokiMap[obj.$loki] = fieldValue;
        }
      }
    };
    UniqueIndex.prototype.get = function (key) {
      return this.keyMap[key];
    };

    UniqueIndex.prototype.byId = function (id) {
      return this.keyMap[this.lokiMap[id]];
    };
    /**
     * Updates a document's unique index given an updated object.
     * @param  {Object} obj Original document object
     * @param  {Object} doc New document object (likely the same as obj)
     */
    UniqueIndex.prototype.update = function (obj, doc) {
      if (this.lokiMap[obj.$loki] !== doc[this.field]) {
        var old = this.lokiMap[obj.$loki];
        this.set(doc);
        // make the old key fail bool test, while avoiding the use of delete (mem-leak prone)
        this.keyMap[old] = undefined;
      } else {
        this.keyMap[obj[this.field]] = doc;
      }
    };
    UniqueIndex.prototype.remove = function (key) {
      var obj = this.keyMap[key];
      if (obj !== null && typeof obj !== 'undefined') {
        this.keyMap[key] = undefined;
        this.lokiMap[obj.$loki] = undefined;
      } else {
        throw new Error('Key is not in unique index: ' + this.field);
      }
    };
    UniqueIndex.prototype.clear = function () {
      this.keyMap = {};
      this.lokiMap = {};
    };

    function ExactIndex(exactField) {
      this.index = {};
      this.field = exactField;
    }

    // add the value you want returned to the key in the index
    ExactIndex.prototype = {
      set: function add(key, val) {
        if (this.index[key]) {
          this.index[key].push(val);
        } else {
          this.index[key] = [val];
        }
      },

      // remove the value from the index, if the value was the last one, remove the key
      remove: function remove(key, val) {
        var idxSet = this.index[key];
        for (var i in idxSet) {
          if (idxSet[i] == val) {
            idxSet.splice(i, 1);
          }
        }
        if (idxSet.length < 1) {
          this.index[key] = undefined;
        }
      },

      // get the values related to the key, could be more than one
      get: function get(key) {
        return this.index[key];
      },

      // clear will zap the index
      clear: function clear(key) {
        this.index = {};
      }
    };

    function SortedIndex(sortedField) {
      this.field = sortedField;
    }

    SortedIndex.prototype = {
      keys: [],
      values: [],
      // set the default sort
      sort: function (a, b) {
        return (a < b) ? -1 : ((a > b) ? 1 : 0);
      },
      bs: function () {
        return new BSonSort(this.sort);
      },
      // and allow override of the default sort
      setSort: function (fun) {
        this.bs = new BSonSort(fun);
      },
      // add the value you want returned  to the key in the index
      set: function (key, value) {
        var pos = binarySearch(this.keys, key, this.sort);
        if (pos.found) {
          this.values[pos.index].push(value);
        } else {
          this.keys.splice(pos.index, 0, key);
          this.values.splice(pos.index, 0, [value]);
        }
      },
      // get all values which have a key == the given key
      get: function (key) {
        var bsr = binarySearch(this.keys, key, this.sort);
        if (bsr.found) {
          return this.values[bsr.index];
        } else {
          return [];
        }
      },
      // get all values which have a key < the given key
      getLt: function (key) {
        var bsr = binarySearch(this.keys, key, this.sort);
        var pos = bsr.index;
        if (bsr.found) pos--;
        return this.getAll(key, 0, pos);
      },
      // get all values which have a key > the given key
      getGt: function (key) {
        var bsr = binarySearch(this.keys, key, this.sort);
        var pos = bsr.index;
        if (bsr.found) pos++;
        return this.getAll(key, pos, this.keys.length);
      },

      // get all vals from start to end
      getAll: function (key, start, end) {
        var results = [];
        for (var i = start; i < end; i++) {
          results = results.concat(this.values[i]);
        }
        return results;
      },
      // just in case someone wants to do something smart with ranges
      getPos: function (key) {
        return binarySearch(this.keys, key, this.sort);
      },
      // remove the value from the index, if the value was the last one, remove the key
      remove: function (key, value) {
        var pos = binarySearch(this.keys, key, this.sort).index;
        var idxSet = this.values[pos];
        for (var i in idxSet) {
          if (idxSet[i] == value) idxSet.splice(i, 1);
        }
        if (idxSet.length < 1) {
          this.keys.splice(pos, 1);
          this.values.splice(pos, 1);
        }
      },
      // clear will zap the index
      clear: function () {
        this.keys = [];
        this.values = [];
      }
    };


    Loki.LokiOps = LokiOps;
    Loki.Collection = Collection;
    Loki.KeyValueStore = KeyValueStore;
    Loki.LokiMemoryAdapter = LokiMemoryAdapter;
    Loki.LokiPartitioningAdapter = LokiPartitioningAdapter;
    Loki.LokiLocalStorageAdapter = LokiLocalStorageAdapter;
    Loki.LokiFsAdapter = LokiFsAdapter;
    Loki.persistenceAdapters = {
      fs: LokiFsAdapter,
      localStorage: LokiLocalStorageAdapter
    };
    Loki.aeq = aeqHelper;
    Loki.lt = ltHelper;
    Loki.gt = gtHelper;
    Loki.Comparators = Comparators;
    return Loki;
  }());

}));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(20), __webpack_require__(35)))

/***/ }),
/* 35 */
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
/* 36 */
/***/ (function(module, exports) {



/***/ }),
/* 37 */
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
/* 38 */
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? undefined : _typeof2(exports)) === 'object' && ( false ? undefined : _typeof2(module)) === 'object') module.exports = factory(__webpack_require__(9), __webpack_require__(5));else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(9), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}
})(undefined, function (__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__8__) {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/var installedModules = {};
      /******/
      /******/ // The require function
      /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId]) {
          /******/return installedModules[moduleId].exports;
          /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
          /******/i: moduleId,
          /******/l: false,
          /******/exports: {}
          /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
      }
      /******/
      /******/
      /******/ // expose the modules object (__webpack_modules__)
      /******/__webpack_require__.m = modules;
      /******/
      /******/ // expose the module cache
      /******/__webpack_require__.c = installedModules;
      /******/
      /******/ // define getter function for harmony exports
      /******/__webpack_require__.d = function (exports, name, getter) {
        /******/if (!__webpack_require__.o(exports, name)) {
          /******/Object.defineProperty(exports, name, { enumerable: true, get: getter });
          /******/
        }
        /******/
      };
      /******/
      /******/ // define __esModule on exports
      /******/__webpack_require__.r = function (exports) {
        /******/if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
          /******/
        }
        /******/Object.defineProperty(exports, '__esModule', { value: true });
        /******/
      };
      /******/
      /******/ // create a fake namespace object
      /******/ // mode & 1: value is a module id, require it
      /******/ // mode & 2: merge all properties of value into the ns
      /******/ // mode & 4: return value when already ns object
      /******/ // mode & 8|1: behave like require
      /******/__webpack_require__.t = function (value, mode) {
        /******/if (mode & 1) value = __webpack_require__(value);
        /******/if (mode & 8) return value;
        /******/if (mode & 4 && (typeof value === 'undefined' ? 'undefined' : _typeof2(value)) === 'object' && value && value.__esModule) return value;
        /******/var ns = Object.create(null);
        /******/__webpack_require__.r(ns);
        /******/Object.defineProperty(ns, 'default', { enumerable: true, value: value });
        /******/if (mode & 2 && typeof value != 'string') for (var key in value) {
          __webpack_require__.d(ns, key, function (key) {
            return value[key];
          }.bind(null, key));
        } /******/return ns;
        /******/
      };
      /******/
      /******/ // getDefaultExport function for compatibility with non-harmony modules
      /******/__webpack_require__.n = function (module) {
        /******/var getter = module && module.__esModule ?
        /******/function getDefault() {
          return module['default'];
        } :
        /******/function getModuleExports() {
          return module;
        };
        /******/__webpack_require__.d(getter, 'a', getter);
        /******/return getter;
        /******/
      };
      /******/
      /******/ // Object.prototype.hasOwnProperty.call
      /******/__webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/
      /******/ // __webpack_public_path__
      /******/__webpack_require__.p = "";
      /******/
      /******/
      /******/ // Load entry module and return exports
      /******/return __webpack_require__(__webpack_require__.s = 1);
      /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports) {

      module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

      /***/
    },
    /* 1 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _FluentConnector = __webpack_require__(2);

      var _FluentConnector2 = _interopRequireDefault(_FluentConnector);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      exports.default = _FluentConnector2.default;

      /***/
    },
    /* 2 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      };

      var _slicedToArray = function () {
        function sliceIterator(arr, i) {
          var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;_e = err;
          } finally {
            try {
              if (!_n && _i["return"]) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }return _arr;
        }return function (arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();

      var _awaitToJs = __webpack_require__(3);

      var _awaitToJs2 = _interopRequireDefault(_awaitToJs);

      var _Utilities = __webpack_require__(4);

      var _Utilities2 = _interopRequireDefault(_Utilities);

      var _axios = __webpack_require__(0);

      var _axios2 = _interopRequireDefault(_axios);

      var _fastFluent = __webpack_require__(5);

      var _Connection = __webpack_require__(6);

      var _Connection2 = _interopRequireDefault(_Connection);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _asyncToGenerator(fn) {
        return function () {
          var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
            function step(key, arg) {
              try {
                var info = gen[key](arg);var value = info.value;
              } catch (error) {
                reject(error);return;
              }if (info.done) {
                resolve(value);
              } else {
                return Promise.resolve(value).then(function (value) {
                  step("next", value);
                }, function (err) {
                  step("throw", err);
                });
              }
            }return step("next");
          });
        };
      }

      exports.default = _fastFluent.Interface.compose({
        methods: {
          getToken: function getToken() {
            return localStorage.getItem("formioToken");
          },
          baseUrl: function baseUrl() {
            var _connector = this.connector,
                baseUrl = _connector.baseUrl,
                name = _connector.name;

            if (!baseUrl) {
              throw new Error("You did not provide a baseUrl for the \"" + name + "\" connector");
            }
            return baseUrl.replace(/\/+$/, "");
          },
          get: function get() {
            var _this = this;

            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var error, result, _ref, _ref2;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (_this.ownerEmail) {
                        _this.andWhere("owner", "=", _this.ownerEmail);
                      }
                      error = void 0;
                      result = void 0;
                      _context.next = 5;
                      return (0, _awaitToJs2.default)(_this.httpGET());

                    case 5:
                      _ref = _context.sent;
                      _ref2 = _slicedToArray(_ref, 2);
                      error = _ref2[0];
                      result = _ref2[1];

                      if (!error) {
                        _context.next = 12;
                        break;
                      }

                      console.log(error);
                      throw new Error("Error while getting submissions");

                    case 12:

                      result = _this.jsApplySelect(result.data);
                      result = _this.jsApplyOrderBy(result);

                      return _context.abrupt("return", result);

                    case 15:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, _this);
            }))();
          },
          all: function all() {
            var _this2 = this;

            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      return _context2.abrupt("return", _this2.get());

                    case 1:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, _this2);
            }))();
          },
          insert: function insert(data, options) {
            var _this3 = this;

            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var _ref3, _ref4, error, result;

              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      if (!Array.isArray(data)) {
                        _context3.next = 2;
                        break;
                      }

                      return _context3.abrupt("return", _this3.ArrayInsert(data, options));

                    case 2:
                      _context3.next = 4;
                      return (0, _awaitToJs2.default)(_this3.httpPOST(data));

                    case 4:
                      _ref3 = _context3.sent;
                      _ref4 = _slicedToArray(_ref3, 2);
                      error = _ref4[0];
                      result = _ref4[1];

                      if (!error) {
                        _context3.next = 11;
                        break;
                      }

                      console.log(error);
                      throw new Error("Cannot insert data");

                    case 11:
                      return _context3.abrupt("return", result.data);

                    case 12:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, _this3);
            }))();
          },
          update: function update(data) {
            var _this4 = this;

            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              var _ref5, _ref6, error, result;

              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      if (data._id) {
                        _context4.next = 2;
                        break;
                      }

                      throw new Error("Formio connector error. Cannot update a Model without _id key");

                    case 2:
                      if (!data._id.includes("_local")) {
                        _context4.next = 4;
                        break;
                      }

                      throw new Error("Formio connector error. Cannot update a local document");

                    case 4:
                      _context4.next = 6;
                      return (0, _awaitToJs2.default)(_this4.httpPUT(data));

                    case 6:
                      _ref5 = _context4.sent;
                      _ref6 = _slicedToArray(_ref5, 2);
                      error = _ref6[0];
                      result = _ref6[1];

                      if (!error) {
                        _context4.next = 13;
                        break;
                      }

                      console.log(error);
                      throw new Error("Cannot insert data");

                    case 13:
                      return _context4.abrupt("return", result.data);

                    case 14:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, _this4);
            }))();
          },
          clear: function clear() {
            var _this5 = this;

            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
              var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                  sure = _ref7.sure;

              var promises, _ref8, _ref9, error, data;

              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      if (!(!sure || sure !== true)) {
                        _context5.next = 2;
                        break;
                      }

                      throw new Error('Clear() method will delete everything!, you must set the "sure" parameter "clear({sure:true})" to continue');

                    case 2:
                      promises = [];
                      _context5.next = 5;
                      return (0, _awaitToJs2.default)(_this5.select("_id").pluck("_id"));

                    case 5:
                      _ref8 = _context5.sent;
                      _ref9 = _slicedToArray(_ref8, 2);
                      error = _ref9[0];
                      data = _ref9[1];

                      if (!error) {
                        _context5.next = 12;
                        break;
                      }

                      console.log(error);
                      throw new Error("Cannot get remote Model");

                    case 12:

                      data.forEach(function (_id) {
                        promises.push(_this5.httpDelete(_id));
                      });

                      return _context5.abrupt("return", _axios2.default.all(promises));

                    case 14:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5, _this5);
            }))();
          },
          remove: function remove(_id) {
            var _this6 = this;

            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
              var _ref10, _ref11, error, removed;

              return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return (0, _awaitToJs2.default)(_this6.httpDelete(_id));

                    case 2:
                      _ref10 = _context6.sent;
                      _ref11 = _slicedToArray(_ref10, 2);
                      error = _ref11[0];
                      removed = _ref11[1];

                      if (!error) {
                        _context6.next = 9;
                        break;
                      }

                      console.log(error);
                      throw new Error("FormioConnector: Could not delete " + _id);

                    case 9:
                      return _context6.abrupt("return", removed);

                    case 10:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6, _this6);
            }))();
          },
          find: function find(_id) {
            var _this7 = this;

            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
              var _ref12, _ref13, error, data;

              return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      if (!(typeof _id !== "string")) {
                        _context7.next = 2;
                        break;
                      }

                      throw new Error('Formio connector find() method only accepts strings "' + (typeof _id === "undefined" ? "undefined" : _typeof(_id)) + '" given "' + _id + '"');

                    case 2:
                      _context7.next = 4;
                      return (0, _awaitToJs2.default)(_this7.where("_id", "=", _id).first());

                    case 4:
                      _ref12 = _context7.sent;
                      _ref13 = _slicedToArray(_ref12, 2);
                      error = _ref13[0];
                      data = _ref13[1];

                      if (!error) {
                        _context7.next = 11;
                        break;
                      }

                      console.log(error);
                      throw new Error("Find() could not get remote data");

                    case 11:
                      return _context7.abrupt("return", data);

                    case 12:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee7, _this7);
            }))();
          },
          getUrl: function getUrl() {
            var _this8 = this;

            var baseUrl = this && this.baseUrl() ? this.baseUrl() : undefined;
            var path = _Utilities2.default.get(function () {
              return _this8.remoteConnection.path;
            }, undefined);
            var id = _Utilities2.default.get(function () {
              return _this8.remoteConnection.id;
            }, undefined);
            var pullForm = _Utilities2.default.get(function () {
              return _this8.remoteConnection.pullForm;
            }, undefined);

            if (!pullForm && path) {
              path = !id ? path + "/submission" : path + "/submission/" + id;
            }

            if (!baseUrl) {
              throw new Error("Cannot get remote model. baseUrl not defined");
            }

            if (path) {
              return baseUrl + "/" + path;
            }
            return baseUrl;
          },
          getHeaders: function getHeaders() {
            var headers = {};
            var token = localStorage.getItem("formioToken");

            if (this.remoteConnection.token || this.remoteConnection.token === "") {
              token = this.remoteConnection.token;
            }

            if (!token) {
              return headers;
            }

            var type = this.getTokenType(token);
            headers[type] = token;
            return headers;
          },
          getSpacer: function getSpacer(url) {
            return url.substr(url.length - 1) === "&" ? "" : "&";
          },
          httpGET: function httpGET() {
            var url = this.getUrl();
            var headers = this.getHeaders();
            var filters = this.getFilters();
            var limit = this.getLimit();
            var skip = this.getSkip();
            var select = this.getSelect();
            var spacer = "";

            // Always limit the amount of requests
            url = url + spacer + limit;

            url = filters ? url + this.getSpacer(url) + filters : url;

            url = skip ? url + this.getSpacer(url) + skip : url;

            url = select ? url + this.getSpacer(url) + select : url;

            if (!_Connection2.default.isOnline()) {
              throw new Error("Cannot make get request to " + url + ".You are not online");
            }

            return _axios2.default.get(url, { headers: headers });
          },
          httpPOST: function httpPOST(data) {
            var url = this.getUrl();
            var headers = this.getHeaders();

            if (!_Connection2.default.isOnline()) {
              throw new Error("Cannot make request post to " + url + ".You are not online");
            }
            return _axios2.default.post(url, data, { headers: headers });
          },
          httpPUT: function httpPUT(data) {
            var url = this.getUrl() + "/" + data._id;
            var headers = this.getHeaders();

            if (!_Connection2.default.isOnline()) {
              throw new Error("Cannot make request post to " + url + ".You are not online");
            }
            return _axios2.default.put(url, data, { headers: headers });
          },
          httpDelete: function httpDelete(_id) {
            var headers = this.getHeaders();
            var url = this.getUrl() + "/" + _id;

            return _axios2.default.delete(url, { headers: headers });
          },
          getTokenType: function getTokenType(token) {
            if (token.length > 32) {
              return "x-jwt-token";
            }
            return "x-token";
          },
          getFilters: function getFilters() {
            var filter = this.whereArray;

            if (!filter || filter.length === 0) {
              return undefined;
            }

            var filterQuery = "";

            filter.forEach(function (condition) {
              var valueString = "";
              var element = condition[0];
              var operator = condition[1];
              var value = condition[2];

              switch (operator) {
                case "=":
                  filterQuery = filterQuery + element + "=" + value + "&";
                  break;
                case "!=":
                  filterQuery = filterQuery + element + "__ne=" + value + "&";
                  break;
                case ">":
                  filterQuery = filterQuery + element + "__gt=" + value + "&";
                  break;
                case ">=":
                  filterQuery = filterQuery + element + "__gte=" + value + "&";
                  break;
                case "<":
                  filterQuery = filterQuery + element + "__lt=" + value + "&";
                  break;
                case "<=":
                  filterQuery = filterQuery + element + "__lte=" + value + "&";
                  break;
                case "in":
                  valueString = "";
                  value.forEach(function (val, index, array) {
                    valueString = index === array.length - 1 ? valueString + val : valueString + val + ",";
                  });
                  filterQuery = filterQuery + element + "__in=" + valueString + "&";
                  break;
                case "nin":
                  valueString = "";
                  value.forEach(function (val, index, array) {
                    valueString = index === array.length - 1 ? valueString + val : valueString + val + ",";
                  });
                  filterQuery = filterQuery + element + "__nin=" + valueString + "&";
                  break;
                case "exists":
                  filterQuery = filterQuery + element + "__exists=" + true + "&";
                  break;
                case "!exists":
                  filterQuery = filterQuery + element + "__exists=" + false + "&";
                  break;
                case "regex":
                  filterQuery = filterQuery + element + "__regex=" + value + "&";
                  break;
              }
            });
            return filterQuery.substring(0, filterQuery.length - 1);
          },
          getLimit: function getLimit() {
            var limit = "?limit=";

            if (!this.limitNumber || this.limitNumber === 0) {
              this.limitNumber = 50;
            }

            return "" + limit + this.limitNumber;
          },
          getSkip: function getSkip() {
            var skip = "skip=";

            if (!this.offsetNumber) {
              this.offsetNumber = 0;
            }

            return skip + this.offsetNumber;
          },
          getSelect: function getSelect() {
            var select = this.selectArray;

            select = select.map(function (e) {
              return e.split(" as ")[0];
            });

            if (!select) {
              return;
            }

            return "select=" + select.join(",");
          }
        }
      });

      /***/
    },
    /* 3 */
    /***/function (module, __webpack_exports__, __webpack_require__) {

      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */__webpack_require__.d(__webpack_exports__, "to", function () {
        return to;
      });
      /**
       * @param { Promise } promise
       * @param { Object= } errorExt - Additional Information you can pass to the err object
       * @return { Promise }
       */
      function to(promise, errorExt) {
        return promise.then(function (data) {
          return [null, data];
        }).catch(function (err) {
          if (errorExt) {
            Object.assign(err, errorExt);
          }
          return [err, undefined];
        });
      }

      /* harmony default export */__webpack_exports__["default"] = to;
      //# sourceMappingURL=await-to-js.es5.js.map


      /***/
    },
    /* 4 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }return target;
      };

      var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
      };

      function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
          }return arr2;
        } else {
          return Array.from(arr);
        }
      }

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
        /**
         * Recursively removes all NULL values
         * from an Object or an Array
         *
         * @static
         * @param {Array|Object} object Array, Object to clean
         * @returns {Array|Object} returns the cleaned value
         */
        var deleteNulls = function deleteNulls(object) {
          var obj = object;
          var isArray = obj instanceof Array;

          for (var k in obj) {
            if (obj[k] === null) isArray ? obj.splice(k, 1) : delete obj[k];else if (_typeof(obj[k]) === 'object') deleteNulls(obj[k]);
          }
          return obj;
        };

        var eachComponent = function eachComponent(components, fn, includeAll, path, parent) {
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
            var newPath = component.key ? path ? path + '.' + component.key : component.key : '';

            // Keep track of parent references.
            if (parent) {
              // Ensure we don't create infinite JSON structures.
              component.parent = _extends({}, parent);
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
                return newPath + '.data';
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
        };

        var matchComponent = function matchComponent(component, query) {
          if (typeof query === 'string') {
            return component.key === query;
          }
          var matches = false;

          Object.keys(query).forEach(function (path) {
            matches = getFromPath(component, path).value === query[path];
            if (!matches) {
              return false;
            }
          });
          return matches;
        };

        var findComponents = function findComponents(components, query) {
          var results = [];

          eachComponent(components, function (component, path) {
            if (matchComponent(component, query)) {
              component.path = path;
              results.push(component);
            }
          }, true);
          return results;
        };

        var unixDate = function unixDate() {
          return Math.round(+new Date() / 1000);
        };

        return Object.freeze({
          cloneDeep: cloneDeep,
          get: get,
          orderBy: orderBy,
          isEmpty: isEmpty,
          debounce: debounce,
          getFromPath: getFromPath,
          deleteNulls: deleteNulls,
          eachComponent: eachComponent,
          findComponents: findComponents,
          unixDate: unixDate
        });
      }();

      exports.default = Utilities;

      /***/
    },
    /* 5 */
    /***/function (module, exports, __webpack_require__) {

      !function (e, t) {
        true ? module.exports = t() : undefined;
      }(this, function () {
        return function (e) {
          var t = {};function r(n) {
            if (t[n]) return t[n].exports;var o = t[n] = { i: n, l: !1, exports: {} };return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports;
          }return r.m = e, r.c = t, r.d = function (e, t, n) {
            r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
          }, r.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
          }, r.t = function (e, t) {
            if (1 & t && (e = r(e)), 8 & t) return e;if (4 & t && "object" == (typeof e === 'undefined' ? 'undefined' : _typeof2(e)) && e && e.__esModule) return e;var n = Object.create(null);if (r.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var o in e) {
              r.d(n, o, function (t) {
                return e[t];
              }.bind(null, o));
            }return n;
          }, r.n = function (e) {
            var t = e && e.__esModule ? function () {
              return e.default;
            } : function () {
              return e;
            };return r.d(t, "a", t), t;
          }, r.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }, r.p = "", r(r.s = 12);
        }([function (e, t, r) {
          var n = r(2),
              o = r(16),
              i = r(6),
              a = r(17),
              s = r(1),
              c = r(3),
              u = r(8),
              f = r(7),
              l = Array.prototype.concat;function p() {
            var e = l.apply([], arguments).filter(c);return 0 === e.length ? void 0 : e;
          }function d(e) {
            if (!s(e)) return e;var t = e.methods,
                r = e.properties,
                n = e.props,
                o = e.initializers,
                i = e.init,
                c = e.composers,
                l = e.deepProperties,
                d = e.deepProps,
                h = e.propertyDescriptors,
                v = e.staticProperties,
                m = e.statics,
                g = e.staticDeepProperties,
                y = e.deepStatics,
                w = e.configuration,
                b = e.conf,
                A = e.deepConfiguration,
                P = e.deepConf,
                _ = s(n) || s(r) ? f({}, n, r) : void 0,
                E = s(d) ? u({}, d) : void 0;E = s(l) ? u(E, l) : E;var O = s(m) || s(v) ? f({}, m, v) : void 0,
                x = s(y) ? u({}, y) : void 0;x = s(g) ? u(x, g) : x;var F = e.staticPropertyDescriptors;a(e.name) && (F = f({}, F || {}, { name: { value: e.name } }));var j = s(b) || s(w) ? f({}, b, w) : void 0,
                C = s(P) ? u({}, P) : void 0;C = s(A) ? u(C, A) : C;var N = p(i, o),
                M = p(c),
                R = {};return t && (R.methods = t), _ && (R.properties = _), N && (R.initializers = N), M && (R.composers = M), E && (R.deepProperties = E), O && (R.staticProperties = O), x && (R.staticDeepProperties = x), h && (R.propertyDescriptors = h), F && (R.staticPropertyDescriptors = F), j && (R.configuration = j), C && (R.deepConfiguration = C), R;
          }function h() {
            "use strict";
            for (var e = arguments.length, t = [], r = 0; r < e; r += 1) {
              var o = arguments[r];t.push(i(o) ? o : d(o));
            }return n.apply(this || v, t);
          }var v = o.compose({ staticProperties: { create: function create() {
                return this.apply(this, arguments);
              }, compose: h } }),
              m = o.compose.staticProperties;for (var g in m) {
            h[g] = m[g].bind(v);
          }h.compose = h.bind(), e.exports = h;
        }, function (e, t) {
          e.exports = function (e) {
            var t = typeof e === 'undefined' ? 'undefined' : _typeof2(e);return Boolean(e) && ("object" === t || "function" === t);
          };
        }, function (e, t, r) {
          var n = r(5),
              o = r(3),
              i = r(1),
              a = r(6),
              s = r(14),
              c = r(7),
              u = r(8),
              f = Array.prototype.slice;function l(e, t) {
            var r = function e(t) {
              var r = e.compose || {},
                  n = { __proto__: r.methods };if (u(n, r.deepProperties), c(n, r.properties), Object.defineProperties(n, r.propertyDescriptors || {}), !r.initializers || 0 === r.initializers.length) return n;void 0 === t && (t = {});for (var i = r.initializers, a = i.length, s = 0; s < a; s += 1) {
                var l = i[s];if (o(l)) {
                  var p = l.call(n, t, { instance: n, stamp: e, args: f.apply(arguments) });n = void 0 === p ? n : p;
                }
              }return n;
            };e.staticDeepProperties && u(r, e.staticDeepProperties), e.staticProperties && c(r, e.staticProperties), e.staticPropertyDescriptors && Object.defineProperties(r, e.staticPropertyDescriptors);var n = o(r.compose) ? r.compose : t;return r.compose = function () {
              "use strict";
              return n.apply(this, arguments);
            }, c(r.compose, e), r;
          }function p(e, t, r) {
            if (n(t)) {
              var i = t.length,
                  a = e[r] || [];e[r] = a;for (var s = 0; s < i; s += 1) {
                var c = t[s];o(c) && a.indexOf(c) < 0 && a.push(c);
              }
            }
          }function d(e, t, r, n) {
            i(t[r]) && (i(e[r]) || (e[r] = {}), n(e[r], t[r]));
          }function h(e, t, r) {
            d(e, t, r, u);
          }function v(e, t, r) {
            d(e, t, r, c);
          }function m(e, t) {
            var r = t && t.compose || t;v(e, r, "methods"), v(e, r, "properties"), h(e, r, "deepProperties"), v(e, r, "propertyDescriptors"), v(e, r, "staticProperties"), h(e, r, "staticDeepProperties"), v(e, r, "staticPropertyDescriptors"), v(e, r, "configuration"), h(e, r, "deepConfiguration"), p(e, r.initializers, "initializers"), p(e, r.composers, "composers");
          }e.exports = function e() {
            "use strict";
            var t = {},
                r = [];s(this) && (m(t, this), r.push(this));for (var o = 0; o < arguments.length; o++) {
              var i = arguments[o];s(i) && (m(t, i), r.push(i));
            }var c = l(t, e),
                u = t.composers;if (n(u) && u.length > 0) for (var f = 0; f < u.length; f += 1) {
              var p = (0, u[f])({ stamp: c, composables: r });c = a(p) ? p : c;
            }return c;
          };
        }, function (e, t) {
          e.exports = function (e) {
            return "function" == typeof e;
          };
        }, function (e, t) {
          var r;r = function () {
            return this;
          }();try {
            r = r || Function("return this")() || (0, eval)("this");
          } catch (e) {
            "object" == (typeof window === 'undefined' ? 'undefined' : _typeof2(window)) && (r = window);
          }e.exports = r;
        }, function (e, t) {
          e.exports = Array.isArray;
        }, function (e, t, r) {
          var n = r(3);e.exports = function (e) {
            return n(e) && n(e.compose);
          };
        }, function (e, t) {
          e.exports = Object.assign;
        }, function (e, t, r) {
          var n = r(15),
              o = r(1),
              i = r(5);function a(e, t) {
            if (void 0 === t) return e;if (i(t)) return (i(e) ? e : []).concat(t);if (!n(t)) return t;for (var r = o(e) ? e : {}, s = Object.keys(t), c = 0; c < s.length; c += 1) {
              var u = s[c],
                  f = t[u];if (void 0 !== f) {
                var l = r[u],
                    p = n(l) || i(f) ? l : {};r[u] = a(p, f);
              }
            }return r;
          }e.exports = function (e) {
            for (var t = 1; t < arguments.length; t++) {
              e = a(e, arguments[t]);
            }return e;
          };
        }, function (e, t, r) {
          "use strict";
          (function (e) {
            Object.defineProperty(t, "__esModule", { value: !0 });var n = i(r(0)),
                o = i(r(18));function i(e) {
              return e && e.__esModule ? e : { default: e };
            }t.default = (0, n.default)({ properties: { name: "baseModel", config: { remote: { path: void 0, token: void 0, pullForm: !1 }, local: { connector: "loki" }, merge: { connector: "formio-loki" } } }, methods: { getModelName: function getModelName() {
                  return this.name;
                }, getFluentConfig: function getFluentConfig() {
                  var t = void 0;return "undefined" != typeof window && window && window._FLUENT_ ? t = window._FLUENT_ : e && e._FLUENT_ && (t = e._FLUENT_), t;
                }, getConnector: function getConnector(e, t) {
                  return Array.isArray(e) ? this.getConnectorFromArray(e, t) : e instanceof Object ? e : void 0;
                }, getConnectorFromArray: function getConnectorFromArray(e, t) {
                  var r = this;if (1 === e.length) return e[0];if (this.config && this.config[t] && this.config[t].connector) {
                    var n = e.find(function (e) {
                      return e.name === r.config[t].connector;
                    });if (n instanceof Object) return n;
                  }var o = e.find(function (e) {
                    return e.default;
                  });return o instanceof Object ? o : void 0;
                }, remote: function remote() {
                  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                      t = e.token,
                      r = void 0 === t ? void 0 : t,
                      n = e.pullForm,
                      o = void 0 === n ? void 0 : n,
                      i = this.getFluentConfig(),
                      a = i && i.connectors && i.connectors.remote;if (!a) throw new Error("No remote connector was defined. Please define it using Fluent.config()");var s = this.getConnector(a, "remote");if (this.config.remote.token = r || this.config.remote.token, o && (this.config.remote.pullForm = o || this.config.remote.pullForm), s) return s.connector({ remoteConnection: this.config.remote, connector: s });throw new Error("No default remote connector found. Please assign one as your default in Fluent.config");
                }, local: function local() {
                  var e = this.getFluentConfig(),
                      t = e && e.connectors && e.connectors.local;if (!t) throw new Error("No local connector was defined. Please define it using Fluent.config()");var r = this.getConnector(t, "local");if (r) return r.connector({ name: this.name, connector: r });throw new Error("No default local connector found. Please assign one as your default in Fluent.config");
                }, merged: function merged() {
                  var e = this.local(),
                      t = this.remote(),
                      r = this.getFluentConfig(),
                      n = r && r.connectors && r.connectors.merge;if (!n) throw new Error("No merge connector was defined. Please define it using Fluent.config()");var o = this.getConnector(n, "merge");if (o) return o.connector({ local: e, remote: t, name: this.name, connector: o });throw new Error("No default merge connector found. Please assign one as your default in Fluent.config");
                } } }).compose(o.default);
          }).call(this, r(4));
        }, function (e, t, r) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 });var n = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t];for (var n in r) {
                Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
              }
            }return e;
          },
              o = a(r(0)),
              i = a(r(11));function a(e) {
            return e && e.__esModule ? e : { default: e };
          }function s(e) {
            if (Array.isArray(e)) {
              for (var t = 0, r = Array(e.length); t < e.length; t++) {
                r[t] = e[t];
              }return r;
            }return Array.from(e);
          }t.default = (0, o.default)({ init: function init(e) {
              if (!Array.isArray(e)) throw new Error("Collect method only accepts arrays of data");this.data = e;
            }, properties: { data: [] }, methods: { get: function get() {
                return this.data;
              }, all: function all() {
                return this.get();
              }, avg: function avg(e) {
                return this.average(e);
              }, average: function average() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                    t = [].concat(s(this.data)),
                    r = t.reduce(function (t, r) {
                  var n = r;if (r instanceof Object) {
                    var o = i.default.getFromPath(r, e, void 0);void 0 !== o && o.value && (n = o.value);
                  }return t + n;
                }, 0);try {
                  return r / t.length;
                } catch (e) {
                  throw new Error('Division between "' + r + '" and "' + t.length + '" is not valid.');
                }
              }, chunks: function chunks(e) {
                for (var t = [].concat(s(this.data)), r = []; t.length;) {
                  r.push(t.splice(0, e));
                }return this.data = r, this;
              }, collapse: function collapse() {
                var e = [];return [].concat(s(this.data)).forEach(function (t) {
                  Array.isArray(t) ? t.forEach(function (t) {
                    e.push(t);
                  }) : e.push(t);
                }), this.data = e, this;
              }, unChunk: function unChunk() {
                return this.collapse();
              }, combine: function combine(e) {
                var t = void 0;return [].concat(s(this.data)).forEach(function (r, o) {
                  r instanceof Object ? (t || (t = []), t[o] = n({}, r, { _value: e[o] })) : (t || (t = {}), t[r] = e[o]);
                }), this.data = t, this;
              }, concat: function concat(e) {
                return this.data = [].concat(s(this.data), s(e)), this;
              }, contains: function contains() {
                var e = void 0,
                    t = void 0,
                    r = void 0;return 1 === arguments.length ? (this.isFunction(arguments.length <= 0 ? void 0 : arguments[0]) && (r = arguments.length <= 0 ? void 0 : arguments[0]), e = arguments.length <= 0 ? void 0 : arguments[0]) : (e = arguments.length <= 1 ? void 0 : arguments[1], t = arguments.length <= 0 ? void 0 : arguments[0]), [].concat(s(this.data)).some(function (n, o) {
                  if (r) return !!r(n, o);var a = n;if (n instanceof Object) {
                    var s = i.default.getFromPath(n, t, void 0);s.value && (a = s.value);
                  }return a === e;
                });
              }, count: function count() {
                return this.data.length;
              }, isFunction: function isFunction(e) {
                return e && "[object Function]" === {}.toString.call(e);
              } } });
        }, function (e, t, r) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 });var n = function () {
            var e = function e(_e2, t) {
              try {
                return _e2();
              } catch (e) {
                return t;
              }
            };return Object.freeze({ get: e, getFromPath: function getFromPath(t, r, n) {
                var o = r;r.includes(" as ") && (o = (r = r.split(" as "))[0]);var i = e(function () {
                  return Array.isArray(r) && r[1].trim();
                }, void 0);var a = o.replace(/\[/g, ".").replace(/]/g, "").split(".").filter(Boolean).map(function (e) {
                  return e.trim();
                }).every(function (e) {
                  return !(e && void 0 === (t = t[e]));
                }) ? t : n;return { label: i || o, value: a };
              } });
          }();t.default = n;
        }, function (e, t, r) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }), t.Interface = t.Fluent = t.Model = void 0;var n = a(r(13)),
              o = a(r(9)),
              i = a(r(19));function a(e) {
            return e && e.__esModule ? e : { default: e };
          }t.Model = o.default, t.Fluent = n.default, t.Interface = i.default;
        }, function (e, t, r) {
          "use strict";
          (function (e) {
            Object.defineProperty(t, "__esModule", { value: !0 });var n = a(r(0)),
                o = a(r(9)),
                i = a(r(10));function a(e) {
              return e && e.__esModule ? e : { default: e };
            }function s(e) {
              if (Array.isArray(e)) {
                for (var t = 0, r = Array(e.length); t < e.length; t++) {
                  r[t] = e[t];
                }return r;
              }return Array.from(e);
            }var c = (0, n.default)({ init: function init() {
                this.registerGlobalVariable();
              }, properties: {}, methods: { model: function model() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) {
                    t[r] = arguments[r];
                  }return this.registerModel(t), o.default.compose.apply(o.default, s(t));
                }, extend: function extend() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) {
                    t[r] = arguments[r];
                  }return this.registerModel(t), o.default.compose.apply(o.default, s(t));
                }, compose: function compose() {
                  for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) {
                    t[r] = arguments[r];
                  }return this.registerModel(t), o.default.compose.apply(o.default, s(t));
                }, collect: function collect(e) {
                  return (0, i.default)(e);
                }, registerGlobalVariable: function registerGlobalVariable() {
                  "undefined" != typeof window && window && !window._FLUENT_ && (window._FLUENT_ = { connectors: {}, models: {} }), e && !e._FLUENT_ && (e._FLUENT_ = { connectors: {}, models: {} });
                }, registerModel: function registerModel(t) {
                  var r = t && t[0] && t[0].properties && t[0].properties.name ? t[0].properties.name : void 0;if (r && "baseModel" !== r) {
                    if ("string" != typeof r) throw new Error("You must assign a name to your Model when using Fluent.compose");"undefined" == typeof window ? e._FLUENT_.models[r] = !0 : window._FLUENT_.models[r] = !0;
                  }
                }, config: function config(t) {
                  var r = t.REMOTE_CONNECTORS,
                      n = void 0 === r ? void 0 : r,
                      o = t.LOCAL_CONNECTORS,
                      i = void 0 === o ? void 0 : o,
                      a = t.MERGE_CONNECTORS,
                      s = void 0 === a ? void 0 : a;"undefined" != typeof window && window && (window._FLUENT_.connectors = { local: i, remote: n, merge: s }), void 0 !== e && e && (e._FLUENT_.connectors = { local: i, remote: n, merge: s });
                }, getConfig: function getConfig() {
                  return "undefined" != typeof window && window ? window._FLUENT_ : void 0 !== e && e ? e._FLUENT_ : void 0;
                } } })();t.default = c;
          }).call(this, r(4));
        }, function (e, t, r) {
          e.exports = r(1);
        }, function (e, t) {
          e.exports = function (e) {
            return Boolean(e) && "object" == (typeof e === 'undefined' ? 'undefined' : _typeof2(e)) && Object.getPrototypeOf(e) === Object.prototype;
          };
        }, function (e, t, r) {
          var n = r(2);function o(e) {
            return function (t) {
              "use strict";
              var r = {};return r[e] = t, this && this.compose ? this.compose(r) : n(r);
            };
          }var i = o("properties"),
              a = o("staticProperties"),
              s = o("configuration"),
              c = o("deepProperties"),
              u = o("staticDeepProperties"),
              f = o("deepConfiguration"),
              l = o("initializers");e.exports = n({ staticProperties: { methods: o("methods"), props: i, properties: i, statics: a, staticProperties: a, conf: s, configuration: s, deepProps: c, deepProperties: c, deepStatics: u, staticDeepProperties: u, deepConf: f, deepConfiguration: f, init: l, initializers: l, composers: o("composers"), propertyDescriptors: o("propertyDescriptors"), staticPropertyDescriptors: o("staticPropertyDescriptors") } });
        }, function (e, t) {
          e.exports = function (e) {
            return "string" == typeof e;
          };
        }, function (e, t, r) {
          var n = r(2),
              o = new WeakMap(),
              i = function i(e, t) {
            function r() {
              "use strict";
              var t = o.get(this);return e.apply(t, arguments);
            }return Object.defineProperty(r, "name", { value: t, configurable: !0 }), r;
          };function a(e, t) {
            var r = t.stamp.compose,
                n = r.deepConfiguration.Privatize.methods,
                a = {};o.set(a, this);var s = r.methods;if (!s) return a;for (var c = Object.keys(s), u = 0; u < c.length; u++) {
              var f = c[u];n.indexOf(f) < 0 && (a[f] = i(s[f], f));
            }if ("undefined" != typeof Symbol) {
              var l = Symbol.for("stamp");s[l] && (a[l] = t.stamp);
            }return a;
          }var s = n({ initializers: [a], deepConfiguration: { Privatize: { methods: [] } }, staticProperties: { privatizeMethods: function privatizeMethods() {
                "use strict";
                for (var e = [], t = 0; t < arguments.length; t++) {
                  var r = arguments[t];"string" == typeof r && r.length > 0 && e.push(r);
                }return (this && this.compose ? this : s).compose({ deepConfiguration: { Privatize: { methods: e } } });
              } }, composers: [function (e) {
              var t = e.stamp.compose.initializers;t.splice(t.indexOf(a), 1), t.push(a);
            }] });e.exports = s;
        }, function (e, t, r) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 });var n = a(r(0)),
              o = a(r(11)),
              i = a(r(10));function a(e) {
            return e && e.__esModule ? e : { default: e };
          }function s(e) {
            if (Array.isArray(e)) {
              for (var t = 0, r = Array(e.length); t < e.length; t++) {
                r[t] = e[t];
              }return r;
            }return Array.from(e);
          }function c(e) {
            return function () {
              var t = e.apply(this, arguments);return new Promise(function (e, r) {
                return function n(o, i) {
                  try {
                    var a = t[o](i),
                        s = a.value;
                  } catch (e) {
                    return void r(e);
                  }if (!a.done) return Promise.resolve(s).then(function (e) {
                    n("next", e);
                  }, function (e) {
                    n("throw", e);
                  });e(s);
                }("next");
              });
            };
          }t.default = (0, n.default)({ init: function init(e) {
              var t = e.name,
                  r = e.remoteConnection,
                  n = e.connector;if (!t && !r) throw new Error("Model must have a name or path");if (!n) throw new Error("Model must have a connector. Please register one using Fluent.config");this.name = t || this.name, this.remoteConnection = r || this.remoteConnection, this.connector = n || this.connector, this.chainReference = [], this.whereArray = [], this.orWhereArray = [], this.selectArray = [], this.orderByArray = [], this.limitNumber = void 0, this.offsetNumber = void 0, this.populate = [], this.chunk = null, this.pullSize = null, this.ownerEmail = void 0;
            }, properties: { operators: ["=", "<", ">", "<=", ">=", "<>", "!=", "in", "nin", "like", "regexp", "startsWith", "endsWith", "contains"] }, methods: { get: function get() {
                throw new Error("get() method not implemented");
              }, all: function all() {
                throw new Error("all() method not implemented");
              }, find: function find(e) {
                throw new Error("find() method not implemented");
              }, findOne: function findOne() {
                throw new Error("findOne() method not implemented");
              }, remove: function remove() {
                throw new Error("remove() method not implemented");
              }, softDelete: function softDelete() {
                throw new Error("softDelete() method not implemented");
              }, insert: function insert() {
                throw new Error("insert() method not implemented");
              }, update: function update() {
                throw new Error("update() method not implemented");
              }, clear: function clear() {
                throw new Error("clear() method not implemented");
              }, updateOrCreate: function updateOrCreate() {
                throw new Error("updateOrCreate() method not implemented");
              }, findAndRemove: function findAndRemove() {
                throw new Error("findAndRemove() method not implemented");
              }, paginate: function paginate(e, t) {
                throw new Error("paginate() method not implemented");
              }, owner: function owner(e) {
                return this.chainReference.push({ method: "owner", args: e }), this.ownerEmail = e, this;
              }, own: function own(e) {
                return this.owner(e);
              }, first: function first() {
                var e = this;return c(regeneratorRuntime.mark(function t() {
                  var r;return regeneratorRuntime.wrap(function (t) {
                    for (;;) {
                      switch (t.prev = t.next) {case 0:
                          return t.next = 2, e.get();case 2:
                          return r = t.sent, t.abrupt("return", o.default.get(function () {
                            return r[0];
                          }, []));case 4:case "end":
                          return t.stop();}
                    }
                  }, t, e);
                }))();
              }, collect: function collect() {
                var e = this;return c(regeneratorRuntime.mark(function t() {
                  var r;return regeneratorRuntime.wrap(function (t) {
                    for (;;) {
                      switch (t.prev = t.next) {case 0:
                          return t.next = 2, e.get();case 2:
                          if (r = t.sent, Array.isArray(r)) {
                            t.next = 5;break;
                          }throw new Error("Collect method only accepts arrays of data");case 5:
                          return t.abrupt("return", (0, i.default)(r));case 6:case "end":
                          return t.stop();}
                    }
                  }, t, e);
                }))();
              }, select: function select() {
                for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) {
                  t[r] = arguments[r];
                }return t = this.prepareInput(t), this.chainReference.push({ method: "select", args: t }), this.selectArray = this.selectArray.concat(t).filter(function (e, t, r) {
                  return r.indexOf(e) === t;
                }), this;
              }, jsApplySelect: function jsApplySelect(e) {
                var t = this,
                    r = Array.isArray(e) ? [].concat(s(e)) : [e];return this.selectArray.length > 0 && (r = r.map(function (e) {
                  var r = {};return t.selectArray.forEach(function (t) {
                    var n = o.default.getFromPath(e, t, void 0);void 0 !== o.default.get(function () {
                      return n.value;
                    }, void 0) && (r[n.label] = n.value);
                  }), r;
                })), r;
              }, offset: function offset(e) {
                return this.chainReference.push({ method: "offset", args: e }), this.offsetNumber = e, this;
              }, skip: function skip(e) {
                return this.offset(e);
              }, where: function where() {
                for (var e = this, t = arguments.length, r = Array(t), n = 0; n < t; n++) {
                  r[n] = arguments[n];
                }return this.chainReference.push({ method: "where", args: r }), this.whereArray = [], (r = Array.isArray(r[0]) ? r : [r]).forEach(function (t) {
                  if (3 !== t.length) throw new Error('There where clouse is not properly formatted, expecting: ["attribute", "operator","value"] but got "' + JSON.stringify(t) + '" ');e.whereArray.push(t);
                }), this;
              }, andWhere: function andWhere() {
                for (var e = this, t = arguments.length, r = Array(t), n = 0; n < t; n++) {
                  r[n] = arguments[n];
                }return this.chainReference.push({ method: "andWhere", args: r }), (r = Array.isArray(r[0]) ? r : [r]).forEach(function (t) {
                  if (3 !== t.length) throw new Error('There where clouse is not properly formatted, expecting: ["attribute", "operator","value"] but got "' + JSON.stringify(t) + '" ');e.whereArray.push(t);
                }), this;
              }, orWhere: function orWhere() {
                for (var e = this, t = arguments.length, r = Array(t), n = 0; n < t; n++) {
                  r[n] = arguments[n];
                }return this.chainReference.push({ method: "orWhere", args: r }), (r = Array.isArray(r[0]) ? r : [r]).forEach(function (t) {
                  if (3 !== t.length) throw new Error('There orWhere clouse is not properly formatted, expecting: ["attribute", "operator","value"] but got "' + JSON.stringify(t) + '" ');e.orWhereArray.push(t);
                }), this;
              }, limit: function limit(e) {
                return this.chainReference.push({ method: "limit", args: e }), this.limitNumber = e, this;
              }, take: function take(e) {
                return this.limit(e);
              }, pluck: function pluck(e) {
                var t = this;return c(regeneratorRuntime.mark(function r() {
                  var n;return regeneratorRuntime.wrap(function (r) {
                    for (;;) {
                      switch (r.prev = r.next) {case 0:
                          return t.chainReference.push({ method: "pluck", args: e }), r.next = 3, t.get();case 3:
                          return n = (n = r.sent).map(function (t) {
                            var r = o.default.getFromPath(t, e, void 0);if (void 0 !== r.value) return r.value;
                          }), r.abrupt("return", n);case 6:case "end":
                          return r.stop();}
                    }
                  }, r, t);
                }))();
              }, orderBy: function orderBy() {
                for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) {
                  t[r] = arguments[r];
                }return this.chainReference.push({ method: "orderBy", args: t }), this.orderByArray = t, this;
              }, jsApplyOrderBy: function jsApplyOrderBy(e) {
                var t = [].concat(s(e));if (0 === this.orderByArray.length) return t;var r = this.orderByArray[0];if (this.selectArray.length > 0 && (r.includes(".") || r.includes("["))) throw new Error('Cannot orderBy nested attribute "' + r + '" when using Select. You must rename the attribute');var n = this.orderByArray[1],
                    i = this.orderByArray[2];return i || (i = "string"), t = t.sort(function (e, t) {
                  var a = o.default.getFromPath(e, r, void 0).value,
                      s = o.default.getFromPath(t, r, void 0).value;if (void 0 === a || void 0 === s) throw new Error('Cannot order by property "' + r + '" not all values have this property');return i.includes("string") || i.includes("number") ? "asc" === n ? a > s ? 1 : a < s ? -1 : 0 : a > s ? -1 : a < s ? 1 : 0 : i.includes("date") ? "asc" === n ? new Date(a) - new Date(s) : new Date(s) - new Date(a) : void 0;
                });
              }, prepareInput: function prepareInput(e) {
                var t = [];return e.forEach(function (e) {
                  var r = Array.isArray(e) ? e : e.split(",");r = r.map(function (e) {
                    return e.trim();
                  }), t = t.concat(r);
                }), t.filter(function (e, t, r) {
                  return r.indexOf(e) === t;
                }), t;
              }, ArrayInsert: function ArrayInsert(e, t) {
                var r = this;return c(regeneratorRuntime.mark(function n() {
                  var o, i, a, s, c, u, f, l;return regeneratorRuntime.wrap(function (n) {
                    for (;;) {
                      switch (n.prev = n.next) {case 0:
                          o = 1, i = e.length, a = !0, s = !1, c = void 0, n.prev = 5, u = e[Symbol.iterator]();case 7:
                          if (a = (f = u.next()).done) {
                            n.next = 26;break;
                          }return l = f.value, t && t.showProgress && console.log("Inserting " + o + " of " + i), n.prev = 10, n.next = 13, r.insert(l, t);case 13:
                          n.sent, t && t.showProgress && console.log("Element " + o + " inserted"), o++, n.next = 23;break;case 18:
                          n.prev = 18, n.t0 = n.catch(10), console.log("ERROR - Element " + o + " - " + JSON.stringify(l) + " could not be inserted"), console.log(n.t0), o++;case 23:
                          a = !0, n.next = 7;break;case 26:
                          n.next = 32;break;case 28:
                          n.prev = 28, n.t1 = n.catch(5), s = !0, c = n.t1;case 32:
                          n.prev = 32, n.prev = 33, !a && u.return && u.return();case 35:
                          if (n.prev = 35, !s) {
                            n.next = 38;break;
                          }throw c;case 38:
                          return n.finish(35);case 39:
                          return n.finish(32);case 40:case "end":
                          return n.stop();}
                    }
                  }, n, r, [[5, 28, 32, 40], [10, 18], [33,, 35, 39]]);
                }))();
              } } });
        }]);
      });
      //# sourceMappingURL=fast-fluent.min.js.map

      /***/
    },
    /* 6 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _Event = __webpack_require__(7);

      var _Event2 = _interopRequireDefault(_Event);

      var _bluebird = __webpack_require__(8);

      var _bluebird2 = _interopRequireDefault(_bluebird);

      var _axios = __webpack_require__(0);

      var _axios2 = _interopRequireDefault(_axios);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      /* eslint-disable no-unused-vars */
      var Connection = function () {
        var online = typeof window !== 'undefined' && window && window.navigator ? window.navigator.onLine : true;

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
            _axios2.default.get('https://yesno.wtf/api').then(function (res) {
              resolve(true);
            }).catch(function (err) {
              resolve(false);
            });
          });
        }

        return Object.freeze({
          isOnline: isOnline,
          initEventListeners: initEventListeners
        });
      }();

      exports.default = Connection;

      /***/
    },
    /* 7 */
    /***/function (module, exports, __webpack_require__) {

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

      /***/
    },
    /* 8 */
    /***/function (module, exports) {

      module.exports = __WEBPACK_EXTERNAL_MODULE__8__;

      /***/
    }]
    /******/)
  );
});
//# sourceMappingURL=fluent-formio.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(40)(module)))

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fastFluent = __webpack_require__(1);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _fastFluent.Interface.compose({
  properties: {
    localFx: undefined,
    remoteFx: undefined
  },
  init: function init(connectors) {
    this.connectors = connectors;
  },

  methods: {
    get: function get() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var localData, remoteData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.prepareMergedFunctions();
                _context.next = 3;
                return _this.localFx.get();

              case 3:
                localData = _context.sent;
                _context.next = 6;
                return _this.remoteFx.get();

              case 6:
                remoteData = _context.sent;
                return _context.abrupt("return", localData.concat(remoteData));

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },
    prepareMergedFunctions: function prepareMergedFunctions() {
      var _this2 = this;

      this.localFx = this.connectors.local;
      this.remoteFx = this.connectors.remote;

      this.chainReference.forEach(function (chain) {
        var method = chain.method;
        var args = chain.args;

        _this2.localFx = _this2.localFx[method](args);
        _this2.remoteFx = _this2.remoteFx[method](args);
      });
    }
  }
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = __webpack_require__(3);

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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _v = __webpack_require__(22);

var _v2 = _interopRequireDefault(_v);

var _utilities = __webpack_require__(0);

var _utilities2 = _interopRequireDefault(_utilities);

var _Submission = __webpack_require__(7);

var _Submission2 = _interopRequireDefault(_Submission);

var _bluebird = __webpack_require__(5);

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
  /*
  async function storeNewSurvey ({ survey, vm }) {
    let formio = new Formio(vm.$FAST_CONFIG.APP_URL + '/' + vm.$route.params.idForm);
    // De register if there was a previous registration
     Formio.deregisterPlugin('offline');
    // Register the plugin for offline mode
    Formio.registerPlugin(OFFLINE_PLUGIN.getPlugin({ formio: formio, hashField: vm.hashField }), 'offline');
     let formSubmission = {
      data: survey,
      redirect: 'Update',
      draft: true,
      trigger: 'createParalelSurvey'
    };
     let created = await formio.saveSubmission(formSubmission);
     return created;
  }
  */


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
      return (0, _Submission2.default)('*').local().getParallelSurvey(submission).groupId;
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
    vm.currentSubmission.data.parallelSurvey = (0, _Submission2.default)('*').local().setParallelSurvey(parallelSurvey);

    // New survey Information
    var surveyData = {
      parallelSurvey: (0, _Submission2.default)('*').local().setParallelSurvey(_extends({}, parallelSurvey, {
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
    var parallelsurveyInfo = (0, _Submission2.default)('*').local().getParallelSurvey(submission);

    parallelsurveyInfo.participantName = participantName;
    // New survey Information
    var surveyData = {
      parallelSurvey: (0, _Submission2.default)('*').local().setParallelSurvey(parallelsurveyInfo)
    };

    return surveyData;
  }

  return Object.freeze({
    createWizard: createWizard,
    createNewSurvey: createNewSurvey
    // storeNewSurvey
  });
}();

exports.default = ParallelSurvey;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import Formio from 'formiojs/Formio';
// import offlinePlugin from 'offlinePlugin/offlinePlugin';


var _Submission = __webpack_require__(7);

var _Submission2 = _interopRequireDefault(_Submission);

var _Event = __webpack_require__(10);

var _Event2 = _interopRequireDefault(_Event);

var _bluebird = __webpack_require__(5);

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
    /*
    static getFormIOInstance (vm) {
      Formio.deregisterPlugin('offline');
      Formio.registerPlugin(offlinePlugin.getPlugin(vm.form.data.path, undefined, false), 'offline');
      let APP_URL = vm.$FAST_CONFIG.APP_URL;
      let formUrl = APP_URL + '/' + vm.form.data.path;
      let formio = new Formio(formUrl);
       return formio;
    }
    */
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
                return (0, _Submission2.default)('*').add({ submission: submission, formio: formio });

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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _getRequest = __webpack_require__(46);

var _getRequest2 = _interopRequireDefault(_getRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OFFLINE_PLUGIN = function () {
  function OFFLINE_PLUGIN() {
    _classCallCheck(this, OFFLINE_PLUGIN);
  }

  _createClass(OFFLINE_PLUGIN, null, [{
    key: 'get',
    value: function get() {
      var _this = this;

      var plugin = {
        priority: 0,
        preRequest: function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(args) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!(args.method === 'GET')) {
                      _context.next = 2;
                      break;
                    }

                    return _context.abrupt('return', _getRequest2.default.handle(args));

                  case 2:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this);
          }));

          function preRequest(_x) {
            return _ref.apply(this, arguments);
          }

          return preRequest;
        }(),
        request: function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(args) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!(args.method === 'GET')) {
                      _context2.next = 2;
                      break;
                    }

                    return _context2.abrupt('return', _getRequest2.default.handle(args));

                  case 2:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, _this);
          }));

          function request(_x2) {
            return _ref2.apply(this, arguments);
          }

          return request;
        }(),
        staticRequest: function () {
          var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(args) {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!(args.method === 'GET')) {
                      _context3.next = 2;
                      break;
                    }

                    return _context3.abrupt('return', _getRequest2.default.handle(args));

                  case 2:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3, _this);
          }));

          function staticRequest(_x3) {
            return _ref3.apply(this, arguments);
          }

          return staticRequest;
        }()
      };

      return plugin;
    }
  }]);

  return OFFLINE_PLUGIN;
}();

exports.default = OFFLINE_PLUGIN;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Form = __webpack_require__(4);

var _Form2 = _interopRequireDefault(_Form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Form2.default.local().where('data.path', '=', args.formio.formId).first();

              case 2:
                return _context2.abrupt('return', _context2.sent);

              case 3:
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _md = __webpack_require__(17);

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
                return _Configuration2.default.local().first();

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