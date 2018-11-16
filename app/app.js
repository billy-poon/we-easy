import WeEasy from './libs/we-easy'
import Plugin from './plugins/index'

WeEasy.use(Plugin)

if (!wx.nextTick) {
  wx.nextTick = cb => setTimeout(cb, 0);
}

App({
  onLaunch(e) {
    console.log('app: launched.')

    wx.$app = this
    Object.defineProperty(this, '$pages', {
      get() { return getCurrentPages() }
    })
    Object.defineProperty(this, '$page', {
      get() { return [...getCurrentPages()].pop() }
    })
  }
})
