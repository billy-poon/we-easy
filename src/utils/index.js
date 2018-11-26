export function nextTick(action, context, callback) {
  return setTimeout($ => {
    let result = action.call(context)
    callback && callback.call(context, result)
  }, 0)
}
