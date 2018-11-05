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
      return this.data[prop]
    },
    function(prop, value) {
      let data = {}
      data[prop] = value
      return this.setData(data)
    }
  )
}

function dataProxify_Properties() {
  dataProxify.call(
    this,
    Object.keys(this.properties),
    function(prop) {
      return this.properties[prop]
    }
  )
}

function createMixin(isComponent = false) {
  return {
    mounted() {
      // console.log('proxify mounted')
      this.$updateDataProxify = function(data) {
        data = data || this.data
        dataProxify_Data.call(this, data)
      }
      this.$updateDataProxify()

      if (isComponent) {
        dataProxify_Properties.call(this)
      }
    },
    updated(data) {
      this.$updateDataProxify(data)
    },
  }
}

function install({ WeEasyPage, WeEasyComponent }) {
  if (install.installed) return;
  install.installed = true

  WeEasyPage.mixin(createMixin())
  WeEasyComponent.mixin(createMixin(true))
}

export default {
  install
}
