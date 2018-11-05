import WeEasy from './src/index'

App({
  onLaunch(e) {
    console.log('Application launched: ', e)
    console.log({
      window, global
    })

    wx.$app = this
    Object.defineProperty(this, '$pages', {
      get() { return getCurrentPages() }
    })
    Object.defineProperty(this, '$page', {
      get() { return [...getCurrentPages()].pop() }
    })
  }
})
