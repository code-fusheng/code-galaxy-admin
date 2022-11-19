import axios from '../../utils/axios';
var prefix_name = 'exam-server/admin/rule';

export interface page {
  pageSize: number;
  sortColumn: String;
  params: Object;
  sortMethod: String;
}

export const getRuleByPage = (data: page) =>
  axios({
    url: `/${prefix_name}/getRuleByPage`,
    method: 'post',
    data
  });

// 获取规则信息
export const getRuleById = (id: any) =>
  axios({
    url: `${prefix_name}/getRuleById/${id}`,
    method: 'get'
  });

export const saveRule = (data: any) =>
  axios({
    url: `/${prefix_name}/saveRule`,
    method: 'post',
    data
  });

export const getRuleList = () =>
  axios({
    url: `${prefix_name}/getRuleList`,
    method: 'get'
  });
