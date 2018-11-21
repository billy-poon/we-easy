import { mergeObject, mergeCompute, mergeFunction } from '../merge/index'

function mixinOne(obj, mixin) {
  Object.keys(mixin).forEach(key => {
    let value = mixin[key]
    if (key === 'compute') {
      obj[key] = mergeCompute(value, obj[key])
    } else if (typeof(value) === 'function') {
      obj[key] = mergeFunction(value, obj[key])
    } else if (typeof(value) === 'object') {
      obj[key] = mergeObject(value, obj[key])
    }
  })

  return obj
}


function remapProps(obj, map) {
  obj = Object.assign({}, obj)
  if (map) {
    Object.keys(map).forEach(key => {
      let prop = obj[key]
      if (prop !== void (0)) {
        let mapKey = map[key]
        obj[mapKey] = prop
        delete obj[key]
      }
    })
  }

  return obj
}

export default function(obj, mixins, propsMap) {
  let result = {}
  mixins && mixins.forEach(x => mixinOne(result, remapProps(x, propsMap)))
  mixinOne(result, remapProps(obj))

  return result;
}
