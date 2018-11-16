import { WeEasyPage } from '../libs/we-easy'

WeEasyPage({
  data: {
    color: '#9e9e9e',
  },
  compute({ color }) {
    return {
      descriptionStyle: `background: ${color}`,
    }
  },
  watch: {
    color: {
      handler(nv, ov) {
        console.log(`page: color changed to "${nv}" from "${ov}"`)
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
    },
    onColor({ detail: { value } }) {
      this.color = value.color
    }
  }
})
