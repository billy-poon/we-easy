// global Page

import mixin from './utils/mixin'
import laterMixin from './mixins/later'
import earlierMixin from './mixins/earlier'

const propMap = {
  'created': 'onLoad',
  'mounted': 'onReady',
}

const globalMixins = []

export function WeEasyPage(options) {
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
