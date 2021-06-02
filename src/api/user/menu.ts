import axios from '@/utils/axios'
var prefix_name = 'user-admin-server/menu'

export interface Page {
  pageSize: number,
  sortColumn: String,
  params: Object,
  sortMethod: String
}

export const getMenuList = () => axios({
  url: `/${prefix_name}/getMenuList`,
  method: 'get',
})

export const getMenuIdsByRoleId = (id: number) => axios({
  url: `/${prefix_name}/getMenuIdsByRoleId/${id}`,
  method: 'get',
})

export const getMenuByPage = (data: any) => axios({
  url: `/${prefix_name}/getMenuByPage`,
  method: 'post',
  data
})


