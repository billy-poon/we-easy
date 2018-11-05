import { WeEasyPage } from '../../src/page'

WeEasyPage({
  data: {
    x: 'x',
    logs: [],
    value: 0,
  },
  compute({ value, x }) {
    return {
      text: `${x}#${value}`
    }
  },
  watch: {
    value: {
      handler(nv, ov) {
        console.log(`value changed to ${nv} from ${ov}`)
      },
      immediate: true
    },
    text: {
      handler(nv, ov) {
        console.log(`text changed to "${nv}" from "${ov}"`)
      },
      immediate: true
    }
  },
  beforeCreate(opt) {
    console.log('before-create')
  },
  onLoad(e) {
    console.log('on-load')
  },
  beforeMount() {
    console.log('before-mount')
  },
  mounted() {
    console.log('mounted')
  },
  beforeUpdate(data) {
    console.log('before-update: ', data)
  },
  updated() {
    console.log('updated')
  },

  methods: {
    onTap() {
      this.setData({
        value: this.data.value + 1
      })
    },
    onInput(e) {
      console.log('input', e);
      this.logs = [e.detail.value, ...this.logs]
    }
  }
})
