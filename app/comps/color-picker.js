import { WeEasyComponent } from '../libs/we-easy'

let isDef = x => x !== void(0)
function chunk(array, size, start = 0) {
  if (array.length > start) {
    let end = start + size
    return [array.slice(start, end)].concat(chunk(array, size, end))
  }
  return []
}

WeEasyComponent({
  options: {
    addGlobalClass: true,
  },
  props: {
    value: {
      type: String,
      observer(nv, ov) {
        console.log(`comp: property "value" changed to "${nv}" from "${ov}" `)
      }
    },
  },
  data: {
    r: 128,
    g: 128,
    b: 128,
  },
  compute({ r, g, b }) {
    return {
      channels: [
        { name: 'R', value: r },
        { name: 'G', value: g },
        { name: 'B', value: b },
      ],
      color: `rgb(${r}, ${g}, ${b})`,
    }
  },
  watch: {
    value: {
      handler: 'resetValue',
      immediate: true,
    },
    color(nv) {
      let { r, g, b } = this
      console.log('comp: emitting input event')
      this.$emit('input', { value: { r, g, b, color: nv } })
    }
  },
  beforeCreate() {
    console.log('comp: before-create')
  },
  created() {
    console.log('comp: created')
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
    resetValue(val) {
      let match, r, g, b;
      if (match = /^#([0-9a-f]{3})$/.exec(val)) {
        [r, g, b] = Array.from(match[1]).map(x => parseInt(`0x${x}${x}`))
      } else if (match = /^#([0-9a-f]{6})$/.exec(val)) {
        [r, g, b] = chunk(Array.from(match[1]), 2).map(x => parseInt(`0x${x[0]}${x[1]}`))
      } else {
        return;
      }

      Object.assign(this, { r, g, b })
    },
    onSlide({ detail, target }) {
      let { value } = detail
      let { channel } = target.dataset
      this[channel.toLowerCase()] = value
    }
  }
})