import axios from '../../utils/axios'
var prefix_name = 'exam-admin-server/rule'

export interface page {
  pageSize: number,
  sortColumn: String,
  params: Object,
  sortMethod: String
}

export const getRuleByPage = (data: page) => axios({
  url: `/${prefix_name}/getRuleByPage`,
  method: 'post',
  data
})
