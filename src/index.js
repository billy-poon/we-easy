import { WeEasyPage } from './page'
import { WeEasyComponent } from './component'

import DataProxify from './plugin/data-proxify'
import DataComputed from './plugin/data-computed'
import DataWatcher from './plugin/data-watcher'


const WeEasy = {
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

WeEasy.use(DataProxify)
WeEasy.use(DataComputed)
WeEasy.use(DataWatcher)

export {
  WeEasyPage,
  WeEasyComponent,
}

export default WeEasy
