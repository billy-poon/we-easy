import diff from '../diff/index'

function normalize(watch) {
  Object.keys(watch).forEach(key => {
    let watcher = watch[key]
    if (!watcher) {
      throw new Error(`Invalid config for watcher "${key}".`)
    }

    let type = typeof(watcher)
    if (type === 'function') {
      watcher = { handler: watcher }
    } else if (type === 'string') {
      watcher = { handler: this[watcher] }
    } else if (typeof(watcher.handler) === 'string') {
      watcher.handler = this[watcher.handler]
    }

    if (typeof(watcher.handler) !== 'function') {
      throw new Error(`Invalid handler function specified to watcher "${key}".`)
    }

    watch[key] = watcher
  })
}

function createMixin() {
  let obj = null
  let cache = {}

  function invokeWatcher(key, force = false) {
    let nv = this[key]
    let ov = cache[key]

    if (force || diff(nv, ov) !== void(0)) {
      cache[key] = nv
      obj[key].handler.call(this, nv, ov)
    }
  }

  return {
    beforeCreate(opt) {
      let { watch } = opt
      if (watch !== void(0)) {
        if (typeof(watch) !== 'object')
          throw new Error('The "watch" option should be an object.')

        obj = watch
      }
    },
    mounted() {
      // console.log('watcher mounted')
      if (!obj) return;

      normalize.call(this, obj);

      Object.keys(obj).forEach(key => {
        let watcher = obj[key]
        cache[key] = this[key]
        if (watcher.immediate) {
          invokeWatcher.call(this, key, true)
        }
      })
    },
    updated(data) {
      if (!obj) return;

      Object.keys(data).forEach(key => {
        if (obj.hasOwnProperty(key)) {
          invokeWatcher.call(this, key)
        }
      })
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
