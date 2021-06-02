import axios from '@/utils/axios'
var prefix_name = 'user-admin-server/user'

export interface Page {
  pageSize: number,
  sortColumn: String,
  params: Object,
  sortMethod: String
}

export const getUserByPage = (data: any) => axios({
  url: `/${prefix_name}/getUserByPage`,
  method: 'post',
  data
})
