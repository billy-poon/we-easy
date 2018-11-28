// global Component

import mixin from './utils/mixin'
import laterMixin from './mixins/later'
import earlierMixin from './mixins/earlier'

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

export function WeEasyComponent(options) {
  options = options || {}
  let mixins = [
    earlierMixin,
    defaultMixin,
    ...globalMixins,
    ...(options.mixins || []),
    options,
    laterMixin,
  ]

  let opt = mixin(mixins, propMap)

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

export default Component
