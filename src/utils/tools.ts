export function resetForm(this: any, refName: any) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields()
  }
}
