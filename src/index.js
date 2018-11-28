import { WeEasyApp } from './app'
import { WeEasyPage } from './page'
import { WeEasyComponent } from './component'

import NextTick from './plugins/next-tick'
import DataProxify from './plugins/data-proxify'
import DataWatcher from './plugins/data-watcher'
import DataComputed from './plugins/data-computed'

const WeEasyBoth = {}
Object.defineProperty(WeEasyBoth, 'mixin', {
  get() {
    return mixin => {
      WeEasyPage.mixin(mixin)
      WeEasyComponent.mixin(mixin)
    }
  }
})

const WeEasy = {
  WeEasyApp,
  WeEasyBoth,
  WeEasyPage,
  WeEasyComponent,
}

Object.defineProperty(WeEasy, 'use', {
  get() {
    return plugin => {
      if (plugin) {
        if (typeof(plugin) === 'object') {
          plugin = plugin.install
        }
      }
      if (typeof(plugin) !== 'function') {
        throw new Error('Invalid plugin value.')
      }
      plugin(this)
    }
  }
})

WeEasy.use(NextTick)
WeEasy.use(DataProxify)
WeEasy.use(DataComputed)
WeEasy.use(DataWatcher)

export {
  WeEasyApp,
  WeEasyPage,
  WeEasyComponent,
}

export default WeEasy
