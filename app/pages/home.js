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
  created(e) {
    console.log('page: created (means on-load)', e, this.color)
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
    onColor({ detail: { value } }) {
      console.log('page: on-color', value)
      this.color = value.color
    }
  }
})
