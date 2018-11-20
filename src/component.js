// global Component

import mixin from './mixin/index'
import handleCreated from './base/handle-created'
import handleMounted from './base/handle-mounted'

const propMap = {
  'props': 'properties',
}

const globalMixins = []

function createObservePropsMixin() {
  return {
    beforeCreate(opt) {
      let { properties: props, watch, compute } = opt
      if (props && (watch ||compute)) {
        Object.keys(props).forEach(key => {
          let prop = props[key]
          if (prop) {
            if (typeof(prop) !== 'object') prop = props[key] = { type: prop };
            let { observer } = prop

            prop.observer = ((key, observer) => function(nv) {
              if (typeof(observer) === 'string') observer = this[observer];
              observer && observer.apply(this, arguments)

              let data = {}
              data[key] = nv
              this.$notifyUpdated && this.$notifyUpdated(data)

            })(key, observer)
          }
        })
      }
    }
  }
}

export function WeEasyComponent(options) {
  options = options || {}
  options.mixins = [
    {
      attached: handleCreated,
      ready: handleMounted,
    },
    {
      created() {
        Object.defineProperty(this, '$emit', {
          get() {
            return function() {
              this.triggerEvent.apply(this, arguments)
            }
          }
        })
      }
    },
    createObservePropsMixin(),
    ...globalMixins,
    ...(options.mixins || [])
  ]

  let opt = mixin(options, options.mixins, propMap)
  opt.methods = opt.methods || {}

  opt.methods.$getOption = () => opt
  opt.methods.$getMergedData = function() {
    return Object.assign({}, this.properties, this.data)
  }

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

export default Component
