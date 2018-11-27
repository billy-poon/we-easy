// global App

import mixin from './mixin/index'
// import handleCreated from './base/handle-created'
import handleMounted from './base/handle-mounted'
// import object from './merge/object';

const propMap = {
  'created': 'onLaunch',
  'launched': 'onLaunch',
}

const globalMixins = []

function created() {
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
}

function mounted() {
  if (!this.$$mounted) {
    Object.defineProperty(this, '$$mounted', {
      get() { return true }
    })
    handleMounted.call(this)
  }
}

export function WeEasyApp(options) {
  options = options || {}
  options.mixins = [
    {
      created,
      onShow: mounted
    },
    ...globalMixins,
    ...(options.mixins || [])
  ]

  let opt = mixin(options, options.mixins, propMap)
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
