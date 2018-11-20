import { findComponents } from './comp'

export default {
  onLoad() {
    console.log(`page: ${this.route} loaded @mixin`)

    let refs = {}
    Object.defineProperty(this, '$refs', {
      get() { return refs }
    })

    Object.defineProperty(this, '$children', {
      get() { return findComponents(this) }
    })
  }
}