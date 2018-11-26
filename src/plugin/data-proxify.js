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

function dataProxify_Data(data) {
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

function createMixin() {
  return {
    created() {
      // console.log('proxify mounted')
      let cache = {}
      Object.defineProperty(this, '$$proxifyCache', {
        get() { return cache }
      })

      let updateDataProxify = (function (data) {
        data = data || this.data
        dataProxify_Data.call(this, data)
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
