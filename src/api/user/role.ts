import axios from '@/utils/axios'
var prefix_name = 'user-admin-server/role'

// 添加角色
export const saveRole = (data: any) => axios({
  url: `/${prefix_name}/saveRole`,
  method: 'post',
  data
})

// 删除角色
export const deleteRoleById = (id: any) => axios({
  url: `/${prefix_name}/deleteRoleById/${id}`,
  method: 'delete',
})

// 根据Id获取角色信息
export const getRuleById = (id: any) => axios({
  url: `/${prefix_name}/getRuleById/${id}`,
  method: 'get',
})

// 修改角色信息
export const updateRole = (data: any) => axios({
  url: `/${prefix_name}/updateRole`,
  method: 'put',
  data
})

// 获取所有角色列表
export const getRoleList = () => axios({
  url: `/${prefix_name}/getRoleList`,
  method: 'get',
})

// 通过用户Id获取角色Ids集合
export const getRoleIdsByUserId = (id: number) => axios({
  url: `/${prefix_name}/getRoleIdsByUserId/${id}`,
  method: 'get',
})


