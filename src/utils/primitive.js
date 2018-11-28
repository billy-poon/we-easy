// string, number, boolean, null, undefined, symbol

const primitiveTypes = new Set([
  'string',
  'number',
  'boolean',
  'undefined',
  'symbol',
])

const primitiveObjects = new Set([
  null,
])

export function isPrimitive(value) {
  return primitiveTypes.has(typeof(value)) || primitiveObjects.has(value)
}
