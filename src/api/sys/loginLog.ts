import axios from '@/utils/axios'
var prefix_name = 'sys-server/admin/log/login'

export interface IPage {
  pageSize: number,
  sortColumn: String,
  params: Object,
  sortMethod: String
}

// 分页查询登录日志列表
export const pageLoginLog = (data: any) => axios({
  url: `/${prefix_name}/pageLoginLog`,
  method: 'post',
  data
})
