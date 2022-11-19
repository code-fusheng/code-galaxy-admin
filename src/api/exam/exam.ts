import axios from '../../utils/axios';
var prefix_name = 'exam-server/admin/exam';

export interface page {
  pageSize: number;
  sortColumn: String;
  params: Object;
  sortMethod: String;
}

export const getExamByPage = (data: page) =>
  axios({
    url: `/${prefix_name}/getExamByPage`,
    method: 'post',
    data
  });
