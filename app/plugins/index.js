import MixinPage from '../mixins/page'
import MixinComponent from '../mixins/comp'

function install({ WeEasyPage, WeEasyComponent }) {
  if (install.installed) return;
  install.installed = true

  WeEasyPage.mixin(MixinPage)
  WeEasyComponent.mixin(MixinComponent)
}

export default {
  install
}