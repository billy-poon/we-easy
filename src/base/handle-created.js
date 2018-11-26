import diff from '../diff/index'
import { nextTick } from '../utils/index'

let uid = 0

export default function() {
  let myuid = ++uid
  Object.defineProperty(this, '$uid', {
    get() { return myuid }
  })

  let { $getOption, setData } = this
  if (!$getOption || !setData) return;

  let { beforeMount, beforeUpdate, updated } = this.$getOption()

  let updatedDataCache = null
  let notifyUpdated = data => {
    if (!updated) return;

    data = data || this.data
    if (!updatedDataCache) {
      updatedDataCache = {}
      nextTick($ => {
        let data = updatedDataCache
        updatedDataCache = null
        updated.call(this, data)
      })
    }
    Object.assign(updatedDataCache, data)
  }

  Object.defineProperty(this, '$notifyUpdated', {
    get() { return notifyUpdated }
  })

  let syncSetData = (data, callback) => {
    beforeUpdate && beforeUpdate.call(this, data)
    setData.call(this, data, callback)

    this.$updateDataProxify && this.$updateDataProxify(data)
    notifyUpdated(data)
  }


  let setDataCache = null
  let setDataCallbacks = []
  let asyncSetData = (data, callback) => {
    if (!setDataCache) {
      setDataCache = {}
      nextTick($ => {
        let data = setDataCache
        let callbacks = setDataCallbacks

        setDataCache = null
        setDataCallbacks = []

        let delta = diff(data, this.data)
        if (delta === void(0)) return;

        syncSetData(delta, (function() {
          let args = arguments
          callbacks.forEach(cb => cb.apply(this, args))
        }).bind(this))
      })
    }

    Object.assign(setDataCache, data)
    callback && setDataCallbacks.push(callback)
  }

  Object.defineProperty(this, 'setData', {
    get() {
      return (function(data, callback, immediate = false) {
        data && (immediate ? syncSetData : asyncSetData)(data, callback)
      }).bind(this)
    }
  })

  // beforeMount && beforeMount.call(this)
}
