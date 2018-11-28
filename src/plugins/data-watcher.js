import diff from '../utils/diff'

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

      if (force || diff(nv, ov) !== void (0)) {
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

export default {
  install
}
