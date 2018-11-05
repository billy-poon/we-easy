// global Page

import mixin from './mixin/index'
import handleCreated from './base/handle-created'
import handleMounted from './base/handle-mounted'

const propMap = {
  // 'created': 'onLoad',
}

const globalMixins = []

export function WeEasyPage(options) {
  options = options || {}
  options.mixins = [
    {
      onLoad: handleCreated,
      onReady: handleMounted,
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
  opt.$getMergedData = function() {
    return Object.assign({}, this.data)
  }

  let { beforeCreate } = opt
  if (typeof(beforeCreate) === 'function') {
    beforeCreate(opt)
  }

  return Page(opt)
}

Object.defineProperty(WeEasyPage, 'mixin', {
  get() {
    return mixin => globalMixins.push(mixin)
  }
})

Object.defineProperty(Page, 'define', {
  get() { return WeEasyPage }
})

export default Page
