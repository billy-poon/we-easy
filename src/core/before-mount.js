// before existing created() hook
export default function() {
  // console.log('before-mount')
  let { beforeMount } = this.$getOption()
  beforeMount && beforeMount.call(this)
}
