import { WeEasyComponent } from '../../src/index'

WeEasyComponent({
  options: {
    addGlobalClass: true,
  },
  props: {
    items: {
      type: Array,
      observer() {
        console.log(Array.from(arguments))
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
        console.log(`count changed to ${nv} from ${ov}`)
      },
      immediate: true
    }
  },
  created() {
    global.$comp = this
    this.$emit = function() {
      this.triggerEvent.apply(this, arguments)
    }
  },
  methods: {
    onTap() {
      console.log('counter tapped: ', this.count);
      this.$emit('input', { value: this.count })
    }
  }
})
