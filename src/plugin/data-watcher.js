import diff from '../diff/index'
import { nextTick } from '../utils/index'

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
      nextTick($ => this.invokeByData(immediates, true))
    }
  },
  invokeByData(data, force = false) {
    let keys = Object.keys(data || {})
    let { target, cache, watch } = this

    keys && keys.forEach(key => {
      if (!watch.hasOwnProperty(key)) return;

      let ov = cache[key]
      let nv = data[key]

      if (force || diff(nv, ov) !== void (0)) {
        cache[key] = nv
        watch[key].handler.call(target, nv, ov)
      }
    })
  },
  // invokeByKeys(keys, force = false) {
  //   let { target } = this
  //   let data = keys.reduce((res, key) => (res[key] = target.data[key], res), {})
  //   this.invokeByData(data, force)
  // }
}

Watcher.prototype.invokeWatcher = function(keys, force = false) {
  let { target, cache, watch } = this
  keys && keys.forEach(key => {
    if (!watch.hasOwnProperty(key)) return;

    let ov = cache[key]
    let nv = target.data[key]

    if (force || diff(nv, ov) !== void (0)) {
      cache[key] = nv
      watch[key].handler.call(target, nv, ov)
    }
  })
}

function createMixin() {
  return {
    beforeCreate(opt) {
      let { watch } = opt
      if (watch !== void(0)) {
        if (typeof(watch) !== 'object')
          throw new Error('The "watch" option should be an object.')
      }
    },
    created() {
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
      watcher && watcher.invokeByData(data)
    }
  }
}

function install({ WeEasyPage, WeEasyComponent }) {
  if (install.installed) return;
  install.installed = true

  WeEasyPage.mixin(createMixin())
  WeEasyComponent.mixin(createMixin())
}

export default {
  install
}
