export default function(x, y) {
  let array = [x, y].filter(Boolean)
  if (!array.length) return () => {};

  array.forEach(fn => {
    if (fn && typeof(fn) !== 'function') {
      throw new Error('The "compute" property value must be a function.')
    }
  })

  return function() {
    let args = Array.from(arguments)
    return array.reduce((res, fn) => {
      let computed = fn.apply(this, args)
      if (computed) {
        if (typeof(computed) !== 'object') {
          throw new Error('The "compute" function must return an object value.')
        }
        res = Object.assign(res, computed)
      }

      return res
    }, {})
  }
}
