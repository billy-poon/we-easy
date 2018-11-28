(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "d:\\.workspace\\.open\\we-easy\\src\\index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "d:\\.workspace\\.open\\we-easy\\src\\app.js":
/*!**********************************************!*\
  !*** d:/.workspace/.open/we-easy/src/app.js ***!
  \**********************************************/
/*! exports provided: WeEasyApp, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WeEasyApp", function() { return WeEasyApp; });
/* harmony import */ var _utils_mixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/mixin */ "d:\\.workspace\\.open\\we-easy\\src\\utils\\mixin.js");
/* harmony import */ var _core_mounted__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/mounted */ "d:\\.workspace\\.open\\we-easy\\src\\core\\mounted.js");
/* harmony import */ var _mixins_later__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mixins/later */ "d:\\.workspace\\.open\\we-easy\\src\\mixins\\later.js");
// global App





const propMap = {
  'created': 'onLaunch',
}

const earlierMixin = {
  created() {
    let app = this
    Object.defineProperty(wx, '$app', {
      get() { return app }
    })
    Object.defineProperties(this, {
      $pages: {
        get() { return getCurrentPages() }
      },
      $page: {
        get() { return getCurrentPages().pop() }
      }
    })
  },
  onShow() {
    if (!this.$$mounted) {
      Object.defineProperty(this, '$$mounted', {
        get() { return true }
      })
      _core_mounted__WEBPACK_IMPORTED_MODULE_1__["default"].call(this)
    }
  },
}

const globalMixins = []

function WeEasyApp(options) {
  options = options || {}
  let mixins = [
    earlierMixin,
    ...globalMixins,
    ...(options.mixins || []),
    options,
    _mixins_later__WEBPACK_IMPORTED_MODULE_2__["default"],
  ]

  let opt = Object(_utils_mixin__WEBPACK_IMPORTED_MODULE_0__["default"])(mixins, propMap)
  let { methods } = opt
  if (methods) {
    opt = { ...opt, ...methods }
    delete opt.methods
  }

  opt.$getOption = () => opt

  let { beforeCreate } = opt
  if (typeof(beforeCreate) === 'function') {
    beforeCreate(opt)
  }

  return App(opt)
}

Object.defineProperty(WeEasyApp, 'mixin', {
  get() {
    return mixin => globalMixins.push(mixin)
  }
})

Object.defineProperty(App, 'define', {
  get() { return WeEasyApp }
})

/* harmony default export */ __webpack_exports__["default"] = (App);


/***/ }),

/***/ "d:\\.workspace\\.open\\we-easy\\src\\component.js":
/*!****************************************************!*\
  !*** d:/.workspace/.open/we-easy/src/component.js ***!
  \****************************************************/
/*! exports provided: WeEasyComponent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WeEasyComponent", function() { return WeEasyComponent; });
/* harmony import */ var _utils_mixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/mixin */ "d:\\.workspace\\.open\\we-easy\\src\\utils\\mixin.js");
/* harmony import */ var _mixins_later__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixins/later */ "d:\\.workspace\\.open\\we-easy\\src\\mixins\\later.js");
/* harmony import */ var _mixins_earlier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mixins/earlier */ "d:\\.workspace\\.open\\we-easy\\src\\mixins\\earlier.js");
// global Component





const propMap = {
  'props': 'properties',
  'mounted': 'ready',
}

const globalMixins = []

const defaultMixin = {
  beforeCreate(opt) {
    let { properties: props, watch, compute } = opt
    if (props && (watch || compute)) {
      Object.keys(props).forEach(key => {
        let prop = props[key]
        if (prop) {
          if (typeof (prop) !== 'object') prop = props[key] = { type: prop };
          let { observer } = prop

          prop.observer = ((key, observer) => function (nv) {
            if (typeof (observer) === 'string') observer = this[observer];
            observer && observer.apply(this, arguments)

            let data = {}
            data[key] = nv
            this.$notifyUpdated(data)

          })(key, observer)
        }
      })
    }
  },
  created() {
    Object.defineProperty(this, '$emit', {
      get() {
        return function () {
          this.triggerEvent.apply(this, arguments)
        }
      }
    })
  }
}

function WeEasyComponent(options) {
  options = options || {}
  let mixins = [
    _mixins_earlier__WEBPACK_IMPORTED_MODULE_2__["default"],
    defaultMixin,
    ...globalMixins,
    ...(options.mixins || []),
    options,
    _mixins_later__WEBPACK_IMPORTED_MODULE_1__["default"],
  ]

  let opt = Object(_utils_mixin__WEBPACK_IMPORTED_MODULE_0__["default"])(mixins, propMap)

  opt.methods = opt.methods || {}
  opt.methods.$getOption = () => opt

  let { beforeCreate } = opt
  if (typeof(beforeCreate) === 'function') {
    beforeCreate(opt)
  }

  return Component(opt)
}

Object.defineProperty(WeEasyComponent, 'mixin', {
  get() {
    return mixin => globalMixins.push(mixin)
  }
})

Object.defineProperty(Component, 'define', {
  get() { return WeEasyComponent }
})

/* harmony default export */ __webpack_exports__["default"] = (Component);


/***/ }),

/***/ "d:\\.workspace\\.open\\we-easy\\src\\core\\before-mount.js":
/*!************************************************************!*\
  !*** d:/.workspace/.open/we-easy/src/core/before-mount.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// before existing created() hook
/* harmony default export */ __webpack_exports__["default"] = (function() {
  // console.log('before-mount')
  let { beforeMount } = this.$getOption()
  beforeMount && beforeMount.call(this)
});


/***/ }),

/***/ "d:\\.workspace\\.open\\we-easy\\src\\core\\created.js":
/*!*******************************************************!*\
  !*** d:/.workspace/.open/we-easy/src/core/created.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_diff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/diff */ "d:\\.workspace\\.open\\we-easy\\src\\utils\\diff.js");
/* harmony import */ var _utils_next_tick__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/next-tick */ "d:\\.workspace\\.open\\we-easy\\src\\utils\\next-tick.js");
// earlier action in created() hook




let uid = 0

/* harmony default export */ __webpack_exports__["default"] = (function() {
  let myuid = ++uid
  Object.defineProperty(this, '$uid', {
    get() { return myuid }
  })

  let { $getOption, setData } = this
  if (!$getOption || !setData) return;

  let { beforeUpdate, updated } = this.$getOption()

  let updatedDataCache = null
  let notifyUpdated = data => {
    if (!updated) return;

    data = data || this.data
    if (!updatedDataCache) {
      updatedDataCache = {}
      Object(_utils_next_tick__WEBPACK_IMPORTED_MODULE_1__["default"])($ => {
        let data = updatedDataCache
        updatedDataCache = null
        updated.call(this, data)
      })
    }
    Object.assign(updatedDataCache, data)
  }

  Object.defineProperty(this, '$notifyUpdated', {
    get() { return notifyUpdated }
  })

  let syncSetData = (data, callback) => {
    beforeUpdate && beforeUpdate.call(this, data)
    setData.call(this, data, callback)

    this.$updateDataProxify && this.$updateDataProxify(data)
    notifyUpdated(data)
  }


  let setDataCache = null
  let setDataCallbacks = []
  let asyncSetData = (data, callback) => {
    if (!setDataCache) {
      setDataCache = {}
      Object(_utils_next_tick__WEBPACK_IMPORTED_MODULE_1__["default"])($ => {
        let data = setDataCache
        let callbacks = setDataCallbacks

        setDataCache = null
        setDataCallbacks = []

        let delta = Object(_utils_diff__WEBPACK_IMPORTED_MODULE_0__["default"])(data, this.data)
        if (delta === void(0)) return;

        syncSetData(delta, (function() {
          let args = arguments
          callbacks.forEach(cb => cb.apply(this, args))
        }).bind(this))
      })
    }

    Object.assign(setDataCache, data)
    callback && setDataCallbacks.push(callback)
  }

  Object.defineProperty(this, 'setData', {
    get() {
      return (function(data, callback, immediate = false) {
        data && (immediate ? syncSetData : asyncSetData)(data, callback)
      }).bind(this)
    }
  })
});


/***/ }),

/***/ "d:\\.workspace\\.open\\we-easy\\src\\core\\mounted.js":
/*!*******************************************************!*\
  !*** d:/.workspace/.open/we-easy/src/core/mounted.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// mounted() hook
/* harmony default export */ __webpack_exports__["default"] = (function() {
  if (!this.$getOption) return;

  let { mounted } = this.$getOption()
  mounted && mounted.call(this)
});


/***/ }),

/***/ "d:\\.workspace\\.open\\we-easy\\src\\index.js":
/*!************************************************!*\
  !*** d:/.workspace/.open/we-easy/src/index.js ***!
  \************************************************/
/*! exports provided: WeEasyApp, WeEasyPage, WeEasyComponent, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "d:\\.workspace\\.open\\we-easy\\src\\app.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WeEasyApp", function() { return _app__WEBPACK_IMPORTED_MODULE_0__["WeEasyApp"]; });

/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page */ "d:\\.workspace\\.open\\we-easy\\src\\page.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WeEasyPage", function() { return _page__WEBPACK_IMPORTED_MODULE_1__["WeEasyPage"]; });

/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component */ "d:\\.workspace\\.open\\we-easy\\src\\component.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WeEasyComponent", function() { return _component__WEBPACK_IMPORTED_MODULE_2__["WeEasyComponent"]; });

/* harmony import */ var _plugins_next_tick__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plugins/next-tick */ "d:\\.workspace\\.open\\we-easy\\src\\plugins\\next-tick.js");
/* harmony import */ var _plugins_data_proxify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./plugins/data-proxify */ "d:\\.workspace\\.open\\we-easy\\src\\plugins\\data-proxify.js");
/* harmony import */ var _plugins_data_watcher__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./plugins/data-watcher */ "d:\\.workspace\\.open\\we-easy\\src\\plugins\\data-watcher.js");
/* harmony import */ var _plugins_data_computed__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plugins/data-computed */ "d:\\.workspace\\.open\\we-easy\\src\\plugins\\data-computed.js");









const WeEasyBoth = {}
Object.defineProperty(WeEasyBoth, 'mixin', {
  get() {
    return mixin => {
      _page__WEBPACK_IMPORTED_MODULE_1__["WeEasyPage"].mixin(mixin)
      _component__WEBPACK_IMPORTED_MODULE_2__["WeEasyComponent"].mixin(mixin)
    }
  }
})

const WeEasy = {
  WeEasyApp: _app__WEBPACK_IMPORTED_MODULE_0__["WeEasyApp"],
  WeEasyBoth,
  WeEasyPage: _page__WEBPACK_IMPORTED_MODULE_1__["WeEasyPage"],
  WeEasyComponent: _component__WEBPACK_IMPORTED_MODULE_2__["WeEasyComponent"],
}

Object.defineProperty(WeEasy, 'use', {
  get() {
    return plugin => {
      if (plugin) {
        if (typeof(plugin) === 'object') {
          plugin = plugin.install
        }
      }
      if (typeof(plugin) !== 'function') {
        throw new Error('Invalid plugin value.')
      }
      plugin(this)
    }
  }
})

WeEasy.use(_plugins_next_tick__WEBPACK_IMPORTED_MODULE_3__["default"])
WeEasy.use(_plugins_data_proxify__WEBPACK_IMPORTED_MODULE_4__["default"])
WeEasy.use(_plugins_data_computed__WEBPACK_IMPORTED_MODULE_6__["default"])
WeEasy.use(_plugins_data_watcher__WEBPACK_IMPORTED_MODULE_5__["default"])



/* harmony default export */ __webpack_exports__["default"] = (WeEasy);


/***/ }),

/***/ "d:\\.workspace\\.open\\we-easy\\src\\mixins\\earlier.js":
/*!*********************************************************!*\
  !*** d:/.workspace/.open/we-easy/src/mixins/earlier.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_created__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/created */ "d:\\.workspace\\.open\\we-easy\\src\\core\\created.js");
/* harmony import */ var _core_mounted__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/mounted */ "d:\\.workspace\\.open\\we-easy\\src\\core\\mounted.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  created: _core_created__WEBPACK_IMPORTED_MODULE_0__["default"], mounted: _core_mounted__WEBPACK_IMPORTED_MODULE_1__["default"]
});


/***/ }),

/***/ "d:\\.workspace\\.open\\we-easy\\src\\mixins\\later.js":
/*!*******************************************************!*\
  !*** d:/.workspace/.open/we-easy/src/mixins/later.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_before_mount__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/before-mount */ "d:\\.workspace\\.open\\we-easy\\src\\core\\before-mount.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  created: _core_before_mount__WEBPACK_IMPORTED_MODULE_0__["default"]
});


/***/ }),

/***/ "d:\\.workspace\\.open\\we-easy\\src\\page.js":
/*!***********************************************!*\
  !*** d:/.workspace/.open/we-easy/src/page.js ***!
  \***********************************************/
/*! exports provided: WeEasyPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WeEasyPage", function() { return WeEasyPage; });
/* harmony import */ var _utils_mixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/mixin */ "d:\\.workspace\\.open\\we-easy\\src\\utils\\mixin.js");
/* harmony import */ var _mixins_later__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mixins/later */ "d:\\.workspace\\.open\\we-easy\\src\\mixins\\later.js");
/* harmony import */ var _mixins_earlier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mixins/earlier */ "d:\\.workspace\\.open\\we-easy\\src\\mixins\\earlier.js");
// global Page





const propMap = {
  'created': 'onLoad',
  'mounted': 'onReady',
}

const globalMixins = []

function WeEasyPage(options) {
  options = options || {}
  let mixins = [
    _mixins_earlier__WEBPACK_IMPORTED_MODULE_2__["default"],
    ...globalMixins,
    ...(options.mixins || []),
    options,
    _mixins_later__WEBPACK_IMPORTED_MODULE_1__["default"],
  ]

  let opt = Object(_utils_mixin__WEBPACK_IMPORTED_MODULE_0__["default"])(mixins, propMap)

  let { methods } = opt
  if (methods) {
    opt = { ...opt, ...methods }
    delete opt.methods
  }

  opt.$getOption = () => opt

  let { beforeCreate } = opt
  if (typeof(beforeCreate) === 'function') {
    beforeCreate(opt)
  }

  return Page(opt)
}

Object.defineProperty(WeEasyPage, 'mixin', {
  get() {
    return mixin => globalMixins.push(mixin)
  }
})

Object.defineProperty(Page, 'define', {
  get() { return WeEasyPage }
})

/* harmony default export */ __webpack_exports__["default"] = (Page);


/***/ }),

/***/ "d:\\.workspace\\.open\\we-easy\\src\\plugins\\data-computed.js":
/*!****************************************************************!*\
  !*** d:/.workspace/.open/we-easy/src/plugins/data-computed.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_diff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/diff */ "d:\\.workspace\\.open\\we-easy\\src\\utils\\diff.js");


function computeData(compute, data) {
  // console.log('computing', this.$uid)
  let res = compute.call(this, data)
  if (!res || typeof(res) !== 'object') {
    throw new Error('The "compute" method should return a non-null object.')
  }

  return res
}

function Computer(target, compute) {
  Object.defineProperty(this, 'target', {
    get() { return target }
  })
  Object.defineProperty(this, 'compute', {
    get() { return compute }
  })
}

Computer.prototype.isSelfUpdate = function(data) {
  let { cache } = this
  if (cache && data) {
    data = Object.assign({}, data)
    Object.keys(cache).forEach(key => (delete data[key]))
  }

  return Object(_utils_diff__WEBPACK_IMPORTED_MODULE_0__["default"])(data, cache) === void(0)
}

Computer.prototype.invoke = function(data, immediate = false) {
  let { target, compute, cache } = this

  let computed = computeData.call(target, compute, data)
  if (Object(_utils_diff__WEBPACK_IMPORTED_MODULE_0__["default"])(computed, cache) === void(0)) return;

  this.cache = computed
  target.setData(computed, null, !!immediate)
}

let mixin = {
  beforeCreate(opt) {
    let { compute } = opt
    if (compute !== void(0)) {
      if (typeof(compute) !== 'function')
        throw new Error('The "compute" option should be a method.')
    }
  },
  mounted() {
    // console.log('computed mounted')
    let { compute } = this.$getOption()
    if (!compute) return;

    let computer = new Computer(this, compute)
    Object.defineProperty(this, '$$computer', {
      get() { return computer }
    })

    computer.invoke(this.data, true)
  },
  updated(data) {
    let { $$computer: computer } = this
    if (!computer) return;
    if (computer.isSelfUpdate(data)) return;

    computer.invoke(this.data)
  }
}

function install({ WeEasyBoth }) {
  if (install.installed) return;
  install.installed = true

  WeEasyBoth.mixin(mixin)
}

/* harmony default export */ __webpack_exports__["default"] = ({
  install
});


/***/ }),

/***/ "d:\\.workspace\\.open\\we-easy\\src\\plugins\\data-proxify.js":
/*!***************************************************************!*\
  !*** d:/.workspace/.open/we-easy/src/plugins/data-proxify.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function dataProxify(propNames, getter, setter) {
  propNames.forEach(prop => {
    if (this.hasOwnProperty(prop)) return;

    Object.defineProperty(this, prop, (prop => ({
      get() {
        if (getter) return getter.call(this, prop)
        throw new Error(`Property "${prop}" is not readable.`)
      },
      set(value) {
        if (setter) return setter.call(this, prop, value)
        throw new Error(`Property "${prop}" is not writable.`)
      }
    }))(prop))
  })
}

function setupDataProxify(data) {
  dataProxify.call(
    this,
    Object.keys(data),
    function(prop) {
      let { $$proxifyCache: cache } = this
      if (cache.hasOwnProperty(prop)) {
        return cache[prop]
      } else {
        return this.data[prop]
      }
    },
    function(prop, value) {
      let data = {}
      data[prop] = value
      this.$$proxifyCache[prop] = value
      return this.setData(data)
    }
  )
}

let mixin = {
  created() {
    // console.log('proxify mounted')
    let cache = {}
    Object.defineProperty(this, '$$proxifyCache', {
      get() { return cache }
    })

    let updateDataProxify = (function (data) {
      data = data || this.data
      setupDataProxify.call(this, data)
    }).bind(this)

    updateDataProxify()
    Object.defineProperty(this, '$updateDataProxify', {
      get() { return updateDataProxify }
    })
  },
  updated(data) {
    let { $$proxifyCache: cache } = this
    Object.keys(data).forEach(key => (delete cache[key]))
    this.$updateDataProxify(data)
  },
}

function install({ WeEasyBoth }) {
  if (install.installed) return;
  install.installed = true

  WeEasyBoth.mixin(mixin)
}

/* harmony default export */ __webpack_exports__["default"] = ({
  install
});


/***/ }),

/***/ "d:\\.workspace\\.open\\we-easy\\src\\plugins\\data-watcher.js":
/*!***************************************************************!*\
  !*** d:/.workspace/.open/we-easy/src/plugins/data-watcher.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_diff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/diff */ "d:\\.workspace\\.open\\we-easy\\src\\utils\\diff.js");


function normalize(watch) {
  Object.keys(watch).forEach(key => {
    let item = watch[key]
    if (!item) {
      throw new Error(`Invalid config for watcher "${key}".`)
    }

    let type = typeof(item)
    if (type === 'function') {
      item = { handler: item }
    } else if (type === 'string') {
      item = { handler: this[item] }
    } else if (typeof(item.handler) === 'string') {
      item.handler = this[item.handler]
    }

    if (typeof(item.handler) !== 'function') {
      throw new Error(`Invalid handler function specified to watcher "${key}".`)
    }

    watch[key] = item
  })
}

function Watcher(target, watch) {
  normalize.call(target, watch)
  Object.defineProperty(this, 'target', {
    get() { return target }
  })

  Object.defineProperty(this, 'watch', {
    get() { return watch }
  })

  let cache = {}
  Object.defineProperty(this, 'cache', {
    get() { return cache }
  })
}

Watcher.prototype = {
  constructor: Watcher,
  initialize: function () {
    let { target, cache, watch } = this

    // console.log('initial: ', target.data)

    let immediates = {}
    let hasImmediates = false
    Object.keys(watch).forEach(key => {
      let val = cache[key] = target.data[key]
      if (watch[key].immediate) {
        hasImmediates = true
        immediates[key] = val
      }
    })

    if (hasImmediates) {
      this.invoke(immediates, true)
    }
  },
  invoke(data, force = false) {
    // console.log('invoking watcher', data, force)
    let keys = Object.keys(data || {})
    let { target, cache, watch } = this

    keys && keys.forEach(key => {
      if (!watch.hasOwnProperty(key)) return;

      let ov = cache[key]
      let nv = data[key]

      if (force || Object(_utils_diff__WEBPACK_IMPORTED_MODULE_0__["default"])(nv, ov) !== void (0)) {
        cache[key] = nv
        watch[key].handler.call(target, nv, ov)
      }
    })
  },
}

let mixin = {
  beforeCreate(opt) {
    let { watch } = opt
    if (watch !== void(0)) {
      if (typeof(watch) !== 'object')
        throw new Error('The "watch" option should be an object.')
    }
  },
  beforeMount() {
    // console.log('watcher created')
    let { watch } = this.$getOption()
    if (!watch) return;

    let watcher = new Watcher(this, watch)
    Object.defineProperty(this, '$$watcher', {
      get() { return watcher }
    })

    watcher.initialize()
  },
  updated(data) {
    let { $$watcher: watcher } = this
    watcher && watcher.invoke(data, true)
  }
}

function install({ WeEasyBoth }) {
  if (install.installed) return;
  install.installed = true

  WeEasyBoth.mixin(mixin)
}

/* harmony default export */ __webpack_exports__["default"] = ({
  install
});


/***/ }),

/***/ "d:\\.workspace\\.open\\we-easy\\src\\plugins\\next-tick.js":
/*!************************************************************!*\
  !*** d:/.workspace/.open/we-easy/src/plugins/next-tick.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_next_tick__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/next-tick */ "d:\\.workspace\\.open\\we-easy\\src\\utils\\next-tick.js");


let mixin = {
  created() {
    Object.defineProperty(this, '$nextTick', {
      get() { return (action, callback) => Object(_utils_next_tick__WEBPACK_IMPORTED_MODULE_0__["default"])(action, this, callback) }
    })
  }
}

function install({ WeEasyBoth }) {
  if (install.installed) return;
  install.installed = true

  WeEasyBoth.mixin(mixin)
}

/* harmony default export */ __webpack_exports__["default"] = ({
  install
});


/***/ }),

/***/ "d:\\.workspace\\.open\\we-easy\\src\\utils\\diff.js":
/*!*****************************************************!*\
  !*** d:/.workspace/.open/we-easy/src/utils/diff.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _primitive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./primitive */ "d:\\.workspace\\.open\\we-easy\\src\\utils\\primitive.js");


function primitiveDiff(x, y) {
  return x === y ? void(0) : x
}

function arrayDiff(x, y, deep) {
  if (!x || !y) return x;
  if (x.length !== y.length) return x;

  let keys = Object.keys(x)
  let kset = new Set(Object.keys(y))
  if (keys.length != kset.size) return x;

  return keys.every(key => {
    if (!kset.has(key)) return false;
    let valx = x[key]
    let valy = y[key]

    return diff(valx, valy, deep) === void(0)
  }) ? void(0) : x
}

function diff(data, target, deep = true) {
  if (Object(_primitive__WEBPACK_IMPORTED_MODULE_0__["isPrimitive"])(data) || Object(_primitive__WEBPACK_IMPORTED_MODULE_0__["isPrimitive"])(target)) {
    return primitiveDiff(data, target)
  }
  if (Array.isArray(data) || Array.isArray(target)) {
    return arrayDiff(data, target, deep)
  }

  let res = {}
  let hasDiff = false
  Object.keys(data).forEach(key => {
    let vd = data[key]
    let vt = target[key]

    if (vd !== vt) {
      if (!deep || diff(vd, vt, true) !== void(0)) {
        hasDiff = true
        res[key] = vd
      }
    }
  })

  return hasDiff ? res : void(0)
}

/* harmony default export */ __webpack_exports__["default"] = (diff);


/***/ }),

/***/ "d:\\.workspace\\.open\\we-easy\\src\\utils\\merge\\compute.js":
/*!**************************************************************!*\
  !*** d:/.workspace/.open/we-easy/src/utils/merge/compute.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(x, y) {
  let array = [x, y].filter(Boolean)
  if (!array.length) return () => {};

  array.forEach(fn => {
    if (fn && typeof(fn) !== 'function') {
      throw new Error('The "compute" property value must be a function.')
    }
  })

  return function() {
    let args = Array.from(arguments)
    return array.reduce((res, fn) => {
      let computed = fn.apply(this, args)
      if (computed) {
        if (typeof(computed) !== 'object') {
          throw new Error('The "compute" function must return an object value.')
        }
        res = Object.assign(res, computed)
      }

      return res
    }, {})
  }
});


/***/ }),

/***/ "d:\\.workspace\\.open\\we-easy\\src\\utils\\merge\\function.js":
/*!***************************************************************!*\
  !*** d:/.workspace/.open/we-easy/src/utils/merge/function.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(x, y) {
  return function() {
    let args = arguments

    let invoke = fn => {
      let type = typeof(fn)
      if (type === 'function') {
        return fn.apply(this, args)
      } else if (type === 'string') {
        return invoke(this[type])
      } else if (Array.isArray(fn)) {
        let result;
        fn.forEach(x => (result = invoke(x)))
        return result;
      }
    }

    let array = []
    y && array.push(y)
    x && array.push(x)

    return invoke(array)
  }
});


/***/ }),

/***/ "d:\\.workspace\\.open\\we-easy\\src\\utils\\merge\\index.js":
/*!************************************************************!*\
  !*** d:/.workspace/.open/we-easy/src/utils/merge/index.js ***!
  \************************************************************/
/*! exports provided: mergeObject, mergeCompute, mergeFunction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object */ "d:\\.workspace\\.open\\we-easy\\src\\utils\\merge\\object.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeObject", function() { return _object__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _compute__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compute */ "d:\\.workspace\\.open\\we-easy\\src\\utils\\merge\\compute.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeCompute", function() { return _compute__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _function__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./function */ "d:\\.workspace\\.open\\we-easy\\src\\utils\\merge\\function.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeFunction", function() { return _function__WEBPACK_IMPORTED_MODULE_2__["default"]; });






/***/ }),

/***/ "d:\\.workspace\\.open\\we-easy\\src\\utils\\merge\\object.js":
/*!*************************************************************!*\
  !*** d:/.workspace/.open/we-easy/src/utils/merge/object.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(x, y) {
  return Object.assign({}, x, y)
});


/***/ }),

/***/ "d:\\.workspace\\.open\\we-easy\\src\\utils\\mixin.js":
/*!******************************************************!*\
  !*** d:/.workspace/.open/we-easy/src/utils/mixin.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _merge_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./merge/index */ "d:\\.workspace\\.open\\we-easy\\src\\utils\\merge\\index.js");


function mixinOne(obj, mixin) {
  Object.keys(mixin).forEach(key => {
    let value = mixin[key]
    if (key === 'compute') {
      obj[key] = Object(_merge_index__WEBPACK_IMPORTED_MODULE_0__["mergeCompute"])(value, obj[key])
    } else if (typeof(value) === 'function') {
      obj[key] = Object(_merge_index__WEBPACK_IMPORTED_MODULE_0__["mergeFunction"])(value, obj[key])
    } else if (typeof(value) === 'object') {
      obj[key] = Object(_merge_index__WEBPACK_IMPORTED_MODULE_0__["mergeObject"])(value, obj[key])
    }
  })

  return obj
}


function remapProps(obj, map) {
  obj = Object.assign({}, obj)
  if (map) {
    Object.keys(map).forEach(key => {
      let prop = obj[key]
      if (prop !== void (0)) {
        let mapKey = map[key]
        obj[mapKey] = prop
        delete obj[key]
      }
    })
  }

  return obj
}

/* harmony default export */ __webpack_exports__["default"] = (function(mixins, propsMap) {
  let result = {}
  mixins && mixins.forEach(x => mixinOne(result, remapProps(x, propsMap)))

  return result;
});


/***/ }),

/***/ "d:\\.workspace\\.open\\we-easy\\src\\utils\\next-tick.js":
/*!**********************************************************!*\
  !*** d:/.workspace/.open/we-easy/src/utils/next-tick.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(action, context, callback) {
  return setTimeout($ => {
    let result = action.call(context)
    callback && callback.call(context, result)
  }, 0)
});


/***/ }),

/***/ "d:\\.workspace\\.open\\we-easy\\src\\utils\\primitive.js":
/*!**********************************************************!*\
  !*** d:/.workspace/.open/we-easy/src/utils/primitive.js ***!
  \**********************************************************/
/*! exports provided: isPrimitive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPrimitive", function() { return isPrimitive; });
// string, number, boolean, null, undefined, symbol

const primitiveTypes = new Set([
  'string',
  'number',
  'boolean',
  'undefined',
  'symbol',
])

const primitiveObjects = new Set([
  null,
])

function isPrimitive(value) {
  return primitiveTypes.has(typeof(value)) || primitiveObjects.has(value)
}


/***/ })

/******/ });
});
//# sourceMappingURL=we-easy.js.map