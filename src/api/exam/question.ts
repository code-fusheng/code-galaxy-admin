import axios from '../../utils/axios'
var prefix_name = 'exam-admin-server/question'

export interface page {
  pageSize: number,
  sortColumn: String,
  params: Object,
  sortMethod: String
}

export const getQuestionByPage = (data: page) => axios({
  url: `/${prefix_name}/getQuestionByPage`,
  method: 'post',
  data
})

export const getQuestionWithOptionsAndAnswersById = (id: any) => axios({
  url: `/${prefix_name}/getQuestionWithOptionsAndAnswersById/${id}`,
  method: 'get',
})
