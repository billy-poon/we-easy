// global App

import mixin from './utils/mixin'
import mounted from './core/mounted'
import laterMixin from './mixins/later';

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
      mounted.call(this)
    }
  },
}

const globalMixins = []

export function WeEasyApp(options) {
  options = options || {}
  let mixins = [
    earlierMixin,
    ...globalMixins,
    ...(options.mixins || []),
    options,
    laterMixin,
  ]

  let opt = mixin(mixins, propMap)
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

export default App
