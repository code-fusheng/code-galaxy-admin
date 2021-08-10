import axios from '@/utils/axios'
var prefix_name = 'user-server/admin/user'

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
export const deleteUser = (id: any) => axios({
  url: `/${prefix_name}/deleteUser/${id}`,
  method: 'delete'
})

// 根据Id获取用户详情
export const infoUser = (id: any) => axios({
  url: `/${prefix_name}/infoUser/${id}`,
  method: 'get'
})

// 修改用户信息
export const updateUser = (data: any) => axios({
  url: `/${prefix_name}/updateUser`,
  method: 'put',
  data
})

// 分页查询用户
export const pageUser = (data: any) => axios({
  url: `/${prefix_name}/pageUser`,
  method: 'post',
  data
})
