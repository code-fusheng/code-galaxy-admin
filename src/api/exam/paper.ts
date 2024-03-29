import axios from '../../utils/axios';
var prefix_name = 'exam-server/admin/paper';

export interface page {
  pageSize: number;
  sortColumn: String;
  params: Object;
  sortMethod: String;
}

export const getPaperByPage = (data: page) =>
  axios({
    url: `/${prefix_name}/getPaperByPage`,
    method: 'post',
    data
  });

// 查询试卷基础信息
export const getPaperBaseInfoById = (id: any) =>
  axios({
    url: `/${prefix_name}/getPaperBaseInfoById/${id}`,
    method: 'get'
  });

export const savePaper = (data: any) =>
  axios({
    url: `/${prefix_name}/savePaper`,
    method: 'post',
    data
  });

// 获取考试选用试卷列表
export const getPaperVoListByExamId = (id: any) =>
  axios({
    url: `/${prefix_name}/getPaperVoListByExamId/${id}`,
    method: 'get'
  });
