import { isPrimitive } from './primitive'

function primitiveDiff(x, y) {
  return x === y ? void(0) : x
}

function arrayDiff(x, y, deep) {
  if (!x || !y) return x;
  if (x.length !== y.length) return x;

  let keys = Object.keys(x)
  let kset = new Set(Object.keys(y))
  if (keys.length != kset.size) return x;

  return keys.every(key => {
    if (!kset.has(key)) return false;
    let valx = x[key]
    let valy = y[key]

    return diff(valx, valy, deep) === void(0)
  }) ? void(0) : x
}

function diff(data, target, deep = true) {
  if (isPrimitive(data) || isPrimitive(target)) {
    return primitiveDiff(data, target)
  }
  if (Array.isArray(data) || Array.isArray(target)) {
    return arrayDiff(data, target, deep)
  }

  let res = {}
  let hasDiff = false
  Object.keys(data).forEach(key => {
    let vd = data[key]
    let vt = target[key]

    if (vd !== vt) {
      if (!deep || diff(vd, vt, true) !== void(0)) {
        hasDiff = true
        res[key] = vd
      }
    }
  })

  return hasDiff ? res : void(0)
}

export default diff
