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

// 分页查询试卷试题详细信息
export const getQuestionAndOptionsWithAnswersByPageForPaperId = (data: page) => axios({
  url: `${prefix_name}/getQuestionAndOptionsWithAnswersByPageForPaperId`,
  method: 'post',
  data
})

// 添加试题
export const saveQuestion = (data: any) => axios({
  url: `${prefix_name}/saveQuestion`,
  method: 'post',
  data
})

// 添加试题
export const updateQuestionWithOptionsAndAnswers = (data: any) => axios({
  url: `${prefix_name}/updateQuestionWithOptionsAndAnswers`,
  method: 'put',
  data
})
