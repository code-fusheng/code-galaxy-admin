import axios from '@/utils/axios'
var prefix_name = 'user-admin-server/user'

export interface Page {
  pageSize: number,
  sortColumn: String,
  params: Object,
  sortMethod: String
}

// 添加用户
export const saveUser = (data: any) => axios({
  url: `/${prefix_name}/saveUser`,
  method: 'post',
  data
})

// 根据Id删除用户
export const deleteUserById = (id: any) => axios({
  url: `/${prefix_name}/deleteUserById/${id}`,
  method: 'delete'
})

// 根据Id获取用户详情
export const getUserById = (id: any) => axios({
  url: `/${prefix_name}/getUserById/${id}`,
  method: 'get'
})

// 修改用户信息
export const updateUser = (data: any) => axios({
  url: `/${prefix_name}/updateUser`,
  method: 'put',
  data
})

// 分页查询用户
export const getUserByPage = (data: any) => axios({
  url: `/${prefix_name}/getUserByPage`,
  method: 'post',
  data
})
