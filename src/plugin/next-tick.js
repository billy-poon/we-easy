function install({ WeEasyPage, WeEasyComponent }) {
  if (install.installed) return;
  install.installed = true

  let mixin = {
    created() {
      Object.defineProperty(this, '$nextTick', {
        get() { return cb => wx.nextTick(cb.call(this)) }
      })
    }
  }

  WeEasyPage.mixin(mixin)
  WeEasyComponent.mixin(mixin)
}

export default {
  install
}