import { WeEasyPage } from '../libs/we-easy'

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
    value(nv, ov) {
      console.log(`page: value changed to ${nv} from ${ov}`)
    },
    text: {
      handler(nv, ov) {
        console.log(`page: text changed to "${nv}" from "${ov}"`)
      },
      immediate: true
    }
  },
  beforeCreate(opt) {
    console.log('page: before-create')
  },
  onLoad(e) {
    console.log('page: on-load')
  },
  beforeMount() {
    console.log('page: before-mount')
  },
  mounted() {
    console.log('page: mounted')
  },
  beforeUpdate(data) {
    console.log('page: before-update')
  },
  updated() {
    console.log('page: updated')
  },

  methods: {
    onTap() {
      this.value += 1
    },
    onInput(e) {
      console.log('page: on-input');
      this.logs = [e.detail.value, ...this.logs]
    }
  }
})
