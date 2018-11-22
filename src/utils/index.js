export function nextTick(cb, context) {
  return setTimeout($ => cb.call(context), 0)
}
