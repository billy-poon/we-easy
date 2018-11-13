import { WeEasyComponent } from '../libs/we-easy'

WeEasyComponent({
  options: {
    addGlobalClass: true,
  },
  props: {
    items: {
      type: Array,
      observer() {
        console.log('comp: property "items" changed')
      }
    },
  },
  compute({ items }) {
    return {
      count: items && items.length || 0
    }
  },
  watch: {
    count: {
      handler(nv, ov) {
        console.log(`comp: count changed to ${nv} from ${ov}`)
      },
      immediate: true
    }
  },
  beforeCreate() {
    console.log('comp: before-create')
  },
  created() {
    console.log('comp: created')
    global.$comp = this
  },
  mounted() {
    console.log('comp: mounted')
  },
  beforeUpdate() {
    console.log('comp: before-update')
  },
  updated() {
    console.log('comp: updated')
  },
  methods: {
    onTap() {
      console.log('comp: emiting "input" event')
      this.$emit('input', { value: this.count })
    }
  }
})
