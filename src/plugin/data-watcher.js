import diff from '../diff/index'

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

Watcher.prototype.initialize = function() {
  let { target, cache, watch } = this

  Object.keys(watch).forEach(key => {
    cache[key] = target[key]
  })

  let keys = Object.keys(watch).filter(key => watch[key].immediate)
  if (keys) this.invokeWatcher(keys, true)
}

Watcher.prototype.invokeWatcher = function(keys, force = false) {
  let { target, cache, watch } = this
  keys && keys.forEach(key => {
    if (!watch.hasOwnProperty(key)) return;

    let ov = cache[key]
    let nv = target[key]

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
    mounted() {
      // console.log('watcher mounted')
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
      watcher && watcher.invokeWatcher(Object.keys(data))
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
