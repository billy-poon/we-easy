import { nextTick } from '../utils/index'

function install({ WeEasyPage, WeEasyComponent }) {
  if (install.installed) return;
  install.installed = true

  let mixin = {
    created() {
      Object.defineProperty(this, '$nextTick', {
        get() { return (action, callback) => nextTick(action, this, callback) }
      })
    }
  }

  WeEasyPage.mixin(mixin)
  WeEasyComponent.mixin(mixin)
}

export default {
  install
}
