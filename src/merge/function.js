export default function(x, y) {
  return function() {
    let args = arguments

    let invoke = fn => {
      let type = typeof(fn)
      if (type === 'function') {
        return fn.apply(this, args)
      } else if (type === 'string') {
        return invoke(this[type])
      } else if (Array.isArray(fn)) {
        let result;
        fn.forEach(x => (result = invoke(x)))
        return result;
      }
    }

    let array = []
    y && array.push(y)
    x && array.push(x)

    return invoke(array)
  }
}
