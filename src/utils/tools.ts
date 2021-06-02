export function resetForm(this: any, refName: any) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields()
  }
}

/** *
   * 构造树的数据结构
   * @param data 要构造的数据源
   * @param id 字段ID  默认为id
   * @param pid 父节点字端  默认为pid
   * @param children 子节点的字段 默认为children
   * @param rootId 根节点的ID  默认为0
   */
 export const handleTree = (data, id, pid, children, rootId) => {
  id = id || 'id'
  pid = pid || 'pid'
  children = children || 'children'
  rootId = rootId || 0
  // 对源数据进行深度克隆
  const cloneData = JSON.parse(JSON.stringify(data))
  // 循环所有的项目
  const treeData = cloneData.filter(father => {
    const branchArr = cloneData.filter(child => {
      return father[id] === child[pid]
    })
    branchArr.length > 0 ? father.children = branchArr : ''
    // 返回上一层
    return father[pid] === rootId
  })
  return treeData !== '' ? treeData : data
}
