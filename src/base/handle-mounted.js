export default function() {
  if (!this.$getOption) return;

  let { mounted } = this.$getOption()
  mounted && mounted.call(this)
}
