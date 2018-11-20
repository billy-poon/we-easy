let comps = {}

export function findComponents(page) {
  return Object.values(comps).filter(x => x.$page === page)
}

export default {
  props: {
    ref: String
  },
  mounted() {
    let id = `${this.$uid}#${this.is}`
    comps[id] = this

    console.log(`comp: ${id} mounted @mixin`)

    Object.defineProperty(this, '$componentId', {
      get() { return id }
    })

    let page = [...getCurrentPages()].pop()
    Object.defineProperty(this, '$page', {
      get() { return page }
    })

    let { ref } = this
    let { $refs: refs } = page
    if (ref && refs && !refs.hasOwnProperty(ref)) {
      let me = this
      Object.defineProperty(refs, ref, {
        get() { return me }
      })
    }
  },
  unattached() {
    let id = this.$componentId
    console.log(`comp: ${id} unattached @mixin`)
    delete comps[id]
  }
}