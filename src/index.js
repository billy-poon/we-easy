import { WeEasyApp } from './app'
import { WeEasyPage } from './page'
import { WeEasyComponent } from './component'

import NextTick from './plugin/next-tick'
import DataProxify from './plugin/data-proxify'
import DataComputed from './plugin/data-computed'
import DataWatcher from './plugin/data-watcher'

const WeEasy = {
  WeEasyApp,
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
