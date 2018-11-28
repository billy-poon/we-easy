import nextTick from '../utils/next-tick'

let mixin = {
  created() {
    Object.defineProperty(this, '$nextTick', {
      get() { return (action, callback) => nextTick(action, this, callback) }
    })
  }
}

function install({ WeEasyBoth }) {
  if (install.installed) return;
  install.installed = true

  WeEasyBoth.mixin(mixin)
}

export default {
  install
}
