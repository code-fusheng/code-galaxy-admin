import axios from '../../utils/axios'
import { baseQuery } from '../../common/entity/baseEntity'

var prefix_name = 'exam-admin-server/repository'

export interface page {
  pageSize: number,
  sortColumn: String,
  params: Object,
  sortMethod: String
}

export const getRepositoryByPage = (data: page) => axios({
  url: `/${prefix_name}/getRepositoryByPage`,
  method: 'post',
  data
})

