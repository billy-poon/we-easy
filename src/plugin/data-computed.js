import diff from '../diff/index'

function computeData(compute, data) {
  // console.log('computing', this.$uid)
  let res = compute.call(this, data)
  if (!res || typeof(res) !== 'object') {
    throw new Error('The "compute" method should return a non-null object.')
  }

  return res
}

function createMixin() {
  let fn = null
  let cache = {}

  return {
    beforeCreate(opt) {
      let { compute } = opt
      if (compute !== void(0)) {
        if (typeof(compute) !== 'function')
          throw new Error('The "compute" option should be a method.')

        fn = compute
      }
    },
    mounted() {
      // console.log('computed mounted')
      if (!fn) return;

      let computed = cache = computeData.call(this, fn, this.$getMergedData())
      this.setData(computed, null, true)
    },
    updated(data) {
      if (!fn) return;
      if (diff(data, cache) === void(0)) return;

      let computed = computeData.call(this, fn, this.$getMergedData())
      let delta = diff(computed, cache)
      if (delta !== void(0)) {
        cache = computed
        this.setData(computed)
      }
    }
  }
}

function install({ WeEasyPage, WeEasyComponent }) {
  if (install.installed) return;
  install.installed = true

  WeEasyPage.mixin(createMixin())
  WeEasyComponent.mixin(createMixin())
}

export default {
  install
}
