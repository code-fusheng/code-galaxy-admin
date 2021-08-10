import axios from '../../utils/axios'

var prefix_name = 'exam-server/admin/repository'

export interface Page {
  pageSize: number,
  sortColumn: String,
  params: Object,
  sortMethod: String
}

export interface RepositoryDto {
  repositoryId: number,
  repositoryName: string,
  isEnabled: number
}

export const getRepositoryByPage = (data: Page) => axios({
  url: `/${prefix_name}/getRepositoryByPage`,
  method: 'post',
  data
})

export const saveRepository = (data: any) => axios({
  url: `/${prefix_name}/saveRepository`,
  method: 'post',
  data
})

export const getRepositoryById = (id: any) => axios({
  url: `/${prefix_name}/getRepositoryById/${id}`,
  method: 'get',
})

export const updateRepository = (data: any) => axios({
  url: `/${prefix_name}/updateRepository`,
  method: 'put',
  data
})

export const deleteRepositoryByIds = (ids: any[]) => axios({
  url: `/${prefix_name}/deleteRepositoryByIds`,
  method: 'delete',
  data: ids
})

export const getRepositoryList = () => axios({
  url: `/${prefix_name}/getRepositoryList`,
  method: 'get',
})

