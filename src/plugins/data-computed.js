import diff from '../utils/diff'

function computeData(compute, data) {
  // console.log('computing', this.$uid)
  let res = compute.call(this, data)
  if (!res || typeof(res) !== 'object') {
    throw new Error('The "compute" method should return a non-null object.')
  }

  return res
}

function Computer(target, compute) {
  Object.defineProperty(this, 'target', {
    get() { return target }
  })
  Object.defineProperty(this, 'compute', {
    get() { return compute }
  })
}

Computer.prototype.isSelfUpdate = function(data) {
  let { cache } = this
  if (cache && data) {
    data = Object.assign({}, data)
    Object.keys(cache).forEach(key => (delete data[key]))
  }

  return diff(data, cache) === void(0)
}

Computer.prototype.invoke = function(data, immediate = false) {
  let { target, compute, cache } = this

  let computed = computeData.call(target, compute, data)
  if (diff(computed, cache) === void(0)) return;

  this.cache = computed
  target.setData(computed, null, !!immediate)
}

let mixin = {
  beforeCreate(opt) {
    let { compute } = opt
    if (compute !== void(0)) {
      if (typeof(compute) !== 'function')
        throw new Error('The "compute" option should be a method.')
    }
  },
  mounted() {
    // console.log('computed mounted')
    let { compute } = this.$getOption()
    if (!compute) return;

    let computer = new Computer(this, compute)
    Object.defineProperty(this, '$$computer', {
      get() { return computer }
    })

    computer.invoke(this.data, true)
  },
  updated(data) {
    let { $$computer: computer } = this
    if (!computer) return;
    if (computer.isSelfUpdate(data)) return;

    computer.invoke(this.data)
  }
}

function install({ WeEasyBoth }) {
  if (install.installed) return;
  install.installed = true

  WeEasyBoth.mixin(mixin)
}

export default {
  install
}
